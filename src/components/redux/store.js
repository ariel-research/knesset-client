import { configureStore } from "@reduxjs/toolkit";
import searchedBillReducer from "./searchedBillSlice";
import selectedBillsReducer from "./selectedBillsSlice";

const store = configureStore({
  reducer: {
    searchedBill: searchedBillReducer,
    selectedBills: selectedBillsReducer,
  },
});

export default store;
