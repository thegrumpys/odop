import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from './spinnerTypes';

export default function spinnerReducers(state, action) {
  switch (action.type) {
    case ENABLE_SPINNER:
      var result = Object.assign({}, state, {
        ...state,
        spinnerSlice: {
          ...state.spinnerSlice,
          show: true
        }
      });
      return result;
    case DISABLE_SPINNER:
      var result = Object.assign({}, state, {
        ...state,
        spinnerSlice: {
          ...state.spinnerSlice,
          show: false
        }
      });
      return result;
    default:
      return state;
  }
}