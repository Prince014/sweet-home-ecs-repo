import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartContainer = ({ title, options, series, type, height = 300 }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
      <ReactApexChart options={options} series={series} type={type} height={height} />
    </div>
  );
};

export default ChartContainer;
