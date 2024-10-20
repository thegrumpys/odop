import {

//=============================================================================
// Alerts Types
//=============================================================================

  CLEAR_ALERTS,
  ADD_ALERT,
  SET_ACTIVE_KEY,
  SET_CARET,
  SET_LEVEL,

//=============================================================================
// ExecutePanel Types
//=============================================================================

  EXECUTE_START,
  EXECUTE_STOP_ON_LOAD,
  EXECUTE_STOP,
  SET_SHOW,
  SET_EXECUTE_NAME,
  SET_PREFIX,
  SET_STATES,
  SET_STEP,
  SET_TEST_GENERATE,
  OUTPUT_START,
  OUTPUT_LINE,
  OUTPUT_STOP,

//=============================================================================
// Message Types
//=============================================================================

  ADD_MESSAGE,
  DISABLE_MESSAGE,

//=============================================================================
// Model Types
//=============================================================================

  INJECT,
  STARTUP,
  LOAD,
  LOAD_INITIAL_STATE,
  CHANGE_NAME,
  CHANGE_USER,
  CHANGE_VIEW,

  CHANGE_SYMBOL_VALUE,
  FIX_SYMBOL_VALUE,
  FREE_SYMBOL_VALUE,
  CHANGE_SYMBOL_VIOLATION,
  CHANGE_SYMBOL_CONSTRAINT,
  CHANGE_SYMBOL_CONSTRAINTS,
  SET_SYMBOL_FLAG,
  RESET_SYMBOL_FLAG,
  CHANGE_SYMBOL_INPUT,
  CHANGE_SYMBOL_HIDDEN,

  CHANGE_INPUT_SYMBOL_VALUES,
  SAVE_INPUT_SYMBOL_VALUES,
  RESTORE_INPUT_SYMBOL_VALUES,

  CHANGE_OUTPUT_SYMBOL_VALUES,
  SAVE_OUTPUT_SYMBOL_CONSTRAINTS,
  RESTORE_OUTPUT_SYMBOL_CONSTRAINTS,

  CHANGE_RESULT_OBJECTIVE_VALUE,
  CHANGE_RESULT_TERMINATION_CONDITION,
  CHANGE_RESULT_SEARCH_COMPLETED,

  CHANGE_SYSTEM_CONTROLS_VALUE,
  CHANGE_LABELS_VALUE,

  SEARCH,
  SEEK,

  SAVE_AUTO_SAVE,
  RESTORE_AUTO_SAVE,
  DELETE_AUTO_SAVE,

  LOG_USAGE,
  ENABLE_DISPATCHER,

//=============================================================================
// Spinner Types
//=============================================================================

  ENABLE_SPINNER,
  DISABLE_SPINNER,
} from './types';

//=============================================================================
// Alerts Actions
//=============================================================================

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

//=============================================================================
// ExecutePanel Actions
//=============================================================================

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

export function setStopOnFileLoad(stopOnFileLoad) {
  return {
    type: SET_STOP_ON_FILE_LOAD,
    payload: {
      stopOnFileLoad: stopOnFileLoad
    }
  }
}

export function setTestGenerate(testGenerate) {
  return {
    type: SET_TEST_GENERATE,
    payload: {
      testGenerate: testGenerate
    }
  }
}

export function outputStart() {
  return {
    type: OUTPUT_START,
  }
}

export function outputLine(line) {
  return {
    type: OUTPUT_LINE,
    payload: {
      line: line
    }
  }
}

export function outputStop() {
  return {
    type: OUTPUT_STOP,
  }
}

//=============================================================================
// Message Actions
//=============================================================================

export function addMessage(message, variant, header, help_url) {
  return {
    type: ADD_MESSAGE,
    payload: {
      message: message,
      variant: variant,
      header: header,
      help_url: help_url
    }
  }
}

export function disableMessage() {
  return {
    type: DISABLE_MESSAGE
  }
}

//=============================================================================
// Model Actions
//=============================================================================

export function inject(store) {
  return {
    type: INJECT,
    payload: {
      store
    }
  }
}

export function startup() {
  return {
    type: STARTUP
  }
}

export function load(model) {
  return {
    type: LOAD,
    payload: {
      model
    }
  }
}

export function loadInitialState(type, units = 'US') {
  return {
    type: LOAD_INITIAL_STATE,
    payload: {
      type,
      units
    }
  }
}

export function changeName(name) {
  return {
    type: CHANGE_NAME,
    payload: {
      name
    }
  }
}

export function changeUser(user) {
  return {
    type: CHANGE_USER,
    payload: {
      user
    }
  }
}

export function changeView(view) {
  return {
    type: CHANGE_VIEW,
    payload: {
      view
    }
  }
}

export function changeSymbolValue(name, value, merit) {
  return {
    type: CHANGE_SYMBOL_VALUE,
    payload: {
      name,
      value,
      merit
    }
  }
}

export function fixSymbolValue(name, value) {
  return {
    type: FIX_SYMBOL_VALUE,
    payload: {
      name,
      value
    }
  }
}

export function freeSymbolValue(name) {
  return {
    type: FREE_SYMBOL_VALUE,
    payload: {
      name
    }
  }
}

export function changeSymbolViolation(name, minmax, value) {
  return {
    type: CHANGE_SYMBOL_VIOLATION,
    payload: {
      name,
      minmax,
      value
    }
  }
}

export function changeSymbolConstraint(name, minmax, value, skipDispatch = false) {
  return {
    type: CHANGE_SYMBOL_CONSTRAINT,
    payload: {
      name,
      minmax,
      value,
      skipDispatch,
    }
  }
}

export function changeSymbolConstraints(values, minmax) {
  return {
    type: CHANGE_SYMBOL_CONSTRAINTS,
    payload: {
      values,
      minmax
    }
  }
}

export function setSymbolFlag(name, minmax, mask, source = undefined) {
  return {
    type: SET_SYMBOL_FLAG,
    payload: {
      name,
      minmax,
      mask,
      source,
    }
  }
}

export function resetSymbolFlag(name, minmax, mask) {
  return {
    type: RESET_SYMBOL_FLAG,
    payload: {
      name,
      minmax,
      mask
    }
  }
}

export function changeSymbolInput(name, value) {
  return {
    type: CHANGE_SYMBOL_INPUT,
    payload: {
      name,
      value
    }
  }
}

export function changeSymbolHidden(name, value) {
  return {
    type: CHANGE_SYMBOL_HIDDEN,
    payload: {
      name,
      value
    }
  }
}

export function changeInputSymbolValues(values, merit) {
  return {
    type: CHANGE_INPUT_SYMBOL_VALUES,
    payload: {
      values,
      merit
    }
  }
}

export function saveInputSymbolValues() {
  return {
    type: SAVE_INPUT_SYMBOL_VALUES
  }
}

export function restoreInputSymbolValues(merit) {
  return {
    type: RESTORE_INPUT_SYMBOL_VALUES,
    payload: {
      merit
    }
  }
}

export function changeOutputSymbolValues(values) {
  return {
    type: CHANGE_OUTPUT_SYMBOL_VALUES,
    payload: {
      values
    }
  }
}

export function saveOutputSymbolConstraints(name) {
  return {
    type: SAVE_OUTPUT_SYMBOL_CONSTRAINTS,
    payload: {
      name
    }
  }
}

export function restoreOutputSymbolConstraints(name) {
  return {
    type: RESTORE_OUTPUT_SYMBOL_CONSTRAINTS,
    payload: {
      name
    }
  }
}

export function changeResultObjectiveValue(objective_value) {
  return {
    type: CHANGE_RESULT_OBJECTIVE_VALUE,
    payload: {
      objective_value
    }
  }
}

export function changeResultTerminationCondition(termination_condition) {
  return {
    type: CHANGE_RESULT_TERMINATION_CONDITION,
    payload: {
      termination_condition
    }
  }
}

export function changeResultSearchCompleted(search_completed = false) {
  return {
    type: CHANGE_RESULT_SEARCH_COMPLETED,
    payload: {
      search_completed
    }
  }
}

export function changeSystemControlsValue(system_controls) {
  return {
    type: CHANGE_SYSTEM_CONTROLS_VALUE,
    payload: {
      system_controls
    }
  }
}

export function changeLabelsValue(labels) {
  return {
    type: CHANGE_LABELS_VALUE,
    payload: {
      labels
    }
  }
}

export function search() {
  return {
    type: SEARCH
  }
}

export function seek(name, minmax) {
  return {
    type: SEEK,
    payload: {
      name,
      minmax
    }
  }
}

export function saveAutoSave(name) {
  if (name === undefined) {
    name = "autosave";
  }
  return {
    type: SAVE_AUTO_SAVE,
    payload: {
      name,
    }
  }
}

export function restoreAutoSave(name) {
  if (name === undefined) {
    name = "autosave";
  }
  return {
    type: RESTORE_AUTO_SAVE,
    payload: {
      name,
    }
  }
}

export function deleteAutoSave(name) {
  if (name === undefined) {
    name = "autosave";
  }
  return {
    type: DELETE_AUTO_SAVE,
    payload: {
      name,
    }
  }
}

export function logUsage(tag, action, note) {
  return {
    type: LOG_USAGE,
    payload: {
      tag,
      action,
      note,
    }
  }
}

export function enableDispatcher(value = true) {
  return {
    type: ENABLE_DISPATCHER,
    payload: {
      value
    }
  }
}

//=============================================================================
// Spinner Actions
//=============================================================================

export function enableSpinner() {
  return {
    type: ENABLE_SPINNER
  }
}

export function disableSpinner() {
  return {
    type: DISABLE_SPINNER
  }
}
