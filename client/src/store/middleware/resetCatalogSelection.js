import { changeSymbolValue } from '../actionCreators';

// If any of the Catalog entries are changed,
// then reset Catalog Name and Number to blank
export function resetCatalogSelection(store, action) {
//    console.log('Entering resetCatalogSelection store=',store,'action=',action);
    if (action.payload.name === "OD_free" ||
        action.payload.name === "Wire_Dia" ||
        action.payload.name === "L_Free" ||
        action.payload.name === "Coils_T" ||
        action.payload.name === "Material_Type" ||
        action.payload.name === "End_Type") {
        store.dispatch(changeSymbolValue('Catalog_Name', ''))
        store.dispatch(changeSymbolValue('Catalog_Number', ''))
    }
}
 