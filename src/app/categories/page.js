import LineChart from '../components/Charts/LineChart';

async function getData() {
  const res = await fetch('http://localhost:3000/api/spendChart', {
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

export default async function Categories() {
  const data = await getData();

  return (
    <div style={{ height: '50vh', width: '100%' }}>
      <LineChart title='Total Spend' data={data} />
    </div>
  );
}
