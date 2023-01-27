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

    CHANGE_SYSTEM_CONTROLS_VALUE,
    CHANGE_LABELS_VALUE,
    
    SAVE_AUTO_SAVE,
    RESTORE_AUTO_SAVE,
    DELETE_AUTO_SAVE,

    LOG_USAGE,

    VALID_MIN, VALID_MAX,

    MIN, MAX,
} from './actionTypes';
import { sclden } from './middleware/sclden';
import { initialSystemControls } from '../initialSystemControls';
import { logUsage } from '../logUsage';

export function reducers(state, action) {
    var i;
    var value;
    var name;

//    console.warn('In reducers state=',state,'action=', action);
//    if (action.payload === undefined || action.payload.name === undefined) {
//        console.log('<li>','In reducers action=', action.type,'</li>');
//    } else {
//        console.log('<li>','In reducers action=', action.type,'action.payload.name=',action.payload.name,'</li>');
//    }

    if (state.model.result !== undefined) {
//        console.warn('In reducers CLEAR TERMINATION_CONDITION state=',state,'action=', action);
        state.model.result.termination_condition = '';
    }

    switch (action.type) {
    case STARTUP:
//        console.log('In reducers.STARTUP state=',state);
        return state;
    case LOAD:
        state = Object.assign({}, state, { 
            ...action.payload.design
        });
 //      console.log('In reducers.LOAD action.payload.design=',action.payload.design,'state=',state);
        return state;
    case LOAD_INITIAL_STATE:
//        console.log('In reducers.LOAD_INITIAL_STATE');
        var module;
        if (action.payload.units === 'US') {
            module = require('../designtypes/'+action.payload.type+'/initialState.js'); // Dynamically load initialState
        } else {
            module = require('../designtypes/'+action.payload.type+'/initialState_metric_units.js'); // Dynamically load initialState
        }
        module = JSON.parse(JSON.stringify(module)); // Make deep clone
        state = Object.assign({}, state, { 
            name: action.payload.units === 'US' ? 'initialState' : 'initialState_metric_units',
            model: {
                ...module.initialState,
                system_controls: initialSystemControls
            }
        }); // Merge initialState and initialSystemControls
//        console.log('In reducers.LOAD_INITIAL_STATE action.payload.type=',action.payload.type,'action.payload.units=',action.payload.units,'state=',state);
        return state;
    case CHANGE_NAME:
        state = Object.assign({}, {
            ...state,
            name: action.payload.name
        });
//        console.log('In reducers.CHANGE_NAME action.payload.name=',action.payload.name,'state=',state);
        return state;
    case CHANGE_USER:
        state = Object.assign({}, {
            ...state,
            user: action.payload.user
        });
//        console.log('In reducers.CHANGE_USER action.payload.user=',action.payload.user,'state=',state);
        return state;
    case CHANGE_VIEW:
        state = Object.assign({}, {
            ...state,
        //    view: action.payload.view
        });
//        console.log('In reducers.CHANGE_VIEW action.payload.view=',action.payload.view,'state=',state);
        return state;

// SYMBOL

    case CHANGE_SYMBOL_VALUE:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
//                        if (element.name === 'Force_2')
//                            console.log('In reducers.CHANGE_SYMBOL_VALUE element=',element.name,' old value=',element.value,' new value=',action.payload.value);
                        return Object.assign({}, element, {
                            value: action.payload.value
                        });
                    }
                    return element;
                })
            }
        });
    case CHANGE_SYMBOL_VIOLATION:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
                        if (action.payload.minmax === MIN) {
                            return Object.assign({}, element, {
                                vmin: action.payload.value
                            });
                        } else {
                            return Object.assign({}, element, {
                                vmax: action.payload.value
                            });
                        }
                    }
                    return element;
                })
            }
        });
    case CHANGE_SYMBOL_CONSTRAINT:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
                        if (action.payload.minmax === MIN) {
                            return Object.assign({}, element, {
                                cmin: action.payload.value,
                                smin: sclden(state.model.system_controls, element.value, action.payload.value, element.sdlim, element.lmin)
                            });
                        } else if (action.payload.minmax === MAX) {
                            return Object.assign({}, element, {
                                cmax: action.payload.value,
                                smax: sclden(state.model.system_controls, element.value, action.payload.value, element.sdlim, element.lmax)
                            });
                        } else if (action.payload.minmax === VALID_MIN) {
                            return Object.assign({}, element, {
                                validmin: action.payload.value,
                            });
                        } else if (action.payload.minmax === VALID_MAX) {
                            return Object.assign({}, element, {
                                validmax: action.payload.value,
                            });
                        }
                    }
                    return element;
                })
            }
        });
    case CHANGE_SYMBOL_CONSTRAINTS:
        i=0;
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    // Only do it from independent and dependent variables, but not for calculation inputs
                    if (element.type === "equationset") {
                        value = action.payload.values[i++];
                        if (value !== undefined) {
                            if (action.payload.minmax === MIN) {
                                return Object.assign({}, element, {
                                    cmin: value,
                                    smin: sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmin)
                                });
                            } else {
                                return Object.assign({}, element, {
                                    cmax: value,
                                    smax: sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmax)
                                });
                            }
                        } else {
                            return element;
                        }
                    } else {
                        return element;
                    }
                })
            }
        });
    case SAVE_OUTPUT_SYMBOL_CONSTRAINTS:
//        console.log('In reducers.SAVE_OUTPUT_SYMBOL_CONSTRAINTS action=', action);
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
//                        console.log('In reducers.SAVE_OUTPUT_SYMBOL_CONSTRAINTS state=',state,'action=', action);
//                        console.log('In reducers.SAVE_OUTPUT_SYMBOL_CONSTRAINTS',
//                                    'element.lmin=',element.lmin,
//                                    'element.cmin=',element.cmin,
//                                    'element.lmax=',element.lmax,
//                                    'element.cmax=',element.cmax);
                        return Object.assign({}, element, {
                            lmin: 0,
                            oldlmin: element.lmin,
                            oldcmin: element.cmin,
                            lmax: 0,
                            oldlmax: element.lmax,
                            oldcmax: element.cmax
                        });
                    }
                    return element;
                })
            }
        });
    case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS:
//        console.log('In reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS action=', action);
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
//                        console.log('In reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS state=',state,'action=', action);
//                        console.log('In reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS',
//                                    'element.oldlmin=',element.oldlmin,
//                                    'element.oldcmin=',element.oldcmin,
//                                    'element.oldlmax=',element.oldlmax,
//                                    'element.oldcmax=',element.oldcmax);
                        if (element.oldlmin !== undefined) { // Is there something to restore then restore them else just use the current values as-is
                            var lmin = element.oldlmin; // Get the values as locals
                            var cmin = element.oldcmin;
                            var lmax = element.oldlmax;
                            var cmax = element.oldcmax;
                            delete element.oldlmin; // Delete the values
                            delete element.oldcmin;
                            delete element.oldlmax;
                            delete element.oldcmax;
                            return Object.assign({}, element, { // Assign the locals
                                lmin: lmin,
                                cmin: cmin,
                                smin: sclden(state.model.system_controls, element.value, cmin, element.sdlim, lmin),
                                lmax: lmax,
                                cmax: cmax,
                                smax: sclden(state.model.system_controls, element.value, cmax, element.sdlim, lmax)
                            });
                        } else {
                            throw new Error('In reducers.RESTORE_OUTPUT_SYMBOL_CONSTRAINTS, No old value exists for restore');
                        }
                    }
                    return element;
                })
            }
        });
    case SET_SYMBOL_FLAG:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
//                        console.log('In reducers.SET_SYMBOL_FLAG state=',state,'action=', action);
                        if (action.payload.minmax === MIN) {
                            return Object.assign({}, element, {
                                lmin: element.lmin | action.payload.mask
                            });
                        } else {
                            return Object.assign({}, element, {
                                lmax: element.lmax | action.payload.mask
                            });
                        }
                    }
                    return element;
                })
            }
        });
    case RESET_SYMBOL_FLAG:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
//                        console.log('In reducers.RESET_SYMBOL_FLAG state=',state,'action=', action);
                        if (action.payload.minmax === MIN) {
                            return Object.assign({}, element, {
                                lmin: element.lmin & ~action.payload.mask
                            });
                        } else {
                            return Object.assign({}, element, {
                                lmax: element.lmax & ~action.payload.mask
                            });
                        }
                    }
                    return element;
                })
            }
        });
    case CHANGE_SYMBOL_INPUT:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
    //                    console.log('In reducers.CHANGE_SYMBOL_INPUT element=',element.name,' old value=',element.input,' new value=',action.payload.value);
                        return Object.assign({}, element, {
                            input: action.payload.value
                        });
                    }
                    return element;
                })
            }
        });

    case CHANGE_SYMBOL_HIDDEN:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
//                        console.log('In reducers.CHANGE_SYMBOL_HIDDEN element=',element.name,' old value=',element.hidden,' new value=',action.payload.value);
                        return Object.assign({}, element, {
                            hidden: action.payload.value
                        });
                    }
                return element;
                })
            }
        });

// INPUT SYMBOL

    case CHANGE_INPUT_SYMBOL_VALUES:
        i=0;
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.type === "equationset" && element.input) {
                        value = action.payload.values[i++]
                        if (value !== undefined) {
    //                        if (element.name === 'Force_2')
    //                            console.log('In reducers.CHANGE_INPUT_SYMBOL_VALUES i=',i-1,' element=',element.name,' old value=',element.value,' new value=',value);
                            return Object.assign({}, element, {
                                value: value
                            });
                        } else {
                            return element;
                        }
                    } else {
                        return element;
                    }
                })
            }
        });
    case SAVE_INPUT_SYMBOL_VALUES:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.type === "equationset" && element.input) {
//                        if (element.name === "Wire_Dia")
//                            console.log('In reducers.SAVE_INPUT_SYMBOL_VALUES element=',element);
                        return Object.assign({}, element, {
                            oldvalue: element.value
                        });
                    } else {
                        return element;
                    }
                })
            }
        });
    case RESTORE_INPUT_SYMBOL_VALUES:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.type === "equationset" && element.input) {
                        if (element.oldvalue !== undefined) {
//                            if (element.name === "Wire_Dia")
//                                console.log('In reducers.RESTORE_INPUT_SYMBOL_VALUES oldvalue==defined element=',element);
                            var value = element.oldvalue; // Get the value as local
                            delete element.oldvalue; // Delete the value
                            return Object.assign({}, element, { // Assign the local
                                value: value
                            });
                        } else {
//                            if (element.name === "Wire_Dia")
//                                console.log('In reducers.RESTORE_INPUT_SYMBOL_VALUES oldvalue==undefined element=',element);
                            return element;
                        }
                    } else {
                        return element;
                    }
                })
            }
        });

// OUTPUT SYMBOL

    case CHANGE_OUTPUT_SYMBOL_VALUES:
        i=0;
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
                        value = action.payload.values[i++]
                        if (value !== undefined) {
    //                        if (element.name === "Prop_Calc_Method")
    //                            console.log('In reducers.CHANGE_OUTPUT_SYMBOL_VALUES i=',i-1,' element=',element.name,' old value=',element.value,' new value=',value);
                            return Object.assign({}, element, {
                                value: value
                            });
                        } else {
                            return element;
                        }
                    } else {
                        return element;
                    }
                })
            }
        });

// RESULT

    case CHANGE_RESULT_OBJECTIVE_VALUE:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                result: {
                    ...state.model.result,
                    objective_value: action.payload.objective_value
                }
            }
        });
    case CHANGE_RESULT_TERMINATION_CONDITION:
//        console.log('$$$$$ CHANGE_RESULT_TERMINATION_CONDITION $$$$$ action.payload.termination_condition=',action.payload.termination_condition);
        return Object.assign({}, state, {
            model: {
                ...state.model,
                result: {
                    ...state.model.result,
                    termination_condition: action.payload.termination_condition
                }
            }
        });

// SYSTEM CONTROL

    case CHANGE_SYSTEM_CONTROLS_VALUE:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                system_controls: {
                    ...state.model.system_controls,
                    ...action.payload.system_controls
                }
            }
        });

// LABELS

    case CHANGE_LABELS_VALUE:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                labels: state.model.labels.map((element) => {
                    let i = action.payload.labels.findIndex(label => element.name === label.name)
                    if (i !== -1) {
                        return Object.assign({}, element, {
                            value: action.payload.labels[i].value
                        });
                    } else {
                        return element;
                    }
                })
            }
        });

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
                state = Object.assign({}, state, {
                    name: name, 
                    model: autosave
                });
            } else {
                state = Object.assign({}, state, autosave); // New format
            }
            var { migrate } = require('../designtypes/'+state.model.type+'/migrate.js'); // Dynamically load migrate
            state = Object.assign({}, state, {
                model: migrate(state.model),
            });
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