const callbacks = {};

export function registerSymbolCallback(type, name, fn) {
  console.log('registerSymbolCallback','type=',type,'name=',name);
  if (!callbacks[type]) {
    callbacks[type] = {};
  }
  if (!callbacks[type][name]) {
    callbacks[type][name] = [];
  }
  callbacks[type][name].push(fn);
  console.log('registerSymbolCallback','callbacks=',callbacks);
}

export function invokeSymbolCallbacks(store, name, value) {
  const type = store.getState().model.type;
  console.log('invokeSymbolCallbacks','type=',type,'name=',name,'value=',value);
  const cbs = callbacks[type] && callbacks[type][name];
  if (cbs) {
    cbs.forEach(cb => {
      try {
        cb(store, value);
      } catch (err) {
        console.error('callbackRegistry', err);
      }
    });
  }
}
