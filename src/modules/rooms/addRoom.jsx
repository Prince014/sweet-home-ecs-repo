import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Features from "./components/Features";
import "../../assets/room.css";
import { useNavigate } from "react-router-dom";
import {
  setFormData,
  setFileInputs,
  addFileInput,
  removeFileInput,
  addRoom,
} from "./roomSlice";
import { fetchPlots } from "../addUser/tenantSlice";
import { useTranslation } from "react-i18next";

const RoomAddForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { formData, fileInputs, loading, error } = useSelector(
    (state) => state.room
  );
  const { plots } = useSelector((state) => state.tenant);

  // Fetch plot list from the backend
  useEffect(() => {
    dispatch(fetchPlots());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value === "yes" ? 1 : value === "no" ? 0 : 2;
    dispatch(setFormData({ features: { ...formData.features, [name]: numericValue } }));
  };

  const handleFileChange = (id, files) => {
    const updatedFileInputs = fileInputs.map((input) =>
      input.id === id ? { ...input, files } : input
    );
    dispatch(setFileInputs(updatedFileInputs));
  };

  const addNewFileInput = () => {
    dispatch(addFileInput());
  };

  const removeFileInputField = (id) => {
    dispatch(removeFileInput(id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(addRoom(formData, fileInputs));
      navigate("/all-room");
      toast.success(t("roomAddSuccess"));
      console.log(response);
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error(t("roomAddError"));
    }
  };

  return (
    <div className="room-add-form">
      <h2 className="wow bounceIn titleDiv" data-wow-offset="50" data-wow-delay="0.3s">
        <span className="title">{t("addRoom1")}</span>{t("addRoom2")}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="form-group">
          <label>{t("roomNumber")}</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("address")}</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>{t("plot")}</label>
          <select
            name="plot"
            value={formData.plot}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              {t("selectPlot")}
            </option>
            {plots.map((plot) => (
              <option key={plot._id} value={plot.plotNumber}>
                {plot.plotNumber} - {plot.area}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>{t("lightMeterUnit")}</label>
          <input
            type="number"
            name="lightMeterUnit"
            value={formData.lightMeterUnit}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>{t("deposit")}</label>
          <input
            type="number"
            name="deposit"
            value={formData.deposit}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>{t("monthlyRent")}</label>
          <input
            type="number"
            name="monthlyRent"
            value={formData.monthlyRent}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Dynamic File Upload */}
        <div className="form-group">
          <label>{t("documents")}</label>
          {fileInputs.map((input) => (
            <div key={input.id} className="file-input-wrapper">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleFileChange(input.id, e.target.files)}
              />
              {fileInputs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFileInputField(input.id)}
                  className="remove-btn"
                >
                  {t("remove")}
                </button>
              )}
              {/* Image Preview Section */}
              {input.files.length > 0 && (
                <div className="image-preview">
                  {Array.from(input.files).map((file, i) => (
                    <div key={i} className="image-preview-item">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${i}`}
                        className="preview-image"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button type="button" onClick={addNewFileInput} className="add-btn">
            {t("addMore")}
          </button>
        </div>

        {/* Features Section */}
        <Features formData={formData} handleFeatureChange={handleFeatureChange} />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading?t("adding"):t("addRoom")}
        </button>
      </form>

      {/* {loading && <p>{t("loading")}</p>} */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default RoomAddForm;
