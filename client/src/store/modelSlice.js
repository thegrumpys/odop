import { createSlice, current } from "@reduxjs/toolkit";
import { initialSystemControls } from '../initialSystemControls';
import config from '../config';

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
            objective_value: 0
        },
        system_controls: initialSystemControls
    }
  },
  reducers: {

    startup: {
      reducer: (state, action) => {
        console.log('model startup','state=',current(state),',action=',action);
      }
    },

    load: {
      reducer: (state, action) => {
        console.log('model load','state=',current(state),',action=',action);
        state = action.payload.design;
      },
      prepare: (design) => { return { payload: { design } } }
    },

    loadInitialState: {
      reducer: (state, action) => {
        console.log('model loadInitialState','state=',current(state),',action=',action);
        var module;
        if (action.payload.units === 'US') {
          module = require('../designtypes/'+action.payload.type+'/initialState.js'); // Dynamically load initialState
        } else {
          module = require('../designtypes/'+action.payload.type+'/initialState_metric_units.js'); // Dynamically load initialState
        }
        module = JSON.parse(JSON.stringify(module)); // Make deep clone
        state.name = action.payload.units === 'US' ? 'initialState' : 'initialState_metric_units',
        state.model = {
          ...module.initialState,
          system_controls: initialSystemControls
        }; // Merge initialState and initialSystemControls
      },
      prepare: (type, units = 'US') => { return { payload: { type, units } } }
    },

    changeName: {
      reducer: (state, action) => {
        console.log('model changeName','state=',current(state),',action=',action);
        state.name = action.payload.name;
      },
      prepare: (name) => { return { payload: { name } } }
    },

    changeUser: {
      reducer: (state, action) => {
        console.log('model changeUser','state=',current(state),',action=',action);
        state.user = action.payload.user;
      },
      prepare: (user) => { return { payload: { user } } }
    },

    changeView: {
      reducer: (state, action) => {
        console.log('model changeView','state=',current(state),',action=',action);
        state.view = action.payload.view;
      },
      prepare: (view) => { return { payload: { view } } }
    },

    changeSymbolValue: {
      reducer: (state, action) => {
        console.log('model changeSymbolValue','state=',current(state),',action=',action);
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          state.model.symbol_table[index].value = action.payload.value;
        } else {
          console.error('changeSymbolValue: Failed to find name in symbol_table.','name=',action.payload.name,'value=',action.payload.value);
       }
     },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    changeIndexValue: {
      reducer: (state, action) => {
        console.log('model changeIndexValue','state=',current(state),',action=',action);
        if (action.payload.index >= 0 && action.payload.index < state.model.symbol_table.length) {
          state.model.symbol_table[action.payload.index].value = action.payload.value;
        } else {
          console.error('changeIndexValue: Invalid index into symbol_table.','index=',action.payload.index,'value=',action.payload.value);
        }
      },
      prepare: (index, value) => { return { payload: { index, value } } }
    },





    fixSymbolValue: {
      reducer: (state, action) => {
        console.log('model fixSymbolValue','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    freeSymbolValue: {
      reducer: (state, action) => {
        console.log('model freeSymbolValue','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeSymbolViolation: {
      reducer: (state, action) => {
        console.log('model changeSymbolViolation','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeSymbolConstraint: {
      reducer: (state, action) => {
        console.log('model changeSymbolConstraint','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeSymbolConstraints: {
      reducer: (state, action) => {
        console.log('model changeSymbolConstraints','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    setSymbolFlag: {
      reducer: (state, action) => {
        console.log('model setSymbolFlag','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    resetSymbolFlag: {
      reducer: (state, action) => {
        console.log('model resetSymbolFlag','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeSymbolInput: {
      reducer: (state, action) => {
        console.log('model changeSymbolInput','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeSymbolHidden: {
      reducer: (state, action) => {
        console.log('model changeSymbolHidden','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeInputSymbolValues: {
      reducer: (state, action) => {
        console.log('model changeInputSymbolValues','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    saveInputSymbolValues: {
      reducer: (state, action) => {
        console.log('model saveInputSymbolValues','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    restoreInputSymbolValues: {
      reducer: (state, action) => {
        console.log('model restoreInputSymbolValues','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeOutputSymbolValues: {
      reducer: (state, action) => {
        console.log('model changeOutputSymbolValues','state=',current(state),',action=',action);
        let i=0;
        state.model.symbol_table.forEach((element) => {
          if ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) {
            let value = action.payload.values[i++];
            if (value !== undefined) {
              element.value = value;
              console.log('element=',element);
            }
          }
        });
      },
      prepare: (values) => { return { payload: { values } } }
    },

    saveOutputSymbolConstraints: {
      reducer: (state, action) => {
        console.log('model saveOutputSymbolConstraints','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    restoreOutputSymbolConstraints: {
      reducer: (state, action) => {
        console.log('model restoreOutputSymbolConstraints','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeResultObjectiveValue: {
      reducer: (state, action) => {
        console.log('model changeResultObjectiveValue','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeResultTerminationCondition: {
      reducer: (state, action) => {
        console.log('model changeResultTerminationCondition','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeResultSearchCompleted: {
      reducer: (state, action) => {
        console.log('model changeResultSearchCompleted','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeSystemControlsValue: {
      reducer: (state, action) => {
        console.log('model changeSystemControlsValue','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeLabelsValue: {
      reducer: (state, action) => {
        console.log('model changeLabelsValue','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    search: {
      reducer: (state, action) => {
        console.log('model search','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    seek: {
      reducer: (state, action) => {
        console.log('model seek','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    saveAutoSave: {
      reducer: (state, action) => {
        console.log('model saveAutoSave','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    restoreAutoSave: {
      reducer: (state, action) => {
        console.log('model restoreAutoSave','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    deleteAutoSave: {
      reducer: (state, action) => {
        console.log('model deleteAutoSave','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    logUsage: {
      reducer: (state, action) => {
        console.log('model logUsage','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
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
