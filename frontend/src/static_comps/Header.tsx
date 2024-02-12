import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/Header.css";

const Header: React.FC = () => {

  const nav = useNavigate();

  const logOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    nav("/");
  };

  return (
    <div className="main-header">
      <header className="container-fluid shadow">
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <nav className="nav col-auto">  
                <li>
                  <Link to="/" className="py-1">
                    <img src="logo.png" className="logo py-2"></img>
                  </Link>
                </li>
            </nav>
            <div className="col-auto user">
              <i
                className="fa fa-user p-1 mt-1 home-btn"
                aria-hidden="true"
              ></i>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
