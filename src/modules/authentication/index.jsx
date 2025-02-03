import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import "./login.css";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const {t}=useTranslation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ email, password }));
   
    console.log({ result });
  };
  console.log({ error });
  return (
    <div className="login-page-wrapper">
      {" "}
      {/* Parent wrapper for login page */}
      <div className="login-container">
        <h2>{t("loginTitle")}</h2>
        {/* {authStatus === 'loading' && <p>Loading...</p>} */}
        {error?.msg && <p style={{ color: "red" }}>{error?.msg}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-container">
          <label>{t("emailLabel")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-container">
          <label>{t("passwordLabel")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit-btn" disabled={loading} type="submit">
            {/* {loading ? "Logging..." : "Login"} */}
            {loading ?t("loadingBtn") :t("submitBtn")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
