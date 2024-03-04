import { NextResponse } from 'next/server';
import { createApi } from 'unsplash-js';
import { MongoClient } from 'mongodb';

const api = createApi({
  // Don't forget to set your access token here!
  // See https://unsplash.com/developers
  accessKey: process.env.UNSPLASH_API_KEY,
});

export async function GET(request) {
  const apiKey = process.env.UNSPLASH_API_KEY;
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get('query');

  // Check if the query is in the cache
  const cachedImage = await getImageFromCache(query);
  if (cachedImage) {
    console.log('Found image in cache for query: ', query);
    return NextResponse.json(cachedImage.image);
  }

  const encodedQuery = encodeURIComponent(query);
  const unsplashURL = `https://api.unsplash.com/photos/random?query=${encodedQuery}&count=1&client_id=${apiKey}`;
  console.log(
    'Fetching images from Unsplash with query: ',
    query,
    ' URL: ',
    unsplashURL
  );
  const response = await fetch(unsplashURL);
  console.log('Unsplash replied with status: ', response.status);
  // const response = await fetch(`https://api.unsplash.com/photos/random?query=${query}&count=1&client_id=${apiKey}`);
  if (response.status !== 200) {
    return new NextResponse(
      'Failed to fetch data from Unsplash with error ' +
        response.status +
        ' and message: ' +
        response.statusText +
        ' for query: ' +
        query,
      { status: response.status }
    );
  }
  const data = await response.json();

  // Save the image to the cache
  await saveImageToCache(query, data[0]);

  // console.log(data[0]);
  return NextResponse.json(data[0]);
}
// Example URL for sending a query
// https://example.com/api/categoryImageLookup?query=mountains
/* example response
{
  "id": "gqXiNKlddCo",
  "slug": "close-up-photography-of-pendant-lamp-gqXiNKlddCo",
  "created_at": "2017-11-05T05:37:24Z",
  "updated_at": "2024-03-04T07:03:27Z",
  "promoted_at": "2017-11-05T21:54:37Z",
  "width": 4000,
  "height": 6000,
  "color": "#0c2640",
  "blur_hash": "L43Iu3WB8^oz.TaxDhoytRa}Rjj[",
  "description": "rainy night",
  "alt_description": "close up photography of pendant lamp",
  "breadcrumbs": [
    
  ],
  "urls": {
    "raw": "https://images.unsplash.com/photo-1509859673980-07412b804ae9?ixid=M3w1NzQ4OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDk1NjAxMDl8&ixlib=rb-4.0.3",
    "full": "https://images.unsplash.com/photo-1509859673980-07412b804ae9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1NzQ4OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDk1NjAxMDl8&ixlib=rb-4.0.3&q=85",
    "regular": "https://images.unsplash.com/photo-1509859673980-07412b804ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzQ4OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDk1NjAxMDl8&ixlib=rb-4.0.3&q=80&w=1080",
    "small": "https://images.unsplash.com/photo-1509859673980-07412b804ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzQ4OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDk1NjAxMDl8&ixlib=rb-4.0.3&q=80&w=400",
    "thumb": "https://images.unsplash.com/photo-1509859673980-07412b804ae9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NzQ4OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDk1NjAxMDl8&ixlib=rb-4.0.3&q=80&w=200",
    "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1509859673980-07412b804ae9"
  },
  "links": {
    "self": "https://api.unsplash.com/photos/close-up-photography-of-pendant-lamp-gqXiNKlddCo",
    "html": "https://unsplash.com/photos/close-up-photography-of-pendant-lamp-gqXiNKlddCo",
    "download": "https://unsplash.com/photos/gqXiNKlddCo/download?ixid=M3w1NzQ4OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDk1NjAxMDl8",
    "download_location": "https://api.unsplash.com/photos/gqXiNKlddCo/download?ixid=M3w1NzQ4OTF8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDk1NjAxMDl8"
  },
  "likes": 418,
  "liked_by_user": false,
  "current_user_collections": [
    
  ],
  "sponsorship": null,
  "topic_submissions": {
    
  },
  "user": {
    "id": "swDlqxUPm8s",
    "updated_at": "2024-01-17T01:23:06Z",
    "username": "bernard_",
    "name": "Bernard",
    "first_name": "Bernard",
    "last_name": null,
    "twitter_username": "_Bern_rd",
    "portfolio_url": null,
    "bio": null,
    "location": null,
    "links": {
      "self": "https://api.unsplash.com/users/bernard_",
      "html": "https://unsplash.com/@bernard_",
      "photos": "https://api.unsplash.com/users/bernard_/photos",
      "likes": "https://api.unsplash.com/users/bernard_/likes",
      "portfolio": "https://api.unsplash.com/users/bernard_/portfolio",
      "following": "https://api.unsplash.com/users/bernard_/following",
      "followers": "https://api.unsplash.com/users/bernard_/followers"
    },
    "profile_image": {
      "small": "https://images.unsplash.com/profile-1566617828125-4ec3a305b00fimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
      "medium": "https://images.unsplash.com/profile-1566617828125-4ec3a305b00fimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
      "large": "https://images.unsplash.com/profile-1566617828125-4ec3a305b00fimage?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128"
    },
    "instagram_username": "b.e.r.n.a.r.d_",
    "total_collections": 0,
    "total_likes": 77,
    "total_photos": 17,
    "total_promoted_photos": 9,
    "accepted_tos": true,
    "for_hire": true,
    "social": {
      "instagram_username": "b.e.r.n.a.r.d_",
      "portfolio_url": null,
      "twitter_username": "_Bern_rd",
      "paypal_email": null
    }
  },
  "exif": {
    "make": "NIKON CORPORATION",
    "model": "NIKON D3300",
    "name": "NIKON CORPORATION, NIKON D3300",
    "exposure_time": "1/125",
    "aperture": "5.6",
    "focal_length": "55.0",
    "iso": 400
  },
  "location": {
    "name": "Yogyakarta, Indonesia",
    "city": "Yogyakarta",
    "country": "Indonesia",
    "position": {
      "latitude": -7.7955798,
      "longitude": 110.3694896
    }
  },
  "views": 1326294,
  "downloads": 14083
}
*/

function getImageFromCache(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const MONGODB_URI =
        process.env.MONGODB_URI || 'mongodb://localhost:27017';
      const client = await MongoClient.connect(MONGODB_URI);
      const result = await client
        .db('rainyday')
        .collection('unsplash_images')
        .findOne({ query: query });
      console.log('Found image in cache for query: ', query);
      resolve(result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      reject(error);
    }
  });
}

function saveImageToCache(query, image) {
  return new Promise(async (resolve, reject) => {
    try {
      const MONGODB_URI =
        process.env.MONGODB_URI || 'mongodb://localhost:27017';
      const client = await MongoClient.connect(MONGODB_URI);
      const result = await client
        .db('rainyday')
        .collection('unsplash_images')
        .insertOne({ query: query, image: image });
      console.log('Saved image to cache for query: ', query);
      resolve(result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      reject(error);
    }
  });
}
