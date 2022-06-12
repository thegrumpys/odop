import { changeSymbolConstraint } from '../actionCreators';

export function propagate(store) {
//    console.log('<li>','Start propagate store=',store,'</li><ul>');
    var design = store.getState(); // Re-access store to get latest source values
//    console.log('In propagate design=',design);
    var value;
    function nameMatch(entry) {
      return Object.entries(design.model.symbol_table).find(sink => entry.name === sink.name)
    }
    for (let i = 0; i < Object.entries(design.model.symbol_table).length; i++) {
        var source = Object.entries(design.model.symbol_table)[i];
//        console.log('In propagate source=',source);
        value = source.value;
        if (source.propagate !== undefined) {
//            console.log('In propagate source.propagate=',source.propagate);
            for (let j = 0; j < source.propagate.length; j++) {
                var entry = source.propagate[j];
                var sink = nameMatch(entry);
//                console.log('In propagate source=',source,'sink=',sink);
//                console.log('In propagate sink.name=',sink.name,'entry.minmax=',entry.minmax,'value=',value);
                store.dispatch(changeSymbolConstraint(sink.name, entry.minmax, value));
            }
        }
    }
//    console.log('</ul><li>','End propagate','</li>');
}