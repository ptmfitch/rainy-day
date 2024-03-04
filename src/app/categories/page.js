'use client';

import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import { useState } from 'react';
import useSWR from 'swr';
import { Center, Loader, Group } from '@mantine/core';
import LeafyButton from '../components/LeafyButton';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Categories() {
  const [activeChart, setActiveChart] = useState('line');

  const { data: lineChartData, isLoading: lineChartLoading } = useSWR('/api/spendChart', fetcher)
  const { data: pieChartData, isLoading: pieChartLoading} = useSWR('/api/totalPerCategory', fetcher)

  if (lineChartLoading) return <Center mt="xl"><Loader /></Center>
  
  return (<>
    <div style={{ height: '50vh', width: '100%' }}>
      {activeChart === 'line' && <LineChart title='Total Spend' data={lineChartData} />}
      {activeChart === 'pie' && <PieChart title='Spend by Categories' data={pieChartData} />}
    </div>
    <Group justify="center">
      <LeafyButton
        variant="primary"
        onClick={() => setActiveChart('line')}
        disabled={activeChart === 'line'}
      >
        Total Spend
      </LeafyButton>
      <LeafyButton
        variant="primary"
        onClick={() => setActiveChart('pie')}
        disabled={activeChart === 'pie'}
      >
        Spend by Categories
      </LeafyButton>
    </Group>
  </>);
}
