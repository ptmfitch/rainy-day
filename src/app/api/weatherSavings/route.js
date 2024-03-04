import { MongoClient } from 'mongodb';

async function getWeatherSavings() {
  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const coll = client.db('rainyday').collection('savings_history');
  const cursor = coll.find();
  const result = await cursor.toArray();
  console.log(JSON.stringify(result));
  await client.close();

  return result;
}

export async function GET(req, res) {
  try {
    const result = await getWeatherSavings();
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
