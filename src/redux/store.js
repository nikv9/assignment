import { configureStore } from "@reduxjs/toolkit";
import docSlice from "./doc_slice";

export const store = configureStore({
  reducer: {
    documents: docSlice,
  },
});
