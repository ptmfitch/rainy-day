exports = async function(arg){
  // This default function will get a value and find a document in MongoDB
  // To see plenty more examples of what you can do with functions see: 
  // https://www.mongodb.com/docs/atlas/app-services/functions/

  // Find the name of the MongoDB service you want to use (see "Linked Data Sources" tab)
  var serviceName = "mongodb-atlas";

  // Update these to reflect your db/collection
  var dbName = "rainyday";
  var collName = "trigger_control";

  // Get a collection from the context
  var trigger_control_collection = context.services.get(serviceName).db(dbName).collection(collName);

  var findResult;
  try {
    // Get a value from the context (see "Values" tab)
    // Update this to reflect your value's name.
    var valueName = "value_name";
    var value = context.values.get(valueName);

    // Execute a FindOne in MongoDB 
    trigger_state = await trigger_control_collection.findOne(
      { "_id" : "rt_transactions"},
    );
    
    if (trigger_state["enabled"] == 1) {
      console.log("RT Transactions trigger is enabled")
      var last_ts = trigger_state['meta']['last_ts']

      // Get next transaction
      trans = await context.services.get(serviceName).db(dbName).collection('transactions_rt').find( { "ts" : { "$gt" : last_ts } }).toArray()
      
      if ( trans.length > 0 ) {
        var trans_to_insert = trans[0];
        var ts = trans_to_insert["ts"]
        trigger_state["meta"]["last_ts"] = trans_to_insert["ts"];
        await context.services.get(serviceName).db(dbName).collection("transactions").insertOne(trans_to_insert);
        await trigger_control_collection.updateOne({"_id" : "rt_transactions"}, { "$set" : { "meta" : trigger_state["meta"]}});
        
        console.log(`"inserted a transaction at timestamp ${ts}"`)
      }
    } else {
          console.log("RT Transactions trigger is not enabled")
    }

  } catch(err) {
    console.log("Error occurred while executing findOne:", err.message);

    return { error: err.message };
  }

  // To call other named functions:
  // var result = context.functions.execute("function_name", arg1, arg2);

  return { result: findResult };
};