import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import buildingPlaceholder from "assets/images/building.jpeg";
import { mainAxios } from "service/api";
import { API_URL } from "service/constant";
import { useNavigate } from "react-router-dom";

const PlotList = () => {
  const { t } = useTranslation();
  const [plots, setPlots] = useState([]);
  const navigate = useNavigate();

  const getPlot = async () => {
    try {
      const response = await mainAxios.get(`${API_URL}/plots/plotslist`);
      console.log({ response });
      setPlots(response?.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getPlot();
  }, []);

  console.log({ plots });

  return (
    <section id="team" className="team-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2
              className="wow bounceIn"
              data-wow-offset="50"
              data-wow-delay="0.3s"
            >
              <span>{t("teamPage.all")}</span> {t("teamPage.property")}
            </h2>
          </div>
          {plots?.map((x) => (
            <div
              className="col-md-3 col-sm-6 col-xs-12 wow fadeIn mt-3"
              data-wow-offset="50"
              data-wow-delay="1.3s"
              onClick={() => {
                navigate("/all-room");
              }}
            >
              <div className="team-wrapper">
                <img
                  src={buildingPlaceholder}
                  className="img-responsive"
                  alt={t("teamPage.teamImageAlt")}
                />
                <div className="team-des">
                  <h4>
                    {t("teamPage.plotNumber")}: {x.plotNumber}
                  </h4>
                  <span>{x?.ownername}</span>
                  <p>
                    {x?.area}, {x?.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlotList;
