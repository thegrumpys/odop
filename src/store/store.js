import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reducers from "./reducers.js";
import dispatcher from './middleware/dispatcher.js';
import { initialSystemControls } from '../initialSystemControls.js';

const middleware = compose(applyMiddleware(/* loggerMiddleware, */dispatcher));

const default_state = {
  user: null,
  name: 'Startup',
  view: 'Advanced',
  model: {
    type: null,
    result: {
      objective_value: 0
    },
    system_controls: initialSystemControls
  },
  enableDispatcher: true,
};

// Create a store with an empty model where type is null
export default createStore(reducers, default_state, middleware);

export const shadow_store = createStore(reducers, JSON.parse(JSON.stringify(default_state)), middleware);
