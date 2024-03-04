'use client';

import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import { ReactECharts } from '../components/Charts/ReactECharts';
import { useState } from 'react';
import useSWR from 'swr';
import { Center, Loader, Group, Paper, Stack, Space, Text } from '@mantine/core';
import LeafyButton from '../components/LeafyButton';
import UnclassifiedTransactionCard from '../components/UnclassifiedTransactionCard';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Categories() {
  const [activeChart, setActiveChart] = useState('line');

  const { data: lineChartData, isLoading: lineChartLoading } = useSWR(
    '/api/spendChart',
    fetcher
  );
  const { data: pieChartData, isLoading: pieChartLoading } = useSWR(
    '/api/totalPerCategory',
    fetcher
  );
  // const { data: createChartData, isLoading: createChartLoading } = useSWR(
  //   '/api/createChart',
  //   fetcher
  // );

  const { data: uncatTxns, isLoading: uncatTxnsLoading } = useSWR(
    '/api/getUncategorisedTransactions',
    fetcher
  )

  const test = {
    title: {
      text: 'Sales Data 2021',
    },
    tooltip: {},
    legend: {
      data: ['Sales', 'Profit'],
    },
    xAxis: {
      data: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 90, 130, 140, 180, 200, 250],
      },
      {
        name: 'Profit',
        type: 'line',
        data: [20, 50, 30, 10, 5, 15, 8, 25, 30, 40, 50, 60],
      },
    ],
  };

  return (<Stack gap="lg" align="center">
    {lineChartLoading && <Paper 
      bg="gray.1"
      h='50vh' w="100%"
    >
      <Center h="100%" w="100%">
        <Stack align="center">
          <Loader />
          <Text>Loading charts...</Text>
        </Stack>
      </Center>
    </Paper>}
    {lineChartData && <div style={{ height: '50vh', width: '100%' }}>
      {activeChart === 'line' && (
        <LineChart title='Total Spend' data={lineChartData} />
      )}
      {activeChart === 'pie' && (
        <PieChart title='Spend by Categories' data={pieChartData} />
      )}
      {/* <ReactECharts option={createChartData} theme='light' /> */}
    </div>}
    <Group justify='center'>
      <LeafyButton
        variant='primary'
        onClick={() => setActiveChart('line')}
        disabled={activeChart === 'line'}
      >
        Total Spend
      </LeafyButton>
      <LeafyButton
        variant='primary'
        onClick={() => setActiveChart('pie')}
        disabled={activeChart === 'pie'}
      >
        Spend by Categories
      </LeafyButton>
    </Group>

    <Space h="20" />

    <Text size="xl">
      Uncategorised Transactions
    </Text>
    {uncatTxnsLoading && <Loader />}
    {Array.isArray(uncatTxns) && uncatTxns.map((txn, index) => 
      <UnclassifiedTransactionCard key={index} txn={txn}/>
    )}
  </Stack>);
}
