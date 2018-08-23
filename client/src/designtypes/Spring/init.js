export function init(d, p) {
    console.log('In init d=',d,' p=',p);

// const Spring_Type = 0;
 const Material_Type = 1;
// const ASTM_Fed_Spec = 2;
// const End_Type = 3;
// const Catalog_Number = 4;
// const Process = 5;
// const Material_File = 6;
// const Dialog_Switch = 7;
 const Prop_Calc_Method = 8;
// const End_Calc_Method = 9;
// const Life_Category = 10;
 const Material_Index = 11;
 const End_Type_Index = 12;
 const Inactive_Coils = 13;
 const Add_Coils_Solid = 14;
 const Density = 15;
 const Torsion_Modulus = 16;
 const Hot_Factor_Kh = 17;
 const Tensile = 18;
 const PC_Tensile_Endur = 19;
 const PC_Tensile_Stat = 20;
// const unused = 21;
 const Stress_Lim_Endur = 22;
 const Stress_Lim_Stat = 23;
 const const_term = 24;
 const slope_term = 25;
 const tensile_010 = 26;
 
 var i;
 var j;

   /*  reads material properties file  */
//   if material_file ^= oldmfil then
//       do;
//       i=0;
//       call read_mat(material_file,i);
//       oldmfil=material_file;
//       end;

 const matnam = 0;
 const astm_fs = 1;
 const fedspec = 2;
 const dens = 3;
 const ee = 4;
 const gg = 5;
 const kh = 6
 const t010 = 7;
 const t400 = 8;
 const pte1 = 9;
 const pte2 = 10;
 const pte3 = 11;
 const pte4 = 12;
 const pte6 = 13;
 const pte7 = 14;
 const pte8 = 15;
 const ptb1 = 16;
 const ptb2 = 17;
 const ptb3 = 18;
 const ptb4 = 19;
 const ptb6 = 20;
 const ptb7 = 21;
 const ptb8 = 22;
 const silf = 23;
 const sihf = 24;
 const sisr = 25;
 const siznam = 26;
 const dumyc = 27;
 const longnam = 28;
 
 
 var mtab = [
     ["matnam",    "astm_fs",   "fedspec", "dens", "ee", "gg", "kh","t010","t400","pte1","pte2","pte3","pte4","pte6","pte7","pte8","ptb1","ptb2","ptb3","ptb4","ptb6","ptb7","ptb8","silf", "sihf",  "sisr", "siznam",   "dumyc","longnam"],
 ["HARD_DRAWN_WIRE", "A227",    "",         .284, 30000., 11500., 1.0, 310., 165.,  50.,   36.,   33.,   30.,   42.,   39.,   36.,   75.,   51.,   47.,   45.,   0.,   0.,    0.,    27400., 45000., 58000., "DEF_HD.SIZ",  1,   "Hard Drawn MB spring wire   - Class II           ASTM A-227 "],
 ["MUSIC_WIRE",      "A228",    "QQW-470",  .284, 30000., 11500., 1.0, 370., 200.,  50.,   36.,   33.,   30.,   42.,   39.,   36.,   75.,   51.,   47.,   45.,   0.,   0.,    0.,    27400., 45000., 58000., "DEF_MW.SIZ",  1,   "Music Wire  (all coatings) -                     ASTM A-228 "],
 ["OIL_TEMPERED_MB", "A229",    "QQW-428",  .284, 30000., 11500., 1.0, 320., 185.,  50.,   36.,   33.,   30.,   42.,   39.,   36.,   75.,   51.,   47.,   45.,   0.,   0.,    0.,    27400., 45000., 58000., "DEF_OT.SIZ",  1,   "Oil Tempered MB spring wire - Class II           ASTM A-229 "],
 ["CHROME_VANADIUM", "A232",    "QQW-412",  .284, 30000., 11500., 1.0, 335., 200.,  50.,   42.,   40.,   38.,   49.,   47.,   46.,   75.,   51.,   47.,   45.,   0.,   0.,    0.,    27400., 45000., 58000., "DEF_CV.SIZ",  1,   "Oil Temp Chrome Vanadium valve spring wire -     ASTM A-232"],
 ["CHROME_SILICON",  "A401",    "QQW-412",  .284, 30000., 11500., 1.0, 330., 245.,  50.,   36.,   33.,   30.,   42.,   39.,   36.,   75.,   51.,   47.,   45.,   0.,   0.,    0.,    27400., 45000., 58000., "DEF_CS.SIZ",  1,   "Oil Temp Chrome Silicon spring wire -            ASTM A-401"],
 ["SAE9250",         "A401",    "QQW-412",  .284, 30000., 11500., 1.0, 330., 245.,  50.,   36.,   33.,   30.,   42.,   39.,   36.,   75.,   51.,   47.,   45.,   0.,   0.,    0.,    27400., 45000., 58000., "SIZES.SIZ",   4,   "Oil Temp Chrome Silicon valve spring wire -      ASTM A-401"],
 ["302_STAINLESS",   "Type302", "QQW-423",  .286, 28000., 10000., 1.0, 330., 145.,  36.,   35.,   33.,   30.,   35.,   34.,   33.,   55.,   50.,   45.,   40.,   0.,   0.,    0.,    27400., 45000., 58000., "DEF_302.SIZ", 128, "Type 302 Stainless Steel spring wire -           ASTM A-313 "],
 ["316_STAINLESS",   "Type316", "QQW-423B", .288, 28000., 10000., 1.0, 300., 135.,  36.,   35.,   33.,   30.,   35.,   34.,   33.,   52.,   50.,   45.,   40.,   0.,   0.,    0.,    27400., 45000., 58000., "DEF_302.SIZ", 278, "Type 316 Stainless Steel spring wire -           ASTM A-313 "],
 ["17-7_STAINLESS",  "A313",   "(cond_CH)", .277, 29500., 11000., 1.0, 345., 245.,  50.,   45.,   44.,   41.,   50.,   47.,   45.,   75.,   51.,   47.,   45.,   0.,   0.,    0.,    27400., 45000., 58000., "DEF_177.SIZ", 37,  "17Cr 7Ni Stainless wire: condition CH -          ASTM A-313 "],
 ["SPRING_BRASS",    "B134",    "QQW-321",  .308, 16000.,  5500., 1.0, 130., 120.,  35.,   36.,   33.,   30.,   40.,   39.,   36.,   55.,   50.,   45.,   40.,   0.,   0.,    0.,        0.,     0.,     0., "SIZES.SIZ",   27,  "70/30 Brass spring wire -                        ASTM B-134 "],
 ["PHOSPHOR_BRONZE", "B159",    "QQW-401",  .320, 15000.,  6250., 1.0, 145., 105.,  40.,   36.,   33.,   30.,   40.,   39.,   36.,   55.,   50.,   45.,   40.,   0.,   0.,    0.,        0.,     0.,     0., "DEF_PB.SIZ",  12,  "Phosphor Bronze spring wire -                    ASTM B-159 "],
 ["MONEL",           "400",    "(AMS7233)", .319, 26000.,  9500., 1.0, 180., 145.,  40.,   36.,   33.,   30.,   40.,   39.,   36.,   55.,   50.,   45.,   40.,   0.,   0.,    0.,        0.,     0.,     0., "DEF_MON.SIZ", 52,  "Monel  Alloy 400                                 AMS  7233 "],
 ["INCONEL_X-750",   "SprTmp", "(AMS5698)", .298, 31000., 11500., 1.0, 200., 165.,  40.,   36.,   33.,   30.,   40.,   39.,   36.,   55.,   50.,   45.,   40.,   0.,   0.,    0.,        0.,     0.,     0., "DEF_750.SIZ", 12,  "Inconel X-750  Spring Temper                     AMS  5698 "],
 ["BERYLLIUM-COPPER", "B197",   "QQW-530",  .298, 18500.,  6500., 1.0, 180., 170.,  45.,   36.,   33.,   30.,   42.,   39.,   36.,   55.,   50.,   45.,   40.,   0.,   0.,    0.,        0.,     0.,     0., "SIZES.SIZ",    2,  "Beryllium Copper -                               ASTM B-197 "],
 ["TITANIUM",        "BetaC",  "(AMS4917)", .175, 16500.,  6100., 1.0, 197., 170.,  40.,   36.,   33.,   30.,   40.,   39.,   36.,   50.,   50.,   45.,   40.,   0.,   0.,    0.,        0.,     0.,     0., "SIZES.SIZ", "8?",  "Ti-13V-11Cr-3Al  Beta C Titanium -               AMS  4917 "],
 ["5160H",           "A125-52", "",         .284, 30000., 11500., .91, 250., 230.,  50.,   40.,   38.,   35.,   48.,   46.,   43.,   75.,   51.,   47.,   45.,   0.,   0.,    0.,    27400., 45000., 58000., "SIZES.SIZ",   71,  "5160H Chromium steel:       not ground:hot wound:ASTM A-125"],
 ["5160H-CG",        "A125-52", "CL-GND",   .284, 30000., 11500., .96, 250., 230.,  50.,   40.,   38.,   35.,   48.,   46.,   43.,   75.,   51.,   47.,   45.,   0.,   0.,    0.,    27400., 45000., 58000., "SIZES.SIZ",   71,  "5160H Chromium steel:centerless ground:hot wound:ASTM A-125"]];

 /*  taken from READMAT.PLI
  * 
  * Initial manipulations of material array
  */
// temp = 1000.0;
// m_tab(i).astm_fs=m_tab(i).astm_fs || '/' || fedspec;
// m_tab(i).ee =    temp*m_tab(i).ee;
// m_tab(i).gg =    temp*m_tab(i).gg;
// m_tab(i).t010 =  temp*m_tab(i).t010;
// m_tab(i).t400 =  temp*m_tab(i).t400;
// m_tab(i).fy =    m_tab(i).pte(1);             /*  remove  */
// m_tab(i).pte(5) =m_tab(i).fy;
// m_tab(i).ptb(5) =m_tab(i).ptb(1);
// temp1=m_tab(i).gg;

 /*  taken from SETIDX.PLI
 
 Establish values for MATERIAL_INDEX and END_TYPE_INDEX
 based on MATERIAL_TYPE and END_TYPE.

 Cross check values of PROP_CALC_METHOD and END_CALC_METHOD.
*/
 
//  material_index=0;
    d[Material_Index] = 0;
//  j=length(material_type);
    j = d[Material_Type].length;
    i = 1;
//  do i=1 to tabl_max while(m_tab(i).gg ^= 0.0);
    do {
//  if material_type = substr(m_tab(i).matnam,kone,j) then
        if (m_tab[i][matnam].startsWith(Material_Type)) {
//      do;
//      material_type=m_tab(i).matnam;
            d[Material_Type] = m_tab[i][matnam];
//      material_index=i;
            d[Material_Index] = i;
//      if prop_calc_method ^= 1 then
            if (d[Prop_Calc_Method] != 1) {
//          do;
//          prop_calc_method=1;
                d[Prop_Calc_Method] = 1;
//          put skip list('PROP_CALC_METHOD  SET TO 1');
                console.log('PROP_CALC_METHOD  SET TO 1');
//          end;
            }
//     go to nomore;
            break;
//     end;
        }
        i++;
//  end;
    }
    while (m_tab[i].gg ^= 0.0);
//
// NOMORE:
//  end_type_index=0;
//  do i=1 to end_num while(end_type_index = 0);
//  j=length(end_type);
//  if end_type = substr(end_name(i),kone,j) then
//     do;
//     end_type=end_name(i);
//     end_type_index=i;
//     if end_calc_method ^= 1 then
//        do;
//        end_calc_method=1;
//        console.log('END_CALC_METHOD  SET TO 1');
//        end;
//     end;
//  end;
//
//  if material_index = 0 & prop_calc_method = 1 then
//     do;
//     prop_calc_method=2;
//     console.log('PROP_CALC_METHOD  SET TO 2');
//     end;
//
//  if end_type_index = 0 & end_calc_method = 1 then
//     do;
//     end_calc_method=2;
//     console.log('END_CALC_METHOD  SET TO 2');
//     end;


 /*  taken from TAB2D.PLI
  
    Copy values from property tables to constant vector (D)
    Is coupled to indexes and PROP_CALC_METHOD, END_CALC_METHOD
 */

               /*  copy from material table to constants  */
// i=material_index;
    i = d[Material_Index];
// if i > 0 then
    if (i > 0) {
//    do;
//    if prop_calc_method ^= 1 then             /*   debug  */
      if (d[Prop_Calc_Method] != 1) {
//           put skip list('TAB2D:   PROP_CALC_METHOD SET TO 1.');
          console.log('TAB2D:   PROP_CALC_METHOD SET TO 1.');
//    prop_calc_method = 1;
          d[Prop_Calc_Method] = 1;
      }
//
//    material_type    = m_tab(material_index).matnam;
    astm_fed_spec    = m_tab[i][astm_fs];
//    if m_tab(i).kh < 1.0 then process = 'HOT_WOUND';
//             else process = 'COLD_COILED';
//    density      = m_tab(i).dens;
//    torsion_modulus  = m_tab(i).gg;
//
//    hot_factor_kh    = m_tab(i).kh;
//    tensile_010      = m_tab(i).t010;
//    tensile_400      = m_tab(i).t400;
//    pc_tensile_endur = m_tab(i).pte(life_catagory);
//    pc_tensile_stat  = m_tab(i).fy;
//    pc_tensile_bend  = m_tab(i).ptb(life_catagory);
//                         /*  Kludge for torsion  */
//    if nmerit = 3 then
//    do;
//    torsion_modulus = m_tab(i).ee;
//    pc_tensile_stat = m_tab(i).ptb(1);
//    end;
//
//    wire_dia=p(2);
//    const_term=log10(tbase010);
//    slope_term=(tensile_400 - tensile_010) /
//           (log10(tbase400) - const_term);
//    tensile=slope_term*(log10(wire_dia)-const_term) + tensile_010;
//    stress_lim_endur=tensile*pc_tensile_endur/100.0;
//    stress_lim_stat =tensile*pc_tensile_stat /100.0;
//    end;
        }

               /*  copy from end type table to constants  */
         /*  check these values.     See AS Design Hdbk. p52  */
         /*    VVVVVVVVVVVVV          Kludge for Torsion  */
// if end_type_index > 0 & nmerit ^= 3 then
//    do;
//    if end_calc_method ^= 1 then              /*   debug  */
//            put skip list('TAB2D:  END_CALC_METHOD SET TO 1.');
//    end_calc_method=1;
//
//    end_type        = end_name(end_type_index);
//    inactive_coils  = inact_coil_tbl(end_type_index);
//    if end_type_index <= c_end_num then
//       add_coils_solid=acs_tbl(end_type_index);
//    else
//       add_coils_solid=0.0;
//    if end_type_index > c_end_num then
//       hook_deflect_all=hda_tbl(end_type_index-c_end_num);
//    else
//       hook_deflect_all=0.0;
//    end;

return d;

}
