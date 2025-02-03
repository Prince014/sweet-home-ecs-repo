import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";

import { useSelector } from "react-redux";
import Loader from "../common/loader/Loader";

// Lazy-loaded components
const NotFound = lazy(() => import("../common/NotFound"));
const Layout = lazy(() => import("../layout"));
const AddTenantPage = lazy(() => import("../modules/addUser"));
const ViewDeatilsOfUser = lazy(() =>
  import("../modules/addUser/component/ViewDeatilsOfUser")
);
const Home = lazy(() => import("../modules/homePage"));
const PaymentPage = lazy(() => import("../modules/payment"));
const AddPlot = lazy(() => import("../modules/plot/addPlot"));
const RoomAddForm = lazy(() => import("../modules/rooms/addRoom"));
const ViewRoom = lazy(() =>
  import("../modules/rooms/components/viewRooms")
);
const TeamPage = lazy(() => import("../modules/team"));
const LoginPage = lazy(() => import("../modules/authentication"));
const LightBill = lazy(() => import("../modules/lightBill"));
const TennatLightBill = lazy(() =>
  import("../modules/lightBill/component/TennatLightBill")
);
const AddLightBillPage = lazy(() =>
  import("../modules/lightBill/component/AddLighBillPage")
);

// PrivateRoute Component
const PrivateRoute = ({ element }) => {
  const isAuth = useSelector((state) => state.auth?.isAuth);
  return isAuth ? element : <Navigate to="/login" replace />;
};

// PublicRoute Component
const PublicRoute = ({ element }) => {
  const isAuth = useSelector((state) => state.auth?.isAuth);
  const location=useLocation()
  const url=location.state?.url
  console.log("url",location.state)
  return isAuth ? <Navigate to={url?url:"/"}  replace /> : element;
};

const RouterPage = () => {

  return (
    <Router>
      {/* Suspense wrapper for lazy loading */}
      <Suspense fallback={<Loader/>}>
        <Routes>
          {/* Wrap all routes with the Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="team"
              element={<PrivateRoute element={<TeamPage />} />}
            />
            <Route
              path="/add-user"
              element={<PrivateRoute element={<AddTenantPage />} />}
            />
            <Route
              path="/update-user/:id"
              element={<PrivateRoute element={<AddTenantPage />} />}
            />
            <Route
              path="/add-plot"
              element={<PrivateRoute element={<AddPlot />} />}
            />
            <Route
              path="/add-room"
              element={<PrivateRoute element={<RoomAddForm />} />}
            />
            <Route
              path="/payment"
              element={<PrivateRoute element={<PaymentPage />} />}
            />
            <Route
              path="/all-room"
              element={<PrivateRoute element={<ViewRoom />} />}
            />
            <Route
              path="/add-light-bill"
              element={<PrivateRoute element={<AddLightBillPage />} />}
            />
            <Route
              path="/light-bill"
              element={<PrivateRoute element={<LightBill />} />}
            />
            <Route
              path="/light-bill/:id"
              element={<PrivateRoute element={<TennatLightBill />} />}
            />
            <Route
              path="/details/:id"
              element={<PrivateRoute element={<ViewDeatilsOfUser />} />}
            />
            <Route
              path="/login"
              element={<PublicRoute element={<LoginPage />} />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterPage;
