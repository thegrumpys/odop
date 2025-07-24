import {
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
  CHANGE_SYMBOL_FORMAT,

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
} from './types';
import { MIN } from './actionTypes';

export function dumpers(action) {
  var flags = ['', 'CONSTRAINED', 'FIXED', 'CONSTRAINED|FIXED', 'FDCL', 'CONSTRAINED|FDCL', 'FIXED|FDCL', 'CONSTRAINED|FIXED|FDCL']
  var result = '@@@ NOT SUPPORTED @@@';
  switch (action.type) {
    case STARTUP:
      result = 'startup()';
      break;
    case LOAD:
      result = 'load(' + JSON.stringify(action.payload.design) + ')';
      break;
    case LOAD_INITIAL_STATE:
      result = 'loadInitialState(' + JSON.stringify(action.payload.type) + ',' + JSON.stringify(action.payload.units) + ')';
      break;
    case CHANGE_NAME:
      result = 'changeName(' + JSON.stringify(action.payload.name) + ')';
      break;
    case CHANGE_USER:
      result = 'changeUser(' + JSON.stringify(action.payload.user) + ')';
      break;
    case CHANGE_VIEW:
      result = 'changeView(' + JSON.stringify(action.payload.view) + ')';
      break;
    case CHANGE_SYMBOL_VALUE:
      result = 'changeSymbolValue(' + JSON.stringify(action.payload.name) + ',' + JSON.stringify(action.payload.value) + (action.payload.merit === undefined ? '' : JSON.stringify(action.payload.merit)) + ')';
      break;
    case FIX_SYMBOL_VALUE:
      result = 'fixSymbolValue(' + JSON.stringify(action.payload.name) + ',' + JSON.stringify(action.payload.value) + ')';
      break;
    case FREE_SYMBOL_VALUE:
      result = 'freeSymbolValue(' + JSON.stringify(action.payload.name) + ')';
      break;
    case CHANGE_SYMBOL_VIOLATION:
      result = 'changeSymbolViolation(' + JSON.stringify(action.payload.name) + ',' + (action.payload.minmax === MIN ? 'MIN' : 'MAX') + ',' + action.payload.value + ')'
      break;
    case CHANGE_SYMBOL_CONSTRAINT:
      result = 'changeSymbolConstraint(' + JSON.stringify(action.payload.name) + ',' + (action.payload.minmax === MIN ? 'MIN' : 'MAX') + ',' + action.payload.value + ')'
      break;
    case CHANGE_SYMBOL_CONSTRAINTS:
      break;
    case SET_SYMBOL_FLAG:
      result = 'setSymbolFlag(' + JSON.stringify(action.payload.name) + ',' + (action.payload.minmax === MIN ? 'MIN' : 'MAX') + ',' + flags[action.payload.mask] + (action.payload.source === undefined ? '' : +action.payload.source) + ')'
      break;
    case RESET_SYMBOL_FLAG:
      result = 'resetSymbolFlag(' + JSON.stringify(action.payload.name) + ',' + (action.payload.minmax === MIN ? 'MIN' : 'MAX') + ',' + flags[action.payload.mask] + ')'
      break;
    case CHANGE_SYMBOL_INPUT:
      result = 'changeSymbolInput(' + JSON.stringify(action.payload.name) + ',' + flags[action.payload.value] + ')'
      break;
    case CHANGE_SYMBOL_HIDDEN:
      result = 'changeSymbolHidden(' + JSON.stringify(action.payload.name) + ',' + flags[action.payload.value] + ')'
      break;
    case CHANGE_SYMBOL_FORMAT:
      result = 'changeSymbolFormat(' + JSON.stringify(action.payload.name) + ',' + JSON.stringify(action.payload.value) + ')'
      break;
    case CHANGE_INPUT_SYMBOL_VALUES:
      break;
    case SAVE_INPUT_SYMBOL_VALUES:
      break;
    case RESTORE_INPUT_SYMBOL_VALUES:
      break;
    case CHANGE_OUTPUT_SYMBOL_VALUES:
      break;
    case SAVE_OUTPUT_SYMBOL_CONSTRAINTS:
      break;
    case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS:
      break;
    case CHANGE_RESULT_OBJECTIVE_VALUE:
      break;
    case CHANGE_RESULT_TERMINATION_CONDITION:
      break;
    case CHANGE_RESULT_SEARCH_COMPLETED:
      break;
    case CHANGE_SYSTEM_CONTROLS_VALUE:
      result = 'changeSystemControlsValue(' + JSON.stringify(action.payload.system_controls) + ')';
      break;
    case CHANGE_LABELS_VALUE:
      result = 'changeLabelsValue(' + JSON.stringify(action.payload.labels) + ')';
      break;
    case SEARCH:
      result = 'search()';
      break;
    case SEEK:
      result = 'seek(' + JSON.stringify(action.payload.name) + ',' + (action.payload.minmax === MIN ? 'MIN' : 'MAX') + ')';
      break;
    case SAVE_AUTO_SAVE:
      break;
    case RESTORE_AUTO_SAVE:
      break;
    case DELETE_AUTO_SAVE:
      break;
    case LOG_USAGE:
      result = undefined; // Don't generate in test case
      break;
    default:
      break;
  }
  return result;
}
