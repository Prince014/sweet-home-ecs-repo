import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./index.css";
import "./assets/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.jsx";
import { store } from "./store";
import { Provider } from "react-redux";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <StrictMode> */}
      <App />
    {/* </StrictMode>{" "} */}
  </Provider>,
);
