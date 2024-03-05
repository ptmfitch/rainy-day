import { NextResponse, NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import AWS from "aws-sdk";
import { MongoClient } from "mongodb";

export async function POST(req, res) {
  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

  try {
    // Access uploaded file
    const file = await req.formData();
    const pdfFile = file.get("file");

    const bytes = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uniqueFilename = `${Date.now()}-${pdfFile.name}`;
    const filename = join("/", "tmp", uniqueFilename);

    console.log(filename);

    await writeFile(filename, buffer);

    console.log(`Saved to ${filename}`);

    try {
      // upload file to AWS S3
      const s3 = new AWS.S3({
        accessKeyId: process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
        sessionToken: process.env.S3_SESSION_TOKEN,
      });
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: pdfFile.name,
        Body: buffer,
      };
      await s3.upload(params).promise();
      console.log("Uploaded to S3");
    } catch (err) {
      console.log(err);
    }

    try {
      const client = await MongoClient.connect(MONGODB_URI);
      const coll = client.db("rainyday").collection("statements");
      console.log("Connected to MongoDB");
      // upload to Mongo
      await coll.insertOne({ name: uniqueFilename, file: buffer });
      console.log("Inserted into MongoDB");
    } catch (err) {
      console.log(err);
    }

    // Respond with success message
    return NextResponse.json({
      message: "File uploaded successfully to MongoDB, and stored locally",
      localFileName: uniqueFilename,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" });
  }

}
