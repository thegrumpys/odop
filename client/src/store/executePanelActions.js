import {
  EXECUTE_START,
  EXECUTE_STOP_ON_LOAD,
  EXECUTE_STOP,
  SET_SHOW,
  SET_EXECUTE_NAME,
  SET_PREFIX,
  SET_STATES,
  SET_STEP,
} from './executePanelTypes';

export function executeStart(show, executeName, prefix, states, step) {
  return {
    type: EXECUTE_START,
    payload: {
      show: show,
      executeName: executeName,
      prefix: prefix,
      states: states,
      step: step,
    }
  }
}

export function executeStopOnLoad() {
  return {
    type: EXECUTE_STOP_ON_LOAD
  }
}

export function executeStop() {
  return {
    type: EXECUTE_STOP
  }
}

export function setShow(show) {
  return {
    type: SET_SHOW,
    payload: {
      show: show
    }
  }
}

export function setExecuteName(executeName) {
  return {
    type: SET_EXECUTE_NAME,
    payload: {
      executeName: executeName
    }
  }
}

export function setPrefix(prefix) {
  return {
    type: SET_PREFIX,
    payload: {
      prefix: prefix
    }
  }
}

export function setStates(states) {
  return {
    type: SET_STATES,
    payload: {
      states: states
    }
  }
}

export function setStep(step) {
  return {
    type: SET_STEP,
    payload: {
      step: step
    }
  }
}

export function setStopOnFileLoad(stop_on_file_load) {
  return {
    type: SET_STOP_ON_FILE_LOAD,
    payload: {
      stop_on_file_load: stop_on_file_load
    }
  }
}
