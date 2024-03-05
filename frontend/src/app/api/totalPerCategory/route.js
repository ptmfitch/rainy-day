import { MongoClient } from 'mongodb';

async function getTotalPerCategory(dateRange) {
  var filter = null;

  if (dateRange === '1m') {
    var date = new Date();
    date.setMonth(date.getMonth() - 1);
    filter = { ts: { $gte: date } };
  }

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

  if (filter != null) {
    var match = { $match: filter };
    agg.splice(0, 0, match);
  }

  // Connection URL
  const MONGODB_URI =
    process.env.MONGODB_URI_ANALYTICS || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const coll = client.db('rainyday').collection('transactions');
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();

  return result;
}

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const dateRange = searchParams.get('date_range');

    const result = await getTotalPerCategory(dateRange);
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
