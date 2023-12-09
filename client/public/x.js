export function x(design) {
    console.log('In x design=',design);
    design.name = "Mike";
    console.log('In x design.model.symbol_table[0].value=',design.model.symbol_table[0].value);
    design.model.symbol_table[0].value=1.2;
}