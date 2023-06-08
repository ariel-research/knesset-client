import { createSlice } from "@reduxjs/toolkit";

/**
 * State of all final bills chosen by the user.
 */
const initialState = [];

export const compassResultsSlice = createSlice({
  name: "compassResults",
  initialState,
  reducers: {
    updateResults: (state, action) => {
      action.payload.batch.forEach((res) => {
        state.push({ ...res });
      });
    },
  },
});

export const { updateResults } = compassResultsSlice.actions;

export default compassResultsSlice.reducer;
