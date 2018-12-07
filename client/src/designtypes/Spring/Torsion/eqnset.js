import * as o from './offsets';
import * as mo from '../mat_ips_offsets';
export function eqnset(p, x) {        /*    Torsion  Spring  */
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
    x[o.Mean_Dia] = p[o.OD_Free] - p[o.Wire_Dia];

    x[o.Spring_Index] = x[o.Mean_Dia] / p[o.Wire_Dia];

    if (x[o.HT_Process] === "Stress_Relieve"){
        kb = (4.0 * x[o.Spring_Index] - 1.0) / (4.0 * x[o.Spring_Index] - 4.0);
    }
    else {
        kb = 1.0;
    }

//  end_deflect_all=(l_end_1+l_end_2)/(3.0*pi*mean_dia);
    x[o.End_Deflect_All] = (x[o.L_End_1] + x[o.L_End_2]) / (3.0 * Math.PI * x[o.Mean_Dia]);

    x[o.Coils_A] = p[o.Coils_T] + x[o.End_Deflect_All];

    temp = p[o.Wire_Dia] * p[o.Wire_Dia];
    x[o.Rate] = x[o.Hot_Factor_Kh] * x[o.Elastic_Modulus] * temp * temp /
           (10.8 * x[o.Mean_Dia] * x[o.Coils_A]);
//    console.log('x=',x);
//    console.log('x[o.Spring_Index]=',x[o.Spring_Index]);
//    console.log('x[o.Hot_Factor_Kh]=',x[o.Hot_Factor_Kh]);
//    console.log('x[o.Elastic_Modulus]=',x[o.Elastic_Modulus]);
//    console.log('x[o.Mean_Dia]=',x[o.Mean_Dia]);
//    console.log('x[o.Coils_A]=',x[o.Coils_A]);
//    console.log('x[o.Rate]=',x[o.Rate]);

    x[o.Rate] = x[o.Rate] / Deg_Per_Turn;
    
    x[o.Deflect_1] = p[o.M_1] / x[o.Rate];
    x[o.Deflect_2] = p[o.M_2] / x[o.Rate];

    x[o.ID_Free] = x[o.Mean_Dia] - p[o.Wire_Dia];

    ctp1 = p[o.Coils_T] + 1.0;
    x[o.L_Body] = p[o.Wire_Dia] * ctp1 + p[o.Coil_Spacing] * p[o.Coils_T];
//      l_1 = max(l_body, wire_dia*(ctp1+deflect_1/deg_per_turn) );
    x[o.L_1] = Math.max( x[o.L_Body], p[o.Wire_Dia] * (ctp1 + x[o.Deflect_1] / Deg_Per_Turn) );
    x[o.L_2] = Math.max( x[o.L_Body], p[o.Wire_Dia] * (ctp1 + x[o.Deflect_2] / Deg_Per_Turn) );

    x[o.Stroke] = x[o.Deflect_2] - x[o.Deflect_1];

      s_f = 32.0 * kb / (Math.PI * p[o.Wire_Dia] * p[o.Wire_Dia] * p[o.Wire_Dia]);

    x[o.Stress_1] = s_f * p[o.M_1];
    x[o.Stress_2] = s_f * p[o.M_2];

//    if arm_2 ^= zero then force_arm_2=m_2/arm_2;
//    else force_arm_2=zero;
    if (x[o.Arm_2] !== zero) {
        x[o.Force_Arm_2] = p[o.M_2] / x[o.Arm_2];
    }
    else {
        x[o.Force_Arm_2] = zero;
    }
    
//    end_angle_free=deg_per_turn*(coils_t-trunc(coils_t));
    x[o.End_Angle_Free] = Deg_Per_Turn * (p[o.Coils_T] - Math.trunc(p[o.Coils_T]));

//    stress_end = 0.0;         /*  stresses in ends;       */
    x[o.Stress_End] = zero;

      if (x[o.Prop_Calc_Method] === 1) {
          x[o.Tensile] = x[o.slope_term] * (Math.log10(p[o.Wire_Dia]) - x[o.const_term]) + x[o.tensile_010];
//          console.log("eqnset Tensile = ", x[o.Tensile]);
      }
      if (x[o.Prop_Calc_Method] <= 2) {
          x[o.Stress_Lim_Bnd_Endur] = x[o.Tensile] * x[o.PC_Ten_Bnd_Endur] / 100.0; 
          x[o.Stress_Lim_Bnd_Stat]  = x[o.Tensile] * x[o.PC_Ten_Bnd_Stat]  / 100.0; 
      }

    if (x[o.Stress_2] > zero) {
        x[o.FS_2] = x[o.Stress_Lim_Bnd_Stat] / x[o.Stress_2]; 
//        console.log("eqnset FS_2 = ", x[o.FS_2]);
    }
       else x[o.FS_2] = 1.0;

        /*
            Soderberg triangle approach to mixed steady and
            alternating stress.  See Spotts pg 29 & 68.

            Depending on the source of data for PC_Ten_Bnd_Endur
            (which determines Stress_LIM_Bnd_Endur) this calculation
            may be overly conservative by a factor of kb or
            more.
        */
      stress_avg = (x[o.Stress_1] + x[o.Stress_2]) / 2.0;
      stress_rng = (x[o.Stress_2] - x[o.Stress_1]) / 2.0;
      se2 = x[o.Stress_Lim_Bnd_Endur] / 2.0; 
    x[o.FS_CycleLife] =  x[o.Stress_Lim_Bnd_Stat] / 
         (kb * stress_rng * (x[o.Stress_Lim_Bnd_Stat] - se2) / se2 + stress_avg); 

             /*  modified Goodman cycle life calculation  */
    if (x[o.Prop_Calc_Method] === 1 && x[o.Material_Type] !== 0) {
//        cycle_life = cl_calc(material_index,life_catagory,1,tensile,stress_1,stress_2);
        x[o.Cycle_Life] = cl_calc(x[o.Material_Type], x[o.Life_Category], 1, x[o.Tensile], x[o.Stress_1], x[o.Stress_2]);
    }
       else x[o.Cycle_Life] = zero;   // Setting to NaN causes problems with File : Open.  See issue #232

                           /*  crude approximation  ... better available on web  */
    x[o.Weight] = x[o.Density] * (Math.PI * p[o.Wire_Dia] * p[o.Wire_Dia] / 4.0) * 
        (Math.PI * x[o.Mean_Dia] * p[o.Coils_T] + x[o.Xlen_1] + x[o.Xlen_2]);
    
//    console.log('In eqnset p=',p,' x=',x);
    return x;
    
function cl_calc(mat_idx, cl_idx, st_code, tensile, stress_1, stress_2){
//    console.log("In cl_calc:");
//    console.log("Material_Index = x[o.Material_Type] = mat_idx =", mat_idx);
//    console.log("life_category =  x[o.Life_Category] = cl_idx  =", cl_idx);
//    console.log("st_code =", st_code, " x[o.Tensile] = tensile =", tensile);
//    console.log("Stress1 = x[o.Stress_1] =", stress_1);
//    console.log("Stress2 = x[o.Stress_2] =", stress_2);
    
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