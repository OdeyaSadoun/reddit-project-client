import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./static_comps/Home";
import Login from "./auth_comps/Login";
import Register from "./auth_comps/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
