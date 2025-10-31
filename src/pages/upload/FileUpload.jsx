import React from "react";
import FileUploadForm from "./components/FileUploadForm";

const UploadFile = () => {
  return (
    <div className="flex justify-center pt-4 h-[calc(100vh-4rem)]">
      <FileUploadForm />
    </div>
  );
};

export default UploadFile;
