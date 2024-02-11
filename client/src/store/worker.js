import { createStore, applyMiddleware, compose } from "redux";
import { expose, transferHandlers } from "comlink";
import ignoreFunctionsTransferHandler from "./ignore-functions-transfer-handler";
import { reducers } from './reducers';
import { initialSystemControls } from '../initialSystemControls';
import config from '../config';
import { dispatcher } from './middleware/dispatcher';

console.log('starting worker.js');

transferHandlers.set("IGNORE_FUNCTIONS", ignoreFunctionsTransferHandler);

console.log('in worker.js reducers=',reducers);
/* eslint-disable no-underscore-dangle */
const composeEnhancers = compose;
/* eslint-enable */
const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

// Create a store with an empty model where type is null
const store = createStore(reducers, {
    user: null,
    name: 'Junk',
    view: config.url.view,
    model: {
        type: config.url.type,
        symbol_table: [],
        result: {
            objective_value: 0
        },
        system_controls: initialSystemControls
    }
}, middleware);
console.log('in worker.js store=',store);
expose(store);
console.log('ending worker.js');
