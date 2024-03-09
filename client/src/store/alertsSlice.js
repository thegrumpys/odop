import { createSlice, current } from "@reduxjs/toolkit";

export const alertsSlice = createSlice({
  name: "alertsSlice",
  initialState: {
    alerts: []
  },
  reducers: {
    clearAlerts: {
      reducer: (state, action) => {
//        console.log('alerts clear','state=',current(state),',action=',action);
        state.alerts = [];
      }
    },
    addAlert: {
      reducer: (state, action) => {
//        console.log('alerts add','state=',current(state),',action=',action);
        state.alerts.concat(action.payload.alert);
      },
      prepare: (alert) => { return { payload: { alert } } }
    }
  }
});

export const { clearAlerts, addAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
