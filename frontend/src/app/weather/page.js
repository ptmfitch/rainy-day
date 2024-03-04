import BarChart from '../components/Charts/BarChart';

async function getWeatherSavings() {
  const res = await fetch('http://localhost:3000/api/weatherSavings', {
    cache: 'no-store',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Weather() {
  const weatherSavingsData = await getWeatherSavings();
  console.log('Weather Savings Data');
  console.log(weatherSavingsData);

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <BarChart title="Spend by Categories" data={weatherSavingsData} />
    </div>
  );
}
