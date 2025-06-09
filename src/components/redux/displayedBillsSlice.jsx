import { createSlice } from "@reduxjs/toolkit";

export const displayedBillsSlice = createSlice({
  name: "displayedBills",
  initialState: [],
  reducers: {
    setDisplayedBills: (state, action) => {
      return action.payload; // replace entire state
    },
  },
});

export const { setDisplayedBills } = displayedBillsSlice.actions;

export default displayedBillsSlice.reducer;
