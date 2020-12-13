import { STARTUP,
    LOAD,
    LOAD_INITIAL_STATE,
    CHANGE_NAME,
    CHANGE_USER,

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

    MIN } from './actionTypes';
import { sclden } from './middleware/sclden';
import { initialSystemControls } from '../initialSystemControls';
import { evaluateConstraintValue } from './middleware/evaluateConstraint';

export function reducers(state, action) {
    var i;
    var value;
    var name;
    var model;
//    console.warn('In reducers state=',state,'action=', action);
    switch (action.type) {
    case STARTUP:
//        console.log('In STARTUP state=',state);
        return state;
    case LOAD:
        state = Object.assign({}, state, { 
            ...action.payload.design
        });
//        console.log('In LOAD action.payload.design=',action.payload.design,'state=',state);
        return state;
    case LOAD_INITIAL_STATE:
//        console.log('In LOAD_INITIAL_STATE');
        if (action.payload.units === 'US') {
            var { initialState } = require('../designtypes/'+action.payload.type+'/initialState.js'); // Dynamically load initialState
        } else {
            var { initialState } = require('../designtypes/'+action.payload.type+'/initialState_metric_units.js'); // Dynamically load initialState
        }
        state = Object.assign({}, state, { 
            name: 'initialState',
            model: {
                ...initialState,
                system_controls: initialSystemControls
            }
        }); // Merge initialState and initialSystemControls
//        console.log('In LOAD_INITIAL_STATE initialState=',initialState,'state=',state);
        return state;
    case CHANGE_NAME:
        state = Object.assign({}, {
            ...state,
            name: action.payload.name
        });
//        console.log('In CHANGE_NAME action.payload.name=',action.payload.name,'state=',state);
        return state;
    case CHANGE_USER:
        state = Object.assign({}, {
            ...state,
            user: action.payload.user
        });
//        console.log('In CHANGE_USER action.payload.user=',action.payload.user,'state=',state);
        return state;

// SYMBOL

    case CHANGE_SYMBOL_VALUE:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                symbol_table: state.model.symbol_table.map((element) => {
                    if (element.name === action.payload.name) {
//                        if (element.name === 'Force_2')
//                            console.log('CHANGE_SYMBOL_VALUE element=',element.name,' old value=',element.value,' new value=',action.payload.value);
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
                                smin: sclden(state.model.system_controls, element.value, evaluateConstraintValue(state.model.symbol_table,element.lmin,action.payload.value), element.sdlim, element.lmin)
                            });
                        } else {
                            return Object.assign({}, element, {
                                cmax: action.payload.value,
                                smax: sclden(state.model.system_controls, element.value, evaluateConstraintValue(state.model.symbol_table,element.lmax,action.payload.value), element.sdlim, element.lmax)
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
                                    smin: sclden(state.model.system_controls, element.value, evaluateConstraintValue(state.model.symbol_table,element.lmin,value), element.sdlim, element.lmin)
                                });
                            } else {
                                return Object.assign({}, element, {
                                    cmax: value,
                                    smax: sclden(state.model.system_controls, element.value, evaluateConstraintValue(state.model.symbol_table,element.lmax,value), element.sdlim, element.lmax)
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
                            oldlmin: element.lmin,
                            oldcmin: element.cmin,
                            oldlmax: element.lmax,
                            oldcmax: element.cmax
                        });
                    }
                    return element;
                })
            }
        });
    case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS:
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
                                smin: sclden(state.model.system_controls, element.value, evaluateConstraintValue(state.model.symbol_table,lmin,cmin), element.sdlim, lmin),
                                lmax: lmax,
                                cmax: cmax,
                                smax: sclden(state.model.system_controls, element.value, evaluateConstraintValue(state.model.symbol_table,lmax,cmax), element.sdlim, lmax)
                            });
                        } else {
                            return element;
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
    //                    console.log('CHANGE_SYMBOL_INPUT element=',element.name,' old value=',element.input,' new value=',action.payload.value);
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
//                        console.log('CHANGE_SYMBOL_HIDDEN element=',element.name,' old value=',element.hidden,' new value=',action.payload.value);
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
    //                            console.log('CHANGE_INPUT_SYMBOL_VALUES i=',i-1,' element=',element.name,' old value=',element.value,' new value=',value);
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
    //                            console.log('CHANGE_OUTPUT_SYMBOL_VALUES i=',i-1,' element=',element.name,' old value=',element.value,' new value=',value);
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
        return Object.assign({}, state, {
            model: {
                ...state.model,
                result: {
                    ...state.model.result,
                    termination_condition: action.payload.termination_condition
                }
            }
        });
    case CHANGE_RESULT_VIOLATED_CONSTRAINT_COUNT:
        return Object.assign({}, state, {
            model: {
                ...state.model,
                result: {
                    ...state.model.result,
                    violated_constraint_count: action.payload.violated_constraint_count
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
//            console.log("Save Auto Save");
            state.model.name = state.name; // move name into model to save it ***FUDGE*** for compatibility with existing autosave files
            localStorage.setItem('autosave', JSON.stringify(state.model), null, 2); // create or replace auto save file with current state contents
            delete state.model.name; // after saving it delete name from model ***FUDGE*** for compatibility with existing autosave files
        }
        return state; // state not changed
    case RESTORE_AUTO_SAVE:
        if (typeof(Storage) !== "undefined") {
//            console.log("Restore Auto Save");
            model = JSON.parse(localStorage.getItem('autosave')); // get auto save file contents
            name = model.name; // get name from model to restore it ***FUDGE*** for compatibility with existing autosave files
            delete model.name; // after restoring it delete name from model ***FUDGE*** for compatibility with existing autosave files
            return Object.assign({}, state, {
                name: name,
                model: model
            })
        }
        return state; // state changed
    case DELETE_AUTO_SAVE:
        if (typeof(Storage) !== "undefined") {
//            console.log("Delete Auto Save");
            localStorage.removeItem('autosave'); // remove auto save file
        }
        return state; // state not changed

    default:
        return state;
    }

}