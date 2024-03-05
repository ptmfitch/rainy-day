import { NextResponse } from "next/server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { ChatOpenAI } from '@langchain/openai';

// Make PDF binary the input here?
// blob -> /tmp .pdf right before OpenAI parse?


export async function GET(req, res) {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('query');
  console.log(query);

    // PDF parse langchain
  const loader = new PDFLoader(query);
  // const loader = new PDFLoader("/tmp/bankstatementmar24.pdf");
  const docs = await loader.load();
  // improve this by looping array
  const response_raw = docs[0].pageContent + docs[1].pageContent;

  const model = new ChatOpenAI({
    temperature: 0.9,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY_4_0_VISION,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION_4_0_VISION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME_4_0_VISION,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_4_0_VISION,
    maxTokens: 2000,
  });
  const prompt =
    'Generate a list of JSON objects representing the transactions from the account statement. Add a new field to the JSON called category based on the description, and select one of the following (Subscriptions, General, Bills, Undefined). Please only provide the list of data as your response. \n';
  const result = await model.invoke(prompt + response_raw);
  // const output = JSON.stringify(result.content, null, 2)
  // console.log(output);
  return NextResponse.json(JSON.parse(result.content));
}


