import * as o from './offsets';
import * as mo from '../mat_ips_offsets';
import * as eto from './endtypes_offsets';

export function init(st) {
//    console.log('Entering init st=',st);
 var i, j;
 const ten3 = 1000.0;
 var tensile_400;
 const unused = "unused";

   /*  Bring in material properties table  */
 var m_tab = require('../mat_ips.json');
//    console.log("m_tab=", m_tab);
 var et_tab = require('./endtypes.json');
//    console.log("et_tab=", et_tab);

    st[o.Spring_Type].value = "Torsion";
    if (st[o.Prop_Calc_Method].value === 2 && st[o.PC_Ten_Bnd_Endur].value === unused) st[o.Prop_Calc_Method].value = 1;
 
 switch(st[o.Prop_Calc_Method].value){
 default:
 case 1:      // Prop_Calc_Method = 1 - Use values from material table
//     console.log("case 1 - Use values from material table");
 /*   Refer to SETIDX.PLI, READMAT.PLI and TAB2D.PLI    */
 //
    i = st[o.Material_Type].value;
//    st[o.Material_Index].value = i;
//    console.log("Material_Index = st[o.Material_Type].value =", st[o.Material_Type].value);
//    console.log("Material_Index = st[o.Material_Index].value =", st[o.Material_Index].value);
    j = st[o.End_Type].value;

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
    st[o.ASTM_Fed_Spec].value = m_tab[i][mo.astm_fs] + '/' + m_tab[i][mo.fedspec];
//    if m_tab(i).kh < 1.0 then process = 'HOT_WOUND';
    if (m_tab[i][mo.kh] < 1.0) {
        st[o.Process].value = "Hot_Wound";
    }
//             else process = 'COLD_COILED';
    else {
        st[o.Process].value = "Cold_Coiled";
    }
//    density      = m_tab(i).dens;
    st[o.Density].value      = m_tab[i][mo.dens];
//    torsion_modulus  = m_tab(i).gg;
    st[o.Elastic_Modulus].value = ten3 * m_tab[i][mo.ee];
//
//    hot_factor_kh    = m_tab(i).kh;
    st[o.Hot_Factor_Kh].value = m_tab[i][mo.kh];
//    tensile_010      = m_tab(i).t010;
    st[o.tensile_010].value   = ten3 * m_tab[i][mo.t010];
//    tensile_400      = m_tab(i).t400;
    tensile_400        = ten3 * m_tab[i][mo.t400];
    
    switch(st[o.Life_Category].value){
        default:
        case 1:
        case 5:
            st[o.PC_Ten_Bnd_Endur].value = m_tab[i][mo.ptb1];
        break;
        case 2:
            st[o.PC_Ten_Bnd_Endur] = m_tab[i][mo.ptb2];
        break;
        case 3:
            st[o.PC_Ten_Bnd_Endur].value = m_tab[i][mo.ptb3];
        break;
        case 4:
            st[o.PC_Ten_Bnd_Endur].value = m_tab[i][mo.ptb4];
        break;
        case 6:
            st[o.PC_Ten_Bnd_Endur].value = m_tab[i][mo.ptb6];
        break;
        case 7:
            st[o.PC_Ten_Bnd_Endur].value = m_tab[i][mo.ptb7];
        break;
        case 8:
            st[o.PC_Ten_Bnd_Endur].value = m_tab[i][mo.ptb8];
    }
    
//    pc_tensile_stat  = m_tab(i).fy;
    st[o.PC_Ten_Bnd_Stat].value  = m_tab[i][mo.ptb1];
//    pc_tensile_bend  = m_tab(i).ptb(life_catagory);
//
//    wire_dia=p(2);
//    const_term=log10(tbase010);
    st[o.const_term].value = Math.log10(st[o.tbase010].value);
//    slope_term=(tensile_400 - tensile_010) /
//           (log10(tbase400) - const_term);
    st[o.slope_term].value = (tensile_400 - st[o.tensile_010].value) / (Math.log10(st[o.tbase400].value) - st[o.const_term].value);
//    tensile=slope_term*(log10(wire_dia)-const_term) + tensile_010;
    st[o.Tensile].value = st[o.slope_term].value * (Math.log10(st[o.Wire_Dia].value) - st[o.const_term].value) + st[o.tensile_010].value;
//    stress_lim_endur=tensile*pc_tensile_endur/100.0;
    st[o.Stress_Lim_Bnd_Endur].value = st[o.Tensile].value * st[o.PC_Ten_Bnd_Endur].value / 100.0;
//    stress_lim_stat =tensile*pc_tensile_stat /100.0;
    st[o.Stress_Lim_Bnd_Stat].value  = st[o.Tensile].value * st[o.PC_Ten_Bnd_Stat].value  / 100.0;

//    /*  copy from end type table to constants  */
//    /*  check these values.     See AS Design Hdbk. p52  */
//    /*    VVVVVVVVVVVVV          Kludge for Torsion  */
//if end_type_index > 0 & nmerit ^= 3 then
//do;
//if end_calc_method ^= 1 then              /*   debug  */
//       put skip list('TAB2D:  END_CALC_METHOD SET TO 1.');
//end_calc_method=1;
//
    // Notes: 
    // Inactive_Coils does not appear in Torsion spring eqnset.js.
    // In order to facilitate possible future developments: 
    //     Inactive_Coils is marked "hidden" in initial_state.js
    //     The following line is carried forward 
    // Lower case for the eto subscript is established in endtypes_offsets.js
//
//end_type        = end_name(end_type_index);
//inactive_coils  = inact_coil_tbl(end_type_index);
    st[o.Inactive_Coils].value = et_tab[j][eto.inactive_coils];
    break;

 case 2:     // Prop_Calc_Method = 2 - Specify Tensile, %_Tensile_Stat & %_Tensile_Endur
//     console.log("case 2 - Specify Tensile, %_Tensile_Stat & %_Tensile_Endur");
     st[o.ASTM_Fed_Spec].value = unused;
     st[o.Material_File].value = unused;
     st[o.Process].value = unused;
     break;

 case 3:     // Prop_Calc_Method = 3 - Specify Stress_Lim_Stat & Stress_Lim_Endur
//     console.log("case 3 - Specify Stress_Lim_Stat & Stress_Lim_Endur");
     st[o.ASTM_Fed_Spec].value = unused;
     st[o.Material_File].value = unused;
     st[o.Process].value = unused;
     st[o.PC_Ten_Bnd_Endur].value = unused;
     st[o.PC_Ten_Bnd_Stat].value  = unused;
 }
//    console.log('Exiting init st=',st);
    return st;

}
