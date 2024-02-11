import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from './components/Spinner';
import { MessageModal } from './components/MessageModal';
import Alerts from './components/Alerts';
import { Provider, connect } from 'react-redux'
import Routes from './components/Routes';
import './odop.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Beforeunload } from 'react-beforeunload';
import { logUsage } from './logUsage';
import { wrap, transferHandlers} from "comlink";
import remoteStoreWrapper from "./remote-store-wrapper.js";
import ignoreFunctionsTransferHandler from "./store/ignore-functions-transfer-handler";

console.log('starting index.js');

transferHandlers.set("IGNORE_FUNCTIONS", ignoreFunctionsTransferHandler);

//function loggerMiddleware({ getState }) {
//    return next => action => {
//      console.log('will dispatch', action);
//
//      // Call the next dispatch method in the middleware chain.
//      const returnValue = next(action)
//
//      console.log('state after dispatch', getState());
//
//      // This will likely be the action itself, unless
//      // a middleware further in chain changed it.
//      return returnValue
//    }
//  }

//console.error('In index.js ==================================================================');
//console.log('In index.js CLIENT: PUBLIC_URL =', process.env.PUBLIC_URL, 'NODE_ENV =', process.env.NODE_ENV, 'Starting on port =', process.env.PORT, 'Node version =', process.version);
//console.log('<li>','Start index.js','</li><ul>');

const worker = new Worker(
  /* webpackChunkName: "odop-worker" */ new URL('./store/worker.js', import.meta.url)
);
console.log('in index.js worker=',worker);
const remoteStore = wrap(worker);
console.log('in index.js remoteStore=',remoteStore);
const store = await remoteStoreWrapper(remoteStore);
console.log('in index.js store=',store);

logUsage('event', 'Index', { event_label: 'window.location.search=' + window.location.search });

const domNode = document.getElementById('root');
console.log('in index.js domNode=',domNode);
const root = createRoot(domNode);
console.log('in index.js root=',root);
root.render(
    <div id="root2">
        <Beforeunload onBeforeunload={(event) => {
            logUsage('event', 'BeforeUnload', { event_label: ''});
        }} />
        <Spinner />
        <MessageModal />
        <Provider store={store}>
            <>
                <Alerts />
                <Router>
                    <Routes />
                </Router>
            </>
        </Provider>
    </div>,
    document.getElementById('root')
);
console.log('ending index.js');
