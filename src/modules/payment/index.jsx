import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { mainAxios } from "service/api";
import { API_URL, BASE_URL } from "service/constant";
import userPlaceHolder from "assets/images/user.png";
import nodataFound from "assets/images/noData.png";
import PaymentModal from "./component/PaymentModal";
import "assets/paymentPage.css";
import ShimmerLoader from "common/loader/ShimmerLoader";

const PaymentPage = () => {
  const [plots, setPlots] = useState([]); // List of available plots
  const [selectedPlot, setSelectedPlot] = useState(""); // Selected plot number
  const [rooms, setRooms] = useState([]); // List of rooms and tenants
  const [loading, setLoading] = useState(false);
  const [isPayment, setIsPayment] = useState(false);
  const [paymentData, setPaymentData] = useState(0);

  // Fetch plot list
  const fetchPlots = async () => {
    try {
      const response = await mainAxios.get(`${API_URL}/plots/plotslist`);
      const plotData = response?.data || [];
      setPlots(plotData);
      if (plotData.length > 0) {
        setSelectedPlot(plotData[0]?.plotNumber); // Auto-select first plot
      }
    } catch (error) {
      console.error("Error fetching plots:", error);
      toast.error("Failed to fetch plots. Please try again.");
    }
  };

  // Fetch rooms for the selected plot
  const fetchRooms = useCallback(async (plotNumber) => {
    setLoading(true);
    try {
      const response = await mainAxios.get(
        `${API_URL}/rooms/plot/${plotNumber}`,
      );
      setRooms(response.data?.data || []);
      toast.success(response.data?.message || "Rooms fetched successfully");
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
      toast.error(error?.response?.data?.message || "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle plot selection
  const handlePlotChange = (e) => {
    setSelectedPlot(e.target.value);
  };

  // Close payment modal
  const closePaymentModal = () => setIsPayment(false);

  // Fetch plots on component mount
  useEffect(() => {
    fetchPlots();
  }, []);

  // Fetch rooms when selectedPlot changes
  useEffect(() => {
    if (selectedPlot) {
      fetchRooms(selectedPlot);
    }
  }, [selectedPlot, fetchRooms]);

  // Component for displaying tenant details
  const TenantDetails = ({ tenant }) => (
    <>
      <img
        src={tenant?.photo || userPlaceHolder}
        alt={tenant?.name || "Tenant"}
        className="tenantImage"
      />
      <p>
        <strong>Tenant:</strong> {tenant?.name}
      </p>
      <p>
        <strong>Contact:</strong> {tenant?.contact}
      </p>
      <p>
        <strong>Rent Paid:</strong> {tenant?.rentPaid ? "Yes" : "No"}
      </p>
      <p>
        <strong>Utilities Paid:</strong> {tenant?.utilityPaid ? "Yes" : "No"}
      </p>
      <button
        className="payNowBtn"
        onClick={() => {
          setPaymentData(tenant._id);
          setIsPayment(true);
        }}
      >
        Pay Now
      </button>
    </>
  );

  // Component for displaying room card
  const RoomCard = ({ room }) => (
    <div
      className={`roomCard ${!room?.tenant ? "vacantRoom" : ""}`}
      key={room._id}
    >
      <h3>Room {room.roomNumber}</h3>
      {room?.tenant ? (
        <div className="tenantDetails">
          <TenantDetails tenant={room.tenant} />
        </div>
      ) : (
        <p className="noTenant">No Tenant In This Room.</p>
      )}
    </div>
  );

  return (
    <>
      <div className="paymentPage">
        <h2
          className="wow bounceIn titleDiv"
          data-wow-offset="50"
          data-wow-delay="0.3s"
        >
          <span className="title">Payment</span> Tracking
        </h2>

        {/* Plot Selection Dropdown */}
        <div className="dropdown-container">
          <label htmlFor="plotSelect" className="dropdown-label">
            Select Plot:
          </label>
          <select
            id="plotSelect"
            value={selectedPlot}
            onChange={handlePlotChange}
            className="dropdown-select"
          >
            <option value="">-- Select a Plot --</option>
            {plots.map((plot) => (
              <option key={plot?.plotNumber} value={plot?.plotNumber}>
                {plot?.plotNumber}, {plot?.area}
              </option>
            ))}
          </select>
        </div>

        {/* Rooms Section */}
        {loading ? (
          // <p>Loading rooms and tenants...</p>
          <ShimmerLoader />
        ) : rooms.length > 0 ? (
          <div className="roomContainer">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        ) : (
          <div className="noRoomsFound">
            <div className="noRoomsMessage">
              <img src={nodataFound} alt="No Data" className="noRoomsImage" />
              <h3 className="noRoomsText">No Rooms Found</h3>
              <p className="noRoomsSubText">
                Please select a different plot or add rooms to this plot.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Payment Modal */}
      {isPayment && (
        <PaymentModal
          isOpen={isPayment}
          toggle={closePaymentModal}
          id={paymentData}
        />
      )}
    </>
  );
};

export default PaymentPage;
