import { createSlice } from "@reduxjs/toolkit";

export const messageModalSlice = createSlice({
  name: "messageModalSlice",
  initialState: {
    show: false, // Default: do not display
    header: '', // Default: no header
    messages: [], // Default: no messages
    help_url: '', // Default: no Help URL
  },
  reducers: {
    enableMessage: (state, action) => {
//      console.log('messageModal enabled','state=',state,'state.show=',state.show,'action=',action);
      if (!state.show) { // If state not showing, then initialize else append
        state.show = true;
        state.header = action.payload.header;
        state.messages = [{message:action.payload.message, variant:action.payload.variant}];
        state.help_url = action.payload.help_url;
      } else {
        state.messages.push({message:action.payload.message, variant:action.payload.variant});
      }
    },
    disableMessage: (state, action) => {
//      console.log('messageModal disabled','state=',state,'action=',action);
      state.show = false;
    }
  }
});

export const { enableMessage, disableMessage } = messageModalSlice.actions;

export default messageModalSlice.reducer;
