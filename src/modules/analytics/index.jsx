import React from "react";
import LineChartPage from "./graph/LineGraph";
import PieChartPage from "./graph/PieChart";
import BarChartPage from "./graph/BarGraph";

const Analytics = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>
      
      {/* Full-width Line Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <LineChartPage />
      </div>
      
      {/* Two-column layout for Pie and Bar Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <PieChartPage />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <BarChartPage />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
