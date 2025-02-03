import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { mainAxios } from "../../service/api";
import { API_URL } from "../../service/constant";
import { toast } from "react-toastify";

// Initial state for authentication
const initialState = {
  token: localStorage.getItem("user_auth_token") || null,
  isAuth: !!localStorage.getItem("user_auth_token"),
  error: null,
  loading: false,
};
// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await mainAxios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      return response.data; // Return user and token from the API response
    } catch (err) {
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  },
);

// Create a slice of Redux state
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log({ action });
        state.loading = false;
        state.isAuth = !!action.payload.token;
        state.token = action.payload.token;
        localStorage.setItem("user_auth_token", action.payload.token); // Save token
        toast.success("Logged in successfully...");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Login failed. Please try again.");
      });
  },
});

// Export the actions from the slice
export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;

// Export the reducer to be used in the store
export default authSlice.reducer;
