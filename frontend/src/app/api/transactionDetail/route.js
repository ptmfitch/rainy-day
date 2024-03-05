import { MongoClient } from 'mongodb';

async function getTransactionDetail(txn_id) {
  // Connection URL
  const MONGODB_URI =
    process.env.MONGODB_URI_ANALYTICS || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const coll = client.db('rainyday').collection('transactions');
  const cursor = coll.find({ _id: txn_id });
  const result = await cursor.toArray();
  console.log(result);
  await client.close();

  return result[0];
}

export async function GET(req, res) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get('id');
    console.log(id);

    const result = await getTransactionDetail(id);
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
