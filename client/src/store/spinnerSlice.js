import { createSlice } from "@reduxjs/toolkit";

export const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState: {
    show: false
  },
  reducers: {
    enableSpinner: (state) => {
//      console.log('spinner enabled');
      state.show = true;
    },
    disableSpinner: (state) => {
//      console.log('spinner disabled');
      state.show = false;
    }
  }
});

export const { enableSpinner, disableSpinner } = spinnerSlice.actions;

export default spinnerSlice.reducer;
