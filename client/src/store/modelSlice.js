import { MIN, MAX, VALID_MIN, VALID_MAX, FDCL } from './actionTypes';
import { createSlice, current } from "@reduxjs/toolkit";
import { initialSystemControls } from '../initialSystemControls';
import config from '../config';
import { sclden } from './middleware/sclden';

export const modelSlice = createSlice({
  name: "modelSlice",
  initialState: {
    user: null,
    name: config.url.name,
    view: config.url.view,
    model: {
      symbol_table: [],
      type: null,
      result: {
        objective_value: 0,
        termination_condition: ''
      },
      system_controls: initialSystemControls
    }
  },
  reducers: {

    startup: {
      reducer: (state, action) => {
//        console.log('start reducer startup', 'state=', current(state), ',action=', action);
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
      }
    },

    load: {
      reducer: (state, action) => {
//        console.log('start reducer load', 'state=', current(state), ',action=', action);
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
      },
      prepare: (model) => { return { payload: { model } } }
    },

    loadInitialState: {
      reducer: (state, action) => {
//        console.log('start reducer loadInitialState', 'state=', current(state), ',action=', action);
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
      },
      prepare: (type, units = 'US') => { return { payload: { type, units } } }
    },

    changeName: {
      reducer: (state, action) => {
//        console.log('start reducer changeName', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name) => { return { payload: { name } } }
    },

    changeUser: {
      reducer: (state, action) => {
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
      },
      prepare: (user) => { return { payload: { user } } }
    },

    changeView: {
      reducer: (state, action) => {
//        console.log('start reducer changeView', 'state=', current(state), ',action=', action);
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
        return result;
      },
      prepare: (view) => { return { payload: { view } } }
    },

    changeSymbolValue: {
      reducer: (state, action) => {
//        console.log('start reducer changeSymbolValue', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name, value, merit) => { return { payload: { name, value, merit } } }
    },

    fixSymbolValue: {
      reducer: (state, action) => {
//        console.log('start reducer fixSymbolValue', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    freeSymbolValue: {
      reducer: (state, action) => {
//        console.log('start reducer freeSymbolValue', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    changeSymbolViolation: {
      reducer: (state, action) => {
//        console.log('start reducer changeSymbolViolation', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name, minmax, value) => { return { payload: { name, minmax, value } } }
    },

    changeSymbolConstraint: {
      reducer: (state, action) => {
//        console.log('start reducer changeSymbolConstraint', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name, minmax, value) => { return { payload: { name, minmax, value } } }
    },

    changeSymbolConstraints: {
      reducer: (state, action) => {
//        console.log('start reducer changeSymbolConstraints', 'state=', current(state), ',action=', action);
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
      },
      prepare: (values, minmax) => { return { payload: { values, minmax } } }
    },

    saveOutputSymbolConstraints: {
      reducer: (state, action) => {
//        console.log('start reducer saveOutputSymbolConstraints', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name) => { return { payload: { name } } }
    },

    restoreOutputSymbolConstraints: {
      reducer: (state, action) => {
//        console.log('start reducer restoreOutputSymbolConstraints', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name) => { return { payload: { name } } }
    },

    setSymbolFlag: {
      reducer: (state, action) => {
//        console.log('start reducer setSymbolFlag', 'state=', current(state), ',action=', action);
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
//                console.log('In reducers.SET_SYMBOL_FLAG state=',state,'action=', action);
                var inner_result;
                if (action.payload.minmax === MIN) {
                  inner_result = { lmin: element.lmin | action.payload.mask };
                } else {
                  inner_result = { lmax: element.lmax | action.payload.mask };
                }
                inner_result = Object.assign({}, element, inner_result);
//                console.log('In reducers.SET_SYMBOL_FLAG ','action=', action,'element=',element,'update=',update,'result=',result);
                return inner_result;
              } else {
                return element;
	              }
            }),
          }
        });
        return result;
      },
      prepare: (name, minmax, mask, source = undefined) => { return { payload: { name, minmax, mask, source } } }
    },

    resetSymbolFlag: {
      reducer: (state, action) => {
//        console.log('start reducer resetSymbolFlag', 'state=', current(state), ',action=', action);
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
                console.log('In reducers.RESET_SYMBOL_FLAG state=',state,'action=', action);
                var inner_result;
                if (action.payload.minmax === MIN) {
                  inner_result = { lmin: element.lmin & (~action.payload.mask) };
                } else {
                  inner_result = { lmax: element.lmax & (~action.payload.mask) };
                }
                inner_result = Object.assign({}, element, inner_result);
                console.log('In reducers.RESET_SYMBOL_FLAG ','action=', action,'element=',element,'update=',inner_result,'result=',inner_result);
                return result;
              }
              return element;
            }),
          }
        });
        return result;
      },
      prepare: (name, minmax, mask) => { return { payload: { name, minmax, mask } } }
    },

    changeSymbolInput: {
      reducer: (state, action) => {
//        console.log('start reducer changeSymbolInput', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    changeSymbolHidden: {
      reducer: (state, action) => {
//        console.log('start reducer changeSymbolHidden', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    changeInputSymbolValues: {
      reducer: (state, action) => {
//        console.log('start reducer changeInputSymbolValues', 'state=', current(state), ',action=', action);
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
      },
      prepare: (values, merit) => { return { payload: { values, merit } } }
    },

    saveInputSymbolValues: {
      reducer: (state, action) => {
//        console.log('start reducer saveInputSymbolValues', 'state=', current(state), ',action=', action);
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
      }
    },

    restoreInputSymbolValues: {
      reducer: (state, action) => {
//        console.log('start reducer restoreInputSymbolValues', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name) => { return { payload: { name } } }
    },

    changeOutputSymbolValues: {
      reducer: (state, action) => {
//        console.log('start reducer changeOutputSymbolValues', 'state=', current(state), ',action=', action);
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
      },
      prepare: (values) => { return { payload: { values } } }
    },

    changeResultObjectiveValue: {
      reducer: (state, action) => {
//        console.log('start reducer changeResultObjectiveValue', 'state=', current(state), ',action=', action);
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
      },
      prepare: (objective_value) => { return { payload: { objective_value } } }
    },

    changeResultTerminationCondition: {
      reducer: (state, action) => {
//        console.log('start reducer changeResultTerminationCondition', 'state=', current(state), ',action=', action);
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
      },
      prepare: (termination_condition) => { return { payload: { termination_condition } } }
    },

    changeResultSearchCompleted: {
      reducer: (state, action) => {
//        console.log('start reducer changeResultSearchCompleted', 'state=', current(state), ',action=', action);
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
      },
      prepare: (search_completed = false) => { return { payload: { search_completed } } }
    },

    changeSystemControlsValue: {
      reducer: (state, action) => {
//        console.log('start reducer changeSystemControlsValue', 'state=', current(state), ',action=', action);
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
      },
      prepare: (system_controls) => { return { payload: { system_controls } } }
    },

    changeLabelsValue: {
      reducer: (state, action) => {
//        console.log('start reducer changeLabelsValue', 'state=', current(state), ',action=', action);
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
      },
      prepare: (labels) => { return { payload: { labels } } }
    },

    search: {
      reducer: (state, action) => {
//        console.log('start reducer search', 'state=', current(state), ',action=', action);
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
      }
    },

    seek: {
      reducer: (state, action) => {
//        console.log('start reducer seek', 'state=', current(state), ',action=', action);
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
      },
      prepare: (name, minmax) => { return { payload: { name, minmax } } }
    },

    saveAutoSave: {
      reducer: (state, action) => {
//        console.log('start reducer saveAutoSave', 'state=', current(state), ',action=', action);
//        console.log('in reducer saveAutoSave', 'state.user=', current(state).user, 'state.name=', current(state).name, 'state.view=', current(state).view, 'state.model.type=', current(state).model.type);
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem(action.payload.name, JSON.stringify(state), null, 2); // create or replace auto save file with current state contents
//          console.log('In reducers.SAVE_AUTO_SAVE action.payload.name=',action.payload.name,'state=',state);
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
      },
      prepare: (name = 'autosave') => { return { payload: { name } } }
    },

    restoreAutoSave: {
      reducer: (state, action) => {
//        console.log('start reducer restoreAutoSave', 'state=', current(state), ',action=', action);
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
          var { migrate } = require('../designtypes/' + state.model.type + '/migrate.js'); // Dynamically load migrate
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
        return result;
      },
      prepare: (name = 'autosave') => { return { payload: { name } } }
    },

    deleteAutoSave: {
      reducer: (state, action) => {
//        console.log('start reducer deleteAutoSave', 'state=', current(state), ',action=', action);
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
        return result;
      },
      prepare: (name = 'autosave') => { return { payload: { name } } }
    },

    logUsage: {
      reducer: (state, action) => {
//        console.log('start reducer logUsage', 'state=', current(state), ',action=', action);
        logUsage(action.payload.tag, action.payload.action, action.payload.note)
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
      },
      prepare: (tag, action, note) => { return { payload: { tag, action, note } } }
    }
  }
});

export const {
  startup,
  load,
  loadInitialState,
  changeName,
  changeUser,
  changeView,
  changeSymbolValue,
  changeIndexValue,
  fixSymbolValue,
  freeSymbolValue,
  changeSymbolViolation,
  changeSymbolConstraint,
  changeSymbolConstraints,
  setSymbolFlag,
  resetSymbolFlag,
  changeSymbolInput,
  changeSymbolHidden,
  changeInputSymbolValues,
  saveInputSymbolValues,
  restoreInputSymbolValues,
  changeOutputSymbolValues,
  saveOutputSymbolConstraints,
  restoreOutputSymbolConstraints,
  changeResultObjectiveValue,
  changeResultTerminationCondition,
  changeResultSearchCompleted,
  changeSystemControlsValue,
  changeLabelsValue,
  search,
  seek,
  saveAutoSave,
  restoreAutoSave,
  deleteAutoSave,
  logUsage
} = modelSlice.actions;

export default modelSlice.reducer;
