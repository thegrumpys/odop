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
  SET_STEPS,
  SET_STOP_ON_FILE_LOAD,
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
  SAVE_OUTPUT_SYMBOL_CONSTRAINTS,
  RESTORE_OUTPUT_SYMBOL_CONSTRAINTS,
  SET_SYMBOL_FLAG,
  RESET_SYMBOL_FLAG,
  CHANGE_SYMBOL_INPUT,
  CHANGE_SYMBOL_HIDDEN,
  CHANGE_SYMBOL_FORMAT,

  CHANGE_INPUT_SYMBOL_VALUES,
  SAVE_INPUT_SYMBOL_VALUES,
  RESTORE_INPUT_SYMBOL_VALUES,
  SAVE_SYMBOL_VALUE,
  RESTORE_SYMBOL_VALUE,

  CHANGE_OUTPUT_SYMBOL_VALUES,

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
  DISABLE_SPINNER
} from './types';

import { getSeverityNumberBySeverity, getFontClassBySeverityNumber } from '../components/Alerts';
import { VALID_MIN, VALID_MAX, MIN, MAX, FDCL } from './actionTypes';
import { sclden } from './middleware/sclden';
import { initialSystemControls } from '../initialSystemControls';
import { logUsage as log } from '../logUsage';

export default function reducers(state = {}, action) {

//  console.log('reducers','state=',state,'action=', action);
//  if (action.payload === undefined || action.payload.name === undefined) {
//      console.log('<li>','In reducers action=', action.type,'</li>');
//  } else {
//      console.log('<li>','In reducers action=', action.type,'action.payload.name=',action.payload.name,'</li>');
//  }

  switch (action.type) {

//=============================================================================
// Alerts Reducers
//=============================================================================

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
          alerts: [...state.alertsSlice.alerts, clone]
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

//=============================================================================
// ExecutePanel Reducers
//=============================================================================

    case EXECUTE_START:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          show: action.payload.show,
          executeName: action.payload.executeName,
          prefix: action.payload.prefix,
          states: action.payload.states,
          step: action.payload.step,
          steps: action.payload.steps,
          stopOnFileLoad: true,
          testGenerate: false,
        }
      });
      return result;

    case EXECUTE_STOP_ON_LOAD:
      var result;
      if (state.executePanelSlice.stopOnFileLoad) {
        result = Object.assign({}, state, {
          ...state,
          executePanelSlice: {
            ...state.executePanelSlice,
            show: false,
            executeName: undefined, // Clear execute name
            prefix: '',
            states: [],
            step: 0,
            steps: [],
            stopOnFileLoad: true,
            testGenerate: false,
          }
        });
      } else {
        result = state;
      }
      return result;

    case EXECUTE_STOP:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          show: false,
          executeName: undefined, // Clear execute name
          prefix: '',
          states: [],
          step: 0,
          steps: [],
          stopOnFileLoad: true,
          testGenerate: false,
        }
      });
      return result;

    case SET_SHOW:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          show: action.payload.step
        }
      });
      return result;

    case SET_EXECUTE_NAME:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          executeName: action.payload.executeName
        }
      });
      return result;

    case SET_PREFIX:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          prefix: action.payload.prefix
        }
      });
      return result;

    case SET_STATES:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          states: action.payload.states
        }
      });
      return result;

    case SET_STEP:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          step: action.payload.step
        }
      });
      return result;

    case SET_STEPS:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          steps: action.payload.steps
        }
      });
      return result;

    case SET_STOP_ON_FILE_LOAD:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          stopOnFileLoad: action.payload.stopOnFileLoad
        }
      });
      return result;

    case SET_TEST_GENERATE:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          testGenerate: action.payload.testGenerate
        }
      });
      return result;

    case OUTPUT_START:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          lines: '',
        }
      });
      return result;

    case OUTPUT_LINE:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          lines: state.executePanelSlice.lines + '\n' + action.payload.line
        }
      });
      return result;

    case OUTPUT_STOP:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          lines: state.executePanelSlice.lines + '\n'
        }
      });
      return result;

//=============================================================================
// Message Reducers
//=============================================================================

    case ADD_MESSAGE:
      var result;
//      console.log('action=',action);
      if (!state.messageSlice.show) {
        result = Object.assign({}, state, { // Initialize messages
          ...state,
          messageSlice: {
            ...state.messageSlice,
            show: true,
            header: action.payload.header,
            messages: [{ message: action.payload.message, variant: action.payload.variant }],
            help_urls: [action.payload.help_url],
          }
        });
//        console.log('result1=',result);
      } else {
        result = Object.assign({}, state, { // Concatenate messages
          ...state,
          messageSlice: {
            ...state.messageSlice,
            messages: [...state.messageSlice.messages, { message: action.payload.message, variant: action.payload.variant }],
            help_urls: [...state.messageSlice.help_urls, action.payload.help_url],
          }
        });
//        console.log('result2=',result);
     }
      return result;

    case DISABLE_MESSAGE:
      var result = Object.assign({}, state, {
        ...state,
        messageSlice: {
          ...state.messageSlice,
          show: false
        }
      });
//      console.log('result3=',result);
      return result;

//=============================================================================
// Model Reducers
//=============================================================================

    case INJECT:
//        console.log('start reducer inject', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        ...action.payload.store,
        enableDispatcher: false, // inject always sets enableDispatcher false
      });
      return result;

    case STARTUP:
//        console.log('reducers.STARTUP state=',state);
//        console.log('start reducer startup', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        }
      });
      return result;

    case LOAD:
//        console.log('start reducer load', 'state=', state, 'action=', action);
      var executePanelSlice = state.executePanelSlice;
      if (!state.executePanelSlice.stopOnFileLoad &&
          action.payload.model.type !== state.model.type) {
        executePanelSlice = {
          ...state.executePanelSlice,
          show: false,
          executeName: undefined, // Clear execute name
          prefix: '',
          states: [],
          step: 0,
          steps: [],
          stopOnFileLoad: true,
          testGenerate: false,
        };
      }
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          ...action.payload.model,
        }
      });
      return result;

   case LOAD_INITIAL_STATE:
//        console.log('start reducer loadInitialState', 'state=', state, 'action=', action);
      var module;
      if (action.payload.units === 'US') {
        module = require('../designtypes/' + action.payload.type + '/initialState.js'); // Dynamically load initialState
      } else {
        module = require('../designtypes/' + action.payload.type + '/initialState_metric_units.js'); // Dynamically load initialState
      }
      module = JSON.parse(JSON.stringify(module)); // Make deep clone
      var executePanelSlice = state.executePanelSlice;
      if (!state.executePanelSlice.stopOnFileLoad &&
          module.initialState.type !== state.model.type) {
        executePanelSlice = {
          ...state.executePanelSlice,
          show: false,
          executeName: undefined, // Clear execute name
          prefix: '',
          states: [],
          step: 0,
          steps: [],
          stopOnFileLoad: true,
          testGenerate: false,
        };
      }
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice,
        name: action.payload.units === 'US' ? 'initialState' : 'initialState_metric_units',
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          ...module.initialState,
          system_controls: initialSystemControls,
        }
      }); // Merge initialState and initialSystemControls
      return result;

   case CHANGE_NAME:
//        console.log('start reducer changeName', 'state=', state, 'action=', action);
      var result = Object.assign({}, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        },
        name: action.payload.name,
      });
      return result;

   case CHANGE_USER:
//        console.log('start reducer changeUser', 'state=', state, ',action.payload.user=', action.payload.user);
      var result = Object.assign({}, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        },
        user: action.payload.user,
      });
      return result;

   case CHANGE_VIEW:
//        console.log('start reducer changeView', 'state=', state, 'action=', action);
      var result = Object.assign({}, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        },
        view: action.payload.view,
      });
//        console.log('end reducer changeView', 'result=', result);
      return result;

// SYMBOL

   case CHANGE_SYMBOL_VALUE:
//        console.log('start reducer changeSymbolValue', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
//                if (element.name === 'Force_2')
//                  console.log('reducers.CHANGE_SYMBOL_VALUE element=',element.name,' old value=',element.value,' new value=',action.payload.value);
              var inner_result = Object.assign({}, element, {
                value: action.payload.value
              });
//              console.log('CHANGE_SYMBOL_VALUE', 'inner_result=', inner_result);
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case FIX_SYMBOL_VALUE:
//        console.log('start reducer fixSymbolValue', 'state=', state, 'action=', action);
      var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
      if (index < 0) {
        console.error('fixSymbolValue: Failed to find name in symbol_table.', 'name=', action.payload.name);
      }
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        }
      });
      return result;

   case FREE_SYMBOL_VALUE:
//        console.log('start reducer freeSymbolValue', 'state=', state, 'action=', action);
      var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
      if (index < 0) {
        console.error('freeSymbolValue: Failed to find name in symbol_table.', 'name=', action.payload.name);
      }
      var result = Object.assign({}, state, {
        ...state,
      });
      return result;

   case CHANGE_SYMBOL_VIOLATION:
//        console.log('start reducer changeSymbolViolation', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
              var inner_result;
              if (action.payload.minmax === MIN) {
                inner_result = Object.assign({}, element, {
                  vmin: action.payload.value
                });
              } else {
                inner_result = Object.assign({}, element, {
                  vmax: action.payload.value
                });
              }
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case CHANGE_SYMBOL_CONSTRAINT:
//        console.log('start reducer changeSymbolConstraint', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
              var inner_result;
              if (action.payload.minmax === MIN) {
                inner_result = Object.assign({}, element, {
                  cmin: action.payload.value,
                  smin: sclden(state.model.system_controls, element.value, action.payload.value, element.sdlim, element.lmin)
                });
              } else if (action.payload.minmax === MAX) {
                inner_result = Object.assign({}, element, {
                  cmax: action.payload.value,
                  smax: sclden(state.model.system_controls, element.value, action.payload.value, element.sdlim, element.lmax)
                });
              } else if (action.payload.minmax === VALID_MIN) {
                inner_result = Object.assign({}, element, {
                  validmin: action.payload.value,
                });
              } else if (action.payload.minmax === VALID_MAX) {
                inner_result = Object.assign({}, element, {
                  validmax: action.payload.value,
                });
              }
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case CHANGE_SYMBOL_CONSTRAINTS:
//        console.log('start reducer changeSymbolConstraints', 'state=', state, 'action=', action);
      var i = 0;
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
// Only do it from independent and dependent variables, but not for calculation inputs
            if (element.type === "equationset") {
              var value = action.payload.values[i++];
              if (value !== undefined) {
                var inner_result;
                if (action.payload.minmax === MIN) {
                  inner_result = Object.assign({}, element, {
                    cmin: value,
                    smin: sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmin)
                  });
                } else {
                  inner_result = Object.assign({}, element, {
                    cmax: value,
                    smax: sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmax)
                  });
                }
                return inner_result;
              } else {
                return element;
              }
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case SAVE_OUTPUT_SYMBOL_CONSTRAINTS:
//        console.log('start reducer saveOutputSymbolConstraints', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
//                console.log('reducers.SAVE_OUTPUT_SYMBOL_CONSTRAINTS state=',state,'action=', action);
//                console.log('reducers.SAVE_OUTPUT_SYMBOL_CONSTRAINTS',
//                            'element.lmin=',element.lmin,
//                            'element.cmin=',element.cmin,
//                            'element.lmax=',element.lmax,
//                            'element.cmax=',element.cmax);
              var inner_result = Object.assign({}, element, {
                lmin: 0,
                oldlmin: element.lmin,
                oldcmin: element.cmin,
                lmax: 0,
                oldlmax: element.lmax,
                oldcmax: element.cmax
              });
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS:
//        console.log('start reducer restoreOutputSymbolConstraints', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
//                console.log('reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS state=',state,'action=', action);
//                console.log('reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS',
//                            'element.oldlmin=',element.oldlmin,
//                            'element.oldcmin=',element.oldcmin,
//                            'element.oldlmax=',element.oldlmax,
//                            'element.oldcmax=',element.oldcmax);
              if (element.oldlmin !== undefined) { // Is there something to restore then restore them else just use the current values as-is
                var inner_result = Object.assign({}, element, { // Assign the locals
                  lmin: element.oldlmin,
                  cmin: element.oldcmin,
                  smin: sclden(state.model.system_controls, element.value, element.oldcmin, element.sdlim, element.oldlmin),
                  lmax: element.oldlmax,
                  cmax: element.oldcmax,
                  smax: sclden(state.model.system_controls, element.value, element.oldcmax, element.sdlim, element.oldlmax)
                });
                delete inner_result.oldlmin; // Delete the values
                delete inner_result.oldcmin;
                delete inner_result.oldlmax;
                delete inner_result.oldcmax;
                return inner_result;
              } else {
                throw new Error('In reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS, No old value exists for restore');
              }
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case SET_SYMBOL_FLAG:
//        console.log('start reducer setSymbolFlag', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
              var inner_result = Object.assign({}, element);
              if (action.payload.minmax === MIN) {
                inner_result.lmin = inner_result.lmin | action.payload.mask;
                if (action.payload.mask & FDCL && action.payload.source !== undefined) {
                  inner_result.cminchoice = inner_result.cminchoices.indexOf(action.payload.source);
                }
              } else {
                inner_result.lmax = inner_result.lmax | action.payload.mask;
                if (action.payload.mask & FDCL && action.payload.source !== undefined) {
                  inner_result.cmaxchoice = inner_result.cmaxchoices.indexOf(action.payload.source);
                }
              }
//                console.log('reducers.SET_SYMBOL_FLAG','element=',element,'inner_result=',inner_result);
              return inner_result;
            } else if (action.payload.source !== undefined && element.name === action.payload.source) {
              var inner_result = Object.assign({}, element);
              if (action.payload.mask & FDCL) {
                if (inner_result.propagate === undefined || inner_result.propagate.length === 0) {
                  inner_result.propagate = [{ name: action.payload.name, minmax: action.payload.minmax }];
                } else {
                  var index = inner_result.propagate.findIndex(i => i.name === action.payload.name && i.minmax === action.payload.minmax);
                  if (index === -1) { // If not found in propagate array then add it
                    inner_result.propagate.push({ name: action.payload.name, minmax: action.payload.minmax });
                  }
                }
              }
//                console.log('reducers.SET_SYMBOL_FLAG','element=',element,'inner_result=',inner_result);
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case RESET_SYMBOL_FLAG:
//        console.log('start reducer resetSymbolFlag', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            var index;
            if (element.name === action.payload.name) {
              var inner_result = Object.assign({}, element);
              if (action.payload.minmax === MIN) {
                inner_result.lmin = inner_result.lmin & (~action.payload.mask);
                if (action.payload.mask & FDCL) {
                  delete inner_result.cminchoice;
                }
              } else {
                inner_result.lmax = inner_result.lmax & (~action.payload.mask);
                if (action.payload.mask & FDCL) {
                  delete inner_result.cmaxchoice;
                }
              }
//                console.log('reducers.RESET_SYMBOL_FLAG ','element=',element,'inner_result=',inner_result);
              return inner_result;
            } else if ((action.payload.mask & FDCL) && (element.propagate !== undefined) && (index = element.propagate.findIndex(i => i.name === action.payload.name && i.minmax === action.payload.minmax)) !== -1) {
              var inner_result = Object.assign({}, element);
              inner_result.propagate = Object.assign([], element.propagate);
              inner_result.propagate.splice(index, 1); // Delete 1 entry at offset index
              if (inner_result.propagate.length === 0) {
                inner_result.propagate = undefined; // De-reference the array
                delete inner_result.propagate; // Delete the property
              }
//                console.log('reducers.RESET_SYMBOL_FLAG ','element=',element,'index=',index,'inner_result=',inner_result);
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case CHANGE_SYMBOL_INPUT:
//        console.log('start reducer changeSymbolInput', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
//                console.log('reducers.CHANGE_SYMBOL_INPUT element=',element.name,' old value=',element.input,' new value=',action.payload.value);
              var inner_result = Object.assign({}, element, {
                input: action.payload.value
              });
              return inner_result;
            }
            return element;
          }),
        }
      });
      return result;

   case CHANGE_SYMBOL_HIDDEN:
//        console.log('start reducer changeSymbolHidden', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
//                console.log('reducers.CHANGE_SYMBOL_HIDDEN element=',element.name,' old value=',element.hidden,' new value=',action.payload.value);
              var inner_result = Object.assign({}, element, {
                hidden: action.payload.value
              });
              return inner_result;
            }
            return element;
          }),
        }
      });
      return result;

  case CHANGE_SYMBOL_FORMAT:
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
              if (action.payload.value !== 'table') {
                var { format, ...rest } = element;
//                console.log('CHANGE_SYMBOL_FORMAT','rest=',rest);
                return rest;
              } else {
                var inner_result = Object.assign({}, element, {
                  format: 'table'
                });
//                console.log('CHANGE_SYMBOL_FORMAT','inner_result=',inner_result);
                return inner_result;
              }
            }
            return element;
          }),
        }
      });
//      console.log('CHANGE_SYMBOL_FORMAT','action=',action,'result=',result);
      return result;

// INPUT SYMBOL

    case CHANGE_INPUT_SYMBOL_VALUES:
//        console.log('start reducer changeInputSymbolValues', 'state=', state, 'action=', action);
      var i = 0;
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.type === "equationset" && element.input) {
              var value = action.payload.values[i++]
              if (value !== undefined) {
                var inner_result = Object.assign({}, element, {
                  value: value
                });
                return inner_result;
              } else {
                return element;
              }
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case SAVE_INPUT_SYMBOL_VALUES:
//        console.log('start reducer saveInputSymbolValues', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.type === "equationset" && element.input) {
//                if (element.name === "Wire_Dia")
//                  console.log('reducers.SAVE_INPUT_SYMBOL_VALUES element=',element);
              var inner_result = Object.assign({}, element, {
                oldvalue: element.value
              });
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case RESTORE_INPUT_SYMBOL_VALUES:
//        console.log('start reducer restoreInputSymbolValues', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.type === "equationset" && element.input) {
              if (element.oldvalue !== undefined) {
//                  if (element.name === "Wire_Dia")
//                    console.log('reducers.RESTORE_INPUT_SYMBOL_VALUES oldvalue==defined element=',element);
                var inner_result = Object.assign({}, element, { // Assign the local
                  value: element.oldvalue
                });
                delete inner_result.oldvalue; // Delete the value
                return inner_result;
              } else {
//                  if (element.name === "Wire_Dia")
//                    console.log('reducers.RESTORE_INPUT_SYMBOL_VALUES oldvalue==undefined element=',element);
                return element;
              }
            } else {
              return element;
            }
          }),
        }
      });
      return result;

   case SAVE_SYMBOL_VALUE:
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name) {
              var inner_result = Object.assign({}, element, { oldvalue: element.value });
//              console.log('SAVE_SYMBOL_VALUE','inner_result=',inner_result);
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
//      console.log('SAVE_SYMBOL_VALUE','action=',action,'result=',result);
      return result;

   case RESTORE_SYMBOL_VALUE:
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if (element.name === action.payload.name && element.oldvalue !== undefined) {
              var inner_result = Object.assign({}, element, { value: element.oldvalue });
              delete inner_result.oldvalue;
//              console.log('RESTORE_SYMBOL_VALUE','inner_result=',inner_result);
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
//      console.log('RESTORE_SYMBOL_VALUE','action=',action,'result=',result);
      return result;

// OUTPUT SYMBOL

    case CHANGE_OUTPUT_SYMBOL_VALUES:
//        console.log('start reducer changeOutputSymbolValues', 'state=', state, 'action=', action);
      var i = 0;
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          symbol_table: state.model.symbol_table.map((element) => {
            if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
              var value = action.payload.values[i++]
              if (value !== undefined) {
//                if (element.name === "Prop_Calc_Method")
//                  console.log('reducers.CHANGE_OUTPUT_SYMBOL_VALUES i=',i-1,' element=',element.name,' old value=',element.value,' new value=',value);
                var inner_result = Object.assign({}, element, {
                  value: value
                });
                return inner_result;
              } else {
                return element;
              }
            } else {
              return element;
            }
          }),
        }
      });
      return result;

// RESULT

   case CHANGE_RESULT_OBJECTIVE_VALUE:
//        console.log('start reducer changeResultObjectiveValue', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: '',
            objective_value: action.payload.objective_value,
          }
        }
      });
      return result;

   case CHANGE_RESULT_TERMINATION_CONDITION:
//        console.log('start reducer changeResultTerminationCondition', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: action.payload.termination_condition
          }
        }
      });
      return result;

   case CHANGE_RESULT_SEARCH_COMPLETED:
//        console.log('start reducer changeResultSearchCompleted', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: '',
            search_completed: action.payload.search_completed,
          }
        }
      });
      return result;

// SYSTEM CONTROL

    case CHANGE_SYSTEM_CONTROLS_VALUE:
//        console.log('start reducer changeSystemControlsValue', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          system_controls: {
            ...state.model.system_controls,
            ioopt: {
               ...state.model.system_controls.ioopt,
               value: action.payload.system_controls.ioopt
            },
            maxit: {
               ...state.model.system_controls.maxit,
               value: action.payload.system_controls.maxit
            },
            weapon: {
               ...state.model.system_controls.weapon,
               value: action.payload.system_controls.weapon
            },
            nmerit: {
               ...state.model.system_controls.nmerit,
               value: action.payload.system_controls.nmerit
            },
            fix_wt: {
               ...state.model.system_controls.fix_wt,
               value: action.payload.system_controls.fix_wt
            },
            con_wt: {
               ...state.model.system_controls.con_wt,
               value: action.payload.system_controls.con_wt
            },
            zero_wt: {
               ...state.model.system_controls.zero_wt,
               value: action.payload.system_controls.zero_wt
            },
            viol_wt: {
               ...state.model.system_controls.viol_wt,
               value: action.payload.system_controls.viol_wt
            },
            mfn_wt: {
               ...state.model.system_controls.mfn_wt,
               value: action.payload.system_controls.mfn_wt
            },
            objmin: {
               ...state.model.system_controls.objmin,
               value: action.payload.system_controls.maxit
            },
            del: {
               ...state.model.system_controls.del,
               value: action.payload.system_controls.del
            },
            delmin: {
               ...state.model.system_controls.delmin,
               value: action.payload.system_controls.delmin
            },
            tol: {
               ...state.model.system_controls.tol,
               value: action.payload.system_controls.tol
            },
            smallnum: {
               ...state.model.system_controls.smallnum,
               value: action.payload.system_controls.smallnum
            },
            show_units: {
               ...state.model.system_controls.show_units,
               value: action.payload.system_controls.show_units
            },
            show_violations: {
               ...state.model.system_controls.show_violations,
               value: action.payload.system_controls.show_violations
            },
            enable_auto_fix: {
               ...state.model.system_controls.enable_auto_fix,
               value: action.payload.system_controls.enable_auto_fix
            },
            enable_auto_search: {
               ...state.model.system_controls.enable_auto_search,
               value: action.payload.system_controls.enable_auto_search
            },
          }
        }
      });
      return result;

// LABELS

    case CHANGE_LABELS_VALUE:
//        console.log('start reducer changeLabelsValue', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          labels: state.model.labels.map((element) => {
            let i = action.payload.labels.findIndex(label => element.name === label.name)
            if (i !== -1) {
              var inner_result = Object.assign({}, element, {
                value: action.payload.labels[i].value
              });
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;

    case SEARCH:
//      console.log('start reducer SEARCH', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        }
      });
      return result;

   case SEEK:
//        console.log('start reducer seek', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        }
      });
      return result;

// AUTO_SAVE

   case SAVE_AUTO_SAVE:
//        console.log('start reducer saveAutoSave', 'state=', state, 'action=', action);
//        console.log('in reducer saveAutoSave', 'state.user=', state.user, 'state.name=', state.name, 'state.view=', state.view, 'state.model.type=', state.model.type);
      if (typeof (Storage) !== "undefined") {
        localStorage.setItem(action.payload.name, JSON.stringify(state), null, 2); // create or replace auto save file with current state contents
//          console.log('reducers.SAVE_AUTO_SAVE action.payload.name=',action.payload.name,'state=',state);
      }
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        }
      });
//        console.log('end reducer saveAutoSave', 'state=', state, 'action=', action, 'result=', result);
      return result;

   case RESTORE_AUTO_SAVE:
//      console.log('start reducer restoreAutoSave', 'state=', state, 'action=', action);
      var result;
      if (typeof (Storage) !== "undefined") {
        var autosave = JSON.parse(localStorage.getItem(action.payload.name)); // get auto save file contents
//        console.log('reducers.RESTORE_AUTO_SAVE autosave=',autosave);
// Migrate autosave file from old (no model property) to new (with model property)
        if (autosave.model === undefined) { // Is it the old format
          var name = autosave.name;
//          console.log('reducers.RESTORE_AUTO_SAVE name=',name);
          delete autosave.name;
          result = Object.assign({}, state, {
            ...state,
            name: name,
            model: autosave
          });
        } else {
          result = Object.assign({}, state, autosave); // New format
        }
//        console.log('reducers.RESTORE_AUTO_SAVE result1=',result);
        var { migrate } = require('../designtypes/' + result.model.type + '/migrate.js'); // Dynamically load migrate
        result = Object.assign({}, result, {
          ...result,
          model: migrate(result.model),
        });
//        console.log('reducers.RESTORE_AUTO_SAVE result2=',result);
//          console.log('reducers.RESTORE_AUTO_SAVE action.payload.name=',action.payload.name,'state=',state);
      }
      result = Object.assign({}, result, {
        ...result,
        model: {
          ...result.model,
          result: {
            ...result.model.result,
            termination_condition: ''
          }
        }
      });
//        console.log('reducers.RESTORE_AUTO_SAVE result3=',result);
//        console.log('end reducer restoreAutoSave', 'state=', state, 'action=', action, 'result=', result);
      return result;

   case DELETE_AUTO_SAVE:
//        console.log('start reducer deleteAutoSave', 'state=', state, 'action=', action);
      if (typeof (Storage) !== "undefined") {
        localStorage.removeItem(action.payload.name); // remove auto save file
//          console.log('reducers.DELETE_AUTO_SAVE action.payload.name=',action.payload.name,'state=',state);
      }
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        }
      });
//        console.log('end reducer deleteAutoSave', 'state=', state, 'action=', action, 'result=', result);
      return result;

    case LOG_USAGE:
//        console.log('start reducer logUsage', 'state=', state, 'action=', action);
      log(action.payload.tag, action.payload.action, action.payload.note); // log is alias of logUsage
      var result = Object.assign({}, state, {
        ...state,
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        }
      });
      return result;

    case ENABLE_DISPATCHER:
      var result = Object.assign({}, state, {
        ...state,
        enableDispatcher: action.payload.value
      })
      return result;

//=============================================================================
// Spinner Reducers
//=============================================================================

    case ENABLE_SPINNER:
//      console.log('start reducer ENABLE_SPINNER', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        spinnerSlice: {
          ...state.spinnerSlice,
          show: true
        }
      });
      return result;

    case DISABLE_SPINNER:
//      console.log('start reducer DISABLE_SPINNER', 'state=', state, 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        spinnerSlice: {
          ...state.spinnerSlice,
          show: false
        }
      });
      return result;

//=============================================================================
// Otherwise...
//=============================================================================

    default:
      return state;
  }
}
