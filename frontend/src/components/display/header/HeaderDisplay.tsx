import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                <div className="col-auto d-flex">
                  <div className="col-auto py-3 px-2 ">
                    <Link
                      to="/login"
                      className="link-hover-color px-2 link-decoration-none"
                    >
                      login
                    </Link>
                    <Link
                      to="/register"
                      className="link-hover-color px-2 link-decoration-none "
                    >
                      sign up
                    </Link>
                  </div>
                  <div className="user col-auto p-2">
                    <i className="fa fa-user home-btn" aria-hidden="true"></i>
                  </div>
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
