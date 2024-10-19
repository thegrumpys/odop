import { changeSymbolValue } from '../actions';

// If any of the Catalog entries are changed,
// then reset Catalog Name and Number to blank
export function resetCatalogSelection(store, action) {
//    console.log('Start resetCatalogSelection store=',store,'action=',action);
    if (action.payload.name === "OD_Free" || // Compression and Extension
        action.payload.name === "Wire_Dia" || // Compression and Extension
        action.payload.name === "L_Free" || // Compression Only
        action.payload.name === "Coils_T" || // Compression and Extension
        action.payload.name === "Initial_Tension" || // Extension Only
        action.payload.name === "Material_Type" || // Compression and Extension
        action.payload.name === "End_Type") { // Compression and Extension
        store.dispatch(changeSymbolValue('Catalog_Name', ''))
        store.dispatch(changeSymbolValue('Catalog_Number', ''))
    }
//    console.log('</ul><li>','End resetCatalogSelection','</li>');
}
