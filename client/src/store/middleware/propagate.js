import { changeSymbolConstraint } from '../actionCreators';

export function propagate(store) {
    
    var design = store.getState(); // Re-access store to get latest source values
//    console.log('In propagate design=',design);
    design.model.symbol_table.forEach((source) => {
//        console.log('In propagate source=',source);
        if (source.propagate != undefined) {
//            console.log('In propagate source.propagate=',source.propagate);
//            console.log('In propagate source.propagate.name=',source.propagate.name,'source.propagate.minmax=',source.propagate.minmax,'source.value=',source.value);
            var sink = design.model.symbol_table.find(sink => source.propagate.name === sink.name);
//            console.log('In propagate sink=',sink);
//            console.log('In propagate sink.name=',sink.name,'source.propagate.minmax=',source.propagate.minmax,'source.value=',source.value);
            console.log('In propagate.CHANGE_SYMBOL_VALUE source=',source,'sink=',sink);
            store.dispatch(changeSymbolConstraint(sink.name, source.propagate.minmax, source.value))
        }
    });

}