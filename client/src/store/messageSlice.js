import { createSlice, current } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState: {
    show: false, // Default: do not display
    header: '', // Default: no header
    messages: [], // Default: no messages
    help_url: '', // Default: no Help URL
  },
  reducers: {
    addMessage: (state, action) => {
//      console.log('message add','state=',state,'action=',action);
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
//      console.log('message disabled','state=',state,'action=',action);
      state.show = false;
    }
  }
});

export const { addMessage, disableMessage } = messageSlice.actions;

export default messageSlice.reducer;
