import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "./constant"; // Replace this with the actual API URL if needed

import useHandleLogout from "../hook/useHandleLogout";

// Create an Axios instance
const mainAxios = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to handle logout
 const handleLogout = useHandleLogout(); // Use the custom hook

// Add an interceptor to include the token in all requests
mainAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("user_auth_token"); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    }
    return config; // Return the updated config
  },
  (error) => Promise.reject(error), // Handle request errors
);

// Function to handle response errors
const handleResponseError = (error) => {
  if (error.response) {
    const status = error.response.status;

    // Handle specific error codes
    switch (status) {
      case 401: // Unauthorized
        toast.error("Unauthorized! Please log in again.");
        handleLogout(); // Call logout handler
        break;

      case 403: // Forbidden
        toast.error("Access denied! You don't have permission.");
        break;

      case 500: // Server error
        toast.error("Internal server error. Please try again later.");
        break;

      default:
        // toast.error(
        //   error.response.data?.message || "An unexpected error occurred."
        // );
        break;
    }
  } else if (error.request) {
    // Handle cases where no response was received
    toast.error("Network error! Please check your connection.");
  } else {
    // Handle other errors
    // toast.error(error.message || "An unexpected error occurred.");
  }
  return Promise.reject(error); // Reject the promise for further handling
};

// Add a response interceptor to handle errors
mainAxios.interceptors.response.use(
  (response) => response, // Pass through successful responses
  handleResponseError, // Handle errors
);

export { mainAxios };
