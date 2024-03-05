'use client';

import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';
import { useState } from 'react';
import useSWR from 'swr';
import { Center, Group, Loader, Paper, Stack, Text, SegmentedControl, Space, TextInput } from '@mantine/core';
import { ReactECharts } from '../components/Charts/ReactECharts';
import LeafyButton from '../components/LeafyButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh, faX } from '@fortawesome/free-solid-svg-icons';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Categories() {
  const [activeChart, setActiveChart] = useState('line');
  const [tempQuestion, setTempQuestion] = useState('Create a bar chart showing my spend on coffee');
  const [question, setQuestion] = useState(tempQuestion);

  const { data: lineChartData, isLoading: lineChartLoading } = useSWR(
    '/api/spendChart',
    fetcher
  );
  const { data: pieChartData, isLoading: pieChartLoading } = useSWR(
    '/api/totalPerCategory',
    fetcher
  );

  const { data: createChartData, isLoading: createChartLoading, mutate } = useSWR(
    `/api/createChart?question=${question}`,
    fetcher
  );

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

  return (<>
  <Stack gap="lg" align="center">
    {(lineChartLoading || (activeChart === 'ai' && createChartLoading)) && <Paper 
      bg="gray.1"
      h='75vh' w="100%"
    >
      <Center h="100%" w="100%">
        <Stack align="center">
          <Loader />
          <Text>Loading charts...</Text>
        </Stack>
      </Center>
    </Paper>}
    {!lineChartLoading && <div style={{ height: '75vh', width: '100%' }}>
      {activeChart === 'line' && (
        <LineChart title='Total Spend' data={lineChartData} />
      )}
      {(activeChart === 'pie' && !pieChartLoading) && (
        <PieChart title='Spend by Categories' data={pieChartData} />
      )}
      {(activeChart === 'ai' && !createChartLoading) && (
        <ReactECharts option={createChartData} theme='light' />
      )}
    </div>}

    <SegmentedControl 
      fullWidth={true}
      color="green.7"
      value={activeChart}
      onChange={setActiveChart}
      data={[
        { value: 'line', label: 'Total Spend' },
        { value: 'pie', label: 'Spend by Categories' },
        { value: 'ai', label: 'Ask rAINy'}
      ]}
    />    

    {activeChart === 'ai' && <Group pl="xl" pr="xl" w="100%" justify="space-between">
      <TextInput 
        w="60%"
        value={tempQuestion}
        onChange={(event) => setTempQuestion(event.target.value)}
      />
      <LeafyButton onClick={() => setQuestion(tempQuestion)} variant="primary">
        <FontAwesomeIcon icon={faRefresh}/>
      </LeafyButton>
      <LeafyButton onClick={() => setTempQuestion('')} variant="danger">
        <FontAwesomeIcon icon={faX}/>
      </LeafyButton>
    </Group>}
  </Stack>
  </>);
}
