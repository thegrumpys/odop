import * as o from './offsets';
import * as mo from './mat_ips_offsets';
export function eqnset(p, x) {        /*    Compression  Spring  */
    const zero = 0.0;
    var ks;
    var kc;
    var temp;
    var s_f;
    var stress_avg;
    var stress_rng;
    var se2;
    
    /*  *******  DESIGN EQUATIONS  *******                  */
    x[o.Mean_Dia] = p[o.OD_Free] - p[o.Wire_Dia];

    x[o.ID_Free] = x[o.Mean_Dia] - p[o.Wire_Dia];

    x[o.Spring_Index] = x[o.Mean_Dia] / p[o.Wire_Dia];

    kc = (4.0 * x[o.Spring_Index] - 1.0) / (4.0 * x[o.Spring_Index] - 4.0);

    ks = kc + 0.615 / x[o.Spring_Index];

    x[o.Coils_A] = p[o.Coils_T] - x[o.Inactive_Coils];

    temp = x[o.Spring_Index] * x[o.Spring_Index];
    x[o.Rate] = x[o.Hot_Factor_Kh] * x[o.Torsion_Modulus] * x[o.Mean_Dia] /
           (8.0 * x[o.Coils_A] * temp * temp);
//    console.log('x=',x);
//    console.log('x[o.Spring_Index]=',x[o.Spring_Index]);
//    console.log('x[o.Hot_Factor_Kh]=',x[o.Hot_Factor_Kh]);
//    console.log('x[o.Torsion_Modulus]=',x[o.Torsion_Modulus]);
//    console.log('x[o.Mean_Dia]=',x[o.Mean_Dia]);
//    console.log('x[o.Coils_A]=',x[o.Coils_A]);
//    console.log('x[o.Rate]=',x[o.Rate]);

    x[o.Deflect_1] = p[o.Force_1] / x[o.Rate];
    x[o.Deflect_2] = p[o.Force_2] / x[o.Rate];

    x[o.L_1] = p[o.L_Free] - x[o.Deflect_1];
    x[o.L_2] = p[o.L_Free] - x[o.Deflect_2];

    x[o.L_Stroke] = x[o.L_1] - x[o.L_2];

    x[o.Slenderness] = p[o.L_Free] / x[o.Mean_Dia];

    x[o.L_Solid] = p[o.Wire_Dia] * (p[o.Coils_T] + x[o.Add_Coils_Solid]);

    x[o.Force_Solid] = x[o.Rate] * (p[o.L_Free] - x[o.L_Solid]);

      s_f = ks * 8.0 * x[o.Mean_Dia] / (Math.PI * p[o.Wire_Dia] * p[o.Wire_Dia] * p[o.Wire_Dia]);

    x[o.Stress_1] = s_f * p[o.Force_1];
    x[o.Stress_2] = s_f * p[o.Force_2];
    x[o.Stress_Solid] = s_f * x[o.Force_Solid];

      if (x[o.Prop_Calc_Method] === 1) {
          x[o.Tensile] = x[o.slope_term] * (Math.log10(p[o.Wire_Dia]) - x[o.const_term]) + x[o.tensile_010];
//          console.log("eqnset Tensile = ", x[o.Tensile]);
      }
      if (x[o.Prop_Calc_Method] <= 2) {
          x[o.Stress_Lim_Endur] = x[o.Tensile] * x[o.PC_Tensile_Endur] / 100.0; 
          x[o.Stress_Lim_Stat]  = x[o.Tensile] * x[o.PC_Tensile_Stat]  / 100.0; 
      }

    if (x[o.Stress_2] > zero) {
        x[o.FS_2] = x[o.Stress_Lim_Stat] / x[o.Stress_2]; 
//        console.log("eqnset FS_2 = ", x[o.FS_2]);
    }
       else x[o.FS_2] = 1.0;

    if (x[o.Stress_Solid] > zero) {
        x[o.FS_Solid] = x[o.Stress_Lim_Stat] / x[o.Stress_Solid];
    }
           else x[o.FS_Solid] = 1.0;

        /*
            Soderberg triangle approach to mixed steady and
            alternating stress.  See Spotts pg 29 & 68.

            Depending on the source of data for PC_TENSILE_ENDUR
            (which determines STRESS_LIM_ENDUR) this calculation
            may be overly conservative by a factor of KC or
            more.
        */
      stress_avg = (x[o.Stress_1] + x[o.Stress_2]) / 2.0;
      stress_rng = (x[o.Stress_2] - x[o.Stress_1]) / 2.0;
      se2 = x[o.Stress_Lim_Endur] / 2.0; 
    x[o.FS_CycleLife] =  x[o.Stress_Lim_Stat] / 
         (kc * stress_rng * (x[o.Stress_Lim_Stat] - se2) / se2 + stress_avg); 

             /*  modified Goodman cycle life calculation  */
    if (x[o.Prop_Calc_Method] === 1 && x[o.Material_Type] !== 0) {
//        cycle_life = cl_calc(material_index,life_catagory,1,tensile,stress_1,stress_2);
        x[o.Cycle_Life] = cl_calc(x[o.Material_Type], x[o.Life_Category], 1, x[o.Tensile], x[o.Stress_1], x[o.Stress_2]);
    }
       else x[o.Cycle_Life] = NaN;

                           /*  crude approximation  ... better available on web  */
    x[o.Weight] = x[o.Density] * (Math.PI * p[o.Wire_Dia] * p[o.Wire_Dia] / 4.0) * (Math.PI * x[o.Mean_Dia] * p[o.Coils_T]);

    if (p[o.L_Free] > x[o.L_Solid]) {
        x[o.PC_Avail_Deflect] = 100.0 * x[o.Deflect_2] / (p[o.L_Free] - x[o.L_Solid]);
        if (p[o.L_Free] < x[o.L_Solid] + p[o.Wire_Dia]) {
            temp = 100.0 * x[o.Deflect_2] / p[o.Wire_Dia] + 10000.0 * (x[o.L_Solid] + p[o.Wire_Dia] - p[o.L_Free]);
            if (temp < x[o.PC_Avail_Deflect]) x[o.PC_Avail_Deflect] = temp;
        };
    }
    else x[o.PC_Avail_Deflect] = 100.0 * x[o.Deflect_2] / p[o.Wire_Dia] + 10000.0 * (x[o.L_Solid] + p[o.Wire_Dia] - p[o.L_Free]);
    
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
    var m_tab = require('./mat_ips.json');

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