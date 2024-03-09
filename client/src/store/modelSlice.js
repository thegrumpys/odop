import { MIN, MAX } from './actionTypes';
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
        state.model = action.payload.model;
      },
      prepare: (model) => { return { payload: { model } } }
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

    fixSymbolValue: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model fixSymbolValue','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    freeSymbolValue: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model freeSymbolValue','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeSymbolViolation: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model changeSymbolViolation','state=',current(state),',action=',action);
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          var element = state.model.symbol_table[index];
          if (action.payload.minmax === MIN) {
            element.vmin = action.payload.value
          } else {
            element.vmax = action.payload.value
          }
        } else {
          console.error('changeSymbolViolation: Failed to find name in symbol_table.','name=',action.payload.name,'value=',action.payload.value);
        }
      },
      prepare: (name, minmax, value) => { return { payload: { name, minmax, value } } }
    },

    changeSymbolConstraint: {
      reducer: (state, action) => {
        console.log('model changeSymbolConstraint','state=',current(state),',action=',action);
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          var element = state.model.symbol_table[index];
          if (action.payload.minmax === MIN) {
            element.cmin = action.payload.value;
            element.smin = sclden(state.model.system_controls, element.value, action.payload.value, element.sdlim, element.lmin)
          } else if (action.payload.minmax === MAX) {
            element.cmax = action.payload.value;
            element.smax = sclden(state.model.system_controls, element.value, action.payload.value, element.sdlim, element.lmax);
          } else if (action.payload.minmax === VALID_MIN) {
            element.validmin = action.payload.value;
          } else if (action.payload.minmax === VALID_MAX) {
            element.validmax = action.payload.value;
          }
        } else {
          console.error('changeSymbolConstraint: Failed to find name in symbol_table.','name=',action.payload.name,'value=',action.payload.value);
        }
      },
      prepare: (name, minmax, value) => { return { payload: { name, minmax, value } } }
    },

    changeSymbolConstraints: {
      reducer: (state, action) => {
        console.log('model changeSymbolConstraints','state=',current(state),',action=',action);
        let i=0;
        state.model.symbol_table.forEach((element) => {
          if (element.type === "equationset") {
            let value = action.payload.values[i++];
            if (value !== undefined) {
              if (action.payload.minmax === MIN) {
                element.cmin = value;
                element.smin = sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmin);
              } else {
                element.cmax = value;
                element.smax = sclden(state.model.system_controls, element.value, value, element.sdlim, element.lmax);
              }
            }
          }
        });
      },
      prepare: (values, minmax) => { return { payload: { values, minmax } } }
    },

    setSymbolFlag: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model setSymbolFlag','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    resetSymbolFlag: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model resetSymbolFlag','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeSymbolInput: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model changeSymbolInput','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeSymbolHidden: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model changeSymbolHidden','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    changeInputSymbolValues: {
      reducer: (state, action) => {
        console.log('model changeInputSymbolValues','state=',current(state),',action=',action);
        let i=0;
        state.model.symbol_table.forEach((element) => {
          if (element.type === "equationset" && element.input) {
            let value = action.payload.values[i++];
            if (value !== undefined) {
              element.value = value;
            }
          }
        });
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    saveInputSymbolValues: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model saveInputSymbolValues','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    restoreInputSymbolValues: { // IMPLEMENT ME!
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
            }
          }
        });
      },
      prepare: (values) => { return { payload: { values } } }
    },

    saveOutputSymbolConstraints: {
      reducer: (state, action) => {
        console.log('model saveOutputSymbolConstraints','state=',current(state),',action=',action);
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          var element = state.model.symbol_table[index];
          element.lmin = 0;
          element.oldlmin = element.lmin;
          element.oldcmin = element.cmin;
          element.lmax = 0;
          element.oldlmax = element.lmax;
          element.oldcmax = element.cmax;
        } else {
          console.error('saveOutputSymbolConstraints: Failed to find name in symbol_table.','name=',action.payload.name);
        }
      },
      prepare: (name) => { return { payload: { name } } }
    },

    restoreOutputSymbolConstraints: {
      reducer: (state, action) => {
        console.log('model restoreOutputSymbolConstraints','state=',current(state),',action=',action);
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          var element = state.model.symbol_table[index];
          if (element.oldlmin !== undefined) { // Is there something to restore then restore them else just use the current values as-is
            var lmin = element.oldlmin; // Get the values as locals
            var cmin = element.oldcmin;
            var lmax = element.oldlmax;
            var cmax = element.oldcmax;
            delete element.oldlmin; // Delete the values
            delete element.oldcmin;
            delete element.oldlmax;
            delete element.oldcmax;
            element.lmin = lmin;
            element.cmin = cmin;
            element.smin = sclden(state.model.system_controls, element.value, cmin, element.sdlim, lmin);
            element.lmax = lmax;
            element.cmax = cmax;
            element.smax = sclden(state.model.system_controls, element.value, cmax, element.sdlim, lmax);
          }
        } else {
          console.error('restoreOutputSymbolConstraints: Failed to find name in symbol_table.','name=',action.payload.name);
        }
      },
      prepare: (name) => { return { payload: { name } } }
    },

    changeResultObjectiveValue: {
      reducer: (state, action) => {
        console.log('model changeResultObjectiveValue','state=',current(state),',action=',action);
        state.model.result.search_completed = action.payload.objective_value;
      },
      prepare: (objective_value) => { return { payload: { objective_value } } }
    },

    changeResultTerminationCondition: {
      reducer: (state, action) => {
        console.log('model changeResultTerminationCondition','state=',current(state),',action=',action);
        state.model.result.search_completed = action.payload.termination_condition;
      },
      prepare: (termination_condition) => { return { payload: { termination_condition } } }
    },

    changeResultSearchCompleted: {
      reducer: (state, action) => {
        console.log('model changeResultSearchCompleted','state=',current(state),',action=',action);
        state.model.result.search_completed = action.payload.search_completed;
      },
      prepare: (search_completed) => { return { payload: { search_completed } } }
    },

    changeSystemControlsValue: {
      reducer: (state, action) => {
        console.log('model changeSystemControlsValue','state=',current(state),',action=',action);
        state.model.system_controls = action.payload.system_controls;
      },
      prepare: (system_controls) => { return { payload: { system_controls } } }
    },

    changeLabelsValue: {
      reducer: (state, action) => {
        console.log('model changeLabelsValue','state=',current(state),',action=',action);
        var index = state.model.labels.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          state.model.labels[index].value = action.payload.value;
        } else {
          console.error('changeLabelsValue: Failed to find name in labels.','name=',action.payload.name,'value=',action.payload.value);
        }
      },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    search: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model search','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    seek: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model seek','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    saveAutoSave: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model saveAutoSave','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    restoreAutoSave: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model restoreAutoSave','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    deleteAutoSave: { // IMPLEMENT ME!
      reducer: (state, action) => {
        console.log('model deleteAutoSave','state=',current(state),',action=',action);
      },
      prepare: (value1, value2) => { return { payload: { value1, value2 } } }
    },

    logUsage: {
      reducer: (state, action) => {
        console.log('model logUsage','state=',current(state),',action=',action);
        logUsage(action.payload.tag, action.payload.action, action.payload.note);
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
