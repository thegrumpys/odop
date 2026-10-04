import { createCompressionSpringWasmBridge } from '../../../store/middleware/compressionSpringWasmBridge';
import { changeSymbolValue, fixSymbolValue, loadInitialState, setSymbolFlag, seek } from '../../../store/actions';
import { CHANGE_SYMBOL_VALUE, FIX_SYMBOL_VALUE, LOAD_INITIAL_STATE, SET_SYMBOL_FLAG } from '../../../store/types';
import { MIN, MAX, FIXED } from '../../../store/actionTypes';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';

function storeFor(model = initialState) {
    const dispatched = [];
    return {
        dispatched,
        getState: () => ({ model }),
        dispatch: (action) => dispatched.push(action)
    };
}

it('feature-enabled bridge marks legacy calculation handled and hydrates one authoritative Worker transaction', async () => {
    const snapshot = [{ id: 'Wire_Dia', numericValue: .12, minimumViolation: 0, maximumViolation: 0, minimumScaleDenominator: .1, maximumScaleDenominator: .2 }];
    const client = { hydrate: jest.fn(() => Promise.resolve({ snapshot })), applyChanges: jest.fn() };
    const store = storeFor();
    const forwarded = [];
    const bridge = createCompressionSpringWasmBridge(client, () => true)(store)((action) => forwarded.push(action));
    bridge(changeSymbolValue('Wire_Dia', .12));
    await Promise.resolve();
    expect(forwarded).toHaveLength(1);
    expect(forwarded[0]).toMatchObject({ type: CHANGE_SYMBOL_VALUE, meta: { wasmComputationHandled: true } });
    expect(client.hydrate).toHaveBeenCalledTimes(1);
    expect(client.applyChanges).not.toHaveBeenCalled();
    expect(store.dispatched[0]).toMatchObject({ type: 'modelSlice/applyWasmComputationSnapshot', payload: { snapshot } });
    expect(store.dispatched).toContainEqual(expect.objectContaining({ type: 'alertsSlice/clearAlerts' }));
});

it('executes Seek after first-use hydration and suppresses the legacy Seek dispatcher', async () => {
  const client = { hydrate: jest.fn(() => Promise.resolve({ snapshot: [] })), seek: jest.fn(() => Promise.resolve({ snapshot: [], objective: .01, termination: 'Seek completed.' })) };
  const store = storeFor();
  const next = jest.fn();
  const bridge = createCompressionSpringWasmBridge(client, () => true)(store)(next);
  bridge(seek('Force_2', MAX));
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(next).toHaveBeenCalledWith(expect.objectContaining({ meta: { wasmComputationHandled: true } }));
  expect(client.hydrate).toHaveBeenCalledTimes(1);
  expect(client.seek).toHaveBeenCalledWith('Force_2', MAX, expect.stringMatching(/^seek-/));
  expect(store.dispatched[0].payload.termination_condition).toBe('Seek completed.');
});

it('does not launch Seek when first-use hydration was superseded by a later edit', async () => {
  const client = { hydrate: jest.fn(() => Promise.resolve({ stale: true })), seek: jest.fn() };
  const bridge = createCompressionSpringWasmBridge(client, () => true)(storeFor())(jest.fn());
  bridge(seek('Weight', MIN));
  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(client.seek).not.toHaveBeenCalled();
});

it('feature-disabled bridge leaves actions untouched and does not start a Worker request', () => {
    const client = { hydrate: jest.fn(), applyChanges: jest.fn() };
    const store = storeFor();
    const forwarded = [];
    const bridge = createCompressionSpringWasmBridge(client, () => false)(store)((action) => forwarded.push(action));
    const action = changeSymbolValue('Wire_Dia', .12);
    bridge(action);
    expect(forwarded).toEqual([action]);
    expect(client.hydrate).not.toHaveBeenCalled();
});

it('lets the legacy dispatcher initialize a loaded design before hydrating the Worker', async () => {
    const snapshot = [{ id: 'Density', numericValue: .284 }];
    const client = { hydrate: jest.fn(() => Promise.resolve({ snapshot })), applyChanges: jest.fn() };
    const store = storeFor();
    const forwarded = [];
    const bridge = createCompressionSpringWasmBridge(client, () => true)(store)((action) => forwarded.push(action));
    bridge(loadInitialState('Spring/Compression'));
    await Promise.resolve();
    expect(forwarded[0].type).toBe(LOAD_INITIAL_STATE);
    expect(forwarded[0].meta && forwarded[0].meta.wasmComputationHandled).toBeFalsy();
    expect(client.hydrate).toHaveBeenCalledTimes(1);
});

it('synchronizes completed fix and constraint-flag transactions without suppressing their legacy reducer semantics', async () => {
    const snapshot = [{ id: 'Wire_Dia', numericValue: .12 }];
    const client = { hydrate: jest.fn(() => Promise.resolve({ snapshot })), applyChanges: jest.fn() };
    const store = storeFor();
    const forwarded = [];
    const bridge = createCompressionSpringWasmBridge(client, () => true)(store)((action) => forwarded.push(action));
    bridge(fixSymbolValue('Wire_Dia', .12));
    bridge(setSymbolFlag('L_2', MIN, FIXED));
    await Promise.resolve();
    expect(forwarded.map((action) => action.type)).toEqual([FIX_SYMBOL_VALUE, SET_SYMBOL_FLAG]);
    expect(forwarded.every((action) => !action.meta || !action.meta.wasmComputationHandled)).toBe(true);
    expect(client.hydrate).toHaveBeenCalledTimes(2);
    expect(client.applyChanges).not.toHaveBeenCalled();
});
