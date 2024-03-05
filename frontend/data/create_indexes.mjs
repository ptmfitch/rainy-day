import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import AdmZip from 'adm-zip';
import { EJSON } from 'bson';

dotenv.config({ path: ['.env.local', '.env'] });

// Connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const output_db_name = 'rainyday'
const client = await MongoClient.connect(MONGODB_URI);
const db = client.db('rainyday');

/* Create index definitions  by running the below code in the mongo shell
const collections = db.getCollectionNames();

const indexInfo = {};

collections.forEach(collectionName => {
    const indexes = db[collectionName].getIndexes();
    const collectionIndexes = [];

    indexes.forEach(index => {
        collectionIndexes.push({
            name: index.name,
            key: index.key,
            searchIndex: 'No'
        });
    });

    try{
        const searchIndexes = db[collectionName].getSearchIndexes();
    
        searchIndexes.forEach(index => {
            collectionIndexes.push({
                name: index.name,
                key: index,
                searchIndex: 'Yes' 
            });
        });
    }catch(e){
        console.log(e);
    }

    indexInfo[collectionName] = collectionIndexes;
});

const jsonString = JSON.stringify(indexInfo, null, 2);
console.log(jsonString);
*/


var indexInfo = {
  "unsplash_images": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    }
  ],
  "savings_history": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    }
  ],
  "transactions_rt": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    }
  ],
  "statements": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    }
  ],
  "trigger_control": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    }
  ],
  "system.views": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    }
  ],
  "weather_ts": [],
  "system.buckets.weather_ts": [],
  "transactions": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    },
    {
      "name": "ts_1_category_1",
      "key": {
        "ts": 1,
        "category": 1
      },
      "searchIndex": "No"
    },
    {
      "name": "autocomplete",
      "key": {
        "id": "65e6fb2750d65e5a3c71683a",
        "name": "autocomplete",
        "type": "search",
        "status": "READY",
        "queryable": true,
        "latestDefinitionVersion": {
          "version": 1,
          "createdAt": "2024-03-05T11:08:08.259Z"
        },
        "latestDefinition": {
          "mappings": {
            "dynamic": true,
            "fields": {
              "amount": {
                "type": "autocomplete"
              },
              "category": {
                "type": "autocomplete"
              },
              "description": {
                "type": "autocomplete"
              }
            }
          }
        },
        "statusDetail": [
          {
            "hostname": "atlas-3g5fi2-shard-00-02",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 1,
                "createdAt": "2024-03-05T11:08:08.000Z"
              },
              "definition": {
                "mappings": {
                  "dynamic": true,
                  "fields": {
                    "amount": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    },
                    "description": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    },
                    "category": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    }
                  }
                }
              }
            }
          },
          {
            "hostname": "atlas-3g5fi2-shard-00-00",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 1,
                "createdAt": "2024-03-05T11:08:08.000Z"
              },
              "definition": {
                "mappings": {
                  "dynamic": true,
                  "fields": {
                    "amount": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    },
                    "description": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    },
                    "category": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    }
                  }
                }
              }
            }
          },
          {
            "hostname": "atlas-3g5fi2-shard-00-01",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 1,
                "createdAt": "2024-03-05T11:08:08.000Z"
              },
              "definition": {
                "mappings": {
                  "dynamic": true,
                  "fields": {
                    "amount": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    },
                    "description": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    },
                    "category": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    }
                  }
                }
              }
            }
          },
          {
            "hostname": "atlas-3g5fi2-shard-00-03",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 1,
                "createdAt": "2024-03-05T11:08:08.000Z"
              },
              "definition": {
                "mappings": {
                  "dynamic": true,
                  "fields": {
                    "amount": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    },
                    "description": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    },
                    "category": {
                      "type": "autocomplete",
                      "minGrams": 2,
                      "maxGrams": 15,
                      "foldDiacritics": true,
                      "tokenization": "edgeGram"
                    }
                  }
                }
              }
            }
          }
        ]
      },
      "searchIndex": "Yes"
    },
    {
      "name": "vector_index",
      "key": {
        "id": "65e6baa4678c737516570b41",
        "name": "vector_index",
        "type": "vectorSearch",
        "status": "READY",
        "queryable": true,
        "latestDefinitionVersion": {
          "version": 1,
          "createdAt": "2024-03-05T06:26:04.247Z"
        },
        "latestDefinition": {
          "fields": [
            {
              "type": "vector",
              "path": "embedding",
              "numDimensions": 1536,
              "similarity": "cosine"
            }
          ]
        },
        "statusDetail": [
          {
            "hostname": "atlas-3g5fi2-shard-00-00",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 1,
                "createdAt": "2024-03-05T06:26:04.000Z"
              },
              "definition": {
                "fields": [
                  {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": 1536,
                    "similarity": "cosine"
                  }
                ]
              }
            }
          },
          {
            "hostname": "atlas-3g5fi2-shard-00-01",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 1,
                "createdAt": "2024-03-05T06:26:04.000Z"
              },
              "definition": {
                "fields": [
                  {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": 1536,
                    "similarity": "cosine"
                  }
                ]
              }
            }
          },
          {
            "hostname": "atlas-3g5fi2-shard-00-02",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 1,
                "createdAt": "2024-03-05T06:26:04.000Z"
              },
              "definition": {
                "fields": [
                  {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": 1536,
                    "similarity": "cosine"
                  }
                ]
              }
            }
          },
          {
            "hostname": "atlas-3g5fi2-shard-00-03",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 1,
                "createdAt": "2024-03-05T06:26:04.000Z"
              },
              "definition": {
                "fields": [
                  {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": 1536,
                    "similarity": "cosine"
                  }
                ]
              }
            }
          }
        ]
      },
      "searchIndex": "Yes"
    }
  ],
  "images": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    }
  ],
  "category_by_description": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    },
    {
      "name": "vector_index",
      "key": {
        "id": "65e63e2bb192de68f47532b4",
        "name": "vector_index",
        "type": "vectorSearch",
        "status": "READY",
        "queryable": true,
        "latestDefinitionVersion": {
          "version": 0,
          "createdAt": "2024-03-04T21:33:31.544Z"
        },
        "latestDefinition": {
          "fields": [
            {
              "type": "vector",
              "path": "embedding",
              "numDimensions": 1536,
              "similarity": "cosine"
            }
          ]
        },
        "statusDetail": [
          {
            "hostname": "atlas-3g5fi2-shard-00-02",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 0,
                "createdAt": "2024-03-04T21:33:31.000Z"
              },
              "definition": {
                "fields": [
                  {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": 1536,
                    "similarity": "cosine"
                  }
                ]
              }
            }
          },
          {
            "hostname": "atlas-3g5fi2-shard-00-01",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 0,
                "createdAt": "2024-03-04T21:33:31.000Z"
              },
              "definition": {
                "fields": [
                  {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": 1536,
                    "similarity": "cosine"
                  }
                ]
              }
            }
          },
          {
            "hostname": "atlas-3g5fi2-shard-00-00",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 0,
                "createdAt": "2024-03-04T21:33:31.000Z"
              },
              "definition": {
                "fields": [
                  {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": 1536,
                    "similarity": "cosine"
                  }
                ]
              }
            }
          },
          {
            "hostname": "atlas-3g5fi2-shard-00-03",
            "status": "READY",
            "queryable": true,
            "mainIndex": {
              "status": "READY",
              "queryable": true,
              "definitionVersion": {
                "version": 0,
                "createdAt": "2024-03-04T21:33:31.000Z"
              },
              "definition": {
                "fields": [
                  {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": 1536,
                    "similarity": "cosine"
                  }
                ]
              }
            }
          }
        ]
      },
      "searchIndex": "Yes"
    }
  ],
  "weather_history": [
    {
      "name": "_id_",
      "key": {
        "_id": 1
      },
      "searchIndex": "No"
    }
  ]
}


try {

  // Recreate indexes for each collection
  for (const collectionName in indexInfo) {
    const indexes = indexInfo[collectionName];
    indexes.forEach(index => {
      if (index.searchIndex === 'Yes') {
        try{
        db[collectionName].createIndex(index.key, { name: index.name });
        } catch(e){
          console.log(e);
        }
      } else if (index.searchIndex === 'No') {
        try{
        db[collectionName].createSearchIndex(index.key, { name: index.name });
        } catch(e){
          console.log(e);
        }
      }
    });
  }

console.log("Indexes recreated successfully!");
} catch (error) {
  console.error('Error: ', error);
} finally {
  // Close connection
  client.close();
  console.log('Connection to MongoDB closed');
}
