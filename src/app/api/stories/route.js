import { connectToDb } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    console.log("Fetching stories");
    //const { limit, skip } = request.url.searchParams;
    const limit = 10;
    const skip = 0;
    const { client } = await connectToDb();
    const stories = await client.db('processed_data')
      .collection("transactions")
      .find({})
      .project({embedding:0})
      .limit(limit)
      .skip(skip)
      .toArray();

      return NextResponse.json(stories);
  } catch (error) {
    // Handle the error gracefully
    console.error("Error fetching data:", error.message);
    return NextResponse.json({message: "Internal server error"});
  }
}
