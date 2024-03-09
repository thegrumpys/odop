import { createSlice, current } from "@reduxjs/toolkit";

export const spinnerSlice = createSlice({
  name: "spinnerSlice",
  initialState: {
    show: false
  },
  reducers: {
    enableSpinner: {
      reducer: (state, action) => {
//        console.log('spinner enabled','state=',current(state),',action=',action);
        state.show = true;
      }
    },
    disableSpinner: {
      reducer: (state, action) => {
//        console.log('spinner disabled','state=',current(state),',action=',action);
        state.show = false;
      }
    }
  }
});

export const { enableSpinner, disableSpinner } = spinnerSlice.actions;

export default spinnerSlice.reducer;
