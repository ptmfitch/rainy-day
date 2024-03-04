import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { NextResponse } from 'next/server';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { MongoClient } from 'mongodb';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';

import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams
  const txn_id = searchParams.get('txn_id')

  const embeddings = new OpenAIEmbeddings({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_NAME,
  });

  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const rag_collection = client
    .db('rainyday')
    .collection('category_by_description');

  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection: rag_collection,
    indexName: 'vector_index', // The name of the Atlas search index. Defaults to "default"
    textKey: 'text_key', // The name of the collection field containing the raw content. Defaults to "text"
    embeddingKey: 'embedding', // The name of the collection field containing the embedded text. Defaults to "embedding"
  });

  // Retrieve and generate using the relevant snippets of the blog.
  const retriever = vectorStore.asRetriever();

  // If a template is passed in, the input variables are inferred automatically from the template.
  const prompt = PromptTemplate.fromTemplate(
    `Answer the following question:
  {question}
  Based on this context:
  {context}`
  );

  const llm = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
    temperature: 0,
  });

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
  });

  const txn_collection = client
    .db('rainyday')
    .collection('transactions');

  const txn = await txn_collection.findOne({'_id' : txn_id});

  const description = txn['description'];
  const question = `What is the category for "${description}". If you dont know, give the answer <UNKNOWN> and include the input. Output a raw json document with fields for description, category and reasoning`;

  const retrievedDocs = await retriever.getRelevantDocuments(description);

  const result = await ragChain.invoke({
    question,
    context: retrievedDocs,
  });

  client.close();
  console.log(result);

  return NextResponse.json(result);
}
