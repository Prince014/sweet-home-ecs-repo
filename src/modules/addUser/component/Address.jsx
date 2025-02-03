import React from "react";

const Address = ({ formData, onInputChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Address Information</h2>
      <div className="form-group">
        <label>Room Number</label>
        <input
          type="text"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Plot Number</label>
        <input
          type="text"
          name="plotNumber"
          value={formData.plotNumber}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <label>ZIP Code</label>
        <input
          type="text"
          name="zip"
          value={formData.zip}
          onChange={onInputChange}
        />
      </div>
      <div className="form-group">
        <button className="prev-btn" onClick={prevStep}>
          Previous
        </button>
        <button className="next-btn" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Address;
