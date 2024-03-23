import { createSlice, current } from "@reduxjs/toolkit";
import config from '../config';

export const executePanelSlice = createSlice({
  name: "executePanelSlice",
  initialState: {
    executeName: undefined,
    show: false,
    prefix: '',
    steps: [],
    step: 0,
    title: '',
    text: '',
//    testGenerate: config.node.env !== "production" ? true : false,
  },
  reducers: {
    setExecuteName: {
      reducer: (state, action) => {
        console.log('executePanelSlice setExecuteName','state=',current(state),',action=',action);
        state.executePanel = action.payload.executeName;
      },
      prepare: (executeName) => { return { payload: { executeName } } }
    },
    setShow: {
      reducer: (state, action) => {
        console.log('executePanelSlice setShow','state=',current(state),',action=',action);
        state.show = action.payload.show;
      },
      prepare: (show) => { return { payload: { show } } }
    },
    setPrefix: {
      reducer: (state, action) => {
        console.log('executePanelSlice setPrefix','state=',current(state),',action=',action);
        state.prefix = action.payload.prefix;
      },
      prepare: (prefix) => { return { payload: { prefix } } }
    },
    setSteps: {
      reducer: (state, action) => {
        console.log('executePanelSlice setSteps','state=',current(state),',action=',action);
        state.steps = action.payload.setSteps;
      },
      prepare: (setSteps) => { return { payload: { setSteps } } }
    },
    setStep: {
      reducer: (state, action) => {
        console.log('executePanelSlice setStep','state=',current(state),',action=',action);
        state.step = action.payload.step;
      },
      prepare: (step) => { return { payload: { step } } }
    },
    setTitle: {
      reducer: (state, action) => {
        console.log('executePanelSlice setTitle','state=',current(state),',action=',action);
        state.title = action.payload.title;
      },
      prepare: (title) => { return { payload: { title } } }
    },
    setText: {
      reducer: (state, action) => {
        console.log('executePanelSlice setText','state=',current(state),',action=',action);
        state.text = action.payload.text;
      },
      prepare: (text) => { return { payload: { text } } }
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

export const { setExecuteName, setShow, setPrefix, setSteps, setStep, setTitle, setText /*, setTestGenerate */ } = executePanelSlice.actions; // FIXME

export default executePanelSlice.reducer;
