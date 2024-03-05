import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import AdmZip from 'adm-zip';
import { EJSON } from 'bson';

dotenv.config({ path: ['.env.local', '.env'] });

// Connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const output_db_name = 'rainyday'
const client = await MongoClient.connect(MONGODB_URI);
const input_collection = client.db('sample_data').collection('transactions');
const output_db = client.db(output_db_name)
const output_collection = output_db.collection('transactions')

try {
  // reading archives
  var zip = new AdmZip("./src/documents/monzo.transactions.json.zip");
  var zipEntries = zip.getEntries(); // an array of ZipEntry records
  
  for ( let i = 0; i < zipEntries.length; i++ ) {
    const zipEntry = zipEntries[i];
    if (zipEntry.entryName == "monzo.transactions.json") {
      var data = zipEntry.getData().toString("utf8")
      // console.log(data)
      var transactions = EJSON.parse(zipEntry.getData().toString("utf8"))
      await input_collection.deleteMany({})
      await input_collection.insertMany(transactions)
      break;
    }
  }

  var de_dupe = {
    '$group': {
      '_id': '$transaction_id', 
      'transaction_id': {
        '$first': '$transaction_id'
      }, 
      'created': {
        '$first': '$created'
      }, 
      'description': {
        '$first': '$description'
      }, 
      'amount': {
        '$first': '$amount'
      }, 
      'currency': {
        '$first': '$currency'
      }, 
      'category': {
        '$first': '$category'
      }, 
      'merchant': {
        '$first': '$merchant'
      }, 
      'local': {
        '$first': '$local'
      }
    }
  }
  
  // Get counts by month and date
  var pipeline = [ 
    de_dupe, {
      '$project': {
        'month': {
          '$month': '$created'
        }, 
        'year': {
          '$year': '$created'
        }
      }
    }, {
      '$group': {
        '_id': {
          'month': '$month', 
          'year': '$year'
        }, 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$project': {
        'year': '$_id.year', 
        'month': '$_id.month', 
        'count': 1
      }
    }, {
      '$sort': {
        'year': -1, 
        'month': -1
      }
    }
  ]

  const remove_created = { '$unset' : 'created' }
  // Copy data into main db
  var res = await input_collection.aggregate(pipeline).toArray()
  var last_month_with_data = res[0]
  var last_date_to_copy = new Date(last_month_with_data['year'], last_month_with_data['month'], 1)

  var now = new Date()
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDay())
  
  var one_month_before_last_date = last_date_to_copy
  one_month_before_last_date.setMonth(one_month_before_last_date.getMonth() - 1);

  var offset = today - one_month_before_last_date
  var offsetDays = offset / 86400000
  console.log(today)
  console.log(offset)
  console.log(offsetDays)
  console.log(one_month_before_last_date)

  var transform_pipeline = [
    de_dupe,
    {
      '$match': {
        'created': {
          '$lt': one_month_before_last_date
        }
      }
    }, 
    {
      '$addFields': {
        'ts': {
          '$add': [
            '$created', offsetDays * 24 * 60 * 60 * 1000
          ]
        }
      }
    }, 
    remove_created,
    {
      '$out': 
        { 'db' : output_db_name,
          'coll' : 'transactions'
        }
    }
  ]

  await input_collection.aggregate(transform_pipeline).toArray()

  // Now put the last months data into a 'realtime' collection
  var realtime_pipeline = [
    de_dupe,
    {
      '$match': {
        'created': {
          '$gt': one_month_before_last_date
        }
      }
    },
    {
      '$sort' : {  'created' : 1 }
    }
  ]
  
  var output_collection_rt = output_db.collection('transactions_rt')
  var output = []
  var rtTransactions = await input_collection.aggregate(realtime_pipeline).toArray()
  
  var ts = new Date()
  for ( let i = 0; i < rtTransactions.length; i++ ) {
    var rt = rtTransactions[i]    
    delete rt['created'],
    rt['ts'] = ts
    ts.setSeconds(ts.getSeconds() + 60)
    output.push(rt)
  }
  
  console.log(`Written ${output.length} rt transactions`)
  await output_collection_rt.drop()
  await output_collection_rt.insertMany(output)

  var last_date_with_category = last_date_to_copy
  last_date_with_category.setMonth(last_date_with_category.getMonth() +1)
  await output_collection.updateMany({'ts' : { '$gte' : last_date_with_category}}, { '$unset' : { 'category' : ''}})

} catch (error) {
  console.error('Error: ', error);
} finally {
  // Close connection
  client.close();
  console.log('Connection to MongoDB closed');
}
