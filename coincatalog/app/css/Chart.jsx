import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function Chart({ sparkline, priceChange }) {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        data: [],
      },
    ],
    chart: {
      type: "area",
      height: 60,
      sparkline: { enabled: true },
      animations: { enabled: true },
    },
    tooltip: { enabled: true },
    stroke: { width: 1 },
    colors: [],
  });

  useEffect(() => {
    if (sparkline && sparkline.price && sparkline.price.length > 0) {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: [{ data: sparkline.price }],
        colors: [chartColor()],
      }));
    } else {
      setChartOptions((prevOptions) => ({
        ...prevOptions,
        series: [{ data: [] }],
      }));
    }
  }, [sparkline, priceChange]);

  function chartColor() {
    return priceChange <= 0 ? "#ff3131" : "#25df3e";
  }

  return (
    <ReactApexChart
      options={chartOptions}
      series={chartOptions.series}
      className="chart"
      type="area"
      height={150}
    />
  );
}

export default Chart;
