import { NextResponse, NextRequest } from "next/server";
import { MongoClient } from 'mongodb';

 export async function GET(req, res) {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    const client = await MongoClient.connect(MONGODB_URI);
    const coll = client.db('rainyday').collection('statements');

    const cursor = coll.find({});
    const result = await cursor.toArray();
    await client.close();

    return NextResponse.json(result);
 }