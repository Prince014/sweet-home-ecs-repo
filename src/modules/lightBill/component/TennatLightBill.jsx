import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchTenantBills } from "../lightBillSlice";
import { useParams } from "react-router-dom";
import moment from "moment";
import { mainAxios } from "service/api";
import { API_URL } from "service/constant";
import { toast } from "react-toastify";
import "../css/tenantLightBill.css";
import Loader from "common/loader/Loader";

const TenantLightBill = () => {
  const { t } = useTranslation(); // i18n hook
  const { id } = useParams(); // Get tenantId from route
  const dispatch = useDispatch();
  const { tenantBills, loading, error } = useSelector(
    (state) => state.lightBill
  );
  const [isLoad,setIsLoad]=useState(false)

  const handlePayBill = async (bill) => {
    setIsLoad(true)
    try {
      const res = await mainAxios.post(`${API_URL}/lightbills/pay`, {
        billId: bill?._id,
        amountPaid: bill?.dueBalance,
      });
      console.log({ res });
      setIsLoad(false)
      toast.success(t("messages.paymentSuccess"));
      dispatch(fetchTenantBills(id));

    } catch (error) {
      setIsLoad(false)
      console.error({ error });
      toast.error(t("messages.paymentFailure"));
    }
  };

  useEffect(() => {
    dispatch(fetchTenantBills(id));
  }, [dispatch, id]);

  
    return (
      <div className="tenantTable">
        <div className="tenant-bills-page">
          {/* <p>{t("messages.loading")}</p> */}
          {loading &&<Loader /> }
          {!loading && !error && tenantBills.length > 0 ? (
            <>
              <h1 className="text-center">{tenantBills[0]?.tenant?.name}'s {t("title")}</h1>
              <table className="table">
                <thead>
                  <tr>
                    <th>{t("columns.date")}</th>
                    <th>{t("columns.previousUnit")}</th>
                    <th>{t("columns.currentUnit")}</th>
                    <th>{t("columns.unitsConsumed")}</th>
                    <th>{t("columns.ratePerUnit")}</th>
                    <th>{t("columns.totalBill")}</th>
                    <th>{t("columns.status")}</th>
                    <th>{t("columns.action")}</th>
                  </tr>
                </thead>
                <tbody>
                  {tenantBills.map((bill) => (
                    <tr key={bill._id}>
                      <td data-label={t("columns.date")}>
                        {moment(bill.createdAt).format("DD MMMM YYYY")}
                      </td>
                      <td data-label={t("columns.previousUnit")}>{bill.previousUnits}</td>
                      <td data-label={t("columns.currentUnit")}>{bill.currentUnits}</td>
                      <td data-label={t("columns.unitsConsumed")}>
                        {bill.currentUnits - bill.previousUnits}
                      </td>
                      <td data-label={t("columns.ratePerUnit")}>{bill.unitRate}</td>
                      <td data-label={t("columns.totalBill")}>{bill.totalAmount}</td>
                      <td
                        data-label={t("columns.status")}
                        className={
                          bill.paymentStatus === "Pending" ? "yellow-text" : "green-text"
                        }
                      >
                        {t(`statuses.${bill.paymentStatus.toLowerCase()}`)}
                      </td>
                      <td data-label={t("columns.action")}>
                        {bill.paymentStatus === "Paid" ? (
                          <span> ✅</span>
                        ) : (
                          <button
                            onClick={() => handlePayBill(bill)}
                            className="show-all-btn add m-0"
                            disabled={isLoad}
                          >
                            {isLoad ? t("statuses.paying") : t("buttons.pay")}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <p>{t("messages.noBills")}</p>
          )}
        </div>
      </div>
    );
    
  
};

export default TenantLightBill;
