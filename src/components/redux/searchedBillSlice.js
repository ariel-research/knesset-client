import { createSlice } from "@reduxjs/toolkit";

/**
 * State of the current bill searched by the user.
 */
const initialState = { id: "", label: "" };

export const searchedBillSlice = createSlice({
  name: "searchedBill",
  initialState,
  reducers: {
    update: (state, action) => {
      state.id = action.payload.id;
      state.label = action.payload.label;
    },
    clear: (state) => {
      state.id = "";
      state.label = "";
    },
  },
});

export const { update, clear } = searchedBillSlice.actions;

export default searchedBillSlice.reducer;
