import React from "react";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <div className="min-h-dvh">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
