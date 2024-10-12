import * as o from './offsets';
import * as mo from '../mat_offsets';
import * as eto from './endtypes_offsets';
import { changeSymbolInput, changeSymbolHidden } from '../../../store/modelActions';

export function init(store, p, x) {
//    console.log('In init store=',store,'p=',p,'x=',x);
 var i, j;
 var m_tab;
 const ten3 = 1000.0;
 var tensile_400;
 const e_end_num = 5;

   /*  Bring in material properties table  */
 if (x[o.Material_File] === "mat_metric.json") m_tab = require('../mat_metric.json');
 else m_tab = require('../mat_us.json');
//    console.log('m_tab=', m_tab);
 var et_tab = require('./endtypes.json');
//console.log('et_tab=', et_tab);
 var si_tab = require('./si_range.json');
//console.log('et_tab=', et_tab);

     x[o.Spring_Type] = "Extension";
     j = x[o.End_Type];

 switch(x[o.Prop_Calc_Method]){
 default:
 case 1:      // Prop_Calc_Method = 1 - Use values from material table
//     console.log('case 1 - Use values from material table');
 /*   Refer to SETIDX.PLI, READMAT.PLI and TAB2D.PLI    */
 //
    i = x[o.Material_Type];
//    x[o.Material_Index] = i;
//    console.log('Material_Index = x[o.Material_Type] =', x[o.Material_Type]);
//    console.log('Material_Index = x[o.Material_Index] =', x[o.Material_Index]);

     /*  taken from READMAT.PLI
      *  Initial manipulations of material array
      */
    // temp = 1000.0;
    // m_tab(i).astm_fs=m_tab(i).astm_fs || '/' || fedspec;
    // m_tab(i).ee =    temp*m_tab(i).ee;
    // m_tab(i).gg =    temp*m_tab(i).gg;
    // m_tab(i).t010 =  temp*m_tab(i).t010;
    // m_tab(i).t400 =  temp*m_tab(i).t400;
    // m_tab(i).fy =    m_tab(i).pte(1);             /*  remove  */
    // m_tab(i).pte(5) =m_tab(i).fy;
    // m_tab(i).ptb(5) =m_tab(i).ptb(1);
    // temp1=m_tab(i).gg;
//
//    material_type    = m_tab(material_index).matnam;
//    astm_fed_spec    = m_tab(i).astm_fs;
    x[o.ASTM_Fed_Spec] = m_tab[i][mo.astm_fs] + '/' + m_tab[i][mo.fedspec];
//    if m_tab(i).kh < 1.0 then process = 'HOT_WOUND';
    if (m_tab[i][mo.kh] < 1.0) {
        x[o.Process] = "Hot_Wound";
    }
//             else process = 'COLD_COILED';
    else {
        x[o.Process] = "Cold_Coiled";
    }
//    density      = m_tab(i).dens;
    x[o.Density]      = m_tab[i][mo.dens];
//    torsion_modulus  = m_tab(i).gg;
    x[o.Torsion_Modulus] = ten3 * m_tab[i][mo.gg];
//
//    hot_factor_kh    = m_tab(i).kh;
    x[o.Hot_Factor_Kh] = m_tab[i][mo.kh];
//    tensile_010      = m_tab(i).t010;
    x[o.tensile_010]   = ten3 * m_tab[i][mo.t010];
//    tensile_400      = m_tab(i).t400;
    tensile_400        = ten3 * m_tab[i][mo.t400];

    switch(x[o.Life_Category]){
        default:
        case 1:
        case 5:
            x[o.PC_Tensile_Endur] = m_tab[i][mo.pte1];
            x[o.PC_Tensile_Bend]  = m_tab[i][mo.ptb1];
        break;
        case 2:
            x[o.PC_Tensile_Endur] = m_tab[i][mo.pte2];
            x[o.PC_Tensile_Bend]  = m_tab[i][mo.ptb2];
        break;
        case 3:
            x[o.PC_Tensile_Endur] = m_tab[i][mo.pte3];
            x[o.PC_Tensile_Bend]  = m_tab[i][mo.ptb3];
        break;
        case 4:
            x[o.PC_Tensile_Endur] = m_tab[i][mo.pte4];
            x[o.PC_Tensile_Bend]  = m_tab[i][mo.ptb4];
        break;
        case 6:
            x[o.PC_Tensile_Endur] = m_tab[i][mo.pte6];
            x[o.PC_Tensile_Bend]  = m_tab[i][mo.ptb6];
        break;
        case 7:
            x[o.PC_Tensile_Endur] = m_tab[i][mo.pte7];
            x[o.PC_Tensile_Bend]  = m_tab[i][mo.ptb7];
        break;
        case 8:
            x[o.PC_Tensile_Endur] = m_tab[i][mo.pte8];
            x[o.PC_Tensile_Bend]  = m_tab[i][mo.ptb8];
    }

//    pc_tensile_stat  = m_tab(i).fy;
    x[o.PC_Tensile_Stat]  = m_tab[i][mo.pte1];
//    pc_tensile_bend  = m_tab(i).ptb(life_catagory);
//
//    wire_dia=p(2);
//    const_term=log10(tbase010);
    x[o.const_term] = Math.log10(x[o.tbase010]);
//    slope_term=(tensile_400 - tensile_010) /
//           (log10(tbase400) - const_term);
    x[o.slope_term] = (tensile_400 - x[o.tensile_010]) / (Math.log10(x[o.tbase400]) - x[o.const_term]);
//    tensile=slope_term*(log10(wire_dia)-const_term) + tensile_010;
    x[o.Tensile] = x[o.slope_term] * (Math.log10(p[o.Wire_Dia]) - x[o.const_term]) + x[o.tensile_010];
//    stress_lim_endur=tensile*pc_tensile_endur/100.0;
    x[o.Stress_Lim_Endur] = x[o.Tensile] * x[o.PC_Tensile_Endur] / 100.0;
//    stress_lim_stat =tensile*pc_tensile_stat /100.0;
    x[o.Stress_Lim_Stat]  = x[o.Tensile] * x[o.PC_Tensile_Stat]  / 100.0;
    x[o.Stress_Lim_Bend]  = x[o.Tensile] * x[o.PC_Tensile_Bend]  / 100.0;

      /*
       *  copy from end type table to Calculation Inputs
       *  check these values.     See AS Design Hdbk. p52
       */

    //if end_type_index > c_end_num then
//  hook_deflect_all=hda_tbl(end_type_index-c_end_num);
//else
//  hook_deflect_all=0.0;
    if (x[o.End_Type] <= e_end_num) {
        x[o.Hook_Deflect_All] = et_tab[j][eto.HookDefAll];
    }

// End_ID, Extended_End_ID, L_End and L_Extended_End are also calculated in eqnset
    if (x[o.End_Type] <= e_end_num) {
        x[o.End_ID] = x[o.ID_Free];
        x[o.Extended_End_ID] = x[o.ID_Free];
        x[o.L_End] = x[o.ID_Free] * et_tab[j][eto.End_Dia];
        x[o.L_Extended_End] = x[o.L_End];
//        console.log('init: x[o.End_Type] = ', x[o.End_Type]);
//        console.log('    x[o.End_ID] = ', x[o.End_ID]);
//        console.log('    x[o.Extended_End_ID] = ', x[o.Extended_End_ID]);
//        console.log('    x[o.L_End] = ', x[o.L_End]);
//        console.log('    x[o.L_Extended_End] = ', x[o.L_Extended_End]);
    }
//    console.log('init: x[o.SI_Range] = ', x[o.SI_Range]);
    if (x[o.SI_Range] <= 2 ) {
        x[o.SI_Lo_Factor] = m_tab[i][mo.silf];
        if (x[o.SI_Range] === 2) {
            x[o.SI_Lo_Factor] = m_tab[i][mo.silf] / 2.0;    // see issue #544
            x[o.SI_Hi_Factor] = m_tab[i][mo.sisr];
        }
        else {
            x[o.SI_Hi_Factor] = m_tab[i][mo.sihf];
        }
    }

    store.dispatch(changeSymbolHidden("ASTM/Fed_Spec", false));
    store.dispatch(changeSymbolHidden("Material_Type", false));
    store.dispatch(changeSymbolHidden("Process", false));
    store.dispatch(changeSymbolHidden("Life_Category", false));
    store.dispatch(changeSymbolHidden("%_Tensile_Endur", false));
    store.dispatch(changeSymbolHidden("%_Tensile_Stat", false));
    store.dispatch(changeSymbolHidden("%_Tensile_Bend", false));

    store.dispatch(changeSymbolInput("ASTM/Fed_Spec", false));
    store.dispatch(changeSymbolInput("Process", false));
    store.dispatch(changeSymbolInput("Density", false));
    store.dispatch(changeSymbolInput("Torsion_Modulus", false));
    store.dispatch(changeSymbolInput("Hot_Factor_Kh", false));
    store.dispatch(changeSymbolInput("Tensile", false));
    store.dispatch(changeSymbolInput("%_Tensile_Stat", false));
    store.dispatch(changeSymbolInput("%_Tensile_Endur", false));
    store.dispatch(changeSymbolInput("%_Tensile_Bend", false));
    store.dispatch(changeSymbolInput("Stress_Lim_Stat", false));
    store.dispatch(changeSymbolInput("Stress_Lim_Endur", false));
    store.dispatch(changeSymbolInput("Stress_Lim_Bend", false));
    break;

 case 2:     // Prop_Calc_Method = 2 - Specify Tensile, %_Tensile_Stat & %_Tensile_Endur
//     console.log('case 2 - Specify Tensile, %_Tensile_Stat & %_Tensile_Endur');
     store.dispatch(changeSymbolHidden("ASTM/Fed_Spec", true));
     store.dispatch(changeSymbolHidden("Material_Type", true));
     store.dispatch(changeSymbolHidden("Process", true));
     store.dispatch(changeSymbolHidden("Life_Category", true));
     store.dispatch(changeSymbolHidden("%_Tensile_Endur", false));
     store.dispatch(changeSymbolHidden("%_Tensile_Stat", false));
     store.dispatch(changeSymbolHidden("%_Tensile_Bend", false));

     store.dispatch(changeSymbolInput("ASTM/Fed_Spec", false));
     store.dispatch(changeSymbolInput("Process", false));
     store.dispatch(changeSymbolInput("Density", true));
     store.dispatch(changeSymbolInput("Torsion_Modulus", true));
     store.dispatch(changeSymbolInput("Hot_Factor_Kh", true));
     store.dispatch(changeSymbolInput("Tensile", true));
     store.dispatch(changeSymbolInput("%_Tensile_Endur", true));
     store.dispatch(changeSymbolInput("%_Tensile_Stat", true));
     store.dispatch(changeSymbolInput("%_Tensile_Bend", true));
     store.dispatch(changeSymbolInput("Stress_Lim_Stat", false));
     store.dispatch(changeSymbolInput("Stress_Lim_Endur", false));
     store.dispatch(changeSymbolInput("Stress_Lim_Bend", false));
     break;

 case 3:     // Prop_Calc_Method = 3 - Specify Stress_Lim_Stat & Stress_Lim_Endur
//     console.log('case 3 - Specify Stress_Lim_Stat & Stress_Lim_Endur');
     store.dispatch(changeSymbolHidden("ASTM/Fed_Spec", true));
     store.dispatch(changeSymbolHidden("Material_Type", true));
     store.dispatch(changeSymbolHidden("Process", true));
     store.dispatch(changeSymbolHidden("Life_Category", true));
     store.dispatch(changeSymbolHidden("%_Tensile_Endur", true));
     store.dispatch(changeSymbolHidden("%_Tensile_Stat", true));
     store.dispatch(changeSymbolHidden("%_Tensile_Bend", true));

     store.dispatch(changeSymbolInput("ASTM/Fed_Spec", false));
     store.dispatch(changeSymbolInput("Process", false));
     store.dispatch(changeSymbolInput("Density", true));
     store.dispatch(changeSymbolInput("Torsion_Modulus", true));
     store.dispatch(changeSymbolInput("Hot_Factor_Kh", true));
     store.dispatch(changeSymbolInput("Tensile", true));
     store.dispatch(changeSymbolInput("%_Tensile_Endur", false));
     store.dispatch(changeSymbolInput("%_Tensile_Stat", false));
     store.dispatch(changeSymbolInput("%_Tensile_Bend", false));
     store.dispatch(changeSymbolInput("Stress_Lim_Stat", true));
     store.dispatch(changeSymbolInput("Stress_Lim_Endur", true));
     store.dispatch(changeSymbolInput("Stress_Lim_Bend", true));
 }

 if (et_tab[j][eto.end_type] === "User_Specified") {
     store.dispatch(changeSymbolInput("Hook_Deflect_All", true));
     store.dispatch(changeSymbolInput("End_ID", true));
     store.dispatch(changeSymbolInput("Extended_End_ID", true));
     store.dispatch(changeSymbolInput("L_End", true));
     store.dispatch(changeSymbolInput("L_Extended_End", true));
 } else {
     store.dispatch(changeSymbolInput("Hook_Deflect_All", false));
     store.dispatch(changeSymbolInput("End_ID", false));
     store.dispatch(changeSymbolInput("Extended_End_ID", false));
     store.dispatch(changeSymbolInput("L_End", false));
     store.dispatch(changeSymbolInput("L_Extended_End", false));
 }

 if (si_tab[x[o.SI_Range]][0] === "User_Specified") {
     store.dispatch(changeSymbolInput("SI_Lo_Factor", true));
     store.dispatch(changeSymbolInput("SI_Hi_Factor", true));
 } else {
     store.dispatch(changeSymbolInput("SI_Lo_Factor", false));
     store.dispatch(changeSymbolInput("SI_Hi_Factor", false));
 }
//    console.log('In init p=',p,' x=',x);
    return x;

}
