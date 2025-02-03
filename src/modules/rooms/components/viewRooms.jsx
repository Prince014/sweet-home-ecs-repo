import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { mainAxios } from "../../../service/api";
import { API_URL, BASE_URL } from "../../../service/constant";
import userPlaceHolder from "../../../assets/images/user.png";
import nodataFound from "../../../assets/images/noData.png";
import { toast } from "react-toastify";
import "../../../assets/viewRoom.css";
import { useNavigate } from "react-router-dom";
import ShimmerLoader from "../../../common/loader/ShimmerLoader";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlots } from "../../addUser/tenantSlice";

const ViewRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { plots } = useSelector((state) => state.tenant);
  const { t } = useTranslation();

  // const [plots, setPlots] = useState([]); // List of available plots
  const [selectedPlot, setSelectedPlot] = useState(plots[0]?.plotNumber);
  const [rooms, setRooms] = useState([]); // List of rooms and tenants
  const [loading, setLoading] = useState(false);

  const getPlot = async () => {
    dispatch(fetchPlots());
    try {
      // const response = await mainAxios.get(`${API_URL}/plots/plotslist`);
      // setPlots(response?.data);
      // setSelectedPlot(response?.data?.[0]?.plotNumber);
    } catch (error) {
      console.log({ error });
    }
  };

  // Fetch rooms based on selected plot
  const fetchRooms = useCallback(
    async (plotNumber) => {
      setLoading(true);
      try {
        const response = await mainAxios.get(
          `${API_URL}/rooms/plot/${plotNumber}`
        );
        setRooms(response.data?.data);
        console.log("object");
        toast.success(response.data?.message);
      } catch (error) {
        console.log({ error });
        setRooms(error?.response?.data?.data);
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    },
    [selectedPlot]
  );

  // Handle dropdown change
  const handlePlotChange = (e) => {
    const plotNumber = e?.target?.value;
    setSelectedPlot(plotNumber);
  };

  const handleRedirection = (id) => {
    navigate(`/details/${id}`);
  };

  useEffect(() => {
    getPlot();
  }, []);

  useEffect(() => {
    if (selectedPlot) {
      fetchRooms(selectedPlot);
    }
  }, [selectedPlot, fetchRooms]);
  useEffect(() => {
    if (plots[0]?.plotNumber) {
      setSelectedPlot(plots[0]?.plotNumber);
    }
  }, [plots]);

  return (
    <div className="paymentPage">
      <h2
        className="wow bounceIn titleDiv"
        data-wow-offset="50"
        data-wow-delay="0.3s"
      >
        <span className="title">{t("viewRoom.title")}</span>
      </h2>

      <div className="dropdown-container">
        <label htmlFor="plotSelect" className="dropdown-label">
          {t("viewRoom.selectPlot")}:
        </label>
        <select
          id="plotSelect"
          value={selectedPlot}
          onChange={(e) => handlePlotChange(e)}
          className="dropdown-select"
        >
          <option value="">{t("viewRoom.selectPlotOption")}</option>
          {plots.map((plot, index) => (
            <option key={index} value={plot?.plotNumber}>
              {plot?.plotNumber}, {plot?.area}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <ShimmerLoader />
      ) : rooms?.length > 0 ? (
        <div className="roomContainer">
          {rooms.map((room) => (
            <div
              className={`roomCard ${!room.tenant ? "vacantRoom" : ""}`}
              key={room._id}
            >
              <h3>
                {t("viewRoom.room")} {room.roomNumber}
              </h3>
              {room.tenant ? (
                <div className="tenantDetails">
                  <img
                    src={
                      room?.tenant?.photo
                        ? room?.tenant?.photo
                        : userPlaceHolder
                    }
                    alt={room.tenant.name}
                    className="tenantImage "
                  />
                  <p>
                    <strong>{t("viewRoom.tenant")}:</strong> {room.tenant.name}
                  </p>
                  <p>
                    <strong>{t("viewRoom.contact")}:</strong>{" "}
                    {room.tenant.contact}
                  </p>
                  <p>
                    <strong>{t("viewRoom.rentPaid")}:</strong>{" "}
                    {room.tenant.rentPaid
                      ? t("viewRoom.yes")
                      : t("viewRoom.no")}
                  </p>
                  <p>
                    <strong>{t("viewRoom.utilitiesPaid")}:</strong>{" "}
                    {room.tenant.utilityPaid
                      ? t("viewRoom.yes")
                      : t("viewRoom.no")}
                  </p>
                  <button
                    className="payNowBtn"
                    onClick={() => handleRedirection(room.tenant._id)}
                  >
                    {t("viewRoom.viewDetails")}
                  </button>
                </div>
              ) : (
                <p className="noTenant">{t("viewRoom.noTenant")}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="noRoomsFound">
          <div className="noRoomsMessage">
            <img src={nodataFound} alt="No Data" className="noRoomsImage" />
            <h3 className="noRoomsText">{t("viewRoom.noRoomsFound")}</h3>
            <p className="noRoomsSubText">
              {t("viewRoom.selectDifferentPlot")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRoom;
