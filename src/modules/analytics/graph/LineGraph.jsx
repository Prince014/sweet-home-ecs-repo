import React from "react";
import ChartContainer from "../components/ChartContainer";

const LineChartPage = () => {
  const lineChartOptions = {
    chart: { id: "line-chart" },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
    colors: ["#1E3A8A"],
  };

  const lineChartSeries = [
    { name: "Revenue", data: [10, 41, 35, 51, 49, 62] },
  ];

  return (
    <div className="p-6 bg-gray-100 ">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">Line Chart</h1> */}
      <ChartContainer
        title="Revenue Over Time"
        options={lineChartOptions}
        series={lineChartSeries}
        type="line"
      />
    </div>
  );
};

export default LineChartPage;
