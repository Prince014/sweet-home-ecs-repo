import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { routesConfig } from "./routesConfig"; // Import the route config
import Layout from "../layout";
import { IsAuthentication } from "../utils/isAuthenticate";
import { routes } from "./routeConstant";

// A PrivateRoute component to guard routes
const PrivateRoute = ({ element }) => {
  return IsAuthentication ? element : <Navigate to={routes.login} replace />;
};

const RouterPage = () => {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes with the Layout */}
        <Route path={routes.home} element={<Layout />}>
          {routesConfig.map(({ path, element, private: isPrivate }) => (
            <Route
              key={path}
              path={path}
              element={isPrivate ? <PrivateRoute element={element} /> : element}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default RouterPage;
