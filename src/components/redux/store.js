import { configureStore } from "@reduxjs/toolkit";
import searchedBillReducer from "./searchedBillSlice";
import selectedBillsReducer from "./selectedBillsSlice";
import compassResultsReducer from "./compassResultsSlice";

const store = configureStore({
  reducer: {
    searchedBill: searchedBillReducer,
    selectedBills: selectedBillsReducer,
    compassResults: compassResultsReducer,
  },
});

export default store;
