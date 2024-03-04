exports = async function fetchForecast(city) {
  const { URL } = require("url");
  const weatherUrl = new URL("https://api.open-meteo.com");
  weatherUrl.pathname = "/v1/forecast";

  const longitude = city.coordinates[0];  
  const latitude = city.coordinates[1];
  const timezone = city.timezone;

  weatherUrl.search = `?latitude=${latitude}&longitude=${longitude}&daily=precipitation_sum,precipitation_hours&timezone=${timezone}`;
  // You can send HTTPS requests to external services
  const weatherResponse = await context.http.get({
    url: weatherUrl.toString(),
    headers: {
      Accept: ["application/json"],
      "Cache-Control": ["no-cache"]
    },
  });
  
  let forecast = JSON.parse(weatherResponse.body.text());
  forecast = {
    ...forecast,
    ...city
  };
  forecast.forecastedAt = new Date();
  
  console.log(JSON.stringify(forecast));
  await context.functions.execute("saveForecast", forecast);
  return forecast;
};
