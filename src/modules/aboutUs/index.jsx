import React from "react";
import { useTranslation } from "react-i18next";

const AboutUsPage = () => {
  const { t } = useTranslation();

  // Store translations in constants
  const aboutTitle = t("about.title");
  const aboutSubtitle = t("about.subtitle");
  const aboutFeature1Title = t("about.feature1.title");
  const aboutFeature1Description = t("about.feature1.description");
  const aboutFeature2Title = t("about.feature2.title");
  const aboutFeature2Description = t("about.feature2.description");
  const aboutFeature3Title = t("about.feature3.title");
  const aboutFeature3Description = t("about.feature3.description");



  return (
    <section id="about" className="about-us-section">
      <div className="container">
        <div className="row d-flex align-items-stretch">
          <div className="col-md-12">
            <h2
              className="wow bounceIn"
              data-wow-offset="50"
              data-wow-delay="0.3s"
            >
              <span>{aboutTitle} </span><span>{aboutSubtitle}</span>
            </h2>
          </div>
          <div
            className="col-md-4 col-sm-4 col-xs-12 wow fadeInLeft"
            data-wow-offset="50"
            data-wow-delay="0.6s"
          >
            <div className="media">
              <div className="media-heading-wrapper">
                <div className="media-object pull-left">
                  <i className="fa fa-building"></i>
                </div>
                <h3 className="media-heading">{aboutFeature1Title}</h3>
              </div>
              <div className="media-body">
                <p>{aboutFeature1Description}</p>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 col-sm-4 col-xs-12 wow fadeInUp"
            data-wow-offset="50"
            data-wow-delay="0.9s"
          >
            <div className="media">
              <div className="media-heading-wrapper">
                <div className="media-object pull-left">
                  <i className="fa fa-headphones"></i>
                </div>
                <h3 className="media-heading">{aboutFeature2Title}</h3>
              </div>
              <div className="media-body">
                <p>{aboutFeature2Description}</p>
              </div>
            </div>
          </div>
          <div
            className="col-md-4 col-sm-4 col-xs-12 wow fadeInRight"
            data-wow-offset="50"
            data-wow-delay="0.6s"
          >
            <div className="media">
              <div className="media-heading-wrapper">
                <div className="media-object pull-left">
                  <i className="fa fa-cogs"></i>
                </div>
                <h3 className="media-heading">{aboutFeature3Title}</h3>
              </div>
              <div className="media-body">
                <p>{aboutFeature3Description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsPage;
