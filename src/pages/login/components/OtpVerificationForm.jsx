import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtpAction } from "../../../redux/doc_slice";
import { toast } from "react-toastify";

const OtpVerificationForm = (props) => {
  const docState = useSelector((state) => state.documents);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) toast.warn("Enter OTP");
    const res = await dispatch(
      verifyOtpAction({
        mobileNumber: localStorage.getItem("mobile_number"),
        otp,
      })
    );
    if (res.payload.status === true) {
      toast.success("OTP verified and login successfully");
    } else {
      toast.error(res.payload.message);
    }
  };

  return (
    <div className="w-[90%] h-fit sm:w-[80%] md:w-[60%] lg:w-[30%] backdrop-blur-md text-white border border-gray-600 rounded-lg shadow-xl p-6">
      <h3 className="text-center mb-5!">Verify OTP</h3>
      <form onSubmit={verifyOtp} className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="p-2 border w-[70%] rounded-md "
        />
        <button
          type="submit"
          disabled={docState.loading}
          className="p-2 w-[70%] rounded-md bg-[#1464dc] cursor-pointer hover:bg-[#0744a0]"
        >
          {docState.loading ? "Verifying..." : "Verfiy OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpVerificationForm;
