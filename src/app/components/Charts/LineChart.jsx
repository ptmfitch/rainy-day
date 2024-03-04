'use client';
import { ReactECharts } from './ReactECharts';
import { graphic } from 'echarts';

function LineChart(props) {
  const { data, title, series, subtitle } = props;

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
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)',
                },
              ]),
            },
          },
        ],
  };

  return <ReactECharts option={chartOptions} theme='light' />;
}

export default LineChart;
