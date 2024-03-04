'use client';

import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import { useState } from 'react';
import useSWR from 'swr';
import { Loader, Center } from '@mantine/core';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Categories() {
  const [activeChart, setActiveChart] = useState('line');

  const { data: lineChartData, isLoading: lineChartLoading } = useSWR('/api/spendChart', fetcher)
  const { data: pieChartData, isLoading: pieChartLoading} = useSWR('/api/totalPerCategory', fetcher)

  if (lineChartLoading || pieChartLoading) return <Center><Loader /></Center>
  
  return (
    <div style={{ height: '50vh', width: '100%' }}>
      {activeChart === 'line' && <LineChart title='Total Spend' data={lineChartData} />}
      {activeChart === 'pie' && <PieChart title='Spend by Categories' data={pieChartData} />}
    </div>
  );
}
