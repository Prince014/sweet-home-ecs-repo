import React from "react";

const Relative = ({
  formData,
  onRelativeChange,
  onAddRelative,
  onSubmit,
  prevStep,
}) => {
  return (
    <div>
      <h2>Relative Information</h2>
      {formData.relatives.map((relative, index) => (
        <div key={index} className="form-group">
          <label>Relative Name</label>
          <input
            type="text"
            value={relative.name}
            onChange={(e) => onRelativeChange(index, "name", e.target.value)}
            required
          />
          <label>Relation</label>
          <input
            type="text"
            value={relative.relation}
            onChange={(e) =>
              onRelativeChange(index, "relation", e.target.value)
            }
            required
          />
          <label>Contact</label>
          <input
            type="text"
            value={relative.contact}
            onChange={(e) => onRelativeChange(index, "contact", e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={onAddRelative}>
        + Add Another Relative
      </button>
      <div className="form-group">
        <button className="prev-btn" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="submit-btn" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Relative;
