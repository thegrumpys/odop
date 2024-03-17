import { createSlice, current } from "@reduxjs/toolkit";
import { getSeverityNumberBySeverity, getFontClassBySeverityNumber, ERR } from '../components/Alerts';

export const alertsSlice = createSlice({
  name: "alertsSlice",
  initialState: {
    alerts: [],
    activeKey: null,
    caret: "fas fa-caret-right",
    level: ERR,
  },
  reducers: {
    clearAlerts: {
      reducer: (state, action) => {
//        console.log('alerts clearAlerts','state=',current(state),',action=',action);
        state.alerts = [];
      }
    },
    addAlert: {
      reducer: (state, action) => {
//        console.log('alerts addAlert','state=',current(state),',action=',action);
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
    },
    setActiveKey: {
      reducer: (state, action) => {
//        console.log('reducer setActiveKey','state=',current(state),',action=',action);
        state.activeKey = action.payload.activeKey;
      },
      prepare: (activeKey) => { return { payload: { activeKey } } }
    },
    setCaret: {
      reducer: (state, action) => {
//        console.log('reducer setCaret','state=',current(state),',action=',action);
        state.caret = action.payload.caret;
      },
      prepare: (caret) => { return { payload: { caret } } }
    },
    setLevel: {
      reducer: (state, action) => {
//        console.log('reducer setLevel','state=',current(state),',action=',action);
        state.level = action.payload.level;
      },
      prepare: (level) => { return { payload: { level } } }
    }
  }
});

export const { clearAlerts, addAlert, setActiveKey, setCaret, setLevel } = alertsSlice.actions;

export default alertsSlice.reducer;
