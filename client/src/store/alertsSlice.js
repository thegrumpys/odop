import { createSlice, current } from "@reduxjs/toolkit";
import { getSeverityNumberBySeverity, getFontClassBySeverityNumber } from '../components/Alerts';

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
        let clone = { ...action.payload.alert };
//        console.log('alerts add','clone=',clone);
        var severityNumber = getSeverityNumberBySeverity(action.payload.alert.severity);
//        console.log('alerts add','severityNumber=',severityNumber);
        clone.className = getFontClassBySeverityNumber(severityNumber);;
//        console.log('alerts add','clone.className=',clone.className);
        state.alerts = state.alerts.concat(clone);
//        console.log('alerts add','state.alerts=',state.alerts);
      },
      prepare: (alert) => { return { payload: { alert } } }
    }
  }
});

export const { clearAlerts, addAlert } = alertsSlice.actions;

export default alertsSlice.reducer;
