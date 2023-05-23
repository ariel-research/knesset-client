import { configureStore } from "@reduxjs/toolkit";
import searchedBillReducer from "./searchedBillSlice";

const store = configureStore({
  reducer: {
    searchedBill: searchedBillReducer,
  },
});

export default store;
