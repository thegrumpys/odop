import * as o from './offsets';
import * as mo from '../mat_offsets';
export function eqnset(p, x) {        /*    Torsion  Spring  */
    
//    console.log('Entering eqnset p=',p);
    
    const zero = 0.0;
    const Deg_Per_Turn = 360.0;
    const Deg2Rad = 2.0 * Math.PI / 360.0;
    var RateInRad, Def1InRad, Def2InRad;
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

    if (x[o.Heat_Treat] === 2){     //  Stress Relieve
        kb = (4.0 * x[o.Spring_Index] - 1.0) / (4.0 * x[o.Spring_Index] - 4.0);
    }
    else {                          //  No Stress Relieve
        kb = 1.0;
    }
//    console.log("x[o.Heat_Treat] =", x[o.Heat_Treat]);
//    console.log("kb = ", kb);

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
//        for torsion springs: spring type (st_code) = 3 
//        cycle_life = cl_calc(material_index,life_catagory,3,tensile,stress_1,stress_2);
        x[o.Cycle_Life] = cl_calc(x[o.Material_Type], x[o.Life_Category], 3, x[o.Tensile], x[o.Stress_1], x[o.Stress_2]);
    }
       else x[o.Cycle_Life] = zero;   // Setting to NaN causes problems with File : Open.  See issue #232

    x[o.PC_Safe_Deflect] = 100.0 * x[o.Deflect_2] / ((x[o.Stress_Lim_Bnd_Stat] / s_f) / x[o.Rate]);
 
    var sq1 = x[o.L_Body];
    var sq2 = p[o.Coils_T] * Math.PI * x[o.Mean_Dia];
    var wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2);

    x[o.Weight] = x[o.Density] * (Math.PI * p[o.Wire_Dia] * p[o.Wire_Dia] / 4.0) * (wire_len_t + x[o.Xlen_1] + x[o.Xlen_2]);

    RateInRad = x[o.Rate] / Deg2Rad;
    Def1InRad = x[o.Deflect_1] * Deg2Rad;
    Def2InRad = x[o.Deflect_2] * Deg2Rad;
    x[o.Energy] = 0.5 * RateInRad * (Def2InRad * Def2InRad - Def1InRad * Def1InRad);
    
//    console.log('Exiting eqnset p=',p,' x=',x);
    return x;
    
function cl_calc(mat_idx, cl_idx, st_code, tensile, stress_1, stress_2){
//    console.log("In cl_calc:");
//    console.log("Material_Index = x[o.Material_Type] = mat_idx =", mat_idx);
//    console.log("Life_Category =  x[o.Life_Category] = cl_idx  =", cl_idx);
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
    var sny = [7.0, 6.0, 5.0, 4.0]; // Powers of 10: 10,000,000, 1,000,000, 100,000, 10,000 cycles
    var m_tab;
    var result;

    /*  Bring in material properties table  */
    if (x[o.Material_File] === "mat_metric.json") m_tab = require('../mat_metric.json');
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