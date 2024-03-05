import { NextResponse, NextRequest } from "next/server";
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
import { ChatOpenAI } from '@langchain/openai';

// -------

import { MongoClient } from 'mongodb';

 // Connection URL
 const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
 const client = await MongoClient.connect(MONGODB_URI);
 const coll = client.db('rainyday').collection('images');


//  -------
console.log("azure key", process.env.AZURE_OPENAI_API_KEY_4_0_VISION);
const model = new ChatOpenAI({
    temperature: 0.9,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY_4_0_VISION,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION_4_0_VISION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME_4_0_VISION,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_4_0_VISION,
    maxTokens: 2500,
  });

console.log("model", model);

export async function POST(req, res) {
    console.log('got here');
    try {
        // Access uploaded file
        const file = await req.formData();
        console.log(file)
        const imageFile = file.get('file');
        console.log(imageFile);

        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uniqueFilename = `${Date.now()}-${imageFile.name}`;

        // upload to Mongo
        await coll.insertOne({'name':uniqueFilename, 'file':buffer});
        console.log("Inserted into MongoDB");

        await client.close();



        const filename = join('/tmp/', uniqueFilename);
        console.log(filename);

        await writeFile(filename, buffer);
        console.log(`Saved to ${filename}`);


        /*const loader = new UnstructuredLoader(filename);
        console.log("loader: ", loader);
        const docs = await loader.load();
        console.log(docs[0].pageContent);
        const response_raw = docs[0].pageContent;
        */

        const prompt =
          `Describe the contents of the image that isn't attached (use your imaginitive powers). \n`;
        console.log('prompt:', prompt);
        const result = await model.invoke(prompt)//,response_raw);
        console.log('result:', result);



        // Respond with success message
        return NextResponse.json({ message: 'File uploaded successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal server error' });
    }
}