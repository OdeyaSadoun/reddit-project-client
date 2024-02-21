import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import Footer from "./components/display/static/Footer";
import Header from "./components/display/header/HeaderDisplay";
import HeaderUser from "./components/display/header/HeaderUserDisplay"; // Import the user header component
import Home from "./components/display/static/Home";
import HomeUser from "./components/display/user/HomeUser";
import Login from "./components/logic/auth/Login";
import RedditHome from "./components/reddit/RedditHome";
import RedditPostDetails from "./components/reddit/RedditPostsDetails";
import Register from "./components/logic/auth/Register";
import RedditSearchHistory from "./components/reddit/RedditsHistory";

import "./App.css";
import { HeadersRoutes } from "./components/logic/header/HeaderRoutes";

function App() {
  const [tokenExists, setTokenExists] = useState<boolean>(
    localStorage.getItem("access_token") !== null
  );

  return (
    <div id="page-container">
      <Routes>{HeadersRoutes()}</Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:username" element={<HomeUser />} />
        <Route path="/user" element={<HomeUser />} />
        <Route path="/user/reddit" element={<RedditHome />} />
        <Route path="/user/history/:reddit_id" element={<RedditPostDetails />} />
        <Route path="/user/history" element={<RedditSearchHistory />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
