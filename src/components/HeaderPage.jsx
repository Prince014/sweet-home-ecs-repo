import React from "react";

const HeaderPage = () => {
  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-4 col-xs-12">
            <p>
              <i className="fa fa-phone"></i>
              <span> Phone</span>+91 94884 87853
            </p>
          </div>
          <div className="col-md-3 col-sm-4 col-xs-12">
            <p>
              <i className="fa fa-envelope-o"></i>
              <span> Email</span>
              <a href="mailto:giridesigns5@gmail.com">giridesigns5@gmail.com</a>
            </p>
          </div>
          <div className="col-md-5 col-sm-4 col-xs-12">
            <ul className="social-icon">
              <li>
                <span>Meet us on</span>
              </li>
              <li>
                <a href="#" className="fa fa-facebook"></a>
              </li>
              <li>
                <a href="#" className="fa fa-twitter"></a>
              </li>
              <li>
                <a href="#" className="fa fa-instagram"></a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UC4yzoGuKkCL_8FzI-B-x83A"
                  className="fa fa-youtube"
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPage;
