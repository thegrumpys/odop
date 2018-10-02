import { STARTUP, 
    LOAD, 
    LOAD_DESIGN, 
    LOAD_INITIAL_STATE, 
    CHANGE_NAME, 
    
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
import { displayError } from '../components/ErrorModal';
import { initialSystemControls } from '../initialSystemControls';

export function reducers(state, action) {
    var i;
    var value;
//    console.log('In reducers', action);
    switch (action.type) {
    case STARTUP:
        return state;
    case LOAD:
        return action.payload.design;
    case LOAD_DESIGN:
//        console.log('In LOAD_DESIGN action.payload.type=',action.payload.type,' action.payload.name=',action.payload.name);
        fetch('/api/v1/designtypes/'+action.payload.type+'/designs/' + action.payload.name)
            .then(res => {
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                var result = res.json();
//                console.log('In LOAD_DESIGN result=',result);
                return result;
            })
            .then((design) => {
                var { migrate } = require('../designtypes/'+action.payload.type+'/migrate.js'); // Dynamically load migrate
                var migrated_design = migrate(design);
//                console.log('In LOAD_DESIGN migrated_design=',migrated_design);
                return Object.assign({}, state, migrated_design);
            })
            .catch(error => {
                displayError('GET of \''+action.payload.name+'\' design failed with message: \''+error.message+'\'');
            });
        return state;
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
                            smin: sclden(state.system_controls, element.value, action.payload.value, element.sdlim, element.lmin)
                        });
                    } else {
                        return Object.assign({}, element, {
                            cmax: action.payload.value,
                            smax: sclden(state.system_controls, element.value, action.payload.value, element.sdlim, element.lmax)
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
                                smin: sclden(state.system_controls, element.value, value, element.sdlim, element.lmin)
                            });
                        } else {
                            return Object.assign({}, element, {
                                cmax: value,
                                smax: sclden(state.system_controls, element.value, value, element.sdlim, element.lmax)
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
                        smin: sclden(state.system_controls, element.value, element.oldcmin, element.sdlim, element.oldlmin),
                        lmax: element.oldlmax,
                        cmax: element.oldcmax,
                        smax: sclden(state.system_controls, element.value, element.oldcmax, element.sdlim, element.oldlmax)
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
                if (element.input) {
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
                if (element.input) {
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
                if (element.input) {
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
                if (!element.input) {
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
            system_controls: action.payload.system_controls
        }
        
// LABELS
        
    case CHANGE_LABELS_VALUE:
        return {
            ...state,
            labels: action.payload.labels
        }
    default:
        return state;
    }
}