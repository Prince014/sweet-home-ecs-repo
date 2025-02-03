import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { FaCheck, FaTimes } from "react-icons/fa";
import "assets/viewDetails.css";
import { API_URL } from "service/constant";
import userPlaceHolder from "assets/images/user.png";
import AccodianForDocumnets from "./AccodianForDocumnets";
import ShimmerTenantDetails from "common/loader/ShimmerTenantDetails";
import { fetchTenantDetails } from "../tenantSlice";
import { mainAxios } from "service/api";

const StatusIcon = ({ status }) => (
  status ? <FaCheck className="status-icon paid" /> : <FaTimes className="status-icon unpaid" />
);

const ViewDetailsOfUser = () => {
  const [plot, setPlot] = useState("");
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { tenantDetails } = useSelector((state) => state.tenant);
  const { tenant, room } = tenantDetails || {};

  // Fetch plot data
  const fetchPlotData = async (plotNumber) => {
    try {
      const response = await mainAxios.get(`${API_URL}/plots/${plotNumber}`);
      setPlot(response.data?.plotNumber);
    } catch (err) {
      console.error("Error fetching plot data:", err);
      setError(t("viewDetails.errorPlotMessage"));
    }
  };

  // Fetch tenant details
  const fetchData = async () => {
    try {
      setError(null);
      dispatch(fetchTenantDetails(id));
    } catch (err) {
      console.error("Error fetching tenant details:", err);
      setError(t("viewDetails.errorMessage"));
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (room?.plotNumber) {
      fetchPlotData(room.plotNumber);
    }
  }, [room]);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!tenant || !room) {
    return <ShimmerTenantDetails />;
  }

  return (
    <div className="details-page">
      {/* Header Section */}
      <div className="header-section">
        <div className="header-info">
          <p className="title tenant-name">{t("viewDetails.header.name")}: {tenant?.name}</p>
          <p className="tenant-contact">{t("viewDetails.header.contact")}: {tenant?.contact}</p>
        </div>
        <div className="header-info">
          <p className="title tenant-name">{t("viewDetails.header.plotNo")}: {plot}</p>
          <p className="tenant-contact">{t("viewDetails.header.rent")}: {tenant?.monthlyRent}</p>
        </div>
        <div className="header-image">
          <img src={tenant?.photo || userPlaceHolder} alt="Tenant" className="profile-image" />
        </div>
      </div>

      {/* Details Section */}
      <div className="details-grid">
        {/* Tenant Overview */}
        <div className="overview">
          <div className="details-p">
            <p className="title">{t("viewDetails.details.tenantOverview")}</p>
            <p>{t("viewDetails.details.entryDate")}: {new Date(tenant?.entryDate).toLocaleDateString()}</p>
            <p>{t("viewDetails.details.deposit")}: {tenant?.depositPaid}</p>
            {tenant?.aadharCard ? (
              <img src={tenant?.aadharCard} alt="Aadhar Card" className="preview-image-tenant" />
            ) : (
              <strong>{t("viewDetails.details.aadharCardNotUploaded")}</strong>
            )}
          </div>
          <AccodianForDocumnets content={tenant?.documents} />
          <button type="button" className="submit-btn" onClick={() => navigate(`/update-user/${id}`)}>
            {t("viewDetails.details.update")}
          </button>
        </div>

        {/* Payment Status */}
        <div className="status">
          <div className="details-p">
            <p className="title">{t("viewDetails.details.paymentStatus")}</p>
            <div className="status-item">
              <span>{t("viewDetails.details.rent")}: </span>
              <StatusIcon status={tenant?.rentPaid} />
            </div>
            <div className="status-item">
              <span>{t("viewDetails.details.lightBill")}: </span>
              <StatusIcon status={tenant?.utilityPaid} />
            </div>
          </div>
          <button type="button" className="submit-btn">
            {t("viewDetails.details.update")}
          </button>
        </div>

        {/* Room Details */}
        <div className="room-details">
          <div className="details-p">
            <p className="title">{t("viewDetails.details.roomDetails")}</p>
            <p>{t("viewDetails.details.roomNumber")}: {room?.roomNumber}</p>
            <p>{t("viewDetails.details.address")}: {room?.address}</p>
            <p><strong>{t("viewDetails.details.features")}:</strong></p>
            <ul>
              {Object.entries(room?.features || {}).map(([feature, value]) => (
                <li key={feature}>
                  <span className="feature-caps">{feature}:</span>
                  <StatusIcon status={value} />
                </li>
              ))}
            </ul>
          </div>
          <button type="button" className="submit-btn">
            {t("viewDetails.details.update")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDetailsOfUser;
