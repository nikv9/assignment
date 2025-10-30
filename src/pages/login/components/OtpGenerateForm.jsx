import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateOtpAction } from "../../../redux/doc_slice";
import { toast } from "react-toastify";

const OtpGenerateForm = (props) => {
  const docState = useSelector((state) => state.documents);
  const dispatch = useDispatch();

  const [mobile, setMobile] = useState("");

  const generateOtp = async (e) => {
    e.preventDefault();
    if (!mobile) toast.warn("Enter mobile number");
    const res = await dispatch(generateOtpAction(mobile));

    if (res.payload.status === true) {
      toast.success(res.payload.data);
      localStorage.setItem("mobile_number", mobile);
      props.setIsOtpSent(true);
    } else {
      toast.error(res.payload.message);
    }
  };

  return (
    <div className="w-[30%] shadow-xl p-4 border border-gray-500 rounded-md">
      <h3 className="text-center mb-5!">Login with Mobile</h3>
      <form onSubmit={generateOtp} className="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="p-2 border w-[70%] rounded-md "
        />
        <button
          type="submit"
          disabled={docState.loading}
          className="p-2 w-[70%] rounded-md bg-[crimson] cursor-pointer hover:bg-[#b5122b]"
        >
          {docState.loading ? "Sending..." : "Generate OTP"}
        </button>
      </form>
    </div>
  );
};

export default OtpGenerateForm;
