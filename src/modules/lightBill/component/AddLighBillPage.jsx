import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchTenantBills, setUnitsAndAmount } from "../lightBillSlice";
import "../css/addLightBillPage.css";
import { mainAxios } from "service/api";
import { API_URL } from "service/constant";
import getMonthOptions from "utils/getMonth";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Loader from "common/loader/Loader";

const AddLightBillPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation(); // Use the translation hook
  const { tenantId } = location?.state;

  const dispatch = useDispatch();
  const {
    unitRate,
    lastMonthUnits,
    consumedUnits,
    totalAmount,
    error,
    loading, 
    lastUnits
  } = useSelector((state) => state.lightBill);

  const [currentUnits, setCurrentUnits] = useState(0);
  const [readingDate, setReadingDate] = useState("");
  const [monthYear, setMonthYear] = useState("");

  useEffect(() => {
    dispatch(fetchTenantBills(tenantId));
  }, [tenantId, dispatch]);

  useEffect(() => {
    if (lastUnits !== 0 && currentUnits !== 0) {
      dispatch(
        setUnitsAndAmount({
          currentUnits,
          previousUnits: lastUnits,
          unitRate,
        })
      );
    }
  }, [currentUnits, lastUnits, unitRate, dispatch]);

  const handleUnitsChange = (e) => {
    const units = parseInt(e.target.value);
    setCurrentUnits(units);
  };

  const handleMonthChange = (e) => {
    setMonthYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const billData = {
        tenant: tenantId,
        previousUnits: lastUnits,
        currentUnits,
        unitRate,
        totalAmount,
        monthYear,
        readingDate,
      };

      await mainAxios.post(`${API_URL}/lightbills/create`, billData);
      toast.success(t("addLightBill.addSuccess")); // Use translation for success message
      navigate(`/light-bill/${tenantId}`);
    } catch (err) {
      console.error("Error adding light bill", err);
      toast.error(t("addLightBill.addError")); // Use translation for error message
    }
  };

  const monthOptions = getMonthOptions(t, { isYear: true });

  return (
    <div className="light-bill-form-container addLightBill">
      <h2
        className="wow bounceIn titleDiv"
        data-wow-offset="50"
        data-wow-delay="0.3s"
      >
        <span className="title">{t("addLightBill.addTitle")}</span>{t("addLightBill.addTitle1")} {/* Use translation */}
      </h2>
      {error && <div className="error">{error}</div>}
      {loading && <Loader />}
      <form onSubmit={handleSubmit} className="light-bill-form">
        <div className="form-group">
          <label htmlFor="readingDate">{t("addLightBill.readingDate")}</label>
          <input
            type="date"
            id="readingDate"
            value={readingDate}
            onChange={(e) => setReadingDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastMonthUnits">{t("addLightBill.lastMonthUnits")}</label>
          <input
            type="number"
            id="lastMonthUnits"
            value={lastUnits}
            disabled
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentUnits">{t("addLightBill.currentUnits")}</label>
          <input
            type="number"
            id="currentUnits"
            value={currentUnits}
            onChange={handleUnitsChange}
            required
          />
        </div>
        <div className="form-group multiply">
          <label htmlFor="consumeUnits">{t("addLightBill.consumeUnits")}</label>
          <input
            type="number"
            id="consumeUnits"
            value={consumedUnits}
            className="input-small"
          />
          <span className="multiply-sign">×</span>
          <label htmlFor="unitRate">{t("addLightBill.unitRate")}</label>
          <input
            type="number"
            id="unitRate"
            value={unitRate}
            readOnly
            disabled
            className="input-small"
          />
        </div>

        <div className="form-group">
          <label htmlFor="totalAmount">{t("addLightBill.totalAmount")}</label>
          <input
            type="number"
            id="totalAmount"
            value={totalAmount}
            disabled
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="monthYear">{t("addLightBill.billingMonth")}</label>
          <select
            id="monthYear"
            value={monthYear}
            onChange={handleMonthChange}
            required
          >
            <option value="">{t("addLightBill.selectMonth")}</option>
            {monthOptions?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">
          {t("addLightBill.addButton")} {/* Use translation */}
        </button>
      </form>
    </div>
  );
};

export default AddLightBillPage;
