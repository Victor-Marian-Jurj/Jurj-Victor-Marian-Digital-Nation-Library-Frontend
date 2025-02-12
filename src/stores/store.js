import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./bookSlice";
import snackbarSlice from "./snackbarSlice";

const store = configureStore({
  reducer: {
    bookReducer: bookSlice,
    snackbarReducer: snackbarSlice,
  },
});

export default store;
