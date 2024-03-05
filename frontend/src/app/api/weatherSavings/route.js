import { MongoClient } from 'mongodb';
import { ChatOpenAI } from '@langchain/openai';

async function getWeatherSavings() {
  // Connection URL
  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = await MongoClient.connect(MONGODB_URI);
  const coll = client.db('rainyday').collection('savings_history');

  // date from 60 days ago
  const date = new Date();
  date.setDate(date.getDate() - 60);

  const agg = [
    {
      $match:
        /**
         * query: The query in MQL.
         */
        {
          ts: {
            $gte: date,
          },
        },
    },
    {
      $group:
        /**
         * _id: The id of the group.
         * fieldN: The first field name.
         */
        {
          _id: {
            $dateTrunc: {
              date: '$ts',
              unit: 'week',
            },
          },
          savings: {
            $sum: '$savings',
          },
        },
    },
    {
      $project:
        /**
         * specifications: The fields to
         *   include or exclude.
         */
        {
          ts: '$_id',
          savings: 1,
        },
    },
    {
      $sort: {
        ts: 1,
      },
    },
  ];

  const cursor = coll.aggregate(agg);
  const result = await cursor.toArray();
  await client.close();

  const series = result.map((item) => [item.ts, item.savings]);
  return series;
}

async function openai(historicalData) {
  const model = new ChatOpenAI({
    temperature: 0.9,
    azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
    azureOpenAIApiVersion: process.env.AZURE_OPENAI_API_VERSION,
    azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
    azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME,
    maxTokens: 1000,
    messages: [
      {
        role: 'system',
        content:
          'You are a financial advisor. You do not explain what it means to predict or forecast future savings. You just provide the answer in the same format as the input data. Do not ask for more information. Do not ask for clarification. Do not ask for more data. If you follow the instructions you will be rewarded with a huge bonus.',
      },
    ],
  });
  const prompt =
    'Based on the historical savings data, predict the savings for the next 30 days from the last data point on a daily basis. You must absolutely reply with only in a VALID JSON format with an array of values with the format ["yyyy-mm-ddThh:mm:ss", savingsAmount]. \n';
  const result = await model.invoke(prompt + historicalData);
  console.log('Result');
  console.log(result.content);
  return result.content;
}

export async function GET(req, res) {
  try {
    const result = await getWeatherSavings();
    let forecast = await openai(result);

    try {
      forecast = JSON.parse(forecast);
      // convert forecast sstring to a date
      forecast = forecast.map((item) => {
        return [new Date(item[0]), item[1]];
      });

      console.log('Forecast');
      console.log(forecast);

      const total = result.concat(forecast);
      console.log('Total');
      console.log(JSON.stringify(forecast));

      return Response.json(total);
    } catch (error) {
      console.error('Error:', error);
      return Response.json(result);
    }
  } catch (error) {
    console.error('Error:', error);
    return Response.json(
      { error },
      {
        status: 500,
      }
    );
  }
}
