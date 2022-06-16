import { STARTUP,
    LOAD,
    LOAD_INITIAL_STATE,
    CHANGE_NAME,
    CHANGE_USER,
    CHANGE_VIEW,

    CHANGE_SYMBOL_VALUE,
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
    CHANGE_RESULT_VIOLATED_CONSTRAINT_COUNT,

    CHANGE_SYSTEM_CONTROLS_VALUE,
    CHANGE_LABELS_VALUE,
    
    SAVE_AUTO_SAVE,
    RESTORE_AUTO_SAVE,
    DELETE_AUTO_SAVE,

    LOG_USAGE,

    MIN } from './actionTypes';
import { sclden } from './middleware/sclden';
import { initialSystemControls } from '../initialSystemControls';
import { logUsage } from '../logUsage';

export function reducers(state, action) {
    var i;
    var value;
    var name;
    var element;

//    console.warn('In reducers state=',state,'action=', action);
//    if (action.payload === undefined || action.payload.name === undefined) {
//        console.log('<li>','In reducers action=', action.type,'</li>');
//    } else {
//        console.log('<li>','In reducers action=', action.type,'action.payload.name=',action.payload.name,'</li>');
//    }

    if (state.model.result !== undefined) {
        state.model.result.termination_condition = '';
    }

    switch (action.type) {
    case STARTUP:
        break;
    case LOAD:
        state = Object.assign({}, state, {
            ...action.payload.design
        });
        break;
    case LOAD_INITIAL_STATE:
        var module;
        if (action.payload.units === 'US') {
            module = require('../designtypes/'+action.payload.type+'/initialState.js'); // Dynamically load initialState
        } else {
            module = require('../designtypes/'+action.payload.type+'/initialState_metric_units.js'); // Dynamically load initialState
        }
        module = JSON.parse(JSON.stringify(module)); // Make deep clone
        state = Object.assign({}, state, {
            name: 'initialState',
            model: Object.assign({}, model.initialState, {
                system_controls: initialSystemControls
            })
        }); // Merge initialState and initialSystemControls
        break;
    case CHANGE_NAME:
        state = Object.assign({}, state, {
            name: action.payload.name
        });
        break;
    case CHANGE_USER:
        state = Object.assign({}, state, {
            user: action.payload.user
        });
        break;
    case CHANGE_VIEW:
        state = Object.assign({}, state, {
            view: action.payload.view
        });
        break;

// SYMBOL

    case CHANGE_SYMBOL_VALUE:
        element = state.model.symbol_table[action.payload.name];
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
               symbol_table: Object.assign({}, state.model.symbol_table, {
                    [action.payload.name]: Object.assign({}, element, {
                        value: action.payload.value
                    })
                })
            })
        });
        break;
    case CHANGE_SYMBOL_VIOLATION:
        element = state.model.symbol_table[action.payload.name];
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
               symbol_table: Object.assign({}, state.model.symbol_table, {
                    [action.payload.name]: Object.assign({}, element, {
                       ...(action.payload.minmax === MIN ? {
                           vmin: action.payload.value
                           } : {
                           vmax: action.payload.value })
                    })
                })
            })
        });
        break;
    case CHANGE_SYMBOL_CONSTRAINT:
        element = state.model.symbol_table[action.payload.name];
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
               symbol_table: Object.assign({}, state.model.symbol_table, {
                    [action.payload.name]: Object.assign({}, element, {
                       ...(action.payload.minmax === MIN ? {
                               cmin: action.payload.value,
                               smin: sclden(state.model.system_controls, state.model.symbol_table[action.payload.name].value, action.payload.value, state.model.symbol_table[action.payload.name].sdlim, state.model.symbol_table[action.payload.name].lmin)
                           } : {
                               cmax: action.payload.value,
                               smax: sclden(state.model.system_controls, state.model.symbol_table[action.payload.name].value, action.payload.value, state.model.symbol_table[action.payload.name].sdlim, state.model.symbol_table[action.payload.name].lmax)
                           })
                    })
                })
            })
        });
        break;
    case CHANGE_SYMBOL_CONSTRAINTS:
        i=0;
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    // Only do it from independent and dependent variables, but not for calculation inputs
                    if (element.type === "equationset") {
                        value = action.payload.values[i++];
                        if (value !== undefined) {
                            if (action.payload.minmax === MIN) {
                                return Object.assign({}, accum, {
                                    [name]: Object.assign({}, element, {
                                        cmin: value,
                                        smin: sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmin)
                                    })
                                });
                            } else {
                                return Object.assign({}, accum, {
                                    [name]: Object.assign({}, element, {
                                        cmax: value,
                                        smax: sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmax)
                                    })
                                });
                            }
                        } else {
                            return Object.assign({}, accum, { [name]: element });
                        }
                    } else {
                        return Object.assign({}, accum, { [name]: element });
                    }
                }, {})
            })
        });
        break;
    case SAVE_OUTPUT_SYMBOL_CONSTRAINTS:
        element = state.model.symbol_table[action.payload.name];
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
               symbol_table: Object.assign({}, state.model.symbol_table, {
                    [action.payload.name]: Object.assign({}, element, {
                       lmin: 0,
                       oldlmin: element.lmin,
                       oldcmin: element.cmin,
                       lmax: 0,
                       oldlmax: element.lmax,
                       oldcmax: element.cmax,
                    })
                })
            })
        });
        break;
    case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS:
        element = state.model.symbol_table[action.payload.name];
        if (element.oldlmin !== undefined) { // Is there something to restore then restore them else just use the current values as-is
            var lmin = element.oldlmin; // Get the values as locals
            var cmin = element.oldcmin;
            var lmax = element.oldlmax;
            var cmax = element.oldcmax;
            delete element.oldlmin; // Delete the values
            delete element.oldcmin;
            delete element.oldlmax;
            delete element.oldcmax;
            state = Object.assign({}, state, {
                model: Object.assign({}, state.model, {
                   symbol_table: Object.assign({}, state.model.symbol_table, {
                        [action.payload.name]: Object.assign({}, element, {
                           lmin: lmin,
                           cmin: cmin,
                           smin: sclden(state.model.system_controls, element.value, cmin, element.sdlim, lmin),
                           lmax: lmax,
                           cmax: cmax,
                           smax: sclden(state.model.system_controls, element.value, cmax, element.sdlim, lmax),
                        })
                    })
                })
            });
        } else {
            throw new Error('In reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS, No old value exists for restore');
        }
        break;
    case SET_SYMBOL_FLAG:
        element = state.model.symbol_table[action.payload.name];
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
               symbol_table: Object.assign({}, state.model.symbol_table, {
                    [action.payload.name]: Object.assign({}, element, {
                       ...(action.payload.minmax === MIN ? {
                           lmin: element.lmin | action.payload.mask
                           } : {
                           lmax: element.lmax | action.payload.mask
                           })
                    })
                })
            })
        });
        break;
    case RESET_SYMBOL_FLAG:
        element = state.model.symbol_table[action.payload.name];
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
               symbol_table: Object.assign({}, state.model.symbol_table, {
                    [action.payload.name]: Object.assign({}, element, {
                       ...(action.payload.minmax === MIN ? {
                           lmin: element.lmin & ~action.payload.mask
                           } : {
                           lmax: element.lmax & ~action.payload.mask
                           })
                    })
                })
            })
        });
        break;
    case CHANGE_SYMBOL_INPUT:
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
               symbol_table: Object.assign({}, state.model.symbol_table, {
                    [action.payload.name]: Object.assign({}, element, {
                        input: action.payload.value
                    })
                })
            })
        });
        break;
    case CHANGE_SYMBOL_HIDDEN:
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
               symbol_table: Object.assign({}, state.model.symbol_table, {
                    [action.payload.name]: Object.assign({}, element, {
                        hidden: action.payload.value
                    })
                })
            })
        });
        break;

// INPUT SYMBOL

    case CHANGE_INPUT_SYMBOL_VALUES:
        i=0;
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    // Only do it from independent and dependent variables, but not for calculation inputs
                    if (element.type === "equationset") {
                        value = action.payload.values[i++];
                        if (value !== undefined) {
                            return Object.assign({}, accum, {
                                [name]: Object.assign({}, element, {
                                    value: value
                                })
                            });
                        } else {
                            return Object.assign({}, accum, { [name]: element });
                        }
                    } else {
                        return Object.assign({}, accum, { [name]: element });
                    }
                }, {})
            })
        });
        break;
    case SAVE_INPUT_SYMBOL_VALUES:
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    if (element.type === "equationset" && element.input) {
                        return Object.assign({}, accum, {
                            [name]: Object.assign({}, element, {
                                oldvalue: element.value
                            })
                        });
                    } else {
                        return Object.assign({}, accum, { [name]: element });
                    }
                }, {})
            })
        });
        break;
    case RESTORE_INPUT_SYMBOL_VALUES:
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    if (element.type === "equationset" && element.input) {
                        if (element.oldvalue !== undefined) {
                            var value = element.oldvalue; // Get the value as local
                            delete element.oldvalue; // Delete the value
                            return Object.assign({}, accum, {
                                [name]: Object.assign({}, element, {
                                    value: value
                                })
                            });
                        } else {
                            return Object.assign({}, accum, { [name]: element });
                        }
                    } else {
                        return Object.assign({}, accum, { [name]: element });
                    }
                }, {})
            })
        });
        return state;

// OUTPUT SYMBOL

    case CHANGE_OUTPUT_SYMBOL_VALUES:
        i=0;
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
                        value = action.payload.values[i++];
                        if (value !== undefined) {
                            return Object.assign({}, accum, {
                                [name]: Object.assign({}, element, {
                                    value: value
                                })
                            });
                        } else {
                            return Object.assign({}, accum, { [name]: element });
                        }
                    } else {
                        return Object.assign({}, accum, { [name]: element });
                    }
                }, {})
            })
        });
        break;

// RESULT

    case CHANGE_RESULT_OBJECTIVE_VALUE:
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                result: Object.assign({}, state.model.result, {
                    objective_value: action.payload.objective_value
                })
            })
        });
        break;
    case CHANGE_RESULT_TERMINATION_CONDITION:
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                result: Object.assign({}, state.model.result, {
                    termination_condition: action.payload.termination_condition
                })
            })
        });
        break;
    case CHANGE_RESULT_VIOLATED_CONSTRAINT_COUNT:
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                result: Object.assign({}, state.model.result, {
                    violated_constraint_count: action.payload.violated_constraint_count
                })
            })
        });
        break;

// SYSTEM CONTROL

    case CHANGE_SYSTEM_CONTROLS_VALUE:
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                system_controls: Object.assign({}, state.model.system_controls, {
                    ...action.payload.system_controls
                })
            })
        });
        break;

// LABELS

    case CHANGE_LABELS_VALUE:
        state = Object.assign({}, state, {
            model: Object.assign({}, state.model, {
                labels: Object.assign({}, state.model.labels, {
                    ...action.payload.labels
                })
            })
        });
        break;

// AUTO_SAVE

    case SAVE_AUTO_SAVE:
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(action.payload.name, JSON.stringify(state), null, 2); // create or replace auto save file with current state contents
//            console.log("In reducers.SAVE_AUTO_SAVE action.payload.name=",action.payload.name,"state=",state);
        }
        break; // state not changed
    case RESTORE_AUTO_SAVE:
        if (typeof(Storage) !== "undefined") {
            var autosave = JSON.parse(localStorage.getItem(action.payload.name)); // get auto save file contents
//            console.log("In reducers.RESTORE_AUTO_SAVE autosave=",autosave);
            // Migrate autosave file from old (no model property) to new (with model property)
            if (autosave.model === undefined) { // Is it the old format
                name = autosave.name;
                delete autosave.name;
                state =Object.assign({}, state, {
                    name: name, 
                    model: autosave
                });
            } else {
                state = autosave; // New format
            }
            var { migrate } = require('../designtypes/'+state.model.type+'/migrate.js'); // Dynamically load migrate
            state = Object.assign({}, state, {
                model: migrate(state.model),
            });
//            console.log("In reducers.RESTORE_AUTO_SAVE action.payload.name=",action.payload.name,"state=",state);
        }
        break; // state changed
    case DELETE_AUTO_SAVE:
        if (typeof(Storage) !== "undefined") {
            localStorage.removeItem(action.payload.name); // remove auto save file
//            console.log("In reducers.DELETE_AUTO_SAVE action.payload.name=",action.payload.name,"state=",state);
        }
        break; // state not changed

    case LOG_USAGE:
        logUsage(action.payload.tag, action.payload.action, action.payload.note)
        break; // state not changed

    default:
        break;
    }
//    console.log('In reducers state=',state);
    return state;
}