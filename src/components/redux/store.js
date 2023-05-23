import { configureStore } from "@reduxjs/toolkit";
import searchedBillReducer from "./searchedBillSlice";
import selectedBillsReducer from "./selectedBillsSlice";
import finalBillsReducer from "./finalBillsSlice";

const store = configureStore({
  reducer: {
    searchedBill: searchedBillReducer,
    selectedBills: selectedBillsReducer,
    finalBills: finalBillsReducer,
  },
});

export default store;
