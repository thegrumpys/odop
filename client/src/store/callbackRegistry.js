const callbacks = {};

export function registerSymbolCallback(type, name, fn) {
  if (!callbacks[type]) {
    callbacks[type] = {};
  }
  if (!callbacks[type][name]) {
    callbacks[type][name] = [];
  }
  callbacks[type][name].push(fn);
}

export function invokeSymbolCallbacks(store, name, value) {
  const type = store.getState().model.type;
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
