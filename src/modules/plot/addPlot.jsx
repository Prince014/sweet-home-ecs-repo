import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "assets/plotPage.css";
import { API_URL } from "service/constant";
import { mainAxios } from "service/api";

const AddPlot = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    plotNumber: "",
    area: "",
    address: "",
    ownerName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log({ formData });
    e.preventDefault();
    try {
      const response = await mainAxios.post(
        `${API_URL}/plots/addplots`,
        formData,
      );
      alert(t("addPlotList.successMessage"));
      setFormData({ plotNumber: "", area: "", address: "", ownerName: "" });
    } catch (error) {
      console.error("Error adding plot:", error);
      alert(t("addPlotList.errorMessage"));
    }
  };

  return (
    <div className="plotPage">
      <div className="addPlotPage">
        <h2
          className="wow bounceIn titleDiv"
          data-wow-offset="50"
          data-wow-delay="0.3s"
        >
          <span className="title">{t("addPlotList.headerTitle")}</span> {t("addPlotList.headerTitle1")}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("addPlotList.plotNumber")}:</label>
            <input
              type="text"
              name="plotNumber"
              value={formData.plotNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t("addPlotList.area")}:</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t("addPlotList.address")}:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t("addPlotList.ownerName")}:</label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            {t("addPlotList.submitButton")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPlot;
