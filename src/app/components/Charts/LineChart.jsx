'use client';
import { ReactECharts } from './ReactECharts';
import { graphic } from 'echarts';
import { useMantineTheme } from '@mantine/core';

function LineChart(props) {
  const { data, title, series, subtitle } = props;
  const theme = useMantineTheme();

  const chartOptions = {
    title: {
      text: title,
      subtext: subtitle ? subtitle : '',
      padding: 20,
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      bottom: 'bottom',
      padding: 20,
    },
    tooltip: {
      trigger: 'item',
    },
    xAxis: {
      type: 'time',
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLabel: {
        padding: 0,
      },
    },
    grid: {
      left: 90,
    },
    series: series
      ? series
      : [
          {
            name: title,
            data: data,
            type: 'line',
            lineStyle: {
              color: theme.colors.green[8]
            },
            itemStyle: {
              color: theme.colors.green[8]
            },
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: theme.colors.green[8],
                },
                {
                  offset: 1,
                  color: theme.colors.green[4],
                },
              ]),
            },
          },
        ],
  };

  return <ReactECharts option={chartOptions} theme='light' />;
}

export default LineChart;
