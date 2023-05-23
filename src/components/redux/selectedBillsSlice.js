import { createSlice } from "@reduxjs/toolkit";

/**
 * State of all user's selected bills.
 */
const initialState = [];

export const selectedBillsSlice = createSlice({
  name: "selectedBills",
  initialState,
  reducers: {
    addBill: (state, action) => {
      state.push(action.payload);
    },
    removeBill: (state, action) => {
      const index = state.findIndex((value) => value === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addBill, removeBill } = selectedBillsSlice.actions;

export default selectedBillsSlice.reducer;
