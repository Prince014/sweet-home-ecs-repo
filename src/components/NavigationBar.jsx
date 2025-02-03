import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import homeIcon from "../assets/images/homeLogo1.png";
import homeIconMobile from "../assets/images/ashiyanaLogo11.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../modules/authentication/authSlice";
import LanguageSwitcher from "../common/components/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const NavbarComponent = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { t } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarRef = useRef(null);  // Reference for sidebar


  // Check if user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.isAuth);
  console.log({isAuthenticated})

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user_auth_token"); // Clear auth token
    dispatch(logout());
    // navigate("/login"); // Redirect to login page
  };
  const handleLogin=()=>{
    navigate("/login")
  }

  return (
    <div className="myNavbar">
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <div className="myNavbar-brand-container">
              <img
                src={homeIconMobile}
                alt="home"
                className="myNavbar-home-icon"
              />
              <button className="navbar-toggler" onClick={toggleSidebar}>
                ☰
              </button>
            </div>
          </Link>

          {/* Navbar Links for Larger Screens */}
          <ul className="navbar-links">
            <li>
              <Link to="/" className="active">
                {t("home")}
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/payment">{t("payment")}</Link>
                </li>
                <li>
                  <Link to="/add-user">{t("addTenant")}</Link>
                </li>
                <li>
                  <Link to="/add-plot">{t("addPlot")}</Link>
                </li>
                <li>
                  <Link to="/add-room">{t("addRoom")}</Link>
                </li>
              </>
            )}
            <li>
              <Link to="/all-room">{t("viewRooms")}</Link>
            </li>
            <li>
              <Link to="/light-bill">{t("lightBill")}</Link>
            </li>
            {isAuthenticated ? (
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  {t("logout")}
                </button>
              </li>
            ): <li>
            <button
              onClick={() => {
              
                handleLogin();
              }}
              className="login-btn"
            >
              {t("loginTitle")}
            </button>
          </li>}
            <li>
              <LanguageSwitcher />
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidebar for Mobile View */}
      {isSidebarOpen && (
        <div
          ref={sidebarRef} // Set the ref for sidebar
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
        >
          <button className="close-btn" onClick={toggleSidebar}>
            X
          </button>
          <ul className="sidebar-links">
            <li>
              <Link to="/" onClick={toggleSidebar}>
                {t("home")}
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to="/payment" onClick={toggleSidebar}>
                    {t("payment")}
                  </Link>
                </li>
                <li>
                  <Link to="/add-user" onClick={toggleSidebar}>
                    {t("addTenant")}
                  </Link>
                </li>
                <li>
                  <Link to="/add-plot" onClick={toggleSidebar}>
                    {t("addPlot")}
                  </Link>
                </li>
                <li>
                  <Link to="/add-room" onClick={toggleSidebar}>
                    {t("addRoom")}
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/all-room" onClick={toggleSidebar}>
                {t("viewRooms")}
              </Link>
            </li>
            {!isAuthenticated && <li>
            <button
              onClick={() => {
                handleLogin();
                toggleSidebar()
              }}
              className="login-btn"
            >
              {t("loginTitle")}
            </button>
          </li>}
            <li>
              <Link to="/light-bill" onClick={toggleSidebar}>
                {t("lightBill")}
              </Link>
            </li>
            <li>
              <LanguageSwitcher />
            </li>
            {isAuthenticated && (
              <li>
                <button
                  onClick={() => {
                    toggleSidebar();
                    handleLogout();
                  }}
                  className="logout-btn"
                >
                  {t("logout")}
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavbarComponent;
