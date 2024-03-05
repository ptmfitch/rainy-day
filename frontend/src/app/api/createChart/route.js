import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { PromptTemplate } from '@langchain/core/prompts';
import { MongoClient } from 'mongodb';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams;
  const question = searchParams.get('question');

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
  const retriever = vectorStore.asRetriever(30);
  //const prompt = (await pull) < ChatPromptTemplate > 'rlm/rag-prompt';

  // If a template is passed in, the input variables are inferred automatically from the template.
  const prompt = PromptTemplate.fromTemplate(
    `
    You are a helpful senior software developer. You only reply with a valid JSON formatted output.
    You only reply with a valid JSON formatted output. Do not add any additional information.
    Create an Apache ECharts chart based on these inputs:
    Question:
    {question}
  Context:
  {context}`
  );

  const llm = new ChatOpenAI({
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
    temperature: 0,
  });

  let retrievedDocs = await retriever.getRelevantDocuments(question);
  retrievedDocs.map((doc) => {
    doc.pageContent = JSON.stringify(doc.metadata);
  });

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser(),
    verbose: true,
  });

  let chart = await ragChain.invoke({
    question,
    context: retrievedDocs,
    verbose: true,
  });

  try {
    chart = JSON.parse(chart);

    return Response.json(chart);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({});
  }
}
