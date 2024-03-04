import { MongoClient } from 'mongodb';

async function getTotalPerCategory() {
  const agg = [
    {
      $group: {
        _id: '$category',
        total: {
          $sum: '$amount',
        },
      },
    },
  ];
  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const coll = client.db('rainyday').collection('transactions_rt');
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();

  return result;
}

export async function GET(req, res) {
  try {
    const result = await getTotalPerCategory();
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
