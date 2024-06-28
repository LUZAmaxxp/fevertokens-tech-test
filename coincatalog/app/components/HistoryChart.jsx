import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import Skeleton from "./Skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = ({ setError }) => {
  const { id } = useParams();
  const [days, setDays] = useState(7);
  const { data, error } = useAxios(
    `coins/${id}/market_chart?vs_currency=usd&days=${days}`
  );

  if (error) {
    setError(true);
    return null;
  }

  if (!data) {
    return (
      <div className="mx-auto max-w-[90%]">
        <Skeleton className="h-72 mb-10" />
      </div>
    );
  }

  const coinChartData = data.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
    height: 700,
    width: 700,
  };

  const chartData = {
    labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map((val) => val.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded-3xl ${
            days === 7 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setDays(7)}
        >
          7 Days
        </button>
        <button
          className={`px-4 py-2 rounded-3xl ${
            days === 24 ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
          onClick={() => setDays(24)}
        >
          24 Days
        </button>
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
};

export default HistoryChart;
