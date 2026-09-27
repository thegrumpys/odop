// Search tracing is intentionally opt-in.  Set REACT_APP_PATSH_TRACE=true
// before starting the client when diagnosing legacy/Wasm search parity.
export const patshTraceEnabled = () => process.env.REACT_APP_PATSH_TRACE === 'true';
