import * as o from '../../../designtypes/Spring/Torsion/offsets';
import { eqnset } from '../../../designtypes/Spring/Torsion/eqnset';

//=====================================================================
// eqnset
//=====================================================================

it('eqnset initialState', () => { // !!! Heat_Treat = 2 !!!
    var p = []; // p vector
    var x = []; // x vector

    // p vector: OD_Free 0, Wire_Dia 1, Coils_T 2, M_1 3, M_2 4, Coil_Spacing 5,
    var p =     [0.9265,    0.063,      7.04,      0.05,  4,     0];
    // x vector: Mean_Dia 0, ID_Free 1, Coils_A 2, Rate 3, Deflect_1 4, Deflect_2 5, L_Body 6, L_1 7, L_2 8, End_Angle_Free 9,
    var x = [    0.0,        0.0,       0.0,       0.0,    0.0,         0.0,         0.0,      0.0,   0.0,   0.0,
    // Stroke 10, Weight 11, Spring_Index 12, End_Deflect_All 13, Stress_1 14, Stress_2 15, Stress_End 16, FS_2 17, FS_CycleLife 18, Cycle_Life 19,
       0.0,        0.0,       0.0,            0.0,                0.0,         0.0,         0.0,           0.0,     0.0,             0.0,
    // PC_Safe_Deflect 20, Force_Arm_2 21, Energy 22, Spring_Type 23, Prop_Calc_Method 24, Material_Type 25, ASTM_Fed_Spec 26, Process 27,    Heat_Treat 28, Catalog_Number 29,
       0.0,                0.0,            0.0,      'Torsion',       1,                   2,               'A228/QQW-470',    'Cold_Coiled', 2,             '',
    // Material_File 30, Life_Category 31, Inactive_Coils 32, Density 33, Elastic_Modulus 34, Hot_Factor_Kh 35,   Tensile 36,         PC_Ten_Bnd_Endur 37, PC_Ten_Bnd_Stat 38, Stress_Lim_Bnd_Endur 39,
       'mat_us.json',    1,                0,                 0.284,      30000000,           1,                  285179.2728470361,  75,                  75,                 213884.45463527704,
    // Stress_Lim_Bnd_Stat 40, End_Type 41, Arm_1 42, Arm_2 43, Xlen_1 44, Xlen_2 45, L_End_1 46, L_End_2 47, tbase010 48, tbase400 49,
       213884.45463527704,     1,           0,        0,        0,         0,         0,          0,          0.01,        0.4,
    // const_term 50, slope_term 51,       tensile_010 52,
       -2,            -106113.37959890341, 370000];
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    // Independent Variables
    expect(p[o.OD_Free]).toEqual(0.9265);
    expect(p[o.Wire_Dia]).toEqual(0.063);
    expect(p[o.Coils_T]).toEqual(7.04);
    expect(p[o.M_1]).toEqual(0.05);
    expect(p[o.M_2]).toEqual(4);
    expect(p[o.Coil_Spacing]).toEqual(0.0);

    // Dependent Variables
    expect(x[o.Mean_Dia]).toEqual(0.8634999999999999);
    expect(x[o.ID_Free]).toEqual(0.8005);
    expect(x[o.Coils_A]).toEqual(7.04);
    expect(x[o.Rate]).toEqual(0.019995036222824662);
    expect(x[o.Deflect_1]).toEqual(2.5006206261794204);
    expect(x[o.Deflect_2]).toEqual(200.04965009435364);
    expect(x[o.L_Body]).toEqual(0.50652);
    expect(x[o.L_1]).toEqual(0.5069576086095814);
    expect(x[o.L_2]).toEqual(0.5415286887665118);
    expect(x[o.End_Angle_Free]).toEqual(14.400000000000013);
    expect(x[o.Stroke]).toEqual(197.5490294681742);
    expect(x[o.Weight]).toEqual(0.016913243020753567);
    expect(x[o.Spring_Index]).toEqual(13.706349206349206);
    expect(x[o.End_Deflect_All]).toEqual(0.0);
    expect(x[o.Stress_1]).toEqual(2157.0237343521517);
    expect(x[o.Stress_2]).toEqual(172561.89874817213);
    expect(x[o.Stress_End]).toEqual(0.0);
    expect(x[o.FS_2]).toEqual(1.2394651205560094);
    expect(x[o.FS_CycleLife]).toEqual(1.2043652274974437);
    expect(x[o.Cycle_Life]).toEqual(41332.48658844737);
    expect(x[o.PC_Safe_Deflect]).toEqual(80.67996294655002);
    expect(x[o.Force_Arm_2]).toEqual(0.0);
    expect(x[o.Energy]).toEqual(6.981959021636359);

    // Calc Inputs
    expect(x[o.Spring_Type]).toEqual('Torsion');
    expect(x[o.Prop_Calc_Method]).toEqual(1);
    expect(x[o.Material_Type]).toEqual(2);
    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
    expect(x[o.Process]).toEqual('Cold_Coiled');
    expect(x[o.Heat_Treat]).toEqual(2);
    expect(x[o.Catalog_Number]).toEqual('');
    expect(x[o.Material_File]).toEqual('mat_us.json');
    expect(x[o.Life_Category]).toEqual(1);
    expect(x[o.Inactive_Coils]).toEqual(0.0);
    expect(x[o.Density]).toEqual(0.284);
    expect(x[o.Elastic_Modulus]).toEqual(30000000);
    expect(x[o.Hot_Factor_Kh]).toEqual(1);
    expect(x[o.Tensile]).toEqual(285179.2728470361);
    expect(x[o.PC_Ten_Bnd_Endur]).toEqual(75);
    expect(x[o.PC_Ten_Bnd_Stat]).toEqual(75);
    expect(x[o.Stress_Lim_Bnd_Endur]).toEqual(213884.45463527704);
    expect(x[o.Stress_Lim_Bnd_Stat]).toEqual(213884.45463527704);
    expect(x[o.End_Type]).toEqual(1);
    expect(x[o.Arm_1]).toEqual(0.0);
    expect(x[o.Arm_2]).toEqual(0.0);
    expect(x[o.Xlen_1]).toEqual(0.0);
    expect(x[o.Xlen_2]).toEqual(0.0);
    expect(x[o.L_End_1]).toEqual(0.0);
    expect(x[o.L_End_2]).toEqual(0.0);
    expect(x[o.tbase010]).toEqual(0.01);
    expect(x[o.tbase400]).toEqual(0.4);
    expect(x[o.const_term]).toEqual(-2);
    expect(x[o.slope_term]).toEqual(-106113.37959890341);
    expect(x[o.tensile_010]).toEqual(370000);
});

it('eqnset pathological OD_Free === Wire_Dia * 2.0 && Spring_Index === 1.0', () => { // !!! Heat_Treat = 2 !!!
    var p = []; // p vector
    var x = []; // x vector

    // p vector: OD_Free 0, Wire_Dia 1, Coils_T 2, M_1 3, M_2 4, Coil_Spacing 5,
    var p =     [0.4,       0.2,        7.04,      0.05,  4,     0];
    // x vector: Mean_Dia 0, ID_Free 1, Coils_A 2, Rate 3, Deflect_1 4, Deflect_2 5, L_Body 6, L_1 7, L_2 8, End_Angle_Free 9,
    var x = [    0.0,        0.0,       0.0,       0.0,    0.0,         0.0,         0.0,      0.0,   0.0,   0.0,
    // Stroke 10, Weight 11, Spring_Index 12, End_Deflect_All 13, Stress_1 14, Stress_2 15, Stress_End 16, FS_2 17, FS_CycleLife 18, Cycle_Life 19,
       0.0,        0.0,       0.0,            0.0,                0.0,         0.0,         0.0,           0.0,     0.0,             0.0,
    // PC_Safe_Deflect 20, Force_Arm_2 21, Energy 22, Spring_Type 23, Prop_Calc_Method 24, Material_Type 25, ASTM_Fed_Spec 26, Process 27,    Heat_Treat 28, Catalog_Number 29,
       0.0,                0.0,            0.0,      'Torsion',       1,                   2,               'A228/QQW-470',    'Cold_Coiled', 2,             '',
    // Material_File 30, Life_Category 31, Inactive_Coils 32, Density 33, Elastic_Modulus 34, Hot_Factor_Kh 35,   Tensile 36,         PC_Ten_Bnd_Endur 37, PC_Ten_Bnd_Stat 38, Stress_Lim_Bnd_Endur 39,
       'mat_us.json',    1,                0,                 0.284,      30000000,           1,                  285179.2728470361,  75,                  75,                 213884.45463527704,
    // Stress_Lim_Bnd_Stat 40, End_Type 41, Arm_1 42, Arm_2 43, Xlen_1 44, Xlen_2 45, L_End_1 46, L_End_2 47, tbase010 48, tbase400 49,
       213884.45463527704,     1,           0,        0,        0,         0,         0,          0,          0.01,        0.4,
    // const_term 50, slope_term 51,       tensile_010 52,
       -2,            -106113.37959890341, 370000];
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    // Independent Variables
    expect(p[o.OD_Free]).toEqual(0.4);
    expect(p[o.Wire_Dia]).toEqual(0.2);
    expect(p[o.Coils_T]).toEqual(7.04);
    expect(p[o.M_1]).toEqual(0.05);
    expect(p[o.M_2]).toEqual(4);
    expect(p[o.Coil_Spacing]).toEqual(0.0);

    // Dependent Variables
    expect(x[o.Mean_Dia]).toEqual(0.2);
    expect(x[o.ID_Free]).toEqual(0.0);
    expect(x[o.Coils_A]).toEqual(7.04);
    expect(x[o.Rate]).toEqual(8.768237934904604);
    expect(x[o.Deflect_1]).toEqual(0.005702399999999998);
    expect(x[o.Deflect_2]).toEqual(0.4561919999999999);
    expect(x[o.L_Body]).toEqual(1.6079999999999999);
    expect(x[o.L_1]).toEqual(1.6080031679999998);
    expect(x[o.L_2]).toEqual(1.6082534399999997);
    expect(x[o.End_Angle_Free]).toEqual(14.400000000000013);
    expect(x[o.Stroke]).toEqual(0.4504895999999999);
    expect(x[o.Weight]).toEqual(0.041992595434672854);
    expect(x[o.Spring_Index]).toEqual(1);
    expect(x[o.End_Deflect_All]).toEqual(0.0);
    expect(x[o.Stress_1]).toEqual(Number.POSITIVE_INFINITY);
    expect(x[o.Stress_2]).toEqual(Number.POSITIVE_INFINITY);
    expect(x[o.Stress_End]).toEqual(0.0);
    expect(x[o.FS_2]).toEqual(0.0);
    expect(x[o.FS_CycleLife]).toEqual(Number.NaN);
    expect(x[o.Cycle_Life]).toEqual(Number.NaN);
    expect(x[o.PC_Safe_Deflect]).toEqual(Number.POSITIVE_INFINITY);
    expect(x[o.Force_Arm_2]).toEqual(0.0);
    expect(x[o.Energy]).toEqual(0.0159216167011343);

    // Calc Inputs
    expect(x[o.Spring_Type]).toEqual('Torsion');
    expect(x[o.Prop_Calc_Method]).toEqual(1);
    expect(x[o.Material_Type]).toEqual(2);
    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
    expect(x[o.Process]).toEqual('Cold_Coiled');
    expect(x[o.Heat_Treat]).toEqual(2);
    expect(x[o.Catalog_Number]).toEqual('');
    expect(x[o.Material_File]).toEqual('mat_us.json');
    expect(x[o.Life_Category]).toEqual(1);
    expect(x[o.Inactive_Coils]).toEqual(0.0);
    expect(x[o.Density]).toEqual(0.284);
    expect(x[o.Elastic_Modulus]).toEqual(30000000);
    expect(x[o.Hot_Factor_Kh]).toEqual(1);
    expect(x[o.Tensile]).toEqual(231943.3102005483);
    expect(x[o.PC_Ten_Bnd_Endur]).toEqual(75);
    expect(x[o.PC_Ten_Bnd_Stat]).toEqual(75);
    expect(x[o.Stress_Lim_Bnd_Endur]).toEqual(173957.4826504112);
    expect(x[o.Stress_Lim_Bnd_Stat]).toEqual(173957.4826504112);
    expect(x[o.End_Type]).toEqual(1);
    expect(x[o.Arm_1]).toEqual(0.0);
    expect(x[o.Arm_2]).toEqual(0.0);
    expect(x[o.Xlen_1]).toEqual(0.0);
    expect(x[o.Xlen_2]).toEqual(0.0);
    expect(x[o.L_End_1]).toEqual(0.0);
    expect(x[o.L_End_2]).toEqual(0.0);
    expect(x[o.tbase010]).toEqual(0.01);
    expect(x[o.tbase400]).toEqual(0.4);
    expect(x[o.const_term]).toEqual(-2);
    expect(x[o.slope_term]).toEqual(-106113.37959890341);
    expect(x[o.tensile_010]).toEqual(370000);
});


it('eqnset pathological OD_Free === Wire_Dia && Mean_Dia === 0.0', () => { // !!! Heat_Treat = 2 !!!
    var p = []; // p vector
    var x = []; // x vector

    // p vector: OD_Free 0, Wire_Dia 1, Coils_T 2, M_1 3, M_2 4, Coil_Spacing 5,
    var p =     [0.4,       0.4,        7.04,      0.05,  4,     0];
    // x vector: Mean_Dia 0, ID_Free 1, Coils_A 2, Rate 3, Deflect_1 4, Deflect_2 5, L_Body 6, L_1 7, L_2 8, End_Angle_Free 9,
    var x = [    0.0,        0.0,       0.0,       0.0,    0.0,         0.0,         0.0,      0.0,   0.0,   0.0,
    // Stroke 10, Weight 11, Spring_Index 12, End_Deflect_All 13, Stress_1 14, Stress_2 15, Stress_End 16, FS_2 17, FS_CycleLife 18, Cycle_Life 19,
       0.0,        0.0,       0.0,            0.0,                0.0,         0.0,         0.0,           0.0,     0.0,             0.0,
    // PC_Safe_Deflect 20, Force_Arm_2 21, Energy 22, Spring_Type 23, Prop_Calc_Method 24, Material_Type 25, ASTM_Fed_Spec 26, Process 27,    Heat_Treat 28, Catalog_Number 29,
       0.0,                0.0,            0.0,      'Torsion',       1,                   2,               'A228/QQW-470',    'Cold_Coiled', 2,             '',
    // Material_File 30, Life_Category 31, Inactive_Coils 32, Density 33, Elastic_Modulus 34, Hot_Factor_Kh 35,   Tensile 36,         PC_Ten_Bnd_Endur 37, PC_Ten_Bnd_Stat 38, Stress_Lim_Bnd_Endur 39,
       'mat_us.json',    1,                0,                 0.284,      30000000,           1,                  285179.2728470361,  75,                  75,                 213884.45463527704,
    // Stress_Lim_Bnd_Stat 40, End_Type 41, Arm_1 42, Arm_2 43, Xlen_1 44, Xlen_2 45, L_End_1 46, L_End_2 47, tbase010 48, tbase400 49,
       213884.45463527704,     1,           0,        0,        0,         0,         0,          0,          0.01,        0.4,
    // const_term 50, slope_term 51,       tensile_010 52,
       -2,            -106113.37959890341, 370000];
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    // Independent Variables
    expect(p[o.OD_Free]).toEqual(0.4);
    expect(p[o.Wire_Dia]).toEqual(0.4);
    expect(p[o.Coils_T]).toEqual(7.04);
    expect(p[o.M_1]).toEqual(0.05);
    expect(p[o.M_2]).toEqual(4);
    expect(p[o.Coil_Spacing]).toEqual(0.0);

    // Dependent Variables
    expect(x[o.Mean_Dia]).toEqual(0.0);
    expect(x[o.ID_Free]).toEqual(-0.4);
    expect(x[o.Coils_A]).toEqual(Number.NaN);
    expect(x[o.Rate]).toEqual(Number.NaN);
    expect(x[o.Deflect_1]).toEqual(Number.NaN);
    expect(x[o.Deflect_2]).toEqual(Number.NaN);
    expect(x[o.L_Body]).toEqual(3.2159999999999997);
    expect(x[o.L_1]).toEqual(Number.NaN);
    expect(x[o.L_2]).toEqual(Number.NaN);
    expect(x[o.End_Angle_Free]).toEqual(14.400000000000013);
    expect(x[o.Stroke]).toEqual(Number.NaN);
    expect(x[o.Weight]).toEqual(0.11477419202401264);
    expect(x[o.Spring_Index]).toEqual(0.0);
    expect(x[o.End_Deflect_All]).toEqual(Number.NaN);
    expect(x[o.Stress_1]).toEqual(1.9894367886486917);
    expect(x[o.Stress_2]).toEqual(159.15494309189532);
    expect(x[o.Stress_End]).toEqual(0.0);
    expect(x[o.FS_2]).toEqual(942.477796076938);
    expect(x[o.FS_CycleLife]).toEqual(1496.7389317350876);
    expect(x[o.Cycle_Life]).toEqual(2.888738520002979e+29);
    expect(x[o.PC_Safe_Deflect]).toEqual(Number.NaN);
    expect(x[o.Force_Arm_2]).toEqual(0.0);
    expect(x[o.Energy]).toEqual(Number.NaN);

    // Calc Inputs
    expect(x[o.Spring_Type]).toEqual('Torsion');
    expect(x[o.Prop_Calc_Method]).toEqual(1);
    expect(x[o.Material_Type]).toEqual(2);
    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
    expect(x[o.Process]).toEqual('Cold_Coiled');
    expect(x[o.Heat_Treat]).toEqual(2);
    expect(x[o.Catalog_Number]).toEqual('');
    expect(x[o.Material_File]).toEqual('mat_us.json');
    expect(x[o.Life_Category]).toEqual(1);
    expect(x[o.Inactive_Coils]).toEqual(0.0);
    expect(x[o.Density]).toEqual(0.284);
    expect(x[o.Elastic_Modulus]).toEqual(30000000);
    expect(x[o.Hot_Factor_Kh]).toEqual(1);
    expect(x[o.Tensile]).toEqual(200000);
    expect(x[o.PC_Ten_Bnd_Endur]).toEqual(75);
    expect(x[o.PC_Ten_Bnd_Stat]).toEqual(75);
    expect(x[o.Stress_Lim_Bnd_Endur]).toEqual(150000);
    expect(x[o.Stress_Lim_Bnd_Stat]).toEqual(150000);
    expect(x[o.End_Type]).toEqual(1);
    expect(x[o.Arm_1]).toEqual(0.0);
    expect(x[o.Arm_2]).toEqual(0.0);
    expect(x[o.Xlen_1]).toEqual(0.0);
    expect(x[o.Xlen_2]).toEqual(0.0);
    expect(x[o.L_End_1]).toEqual(0.0);
    expect(x[o.L_End_2]).toEqual(0.0);
    expect(x[o.tbase010]).toEqual(0.01);
    expect(x[o.tbase400]).toEqual(0.4);
    expect(x[o.const_term]).toEqual(-2);
    expect(x[o.slope_term]).toEqual(-106113.37959890341);
    expect(x[o.tensile_010]).toEqual(370000);
});
