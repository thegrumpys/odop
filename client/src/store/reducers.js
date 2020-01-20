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
    
    CHANGE_INPUT_SYMBOL_VALUES, 
    SAVE_INPUT_SYMBOL_VALUES, 
    RESTORE_INPUT_SYMBOL_VALUES, 
    
    CHANGE_OUTPUT_SYMBOL_VALUES, 
    
    CHANGE_RESULT_OBJECTIVE_VALUE, 
    CHANGE_RESULT_TERMINATION_CONDITION, 
    CHANGE_RESULT_VIOLATED_CONSTRAINT_COUNT, 
    
    CHANGE_SYSTEM_CONTROLS_VALUE, 
    CHANGE_LABELS_VALUE, 
    
    MIN } from './actionTypes';
import { sclden } from './middleware/sclden';
import { initialSystemControls } from '../initialSystemControls';
import { evaluateConstraintValue } from './middleware/evaluateConstraint';

export function reducers(state, action) {
    var i;
    var value;
//    console.log('In reducers', action);
    switch (action.type) {
    case STARTUP:
        return state;
    case LOAD:
        return action.payload.design;
    case LOAD_INITIAL_STATE:
//        console.log('In LOAD_INITIAL_STATE');
        var { initialState } = require('../designtypes/'+action.payload.type+'/initialState.js'); // Dynamically load initialState
        var design = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
//        console.log('In LOAD_INITIAL_STATE design=',design);
        return design;
    case CHANGE_NAME:
        return Object.assign({}, state, {
            name: action.payload.name
        });
    case CHANGE_USER:
        return Object.assign({}, state, {
            user: action.payload.user
        });
        
// SYMBOL
        
    case CHANGE_SYMBOL_VALUE:
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if (element.name === action.payload.name) {
//                    if (element.name === 'Force_2')
//                        console.log('CHANGE_SYMBOL_VALUE element=',element.name,' old value=',element.value,' new value=',action.payload.value);
                    return Object.assign({}, element, {
                        value: action.payload.value
                    });
                }
                return element;
            })
        });
    case CHANGE_SYMBOL_VIOLATION:
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
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
        });
    case CHANGE_SYMBOL_CONSTRAINT:
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if (element.name === action.payload.name) {
                    if (action.payload.minmax === MIN) {
                        return Object.assign({}, element, {
                            cmin: action.payload.value,
                            smin: sclden(state.system_controls, element.value, evaluateConstraintValue(state.symbol_table,element.lmin,action.payload.value), element.sdlim, element.lmin)
                        });
                    } else {
                        return Object.assign({}, element, {
                            cmax: action.payload.value,
                            smax: sclden(state.system_controls, element.value, evaluateConstraintValue(state.symbol_table,element.lmax,action.payload.value), element.sdlim, element.lmax)
                        });
                    }
                }
                return element;
            })
        });
    case CHANGE_SYMBOL_CONSTRAINTS:
        i=0;
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                // Only do it from independent and dependent variables, but not for calculation inputs
                if (element.equationset) {
                    value = action.payload.values[i++];
                    if (value !== undefined) {
                        if (action.payload.minmax === MIN) {
                            return Object.assign({}, element, {
                                cmin: value,
                                smin: sclden(state.system_controls, element.value, evaluateConstraintValue(state.symbol_table,element.lmin,value), element.sdlim, element.lmin)
                            });
                        } else {
                            return Object.assign({}, element, {
                                cmax: value,
                                smax: sclden(state.system_controls, element.value, evaluateConstraintValue(state.symbol_table,element.lmax,value), element.sdlim, element.lmax)
                            });
                        }
                    } else {
                        return element;
                    }
                } else {
                    return element;
                }
            })
        });
    case SAVE_OUTPUT_SYMBOL_CONSTRAINTS:
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if (element.name === action.payload.name) {
                    return Object.assign({}, element, {
                        oldlmin: element.lmin,
                        oldcmin: element.cmin,
                        oldlmax: element.lmax,
                        oldcmax: element.cmax
                    });
                }
                return element;
            })
        });
    case RESTORE_OUTPUT_SYMBOL_CONSTRAINTS:
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if (element.name === action.payload.name) {
                    return Object.assign({}, element, {
                        lmin: element.oldlmin,
                        cmin: element.oldcmin,
                        smin: sclden(state.system_controls, element.value, evaluateConstraintValue(state.symbol_table,element.oldlmin,element.oldcmin), element.sdlim, element.oldlmin),
                        lmax: element.oldlmax,
                        cmax: element.oldcmax,
                        smax: sclden(state.system_controls, element.value, evaluateConstraintValue(state.symbol_table,element.oldlmax,element.oldcmax), element.sdlim, element.oldlmax)
                    });
                }
                return element;
            })
        });
    case SET_SYMBOL_FLAG:
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if (element.name === action.payload.name) {
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
        });
    case RESET_SYMBOL_FLAG:
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if (element.name === action.payload.name) {
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
        });
        
// INPUT SYMBOL
        
    case CHANGE_INPUT_SYMBOL_VALUES:
        i=0;
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if (element.input && element.equationset) {
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
        });
    case SAVE_INPUT_SYMBOL_VALUES:
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if (element.input && element.equationset) {
                    return Object.assign({}, element, {
                        oldvalue: element.value
                    });
                } else {
                    return element;
                }
            })
        });
    case RESTORE_INPUT_SYMBOL_VALUES:
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if (element.input && element.equationset) {
                    return Object.assign({}, element, {
                        value: element.oldvalue
                    });
                } else {
                    return element;
                }
            })
        });
        
// OUTPUT SYMBOL
        
    case CHANGE_OUTPUT_SYMBOL_VALUES:
        i=0;
        return Object.assign({}, state, {
            symbol_table: state.symbol_table.map((element) => {
                if ((!element.input && element.equationset) || (!element.equationset)) {
                    value = action.payload.values[i++]
                    if (value !== undefined) {
//                        console.log('CHANGE_OUTPUT_SYMBOL_VALUES i=',i-1,' element=',element.name,' old value=',element.value,' new value=',value);
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
        });
        
// RESULT
         
    case CHANGE_RESULT_OBJECTIVE_VALUE:
        return {
            ...state,
            result: {
                ...state.result,
                objective_value: action.payload.objective_value
            }
        }
    case CHANGE_RESULT_TERMINATION_CONDITION:
        return {
            ...state,
            result: {
                ...state.result,
                termination_condition: action.payload.termination_condition
            }
        }
    case CHANGE_RESULT_VIOLATED_CONSTRAINT_COUNT:
        return {
            ...state,
            result: {
                ...state.result,
                violated_constraint_count: action.payload.violated_constraint_count
            }
        }
        
// SYMTEM CONTROL
        
    case CHANGE_SYSTEM_CONTROLS_VALUE:
        return {
            ...state,
            system_controls: {
                ...state.system_controls,
                ...action.payload.system_controls
            }
        }
        
// LABELS
        
    case CHANGE_LABELS_VALUE:
        return Object.assign({}, state, {
            labels: state.labels.map((element) => {
                let i = action.payload.labels.findIndex(label => element.name === label.name)
                if (i !== -1) {
                    return Object.assign({}, element, {
                        value: action.payload.labels[i].value
                    });
                } else {
                    return element;
                }
            })
        });
    default:
        return state;
    }
}