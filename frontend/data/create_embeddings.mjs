import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { OpenAIEmbeddings } from '@langchain/openai';

dotenv.config({ path: ['.env.local', '.env'] });

// Connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = await MongoClient.connect(MONGODB_URI);

try {
  const embeddings = new OpenAIEmbeddings({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName:
      process.env.AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_NAME,
  });

  // Use connect method to connect to the Server
  await client.connect();
  console.log('Connected successfully to MongoDB');
  const collection = client.db('rainyday').collection('transactions');

  // iterate over the collection and create embeddings
  const cursor = collection.find({});
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const embedding = await embeddings.embedQuery(JSON.stringify(doc));
    console.log('embedding', embedding);
    await collection.updateOne(
      { _id: doc._id },
      { $set: { embedding: embedding } }
    );
  }
} catch (error) {
  console.error('Error: ', error);
} finally {
  // Close connection
  client.close();
  console.log('Connection to MongoDB closed');
}
