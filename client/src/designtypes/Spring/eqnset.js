export function eqnset(d, p) {        /*    Compression  Spring  */
    var x = [];

//    const Spring_Type = 0;
//    const Material_Type = 1;
//    const ASTM_Fed_Spec = 2;
//    const End_Type = 3;
//    const Catalog_Number = 4;
//    const Process = 5;
//    const Material_File = 6;
//    const Dialog_Switch = 7;
    const Prop_Calc_Method = 8;
//    const End_Calc_Method = 9;
//    const Life_Category = 10;
    const material_index = 11;
    const Inactive_Coils = 12;
    const Add_Coils_Solid = 13;
    const Density = 14;
    const Torsion_Modulus = 15;
    const Hot_Factor_Kh = 16;
    const Tensile = 17;
    const PC_Tensile_Endur = 18;
    const PC_Tensile_Stat = 19;
//    const unused = 20;
    const Stress_Lim_Endur = 21;
    const Stress_Lim_Stat = 22;
    const const_term = 23;
    const slope_term = 24;
    const tensile_010 = 25;

    const OD_Free = 0;
    const Wire_Dia = 1;
    const L_Free = 2;
    const Coils_T = 3;
    const Force_1 = 4;
    const Force_2 = 5;
    
    const Mean_Dia = 0;
    const Coils_A = 1;
    const Rate = 2;
    const Deflect_1 = 3;
    const Deflect_2 = 4;
    const L_1 = 5;
    const L_2 = 6;
    const L_Stroke = 7;
    const L_Solid = 8;
    const Slenderness = 9;
    const ID_Free = 10;
    const Weight = 11;
    const Spring_Index = 12;
    const Force_Solid = 13;
    const Stress_1 = 14;
    const Stress_2 = 15;
    const Stress_Solid = 16;
    const FactorSafety_2 = 17;
    const FactorSafety_Solid = 18;
    const FS_CycleLife = 19;
    const Cycle_Life = 20;
    const PC_Avail_Deflect = 21;
    
    const zero = 0.0;
    var ks;
    var kc;
    var temp;
    var s_f;
    var stress_avg;
    var stress_rng;
    var se2;
    
    /*  *******  DESIGN EQUATIONS  *******                  */
    x[Mean_Dia] = p[OD_Free] - p[Wire_Dia];

    x[ID_Free] = x[Mean_Dia] - p[Wire_Dia];

    x[Spring_Index] = x[Mean_Dia] / p[Wire_Dia];

    kc = (4.0 * x[Spring_Index] - 1.0) / (4.0 * x[Spring_Index] - 4.0);

    ks = kc + 0.615 / x[Spring_Index];

    x[Coils_A] = p[Coils_T] - d[Inactive_Coils];

    temp = x[Spring_Index] * x[Spring_Index];
    x[Rate] = d[Hot_Factor_Kh] * d[Torsion_Modulus] * x[Mean_Dia] /
           (8.0 * x[Coils_A] * temp * temp);

    x[Deflect_1] = p[Force_1] / x[Rate];
    x[Deflect_2] = p[Force_2] / x[Rate];

    x[L_1] = p[L_Free] - x[Deflect_1];
    x[L_2] = p[L_Free] - x[Deflect_2];

    x[L_Stroke] = x[L_1] - x[L_2];

    x[Slenderness] = p[L_Free] / x[Mean_Dia];

    x[L_Solid] = p[Wire_Dia] * (p[Coils_T] + d[Add_Coils_Solid]);

    x[Force_Solid] = x[Rate] * (p[L_Free] - x[L_Solid]);

      s_f = ks * 8.0 * x[Mean_Dia] / (Math.PI * p[Wire_Dia] * p[Wire_Dia] * p[Wire_Dia]);

    x[Stress_1] = s_f * p[Force_1];
    x[Stress_2] = s_f * p[Force_2];
    x[Stress_Solid] = s_f * x[Force_Solid];

      if (d[Prop_Calc_Method] === 1) {
          d[Tensile] = d[slope_term] * (Math.log10(p[Wire_Dia]) - d[const_term]) + d[tensile_010];
//          console.log("Tensile = ", d[Tensile]);
      }
      if (d[Prop_Calc_Method] <= 2) {
          d[Stress_Lim_Endur] = d[Tensile] * d[PC_Tensile_Endur] / 100.0;
          d[Stress_Lim_Stat]  = d[Tensile] * d[PC_Tensile_Stat]  / 100.0;
      }

    if (x[Stress_2] > zero) {
        x[FactorSafety_2] = d[Stress_Lim_Stat] / x[Stress_2];
//        console.log("FactorSafety_2 = ", x[FactorSafety_2]);
    }
       else x[FactorSafety_2] = 1.0;

    if (x[Stress_Solid] > zero) {
        x[FactorSafety_Solid] = d[Stress_Lim_Stat] / x[Stress_Solid];
    }
           else x[FactorSafety_Solid] = 1.0;

        /*
            Soderberg triangle approach to mixed steady and
            alternating stress.  See Spotts pg 29 & 68.

            Depending on the source of data for PC_TENSILE_ENDUR
            (which determines STRESS_LIM_ENDUR) this calculation
            may be overly conservative by a factor of KC or
            more.
        */
      stress_avg = (x[Stress_1] + x[Stress_2]) / 2.0;
      stress_rng = (x[Stress_2] - x[Stress_1]) / 2.0;
      se2 = d[Stress_Lim_Endur] / 2.0;
    x[FS_CycleLife] =  d[Stress_Lim_Stat] /
         (kc * stress_rng * (d[Stress_Lim_Stat] - se2) / se2 + stress_avg);

             /*  modified Goodman cycle life calculation  */
    if (d[Prop_Calc_Method] === 1 && d[material_index] !== 0) {
//        x[Cycle_Life] = cl_calc(material_index,life_catagory,1,tensile,stress_1,stress_2);
        x[Cycle_Life] = 0.0;    // TODO:  enable cl_calc, remove this
    }
       else x[Cycle_Life] = 0.0;

                           /*  crude approximation  ... better available on web  */
    x[Weight] = d[Density] * (Math.PI * p[Wire_Dia] * p[Wire_Dia] / 4.0) * (Math.PI * x[Mean_Dia] * p[Coils_T]);

    if (p[L_Free] > x[L_Solid]) {
        x[PC_Avail_Deflect] = 100.0 * x[Deflect_2] / (p[L_Free] - x[L_Solid]);
        if (p[L_Free] < x[L_Solid] + p[Wire_Dia]) {
            temp = 100.0 * x[Deflect_2] / p[Wire_Dia] + 10000.0 * (x[L_Solid] + p[Wire_Dia] - p[L_Free]);
            if (temp < x[PC_Avail_Deflect]) x[PC_Avail_Deflect] = temp;
        };
    }
    else x[PC_Avail_Deflect] = 100.0 * x[Deflect_2] / p[Wire_Dia] + 10000.0 * (x[L_Solid] + p[Wire_Dia] - p[L_Free]);
    
    return x;
}