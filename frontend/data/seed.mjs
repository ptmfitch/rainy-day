import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: ['.env.local', '.env'] });

// today's date formmated as YYYY-MM-DD
const today = new Date().toISOString().split('T')[0];
// date from 1 year ago
const oneYearAgo = new Date(
  new Date().setFullYear(new Date().getFullYear() - 1)
)
  .toISOString()
  .split('T')[0];

const url = `https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=${oneYearAgo}&end_date=${today}&daily=precipitation_sum,precipitation_hours&timezone=Europe%2FLondon`;

try {
  //fetch data
  const response = await fetch(url);
  const data = await response.json();

  console.log(JSON.stringify(data));

  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'rainyday';
  // Create a new MongoClient
  const client = new MongoClient(MONGODB_URI);

  // Use connect method to connect to the Server
  await client.connect();

  console.log('Connected successfully to MongoDB');

  const db = client.db(dbName);

  // Insert data
  const collection = db.collection('weather_history');

  await collection.insertOne(data);

  console.log('Data inserted successfully');

  await db.createCollection('weather_ts', {
    timeseries: {
      timeField: 'forecastedAt',
    },
  });
} catch (error) {
  console.error('Error: ', error);
} finally {
  // Close connection
  client.close();
  console.log('Connection to MongoDB closed');
}
