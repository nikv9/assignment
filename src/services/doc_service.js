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

docService.uploadFile = async (formData, token) => {
  return await apiInstance.post("/saveDocumentEntry", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: token,
    },
  });
};

export default docService;
