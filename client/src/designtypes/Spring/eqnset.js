import * as o from './offsets';
export function eqnset(p) {        /*    Compression  Spring  */
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
    x[o.Mean_Dia] = p[o.OD_Free] - p[o.Wire_Dia];

    x[o.ID_Free] = x[o.Mean_Dia] - p[o.Wire_Dia];

    x[o.Spring_Index] = x[o.Mean_Dia] / p[o.Wire_Dia];

    kc = (4.0 * x[o.Spring_Index] - 1.0) / (4.0 * x[o.Spring_Index] - 4.0);

    ks = kc + 0.615 / x[o.Spring_Index];

    x[o.Coils_A] = p[o.Coils_T] - p[o.Inactive_Coils];

    temp = x[o.Spring_Index] * x[o.Spring_Index];
    x[o.Rate] = p[o.Hot_Factor_Kh] * p[o.Torsion_Modulus] * x[o.Mean_Dia] /
           (8.0 * x[o.Coils_A] * temp * temp);

    x[o.Deflect_1] = p[o.Force_1] / x[o.Rate];
    x[o.Deflect_2] = p[o.Force_2] / x[o.Rate];

    x[o.L_1] = p[o.L_Free] - x[o.Deflect_1];
    x[o.L_2] = p[o.L_Free] - x[o.Deflect_2];

    x[o.L_Stroke] = x[o.L_1] - x[o.L_2];

    x[o.Slenderness] = p[o.L_Free] / x[o.Mean_Dia];

    x[o.L_Solid] = p[o.Wire_Dia] * (p[o.Coils_T] + p[o.Add_Coils_Solid]);

    x[o.Force_Solid] = x[o.Rate] * (p[o.L_Free] - x[o.L_Solid]);

      s_f = ks * 8.0 * x[o.Mean_Dia] / (Math.PI * p[o.Wire_Dia] * p[o.Wire_Dia] * p[o.Wire_Dia]);

    x[o.Stress_1] = s_f * p[o.Force_1];
    x[o.Stress_2] = s_f * p[o.Force_2];
    x[o.Stress_Solid] = s_f * x[o.Force_Solid];

      if (p[o.Prop_Calc_Method] === 1) {
          p[o.Tensile] = p[o.slope_term] * (Math.log10(p[o.Wire_Dia]) - p[o.const_term]) + p[o.tensile_010];
//          console.log("eqnset Tensile = ", p[o.Tensile]);
      }
      if (p[o.Prop_Calc_Method] <= 2) {
          p[o.Stress_Lim_Endur] = p[o.Tensile] * p[o.PC_Tensile_Endur] / 100.0;
          p[o.Stress_Lim_Stat]  = p[o.Tensile] * p[o.PC_Tensile_Stat]  / 100.0;
      }

    if (x[o.Stress_2] > zero) {
        x[o.FactorSafety_2] = p[o.Stress_Lim_Stat] / x[o.Stress_2];
//        console.log("eqnset FactorSafety_2 = ", x[o.FactorSafety_2]);
    }
       else x[o.FactorSafety_2] = 1.0;

    if (x[o.Stress_Solid] > zero) {
        x[o.FactorSafety_Solid] = p[o.Stress_Lim_Stat] / x[o.Stress_Solid];
    }
           else x[o.FactorSafety_Solid] = 1.0;

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
      se2 = p[o.Stress_Lim_Endur] / 2.0;
    x[o.FS_CycleLife] =  p[o.Stress_Lim_Stat] /
         (kc * stress_rng * (p[o.Stress_Lim_Stat] - se2) / se2 + stress_avg);

             /*  modified Goodman cycle life calculation  */
    if (p[o.Prop_Calc_Method] === 1 && p[o.Material_Index] !== 0) {
//        x[o.Cycle_Life] = cl_calc(material_index,life_catagory,1,tensile,stress_1,stress_2);
        x[o.Cycle_Life] = 0.0;    // TODO:  enable cl_calc, remove this
    }
       else x[o.Cycle_Life] = 0.0;

                           /*  crude approximation  ... better available on web  */
    x[o.Weight] = p[o.Density] * (Math.PI * p[o.Wire_Dia] * p[o.Wire_Dia] / 4.0) * (Math.PI * x[o.Mean_Dia] * p[o.Coils_T]);

    if (p[o.L_Free] > x[o.L_Solid]) {
        x[o.PC_Avail_Deflect] = 100.0 * x[o.Deflect_2] / (p[o.L_Free] - x[o.L_Solid]);
        if (p[o.L_Free] < x[o.L_Solid] + p[o.Wire_Dia]) {
            temp = 100.0 * x[o.Deflect_2] / p[o.Wire_Dia] + 10000.0 * (x[o.L_Solid] + p[o.Wire_Dia] - p[o.L_Free]);
            if (temp < x[o.PC_Avail_Deflect]) x[o.PC_Avail_Deflect] = temp;
        };
    }
    else x[o.PC_Avail_Deflect] = 100.0 * x[o.Deflect_2] / p[o.Wire_Dia] + 10000.0 * (x[o.L_Solid] + p[o.Wire_Dia] - p[o.L_Free]);
    
    return x;
}