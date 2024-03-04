import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import 'datejs'; // Import DateJS
import { ChatOpenAI } from '@langchain/openai';


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = await MongoClient.connect(MONGODB_URI);
const transactionsCollection = client.db('rainyday').collection('transactions');
export async function GET(request) {
  try {
    console.log('Fetching stories');
    const [ spendThisMonthResponse, spendLastMonthResponse] = await executeQueries();
    await client.close();

    const model = new ChatOpenAI({
      temperature: 0.9,
      azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
      azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
      azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
      azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
      maxTokens: 1000,
    });
    const prompt =
      `I spent £${JSON.stringify(spendThisMonthResponse)} this month and £${JSON.stringify(spendLastMonthResponse)} last month. Give me an insight in the following form [{"title":"Headline","insight":"Humorous insight","detail":"Detailed output including values","category":"OneWordCategory}].  Don't make any of the one word categories generic. \n`;
    const result = await model.invoke(prompt);
    console.log('result:', result);

    return NextResponse.json(JSON.parse(result.content));
  } catch (error) {
    // Handle the error gracefully
    console.error("Error fetching data:", error.message);
    return NextResponse.json({message: "Internal server error"});
  }
}


const spendThisMonth = async () => {
  console.log("Executing query 2");
  const query=[
    // Stage 1: Filter documents for the last 28 days
    {
      $match: {
        ts: {
          $gte: Date.today().addMonths(-2),
          // 28 days ago
          $lt: Date.today().addMonths(-1), // today
        },
      },
    },
  // Stage 2: Group by currency and calculate total spend
  {
    $group: {
      _id: null,
      totalSpend: {
        $sum: "$amount",
      },
    },
  },
  {
    $sort:
      /**
       * Provide any number of field/order pairs.
       */
      {
        totalSpend: -1,
      },
  },
  {
    $limit:
      /**
       * Provide the number of documents to limit.
       */
      5,
  }
  ];
  console.log('Query:', JSON.stringify( query )); 

  // return a simple aggregation
  return transactionsCollection.aggregate(query).toArray();
};

const spendLastMonth = async () => {
  console.log("Executing query 3");
  const query = [
    // Stage 1: Filter documents for the last 28 days
    {
      $match: {
        ts: {
          $gte: Date.today().addMonths(-3),
          // 28 days ago
          $lt: Date.today().addMonths(-2), // today
        },
      },
    },
  // Stage 2: Group by currency and calculate total spend
  {
    $group: {
      _id: null,
      totalSpend: {
        $sum: "$amount",
      },
    },
  },
  {
    $sort:
      /**
       * Provide any number of field/order pairs.
       */
      {
        totalSpend: -1,
      },
  },
  {
    $limit:
      /**
       * Provide the number of documents to limit.
       */
      5,
  }];
  console.log('Query:', JSON.stringify( query )); 
  // return a simple aggregation
  return transactionsCollection.aggregate(query).toArray();
}

// A simple example of a query
const query4 = async () => {
  console.log("Executing query 4");
  return transactionsCollection.find({ category: 'general' }).limit(1).toArray();
};

const executeQueries = async () => {
  try {
    const [ spendThisMonthResponse, spendLastMonthResponse] = await Promise.all([
      spendThisMonth(),
      spendLastMonth(),
    ]);
    // Process the results together
    console.log('spendThisMonth:', spendThisMonthResponse);
    console.log('spendLastMonth:', spendLastMonthResponse);
    return [ spendThisMonthResponse, spendLastMonthResponse];
    // Your additional processing logic here...
  } catch (error) {
    console.error('Error executing queries:', error);
    await client.close();
    return NextResponse.json({message: "Internal server error"});
  }
};