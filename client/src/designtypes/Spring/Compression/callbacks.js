
import { registerSymbolCallback } from '../../../store/callbackRegistry';
import { changeSymbolHidden, changeSymbolInput, changeSymbolValue, changeSymbolFormat, saveSymbolValue, restoreSymbolValue } from '../../../store/actions';
import * as sto from './symbol_table_offsets';

export function onPropCalcMethodChange(store, value) {
  const matState = store.getState().model.symbol_table[sto.Material_Type];
  console.log('onPropCalcMethodChange','store=',store,'value=',value,'matState=',matState);
  switch (value) {
    default:
    case 1:
      if (matState && matState.oldvalue !== undefined) {
        store.dispatch(restoreSymbolValue('Material_Type'));
        store.dispatch(changeSymbolFormat('Material_Type', 'table'));
      }

      store.dispatch(changeSymbolHidden('Material_Type', false));
      store.dispatch(changeSymbolHidden('ASTM/Fed_Spec', false));
      store.dispatch(changeSymbolHidden('Process', false));
      store.dispatch(changeSymbolHidden('Life_Category', false));
      store.dispatch(changeSymbolHidden('%_Tensile_Endur', false));
      store.dispatch(changeSymbolHidden('%_Tensile_Stat', false));

      store.dispatch(changeSymbolInput('Density', false));
      store.dispatch(changeSymbolInput('Torsion_Modulus', false));
      store.dispatch(changeSymbolInput('Hot_Factor_Kh', false));
      store.dispatch(changeSymbolInput('Tensile', false));
      store.dispatch(changeSymbolInput('%_Tensile_Endur', false));
      store.dispatch(changeSymbolInput('%_Tensile_Stat', false));
      store.dispatch(changeSymbolInput('Stress_Lim_Endur', false));
      store.dispatch(changeSymbolInput('Stress_Lim_Stat', false));
      break;

    case 2:
      if (!matState || matState.oldvalue === undefined) {
        store.dispatch(saveSymbolValue('Material_Type'));
        store.dispatch(changeSymbolFormat('Material_Type', 'string'));
        store.dispatch(changeSymbolValue('Material_Type', 'User_Specified'));
      }

      store.dispatch(changeSymbolHidden('Material_Type', false));
      store.dispatch(changeSymbolHidden('ASTM/Fed_Spec', true));
      store.dispatch(changeSymbolHidden('Process', true));
      store.dispatch(changeSymbolHidden('Life_Category', true));
      store.dispatch(changeSymbolHidden('%_Tensile_Endur', false));
      store.dispatch(changeSymbolHidden('%_Tensile_Stat', false));

      store.dispatch(changeSymbolInput('Density', true));
      store.dispatch(changeSymbolInput('Torsion_Modulus', true));
      store.dispatch(changeSymbolInput('Hot_Factor_Kh', true));
      store.dispatch(changeSymbolInput('Tensile', true));
      store.dispatch(changeSymbolInput('%_Tensile_Endur', true));
      store.dispatch(changeSymbolInput('%_Tensile_Stat', true));
      store.dispatch(changeSymbolInput('Stress_Lim_Endur', false));
      store.dispatch(changeSymbolInput('Stress_Lim_Stat', false));
      break;

    case 3:
      if (!matState || matState.oldvalue === undefined) {
        store.dispatch(saveSymbolValue('Material_Type'));
        store.dispatch(changeSymbolFormat('Material_Type', 'string'));
        store.dispatch(changeSymbolValue('Material_Type', 'User_Specified'));
      }

      store.dispatch(changeSymbolHidden('Material_Type', false));
      store.dispatch(changeSymbolHidden('ASTM/Fed_Spec', true));
      store.dispatch(changeSymbolHidden('Process', true));
      store.dispatch(changeSymbolHidden('Life_Category', true));
      store.dispatch(changeSymbolHidden('%_Tensile_Endur', true));
      store.dispatch(changeSymbolHidden('%_Tensile_Stat', true));

      store.dispatch(changeSymbolInput('Density', true));
      store.dispatch(changeSymbolInput('Torsion_Modulus', true));
      store.dispatch(changeSymbolInput('Hot_Factor_Kh', true));
      store.dispatch(changeSymbolInput('Tensile', true));
      store.dispatch(changeSymbolInput('%_Tensile_Endur', false));
      store.dispatch(changeSymbolInput('%_Tensile_Stat', false));
      store.dispatch(changeSymbolInput('Stress_Lim_Stat', true));
      store.dispatch(changeSymbolInput('Stress_Lim_Endur', true));
      break;
  }
}

registerSymbolCallback('Spring/Compression', 'Prop_Calc_Method', onPropCalcMethodChange);
