import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxios } from "../../service/api";
import { API_URL } from "../../service/constant";

// Async Thunks
export const fetchPlots = createAsyncThunk(
  "tenant/fetchPlots",
  async (_, { rejectWithValue }) => {
    try {
      const response = await mainAxios.get(`${API_URL}/plots/plotslist`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch plots.");
    }
  }
);

export const fetchRooms = createAsyncThunk(
  "tenant/fetchRooms",
  async (plotNumber, { rejectWithValue }) => {
    try {
      const response = await mainAxios.get(
        `${API_URL}/rooms/plot/${plotNumber}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch rooms.");
    }
  }
);

export const fetchTenantDetails = createAsyncThunk(
  "tenant/fetchTenantDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await mainAxios.get(`${API_URL}/tenants/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch tenant details."
      );
    }
  }
);

export const saveTenant = createAsyncThunk(
  "tenant/saveTenant",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = id
        ? await mainAxios.put(
            `${API_URL}/tenants/update-tenant/${id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          )
        : await mainAxios.post(`${API_URL}/tenants/add-tenant`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || `Failed to ${id ? "update" : "add"} tenant.`
      );
    }
  }
);

// Slice
const tenantSlice = createSlice({
  name: "tenant",
  initialState: {
    plots: [],
    rooms: [],
    tenantDetails: null,
    status: "idle",
    error: null,
    loading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Plots
      .addCase(fetchPlots.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlots.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.plots = action.payload;
      })
      .addCase(fetchPlots.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Rooms
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rooms = action.payload?.data || [];
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Tenant Details
      .addCase(fetchTenantDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTenantDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tenantDetails = action.payload?.data;
      })
      .addCase(fetchTenantDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Save Tenant
      .addCase(saveTenant.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveTenant.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveTenant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tenantSlice.reducer;
