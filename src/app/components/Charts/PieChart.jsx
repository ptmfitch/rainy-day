'use client';
import { ReactECharts } from './ReactECharts';

function PieChart(props) {
  const { data, title, subtitle, rose } = props;

  const chartOptions = {
    title: {
      text: title,
      subtext: subtitle ? subtitle : '',
      padding: 20,
    },
    tooltip: {
      trigger: 'item',
      valueFormatter: currencyFormatter,
    },
    legend: {
      type: 'scroll',
      orient: 'horizontal',
      bottom: 'bottom',
      padding: 20,
    },
    dataset: [
      {
        source: data,
      },
    ],
    series: [
      {
        type: 'pie',
        radius: '50%',
        roseType: rose ? 'radius' : undefined,
      },
      {
        type: 'pie',
        radius: '50%',
        roseType: rose ? 'radius' : undefined,
        label: {
          position: 'inside',
          formatter: '{d}%',
        },
        percentPrecision: 0,
        emphasis: {
          label: { show: true },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return <ReactECharts option={chartOptions} theme='light' />;
}

export default PieChart;
