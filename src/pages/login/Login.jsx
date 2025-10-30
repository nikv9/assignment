import React, { useState } from "react";
import OtpGenerateForm from "./components/OtpGenerateForm";
import OtpVerificationForm from "./components/OtpVerificationForm";

const Login = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      {/* {!isOtpSent ? (
        <OtpGenerateForm setIsOtpSent={setIsOtpSent} />
      ) : ( */}
      <OtpVerificationForm />
      {/* )} */}
    </div>
  );
};

export default Login;
