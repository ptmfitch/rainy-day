exports = async function saveForecast(forecast) {
  const mongodb = context.services.get("mongodb-atlas");
  const forecastColl = mongodb.db("rainyday").collection("weather_ts");

  try {
    const result = await forecastColl.insertOne(forecast);
    console.log(`forecast updated`);
  } catch (err){
    console.log(JSON.stringify(err));
  }
};