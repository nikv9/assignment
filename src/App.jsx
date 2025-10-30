import React from "react";
import Header from "./components/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import CreateUser from "./pages/admin/CreateUser";

const App = () => {
  const docState = useSelector((state) => state.documents);
  return (
    <div className="min-h-dvh">
      <Header />
      <div>
        <Routes>
          <Route
            path="/"
            element={docState.user ? <Navigate to="/user/create" /> : <Login />}
          />

          <Route
            path="/user/create"
            element={docState.user ? <CreateUser /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
