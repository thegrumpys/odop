import { changeSymbolConstraint } from '../actions';

export function propagate(store) {
//    console.log('Start propagate store=',store);
    var design = store.getState(); // Re-access store to get latest source values
//    console.log('propagate design=',design);
    var value;
    function nameMatch(entry) {
      return design.model.symbol_table.find(sink => entry.name === sink.name)
    }
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var source = design.model.symbol_table[i];
//        console.log('propagate source=',source);
        value = source.value;
        if (source.propagate !== undefined) {
//            console.log('propagate source.propagate=',source.propagate);
            for (let j = 0; j < source.propagate.length; j++) {
                var entry = source.propagate[j];
                var sink = nameMatch(entry);
//                console.log('propagate source=',source,'sink=',sink);
//                console.log('propagate sink.name=',sink.name,'entry.minmax=',entry.minmax,'value=',value);
                store.dispatch(changeSymbolConstraint(sink.name, entry.minmax, value, true)); // no dispatch
            }
        }
    }
//    console.log('</ul><li>','End propagate','</li>');
}