import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { MongoClient } from 'mongodb';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';

import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

export async function GET(req, res) {
  const embeddings = new OpenAIEmbeddings({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName:
      process.env.AZURE_OPENAI_EMBEDDINGS_DEPLOYMENT_NAME,
  });

  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const collection = client.db('rainyday').collection('transactions');

  const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
    collection,
    indexName: 'vector_index', // The name of the Atlas search index. Defaults to "default"
    textKey: 'text_key', // The name of the collection field containing the raw content. Defaults to "text"
    embeddingKey: 'embedding', // The name of the collection field containing the embedded text. Defaults to "embedding"
  });

  // Retrieve and generate using the relevant snippets of the blog.
  const retriever = vectorStore.asRetriever();
  //const prompt = (await pull) < ChatPromptTemplate > 'rlm/rag-prompt';

  // If a template is passed in, the input variables are inferred automatically from the template.
  const prompt = PromptTemplate.fromTemplate(
    `
    You are a helpful senior software developer. You only reply with a valid JSON formatted output.
    You only reply with a valid JSON formatted output. Do not add any additional information.
    Create an Apache ECharts chart based on this inputs:
  {question}
  Based on this context:
  {context}`
  );

  console.log(prompt);
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

  const question = `
  How much money have I spent on coffee this month on a daily basis?
  `;

  const retrievedDocs = await retriever.getRelevantDocuments(question, {
    limit: 100,
  });
  console.log('retrievedDocs');
  console.log(retrievedDocs);

  let chart = await ragChain.invoke({
    question,
    context: retrievedDocs,
  });

  console.log(chart);

  try {
    chart = JSON.parse(chart);

    console.log('chart');
    console.log(chart);

    return Response.json(chart);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({});
  }
}
