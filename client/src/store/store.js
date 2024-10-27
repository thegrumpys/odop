import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reducers from "./reducers";
import dispatcher from './middleware/dispatcher';
import { ERR } from '../components/Alerts';
import { initialSystemControls } from '../initialSystemControls';
import config from '../config';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

const default_state = {
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
    stopOnFileLoad: true, // flag for guidedDesign execute macro
    testGenerate: config.node.env !== "production" ? true : false,
    lines: '',
  },
  messageSlice: {
    show: false, // Default: do not display
    header: '', // Default: no header
    messages: [], // Default: no messages
    help_url: '', // Default: no Help URL
  },
  user: null,
  name: config.url.name,
  view: config.url.view,
  model: {
    type: null,
    result: {
      objective_value: 0
    },
    system_controls: initialSystemControls
  },
  enableDispatcher: true,
  spinnerSlice: {
    show: false
  }
};

// Create a store with an empty model where type is null
export default createStore(reducers, default_state, middleware);

export const shadow_store = createStore(reducers, JSON.parse(JSON.stringify(default_state)), middleware);
