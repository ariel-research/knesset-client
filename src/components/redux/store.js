import { configureStore } from "@reduxjs/toolkit";
import searchedBillReducer from "./searchedBillSlice";
import selectedBillsReducer from "./selectedBillsSlice";
import finalBillsReducer from "./finalBillsSlice";
import compassResultsReducer from "./compassResultsSlice";

const store = configureStore({
  reducer: {
    searchedBill: searchedBillReducer,
    selectedBills: selectedBillsReducer,
    finalBills: finalBillsReducer,
    compassResults: compassResultsReducer,
  },
});

export default store;
