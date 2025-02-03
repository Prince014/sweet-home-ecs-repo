import React from "react";
import AboutUsPage from "../aboutUs";
import TeamPage from "../team";
import { HomePage } from "./homePage";
import { useSelector } from "react-redux";
import PlotList from "../plot/PlotList";

const Home = () => {
  const isAuth = useSelector((state) => state.auth?.isAuth);
  return (
    <div>
      <HomePage />
      <AboutUsPage />
     {isAuth?<PlotList />: <TeamPage />}
    </div>
  );
};

export default Home;
