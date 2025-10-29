import { createSlice } from "@reduxjs/toolkit";

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
  extraReducers: {},
});

export const { resetDocStateMsg } = docSlice.actions;

export default docSlice.reducer;
