import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGreeting } from "../../static/CheckHour";
import HeaderUserDisplay from "../../display/header/HeaderUserDisplay";

const HeaderUser: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nav = useNavigate();

  const getUserFromLocalStorage = (): string => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    return user.name;
  };

  const logOut = (): void => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    nav("/");
  };

  return (
    <HeaderUserDisplay
      logOut={logOut}
      getUserFromLocalStorage={getUserFromLocalStorage}
    />
  );
};

export default HeaderUser;
