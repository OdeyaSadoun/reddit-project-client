import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./static_comps/Home";
import HomeUser from "./user_comps/HomeUser";
import Login from "./auth_comps/Login";
import Register from "./auth_comps/Register";
import RedditHome from "./reddit_comps/RedditHome";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/:username" element={<HomeUser />} />
        <Route path="/reddit" element={<RedditHome />} />
      </Routes>
    </>
  );
}

export default App;
