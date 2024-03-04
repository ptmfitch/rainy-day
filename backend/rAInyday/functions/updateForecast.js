exports = async function updateForeacast() {
    const forecastColl = await context.services.get("mongodb-atlas").db("rainyday").collection("weather");
    
    const forecasts = await forecastColl.find().toArray();
    forecasts.forEach(async (forecast) => {
      console.log(JSON.stringify(forecast)); 
      const result = await context.functions.execute("fetchForecast", forecast);
      console.log(JSON.stringify(result)); 
    });
};
