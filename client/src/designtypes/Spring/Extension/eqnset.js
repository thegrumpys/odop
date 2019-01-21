import * as o from './offsets';
import * as mo from '../mat_ips_offsets';
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
    st[o.Mean_Dia].value = st[o.OD_Free].value - st[o.Wire_Dia].value;

    st[o.ID_Free].value = st[o.Mean_Dia].value - st[o.Wire_Dia].value;

    st[o.Spring_Index].value = st[o.Mean_Dia].value / st[o.Wire_Dia].value;

    kc = (4.0 * st[o.Spring_Index].value - 1.0) / (4.0 * st[o.Spring_Index].value - 4.0);

    ks = kc + 0.615 / st[o.Spring_Index].value;

    st[o.Coils_A].value = st[o.Coils_T].value + st[o.Hook_Deflect_All].value - st[o.Inactive_Coils].value;

    temp = st[o.Spring_Index].value * st[o.Spring_Index].value;
    st[o.Rate].value = st[o.Hot_Factor_Kh].value * st[o.Torsion_Modulus].value * st[o.Mean_Dia].value /
           (8.0 * st[o.Coils_A].value * temp * temp);
//    console.log('st=',st);
//    console.log('st[o.Spring_Index].value=',st[o.Spring_Index].value);
//    console.log('st[o.Hot_Factor_Kh].value=',st[o.Hot_Factor_Kh].value);
//    console.log('st[o.Torsion_Modulus].value=',st[o.Torsion_Modulus].value);
//    console.log('st[o.Mean_Dia].value=',st[o.Mean_Dia].value);
//    console.log('st[o.Coils_A].value=',st[o.Coils_A].value);
//    console.log('st[o.Rate].value=',st[o.Rate].value);

    st[o.Deflect_1].value = (st[o.Force_1].value - st[o.Initial_Tension].value) / st[o.Rate].value;
    if(st[o.Deflect_1].value < zero) {st[o.Deflect_1].value = zero};
    
    st[o.Deflect_2].value = (st[o.Force_2].value - st[o.Initial_Tension].value) / st[o.Rate].value;
    if(st[o.Deflect_2].value < zero) {st[o.Deflect_2].value = zero};

    st[o.L_Body].value = st[o.Wire_Dia].value * (st[o.Coils_T].value + 1.0);
    
    /*
     * End_ID, Extended_End_ID, L_End and L_Extended_End are also calculated in init.
     * They need to be calculated in eqnset because OD_Free will be changed during Search when init is not called.
     */
    j = st[o.End_Type].value;
    if (st[o.End_Type].value <= e_end_num) {
         st[o.End_ID].value = st[o.ID_Free].value;
         st[o.Extended_End_ID].value = st[o.ID_Free].value;
         st[o.L_End].value = st[o.ID_Free].value * et_tab[j].value[eto.End_Dia].value;
         st[o.L_Extended_End].value = st[o.L_End].value;
//         console.log('eqnset: st[o.End_Type].value = ', st[o.End_Type].value);
//         console.log('    st[o.End_ID].value = ', st[o.End_ID].value);
//         console.log('    st[o.Extended_End_ID].value = ', st[o.Extended_End_ID].value);
//         console.log('    st[o.L_End].value = ', st[o.L_End].value);
//         console.log('    st[o.L_Extended_End].value = ', st[o.L_Extended_End].value);
    }
    
    st[o.L_Free].value = st[o.L_End].value + st[o.L_Body].value + st[o.End_Extension].value + st[o.L_Extended_End].value;

    wd3 = st[o.Wire_Dia].value * st[o.Wire_Dia].value * st[o.Wire_Dia].value;
    s_f = 8.0 * st[o.Mean_Dia].value / (Math.PI * wd3);
    
    /*  stress_initial does not contain the stress correction factor     */
    st[o.Stress_Initial].value = s_f * st[o.Initial_Tension].value;

    /*  other stresses have ks included  */
    s_f *= ks;
    
    st[o.L_1].value = st[o.L_Free].value + st[o.Deflect_1].value;
    st[o.L_2].value = st[o.L_Free].value + st[o.Deflect_2].value;

    st[o.L_Stroke].value = st[o.L_2].value - st[o.L_1].value;

    st[o.Stress_1].value = s_f * st[o.Force_1].value;
    if (st[o.Stress_1].value <  st[o.Stress_Initial].value) {st[o.Stress_1].value = st[o.Stress_Initial].value};
    
    st[o.Stress_2].value = s_f * st[o.Force_2].value;
    if (st[o.Stress_2].value <  st[o.Stress_Initial].value) {st[o.Stress_2].value = st[o.Stress_Initial].value};

    if (st[o.Prop_Calc_Method].value === 1) {
        st[o.Tensile].value = st[o.slope_term].value * (Math.log10(st[o.Wire_Dia].value) - st[o.const_term].value) + st[o.tensile_010].value;
//        console.log("eqnset Tensile = ", st[o.Tensile].value);
    }
    if (st[o.Prop_Calc_Method].value <= 2) {
        st[o.Stress_Lim_Endur].value = st[o.Tensile].value * st[o.PC_Tensile_Endur].value / 100.0; 
        st[o.Stress_Lim_Stat].value  = st[o.Tensile].value * st[o.PC_Tensile_Stat].value  / 100.0; 
        st[o.Stress_Lim_Bend].value  = st[o.Tensile].value * st[o.PC_Tensile_Bend].value  / 100.0; 
    }

    if (st[o.Stress_2].value > zero) {
        st[o.FS_2].value = st[o.Stress_Lim_Stat].value / st[o.Stress_2].value; 
//        console.log("eqnset FS_2 = ", st[o.FS_2].value);
    }
    else st[o.FS_2].value = 1.0;

        /*
            Soderberg triangle approach to mixed steady and
            alternating stress.  See Spotts pg 29 & 68.

            Depending on the source of data for PC_TENSILE_ENDUR
            (which determines STRESS_LIM_ENDUR) this calculation
            may be overly conservative by a factor of KC or
            more.
        */
    stress_avg = (st[o.Stress_1].value + st[o.Stress_2].value) / 2.0;
    stress_rng = (st[o.Stress_2].value - st[o.Stress_1].value) / 2.0;
    se2 = st[o.Stress_Lim_Endur].value / 2.0; 
    st[o.FS_CycleLife].value =  st[o.Stress_Lim_Stat].value / 
        (kc * stress_rng * (st[o.Stress_Lim_Stat].value - se2) / se2 + stress_avg); 

    /*  ref. pg 51 Associated Spring Design Handbook  */
//  if end_id > extended_end_id then
//        Dend=end_id+wire_dia;
    if (st[o.End_ID].value > st[o.Extended_End_ID].value) {
        Dend = st[o.End_ID].value + st[o.Wire_Dia].value;
        }
//     else
//        Dend=extended_end_id+wire_dia;
    else {
        Dend = st[o.Extended_End_ID].value + st[o.Wire_Dia].value;
    }
//  C1=Dend/wire_dia;
    C1 = Dend / st[o.Wire_Dia].value;
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
    st[o.Stress_Hook].value = (16.0 * Dend * st[o.Force_2].value *K1) / (Math.PI * wd3)
        + 4.0 * st[o.Force_2].value / (Math.PI * st[o.Wire_Dia].value * st[o.Wire_Dia].value);
//  if stress_hook ^= zero then fs_hook=stress_lim_bend/stress_hook;
//                 else fs_hook=zero;
    if (st[o.Stress_Hook].value !== zero ) {
        st[o.FS_Hook].value = st[o.Stress_Lim_Bend].value / st[o.Stress_Hook].value;
        }
    else {
        st[o.FS_Hook].value = zero;
    }

             /*  modified Goodman cycle life calculation  */
    if (st[o.Prop_Calc_Method].value === 1 && st[o.Material_Type].value !== 0) {
//        cycle_life = cl_calc(material_index,life_catagory,1,tensile,stress_1,stress_2);
        st[o.Cycle_Life].value = cl_calc(st[o.Material_Type].value, st[o.Life_Category].value, 1, st[o.Tensile].value, st[o.Stress_1].value, st[o.Stress_2].value);
    }
    else st[o.Cycle_Life].value = zero;   // Setting to NaN causes problems with File : Open.  See issue #232

//    wire_len_t=pi*(mean_dia*coils_t
//            +end_id+wire_dia
//            +extended_end_id+wire_dia)
//         +end_extension;
    sq1 = st[o.Wire_Dia].value * st[o.Coils_T].value;
    sq2 = st[o.Coils_T].value * Math.PI * st[o.Mean_Dia].value;
    wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2)
        + Math.PI * (st[o.End_ID].value +  st[o.Wire_Dia].value
        + st[o.Extended_End_ID].value +  st[o.Wire_Dia].value)
        + st[o.End_Extension].value;
    
//    weight=density*(pi*wire_dia*wire_dia/4.0)*wire_len_t;
    st[o.Weight].value = st[o.Density].value * (Math.PI * st[o.Wire_Dia].value * st[o.Wire_Dia].value / 4.0) * wire_len_t;

//    safe_load=stress_lim_stat/s_f;
//    safe_deflect=(safe_load-initial_tension)/rate;
//    %_safe_deflect=deflect_2/safe_deflect*100.0;
    st[o.PC_Safe_Deflect].value = 100.0 * st[o.Deflect_2].value / (((st[o.Stress_Lim_Stat].value / s_f)- st[o.Initial_Tension].value) / st[o.Rate].value);
//    
//    temp=exp(0.105*spring_index);
//    stress_init_lo=si_lo_factor/temp;
//    stress_init_hi=si_hi_factor/temp;

    temp = Math.exp(0.105 * st[o.Spring_Index].value);
    st[o.Stress_Init_Lo].value = st[o.SI_Lo_Factor].value / temp;
    st[o.Stress_Init_Hi].value = st[o.SI_Hi_Factor].value / temp;
//
//    if stress_init_lo ^= zero
//       then fs_si_lo=stress_initial/stress_init_lo;
//       else fs_si_lo=zero;
    if (st[o.Stress_Init_Lo].value !== zero) {
        st[o.FS_SI_Lo].value = st[o.Stress_Initial].value / st[o.Stress_Init_Lo].value;
    }
    else {
        st[o.FS_SI_Lo].value = zero;
    }
    
//    if stress_initial ^= zero
//       then fs_si_hi=stress_init_hi/stress_initial;
//       else fs_si_hi=zero;
    if (st[o.Stress_Initial].value !== zero) {
        st[o.FS_SI_Hi].value = st[o.Stress_Init_Hi].value / st[o.Stress_Initial].value;
    }
    else {
        st[o.FS_SI_Hi].value = zero;
    }
    
//    f1_it_margin= force_1-initial_tension;
    st[o.F1_IT_Margin].value = st[o.Force_1].value - st[o.Initial_Tension].value;
    
//    console.log('In eqnset st=',st);
    return st;
    
function cl_calc(mat_idx, cl_idx, st_code, tensile, stress_1, stress_2){
//    console.log("In cl_calc:");
//    console.log("Material_Index = st[o.Material_Type].value = mat_idx =", mat_idx);
//    console.log("life_category =  st[o.Life_Category].value = cl_idx  =", cl_idx);
//    console.log("st_code =", st_code, " st[o.Tensile].value = tensile =", tensile);
//    console.log("Stress1 = st[o.Stress_1].value =", stress_1);
//    console.log("Stress2 = st[o.Stress_2].value =", stress_2);
    
    var i;
    var j;
    var pntc;
    var sterm;
    var temp;
    var idxoffset;
    var snx = [];
    var sny = [7.0, 6.0, 5.0, 1.0];

    /*  Bring in material properties table  */
    var m_tab = require('../mat_ips.json');

//    if st_code = 3 then temp=tensile;
    if (st_code === 3) temp = tensile;
//        else temp=0.67*tensile;
    else temp = 0.67 * tensile;
//    pntc=stress_2-stress_1*((temp-stress_2)/(temp-stress_1));
    pntc=stress_2-stress_1*((temp-stress_2)/(temp-stress_1));
//    if cl_idx < 5 then j=0;
    if (cl_idx < 5) j = 0;
//        else j=4;
    else j = 3;
//    do i = 1 to 4;
    for (i=0; i < 4; i++) {
        idxoffset = 3 - i + j;
        if (j > 0 && idxoffset === 3) idxoffset = 0;
//    if st_code = 3 then snx(i)=0.01*m_tab(mat_idx).ptb(5-i+j)*tensile;
        if (st_code === 3 ) snx[i] = 0.01 * m_tab[mat_idx][mo.ptb1+idxoffset] * tensile;
//    else snx(i)=0.01*m_tab(mat_idx).pte(5-i+j)*tensile;
        else {
            snx[i] = 0.01 * m_tab[mat_idx][mo.pte1+idxoffset] * tensile;
//            console.log("i =", i, " j =", j, "ixoffset =", idxoffset, "m_tab[mat_idx][mo.pte1+idexoffset]", m_tab[mat_idx][mo.pte1+idxoffset]);
        }
//    end;
    }
//
//    if pntc < snx(1) then return(1.0e+07);
    if (pntc < snx[1]) return(1.0e+07);
//
//    do i = 2 to 4;
    for (i=1; i<4; i++) {
//    if pntc < snx(i) then
        if (pntc < snx[i]) {
//        do;
//        j=i-1;
            j = i - 1;
//        sterm=(sny(i)-sny(j))/(snx(i)-snx(j));
            sterm = (sny[i] - sny[j]) / (snx[i] - snx[j]);
//        temp=sterm*(pntc-snx(j))+sny(j);
            temp = sterm * (pntc - snx[j]) +sny[j];
//        return(10.0**temp);
            return(Math.pow(10.0, temp));
//        end;
        }
//    end;
    }

return(1.0);

}
    
}