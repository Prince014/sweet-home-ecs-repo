import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mainAxios } from "../../service/api";
import { API_URL } from "../../service/constant";

const initialState = {
  lightBills: [], // For all tenants
  tenantBills: [], // For a single tenant
  unitRate: 0,
  lastMonthUnits: 0,
  consumedUnits: 0,
  totalAmount: 0,
  loading: false,
  error: null,
};

// Async thunk to fetch all tenants' light bills
export const fetchLightBills = createAsyncThunk(
  "lightBill/fetchLightBills",
  async ({plotId, month, year}, { rejectWithValue }) => {
   
    try {
      const response = await mainAxios.get(`${API_URL}/lightbills/${plotId}?month=${month}&year=${year}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Async thunk to fetch bills for a single tenant
export const fetchTenantBills = createAsyncThunk(
  "lightBill/fetchTenantBills",
  async (tenantId, { rejectWithValue }) => {
    try {
      const response = await mainAxios.get(
        `${API_URL}/lightbills/tenant/${tenantId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Slice
const lightBillSlice = createSlice({
  name: "lightBill",
  initialState,
  reducers: {
    resetLightBills: (state) => {
      state.lightBills = [];
      state.tenantBills = [];
      state.unitRate = 0;
      state.lastMonthUnits = 0;
      state.lastUnits = 0;
      state.consumedUnits = 0;
      state.totalAmount = 0;
      state.error = null;
    },
    setUnitsAndAmount: (state, action) => {
      const { currentUnits, previousUnits, unitRate } = action.payload;
      const consumedUnits = currentUnits - previousUnits;
      const totalAmount = consumedUnits * unitRate;

      state.consumedUnits = consumedUnits;
      state.totalAmount = totalAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Light Bills
      .addCase(fetchLightBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLightBills.fulfilled, (state, action) => {
        state.loading = false;
        state.lightBills = action.payload;
      })
      .addCase(fetchLightBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Tenant Bills
      .addCase(fetchTenantBills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenantBills.fulfilled, (state, action) => {
        state.loading = false;
        state.tenantBills = action.payload;
        if (action.payload.length > 0) {
          const { unitRate, previousUnits,currentUnits } = action.payload[0];
          state.unitRate = unitRate;
          state.lastMonthUnits = previousUnits;
          state.lastUnits=currentUnits;
        }
      })
      .addCase(fetchTenantBills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { resetLightBills, setUnitsAndAmount } = lightBillSlice.actions;
export default lightBillSlice.reducer;
