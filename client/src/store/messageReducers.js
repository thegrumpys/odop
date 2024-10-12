import {
  ADD_MESSAGE,
  DISABLE_MESSAGE
} from './messageTypes';

export default function messageReducers(state, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      var result;
      if (!state.show) {
        result = Object.assign({}, state, {
          ...state,
          messageSlice: {
            ...state.messageSlice,
            show: true,
            header: action.payload.header,
            messages: [{ message: action.payload.message, variant: action.payload.variant }],
            help_url: action.payload.help_url,
          }
        });
      } else {
        result = Object.assign({}, state, {
            ...state,
            messageSlice: {
              ...state.messageSlice,
              messages: [...state.messages, { message: action.payload.message, variant: action.payload.variant }]
            }
        });
      }
      return result;
    case DISABLE_MESSAGE:
      var result = Object.assign({}, state, {
        ...state,
        messageSlice: {
          ...state.messageSlice,
          show: false
        }
      });
      return result;
    default:
      return state;
  }
}
