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
        return state;
    case LOAD:
        state = {
            ...state,
            ...action.payload.design
        };
        return state;
    case LOAD_INITIAL_STATE:
        var module;
        if (action.payload.units === 'US') {
            module = require('../designtypes/'+action.payload.type+'/initialState.js'); // Dynamically load initialState
        } else {
            module = require('../designtypes/'+action.payload.type+'/initialState_metric_units.js'); // Dynamically load initialState
        }
        module = JSON.parse(JSON.stringify(module)); // Make deep clone
        state = {
            ...state, 
            name: 'initialState',
            model: {
                ...module.initialState,
                system_controls: initialSystemControls
            }
        }; // Merge initialState and initialSystemControls
        return state;
    case CHANGE_NAME:
        state = {
            ...state,
            name: action.payload.name
        };
        return state;
    case CHANGE_USER:
        state = {
            ...state,
            user: action.payload.user
        };
        return state;
    case CHANGE_VIEW:
        state = Object.assign({}, {
            ...state,
            view: action.payload.view
        });
        return state;

// SYMBOL

    case CHANGE_SYMBOL_VALUE:
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: {
                    ...state.model.symbol_table,
                    [action.payload.name]: {
                       ...state.model.symbol_table[action.payload.name],
                       value: action.payload.value
                    }
                }
            }
        };
        return state;
    case CHANGE_SYMBOL_VIOLATION:
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: {
                    ...state.model.symbol_table,
                    [action.payload.name]: {
                       ...state.model.symbol_table[action.payload.name],
                       ...(action.payload.minmax === MIN ? {
                               vmin: action.payload.value
                           } : {
                               vmax: action.payload.value
                           })
                    }
                }
            }
        };
        return state;
    case CHANGE_SYMBOL_CONSTRAINT:
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: {
                    ...state.model.symbol_table,
                    [action.payload.name]: {
                       ...state.model.symbol_table[action.payload.name],
                       ...(action.payload.minmax === MIN ? {
                               cmin: action.payload.value,
                               smin: sclden(state.model.system_controls, state.model.symbol_table[action.payload.name].value, action.payload.value, state.model.symbol_table[action.payload.name].sdlim, state.model.symbol_table[action.payload.name].lmin)
                           } : {
                               cmax: action.payload.value,
                               smax: sclden(state.model.system_controls, state.model.symbol_table[action.payload.name].value, action.payload.value, state.model.symbol_table[action.payload.name].sdlim, state.model.symbol_table[action.payload.name].lmax)
                           })
                    }
                }
            }
        };
        return state;
    case CHANGE_SYMBOL_CONSTRAINTS:
        i=0;
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    // Only do it from independent and dependent variables, but not for calculation inputs
                    if (element.type === "equationset") {
                        value = action.payload.values[i++];
                        if (value !== undefined) {
                            if (action.payload.minmax === MIN) {
                                return { ...accum, [name]: {
                                    ...element,
                                    cmin: value,
                                    smin: sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmin)
                                }};
                            } else {
                                return { ...accum, [name]: {
                                    ...element,
                                    cmax: value,
                                    smax: sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmax)
                                }};
                            }
                        } else {
                            return { ...accum, [name]: element };
                        }
                    } else {
                        return { ...accum, [name]: element };
                    }
                }, {})
            }
        };
        return state;
    case SAVE_OUTPUT_SYMBOL_CONSTRAINTS:
        element = state.model.symbol_table[action.payload.name];
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: {
                    ...state.model.symbol_table,
                    [action.payload.name]: {
                       ...element,
                       lmin: 0,
                       oldlmin: element.lmin,
                       oldcmin: element.cmin,
                       lmax: 0,
                       oldlmax: element.lmax,
                       oldcmax: element.cmax,
                    }
                }
            }
        };
        return state;
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
            state = {
                ...state,
                model: {
                    ...state.model,
                    symbol_table: {
                        ...state.model.symbol_table,
                        [action.payload.name]: {
                           ...element,
                           lmin: lmin,
                           cmin: cmin,
                           smin: sclden(state.model.system_controls, element.value, cmin, element.sdlim, lmin),
                           lmax: lmax,
                           cmax: cmax,
                           smax: sclden(state.model.system_controls, element.value, cmax, element.sdlim, lmax),
                        }
                    }
                }
            };
        } else {
            throw new Error('In reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS, No old value exists for restore');
        }
        return state;
    case SET_SYMBOL_FLAG:
        element = state.model.symbol_table[action.payload.name];
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: {
                    ...state.model.symbol_table,
                    [action.payload.name]: {
                       ...state.model.symbol_table[action.payload.name],
                       ...(action.payload.minmax === MIN ? {
                               lmin: element.lmin | action.payload.mask
                           } : {
                               lmax: element.lmax | action.payload.mask
                           })
                    }
                }
            }
        };
        return state;
    case RESET_SYMBOL_FLAG:
        element = state.model.symbol_table[action.payload.name];
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: {
                    ...state.model.symbol_table,
                    [action.payload.name]: {
                       ...state.model.symbol_table[action.payload.name],
                       ...(action.payload.minmax === MIN ? {
                               lmin: element.lmin & ~action.payload.mask
                           } : {
                               lmax: element.lmax & ~action.payload.mask
                           })
                    }
                }
            }
        };
        return state;
    case CHANGE_SYMBOL_INPUT:
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: {
                    ...state.model.symbol_table,
                    [action.payload.name]: {
                       ...state.model.symbol_table[action.payload.name],
                       input: action.payload.value
                    }
                }
            }
        };
        return state;
    case CHANGE_SYMBOL_HIDDEN:
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: {
                    ...state.model.symbol_table,
                    [action.payload.name]: {
                       ...state.model.symbol_table[action.payload.name],
                       hidden: action.payload.value
                    }
                }
            }
        };
        return state;

// INPUT SYMBOL

    case CHANGE_INPUT_SYMBOL_VALUES:
        i=0;
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    if (element.type === "equationset" && element.input) {
                        value = action.payload.values[i++]
                        if (value !== undefined) {
                            return ({ ...accum, [name]: {
                                ...element,
                                value: value
                            }});
                        } else {
                            return ({ ...accum, [name]: element });
                        }
                    } else {
                        return ({ ...accum, [name]: element });
                    }
                }, {})
            }
        };
        return state;
    case SAVE_INPUT_SYMBOL_VALUES:
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    if (element.type === "equationset" && element.input) {
                        return ({ ...accum, [name]: {
                            ...element,
                            oldvalue: element.value
                        }});
                    } else {
                        return ({ ...accum, [name]: element });
                    }
                }, {})
            }
        };
        return state;
    case RESTORE_INPUT_SYMBOL_VALUES:
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    if (element.type === "equationset" && element.input) {
                        if (element.oldvalue !== undefined) {
                            var value = element.oldvalue; // Get the value as local
                            delete element.oldvalue; // Delete the value
                            return ({ ...accum, [name]: { // Assign the local
                                ...element,
                                value: value
                            }});
                        } else {
                            return ({ ...accum, [name]: element });
                        }
                    } else {
                        return ({ ...accum, [name]: element });
                    }
                })
            }
        };
        return state;

// OUTPUT SYMBOL

    case CHANGE_OUTPUT_SYMBOL_VALUES:
        i=0;
        state = {
            ...state,
            model: {
                ...state.model,
                symbol_table: Object.entries(state.model.symbol_table).reduce((accum,[name,element]) => {
                    if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
                        value = action.payload.values[i++]
                        if (value !== undefined) {
                            return ({ ...accum, [name]: {
                                ...element,
                                value: value
                            }});
                        } else {
                            return ({ ...accum, [name]: element });
                        }
                    } else {
                        return ({ ...accum, [name]: element });
                    }
                }, {})
            }
        };
        return state;

// RESULT

    case CHANGE_RESULT_OBJECTIVE_VALUE:
        state = {
            ...state,
            model: {
                ...state.model,
                result: {
                    ...state.model.result,
                    objective_value: action.payload.objective_value
                }
            }
        };
        return state;
    case CHANGE_RESULT_TERMINATION_CONDITION:
        state = {
            ...state,
            model: {
                ...state.model,
                result: {
                    ...state.model.result,
                    termination_condition: action.payload.termination_condition
                }
            }
        };
        return state;
    case CHANGE_RESULT_VIOLATED_CONSTRAINT_COUNT:
        state = {
            ...state,
            model: {
                ...state.model,
                result: {
                    ...state.model.result,
                    violated_constraint_count: action.payload.violated_constraint_count
                }
            }
        };
        return state;

// SYSTEM CONTROL

    case CHANGE_SYSTEM_CONTROLS_VALUE:
        state = {
            ...state,
            model: {
                ...state.model,
                system_controls: {
                    ...state.model.system_controls,
                    ...action.payload.system_controls
                }
            }
        };
        return state;

// LABELS

    case CHANGE_LABELS_VALUE:
        state = {
            ...state,
            model: {
                ...state.model,
                labels: action.payload.labels
            }
        }
        return state;

// AUTO_SAVE

    case SAVE_AUTO_SAVE:
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem(action.payload.name, JSON.stringify(state), null, 2); // create or replace auto save file with current state contents
//            console.log("In reducers.SAVE_AUTO_SAVE action.payload.name=",action.payload.name,"state=",state);
        }
        return state; // state not changed
    case RESTORE_AUTO_SAVE:
        if (typeof(Storage) !== "undefined") {
            var autosave = JSON.parse(localStorage.getItem(action.payload.name)); // get auto save file contents
//            console.log("In reducers.RESTORE_AUTO_SAVE autosave=",autosave);
            // Migrate autosave file from old (no model property) to new (with model property)
            if (autosave.model === undefined) { // Is it the old format
                name = autosave.name;
                delete autosave.name;
                state = {
                    ...state,
                    name: name, 
                    model: autosave
                };
            } else {
                state = autosave; // New format
            }
            var { migrate } = require('../designtypes/'+state.model.type+'/migrate.js'); // Dynamically load migrate
            state = {
                ...state,
                model: migrate(state.model),
            };
//            console.log("In reducers.RESTORE_AUTO_SAVE action.payload.name=",action.payload.name,"state=",state);
        }
        return state; // state changed
    case DELETE_AUTO_SAVE:
        if (typeof(Storage) !== "undefined") {
            localStorage.removeItem(action.payload.name); // remove auto save file
//            console.log("In reducers.DELETE_AUTO_SAVE action.payload.name=",action.payload.name,"state=",state);
        }
        return state; // state not changed

    case LOG_USAGE:
        logUsage(action.payload.tag, action.payload.action, action.payload.note)
        return state; // state not changed

    default:
        return state;
    }
}