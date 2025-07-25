import { changeSymbolConstraint } from '../actions';

export function pxPropagate(p, x, store) {
//    console.log('Start pxPropagate store=',store);
    var design = store.getState(); // Re-access store to get latest source values
//    console.log('pxPropagate design=',design);
    var ip = 0;
    var ix = 0;
    var value;
    function nameMatch(entry) {
      return design.model.symbol_table.find(sink => entry.name === sink.name)
    }
    for (let i = 0; i < design.model.symbol_table.length; i++) {
        var source = design.model.symbol_table[i];
//        console.log('pxPropagate source=',source);
        if (source.type === "equationset" && source.input) {
            value = p[ip++];
        } else {
            value = x[ix++];
        }
        if (source.propagate !== undefined) {
//             console.log('pxPropagate source.propagate=',source.propagate);
            for (let j = 0; j < source.propagate.length; j++) {
                var entry = source.propagate[j];
                var sink = nameMatch(entry);
//                console.log('pxPropagate source=',source,'sink=',sink);
//                console.log('pxPropagate sink.name=',sink.name,'entry.minmax=',entry.minmax,'value=',value);
                store.dispatch(changeSymbolConstraint(sink.name, entry.minmax, value, true)); // no dispatch
            }
        }
    }
//    console.log('</ul><li>','End pxPropagate','</li>');
}