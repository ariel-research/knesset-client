import { createSlice } from "@reduxjs/toolkit";

/**
 * State of all final bills chosen by the user.
 */
const initialState = [];

export const finalBillsSlice = createSlice({
  name: "finalBills",
  initialState,
  reducers: {
    addBills: (state, action) => {
      action.payload.forEach((bill) => {
        const index = state.findIndex((value) => value.id === bill.id);
        //add only if not exist already
        if (index === -1) {
          state.push({ ...bill, vote: 3 });
        }
      });
    },
    loadBill: (state, action) => {
      const index = state.findIndex((value) => value.id === action.payload.id);
      //add only if not exist already
      if (index === -1) {
        state.push({ ...action.payload, vote: 1 });
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
    removeBillFinal: (state, action) => {
      const index = state.findIndex((value) => value.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addBills, loadBill, billVote, removeBillFinal } =
  finalBillsSlice.actions;

export default finalBillsSlice.reducer;
