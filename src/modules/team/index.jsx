import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  FaBuilding,
  FaUserPlus,
  FaLightbulb,
  FaMoneyBillAlt,
  FaPlus,
} from "react-icons/fa";

const AdvertisementPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const options = [
    {
      icon: <FaBuilding />,
      title: t("advertisement.addPlot"),
      description: t("advertisement.addPlotDesc"),
      url: "/add-plot",
    },
    {
      icon: <FaPlus />,
      title: t("advertisement.addRoom"),
      description: t("advertisement.addRoomDesc"),
      url: "/add-room",
    },
    {
      icon: <FaLightbulb />,
      title: t("advertisement.addLightBill"),
      description: t("advertisement.addLightBillDesc"),
      url: "/light-bill",
    },
    {
      icon: <FaMoneyBillAlt />,
      title: t("advertisement.payment"),
      description: t("advertisement.paymentDesc"),
      url: "/payment",
    },
    {
      icon: <FaUserPlus />,
      title: t("advertisement.addTenant"),
      description: t("advertisement.addTenantDesc"),
      url: "/add-user",
    },
  ];

  return (
    <section id="advertisement" className="advertisement-section">
      <div className="container">
        <h2 className="advertisement-title">
          {t("advertisement.pageTitle")}
        </h2>
        <div className="advertisement-container">
          {options.map((option, index) => (
            <div
              key={index}
              className="advertisement-wrapper"
              onClick={()=>navigate('/login', {state:{url:option.url}})}
            >
              <div className="icon">{option.icon}</div>
              <h4>{option.title}</h4>
              <p>{option.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvertisementPage;
