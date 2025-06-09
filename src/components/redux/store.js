import { configureStore } from "@reduxjs/toolkit";
import searchedBillReducer from "./searchedBillSlice";
import selectedBillsReducer from "./selectedBillsSlice";
import compassResultsReducer from "./compassResultsSlice";
import displayedBillsReducer from "./displayedBillsSlice"

const store = configureStore({
  reducer: {
    searchedBill: searchedBillReducer,
    selectedBills: selectedBillsReducer,
    displayedBills: displayedBillsReducer,
    compassResults: compassResultsReducer,
  },
});

export default store;
