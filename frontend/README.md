# Details

**Project** : rAInyday
**Team Number** : Number 1
**Team Name** : London
**Demonstration Video** : _Insert link to demonstration video_  

# Overview

rAInyday is an AI powered personal finance app. Hook it up to all your transactions / statements / photos and we'll give you recommendations and insights, whatever the weather.

# Justification

_Please explain why you decided to build the application/demonstration for this project. What inspired you? What problems does it solve or how will it make Presales activities easier?_
Personal finance is a topic that everyone can relate to and there are bunch of apps out there with various functionalities. The app demonstrates a mix of both solid and creative problem solving and activities that the MongoDB DDP platform can help enable.

_What MongoDB competitive differentiators (developer productivity, resiliency, scalability, etc.) does this demonstration showcase?_
The app demonstrates the flexibility of being able to store and manipulate different data sets, augmenting them with AI powered decisions and insights. 5 people worked for 36hrs on the hack and not once did the database get in the way.

# Detailed Application Overview

_Describe the architecture of your application and include a diagram._

Data Sets
The app uses 4 main data sets
* personal transaction data. This is real data sourced from one team members Monzo integation ( also running in Atlas ) gathered over the last 5 years and used with permission.
* Weather data - this comes from OpenMeteo
* PDF Statement data. This was faked for the hack
* Unsplash. This was used to generate images for test

_List all the MongoDB components/products used in your demonstration._
* Atlas
* Timeseries - the weather data is stored in a timeseries collection for efficient querying
* Analytic nodes to isolate the aggregations / search queries
* Vector search - used in categorisation, image suggestion, graph generation
* Online Archive
* App Services
* Search. Powers the search bar on every page

_Describe what you application does and how it works_
* There is a history of transactions in the database that have been categoried according to their description, but there is logic built on OpenAI to use RAG to query an LLM to categorise transactions with missing categories
* Weather data is periodically fetched from OpenMeteo using a scheduled Atlas trigger

The app is made of of 6 screens

* The home page shows a list of accounts and stories about the top 3 categories of transcations. The story images and tag lines are AI generated using Unsplash

* The category screen uses aggregations to display charts of transaction / categry activity. Uncategorised transactions are shown at the bottom. Hitting the button makes a call into OpenAI to discern a category for the transaction which you can accept.

There is a box on this screen so that you can enter free text to generate your custom chart. This uses AI to drive Apache eCharts

* The weather page shows the weather patterns for the last week and will prompt you to save on a rainy day! The text box at the bottom uses AI to let you know how much you saved in interesting units

* PDF import. This screen allows for the import of a PDF. The PDF is then imported into the database.

* Category Analysis screen

* ImageSaver screen. Upload an image and AI will suggest ways of saving money based on the image!

# Roles and Responsibilities

* Peter Fitch - UI
* James Miles - PDF Import
* Carlos Castro - Weather data, chart generation
* Ralph Johnson - Spending Stories, Comparison and Image Saver Insights
* James Osgood - transaction import and categorisation

# Demonstration Script

Install the Atlas environment using the terraform script

To seed all the data, run

    npm run seed_data

This runs all the scripts in the data directory

* create_transactions.mjs
* create_embeddings.mjs
* create_category_by_description.mjs
* savings_history.mjs
* total_savings.mjs
* seed.mjs

_The demonstration script should provide all the information required for another MongoDB SA to deliver your demonstration to a prospect. This should include:_

* 
* _step by step instructions on how to give the demonstration_
* _key points to emphasize at each point in the demonstration_
* Re-running the seed_data script will reset the database back to the default state


