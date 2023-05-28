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
          state.push({ ...bill, vote: "" });
        }
      });
    },
    billVote: (state, action) => {
      const index = state.findIndex(
        (value) => value.id === action.payload.billId
      );
      if (index !== -1) {
        state[index].vote = action.payload.vote;
      }
    },
  },
});

export const { addBills, billVote } = finalBillsSlice.actions;

export default finalBillsSlice.reducer;
