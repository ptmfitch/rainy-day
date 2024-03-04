import { MongoClient } from 'mongodb';

async function getSpendChart() {
  // date from 60 days ago
  const date = new Date();
  date.setDate(date.getDate() - 60);

  const agg = [
    {
      $match: {
        ts: {
          $gte: date,
        },
      },
    },
    {
      $set: {
        ts: {
          $dateTrunc: {
            date: '$ts',
            unit: 'day',
          },
        },
      },
    },
    {
      $group: {
        _id: '$ts',
        amount: {
          $sum: '$amount',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ];

  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const coll = client.db('rainyday').collection('transactions');
  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  console.log(result);

  const cumulative = result.reduce((acc, cur) => {
    acc.push({
      date: cur._id,
      amount:
        cur.amount + (acc[acc.length - 1] ? acc[acc.length - 1].amount : 0),
    });
    return acc;
  }, []);

  const series = cumulative.map((item) => [item.date, item.amount]);

  console.log(series);

  await client.close();

  return series;
}

export async function GET(req, res) {
  try {
    const result = await getSpendChart();
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
