import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { AppContext, ContextType } from "./context/Context";
import userSlice from "./features/userSlice";
import Home from "./static_comps/Home";
import Login from "./auth_comps/Login";
import Register from "./auth_comps/Register";
import RedditHome from "./reddit_comps/RedditHome";
import Footer from "./static_comps/Footer";
import Header from "./static_comps/Header";
import HomeUser from "./user_comps/HomeUser";
import RedditPostDetails from "./reddit_comps/RedditPostsDetails";

const myStore = configureStore({
  reducer: {
    userSlice,
  },
});

function App() {
  const [showInfo, setShowInfo] = useState(false);

  const closeUserIconDiv = () => {
    setShowInfo(!showInfo);
  };

  const value: ContextType = {
    showInfo: showInfo,
    setShowInfo: setShowInfo,
  };

  return (
    <AppContext.Provider value={value}>
      <Provider store={myStore}>
        <Header /> 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home/:username" element={<HomeUser />} />
          {/* <Route path="/home/:username" element={<HomeUser />} /> */}
          <Route path="/reddit" element={<RedditHome />} />
          <Route path="/history/:reddit_id" element={<RedditPostDetails />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </Provider>
    </AppContext.Provider>
  );
}

export default App;
