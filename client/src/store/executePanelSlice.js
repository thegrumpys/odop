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
//    testGenerate: config.node.env !== "production" ? true : false,
  },
  reducers: {
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
        state.states = action.payload.setStates;
      },
      prepare: (setStates) => { return { payload: { setStates } } }
    },
    setStep: {
      reducer: (state, action) => {
//        console.log('executePanelSlice setStep','state=',current(state),',action=',action);
        state.step = action.payload.step;
      },
      prepare: (step) => { return { payload: { step } } }
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

export const { setShow, setExecuteName, setPrefix, setStates, setStep, /*, setTestGenerate */ } = executePanelSlice.actions; // FIXME

export default executePanelSlice.reducer;
