import tutor3Page05 from './fixtures/tutor3-page05-search.json';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { inject, enableDispatcher, loadInitialState, changeLabelsValue, setSymbolFlag, changeSymbolConstraint, fixSymbolValue, search } from '../../../store/actions';
import { MAX, CONSTRAINED } from '../../../store/actionTypes';
import store from '../../../store/store';

const selectedSymbols = Object.keys(tutor3Page05.expectedLegacySearch.symbols);

// This fixture is deliberately the state between Tutor 3 pages 05 and 06.
// It permits an isolated Search regression test without replaying the tutorial.
it('replays the saved Tutor 3 page-5 Search input', () => {
    const state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    store.dispatch(inject({ user: 'USERID0123456789', name: 'initialState', model: state }));
    store.dispatch(enableDispatcher(true));
    store.dispatch(loadInitialState('Spring/Compression', 'US'));
    store.dispatch(changeLabelsValue([{ name: 'COMMENT', value: 'Compression Spring Demo' }]));

    const odFree = tutor3Page05.symbolChanges.OD_Free;
    store.dispatch(setSymbolFlag('OD_Free', MAX, odFree.maximumFlags));
    store.dispatch(changeSymbolConstraint('OD_Free', MAX, odFree.maximumConstraint));
    store.dispatch(fixSymbolValue('Force_2', undefined));

    expect(store.getState().model.result.objective_value).toBeCloseTo(0.0493827, 7);
    store.dispatch(search());

    const design = store.getState().model;
    expect(design.result.objective_value).toBeCloseTo(tutor3Page05.expectedLegacySearch.objective, 12);
    expect(design.result.termination_condition).toBe(tutor3Page05.expectedLegacySearch.termination);
    selectedSymbols.forEach((name) => {
        const symbol = design.symbol_table.find((entry) => entry.name === name);
        expect(symbol.value).toBeCloseTo(tutor3Page05.expectedLegacySearch.symbols[name], 12);
    });
});
