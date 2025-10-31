import React from "react";
import Header from "./components/Header";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import CreateUser from "./pages/admin/CreateUser";
import UploadFile from "./pages/upload/FileUpload";

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

          <Route
            path="/upload"
            element={docState.user ? <UploadFile /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
