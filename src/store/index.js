import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../modules/authentication/authSlice";
import tenantReducer from "../modules/addUser/tenantSlice"
import roomReducer from "../modules/rooms/roomSlice"
import lightBillReducer from "../modules/lightBill/lightBillSlice"

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth reducer to the store
    tenant:tenantReducer,
    room:roomReducer,
    lightBill:lightBillReducer
  },
});
