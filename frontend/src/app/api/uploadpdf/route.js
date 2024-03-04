import { NextResponse, NextRequest } from "next/server";
import { writeFile } from 'fs/promises';
import { join } from 'path';

// -------

import { MongoClient } from 'mongodb';

 // Connection URL
 const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
 const client = await MongoClient.connect(MONGODB_URI);
 const coll = client.db('rainyday').collection('statements');


//  -------

export async function POST(req, res) {
    console.log('got here');
    try {
        // Access uploaded file
        const file = await req.formData();
        console.log(file)
        const pdfFile = file.get('file');
        console.log(pdfFile);

        const bytes = await pdfFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueFilename = `${Date.now()}-${pdfFile.name}`;

        // upload to Mongo
        await coll.insertOne({'name':uniqueFilename, 'file':buffer});
        console.log("Inserted into MongoDB");

        await client.close();

        // const filename = join('src/uploads', uniqueFilename);
        // console.log(filename);

        // await writeFile(filename, buffer);
        // console.log(`Saved to ${filename}`);

        // Respond with success message
        return NextResponse.json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' });
    }
}