import {
  CLEAR_ALERTS,
  ADD_ALERT,
  SET_ACTIVE_KEY,
  SET_CARET,
  SET_LEVEL,
} from './alertsTypes';

export function clearAlerts() {
  return {
    type: CLEAR_ALERTS,
  }
}

export function addAlert(alert) {
  return {
    type: ADD_ALERT,
    payload: {
      alert: alert
    }
  }
}

export function setActiveKey(activeKey) {
  return {
    type: SET_ACTIVE_KEY,
    payload: {
      activeKey: activeKey
    }
  }
}

export function setCaret(caret) {
  return {
    type: SET_CARET,
    payload: {
      caret: caret
    }
  }
}

export function setLevel(level) {
  return {
    type: SET_LEVEL,
    payload: {
      level: level
    }
  }
}

