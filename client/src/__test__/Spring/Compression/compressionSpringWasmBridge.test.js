import { createCompressionSpringWasmBridge } from '../../../store/middleware/compressionSpringWasmBridge';
import { changeSymbolValue } from '../../../store/actions';
import { CHANGE_SYMBOL_VALUE } from '../../../store/types';
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
