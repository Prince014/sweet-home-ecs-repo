import React from "react";
import { Outlet } from "react-router-dom";

import NavbarComponent from "../components/NavigationBar";

const Layout = () => {
  return (
    <>
      <NavbarComponent /> {/* Navbar visible on every page */}
      <div className="container-fluid">
        <Outlet /> {/* This renders the content of the current route */}
      </div>
    </>
  );
};

export default Layout;
