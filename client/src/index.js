import 'bootstrap/dist/css/bootstrap.min.css';
import App2 from "./components/App2";
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { dispatcher } from './store/middleware/dispatcher';
import { reducers } from './store/reducers';
import { Provider } from "react-redux";
import './odop.css';
import * as ReactDOMClient from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { initialSystemControls } from './initialSystemControls';
import config from './config';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

// Create a store with an empty model where type is null
const store = createStore(reducers, {
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
  }
}, middleware);

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App2 />
    </BrowserRouter>
  </Provider>
);
