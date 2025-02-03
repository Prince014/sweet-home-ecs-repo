import React from "react";
import ChartContainer from "../components/ChartContainer";

const BarChartPage = () => {
  const barChartOptions = {
    chart: { id: "bar-chart" },
    xaxis: { categories: ["Product A", "Product B", "Product C","Product D"] },
    colors: ["#10B981"],
  };

  const barChartSeries = [
    { name: "Sales", data: [40, 70, 50,80] },
  ];

  return (
    <div className="p-6 bg-gray-100 ">
      {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">Bar Chart</h1> */}
      <ChartContainer
        title="Product Sales"
        options={barChartOptions}
        series={barChartSeries}
        type="bar"
      />
    </div>
  );
};

export default BarChartPage;
