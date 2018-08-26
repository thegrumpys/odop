import * as offsets from './offsets';
export function eqnset(d, p) {        /*    Compression  Spring  */
    var x = [];

    const zero = 0.0;
    var ks;
    var kc;
    var temp;
    var s_f;
    var stress_avg;
    var stress_rng;
    var se2;
    
    /*  *******  DESIGN EQUATIONS  *******                  */
    x[offsets.Mean_Dia] = p[offsets.OD_Free] - p[offsets.Wire_Dia];

    x[offsets.ID_Free] = x[offsets.Mean_Dia] - p[offsets.Wire_Dia];

    x[offsets.Spring_Index] = x[offsets.Mean_Dia] / p[offsets.Wire_Dia];

    kc = (4.0 * x[offsets.Spring_Index] - 1.0) / (4.0 * x[offsets.Spring_Index] - 4.0);

    ks = kc + 0.615 / x[offsets.Spring_Index];

    x[offsets.Coils_A] = p[offsets.Coils_T] - p[offsets.Inactive_Coils];

    temp = x[offsets.Spring_Index] * x[offsets.Spring_Index];
    x[offsets.Rate] = p[offsets.Hot_Factor_Kh] * p[offsets.Torsion_Modulus] * x[offsets.Mean_Dia] /
           (8.0 * x[offsets.Coils_A] * temp * temp);

    x[offsets.Deflect_1] = p[offsets.Force_1] / x[offsets.Rate];
    x[offsets.Deflect_2] = p[offsets.Force_2] / x[offsets.Rate];

    x[offsets.L_1] = p[offsets.L_Free] - x[offsets.Deflect_1];
    x[offsets.L_2] = p[offsets.L_Free] - x[offsets.Deflect_2];

    x[offsets.L_Stroke] = x[offsets.L_1] - x[offsets.L_2];

    x[offsets.Slenderness] = p[offsets.L_Free] / x[offsets.Mean_Dia];

    x[offsets.L_Solid] = p[offsets.Wire_Dia] * (p[offsets.Coils_T] + p[offsets.Add_Coils_Solid]);

    x[offsets.Force_Solid] = x[offsets.Rate] * (p[offsets.L_Free] - x[offsets.L_Solid]);

      s_f = ks * 8.0 * x[offsets.Mean_Dia] / (Math.PI * p[offsets.Wire_Dia] * p[offsets.Wire_Dia] * p[offsets.Wire_Dia]);

    x[offsets.Stress_1] = s_f * p[offsets.Force_1];
    x[offsets.Stress_2] = s_f * p[offsets.Force_2];
    x[offsets.Stress_Solid] = s_f * x[offsets.Force_Solid];

      if (p[offsets.Prop_Calc_Method] === 1) {
          p[offsets.Tensile] = p[offsets.slope_term] * (Math.log10(p[offsets.Wire_Dia]) - p[offsets.const_term]) + p[offsets.tensile_010];
//          console.log("eqnset Tensile = ", p[offsets.Tensile]);
      }
      if (p[offsets.Prop_Calc_Method] <= 2) {
          p[offsets.Stress_Lim_Endur] = p[offsets.Tensile] * p[offsets.PC_Tensile_Endur] / 100.0;
          p[offsets.Stress_Lim_Stat]  = p[offsets.Tensile] * p[offsets.PC_Tensile_Stat]  / 100.0;
      }

    if (x[offsets.Stress_2] > zero) {
        x[offsets.FactorSafety_2] = p[offsets.Stress_Lim_Stat] / x[offsets.Stress_2];
//        console.log("eqnset FactorSafety_2 = ", x[offsets.FactorSafety_2]);
    }
       else x[offsets.FactorSafety_2] = 1.0;

    if (x[offsets.Stress_Solid] > zero) {
        x[offsets.FactorSafety_Solid] = p[offsets.Stress_Lim_Stat] / x[offsets.Stress_Solid];
    }
           else x[offsets.FactorSafety_Solid] = 1.0;

        /*
            Soderberg triangle approach to mixed steady and
            alternating stress.  See Spotts pg 29 & 68.

            Depending on the source of data for PC_TENSILE_ENDUR
            (which determines STRESS_LIM_ENDUR) this calculation
            may be overly conservative by a factor of KC or
            more.
        */
      stress_avg = (x[offsets.Stress_1] + x[offsets.Stress_2]) / 2.0;
      stress_rng = (x[offsets.Stress_2] - x[offsets.Stress_1]) / 2.0;
      se2 = p[offsets.Stress_Lim_Endur] / 2.0;
    x[offsets.FS_CycleLife] =  p[offsets.Stress_Lim_Stat] /
         (kc * stress_rng * (p[offsets.Stress_Lim_Stat] - se2) / se2 + stress_avg);

             /*  modified Goodman cycle life calculation  */
    if (p[offsets.Prop_Calc_Method] === 1 && p[offsets.Material_Index] !== 0) {
//        x[offsets.Cycle_Life] = cl_calc(material_index,life_catagory,1,tensile,stress_1,stress_2);
        x[offsets.Cycle_Life] = 0.0;    // TODO:  enable cl_calc, remove this
    }
       else x[offsets.Cycle_Life] = 0.0;

                           /*  crude approximation  ... better available on web  */
    x[offsets.Weight] = p[offsets.Density] * (Math.PI * p[offsets.Wire_Dia] * p[offsets.Wire_Dia] / 4.0) * (Math.PI * x[offsets.Mean_Dia] * p[offsets.Coils_T]);

    if (p[offsets.L_Free] > x[offsets.L_Solid]) {
        x[offsets.PC_Avail_Deflect] = 100.0 * x[offsets.Deflect_2] / (p[offsets.L_Free] - x[offsets.L_Solid]);
        if (p[offsets.L_Free] < x[offsets.L_Solid] + p[offsets.Wire_Dia]) {
            temp = 100.0 * x[offsets.Deflect_2] / p[offsets.Wire_Dia] + 10000.0 * (x[offsets.L_Solid] + p[offsets.Wire_Dia] - p[offsets.L_Free]);
            if (temp < x[offsets.PC_Avail_Deflect]) x[offsets.PC_Avail_Deflect] = temp;
        };
    }
    else x[offsets.PC_Avail_Deflect] = 100.0 * x[offsets.Deflect_2] / p[offsets.Wire_Dia] + 10000.0 * (x[offsets.L_Solid] + p[offsets.Wire_Dia] - p[offsets.L_Free]);
    
    return x;
}