import React from "react";
import Header from "./components/Header";
import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import CreateUser from "./pages/admin/CreateUser";
import UploadFile from "./pages/upload/FileUpload";
import File from "./pages/file/File";

const App = () => {
  const docState = useSelector((state) => state.documents);
  const location = useLocation();
  const urlPath = location.pathname;
  return (
    <div className="min-h-dvh">
      <Header />
      <div>
        <div className="flex items-center gap-4 p-2">
          <Link
            to="/user/create"
            className={`p-2 bg-gray-500 rounded-md text-xs ${
              urlPath === "/user/create" && "bg-[crimson]!"
            }`}
          >
            Admin Page
          </Link>
          <Link
            to="/upload"
            className={`p-2 bg-gray-500 rounded-md text-xs ${
              urlPath === "/upload" && "bg-[crimson]!"
            }`}
          >
            File Upload
          </Link>

          <Link
            to="/files"
            className={`p-2 bg-gray-500 rounded-md text-xs ${
              urlPath === "/files" && "bg-[crimson]!"
            }`}
          >
            File Page
          </Link>
        </div>
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

          <Route
            path="/files"
            element={docState.user ? <File /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
