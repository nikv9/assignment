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

docService.uploadFile = async (data, token) => {
  return await apiInstance.post("/saveDocumentEntry", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      token: token,
    },
  });
};

docService.searchFiles = async (data, token) => {
  return await apiInstance.post("/searchDocumentEntry", data, {
    headers: { token },
  });
};

export default docService;
