import apiInstance from "./api";

const docService = {};

docService.generateOtp = async (mobileNumber) => {
  return await apiInstance.post("/generateOTP", {
    mobile_number: mobileNumber,
  });
};

docService.verifyOtp = async (data) => {
  return await apiInstance.post("/validateOTP", {
    mobile_number: data.mobileNumber,
    otp: data.otp,
  });
};

export default docService;
