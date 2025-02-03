import React from "react";
import "../css/allBill.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Table = ({ headers, rows, showAllBillsPath }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleShowAllBills = (tenantId) => {
    navigate(`/light-bill/${tenantId}`);
  };

  const handleAddBills = (tenantId) => {
    navigate(`/add-light-bill`, { state: { tenantId: tenantId } });
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length > 0 ? (
          rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.slice(0, -1).map((cell, cellIndex) => (
                <td key={cellIndex} data-label={headers[cellIndex]}>
                  {cell}
                </td>
              ))}
              <td>
                <button
                  onClick={() => handleShowAllBills(row[row.length - 1])}
                  className="show-all-btn"
                >
                  {t("tablePage.showAllBills")}
                </button>
                <button
                  onClick={() => handleAddBills(row[row.length - 1])}
                  className="show-all-btn add"
                >
                  {t("tablePage.addBill")}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={headers.length} className="no-data">
              {t("tablePage.noData")}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
