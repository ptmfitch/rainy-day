import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: ['.env.local', '.env'] });

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    $set: {
      daily: {
        $map: {
          input: {
            $range: [
              0,
              {
                $size: '$daily.time',
              },
            ],
          },
          as: 'i',
          in: {
            time: {
              $arrayElemAt: ['$daily.time', '$$i'],
            },
            precipitation_sum: {
              $arrayElemAt: ['$daily.precipitation_sum', '$$i'],
            },
            precipitation_hours: {
              $arrayElemAt: ['$daily.precipitation_hours', '$$i'],
            },
          },
        },
      },
    },
  },
  {
    $unwind: {
      path: '$daily',
    },
  },
  {
    $match: {
      'daily.precipitation_hours': {
        $gte: 2,
      },
    },
  },
  {
    $project: {
      _id: '$daily.time',
      date: '$daily.time',
      ts: {
        $toDate: '$daily.time',
      },
      savings: '$daily.precipitation_sum',
    },
  },
  {
    $out: 'savings_history',
  },
];

// Connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = await MongoClient.connect(MONGODB_URI);
const coll = client.db('rainyday').collection('weather_history');
coll.aggregate(agg);
await client.close();
