import React from "react";
import ChartContainer from "../components/ChartContainer";

const PieChartPage = () => {
  const pieChartOptions = {
    chart: { id: "pie-chart" },
    labels: ["Category A", "Category B", "Category C"],
    colors: ["#6366F1", "#FBBF24", "#EF4444"],
  };

  const pieChartSeries = [44, 55, 13];

  return (
    <div className="p-6 bg-gray-100 ">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">Pie Chart</h1> */}
      <ChartContainer
        title="Market Share"
        options={pieChartOptions}
        series={pieChartSeries}
        type="pie"
      />
    </div>
  );
};

export default PieChartPage;
