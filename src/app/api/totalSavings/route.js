import { MongoClient } from 'mongodb';

async function getTotalSavings() {
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
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const coll = client.db('rainyday').collection('savings_history');
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  console.log(result);
  await client.close();

  return result;
}

export async function GET(req, res) {
  try {
    const result = await getTotalSavings();
    return Response.json(result);
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
