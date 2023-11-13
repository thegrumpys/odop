import * as o from '../../../designtypes/Spring/Extension/offsets';
import { eqnset } from '../../../designtypes/Spring/Extension/eqnset';

//=====================================================================
// eqnset
//=====================================================================

it('eqnset initialState', () => {
    var p = []; // p vector
    var x = []; // x vector

    // p vector: OD_Free, Wire_Dia, Coils_T, Initial_Tension. End_Extension, Force_1, Force_2
    var p =     [1.1,     0.1055,   10.0,    6.0,             0.0,           10.0,    40.0];
    // x vector: Mean_Dia 0, ID_Free 1, Coils_A 2, Rate 3, Deflect_1 4, Deflect_2 5, L_Body 6, L_Free 7, L_1 8, L_2 9, 
    var x = [    0.0,        0.0,       0.0,       0.0,    0.0,         0.0,         0.0,      0.0,      0.0,   0.0, 
    // L_Stroke 10, Weight 11, Spring_Index 12, Stress_Initial 13, Stress_1 14, Stress_2 15, Stress_Hook 16, FS_2 17, FS_CycleLife 18, FS_Hook 19, 
       0.0,         0.0,       0.0,             0.0,               0.0,         0.0,         0.0,            0.0,     0.0,             0.0, 
    // Cycle_Life 20, PC_Safe_Deflect 21, Stress_Init_Lo 22, Stress_Init_Hi 23, Energy 24, Spring_Type 25, Prop_Calc_Method 26, Material_Type 27, ASTM_Fed_Spec 28, Process 29, 
       0.0,           0.0,                0.0,               0.0,               0.0,      'Extension',     1,                   2,                'A228/QQW-470',   'Cold_Coiled',
    // Material_File 30, Life_Category 31, Density 32, Torsion_Modulus 33, Hot_Factor_Kh 34, Tensile 35,        PC_Tensile_Endur 36, PC_Tensile_Stat 37, PC_Tensile_Bend 38, Stress_Lim_Endur 39, 
       'mat_us.json',    1,                0.284,      11500000,           1,                261419.2233253764, 50,                  50,                 75,                 130709.6116626882,
    // Stress_Lim_Stat 40, Stress_Lim_Bend 41, SI_Range 42,          SI_Lo_Factor 43, SI_Hi_Factor 44, End_Type 45, End_ID 46, Extended_End_ID 47, L_End 48, L_Extended_End 49, 
       130709.6116626882,  196064,             'Readily Obtainable', 27400,           45000,           4,           0.8890,    0.8890,             0.8890,   0.8890,
    // Hook_Deflect_All 50, Catalog_Name 51, Catalog_Number 52, tbase010 53, tbase400 54, const_term 55, slope_term 56,       tensile_010 57,
       0.4000,              '',              '',                0.01,        0.4,         -2,            -106113.37959890341, 370000]; 
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    // Independent Variables
    expect(p[o.OD_Free]).toEqual(1.1);
    expect(p[o.Wire_Dia]).toEqual(0.1055);
    expect(p[o.Coils_T]).toEqual(10.0);
    expect(p[o.Initial_Tension]).toEqual(6.0);
    expect(p[o.End_Extension]).toEqual(0.0);
    expect(p[o.Force_1]).toEqual(10.0);
    expect(p[o.Force_2]).toEqual(40.0);

    // Dependent Variables
    expect(x[o.Mean_Dia]).toEqual(0.9945);
    expect(x[o.ID_Free]).toEqual(0.889);
    expect(x[o.Coils_A]).toEqual(10.4);
    expect(x[o.Rate]).toEqual(17.408846269285664);
    expect(x[o.Deflect_1]).toEqual(0.22976824185398081);
    expect(x[o.Deflect_2]).toEqual(1.953030055758837);
    expect(x[o.L_Body]).toEqual(1.1604999999999999);
    expect(x[o.L_Free]).toEqual(2.4939999999999998);
    expect(x[o.L_1]).toEqual(2.7237682418539806);
    expect(x[o.L_2]).toEqual(4.4470300557588365);
    expect(x[o.L_Stroke]).toEqual(1.7232618139048559);
    expect(x[o.Weight]).toEqual(0.09369306942435726);
    expect(x[o.Spring_Index]).toEqual(9.42654028436019);
    expect(x[o.Stress_Initial]).toEqual(12940.133988098856);
    expect(x[o.Stress_1]).toEqual(24893.492755316747);
    expect(x[o.Stress_2]).toEqual(99573.97102126699);
    expect(x[o.Stress_Hook]).toEqual(191924.28231723508);
    expect(x[o.FS_2]).toEqual(1.3126885502514636);
    expect(x[o.FS_CycleLife]).toEqual(1.2702904627112384);
    expect(x[o.FS_Hook]).toEqual(1.0215717111290479);
    expect(x[o.Cycle_Life]).toEqual(794242.7844682191);
    expect(x[o.PC_Safe_Deflect]).toEqual(73.10642216405796);
    expect(x[o.Stress_Init_Lo]).toEqual(10183.372911818244);
    expect(x[o.Stress_Init_Hi]).toEqual(16724.517555905873);
    expect(x[o.Energy]).toEqual(32.74197446419227);

    // Calc Inputs
    expect(x[o.Spring_Type]).toEqual('Extension');
    expect(x[o.Prop_Calc_Method]).toEqual(1);
    expect(x[o.Material_Type]).toEqual(2);
    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
    expect(x[o.Process]).toEqual('Cold_Coiled');
    expect(x[o.Material_File]).toEqual('mat_us.json');
    expect(x[o.Life_Category]).toEqual(1);
    expect(x[o.Density]).toEqual(0.284);
    expect(x[o.Torsion_Modulus]).toEqual(11500000);
    expect(x[o.Hot_Factor_Kh]).toEqual(1);
    expect(x[o.Tensile]).toEqual(261419.2233253764);
    expect(x[o.PC_Tensile_Endur]).toEqual(50);
    expect(x[o.PC_Tensile_Stat]).toEqual(50);
    expect(x[o.PC_Tensile_Bend]).toEqual(75);
    expect(x[o.Stress_Lim_Endur]).toEqual(130709.6116626882);
    expect(x[o.Stress_Lim_Stat]).toEqual(130709.6116626882);
    expect(x[o.Stress_Lim_Bend]).toEqual(196064.4174940323);
    expect(x[o.SI_Range]).toEqual('Readily Obtainable');
    expect(x[o.SI_Lo_Factor]).toEqual(27400);
    expect(x[o.SI_Hi_Factor]).toEqual(45000);
    expect(x[o.End_Type]).toEqual(4);
    expect(x[o.End_ID]).toEqual(0.889);
    expect(x[o.Extended_End_ID]).toEqual(0.889);
    expect(x[o.L_End]).toEqual(0.66675);
    expect(x[o.L_Extended_End]).toEqual(0.66675);
    expect(x[o.Hook_Deflect_All]).toEqual(0.4);
    expect(x[o.Catalog_Name]).toEqual('');
    expect(x[o.Catalog_Number]).toEqual('');
    expect(x[o.tbase010]).toEqual(0.01);
    expect(x[o.tbase400]).toEqual(0.4);
    expect(x[o.const_term]).toEqual(-2);
    expect(x[o.slope_term]).toEqual(-106113.37959890341);
    expect(x[o.tensile_010]).toEqual(370000);
});

it('eqnset pathological OD_Free === Wire_Dia * 2.0 && Spring_Index === 1.0', () => {
    var p = []; // p vector
    var x = []; // x vector

    // p vector: OD_Free, Wire_Dia, Coils_T, Initial_Tension. End_Extension, Force_1, Force_2
    var p =     [0.4,     0.2,      10.0,    6.0,             0.0,           10.0,    40.0];
    // x vector: Mean_Dia 0, ID_Free 1, Coils_A 2, Rate 3, Deflect_1 4, Deflect_2 5, L_Body 6, L_Free 7, L_1 8, L_2 9, 
    var x = [    0.0,        0.0,       0.0,       0.0,    0.0,         0.0,         0.0,      0.0,      0.0,   0.0, 
    // L_Stroke 10, Weight 11, Spring_Index 12, Stress_Initial 13, Stress_1 14, Stress_2 15, Stress_Hook 16, FS_2 17, FS_CycleLife 18, FS_Hook 19, 
       0.0,         0.0,       0.0,             0.0,               0.0,         0.0,         0.0,            0.0,     0.0,             0.0, 
    // Cycle_Life 20, PC_Safe_Deflect 21, Stress_Init_Lo 22, Stress_Init_Hi 23, Energy 24, Spring_Type 25, Prop_Calc_Method 26, Material_Type 27, ASTM_Fed_Spec 28, Process 29, 
       0.0,           0.0,                0.0,               0.0,               0.0,      'Extension',     1,                   2,                'A228/QQW-470',   'Cold_Coiled',
    // Material_File 30, Life_Category 31, Density 32, Torsion_Modulus 33, Hot_Factor_Kh 34, Tensile 35,        PC_Tensile_Endur 36, PC_Tensile_Stat 37, PC_Tensile_Bend 38, Stress_Lim_Endur 39, 
       'mat_us.json',    1,                0.284,      11500000,           1,                261419.2233253764, 50,                  50,                 75,                 130709.6116626882,
    // Stress_Lim_Stat 40, Stress_Lim_Bend 41, SI_Range 42,          SI_Lo_Factor 43, SI_Hi_Factor 44, End_Type 45, End_ID 46, Extended_End_ID 47, L_End 48, L_Extended_End 49, 
       130709.6116626882,  196064,             'Readily Obtainable', 27400,           45000,           4,           0.8890,    0.8890,             0.8890,   0.8890,
    // Hook_Deflect_All 50, Catalog_Name 51, Catalog_Number 52, tbase010 53, tbase400 54, const_term 55, slope_term 56,       tensile_010 57,
       0.4000,              '',              '',                0.01,        0.4,         -2,            -106113.37959890341, 370000]; 
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    // Independent Variables
    expect(p[o.OD_Free]).toEqual(0.4);
    expect(p[o.Wire_Dia]).toEqual(0.2);
    expect(p[o.Coils_T]).toEqual(10.0);
    expect(p[o.Initial_Tension]).toEqual(6.0);
    expect(p[o.End_Extension]).toEqual(0.0);
    expect(p[o.Force_1]).toEqual(10.0);
    expect(p[o.Force_2]).toEqual(40.0);

    // Dependent Variables
    expect(x[o.Mean_Dia]).toEqual(0.2);
    expect(x[o.ID_Free]).toEqual(0.0);
    expect(x[o.Coils_A]).toEqual(10.4);
    expect(x[o.Rate]).toEqual(27644.23076923077);
    expect(x[o.Deflect_1]).toEqual(0.00014469565217391304);
    expect(x[o.Deflect_2]).toEqual(0.001229913043478261);
    expect(x[o.L_Body]).toEqual(2.2);
    expect(x[o.L_Free]).toEqual(2.2);
    expect(x[o.L_1]).toEqual(2.200144695652174);
    expect(x[o.L_2]).toEqual(2.2012299130434783);
    expect(x[o.L_Stroke]).toEqual(0.001085217391304294);
    expect(x[o.Weight]).toEqual(0.07004400540383542);
    expect(x[o.Spring_Index]).toEqual(1);
    expect(x[o.Stress_Initial]).toEqual(381.97186342054874);
    expect(x[o.Stress_1]).toEqual(Number.POSITIVE_INFINITY);
    expect(x[o.Stress_2]).toEqual(Number.POSITIVE_INFINITY);
    expect(x[o.Stress_Hook]).toEqual(1273.2395447351626);
    expect(x[o.FS_2]).toEqual(0.0);
    expect(x[o.FS_CycleLife]).toEqual(Number.NaN);
    expect(x[o.FS_Hook]).toEqual(136.62588738287644);
    expect(x[o.Cycle_Life]).toEqual(Number.NaN);
    expect(x[o.PC_Safe_Deflect]).toEqual(-566.6666666666667);
    expect(x[o.Stress_Init_Lo]).toEqual(24668.89191886368);
    expect(x[o.Stress_Init_Hi]).toEqual(40514.603516381954);
    expect(x[o.Energy]).toEqual(0.020619130434782612);

    // Calc Inputs
    expect(x[o.Spring_Type]).toEqual('Extension');
    expect(x[o.Prop_Calc_Method]).toEqual(1);
    expect(x[o.Material_Type]).toEqual(2);
    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
    expect(x[o.Process]).toEqual('Cold_Coiled');
    expect(x[o.Material_File]).toEqual('mat_us.json');
    expect(x[o.Life_Category]).toEqual(1);
    expect(x[o.Density]).toEqual(0.284);
    expect(x[o.Torsion_Modulus]).toEqual(11500000);
    expect(x[o.Hot_Factor_Kh]).toEqual(1);
    expect(x[o.Tensile]).toEqual(231943.3102005483);
    expect(x[o.PC_Tensile_Endur]).toEqual(50);
    expect(x[o.PC_Tensile_Stat]).toEqual(50);
    expect(x[o.PC_Tensile_Bend]).toEqual(75);
    expect(x[o.Stress_Lim_Endur]).toEqual(115971.65510027415);
    expect(x[o.Stress_Lim_Stat]).toEqual(115971.65510027415);
    expect(x[o.Stress_Lim_Bend]).toEqual(173957.4826504112);
    expect(x[o.SI_Range]).toEqual('Readily Obtainable');
    expect(x[o.SI_Lo_Factor]).toEqual(27400);
    expect(x[o.SI_Hi_Factor]).toEqual(45000);
    expect(x[o.End_Type]).toEqual(4);
    expect(x[o.End_ID]).toEqual(0.0);
    expect(x[o.Extended_End_ID]).toEqual(0.0);
    expect(x[o.L_End]).toEqual(0.0);
    expect(x[o.L_Extended_End]).toEqual(0.0);
    expect(x[o.Hook_Deflect_All]).toEqual(0.4);
    expect(x[o.Catalog_Name]).toEqual('');
    expect(x[o.Catalog_Number]).toEqual('');
    expect(x[o.tbase010]).toEqual(0.01);
    expect(x[o.tbase400]).toEqual(0.4);
    expect(x[o.const_term]).toEqual(-2);
    expect(x[o.slope_term]).toEqual(-106113.37959890341);
    expect(x[o.tensile_010]).toEqual(370000);
});

it('eqnset pathological OD_Free === Wire_Dia && Mean_Dia === 0.0', () => {
    var p = []; // p vector
    var x = []; // x vector

    // p vector: OD_Free, Wire_Dia, Coils_T, Initial_Tension. End_Extension, Force_1, Force_2
    var p =     [0.4,     0.4,      10.0,    6.0,             0.0,           10.0,    40.0];
    // x vector: Mean_Dia 0, ID_Free 1, Coils_A 2, Rate 3, Deflect_1 4, Deflect_2 5, L_Body 6, L_Free 7, L_1 8, L_2 9, 
    var x = [    0.0,        0.0,       0.0,       0.0,    0.0,         0.0,         0.0,      0.0,      0.0,   0.0, 
    // L_Stroke 10, Weight 11, Spring_Index 12, Stress_Initial 13, Stress_1 14, Stress_2 15, Stress_Hook 16, FS_2 17, FS_CycleLife 18, FS_Hook 19, 
       0.0,         0.0,       0.0,             0.0,               0.0,         0.0,         0.0,            0.0,     0.0,             0.0, 
    // Cycle_Life 20, PC_Safe_Deflect 21, Stress_Init_Lo 22, Stress_Init_Hi 23, Energy 24, Spring_Type 25, Prop_Calc_Method 26, Material_Type 27, ASTM_Fed_Spec 28, Process 29, 
       0.0,           0.0,                0.0,               0.0,               0.0,      'Extension',     1,                   2,                'A228/QQW-470',   'Cold_Coiled',
    // Material_File 30, Life_Category 31, Density 32, Torsion_Modulus 33, Hot_Factor_Kh 34, Tensile 35,        PC_Tensile_Endur 36, PC_Tensile_Stat 37, PC_Tensile_Bend 38, Stress_Lim_Endur 39, 
       'mat_us.json',    1,                0.284,      11500000,           1,                261419.2233253764, 50,                  50,                 75,                 130709.6116626882,
    // Stress_Lim_Stat 40, Stress_Lim_Bend 41, SI_Range 42,          SI_Lo_Factor 43, SI_Hi_Factor 44, End_Type 45, End_ID 46, Extended_End_ID 47, L_End 48, L_Extended_End 49, 
       130709.6116626882,  196064,             'Readily Obtainable', 27400,           45000,           4,           0.8890,    0.8890,             0.8890,   0.8890,
    // Hook_Deflect_All 50, Catalog_Name 51, Catalog_Number 52, tbase010 53, tbase400 54, const_term 55, slope_term 56,       tensile_010 57,
       0.4000,              '',              '',                0.01,        0.4,         -2,            -106113.37959890341, 370000]; 
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    // Independent Variables
    expect(p[o.OD_Free]).toEqual(0.4);
    expect(p[o.Wire_Dia]).toEqual(0.4);
    expect(p[o.Coils_T]).toEqual(10.0);
    expect(p[o.Initial_Tension]).toEqual(6.0);
    expect(p[o.End_Extension]).toEqual(0.0);
    expect(p[o.Force_1]).toEqual(10.0);
    expect(p[o.Force_2]).toEqual(40.0);

    // Dependent Variables
    expect(x[o.Mean_Dia]).toEqual(0.0);
    expect(x[o.ID_Free]).toEqual(-0.4);
    expect(x[o.Coils_A]).toEqual(10.4);
    expect(x[o.Rate]).toEqual(Number.NaN);
    expect(x[o.Deflect_1]).toEqual(Number.NaN);
    expect(x[o.Deflect_2]).toEqual(Number.NaN);
    expect(x[o.L_Body]).toEqual(4.4);
    expect(x[o.L_Free]).toEqual(3.8000000000000007);
    expect(x[o.L_1]).toEqual(Number.NaN);
    expect(x[o.L_2]).toEqual(Number.NaN);
    expect(x[o.L_Stroke]).toEqual(Number.NaN);
    expect(x[o.Weight]).toEqual(Number.NaN);
    expect(x[o.Spring_Index]).toEqual(0.0);
    expect(x[o.Stress_Initial]).toEqual(0.0);
    expect(x[o.Stress_1]).toEqual(Number.NaN);
    expect(x[o.Stress_2]).toEqual(Number.NaN);
    expect(x[o.Stress_Hook]).toEqual(318.30988618379064);
    expect(x[o.FS_2]).toEqual(1);
    expect(x[o.FS_CycleLife]).toEqual(Number.NaN);
    expect(x[o.FS_Hook]).toEqual(471.238898038469);
    expect(x[o.Cycle_Life]).toEqual(Number.NaN);
    expect(x[o.PC_Safe_Deflect]).toEqual(Number.NaN);
    expect(x[o.Stress_Init_Lo]).toEqual(27400);
    expect(x[o.Stress_Init_Hi]).toEqual(45000);
    expect(x[o.Energy]).toEqual(Number.NaN);

    // Calc Inputs
    expect(x[o.Spring_Type]).toEqual('Extension');
    expect(x[o.Prop_Calc_Method]).toEqual(1);
    expect(x[o.Material_Type]).toEqual(2);
    expect(x[o.ASTM_Fed_Spec]).toEqual('A228/QQW-470');
    expect(x[o.Process]).toEqual('Cold_Coiled');
    expect(x[o.Material_File]).toEqual('mat_us.json');
    expect(x[o.Life_Category]).toEqual(1);
    expect(x[o.Density]).toEqual(0.284);
    expect(x[o.Torsion_Modulus]).toEqual(11500000);
    expect(x[o.Hot_Factor_Kh]).toEqual(1);
    expect(x[o.Tensile]).toEqual(200000);
    expect(x[o.PC_Tensile_Endur]).toEqual(50);
    expect(x[o.PC_Tensile_Stat]).toEqual(50);
    expect(x[o.PC_Tensile_Bend]).toEqual(75);
    expect(x[o.Stress_Lim_Endur]).toEqual(100000);
    expect(x[o.Stress_Lim_Stat]).toEqual(100000);
    expect(x[o.Stress_Lim_Bend]).toEqual(150000);
    expect(x[o.SI_Range]).toEqual('Readily Obtainable');
    expect(x[o.SI_Lo_Factor]).toEqual(27400);
    expect(x[o.SI_Hi_Factor]).toEqual(45000);
    expect(x[o.End_Type]).toEqual(4);
    expect(x[o.End_ID]).toEqual(-0.4);
    expect(x[o.Extended_End_ID]).toEqual(-0.4);
    expect(x[o.L_End]).toEqual(-0.30000000000000004);
    expect(x[o.L_Extended_End]).toEqual(-0.30000000000000004);
    expect(x[o.Hook_Deflect_All]).toEqual(0.4);
    expect(x[o.Catalog_Name]).toEqual('');
    expect(x[o.Catalog_Number]).toEqual('');
    expect(x[o.tbase010]).toEqual(0.01);
    expect(x[o.tbase400]).toEqual(0.4);
    expect(x[o.const_term]).toEqual(-2);
    expect(x[o.slope_term]).toEqual(-106113.37959890341);
    expect(x[o.tensile_010]).toEqual(370000);
});
