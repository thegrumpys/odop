import {
  EXECUTE_START,
  EXECUTE_STOP_ON_LOAD,
  EXECUTE_STOP,
  SET_SHOW,
  SET_EXECUTE_NAME,
  SET_PREFIX,
  SET_STATES,
  SET_STEP,
  SET_STOP_ON_FILE_LOAD,
} from './executePanelTypes';

export default function spinnerReducers(state, action) {
  switch (action.type) {
    case EXECUTE_START:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          show: action.payload.show,
          executeName: action.payload.executeName,
          prefix: action.payload.prefix,
          states: action.payload.states,
          step: action.payload.step,
          stop_on_file_load: false
        }
      });
      return result;
    case EXECUTE_STOP_ON_LOAD:
      var result;
      if (state.stop_on_file_load) {
        result = Object.assign({}, state, {
          ...state,
          executePanelSlice: {
            ...state.executePanelSlice,
            show: false,
            executeName: undefined,
            prefix: '',
            states: [],
            step: 0,
            stop_on_file_load: true
          }
        });
      } else {
        result = Object.assign({}, state);
      }
      return result;
    case EXECUTE_STOP:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          show: false,
          executeName: undefined,
          prefix: '',
          states: [],
          step: 0,
          stop_on_file_load: true
        }
      });
      return result;
    case SET_SHOW:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          show: action.payload.step
        }
      });
      return result;
    case SET_EXECUTE_NAME:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          executeName: action.payload.executeName
        }
      });
      return result;
    case SET_PREFIX:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          prefix: action.payload.prefix
        }
      });
      return result;
    case SET_STATES:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          states: action.payload.states
        }
      });
      return result;
    case SET_STEP:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          step: action.payload.step
        }
      });
      return result;
    case SET_STOP_ON_FILE_LOAD:
      var result = Object.assign({}, state, {
        ...state,
        executePanelSlice: {
          ...state.executePanelSlice,
          stop_on_file_load: action.payload.stop_on_file_load
        }
      });
      return result;
    default:
      return state;
  }
}
