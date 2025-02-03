// routesConfig.js
import { lazy } from "react";

import {
  Home,
  TeamPage,
  AddTenantPage,
  ViewDeatilsOfUser,
  PaymentPage,
  AddPlot,
  RoomAddForm,
  ViewRoom,
  LoginPage,
  LightBill,
  NotFound,
} from "./lazyLoad"; // Import lazy-loaded components
import { routes } from "./routeConstant";

export const routesConfig = [
  {
    path: routes.home,
    element: lazy(() => import("../modules/homePage")),
    private: false, // No authentication required
  },
  {
    path: routes.team,
    element: lazy(() => import("../modules/team")),
    private: true, // Private route, authentication required
  },
  {
    path: routes.addUser,
    element: lazy(() => import("../modules/addUser")),
    private: true,
  },
  {
    path: routes.updateUser,
    element: lazy(() => import("../modules/addUser")),
    private: true,
  },
  {
    path: routes.addPlot,
    element: lazy(() => import("../modules/plot/addPlot")),
    private: true,
  },
  {
    path: routes.addRoom,
    element: lazy(() => import("../modules/rooms/addRoom")),
    private: true,
  },
  {
    path: routes.payment,
    element: lazy(() => import("../modules/payment")),
    private: true,
  },
  {
    path: routes.viewRoom,
    element: lazy(() => import("../modules/rooms/components/viewRooms")),
    private: true,
  },
  {
    path: routes.lightBill,
    element: lazy(() => import("../modules/lightBill")),
    private: true,
  },
  {
    path: routes.userDetails,
    element: lazy(
      () => import("../modules/addUser/component/ViewDeatilsOfUser"),
    ),
    private: true,
  },
  {
    path: routes.login,
    element: lazy(() => import("../modules/authentication")),
    private: false, // Login page is public
  },
  {
    path: routes.notFound,
    element: lazy(() => import("../common/NotFound")),
    private: false,
  },
];
