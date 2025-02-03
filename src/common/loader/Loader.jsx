import React from "react";
import "./loader.css";
import loaderGif from "../../assets/gif/loaderGif.gif"; // Place your GIF in the assets folder

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-container">
      <img src={loaderGif} alt="Loading..." className="loader-gif" />
      <p className="loader-text">{text}</p>
    </div>
  );
};

export default Loader;
