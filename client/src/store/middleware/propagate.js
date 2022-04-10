import { changeSymbolConstraint } from '../actionCreators';

export function propagate(store) {
    console.log('<li>','Start propagate store=',store,'</li><ul>');
    var design = store.getState(); // Re-access store to get latest source values
//    console.log('In propagate design=',design);
    design.model.symbol_table.forEach((source) => {
//        console.log('In propagate source=',source);
        if (source.propagate !== undefined) {
//            console.log('In propagate source.propagate=',source.propagate);
            source.propagate.forEach(entry => {
//                console.log('In propagate entry.name=',entry.name);
                var sink = design.model.symbol_table.find(sink => entry.name === sink.name);
//                console.log('In propagate source=',source,'sink=',sink);
//                console.log('In propagate sink.name=',sink.name,'entry.minmax=',entry.minmax,'source.value=',source.value);
                store.dispatch(changeSymbolConstraint(sink.name, entry.minmax, source.value))
            });
        }
    });
    console.log('</ul><li>','End propagate','</li>');
}