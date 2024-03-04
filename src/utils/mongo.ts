// utils/mongo.ts

import { MongoClient } from "mongodb";
declare global {
  var client: MongoClient | null;
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/* 
  Initializes the connection to mongodb.
  Once connected, it will use the cached connection.
 */
export async function connectToDb() {
  if (global.client) {
    return {
      client: global.client,
    };
  }

  const client = (global.client = new MongoClient(MONGODB_URI!, {}));

  await global.client.connect();
  console.log("Connected to MongoDB");
  return { client };
}
