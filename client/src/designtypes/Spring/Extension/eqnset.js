import * as o from './symbol_table_offsets';
import * as mo from '../mat_offsets';
import * as eto from './endtypes_offsets';
export function eqnset(st) {        /*    Extension  Spring  */
    const zero = 0.0;
    const e_end_num = 5;
    var ks, kc;
    var temp;
    var s_f, stress_avg, stress_rng, se2;
    var wire_len_t, wd3;
    var Dend, K1, C1;
    var sq1, sq2;
    var j;
    
    var et_tab = require('./endtypes.json');
//  console.log("et_tab=", et_tab);

    /*  *******  DESIGN EQUATIONS  *******                  */
    st[o.Mean_Dia] = st[o.OD_Free] - st[o.Wire_Dia];

    st[o.ID_Free] = st[o.Mean_Dia] - st[o.Wire_Dia];

    st[o.Spring_Index] = st[o.Mean_Dia] / st[o.Wire_Dia];

    kc = (4.0 * st[o.Spring_Index] - 1.0) / (4.0 * st[o.Spring_Index] - 4.0);

    ks = kc + 0.615 / st[o.Spring_Index];

    st[o.Coils_A] = st[o.Coils_T] + st[o.Hook_Deflect_All];

    temp = st[o.Spring_Index] * st[o.Spring_Index];
    st[o.Rate] = st[o.Hot_Factor_Kh] * st[o.Torsion_Modulus] * st[o.Mean_Dia] /
           (8.0 * st[o.Coils_A] * temp * temp);
//    console.log('x=',x);
//    console.log('st[o.Spring_Index]=',st[o.Spring_Index]);
//    console.log('st[o.Hot_Factor_Kh]=',st[o.Hot_Factor_Kh]);
//    console.log('st[o.Torsion_Modulus]=',st[o.Torsion_Modulus]);
//    console.log('st[o.Mean_Dia]=',st[o.Mean_Dia]);
//    console.log('st[o.Coils_A]=',st[o.Coils_A]);
//    console.log('st[o.Rate]=',st[o.Rate]);

    st[o.Deflect_1] = (st[o.Force_1] - st[o.Initial_Tension]) / st[o.Rate];
    if(st[o.Deflect_1] < zero) {st[o.Deflect_1] = zero};
    
    st[o.Deflect_2] = (st[o.Force_2] - st[o.Initial_Tension]) / st[o.Rate];
    if(st[o.Deflect_2] < zero) {st[o.Deflect_2] = zero};

    st[o.L_Body] = st[o.Wire_Dia] * (st[o.Coils_T] + 1.0);
    
    /*
     * End_ID, Extended_End_ID, L_End and L_Extended_End are also calculated in init.
     * They need to be calculated in eqnset because OD_Free will be changed during Search when init is not called.
     */
    j = st[o.End_Type];
    if (st[o.End_Type] <= e_end_num) {
         st[o.End_ID] = st[o.ID_Free];
         st[o.Extended_End_ID] = st[o.ID_Free];
         st[o.L_End] = st[o.ID_Free] * et_tab[j][eto.End_Dia];
         st[o.L_Extended_End] = st[o.L_End];
//         console.log('eqnset: st[o.End_Type] = ', st[o.End_Type]);
//         console.log('    st[o.End_ID] = ', st[o.End_ID]);
//         console.log('    st[o.Extended_End_ID] = ', st[o.Extended_End_ID]);
//         console.log('    st[o.L_End] = ', st[o.L_End]);
//         console.log('    st[o.L_Extended_End] = ', st[o.L_Extended_End]);
    }
    
    st[o.L_Free] = st[o.L_End] + st[o.L_Body] + st[o.End_Extension] + st[o.L_Extended_End];

    wd3 = st[o.Wire_Dia] * st[o.Wire_Dia] * st[o.Wire_Dia];
    s_f = 8.0 * st[o.Mean_Dia] / (Math.PI * wd3);
    
    /*  stress_initial does not contain the stress correction factor     */
    st[o.Stress_Initial] = s_f * st[o.Initial_Tension];

    /*  other stresses have ks included  */
    s_f *= ks;
    
    st[o.L_1] = st[o.L_Free] + st[o.Deflect_1];
    st[o.L_2] = st[o.L_Free] + st[o.Deflect_2];

    st[o.L_Stroke] = st[o.L_2] - st[o.L_1];

    st[o.Stress_1] = s_f * st[o.Force_1];
    if (st[o.Stress_1] <  st[o.Stress_Initial]) {st[o.Stress_1] = st[o.Stress_Initial]};
    
    st[o.Stress_2] = s_f * st[o.Force_2];
    if (st[o.Stress_2] <  st[o.Stress_Initial]) {st[o.Stress_2] = st[o.Stress_Initial]};

      if (st[o.Prop_Calc_Method] === 1) {
          st[o.Tensile] = st[o.slope_term] * (Math.log10(st[o.Wire_Dia]) - st[o.const_term]) + st[o.tensile_010];
//          console.log("eqnset Tensile = ", st[o.Tensile]);
      }
      if (st[o.Prop_Calc_Method] <= 2) {
          st[o.Stress_Lim_Endur] = st[o.Tensile] * st[o.PC_Tensile_Endur] / 100.0; 
          st[o.Stress_Lim_Stat]  = st[o.Tensile] * st[o.PC_Tensile_Stat]  / 100.0; 
          st[o.Stress_Lim_Bend]  = st[o.Tensile] * st[o.PC_Tensile_Bend]  / 100.0; 
      }

    if (st[o.Stress_2] > zero) {
        st[o.FS_2] = st[o.Stress_Lim_Stat] / st[o.Stress_2]; 
//        console.log("eqnset FS_2 = ", st[o.FS_2]);
    }
       else st[o.FS_2] = 1.0;

        /*
            Soderberg triangle approach to mixed steady and
            alternating stress.  See Spotts pg 29 & 68.

            Depending on the source of data for PC_TENSILE_ENDUR
            (which determines STRESS_LIM_ENDUR) this calculation
            may be overly conservative by a factor of KC or
            more.
        */
      stress_avg = (st[o.Stress_1] + st[o.Stress_2]) / 2.0;
      stress_rng = (st[o.Stress_2] - st[o.Stress_1]) / 2.0;
      se2 = st[o.Stress_Lim_Endur] / 2.0; 
    st[o.FS_CycleLife] =  st[o.Stress_Lim_Stat] / 
         (kc * stress_rng * (st[o.Stress_Lim_Stat] - se2) / se2 + stress_avg); 

    /*  ref. pg 51 Associated Spring Design Handbook  */
//  if end_id > extended_end_id then
//        Dend=end_id+wire_dia;
    if (st[o.End_ID] > st[o.Extended_End_ID]) {
        Dend = st[o.End_ID] + st[o.Wire_Dia];
        }
//     else
//        Dend=extended_end_id+wire_dia;
    else {
        Dend = st[o.Extended_End_ID] + st[o.Wire_Dia];
    }
//  C1=Dend/wire_dia;
    C1 = Dend / st[o.Wire_Dia];
//  if c1 > 1.0 then
//        K1=(4.0*C1*C1 - C1 -1.0) /
//       (4.0*C1*(C1-1.0));
    if (C1 > 1.0){
        K1 = (4.0 * C1 * C1 - C1 - 1.0) / (4.0 * C1 * (C1 - 1.0));
    }
//     else
//        K1=0.0;
    else {
        K1 = zero;
    }
//  /*  Sa  */
//  stress_hook= (16.0*Dend*force_2*K1)/(pi*wd3)
//           + 4.0*force_2/(pi*wire_dia*wire_dia);
    st[o.Stress_Hook] = (16.0 * Dend * st[o.Force_2] *K1) / (Math.PI * wd3)
        + 4.0 * st[o.Force_2] / (Math.PI * st[o.Wire_Dia] * st[o.Wire_Dia]);
//  if stress_hook ^= zero then fs_hook=stress_lim_bend/stress_hook;
//                 else fs_hook=zero;
    if (st[o.Stress_Hook] !== zero ) {
        st[o.FS_Hook] = st[o.Stress_Lim_Bend] / st[o.Stress_Hook];
        }
    else {
        st[o.FS_Hook] = zero;
    }

             /*  modified Goodman cycle life calculation  */
    if (st[o.Prop_Calc_Method] === 1 && st[o.Material_Type] !== 0) {
//        cycle_life = cl_calc(material_index,life_catagory,1,tensile,stress_1,stress_2);
        st[o.Cycle_Life] = cl_calc(st[o.Material_Type], st[o.Life_Category], 1, st[o.Tensile], st[o.Stress_1], st[o.Stress_2]);
    }
       else st[o.Cycle_Life] = 0.0;   // Setting to NaN causes problems with File : Open.  See issue 232

    sq1 = st[o.Wire_Dia] * st[o.Coils_T];
    sq2 = st[o.Coils_T] * Math.PI * st[o.Mean_Dia];
    wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2)
        + Math.PI * (st[o.End_ID] +  st[o.Wire_Dia]
        + st[o.Extended_End_ID] +  st[o.Wire_Dia])
        + st[o.End_Extension];
    
    st[o.Weight] = st[o.Density] * (Math.PI * st[o.Wire_Dia] * st[o.Wire_Dia] / 4.0) * wire_len_t;

//    safe_load=stress_lim_stat/s_f;
//    safe_deflect=(safe_load-initial_tension)/rate;
//    %_safe_deflect=deflect_2/safe_deflect*100.0;
    st[o.PC_Safe_Deflect] = 100.0 * st[o.Deflect_2] / (((st[o.Stress_Lim_Stat] / s_f)- st[o.Initial_Tension]) / st[o.Rate]);
//    
//    temp=exp(0.105*spring_index);
//    stress_init_lo=si_lo_factor/temp;
//    stress_init_hi=si_hi_factor/temp;

    temp = Math.exp(0.105 * st[o.Spring_Index]);
    st[o.Stress_Init_Lo] = st[o.SI_Lo_Factor] / temp;
    st[o.Stress_Init_Hi] = st[o.SI_Hi_Factor] / temp;

     st[o.Energy] = 0.5 * st[o.Rate] * (st[o.Deflect_2] * st[o.Deflect_2] - st[o.Deflect_1] * st[o.Deflect_1]);
    
//    console.log('In eqnset p=',p,' x=',x);
    return st;
    
function cl_calc(mat_idx, cl_idx, st_code, tensile, stress_1, stress_2){
//    console.log("In cl_calc:");
//    console.log("Material_Index = st[o.Material_Type] = mat_idx =", mat_idx);
//    console.log("Life_Category =  st[o.Life_Category] = cl_idx  =", cl_idx);
//    console.log("st_code =", st_code, " st[o.Tensile] = tensile =", tensile);
//    console.log("Stress1 = st[o.Stress_1] =", stress_1);
//    console.log("Stress2 = st[o.Stress_2] =", stress_2);
    
    var i;
    var j;
    var pntc;
    var sterm;
    var temp;
    var idxoffset;
    var snx = [];
    var sny = [7.0, 6.0, 5.0, 4.0]; // Powers of 10: 10,000,000, 1,000,000, 100,000, 10,000 cycles
    var m_tab;
    var result;

    /*  Bring in material properties table  */
    if (st[o.Material_File] === "mat_metric.json") m_tab = require('../mat_metric.json');
        else m_tab = require('../mat_us.json');

    if (st_code === 3) { // Is it Torsion?
        temp = tensile;
    } else {
        temp = 0.67 * tensile;
    }
    const smallnum = 1.0e-7;
    var temp_stress_1 = temp - stress_1;
    if (temp_stress_1 < smallnum) temp_stress_1 = smallnum;
    var temp_stress_2 = temp - stress_2;
    if (temp_stress_2 < smallnum) temp_stress_2 = smallnum;
    var ratio = temp_stress_2 / temp_stress_1;
    pntc = stress_2 - stress_1 * ratio;
    if (pntc < smallnum) pntc = smallnum;
//    console.log('pntc=',pntc,'stress_2=',stress_2,'stress_1=',stress_1,'ratio=',ratio,'temp=',temp);
    if (cl_idx < 5) { // Is Life Catagory Not Peened?
        j = 0;
    } else { // Else Shot Peened
        j = 3;
    }
    for (i = 0; i <= 3; i++) {
        idxoffset = 3 - i + j;
        if (j > 0 && idxoffset === 3) { // If Shot Peened and 
            idxoffset = 0;
        }
        if (st_code === 3) { // Is it Torsion?
            snx[i] = 0.01 * m_tab[mat_idx][mo.ptb1+idxoffset] * tensile;
//            console.log("i =", i, " j =", j, "idxoffset =", idxoffset, "m_tab[mat_idx][mo.ptb1+idxoffset]", m_tab[mat_idx][mo.ptb1+idxoffset],'snx[i]=',snx[i]);
        } else {
            snx[i] = 0.01 * m_tab[mat_idx][mo.pte1+idxoffset] * tensile;
//            console.log("i =", i, " j =", j, "idxoffset =", idxoffset, "m_tab[mat_idx][mo.pte1+idxoffset]", m_tab[mat_idx][mo.pte1+idxoffset],'snx[i]=',snx[i]);
        }
    }

    if (pntc < snx[0]) { // Is point after the table?
        sterm = (sny[1] - sny[0]) / (snx[1] - snx[0]);
        temp = sterm * (pntc - snx[0]) + sny[0];
        result =  Math.pow(10.0, temp);
//        console.log('After table sterm=',sterm,'temp=',temp,'result=',result);
        return(result);
    }

    // Look for the point in the table
    for (i = 1; i <= 3; i++) {
        if (pntc < snx[i]) {
          j = i - 1;
          sterm = (sny[i] - sny[j]) / (snx[i] - snx[j]);
          temp = sterm * (pntc - snx[j]) + sny[j];
          result = Math.pow(10.0, temp);
//          console.log('Inside table sterm=',sterm,'temp=',temp,'result=',result);
          return result;
        }
    }

    // Otherwise point is before the table
    sterm = (sny[3] - sny[2]) / (snx[3] - snx[2]);
    temp = sterm * (pntc - snx[3]) + sny[3];
    result =  Math.pow(10.0, temp);
//    console.log('Before table sterm=',sterm,'temp=',temp,'result=',result);
    return(result);
}
    
}