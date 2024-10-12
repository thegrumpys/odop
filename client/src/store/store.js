import { legacy_createStore as createStore, applyMiddleware, compose, combineReducers } from 'redux';
import spinnerReducers from "./spinnerReducers";
import messageReducers from "./messageReducers";
import modelReducers from "./modelReducers";
import alertsReducers from "./alertsReducers";
import executePanelReducers from "./executePanelReducers";
import dispatcher from './middleware/dispatcher';
import { ERR } from '../components/Alerts';
import { initialSystemControls } from '../initialSystemControls';
import config from '../config';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

const reducers = combineReducers({
  alertsSlice: alertsReducers,
  executePanelSlice: executePanelReducers,
  modelSlice: modelReducers,
  messageSlice: messageReducers,
  spinnerSlice: spinnerReducers,
});

// Create a store with an empty model where type is null
export default createStore(reducers, {
  alertsSlice: {
    alerts: [],
    activeKey: null,
    caret: "fas fa-caret-right",
    level: ERR,
  },
  executePanelSlice: {
    show: false,
    executeName: undefined,
    prefix: '',
    states: [],
    step: 0,
    stop_on_file_load: true, // flag for guidedDesign execute macro
//    testGenerate: config.node.env !== "production" ? true : false,
  },
  modelSlice: {
    user: null,
    name: config.url.name,
    view: config.url.view,
    model: {
      type: null,
      result: {
        objective_value: 0
      },
      system_controls: initialSystemControls
    }
  },
  messageSlice: {
    show: false, // Default: do not display
    header: '', // Default: no header
    messages: [], // Default: no messages
    help_url: '', // Default: no Help URL
  },
  spinnerSlice: {
    show: false
  },
}, middleware);
