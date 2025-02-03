import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import HomePage from "../modules/home";

export const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log({ isAuth });
  return isAuth ? children : <Navigate to="/login" />;
};

export const PublicRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log({ isAuth });
  return !isAuth ? children : <Navigate to="/" />;
};
