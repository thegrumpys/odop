import { createSlice, current } from "@reduxjs/toolkit";
import config from '../config';

export const executePanelSlice = createSlice({
  name: "executePanelSlice",
  initialState: {
    show: false,
    executeName: undefined,
    prefix: '',
    states: [],
    step: 0,
    stop_on_file_load: true, // flag for guidedDesign execute macro
//    testGenerate: config.node.env !== "production" ? true : false,
  },
  reducers: {
    executeStart: {
      reducer: (state, action) => {
//        console.log('executePanelSlice executeStart','state=',current(state),',action=',action);
        state.show = action.payload.show;
        state.executeName = action.payload.executeName;
        state.prefix = action.payload.prefix;
        state.states = action.payload.states;
        state.step = action.payload.step;
      },
      prepare: (show, executeName, prefix, states, step) => { return { payload: {show, executeName, prefix, states, step} } }
    },
    executeStopOnLoad: {
      reducer: (state, action) => {
//        console.log('executePanelSlice executeStopOnLoad','state=',current(state),',action=',action);
        if (state.stop_on_file_load) {
          state.show = false;
          state.executeName = undefined;
          state.prefix = '';
          state.states = [];
          state.step = 0;
        }
      },
    },
    executeStop: {
      reducer: (state, action) => {
//        console.log('executePanelSlice executeStop','state=',current(state),',action=',action);
        state.show = false;
        state.executeName = undefined;
        state.prefix = '';
        state.states = [];
        state.step = 0;
        state.stop_on_file_load = true;
      },
      prepare: () => { return { payload: {} } }
    },
    setShow: {
      reducer: (state, action) => {
//        console.log('executePanelSlice setShow','state=',current(state),',action=',action);
        state.show = action.payload.show;
      },
      prepare: (show) => { return { payload: { show } } }
    },
    setExecuteName: {
      reducer: (state, action) => {
//        console.log('executePanelSlice setExecuteName','state=',current(state),',action=',action);
        state.executeName = action.payload.executeName;
      },
      prepare: (executeName) => { return { payload: { executeName } } }
    },
    setPrefix: {
      reducer: (state, action) => {
//        console.log('executePanelSlice setPrefix','state=',current(state),',action=',action);
        state.prefix = action.payload.prefix;
      },
      prepare: (prefix) => { return { payload: { prefix } } }
    },
    setStates: {
      reducer: (state, action) => {
//        console.log('executePanelSlice setStates','state=',current(state),',action=',action);
        state.states = action.payload.states;
      },
      prepare: (states) => { return { payload: { states } } }
    },
    setStep: {
      reducer: (state, action) => {
//        console.log('executePanelSlice setStep','state=',current(state),',action=',action);
        state.step = action.payload.step;
      },
      prepare: (step) => { return { payload: { step } } }
    },
    setStopOnFileLoad: {
      reducer: (state, action) => {
//        console.log('executePanelSlice setStopOnFileLoad','state=',current(state),',action=',action);
        state.stop_on_file_load = action.payload.stop_on_file_load;
      },
      prepare: (stop_on_file_load) => { return { payload: { stop_on_file_load } } }
    },
//    setTestGenerate: {
//      reducer: (state, action) => {
//        console.log('executePanelSlice setTestGenerate','state=',current(state),',action=',action);
//        state.testGenerate = action.payload.testGenerate;
//      },
//      prepare: (testGenerate) => { return { payload: { testGenerate } } }
//    },
  }
});

export const { executeStart, executeStopOnLoad, executeStop, setShow, setExecuteName, setPrefix, setStates, setStep, setStartTime, setStopOnFileLoad/*, setTestGenerate */ } = executePanelSlice.actions; // FIXME

export default executePanelSlice.reducer;
