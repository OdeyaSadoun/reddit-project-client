import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import Footer from "./components/static/Footer";
import Header from "./components/static/Header";
import Home from "./components/static/Home";
import HomeUser from "./components/user/HomeUser";
import Login from "./components/auth/Login";
import RedditHome from "./components/reddit/RedditHome";
import RedditPostDetails from "./components/reddit/RedditPostsDetails";
import Register from "./components/auth/Register";
import RedditSearchHistory from "./components/reddit/RedditsHistory";

function App() {
  const [showInfo, setShowInfo] = useState(false);

  const closeUserIconDiv = () => {
    setShowInfo(!showInfo);
  };

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/:username" element={<HomeUser />} />
        <Route path="/reddit" element={<RedditHome />} />
        <Route path="/history/:reddit_id" element={<RedditPostDetails />} />
        <Route path="/history" element={<RedditSearchHistory />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
