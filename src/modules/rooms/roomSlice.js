// src/slices/roomSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { mainAxios } from "../../service/api";
import { API_URL } from "../../service/constant";

const initialState = {
  formData: {
    roomNumber: "",
    address: "",
    plot: "",
    lightMeterUnit: 0,
    deposit: 0,
    monthlyRent: 0,
    documents: [],
    features: {
      tap: 1, // 0 = No, 1 = Yes, 2 = Need Repair
      door: 1,
      window: 1,
      kitchenSink: 1,
    },
  },
  plots: [],
  fileInputs: [{ id: Date.now(), files: [] }],
  loading: false,
  error: null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setPlots: (state, action) => {
      state.plots = action.payload;
    },
    setFileInputs: (state, action) => {
      state.fileInputs = action.payload;
    },
    addFileInput: (state) => {
      state.fileInputs.push({ id: Date.now(), files: [] });
    },
    removeFileInput: (state, action) => {
      state.fileInputs = state.fileInputs.filter(
        (input) => input.id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});



export const uploadImage = (imageFile) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await mainAxios.post(`${API_URL}/rooms/upload-image`, data);
    return response.data;
  } catch (error) {
    dispatch(setError("Failed to upload image"));
    throw error;
  }
};

export const addRoom = (formData, fileInputs) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const form = new FormData();
    form.append("roomNumber", formData.roomNumber);
    form.append("address", formData.address);
    form.append("plotNumber", formData.plot);
    form.append("lightMeterUnit", formData.lightMeterUnit);
    form.append("deposit", formData.deposit);
    form.append("monthlyRent", formData.monthlyRent);

    // Append files from all file inputs
    fileInputs.forEach((input) => {
      Array.from(input.files).forEach((file) => {
        form.append("documents", file);
      });
    });

    // Append features as a JSON string
    form.append("features", JSON.stringify(formData.features));

    const response = await mainAxios.post(`${API_URL}/rooms/add`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    dispatch(setLoading(false));
    return response.data;
  } catch (error) {
    dispatch(setError("Failed to add room"));
    dispatch(setLoading(false));
    throw error;
  }
};

export const {
  setFormData,
  setPlots,
  setFileInputs,
  addFileInput,
  removeFileInput,
  setLoading,
  setError,
} = roomSlice.actions;

export default roomSlice.reducer;
