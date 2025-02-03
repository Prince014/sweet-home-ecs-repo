import React from "react";
import "./shimmerTenantDetails.css";

const ShimmerTenantDetails = () => {
  return (
    <div className="shimmer-details-page">
      {/* Header Section */}
      <div className="shimmer-header-section">
        <div className="shimmer-header-info">
          <div className="shimmer-line title"></div>
          <div className="shimmer-line"></div>
        </div>
        <div className="shimmer-header-info">
          <div className="shimmer-line title"></div>
          <div className="shimmer-line"></div>
        </div>
        <div className="shimmer-header-image"></div>
      </div>

      {/* Details Section */}
      <div className="shimmer-details-grid">
        <div className="shimmer-box">
          <div className="shimmer-line title"></div>
          <div className="shimmer-line"></div>
          <div className="shimmer-line"></div>
          <div className="shimmer-image"></div>
        </div>
        <div className="shimmer-box">
          <div className="shimmer-line title"></div>
          <div className="shimmer-line"></div>
          <div className="shimmer-line"></div>
        </div>
        <div className="shimmer-box">
          <div className="shimmer-line title"></div>
          <div className="shimmer-line"></div>
          <div className="shimmer-line"></div>
          <div className="shimmer-line"></div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerTenantDetails;
