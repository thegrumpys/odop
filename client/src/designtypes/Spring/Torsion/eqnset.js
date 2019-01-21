import * as o from './offsets';
import * as mo from '../mat_ips_offsets';
export function eqnset(st) {        /*    Torsion  Spring  */
    
//    console.log('Entering eqnset st=',st);
    
    const zero = 0.0;
    const Deg_Per_Turn = 360.0;
    var kb;
    var temp;
    var s_f;
    var stress_avg;
    var stress_rng;
    var se2;
    var ctp1;
    
    /*  *******  DESIGN EQUATIONS  *******                  */
    st[o.Mean_Dia].value = st[o.OD_Free].value - st[o.Wire_Dia].value;

    st[o.Spring_Index].value = st[o.Mean_Dia].value / st[o.Wire_Dia].value;

    if (st[o.Heat_Treat].value === 2){     //  Stress Relieve
        kb = (4.0 * st[o.Spring_Index].value - 1.0) / (4.0 * st[o.Spring_Index].value - 4.0);
    }
    else {                          //  No Stress Relieve
        kb = 1.0;
    }
//    console.log("st[o.Heat_Treat].value =", st[o.Heat_Treat].value);
//    console.log("kb = ", kb);

//  end_deflect_all=(l_end_1+l_end_2)/(3.0*pi*mean_dia);
    st[o.End_Deflect_All].value = (st[o.L_End_1].value + st[o.L_End_2].value) / (3.0 * Math.PI * st[o.Mean_Dia].value);

    st[o.Coils_A].value = st[o.Coils_T].value + st[o.End_Deflect_All].value;

    temp = st[o.Wire_Dia].value * st[o.Wire_Dia].value;
    st[o.Rate].value = st[o.Hot_Factor_Kh].value * st[o.Elastic_Modulus].value * temp * temp /
           (10.8 * st[o.Mean_Dia].value * st[o.Coils_A].value);
//    console.log('st=',st);
//    console.log('st[o.Spring_Index].value=',st[o.Spring_Index].value);
//    console.log('st[o.Hot_Factor_Kh].value=',st[o.Hot_Factor_Kh].value);
//    console.log('st[o.Elastic_Modulus].value=',st[o.Elastic_Modulus].value);
//    console.log('st[o.Mean_Dia].value=',st[o.Mean_Dia].value);
//    console.log('st[o.Coils_A].value=',st[o.Coils_A].value);
//    console.log('st[o.Rate].value=',st[o.Rate].value);

    st[o.Rate].value = st[o.Rate].value / Deg_Per_Turn;
    
    st[o.Deflect_1].value = st[o.M_1].value / st[o.Rate].value;
    st[o.Deflect_2].value = st[o.M_2].value / st[o.Rate].value;

    st[o.ID_Free].value = st[o.Mean_Dia].value - st[o.Wire_Dia].value;

    ctp1 = st[o.Coils_T].value + 1.0;
    st[o.L_Body].value = st[o.Wire_Dia].value * ctp1 + st[o.Coil_Spacing].value * (st[o.Coils_T].value - 1.0);
//      l_1 = max(l_body, wire_dia*(ctp1+deflect_1/deg_per_turn) );
    st[o.L_1].value = Math.max( st[o.L_Body].value, st[o.Wire_Dia].value * (ctp1 + st[o.Deflect_1].value / Deg_Per_Turn) );
    st[o.L_2].value = Math.max( st[o.L_Body].value, st[o.Wire_Dia].value * (ctp1 + st[o.Deflect_2].value / Deg_Per_Turn) );

    st[o.Stroke].value = st[o.Deflect_2].value - st[o.Deflect_1].value;

    s_f = 32.0 * kb / (Math.PI * st[o.Wire_Dia].value * st[o.Wire_Dia].value * st[o.Wire_Dia].value);

    st[o.Stress_1].value = s_f * st[o.M_1].value;
    st[o.Stress_2].value = s_f * st[o.M_2].value;

//    if arm_2 ^= zero then force_arm_2=m_2/arm_2;
//    else force_arm_2=zero;
    if (st[o.Arm_2].value !== zero) {
        st[o.Force_Arm_2].value = st[o.M_2].value / st[o.Arm_2].value;
    }
    else {
        st[o.Force_Arm_2].value = zero;
    }
    
//    end_angle_free=deg_per_turn*(coils_t-trunc(coils_t));
    st[o.End_Angle_Free].value = Deg_Per_Turn * (st[o.Coils_T].value - Math.trunc(st[o.Coils_T].value));

//    stress_end = 0.0;         /*  stresses in ends;       */
    st[o.Stress_End].value = zero;

    if (st[o.Prop_Calc_Method].value === 1) {
        st[o.Tensile].value = st[o.slope_term].value * (Math.log10(st[o.Wire_Dia].value) - st[o.const_term].value) + st[o.tensile_010].value;
//        console.log("eqnset Tensile = ", st[o.Tensile].value);
    }
    if (st[o.Prop_Calc_Method].value <= 2) {
        st[o.Stress_Lim_Bnd_Endur].value = st[o.Tensile].value * st[o.PC_Ten_Bnd_Endur].value / 100.0; 
        st[o.Stress_Lim_Bnd_Stat].value  = st[o.Tensile].value * st[o.PC_Ten_Bnd_Stat].value  / 100.0; 
    }

    if (st[o.Stress_2].value > zero) {
        st[o.FS_2].value = st[o.Stress_Lim_Bnd_Stat].value / st[o.Stress_2].value; 
//        console.log("eqnset FS_2 = ", st[o.FS_2].value);
    }
    else st[o.FS_2].value = 1.0;

        /*
            Soderberg triangle approach to mixed steady and
            alternating stress.  See Spotts pg 29 & 68.

            Depending on the source of data for PC_Ten_Bnd_Endur
            (which determines Stress_LIM_Bnd_Endur) this calculation
            may be overly conservative by a factor of kb or
            more.
        */
    stress_avg = (st[o.Stress_1].value + st[o.Stress_2].value) / 2.0;
    stress_rng = (st[o.Stress_2].value - st[o.Stress_1].value) / 2.0;
    se2 = st[o.Stress_Lim_Bnd_Endur].value / 2.0; 
    st[o.FS_CycleLife].value =  st[o.Stress_Lim_Bnd_Stat].value / 
        (kb * stress_rng * (st[o.Stress_Lim_Bnd_Stat].value - se2) / se2 + stress_avg); 

             /*  modified Goodman cycle life calculation  */
    if (st[o.Prop_Calc_Method].value === 1 && st[o.Material_Type].value !== 0) {
//        for torsion springs: spring type (st_code) = 3 
//        cycle_life = cl_calc(material_index,life_catagory,3,tensile,stress_1,stress_2);
        st[o.Cycle_Life].value = cl_calc(st[o.Material_Type].value, st[o.Life_Category].value, 3, st[o.Tensile].value, st[o.Stress_1].value, st[o.Stress_2].value);
    }
    else st[o.Cycle_Life].value = zero;   // Setting to NaN causes problems with File : Open.  See issue #232

                           /*  crude approximation  ... better available on web  */
    st[o.Weight].value = st[o.Density].value * (Math.PI * st[o.Wire_Dia].value * st[o.Wire_Dia].value / 4.0) * 
        (Math.PI * st[o.Mean_Dia].value * st[o.Coils_T].value + st[o.Xlen_1].value + st[o.Xlen_2].value);
    
//    console.log('Exiting eqnset st=',st);
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