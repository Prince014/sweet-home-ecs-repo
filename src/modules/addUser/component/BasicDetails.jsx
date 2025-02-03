import React from "react";

const BasicDetails = ({ formData, onInputChange, nextStep }) => {
  console.log("BasicDetails props:", formData);
  return (
    <div>
      <h2>Basic Information</h2>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Contact</label>
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={onInputChange}
          required
        />
      </div>
      <div className="form-group">
        <button className="next-btn" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BasicDetails;
