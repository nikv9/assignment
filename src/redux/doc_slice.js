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
      console.log(res);
      if (res.data.status === true) {
        localStorage.setItem("userData", JSON.stringify(res.data.data));
      }

      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const uploadFileAction = createAsyncThunk(
  "doc/uploadFile",
  async (formData, { getState }) => {
    try {
      const token = getState().documents.user?.token;
      const res = await docService.uploadFile(formData, token);
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

export const searchFilesAction = createAsyncThunk(
  "doc/files",
  async (data, { getState }) => {
    console.log("first");
    const token = getState().documents?.user?.token;
    const res = await docService.searchFiles(data, token);
    return res.data;
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("userData")) || null,
  documents: [],
  loading: false,
  success: null,
  error: null,
  files: [],
};

const docSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
    resetDocStateMsg: (state) => {
      state.success = null;
      state.error = null;
    },
    clrUser: (state) => {
      state.user = null;
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
        console.log(action);
        state.user = action.payload;
      })
      .addCase(verifyOtpAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })

      // upload file
      .addCase(uploadFileAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadFileAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "File uploaded successfully!";
      })
      .addCase(uploadFileAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Upload failed";
      })

      // search file
      .addCase(searchFilesAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchFilesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.files = action.payload?.data;
      })
      .addCase(searchFilesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      });
  },
});

export const { resetDocStateMsg, clrUser } = docSlice.actions;

export default docSlice.reducer;
