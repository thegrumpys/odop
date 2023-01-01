import * as o from './symbol_table_offsets';
import * as mo from '../mat_offsets';
export function eqnset(st) {        /*    Compression  Spring  */
//    console.log('<li>','@@@@@ Start eqnset p=',p,'x=',x,'</li><ul>');
    const zero = 0.0;
    var ks;
    var kc;
    var temp;
    var s_f;
    var stress_avg;
    var stress_rng;
    var se2;
    
    /*  *******  DESIGN EQUATIONS  *******                  */
    st[o.Mean_Dia] = st[o.OD_Free] - st[o.Wire_Dia];

    st[o.ID_Free] = st[o.Mean_Dia] - st[o.Wire_Dia];

    st[o.Spring_Index] = st[o.Mean_Dia] / st[o.Wire_Dia];

    kc = (4.0 * st[o.Spring_Index] - 1.0) / (4.0 * st[o.Spring_Index] - 4.0);

    ks = kc + 0.615 / st[o.Spring_Index];

    st[o.Coils_A] = st[o.Coils_T] - st[o.Inactive_Coils];

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

    st[o.Deflect_1] = st[o.Force_1] / st[o.Rate];
    st[o.Deflect_2] = st[o.Force_2] / st[o.Rate];

    st[o.L_1] = st[o.L_Free] - st[o.Deflect_1];
    st[o.L_2] = st[o.L_Free] - st[o.Deflect_2];

    st[o.L_Stroke] = st[o.L_1] - st[o.L_2];

    st[o.Slenderness] = st[o.L_Free] / st[o.Mean_Dia];

    st[o.L_Solid] = st[o.Wire_Dia] * (st[o.Coils_T] + st[o.Add_Coils_Solid]);

    st[o.Force_Solid] = st[o.Rate] * (st[o.L_Free] - st[o.L_Solid]);

      s_f = ks * 8.0 * st[o.Mean_Dia] / (Math.PI * st[o.Wire_Dia] * st[o.Wire_Dia] * st[o.Wire_Dia]);

    st[o.Stress_1] = s_f * st[o.Force_1];
    st[o.Stress_2] = s_f * st[o.Force_2];
    st[o.Stress_Solid] = s_f * st[o.Force_Solid];

      if (st[o.Prop_Calc_Method] === 1) {
          st[o.Tensile] = st[o.slope_term] * (Math.log10(st[o.Wire_Dia]) - st[o.const_term]) + st[o.tensile_010];
//          console.log("eqnset Tensile = ", st[o.Tensile]);
      }
      if (st[o.Prop_Calc_Method] <= 2) {
          st[o.Stress_Lim_Endur] = st[o.Tensile] * st[o.PC_Tensile_Endur] / 100.0; 
          st[o.Stress_Lim_Stat]  = st[o.Tensile] * st[o.PC_Tensile_Stat]  / 100.0; 
      }

    if (st[o.Stress_2] > zero) {
        st[o.FS_2] = st[o.Stress_Lim_Stat] / st[o.Stress_2]; 
//        console.log("eqnset FS_2 = ", st[o.FS_2]);
    }
       else st[o.FS_2] = 1.0;

    if (st[o.Stress_Solid] > zero) {
        st[o.FS_Solid] = st[o.Stress_Lim_Stat] / st[o.Stress_Solid];
    }
           else st[o.FS_Solid] = 1.0;

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

             /*  modified Goodman cycle life calculation  */
    if (st[o.Prop_Calc_Method] === 1 && st[o.Material_Type] !== 0) {
//        cycle_life = cl_calc(material_index,life_catagory,1,tensile,stress_1,stress_2);
        st[o.Cycle_Life] = cl_calc(st[o.Material_Type], st[o.Life_Category], 1, st[o.Tensile], st[o.Stress_1], st[o.Stress_2]);
    } else st[o.Cycle_Life] = 0.0;   // Setting to NaN causes problems with File : Open.  See issue 232
//  console.log('In eqnset','Wire_Dia=',st[o.Wire_Dia],'Cycle_Life=',st[o.Cycle_Life]);

        var sq1 = st[o.L_Free];
        var sq2 = st[o.Coils_T] * Math.PI * st[o.Mean_Dia];
        var wire_len_t = Math.sqrt(sq1 * sq1 + sq2 * sq2);
        if (st[o.End_Type] === 5 )  /*  calculate developed length of tapered ends based on 2 ends * pi * wire diameter * 0.625 */
            wire_len_t = wire_len_t - 3.926 * st[o.Wire_Dia];

        st[o.Weight] = st[o.Density] * (Math.PI * st[o.Wire_Dia] * st[o.Wire_Dia] / 4.0) * wire_len_t;

    if (st[o.L_Free] > st[o.L_Solid]) {
        st[o.PC_Avail_Deflect] = 100.0 * st[o.Deflect_2] / (st[o.L_Free] - st[o.L_Solid]);
        if (st[o.L_Free] < st[o.L_Solid] + st[o.Wire_Dia]) {
            temp = 100.0 * st[o.Deflect_2] / st[o.Wire_Dia] + 10000.0 * (st[o.L_Solid] + st[o.Wire_Dia] - st[o.L_Free]);
            if (temp < st[o.PC_Avail_Deflect]) st[o.PC_Avail_Deflect] = temp;
        };
    }
    else st[o.PC_Avail_Deflect] = 100.0 * st[o.Deflect_2] / st[o.Wire_Dia] + 10000.0 * (st[o.L_Solid] + st[o.Wire_Dia] - st[o.L_Free]);
 
     st[o.Energy] = 0.5 * st[o.Rate] * (st[o.Deflect_2] * st[o.Deflect_2] - st[o.Deflect_1] * st[o.Deflect_1]);
    
//    console.log('</ul><li>','@@@@@ End eqnset','</li>');
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