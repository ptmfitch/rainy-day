import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: ['.env.local', '.env'] });
/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $group: {
      _id: null,
      totalSavings: {
        $sum: '$savings',
      },
    },
  },
];

// Connection URL
const MONGODB_URI =
  process.env.MONGODB_URI_ANALYTICS || 'mongodb://localhost:27017';
const client = await MongoClient.connect(MONGODB_URI);
const coll = client.db('rainyday').collection('savings_history');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
console.log(JSON.stringify(result));
await client.close();
