// lazyLoad.js
import React from "react";

export const lazyLoad = (importFunc) => {
  return React.lazy(importFunc);
};

export const Home = lazyLoad(() => import("../modules/homePage"));
export const TeamPage = lazyLoad(() => import("../modules/team"));
export const AddTenantPage = lazyLoad(() => import("../modules/addUser"));
export const ViewDeatilsOfUser = lazyLoad(
  () => import("../modules/addUser/component/ViewDeatilsOfUser"),
);
export const PaymentPage = lazyLoad(() => import("../modules/payment"));
export const AddPlot = lazyLoad(() => import("../modules/plot/addPlot"));
export const RoomAddForm = lazyLoad(() => import("../modules/rooms/addRoom"));
export const ViewRoom = lazyLoad(
  () => import("../modules/rooms/components/viewRooms"),
);
export const LoginPage = lazyLoad(() => import("../modules/authentication"));
export const LightBill = lazyLoad(() => import("../modules/lightBill"));
export const NotFound = lazyLoad(() => import("../common/NotFound"));
