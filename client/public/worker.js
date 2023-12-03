import { dispatcher } from '../src/store/middleware/dispatcher';
onmessage = function(e) {
  console.log('Worker: Message received from main script e=',e);
  const local_store = createStore(reducers, e.data, applyMiddleware(dispatcher));
  postMessage(e.data);
}