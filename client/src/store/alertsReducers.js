import {
  CLEAR_ALERTS,
  ADD_ALERT,
  SET_ACTIVE_KEY,
  SET_CARET,
  SET_LEVEL,
} from './alertsTypes';
import { getSeverityNumberBySeverity, getFontClassBySeverityNumber } from '../components/Alerts';

export default function alertsReducers(state, action) {
  switch (action.type) {
    case CLEAR_ALERTS:
      var result = Object.assign({}, state, {
        ...state,
        alertsSlice: {
          ...state.alertsSlice,
          alerts: []
        }
      });
      return result;
    case ADD_ALERT:
      let clone = { ...action.payload.alert };
      var severityNumber = getSeverityNumberBySeverity(action.payload.alert.severity);
      clone.className = getFontClassBySeverityNumber(severityNumber);
      var result = Object.assign({}, state, {
        ...state,
        alertsSlice: {
          ...state.alertsSlice,
          alerts: [...state.alerts, clone]
        }
      });
      return result;
    case SET_ACTIVE_KEY:
      var result = Object.assign({}, state, {
        ...state,
        alertsSlice: {
          ...state.alertsSlice,
          activeKey: action.payload.activeKey
        }
      });
      return result;
    case SET_CARET:
      var result = Object.assign({}, state, {
        ...state,
        alertsSlice: {
          ...state.alertsSlice,
          caret: action.payload.caret
        }
      });
      return result;
    case SET_LEVEL:
      var result = Object.assign({}, state, {
        ...state,
        alertsSlice: {
          ...state.alertsSlice,
          level: action.payload.level
        }
      });
      return result;
    default:
      return state;
  }
}
