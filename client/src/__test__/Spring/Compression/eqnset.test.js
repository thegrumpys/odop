import * as o from '../../../designtypes/Spring/Compression/offsets';
import { eqnset } from '../../../designtypes/Spring/Compression/eqnset';

//=====================================================================
// eqnset
//=====================================================================

it('eqnset with defaults', () => {
    var p = []; // p vector
    var x = []; // x vector

    p.push(1.1); // OD_Free // p vector
    p.push(0.1055); // Wire_Dia
    p.push(3.25); // L_Free
    p.push(10.0); // Coils_T
    p.push(10.0); // Force_1
    p.push(39.0); // Force_2
    x.push(0.0); // Mean_Dia 0 // x vector - to be filled in by eqnset
    x.push(0.0); // Coils_A 1
    x.push(0.0); // Rate 2
    x.push(0.0); // Deflect_1 3
    x.push(0.0); // Deflect_2 4
    x.push(0.0); // L_1 5
    x.push(0.0); // L_2 6 
    x.push(0.0); // L_Stroke 7
    x.push(0.0); // L_Solid 8
    x.push(0.0); // Slenderness 9
    x.push(0.0); // ID_Free 10
    x.push(0.0); // Weight 11
    x.push(0.0); // Spring_Index 12
    x.push(0.0); // Force_Solid 13
    x.push(0.0); // Stress_1 14
    x.push(0.0); // Stress_2 15
    x.push(0.0); // Stress_Solid 16
    x.push(0.0); // FS_2 17
    x.push(0.0); // FS_Solid 18
    x.push(0.0); // FS_CycleLife 19
    x.push(0.0); // Cycle_Life 20
    x.push(0.0); // PC_Avail_Deflect 21
    x.push(0.0); // Energy 22
    x.push('Compression'); // Spring_Type 23 // calc input vector
    x.push(1); // Prop_Calc_Method 24
    x.push(2); // Material_Type 25
    x.push('A228/QQW-470'); // ASTM_Fed_Spec 26
    x.push('Cold_Coiled'); // Process 27
    x.push('mat_us.json'); // Material_File 28
    x.push(1); // Life_Category 29
    x.push(0.284); // Density 30
    x.push(11500000); // Torsion_Modulus 31
    x.push(1); // Hot_Factor_Kh 32
    x.push(261419.22328169446); // Tensile 33
    x.push(50); // PC_Tensile_Endur 34
    x.push(50); // PC_Tensile_Stat 35
    x.push(130709.61164084723); // Stress_Lim_Endur 36
    x.push(130709.61164084723); // Stress_Lim_Stat 37
    x.push(4); // End_Type 38
    x.push(2); // Inactive_Coils 39
    x.push(0); // Add_Coils_Solid 40
    x.push(''); // Catalog_Name 41
    x.push(''); // Catalog_Number 42
    x.push(0.01); // tbase010 43
    x.push(0.4); // tbase400 44
    x.push(-2); // const_term 45
    x.push(-106113.37959890341); // slope_term 46
    x.push(370000); // tensile_010 47
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    expect(p[o.OD_Free]).toEqual(1.1);
    expect(p[o.Wire_Dia]).toEqual(0.1055);
    expect(p[o.L_Free]).toEqual(3.25);
    expect(p[o.Coils_T]).toEqual(10.0);
    expect(p[o.Force_1]).toEqual(10.0);
    expect(p[o.Force_2]).toEqual(39.0);
    expect(x[o.Mean_Dia]).toEqual(0.9945);
    expect(x[o.Coils_A]).toEqual(8.0);
    expect(x[o.Rate]).toEqual(22.631500150071364);
    expect(x[o.Deflect_1]).toEqual(0.4418620035653477);
    expect(x[o.Deflect_2]).toEqual(1.723261813904856);
    expect(x[o.L_1]).toEqual(2.8081379964346525);
    expect(x[o.L_2]).toEqual(1.526738186095144);
    expect(x[o.L_Stroke]).toEqual(1.2813998103395086);
    expect(x[o.L_Solid]).toEqual(1.055);
    expect(x[o.Slenderness]).toEqual(3.2679738562091503);
    expect(x[o.ID_Free]).toEqual(0.889);
    expect(x[o.Weight]).toEqual(0.07798388647498593);
    expect(x[o.Spring_Index]).toEqual(9.42654028436019);
    expect(x[o.Force_Solid]).toEqual(49.67614282940665);
    expect(x[o.Stress_1]).toEqual(24893.49275531675);
    expect(x[o.Stress_2]).toEqual(97084.62174573533);
    expect(x[o.Stress_Solid]).toEqual(123661.27016359147);
    expect(x[o.FS_2]).toEqual(1.3463472310271418);
    expect(x[o.FS_Solid]).toEqual(1.0569971624080239);
    expect(x[o.FS_CycleLife]).toEqual(1.3032217764849205);
    expect(x[o.Cycle_Life]).toEqual(1861893.4985282072);
    expect(x[o.PC_Avail_Deflect]).toEqual(78.50851088404809);
    expect(x[o.Energy]).toEqual(31.394295353317954);
    expect(x[o.Spring_Type]).toEqual('Compression');
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
    expect(x[o.Stress_Lim_Endur]).toEqual(130709.6116626882);
    expect(x[o.Stress_Lim_Stat]).toEqual(130709.6116626882);
    expect(x[o.End_Type]).toEqual(4);
    expect(x[o.Inactive_Coils]).toEqual(2);
    expect(x[o.Add_Coils_Solid]).toEqual(0);
    expect(x[o.Catalog_Name]).toEqual('');
    expect(x[o.Catalog_Number]).toEqual('');
    expect(x[o.tbase010]).toEqual(0.01);
    expect(x[o.tbase400]).toEqual(0.4);
    expect(x[o.const_term]).toEqual(-2);
    expect(x[o.slope_term]).toEqual(-106113.37959890341);
    expect(x[o.tensile_010]).toEqual(370000);
});

it('eqnset pathological 001', () => {
    // p vector: OD_Free, Wire_Dia, L_Free, Coils_T, Force_1, Force_2
    var p =     [0.4,     0.2,      3.25,   10.0,    10.0,    39.0];
    // x vector: Mean_Dia 0, Coils_A 1, Rate 2, Deflect_1 3, Deflect_2 4, L_1 5, L_2 6,  L_Stroke 7, L_Solid 8, Slenderness 9,
    var x = [    0.0,        0.0,       0.0,    0.0,         0.0,         0.0,   0.0,    0.0,        0.0,       0.0, 
    // ID_Free 10, Weight 11, Spring_Index 12, Force_Solid 13, Stress_1 14, Stress_2 15, Stress_Solid 16, FS_2 17, FS_Solid 18, FS_CycleLife 19,
       0.0,        0.0,       0.0,             0.0,            0.0,         0.0,         0.0,             0.0,     0.0,         0.0, 
    // Cycle_Life 20, PC_Avail_Deflect 21, Energy 22, Spring_Type 23, Prop_Calc_Method 24, Material_Type 25, ASTM_Fed_Spec 26, Process 27, Material_File 28, Material_File 28, Life_Category 29
       0.0,           0.0,                 0.0, 'Compression', 1, 2, 'A228/QQW-470', 'Cold_Coiled', 'mat_us.json', 1,
    // Density 30, Torsion_Modulus 31, Hot_Factor_Kh 32, Tensile 33,         PC_Tensile_Endur 34, PC_Tensile_Stat 35, Stress_Lim_Endur 36, Stress_Lim_Stat 37, End_Type 38, Inactive_Coils 39
       0.284,      11500000,           1,                261419.22328169446, 50,                  50,                 130709.61164084723,  130709.61164084723, 4,           2,
    // Add_Coils_Solid 40, Catalog_Name 41, Catalog_Number 42, tbase010 43, tbase400 44, const_term 45, slope_term 46,       tensile_010 47
       0,                  '',              '',                0.01,        0.4,         -2,            -106113.37959890341, 370000];
//    console.log('p=',p);
//    console.log('x=',x);

    var x = eqnset(p, x);
//    console.log('x=',x);

    expect(p[o.OD_Free]).toEqual(0.4);
    expect(p[o.Wire_Dia]).toEqual(0.2);
    expect(p[o.L_Free]).toEqual(3.25);
    expect(p[o.Coils_T]).toEqual(10.0);
    expect(p[o.Force_1]).toEqual(10.0);
    expect(p[o.Force_2]).toEqual(39.0);
    expect(x[o.Mean_Dia]).toEqual(0.2);
    expect(x[o.Coils_A]).toEqual(8.0);
    expect(x[o.Rate]).toEqual(35937.5);
    expect(x[o.Deflect_1]).toEqual(0.00027826086956521737);
    expect(x[o.Deflect_2]).toEqual(0.0010852173913043477);
    expect(x[o.L_1]).toEqual(3.2497217391304347);
    expect(x[o.L_2]).toEqual(3.2489147826086957);
    expect(x[o.L_Stroke]).toEqual(0.0008069565217390107);
    expect(x[o.L_Solid]).toEqual(2);
    expect(x[o.Slenderness]).toEqual(16.25);
    expect(x[o.ID_Free]).toEqual(0.0);
    expect(x[o.Weight]).toEqual(0.06311474692460524);
    expect(x[o.Spring_Index]).toEqual(1);
    expect(x[o.Force_Solid]).toEqual(44921.875);
    expect(x[o.Stress_1]).toEqual(Number.POSITIVE_INFINITY);
    expect(x[o.Stress_2]).toEqual(Number.POSITIVE_INFINITY);
    expect(x[o.Stress_Solid]).toEqual(Number.POSITIVE_INFINITY);
    expect(x[o.FS_2]).toEqual(0);
    expect(x[o.FS_Solid]).toEqual(0);
    expect(x[o.FS_CycleLife]).toEqual(Number.NaN);
    expect(x[o.Cycle_Life]).toEqual(Number.NaN);
    expect(x[o.PC_Avail_Deflect]).toEqual(0.08681739130434782);
    expect(x[o.Energy]).toEqual(0.01977043478260869);
    expect(x[o.Spring_Type]).toEqual('Compression');
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
    expect(x[o.Stress_Lim_Endur]).toEqual(115971.65510027415);
    expect(x[o.Stress_Lim_Stat]).toEqual(115971.65510027415);
    expect(x[o.End_Type]).toEqual(4);
    expect(x[o.Inactive_Coils]).toEqual(2);
    expect(x[o.Add_Coils_Solid]).toEqual(0);
    expect(x[o.Catalog_Name]).toEqual('');
    expect(x[o.Catalog_Number]).toEqual('');
    expect(x[o.tbase010]).toEqual(0.01);
    expect(x[o.tbase400]).toEqual(0.4);
    expect(x[o.const_term]).toEqual(-2);
    expect(x[o.slope_term]).toEqual(-106113.37959890341);
    expect(x[o.tensile_010]).toEqual(370000);
});
