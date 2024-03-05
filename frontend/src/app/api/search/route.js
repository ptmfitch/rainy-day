import { MongoClient } from 'mongodb';

async function search(query) {
  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const coll = client.db('rainyday').collection('transactions');

  let resultSet = [];

  // define pipeline
  let agg = [
    {
      $search: {
        index: 'autocomplete',
        autocomplete: { query: query, path: 'description' },
      },
    },
    { $limit: 3 },
    { $project: { _id: 0, description: 1, amount: 1, category: 1 } },
  ];
  // run pipeline
  let cursor = coll.aggregate(agg);
  let result = await cursor.toArray();

  resultSet = resultSet.concat(result);

  // define pipeline
  agg = [
    {
      $search: {
        index: 'autocomplete',
        autocomplete: { query: query, path: 'category' },
      },
    },
    { $limit: 3 },
    { $project: { _id: 0, description: 1, amount: 1, category: 1 } },
  ];
  // run pipeline
  cursor = coll.aggregate(agg);
  result = await cursor.toArray();

  resultSet = resultSet.concat(result);

  // define pipeline
  agg = [
    {
      $search: {
        index: 'autocomplete',
        autocomplete: { query: query, path: 'amount' },
      },
    },
    { $limit: 3 },
    { $project: { _id: 0, description: 1, amount: 1, category: 1 } },
  ];
  // run pipeline
  cursor = coll.aggregate(agg);
  result = await cursor.toArray();

  resultSet = resultSet.concat(result);

  await client.close();

  return resultSet;
}

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const query = searchParams.get('query');
    console.log(query);

    const result = await search(query);
    console.log('Result:', result);

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
