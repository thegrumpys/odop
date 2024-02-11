export default {
  canHandle: (v) => v instanceof Function,
  serialize: (v) => [0, []],
  deserialize: () => 0,
};