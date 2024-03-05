import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { OpenAIEmbeddings } from '@langchain/openai';

dotenv.config({ path: ['.env.local', '.env'] });

// Connection URL
const MONGODB_URI =
  process.env.MONGODB_URI_ANALYTICS || 'mongodb://localhost:27017';
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

  // Create the category by description collection
  var pipeline = [
    {
      $group: {
        _id: '$description',
        category: {
          $first: '$category',
        },
        cnt: {
          $sum: 1,
        },
      },
    },
    {
      $merge: {
        into: 'category_by_description',
      },
    },
  ];

  const category_collection = client
    .db('rainyday')
    .collection('category_by_description');
  await category_collection.deleteMany({});
  const transactions_collection = client
    .db('rainyday')
    .collection('transactions');
  await transactions_collection.aggregate(pipeline).toArray();

  // iterate over the collection and create embeddings
  const cursor = category_collection.find({});

  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const description = doc['_id'];
    const category = doc['category'];
    const embedding = await embeddings.embedQuery(description);
    const text_key = `The category for '${description}' is '${category}'`;
    await category_collection.updateOne(
      { _id: doc._id },
      { $set: { text_key: text_key, embedding: embedding } }
    );
  }
} catch (error) {
  console.error('Error: ', error);
} finally {
  // Close connection
  client.close();
  console.log('Connection to MongoDB closed');
}
