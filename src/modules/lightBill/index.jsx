import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlots } from "../addUser/tenantSlice";
import { fetchLightBills, resetLightBills } from "./lightBillSlice";
import Table from "./component/Table";
import { useTranslation } from "react-i18next";
import moment from "moment";
import getMonthOptions from "utils/getMonth";
import "./css/lightBill.css";
import Loader from "common/loader/Loader";
import getMonthName from "utils/getMonthName";

const LightBillTable = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { plots } = useSelector((state) => state.tenant);
  const { lightBills, loading, error } = useSelector(
    (state) => state.lightBill
  );

  const [selectedPlot, setSelectedPlot] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [monthOptions, setMonthOption] = useState(getMonthOptions(t));

  const getList = () => {
    dispatch(
      fetchLightBills({
        plotId: selectedPlot,
        month: selectedMonth ? getMonthName(selectedMonth) : "",
        year: selectedYear,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchPlots());
  }, [dispatch]);

  useEffect(() => {
    if (plots.length > 0 && !selectedPlot) {
      setSelectedPlot(plots[0]._id);
    }
  }, [plots, selectedPlot]);

  useEffect(() => {
    if (selectedPlot) {
      getList();
    } else {
      dispatch(resetLightBills());
    }
  }, [selectedPlot, selectedMonth, selectedYear, dispatch]);

  const handlePlotChange = (e) => setSelectedPlot(e.target.value);
  const handleMonthChange = (e) => setSelectedMonth(e.target.value);
  const handleYearChange = (e) => {
    const temp = getMonthOptions(t, Number(e.target.value));
    setSelectedYear(Number(e.target.value));
  };

  const handleSeeAllClick = () => {
    setSelectedMonth("");
    setSelectedYear("");
    setSelectedPlot("");
    dispatch(resetLightBills()); // Reset the data when filters are cleared
  };

  const headers = [
    t("lightBillPage.tenantName"),
    t("lightBillPage.date"),
    t("lightBillPage.billMonth"),
    t("lightBillPage.ratePerUnit"),
    t("lightBillPage.previousUnits"),
    t("lightBillPage.currentUnits"),
    t("lightBillPage.totalBill"),
    t("lightBillPage.paymentStatus"),
    t("lightBillPage.actions"),
  ];

  const rows =
    lightBills?.map((bill) => [
      bill.tenant?.name || t("lightBillPage.notAvailable"),
      moment(bill.createdAt).format("DD MMM YYYY") ||
        t("lightBillPage.notAvailable"),
      bill.monthYear || t("lightBillPage.notAvailable"),
      bill.unitRate || t("lightBillPage.notAvailable"),
      bill.previousUnits || t("lightBillPage.notAvailable"),
      bill.currentUnits || t("lightBillPage.notAvailable"),
      bill.totalAmount || t("lightBillPage.notAvailable"),
      bill.paymentStatus || t("lightBillPage.notAvailable"),
      bill.tenant?._id || t("lightBillPage.notAvailable"),
    ]) || [];

  return (
    <div className="light-bill-table">
      {/* Plot Dropdown */}
      <h2
        className="wow bounceIn titleDiv"
        data-wow-offset="50"
        data-wow-delay="0.3s"
      >
        <span className="title">{t("tablePage.mainTitle")}</span> {t("tablePage.mainTitle1")}
      </h2>
      <div className="dropdown-container-lightbill">
        {/* Plot Dropdown */}
        <div className="dropdown-item">
          <select
            onChange={handlePlotChange}
            value={selectedPlot}
            className="form-select"
          >
            <option value="">{selectedPlot}</option>
            {plots.map((plot) => (
              <option key={plot._id} value={plot._id}>
                {plot.plotNumber} - {plot.area}
              </option>
            ))}
          </select>
        </div>

        {/* Month Dropdown */}
        <div className="dropdown-item">
          <select
            onChange={handleMonthChange}
            value={selectedMonth}
            className="form-select"
          >
            <option value="" disabled>
              {t("selectMonthPlaceholder")}
            </option>
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year Dropdown */}
        <div className="dropdown-item">
          <select
            onChange={handleYearChange}
            value={selectedYear}
            className="form-select"
          >
            <option value="" disabled>
              {t("selectYearPlaceholder")}
            </option>
            {Array.from(
              { length: 10 },
              (_, i) => new Date().getFullYear() - i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
         {/* "See All" Button */}
      {selectedMonth && selectedYear && <div className="dropdown-item">
        <button className="see-all-btn" onClick={handleSeeAllClick}>
          {t("seeAll")}
        </button>
      </div>}
      </div>

      {/* Status Messages */}
      {loading && <Loader />}
      {error && (
        <p className="error">
          {t("lightBillPage.error")} {error.message}
        </p>
      )}

     

      {/* Light Bills Table */}
      {!loading && lightBills.length > 0 ? (
        <Table headers={headers} rows={rows} />
      ) : (
        !loading && <h1 className="noData">{t("lightBillPage.noDataFound")}</h1>
      )}
    </div>
  );
};

export default LightBillTable;
