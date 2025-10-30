import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import docService from "../services/doc_service";

// actions
export const generateOtpAction = createAsyncThunk(
  "doc/generateOtp",
  async (data) => {
    try {
      const res = await docService.generateOtp(data);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const verifyOtpAction = createAsyncThunk(
  "doc/verifyOtp",
  async (data) => {
    try {
      const res = await docService.verifyOtp(data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const initialState = {
  documents: [],
  loading: false,
  success: null,
  error: null,
};

const docSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    resetDocStateMsg: (state) => {
      state.success = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // generate otp
      .addCase(generateOtpAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(generateOtpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload?.message || "OTP sent successfully";
      })
      .addCase(generateOtpAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to generate OTP";
      })

      // verify otp
      .addCase(verifyOtpAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(verifyOtpAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "OTP verified successfully";
      })
      .addCase(verifyOtpAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const { resetDocStateMsg } = docSlice.actions;

export default docSlice.reducer;
