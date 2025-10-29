const docService = {};

const generateOTP = async (mobileNumber) => {
  return await docService.post("/generateOTP", {
    mobile_number: mobileNumber,
  });
};

export default docService;
