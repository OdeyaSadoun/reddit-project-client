import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderUser: React.FC = () => {
  const nav = useNavigate();

  const getUserFromLocalStorage = () =>{
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    console.log({user});
    
    return user.name;
  }
  

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
          <div>
            <nav className="row align-items-center justify-content-between">
              <div className="col-auto">
                <Link to={`/user/${getUserFromLocalStorage()}`}  className="py-1">
                  <img src="/logo.png" className="logo py-2"></img>
                </Link>
              </div>
              <div className="col-auto d-flex">
                <div className="col-auto py-3 px-2 ">
                  <Link
                      to="/user/history"
                      className="link-hover-color px-2 text-secondary link-offset-2 link-offset-3-hover link link-decoration-none link-hover-underline"
                  >
                    search history
                  </Link>
                  <a
                    className="link-hover-color px-2 text-secondary link-offset-2 link-offset-3-hover link link-decoration-none link-hover-underline"
                    onClick={logOut}
                  >
                    logout
                  </a>
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

export default HeaderUser;
