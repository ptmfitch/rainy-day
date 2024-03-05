import { NextResponse, NextRequest } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import AWS from 'aws-sdk';
import fs from 'fs';
import axios from 'axios';
// -------

export async function POST(req, res) {
  try {
    // Access uploaded file
    const file = await req.formData();
    const imageFile = file.get('file');

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // upload file to AWS S3
    const s3 = new AWS.S3({
      accessKeyId: process.env.S3_KEY,
      secretAccessKey: process.env.S3_SECRET,
      sessionToken: process.env.S3_SESSION_TOKEN,
    });
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: imageFile.name,
      Body: buffer,
      acl: 'public-read',
    };
    const s3File = await s3.upload(params).promise();
    console.log('Uploaded to S3');

    const uniqueFilename = `${Date.now()}-${imageFile.name}`;

    const filename = join('/tmp/', uniqueFilename);
    console.log(filename);

    await writeFile(filename, buffer);
    console.log(`Saved to ${filename}`);
    const IMAGE_PATH = filename;

    const encoded_image = Buffer.from(fs.readFileSync(IMAGE_PATH)).toString(
      'base64'
    );

    const headers = {
      'Content-Type': 'application/json',
      'api-key': process.env.AZURE_OPENAI_API_KEY_4_0_VISION,
    };

    // Payload for the request
    const payload = {
      messages: [
        {
          role: 'system',
          content: [
            {
              type: 'text',
              text: 'You are an AI assistant that helps people find information.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${encoded_image}`,
              },
            },
            {
              type: 'text',
              text: 'Based on the image, describe 3 ways I could save money in the following form [{"title":"Headline","insight":"Humorous insight","detail":"Detailed output including values","category":"OneWordCategory"}].  Don\'t make any of the one word categories generic.',
            },
          ],
        },
      ],
      temperature: 0.7,
      top_p: 0.95,
      max_tokens: 800,
    };

    const GPT4V_ENDPOINT = `https://${process.env.AZURE_OPENAI_API_INSTANCE_NAME_4_0_VISION}.openai.azure.com/openai/deployments/${process.env.AZURE_OPENAI_API_DEPLOYMENT_NAME_4_0_VISION}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION_4_0_VISION}`;

    // Send request
    const res = await axios
      .post(GPT4V_ENDPOINT, payload, { headers: headers })
      .then((response) => {
        console.log(response.data.choices[0].message.content);
        return response.data.choices[0].message.content;
      })
      .catch((error) => {
        console.error(`Failed to make the request. Error: ${error}`);
      });

    // https://rainyday-s3-bucket.s3.eu-west-2.amazonaws.com/Screenshot+2024-03-04+at+13.34.57.png

    const result = JSON.parse(res);

    result.push({
      url: s3File.Location,
    });

    // Respond with success message
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
