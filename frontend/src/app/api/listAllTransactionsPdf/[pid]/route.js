import { NextResponse, NextRequest } from "next/server";
import { MongoClient } from 'mongodb';

export async function GET(request) {
   const searchParams = request.nextUrl.searchParams
   const query = searchParams.get('query')
   console.log(query);

   // Connection URL
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const client = await MongoClient.connect(MONGODB_URI);
    const coll = client.db('rainyday').collection('statements');

    const response = coll.find({_id: query});
    console.log("Retrieved from MongoDB");
    console.log(response);
    await client.close();
    return NextResponse.json(response);

 }