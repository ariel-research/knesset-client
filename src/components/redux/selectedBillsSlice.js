import { createSlice } from "@reduxjs/toolkit";

/**
 * State of all user's selected bills.
 */
const initialState = [];

export const selectedBillsSlice = createSlice({
  name: "selectedBills",
  initialState,
  reducers: {
    addMultipleBills: (state, action) => {
      const res = [];
      action.payload.forEach((element) => {
        const index = state.findIndex((value) => value.id === element.id);
        //add only if not exist already
        if (index === -1) {
          res.push(element);
        }
      });
      state.push(...res);
    },
    addBill: (state, action) => {
      const index = state.findIndex((value) => value.id === action.payload.id);
      //add only if not exist already
      if (index === -1) {
        state.push(action.payload);
      }
    },
    billVote: (state, action) => {
      const index = state.findIndex(
        (value) => value.id === action.payload.billId
      );
      if (index !== -1) {
        state[index].vote = parseInt(action.payload.vote);
      }
    },
    removeBill: (state, action) => {
      const index = state.findIndex((value) => value.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addMultipleBills, addBill, billVote, removeBill } =
  selectedBillsSlice.actions;

export default selectedBillsSlice.reducer;
