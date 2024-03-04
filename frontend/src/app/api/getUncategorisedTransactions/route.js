import { MongoClient } from 'mongodb';

async function getUncategorisedTransactions() {
  
  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const coll = client.db('rainyday').collection('transactions');
  var filter = { 'category' : { '$exists' : false }}
  const result = await coll.find(filter).toArray();
  await client.close();

  return result;
}

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams

    const result = await getUncategorisedTransactions();
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
