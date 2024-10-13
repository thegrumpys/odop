import {
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

  CHANGE_INPUT_SYMBOL_VALUES,
  SAVE_INPUT_SYMBOL_VALUES,
  RESTORE_INPUT_SYMBOL_VALUES,

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
  ENABLE_DISPATCHER
} from './modelTypes';
import { VALID_MIN, VALID_MAX, MIN, MAX, FDCL } from './actionTypes';
import { sclden } from './middleware/sclden';
import { initialSystemControls } from '../initialSystemControls';

export default function modelReducers(state = {}, action) {
  var i;
  var value;
  var name;

  //    console.warn('In reducers state=',state,'action=', action);
  //    if (action.payload === undefined || action.payload.name === undefined) {
  //        console.log('<li>','In reducers action=', action.type,'</li>');
  //    } else {
  //        console.log('<li>','In reducers action=', action.type,'action.payload.name=',action.payload.name,'</li>');
  //    }

  switch (action.type) {
    case INJECT:
      //        console.log('start reducer inject', 'state=', current(state), 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
        ...action.payload.store,
        enableDispatcher: false, // inject always sets enableDispatcher false
      });
      return result;
    case STARTUP:
      //        console.log('In reducers.STARTUP state=',state);
      //        console.log('start reducer startup', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer load', 'state=', current(state), 'action=', action);
      var result = Object.assign({}, state, {
        ...state,
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
      //        console.log('start reducer loadInitialState', 'state=', current(state), 'action=', action);
      var module;
      if (action.payload.units === 'US') {
        module = require('../designtypes/' + action.payload.type + '/initialState.js'); // Dynamically load initialState
      } else {
        module = require('../designtypes/' + action.payload.type + '/initialState_metric_units.js'); // Dynamically load initialState
      }
      module = JSON.parse(JSON.stringify(module)); // Make deep clone
      var result = Object.assign({}, state, {
        ...state,
        name: action.payload.units === 'US' ? 'initialState' : 'initialState_metric_units',
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          },
          ...module.initialState,
          system_controls: initialSystemControls,
        },
      }); // Merge initialState and initialSystemControls
      return result;
    case CHANGE_NAME:
      //        console.log('start reducer changeName', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer changeUser', 'state=', current(state), ',action.payload.user=', action.payload.user);
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
      //        console.log('start reducer changeView', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer changeSymbolValue', 'state=', current(state), 'action=', action);
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
              //                  console.log('In reducers.CHANGE_SYMBOL_VALUE element=',element.name,' old value=',element.value,' new value=',action.payload.value);
              var inner_result = Object.assign({}, element, {
                value: action.payload.value
              });
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;
    case FIX_SYMBOL_VALUE:
      //        console.log('start reducer fixSymbolValue', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer freeSymbolValue', 'state=', current(state), 'action=', action);
      var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
      if (index < 0) {
        console.error('freeSymbolValue: Failed to find name in symbol_table.', 'name=', action.payload.name);
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
    case CHANGE_SYMBOL_VIOLATION:
      //        console.log('start reducer changeSymbolViolation', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer changeSymbolConstraint', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer changeSymbolConstraints', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer saveOutputSymbolConstraints', 'state=', current(state), 'action=', action);
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
              //                console.log('In reducers.SAVE_OUTPUT_SYMBOL_CONSTRAINTS state=',state,'action=', action);
              //                console.log('In reducers.SAVE_OUTPUT_SYMBOL_CONSTRAINTS',
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
      //        console.log('start reducer restoreOutputSymbolConstraints', 'state=', current(state), 'action=', action);
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
              //                console.log('In reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS state=',state,'action=', action);
              //                console.log('In reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS',
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
      //        console.log('start reducer setSymbolFlag', 'state=', current(state), 'action=', action);
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
              //                console.log('In reducers.SET_SYMBOL_FLAG','element=',element,'inner_result=',inner_result);
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
              //                console.log('In reducers.SET_SYMBOL_FLAG','element=',element,'inner_result=',inner_result);
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;
    case RESET_SYMBOL_FLAG:
      //        console.log('start reducer resetSymbolFlag', 'state=', current(state), 'action=', action);
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
              //                console.log('In reducers.RESET_SYMBOL_FLAG ','element=',element,'inner_result=',inner_result);
              return inner_result;
            } else if ((action.payload.mask & FDCL) && (element.propagate !== undefined) && (index = element.propagate.findIndex(i => i.name === action.payload.name && i.minmax === action.payload.minmax)) !== -1) {
              var inner_result = Object.assign({}, element);
              inner_result.propagate = Object.assign([], element.propagate);
              inner_result.propagate.splice(index, 1); // Delete 1 entry at offset index
              if (inner_result.propagate.length === 0) {
                inner_result.propagate = undefined; // De-reference the array
                delete inner_result.propagate; // Delete the property
              }
              //                console.log('In reducers.RESET_SYMBOL_FLAG ','element=',element,'index=',index,'inner_result=',inner_result);
              return inner_result;
            } else {
              return element;
            }
          }),
        }
      });
      return result;
    case CHANGE_SYMBOL_INPUT:
      //        console.log('start reducer changeSymbolInput', 'state=', current(state), 'action=', action);
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
              //                console.log('In reducers.CHANGE_SYMBOL_INPUT element=',element.name,' old value=',element.input,' new value=',action.payload.value);
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
      //        console.log('start reducer changeSymbolHidden', 'state=', current(state), 'action=', action);
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
              //                console.log('In reducers.CHANGE_SYMBOL_HIDDEN element=',element.name,' old value=',element.hidden,' new value=',action.payload.value);
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

    // INPUT SYMBOL

    case CHANGE_INPUT_SYMBOL_VALUES:
      //        console.log('start reducer changeInputSymbolValues', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer saveInputSymbolValues', 'state=', current(state), 'action=', action);
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
              //                  console.log('In reducers.SAVE_INPUT_SYMBOL_VALUES element=',element);
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
      //        console.log('start reducer restoreInputSymbolValues', 'state=', current(state), 'action=', action);
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
                //                    console.log('In reducers.RESTORE_INPUT_SYMBOL_VALUES oldvalue==defined element=',element);
                var inner_result = Object.assign({}, element, { // Assign the local
                  value: element.oldvalue
                });
                delete inner_result.oldvalue; // Delete the value
                return inner_result;
              } else {
                //                  if (element.name === "Wire_Dia")
                //                    console.log('In reducers.RESTORE_INPUT_SYMBOL_VALUES oldvalue==undefined element=',element);
                return element;
              }
            } else {
              return element;
            }
          }),
        }
      });
      return result;

    // OUTPUT SYMBOL

    case CHANGE_OUTPUT_SYMBOL_VALUES:
      //        console.log('start reducer changeOutputSymbolValues', 'state=', current(state), 'action=', action);
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
                //                  console.log('In reducers.CHANGE_OUTPUT_SYMBOL_VALUES i=',i-1,' element=',element.name,' old value=',element.value,' new value=',value);
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
      //        console.log('start reducer changeResultObjectiveValue', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer changeResultTerminationCondition', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer changeResultSearchCompleted', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer changeSystemControlsValue', 'state=', current(state), 'action=', action);
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
            ...action.payload.system_controls
          },
        }
      });
      return result;

    // LABELS

    case CHANGE_LABELS_VALUE:
      //        console.log('start reducer changeLabelsValue', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer search', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer seek', 'state=', current(state), 'action=', action);
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
      //        console.log('start reducer saveAutoSave', 'state=', current(state), 'action=', action);
      //        console.log('in reducer saveAutoSave', 'state.user=', current(state).user, 'state.name=', current(state).name, 'state.view=', current(state).view, 'state.model.type=', current(state).model.type);
      if (typeof (Storage) !== "undefined") {
        localStorage.setItem(action.payload.name, JSON.stringify(state), null, 2); // create or replace auto save file with current state contents
        //          console.log('In reducers.SAVE_AUTO_SAVE action.payload.name=',action.payload.name,'state=',current(state));
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
      //        console.log('end reducer saveAutoSave', 'state=', current(state), 'action=', action, 'result=', result);
      return result;
    case RESTORE_AUTO_SAVE:
      //        console.log('start reducer restoreAutoSave', 'state=', current(state), 'action=', action);
      var result;
      if (typeof (Storage) !== "undefined") {
        var autosave = JSON.parse(localStorage.getItem(action.payload.name)); // get auto save file contents
        //          console.log('In reducers.RESTORE_AUTO_SAVE autosave=',autosave);
        // Migrate autosave file from old (no model property) to new (with model property)
        if (autosave.model === undefined) { // Is it the old format
          var name = autosave.name;
          delete autosave.name;
          result = Object.assign({}, state, {
            ...state,
            name: name,
            model: autosave
          });
        } else {
          result = Object.assign({}, state, autosave); // New format
        }
        var { migrate } = require('../designtypes/' + result.model.type + '/migrate.js'); // Dynamically load migrate
        result = Object.assign({}, result, {
          ...result,
          model: migrate(result.model),
        });
        //          console.log('In reducers.RESTORE_AUTO_SAVE action.payload.name=',action.payload.name,'state=',state);
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
      //        console.log('end reducer restoreAutoSave', 'state=', current(state), 'action=', action, 'result=', result);
      return result;
    case DELETE_AUTO_SAVE:
      //        console.log('start reducer deleteAutoSave', 'state=', current(state), 'action=', action);
      if (typeof (Storage) !== "undefined") {
        localStorage.removeItem(action.payload.name); // remove auto save file
        //          console.log('In reducers.DELETE_AUTO_SAVE action.payload.name=',action.payload.name,'state=',state);
      }
      var result = Object.assign({}, state, {
        model: {
          ...state.model,
          result: {
            ...state.model.result,
            termination_condition: ''
          }
        }
      });
      //        console.log('end reducer deleteAutoSave', 'state=', current(state), 'action=', action, 'result=', result);
      return result;

    case LOG_USAGE:
      //        console.log('start reducer logUsage', 'state=', current(state), 'action=', action);
      log(action.payload.tag, action.payload.action, action.payload.note); // log is alias of logUsage
      var result = Object.assign({}, state, {
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
         enableDispatcher: action.payload.flag
      })
      return result;

    default:
      return state;
  }
}