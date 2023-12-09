/* eslint-disable no-restricted-globals */
//import { createStore, applyMiddleware } from 'redux';
//import { reducers } from '../src/store/reducers';
//import { dispatcher } from '../src/store/middleware/dispatcher';
import { x } from './x.js';
console.log('In worker: x=',x);
console.log('In worker: Starting worker');
onerror = function(err) {
  postMessage(err);
  console.log('In worker.onerror err=',err);
}
onmessage = function(e) {
  console.log('In worker.onmessage: Message received from main script e=',e);
//  const local_store = createStore(reducers, e.data, applyMiddleware(dispatcher));
  x(e.data);
  console.log('In worker.onmessage: Message posting to main script e=',e);
  postMessage(e.data);
}
console.log('In worker: Ending worker');
