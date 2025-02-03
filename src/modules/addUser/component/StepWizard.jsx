import React, { useState } from "react";
import StepWizard, { Step } from "react-step-wizard";
import Address from "./Address";
import "../../../assets/addTenantPage.css"; // Use your CSS here
import BasicDetails from "./BasicDetails";
import Relative from "./Relative";

export const AddTenantPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    roomNumber: "",
    plotNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    relatives: [
      {
        name: "",
        relation: "",
        contact: "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRelativeChange = (index, field, value) => {
    const updatedRelatives = [...formData.relatives];
    updatedRelatives[index][field] = value;
    setFormData((prev) => ({ ...prev, relatives: updatedRelatives }));
  };

  const addRelative = () => {
    setFormData((prev) => ({
      ...prev,
      relatives: [...prev.relatives, { name: "", relation: "", contact: "" }],
    }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted: ", formData);
    // Add your submission logic here
  };
  console.log({ formData });
  return (
    <div className="addTenantPage">
      <h1>Add Tenant</h1>
      <StepWizard>
        <Step>
          {({ nextStep }) => (
            <div>
              <h2>Step 1: Basic Details</h2>
              <p>Form fields go here</p>
              <button onClick={nextStep}>Next</button>
            </div>
          )}
        </Step>
        <Step>
          {({ prevStep }) => (
            <div>
              <h2>Step 2: Address Details</h2>
              <p>Form fields go here</p>
              <button onClick={prevStep}>Previous</button>
            </div>
          )}
        </Step>
        <Step>
          {({ prevStep }) => (
            <div>
              <h2>Step 3: Relative Information</h2>
              <p>Form fields go here</p>
              <button onClick={prevStep}>Previous</button>
            </div>
          )}
        </Step>
      </StepWizard>
    </div>
  );
};
