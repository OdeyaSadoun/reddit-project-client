import React, { useState } from "react";
import { Link } from "react-router-dom";

import { getGreeting } from "../../logic/static/CheckHour";
import { HeaderUserProps } from "../../../interfaces/props/HeaderUserProps.interface";

const HeaderUserDisplay: React.FC<HeaderUserProps> = ({ logOut, getUserFromLocalStorage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="main-header">
      <header className="container-fluid shadow">
        <div className="container">
          <nav className="row align-items-center justify-content-between">
            <div className="col-auto">
              <div className="d-flex align-items-center">
                <Link to={`/user/${getUserFromLocalStorage()}`}>
                  <img src="/logo.png" className="logo py-2" alt="Logo" />
                </Link>
                <div className="lead ps-2 d-none d-lg-block">
                  {`${getGreeting()} ${getUserFromLocalStorage()}`}
                </div>
              </div>
            </div>
            <div className="col-auto d-md-none">
              <button
                className="btn btn-outline-dark"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className="fas fa-burger"></i>
              </button>
            </div>
            <div
              className={`col-auto col-md-auto d-md-block ${
                isMenuOpen ? "d-block" : "d-none"
              }`}
            >
              <div className="d-flex align-items-center">
                <div className="py-3 px-2">
                  <Link to="/user/history" className="link-hover-color px-2 link-decoration-none">
                    Search History
                  </Link>
                  <a
                    className="link-hover-color px-2 link-decoration-none"
                    onClick={logOut}
                  >
                    Logout
                  </a>
                </div>
                <div className="user p-2">
                  <i className="fa fa-user home-btn" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default HeaderUserDisplay;