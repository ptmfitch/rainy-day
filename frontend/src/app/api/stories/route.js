import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request) {
  try {
    console.log('Fetching stories');
    //const { limit, skip } = request.url.searchParams;
    const limit = 10;
    const skip = 0;

    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const client = await MongoClient.connect(MONGODB_URI);

    const stories = await client
      .db('processed_data')
      .collection('transactions')
      .find({})
      .project({ embedding: 0 })
      .limit(limit)
      .skip(skip)
      .toArray();

    await client.close();

    return NextResponse.json(stories);
  } catch (error) {
    // Handle the error gracefully
    console.error('Error fetching data:', error.message);
    return NextResponse.json({ message: 'Internal server error' });
  }
}
