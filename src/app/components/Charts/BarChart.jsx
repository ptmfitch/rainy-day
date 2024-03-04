'use client';
import { ReactECharts } from './ReactECharts';
import { graphic } from 'echarts';

function BarChart(props) {
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
            type: 'bar',
            showBackground: true,
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#83bff6' },
                { offset: 0.5, color: '#188df0' },
                { offset: 1, color: '#188df0' },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#2378f7' },
                  { offset: 0.7, color: '#2378f7' },
                  { offset: 1, color: '#83bff6' },
                ]),
              },
            },
          },
        ],
  };

  return <ReactECharts option={chartOptions} theme='light' />;
}

export default BarChart;
