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
            objective_value: 0
        },
        system_controls: initialSystemControls
    }
  },
  reducers: {

    startup: {
      reducer: (state, action) => {
//        console.log('reducer startup','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
      }
    },

    load: {
      reducer: (state, action) => {
//        console.log('reducer load','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.model = action.payload.model;
      },
      prepare: (model) => { return { payload: { model } } }
    },

    loadInitialState: {
      reducer: (state, action) => {
//        console.log('reducer loadInitialState','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        var module;
        if (action.payload.units === 'US') {
          module = require('../designtypes/'+action.payload.type+'/initialState.js'); // Dynamically load initialState
        } else {
          module = require('../designtypes/'+action.payload.type+'/initialState_metric_units.js'); // Dynamically load initialState
        }
        module = JSON.parse(JSON.stringify(module)); // Make deep clone
        state.name = action.payload.units === 'US' ? 'initialState' : 'initialState_metric_units',
        state.model = { // Merge initialState and initialSystemControls
          ...module.initialState,
          system_controls: initialSystemControls
        };
      },
      prepare: (type, units = 'US') => { return { payload: { type, units } } }
    },

    changeName: {
      reducer: (state, action) => {
//        console.log('reducer changeName','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.name = action.payload.name;
      },
      prepare: (name) => { return { payload: { name } } }
    },

    changeUser: {
      reducer: (state, action) => {
        console.log('reducer changeUser','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.user = action.payload.user;
      },
      prepare: (user) => { return { payload: { user } } }
    },

    changeView: {
      reducer: (state, action) => {
//        console.log('reducer changeView','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.view = action.payload.view;
      },
      prepare: (view) => { return { payload: { view } } }
    },

    changeSymbolValue: {
      reducer: (state, action) => {
//        console.log('reducer changeSymbolValue','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          state.model.symbol_table[index].value = action.payload.value;
        } else {
          console.error('changeSymbolValue: Failed to find name in symbol_table.','name=',action.payload.name);
        }
      },
      prepare: (name, value, merit) => { return { payload: { name, value, merit } } }
    },

    changeIndexValue: {
      reducer: (state, action) => {
//        console.log('reducer changeIndexValue','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        if (action.payload.index >= 0 && action.payload.index < state.model.symbol_table.length) {
          state.model.symbol_table[action.payload.index].value = action.payload.value;
        } else {
          console.error('changeIndexValue: Invalid index into symbol_table.','index=',action.payload.index);
        }
      },
      prepare: (index, value) => { return { payload: { index, value } } }
    },

    fixSymbolValue: {
      reducer: (state, action) => {
//        console.log('reducer fixSymbolValue','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index < 0) {
          console.error('fixSymbolValue: Failed to find name in symbol_table.','name=',action.payload.name);
        }
        return; // No-op
      },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    freeSymbolValue: {
      reducer: (state, action) => {
//        console.log('reducer freeSymbolValue','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index < 0) {
          console.error('freeSymbolValue: Failed to find name in symbol_table.','name=',action.payload.name);
        }
        return; // No-op
      },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    changeSymbolViolation: {
      reducer: (state, action) => {
//        console.log('reducer changeSymbolViolation','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          var element = state.model.symbol_table[index];
          if (action.payload.minmax === MIN) {
            element.vmin = action.payload.value;
          } else {
            element.vmax = action.payload.value;
          }
        } else {
          console.error('changeSymbolViolation: Failed to find name in symbol_table.','name=',action.payload.name);
        }
      },
      prepare: (name, minmax, value) => { return { payload: { name, minmax, value } } }
    },

    changeSymbolConstraint: {
      reducer: (state, action) => {
//        console.log('reducer changeSymbolConstraint','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
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
          console.error('changeSymbolConstraint: Failed to find name in symbol_table.','name=',action.payload.name);
        }
      },
      prepare: (name, minmax, value) => { return { payload: { name, minmax, value } } }
    },

    changeSymbolConstraints: {
      reducer: (state, action) => {
//        console.log('reducer changeSymbolConstraints','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
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

    setSymbolFlag: {
      reducer: (state, action) => {
//        console.log('reducer setSymbolFlag','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          var element = state.model.symbol_table[index];
          if (action.payload.minmax === MIN) {
            element.lmin = element.lmin | action.payload.mask;
          } else {
            element.lmax = element.lmax | action.payload.mask;
          }
          if (action.payload.mask & FDCL) {
            var sink = element;
//            console.log('setSymbolFlag: sink=',sink);
            var source = state.model.symbol_table.find(element => element.name === action.payload.source);
//            console.log('setSymbolFlag: source=',source);
            if (source.propagate === undefined) source.propagate = [];
            index = source.propagate.findIndex(i => i !== undefined && i.name === action.payload.name && i.minmax === action.payload.minmax);
//            console.log('setSymbolFlag: index=',index);
            if (index === -1) { // If not found in propagate array then add it
              source.propagate.push({ name: sink.name, minmax: action.payload.minmax });
              if (action.payload.minmax === MIN) {
                sink.cminchoice = sink.cminchoices.indexOf(source.name);
              } else {
                sink.cmaxchoice = sink.cmaxchoices.indexOf(source.name);
              }
            }
          }
        } else {
          console.error('setSymbolFlag: Failed to find name in symbol_table.','name=',action.payload.name);
        }
      },
      prepare: (name, minmax, mask, source=undefined) => { return { payload: { name, minmax, mask, source } } }
    },

    resetSymbolFlag: {
      reducer: (state, action) => {
//        console.log('reducer resetSymbolFlag','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          var element = state.model.symbol_table[index];
          if (action.payload.minmax === MIN) {
            element.lmin = element.lmin & (~action.payload.mask);
          } else {
            element.lmax = element.lmax & (~action.payload.mask);
          }
          if (action.payload.mask & FDCL) {
            var sink = element;
//            console.log('resetSymbolFlag: sink=',sink);
            if (action.payload.minmax === MIN) {
              var source = state.model.symbol_table.find(element => element.name === sink.cminchoices[sink.cminchoice]);
            } else {
              var source = state.model.symbol_table.find(element => element.name === sink.cmaxchoices[sink.cmaxchoice]);
            }
//            console.log('resetSymbolFlag: source=',source);
            if (source !== undefined && source.propagate !== undefined) {
              index = source.propagate.findIndex(i => i !== undefined && i.name === action.payload.name && i.minmax === action.payload.minmax);
//              console.log('resetSymbolFlag: index=',index);
              if (index !== -1) { // If found in propagate array then remove it
                source.propagate.splice(index,1); // Delete entry at offset index
                if (source.propagate.length === 0) {
                  source.propagate = undefined; // De-reference the array
                  delete source.propagate; // Delete the property
                }
              }
            }
            if (action.payload.minmax === MIN) {
              delete sink.cminchoice;
            } else {
              delete sink.cmaxchoice;
            }
//            console.log('resetSymbolFlag: source=',source,'sink=',sink);
          }
        } else {
          console.error('resetSymbolFlag: Failed to find name in symbol_table.','name=',action.payload.name);
        }
      },
      prepare: (name, minmax, mask) => { return { payload: { name, minmax, mask } } }
    },

    changeSymbolInput: {
      reducer: (state, action) => {
//        console.log('reducer changeSymbolInput','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          state.model.symbol_table[index].input = action.payload.value;
        } else {
          console.error('changeSymbolInput: Failed to find name in symbol_table.','name=',action.payload.name);
        }
      },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    changeSymbolHidden: {
      reducer: (state, action) => {
//        console.log('reducer changeSymbolHidden','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        var index = state.model.symbol_table.findIndex((element) => element.name === action.payload.name);
        if (index >= 0) {
          state.model.symbol_table[index].hidden = action.payload.value;
        } else {
          console.error('changeSymbolHidden: Failed to find name in symbol_table.','name=',action.payload.name);
        }
      },
      prepare: (name, value) => { return { payload: { name, value } } }
    },

    changeInputSymbolValues: {
      reducer: (state, action) => {
//        console.log('reducer changeInputSymbolValues','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        let i=0;
        state.model.symbol_table.forEach((element) => {
          if (element.type === "equationset" && element.input) {
            let value = action.payload.values[i++];
            if (value !== undefined) {
              element.value = value;
            } else {
              console.error('changeInputSymbolValues: Action payload value is undefined','i=',i-1,'name=',element.name);
            }
          }
        });
      },
      prepare: (values, merit) => { return { payload: { values, merit } } }
    },

    saveInputSymbolValues: {
      reducer: (state, action) => {
//        console.log('reducer saveInputSymbolValues','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.model.symbol_table.forEach((element) => {
          if (element.type === "equationset" && element.input) {
            element.oldvalue = element.value;
          }
        });
      }
    },

    restoreInputSymbolValues: {
      reducer: (state, action) => {
//        console.log('reducer restoreInputSymbolValues','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.model.symbol_table.forEach((element) => {
          if (element.type === "equationset" && element.input) {
            if (element.oldvalue !== undefined) {
              var value = element.oldvalue; // Get the value as local
              delete element.oldvalue; // Delete the value
              element.value = value; // Assign the local
            } else {
              console.error('restoreInputSymbolValues: Element oldvalue is undefined','name=',element.name);
            }
          }
        });
      },
      prepare: (name) => { return { payload: { name } } }
    },

    changeOutputSymbolValues: {
      reducer: (state, action) => {
//        console.log('reducer changeOutputSymbolValues','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
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
//        console.log('reducer saveOutputSymbolConstraints','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
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
//        console.log('reducer restoreOutputSymbolConstraints','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
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
//        console.log('reducer changeResultObjectiveValue','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.model.result.objective_value = action.payload.objective_value;
      },
      prepare: (objective_value) => { return { payload: { objective_value } } }
    },

    changeResultTerminationCondition: {
      reducer: (state, action) => {
//        console.log('reducer changeResultTerminationCondition','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.model.result.termination_condition = action.payload.termination_condition;
      },
      prepare: (termination_condition) => { return { payload: { termination_condition } } }
    },

    changeResultSearchCompleted: {
      reducer: (state, action) => {
//        console.log('reducer changeResultSearchCompleted','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.model.result.search_completed = action.payload.search_completed;
      },
      prepare: (search_completed) => { return { payload: { search_completed } } }
    },

    changeSystemControlsValue: {
      reducer: (state, action) => {
//        console.log('reducer changeSystemControlsValue','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.model.system_controls = {...state.model.system_controls,...action.payload.system_controls};
      },
      prepare: (system_controls) => { return { payload: { system_controls } } }
    },

    changeLabelsValue: {
      reducer: (state, action) => {
//        console.log('reducer changeLabelsValue','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        state.model.labels = state.model.labels.map((element) => {
          var index = action.payload.labels.findIndex(label => element.name === label.name);
          if (index >= 0) {
            return { ...element, value: action.payload.labels[index].value };
          } else {
            return element;
          }
        });
      },
      prepare: (labels) => { return { payload: { labels } } }
    },

    search: {
      reducer: (state, action) => {
//        console.log('reducer search','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        return;
      }
    },

    seek: {
      reducer: (state, action) => {
//        console.log('reducer seek','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        return;
      },
      prepare: (name, minmax) => { return { payload: { name, minmax } } }
    },

    saveAutoSave: {
      reducer: (state, action) => {
//        console.log('reducer saveAutoSave','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        if (typeof(Storage) !== "undefined") {
          localStorage.setItem(action.payload.name, JSON.stringify(state), null, 2); // create or replace auto save file with current state contents
        }
      },
      prepare: (name) => { return { payload: { name } } }
    },

    restoreAutoSave: {
      reducer: (state, action) => {
//        console.log('reducer restoreAutoSave','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        if (typeof(Storage) !== "undefined") {
            var autosave = JSON.parse(localStorage.getItem(action.payload.name)); // get auto save file contents
            // Migrate autosave file from old (no model property) to new (with model property)
            if (autosave.model === undefined) { // Is it the old format
                var name = autosave.name;
                delete autosave.name;
                state.name = name;
                state.model = autosave;
            } else {
                state = autosave; // New format
            }
            var { migrate } = require('../designtypes/'+state.model.type+'/migrate.js'); // Dynamically load migrate
            state.model = migrate(state.model);
        }
      },
      prepare: (name) => { return { payload: { name } } }
    },

    deleteAutoSave: {
      reducer: (state, action) => {
//        console.log('reducer deleteAutoSave','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
        localStorage.removeItem(action.payload.name); // remove auto save file
      },
      prepare: (name) => { return { payload: { name } } }
    },

    logUsage: {
      reducer: (state, action) => {
//        console.log('reducer logUsage','state=',current(state),',action=',action);
        state.model.result.termination_condition = '';
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
