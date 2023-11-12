import * as o from '../../../designtypes/Spring/Torsion/offsets';
import { eqnset } from '../../../designtypes/Spring/Torsion/eqnset';

//=====================================================================
// eqnset
//=====================================================================

it('eqnset initialState', () => {
    var p = []; // p vector
    var x = []; // x vector

    // p vector: OD_Free 0, Wire_Dia 1, Coils_T 2, M_1 3, M_2 4, Coil_Spacing 5, 
    var p =     [0.9265,    0.063,      7.04,      0.05,  4,     0];
    // x vector: Mean_Dia 0, ID_Free 1, Coils_A 2, Rate 3, Deflect_1 4, Deflect_2 5, L_Body 6, L_1 7, L_2 8, End_Angle_Free 9, 
    var x = [    0.0,        0.0,       0.0,       0.0,    0.0,         0.0,         0.0,      0.0,   0.0,   0.0, 
    // Stroke 10, Weight 11, Spring_Index 12, End_Deflect_All 13, Stress_1 14, Stress_2 15, Stress_End 16, FS_2 17, FS_CycleLife 18, Cycle_Life 19, 
       0.0,        0.0,       0.0,            0.0,                0.0,         0.0,         0.0,           0.0,     0.0,             0.0, 
    // PC_Safe_Deflect 20, Force_Arm_2 21, Energy 22, Spring_Type 23, Prop_Calc_Method 24, Material_Type 25, ASTM_Fed_Spec 26, Process 27,    Heat_Treat 28, Catalog_Number 29, 
       0.0,                0.0,            0.0,      'Torsion',       1,                   2,               'A228/QQW-470',    'Cold_Coiled', '1',           '',
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
    expect(p[o.Coil_Spacing]).toEqual(0);
    
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
    expect(x[o.End_Deflect_All]).toEqual(0);
    expect(x[o.Stress_1]).toEqual(2036.800353109876);
    expect(x[o.Stress_2]).toEqual(162944.02824879007);
    expect(x[o.Stress_End]).toEqual(0);
    expect(x[o.FS_2]).toEqual(1.3126253041241187);
    expect(x[o.FS_CycleLife]).toEqual(1.3126253041241187);
    expect(x[o.Cycle_Life]).toEqual(57163.94222209575);
    expect(x[o.PC_Safe_Deflect]).toEqual(76.18320299464854);
    expect(x[o.Force_Arm_2]).toEqual(0);
    expect(x[o.Energy]).toEqual(6.981959021636359);

    // Calc Inputs
    expect(x[o.Spring_Type]).toEqual('Torsion');
    expect(x[o.Prop_Calc_Method]).toEqual(1);
    expect(x[o.Material_Type]).toEqual(2);
    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
    expect(x[o.Process]).toEqual('Cold_Coiled');
    expect(x[o.Heat_Treat]).toEqual('1');
    expect(x[o.Catalog_Number]).toEqual('');
    expect(x[o.Material_File]).toEqual('mat_us.json');
    expect(x[o.Life_Category]).toEqual(1);
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
    expect(x[o.Xlen_1]).toEqual(0.0);
    expect(x[o.Xlen_2]).toEqual(0.0);
    expect(x[o.tbase010]).toEqual(0.01);
    expect(x[o.tbase400]).toEqual(0.4);
    expect(x[o.const_term]).toEqual(-2);
    expect(x[o.slope_term]).toEqual(-106113.37959890341);
    expect(x[o.tensile_010]).toEqual(370000);
});

//it('eqnset pathological OD_Free === Wire_Dia * 2.0 && Spring_Index === 1.0', () => {
//    // p vector: OD_Free, Wire_Dia, L_Free, Coils_T, Force_1, Force_2
//    var p =     [0.4,     0.2,      3.25,   10.0,    10.0,    39.0];
//    // x vector: Mean_Dia 0, Coils_A 1, Rate 2, Deflect_1 3, Deflect_2 4, L_1 5, L_2 6,  L_Stroke 7, L_Solid 8, Slenderness 9,
//    var x = [    0.0,        0.0,       0.0,    0.0,         0.0,         0.0,   0.0,    0.0,        0.0,       0.0, 
//    // ID_Free 10, Weight 11, Spring_Index 12, Force_Solid 13, Stress_1 14, Stress_2 15, Stress_Solid 16, FS_2 17, FS_Solid 18, FS_CycleLife 19,
//       0.0,        0.0,       0.0,             0.0,            0.0,         0.0,         0.0,             0.0,     0.0,         0.0, 
//    // Cycle_Life 20, PC_Avail_Deflect 21, Energy 22, Spring_Type 23, Prop_Calc_Method 24, Material_Type 25, ASTM_Fed_Spec 26, Process 27, Material_File 28, Material_File 28, Life_Category 29
//       0.0,           0.0,                 0.0, 'Torsion', 1, 2, 'A228/QQW-470', 'Cold_Coiled', 'mat_us.json', 1,
//    // Density 30, Torsion_Modulus 31, Hot_Factor_Kh 32, Tensile 33,         PC_Tensile_Endur 34, PC_Tensile_Stat 35, Stress_Lim_Endur 36, Stress_Lim_Stat 37, End_Type 38, Inactive_Coils 39
//       0.284,      11500000,           1,                261419.22328169446, 50,                  50,                 130709.61164084723,  130709.61164084723, 4,           2,
//    // Add_Coils_Solid 40, Catalog_Name 41, Catalog_Number 42, tbase010 43, tbase400 44, const_term 45, slope_term 46,       tensile_010 47
//       0,                  '',              '',                0.01,        0.4,         -2,            -106113.37959890341, 370000];
////    console.log('p=',p);
////    console.log('x=',x);
//
//    var x = eqnset(p, x);
////    console.log('x=',x);
//
//    expect(p[o.OD_Free]).toEqual(0.4);
//    expect(p[o.Wire_Dia]).toEqual(0.2);
//    expect(p[o.L_Free]).toEqual(3.25);
//    expect(p[o.Coils_T]).toEqual(10.0);
//    expect(p[o.Force_1]).toEqual(10.0);
//    expect(p[o.Force_2]).toEqual(39.0);
//    expect(x[o.Mean_Dia]).toEqual(0.2);
//    expect(x[o.Coils_A]).toEqual(8.0);
//    expect(x[o.Rate]).toEqual(35937.5);
//    expect(x[o.Deflect_1]).toEqual(0.00027826086956521737);
//    expect(x[o.Deflect_2]).toEqual(0.0010852173913043477);
//    expect(x[o.L_1]).toEqual(3.2497217391304347);
//    expect(x[o.L_2]).toEqual(3.2489147826086957);
//    expect(x[o.L_Stroke]).toEqual(0.0008069565217390107);
//    expect(x[o.L_Solid]).toEqual(2);
//    expect(x[o.Slenderness]).toEqual(16.25);
//    expect(x[o.ID_Free]).toEqual(0.0);
//    expect(x[o.Weight]).toEqual(0.06311474692460524);
//    expect(x[o.Spring_Index]).toEqual(1);
//    expect(x[o.Force_Solid]).toEqual(44921.875);
//    expect(x[o.Stress_1]).toEqual(Number.POSITIVE_INFINITY);
//    expect(x[o.Stress_2]).toEqual(Number.POSITIVE_INFINITY);
//    expect(x[o.Stress_Solid]).toEqual(Number.POSITIVE_INFINITY);
//    expect(x[o.FS_2]).toEqual(0);
//    expect(x[o.FS_Solid]).toEqual(0);
//    expect(x[o.FS_CycleLife]).toEqual(Number.NaN);
//    expect(x[o.Cycle_Life]).toEqual(Number.NaN);
//    expect(x[o.PC_Avail_Deflect]).toEqual(0.08681739130434782);
//    expect(x[o.Energy]).toEqual(0.01977043478260869);
//    expect(x[o.Spring_Type]).toEqual('Torsion');
//    expect(x[o.Prop_Calc_Method]).toEqual(1);
//    expect(x[o.Material_Type]).toEqual(2);
//    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
//    expect(x[o.Process]).toEqual('Cold_Coiled');
//    expect(x[o.Material_File]).toEqual('mat_us.json');
//    expect(x[o.Life_Category]).toEqual(1);
//    expect(x[o.Density]).toEqual(0.284);
//    expect(x[o.Torsion_Modulus]).toEqual(11500000);
//    expect(x[o.Hot_Factor_Kh]).toEqual(1);
//    expect(x[o.Tensile]).toEqual(231943.3102005483);
//    expect(x[o.PC_Tensile_Endur]).toEqual(50);
//    expect(x[o.PC_Tensile_Stat]).toEqual(50);
//    expect(x[o.Stress_Lim_Endur]).toEqual(115971.65510027415);
//    expect(x[o.Stress_Lim_Stat]).toEqual(115971.65510027415);
//    expect(x[o.End_Type]).toEqual(4);
//    expect(x[o.Inactive_Coils]).toEqual(2);
//    expect(x[o.Add_Coils_Solid]).toEqual(0);
//    expect(x[o.Catalog_Name]).toEqual('');
//    expect(x[o.Catalog_Number]).toEqual('');
//    expect(x[o.tbase010]).toEqual(0.01);
//    expect(x[o.tbase400]).toEqual(0.4);
//    expect(x[o.const_term]).toEqual(-2);
//    expect(x[o.slope_term]).toEqual(-106113.37959890341);
//    expect(x[o.tensile_010]).toEqual(370000);
//});
//
//it('eqnset pathological Coils_T === Inactive_Coils && Coils_A === 0.0', () => {
//    // p vector: OD_Free, Wire_Dia, L_Free, Coils_T, Force_1, Force_2
//    var p =     [1.1,     0.1055,   3.25,   2.0,    10.0,    39.0];
//    // x vector: Mean_Dia 0, Coils_A 1, Rate 2, Deflect_1 3, Deflect_2 4, L_1 5, L_2 6,  L_Stroke 7, L_Solid 8, Slenderness 9,
//    var x = [    0.0,        0.0,       0.0,    0.0,         0.0,         0.0,   0.0,    0.0,        0.0,       0.0, 
//    // ID_Free 10, Weight 11, Spring_Index 12, Force_Solid 13, Stress_1 14, Stress_2 15, Stress_Solid 16, FS_2 17, FS_Solid 18, FS_CycleLife 19,
//       0.0,        0.0,       0.0,             0.0,            0.0,         0.0,         0.0,             0.0,     0.0,         0.0, 
//    // Cycle_Life 20, PC_Avail_Deflect 21, Energy 22, Spring_Type 23, Prop_Calc_Method 24, Material_Type 25, ASTM_Fed_Spec 26, Process 27, Material_File 28, Material_File 28, Life_Category 29
//       0.0,           0.0,                 0.0, 'Torsion', 1, 2, 'A228/QQW-470', 'Cold_Coiled', 'mat_us.json', 1,
//    // Density 30, Torsion_Modulus 31, Hot_Factor_Kh 32, Tensile 33,         PC_Tensile_Endur 34, PC_Tensile_Stat 35, Stress_Lim_Endur 36, Stress_Lim_Stat 37, End_Type 38, Inactive_Coils 39
//       0.284,      11500000,           1,                261419.22328169446, 50,                  50,                 130709.61164084723,  130709.61164084723, 4,           2,
//    // Add_Coils_Solid 40, Catalog_Name 41, Catalog_Number 42, tbase010 43, tbase400 44, const_term 45, slope_term 46,       tensile_010 47
//       0,                  '',              '',                0.01,        0.4,         -2,            -106113.37959890341, 370000];
////    console.log('p=',p);
////    console.log('x=',x);
//
//    var x = eqnset(p, x);
////    console.log('x=',x);
//
//    expect(p[o.OD_Free]).toEqual(1.1);
//    expect(p[o.Wire_Dia]).toEqual(0.1055);
//    expect(p[o.L_Free]).toEqual(3.25);
//    expect(p[o.Coils_T]).toEqual(2.0);
//    expect(p[o.Force_1]).toEqual(10.0);
//    expect(p[o.Force_2]).toEqual(39.0);
//    expect(x[o.Mean_Dia]).toEqual(0.9945);
//    expect(x[o.Coils_A]).toEqual(0);
//    expect(x[o.Rate]).toEqual(Number.POSITIVE_INFINITY);
//    expect(x[o.Deflect_1]).toEqual(0);
//    expect(x[o.Deflect_2]).toEqual(0);
//    expect(x[o.L_1]).toEqual(3.25);
//    expect(x[o.L_2]).toEqual(3.25);
//    expect(x[o.L_Stroke]).toEqual(0);
//    expect(x[o.L_Solid]).toEqual(0.211);
//    expect(x[o.Slenderness]).toEqual(3.2679738562091503);
//    expect(x[o.ID_Free]).toEqual(0.889);
//    expect(x[o.Weight]).toEqual(0.017485914072893908);
//    expect(x[o.Spring_Index]).toEqual(9.42654028436019);
//    expect(x[o.Force_Solid]).toEqual(Number.POSITIVE_INFINITY);
//    expect(x[o.Stress_1]).toEqual(24893.49275531675);
//    expect(x[o.Stress_2]).toEqual(97084.62174573533);
//    expect(x[o.Stress_Solid]).toEqual(Number.POSITIVE_INFINITY);
//    expect(x[o.FS_2]).toEqual(1.3463472310271418);
//    expect(x[o.FS_Solid]).toEqual(0);
//    expect(x[o.FS_CycleLife]).toEqual(1.3032217764849205);
//    expect(x[o.Cycle_Life]).toEqual(1861893.4985282072);
//    expect(x[o.PC_Avail_Deflect]).toEqual(0);
//    expect(x[o.Energy]).toEqual(Number.NaN);
//    expect(x[o.Spring_Type]).toEqual('Torsion');
//    expect(x[o.Prop_Calc_Method]).toEqual(1);
//    expect(x[o.Material_Type]).toEqual(2);
//    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
//    expect(x[o.Process]).toEqual('Cold_Coiled');
//    expect(x[o.Material_File]).toEqual('mat_us.json');
//    expect(x[o.Life_Category]).toEqual(1);
//    expect(x[o.Density]).toEqual(0.284);
//    expect(x[o.Torsion_Modulus]).toEqual(11500000);
//    expect(x[o.Hot_Factor_Kh]).toEqual(1);
//    expect(x[o.Tensile]).toEqual(261419.2233253764);
//    expect(x[o.PC_Tensile_Endur]).toEqual(50);
//    expect(x[o.PC_Tensile_Stat]).toEqual(50);
//    expect(x[o.Stress_Lim_Endur]).toEqual(130709.6116626882);
//    expect(x[o.Stress_Lim_Stat]).toEqual(130709.6116626882);
//    expect(x[o.End_Type]).toEqual(4);
//    expect(x[o.Inactive_Coils]).toEqual(2);
//    expect(x[o.Add_Coils_Solid]).toEqual(0);
//    expect(x[o.Catalog_Name]).toEqual('');
//    expect(x[o.Catalog_Number]).toEqual('');
//    expect(x[o.tbase010]).toEqual(0.01);
//    expect(x[o.tbase400]).toEqual(0.4);
//    expect(x[o.const_term]).toEqual(-2);
//    expect(x[o.slope_term]).toEqual(-106113.37959890341);
//    expect(x[o.tensile_010]).toEqual(370000);
//});
//
//it('eqnset pathological OD_Free === Wire_Dia && Mean_Dia === 0.0', () => {
//    var p = []; // p vector
//    var x = []; // x vector
//
//    // p vector: OD_Free, Wire_Dia, L_Free, Coils_T, Force_1, Force_2
//    var p =     [0.4,     0.4,      3.25,   10.0,    10.0,    39.0];
//    // x vector: Mean_Dia 0, Coils_A 1, Rate 2, Deflect_1 3, Deflect_2 4, L_1 5, L_2 6,  L_Stroke 7, L_Solid 8, Slenderness 9,
//    var x = [    0.0,        0.0,       0.0,    0.0,         0.0,         0.0,   0.0,    0.0,        0.0,       0.0, 
//    // ID_Free 10, Weight 11, Spring_Index 12, Force_Solid 13, Stress_1 14, Stress_2 15, Stress_Solid 16, FS_2 17, FS_Solid 18, FS_CycleLife 19,
//       0.0,        0.0,       0.0,             0.0,            0.0,         0.0,         0.0,             0.0,     0.0,         0.0, 
//    // Cycle_Life 20, PC_Avail_Deflect 21, Energy 22, Spring_Type 23, Prop_Calc_Method 24, Material_Type 25, ASTM_Fed_Spec 26, Process 27, Material_File 28, Material_File 28, Life_Category 29
//       0.0,           0.0,                 0.0, 'Torsion', 1, 2, 'A228/QQW-470', 'Cold_Coiled', 'mat_us.json', 1,
//    // Density 30, Torsion_Modulus 31, Hot_Factor_Kh 32, Tensile 33,         PC_Tensile_Endur 34, PC_Tensile_Stat 35, Stress_Lim_Endur 36, Stress_Lim_Stat 37, End_Type 38, Inactive_Coils 39
//       0.284,      11500000,           1,                261419.22328169446, 50,                  50,                 130709.61164084723,  130709.61164084723, 4,           2,
//    // Add_Coils_Solid 40, Catalog_Name 41, Catalog_Number 42, tbase010 43, tbase400 44, const_term 45, slope_term 46,       tensile_010 47
//       0,                  '',              '',                0.01,        0.4,         -2,            -106113.37959890341, 370000];
////    console.log('p=',p);
////    console.log('x=',x);
//
//    var x = eqnset(p, x);
////    console.log('x=',x);
//
//    expect(p[o.OD_Free]).toEqual(0.4);
//    expect(p[o.Wire_Dia]).toEqual(0.4);
//    expect(p[o.L_Free]).toEqual(3.25);
//    expect(p[o.Coils_T]).toEqual(10.0);
//    expect(p[o.Force_1]).toEqual(10.0);
//    expect(p[o.Force_2]).toEqual(39.0);
//    expect(x[o.Mean_Dia]).toEqual(0.0);
//    expect(x[o.Coils_A]).toEqual(8.0);
//    expect(x[o.Rate]).toEqual(Number.NaN);
//    expect(x[o.Deflect_1]).toEqual(Number.NaN);
//    expect(x[o.Deflect_2]).toEqual(Number.NaN);
//    expect(x[o.L_1]).toEqual(Number.NaN);
//    expect(x[o.L_2]).toEqual(Number.NaN);
//    expect(x[o.L_Stroke]).toEqual(Number.NaN);
//    expect(x[o.L_Solid]).toEqual(4);
//    expect(x[o.Slenderness]).toEqual(Number.POSITIVE_INFINITY);
//    expect(x[o.ID_Free]).toEqual(-0.4);
//    expect(x[o.Weight]).toEqual(0.11598760077053516);
//    expect(x[o.Spring_Index]).toEqual(0);
//    expect(x[o.Force_Solid]).toEqual(Number.NaN);
//    expect(x[o.Stress_1]).toEqual(Number.NaN);
//    expect(x[o.Stress_2]).toEqual(Number.NaN);
//    expect(x[o.Stress_Solid]).toEqual(Number.NaN);
//    expect(x[o.FS_2]).toEqual(1);
//    expect(x[o.FS_Solid]).toEqual(1);
//    expect(x[o.FS_CycleLife]).toEqual(Number.NaN);
//    expect(x[o.Cycle_Life]).toEqual(Number.NaN);
//    expect(x[o.PC_Avail_Deflect]).toEqual(Number.NaN);
//    expect(x[o.Energy]).toEqual(Number.NaN);
//    expect(x[o.Spring_Type]).toEqual('Torsion');
//    expect(x[o.Prop_Calc_Method]).toEqual(1);
//    expect(x[o.Material_Type]).toEqual(2);
//    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
//    expect(x[o.Process]).toEqual('Cold_Coiled');
//    expect(x[o.Material_File]).toEqual('mat_us.json');
//    expect(x[o.Life_Category]).toEqual(1);
//    expect(x[o.Density]).toEqual(0.284);
//    expect(x[o.Torsion_Modulus]).toEqual(11500000);
//    expect(x[o.Hot_Factor_Kh]).toEqual(1);
//    expect(x[o.Tensile]).toEqual(200000);
//    expect(x[o.PC_Tensile_Endur]).toEqual(50);
//    expect(x[o.PC_Tensile_Stat]).toEqual(50);
//    expect(x[o.Stress_Lim_Endur]).toEqual(100000);
//    expect(x[o.Stress_Lim_Stat]).toEqual(100000);
//    expect(x[o.End_Type]).toEqual(4);
//    expect(x[o.Inactive_Coils]).toEqual(2);
//    expect(x[o.Add_Coils_Solid]).toEqual(0);
//    expect(x[o.Catalog_Name]).toEqual('');
//    expect(x[o.Catalog_Number]).toEqual('');
//    expect(x[o.tbase010]).toEqual(0.01);
//    expect(x[o.tbase400]).toEqual(0.4);
//    expect(x[o.const_term]).toEqual(-2);
//    expect(x[o.slope_term]).toEqual(-106113.37959890341);
//    expect(x[o.tensile_010]).toEqual(370000);
//});
//