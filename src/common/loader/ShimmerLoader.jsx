import React from "react";
import "./shimmerLoader.css";

const ShimmerLoader = () => {
  return (
    <div className="shimmer-loader">
      {[1, 1, 1, 1].map((x, index) => (
        <>
          <div className="shimmer-room-card">
            <div className="shimmer-img"></div>
            <div className="shimmer-title"></div>
            <div className="shimmer-content"></div>
            <div className="shimmer-content"></div>
            <div className="shimmer-button"></div>
          </div>
        </>
      ))}
    </div>
  );
};

export default ShimmerLoader;
