import React from "react";
import { useTranslation } from "react-i18next";

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <section id="home">
      <div className="container">
        <div className="row">
          <div className="col-md-offset-2 col-md-8">
            <h1
              className="wow fadeIn"
              data-wow-offset="50"
              data-wow-delay="0.9s"
            >
              <p className="tagline-title">{t("taglineTitle")}</p>
              <span className="tagline">{t("tagline")}</span>
            </h1>
            <div className="element wow fadeIn">
              <div className="sub-element">{t("subElement1")}</div>
              <div className="sub-element">{t("subElement2")}</div>
              <div className="sub-element">{t("subElement3")}</div>
            </div>
            <a
              data-scroll
              href="#about"
              className="btn btn-default wow fadeInUp"
              data-wow-offset="50"
              data-wow-delay="0.6s"
            >
              {t("getStarted")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
