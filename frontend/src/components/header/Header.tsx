import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header: React.FC = () => {

  return (
    <div className="main-header">
      <header className="container-fluid shadow">
        <div className="container">
          <div>
            <nav className="row align-items-center justify-content-between">
              <div className="col-auto">
                <Link to="/" className="py-1">
                  <img src="logo.png" className="logo py-2"></img>
                </Link>
              </div>
              <div className="col-auto d-flex">
                <div className="col-auto py-3 px-2 ">
                  <Link
                    to="/login"
                    className="link-hover-color px-2 text-secondary link-offset-2 link-offset-3-hover link link-decoration-none link-hover-underline"
                  >
                    login
                  </Link>
                  <Link
                    to="/register"
                    className="link-hover-color px-2 text-secondary link-offset-2 link-offset-3-hover link link-decoration-none link-hover-underline"
                  >
                    sign up
                  </Link>
                </div>
                <div className="user col-auto p-2">
                  <i className="fa fa-user home-btn" aria-hidden="true"></i>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
