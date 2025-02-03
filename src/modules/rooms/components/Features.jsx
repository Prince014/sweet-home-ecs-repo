import React from "react";
import { useTranslation } from "react-i18next";

const Features = ({ formData, handleFeatureChange }) => {
  const { t } = useTranslation(); // Use translation hook

  return (
    <div className="form-group features">
      <h3>{t("features")}</h3>

      <div className="feature-item">
        <label>{t("tap")}:</label>
        <div className="feature-options">
          <label>
            <input
              type="radio"
              name="tap"
              value="yes"
              checked={formData.features.tap === 1}
              onChange={handleFeatureChange}
            />
            {t("yes")}
          </label>
          <label>
            <input
              type="radio"
              name="tap"
              value="no"
              checked={formData.features.tap === 0}
              onChange={handleFeatureChange}
            />
            {t("no")}
          </label>
          <label>
            <input
              type="radio"
              name="tap"
              value="repair"
              checked={formData.features.tap === 2}
              onChange={handleFeatureChange}
            />
            {t("repair")}
          </label>
        </div>
      </div>

      <div className="feature-item">
        <label>{t("door")}:</label>
        <div className="feature-options">
          <label>
            <input
              type="radio"
              name="door"
              value="yes"
              checked={formData.features.door === 1}
              onChange={handleFeatureChange}
            />
            {t("yes")}
          </label>
          <label>
            <input
              type="radio"
              name="door"
              value="no"
              checked={formData.features.door === 0}
              onChange={handleFeatureChange}
            />
            {t("no")}
          </label>
          <label>
            <input
              type="radio"
              name="door"
              value="repair"
              checked={formData.features.door === 2}
              onChange={handleFeatureChange}
            />
            {t("repair")}
          </label>
        </div>
      </div>

      <div className="feature-item">
        <label>{t("window")}:</label>
        <div className="feature-options">
          <label>
            <input
              type="radio"
              name="window"
              value="yes"
              checked={formData.features.window === 1}
              onChange={handleFeatureChange}
            />
            {t("yes")}
          </label>
          <label>
            <input
              type="radio"
              name="window"
              value="no"
              checked={formData.features.window === 0}
              onChange={handleFeatureChange}
            />
            {t("no")}
          </label>
          <label>
            <input
              type="radio"
              name="window"
              value="repair"
              checked={formData.features.window === 2}
              onChange={handleFeatureChange}
            />
            {t("repair")}
          </label>
        </div>
      </div>

      <div className="feature-item">
        <label>{t("kitchenSink")}:</label>
        <div className="feature-options">
          <label>
            <input
              type="radio"
              name="kitchenSink"
              value="yes"
              checked={formData.features.kitchenSink === 1}
              onChange={handleFeatureChange}
            />
            {t("yes")}
          </label>
          <label>
            <input
              type="radio"
              name="kitchenSink"
              value="no"
              checked={formData.features.kitchenSink === 0}
              onChange={handleFeatureChange}
            />
            {t("no")}
          </label>
          <label>
            <input
              type="radio"
              name="kitchenSink"
              value="repair"
              checked={formData.features.kitchenSink === 2}
              onChange={handleFeatureChange}
            />
            {t("repair")}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Features;
