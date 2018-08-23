export function init(d) {
   console.log('In init d=',d);

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

  /*  taken from SETIDX.PLI
    
     Establish values for MATERIAL_INDEX and END_TYPE_INDEX
     based on MATERIAL_TYPE and END_TYPE.

     Cross check values of PROP_CALC_METHOD and END_CALC_METHOD.
  */

//  material_index=0;
    d[Material_Index] = 0;
//  j=length(material_type);
    j = d[Material_Type].length;
    i = 0;
//  do i=1 to tabl_max while(m_tab(i).gg ^= 0.0);
    do {
//  if material_type = substr(m_tab(i).matnam,kone,j) then
        if (m_tab(i).matnam.startsWith(Material_Type)) {
//      do;
//      material_type=m_tab(i).matnam;
            d[material_type] = m_tab(i).matnam;
//      material_index=i;
            d[Material_Index] = i;
//      if prop_calc_method ^= 1 then
            if (d[Prop_Calc_Method] ^= 1) {
//          do;
//          prop_calc_method=1;
                d{prop_calc_method] = 1;
//          put skip list('PROP_CALC_METHOD  SET TO 1');
                console.log('PROP_CALC_METHOD  SET TO 1');
//          end;
                }
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
    i = d[material_index];
// if i > 0 then
    if (i > 0) {
//    do;
//    if prop_calc_method ^= 1 then             /*   debug  */
      if (d[prop_calc_method] ^= 1 {
//           put skip list('TAB2D:   PROP_CALC_METHOD SET TO 1.');
          console.log('TAB2D:   PROP_CALC_METHOD SET TO 1.');
//    prop_calc_method = 1;
          d[prop_calc_method] = 1;
      }
//
//    material_type    = m_tab(material_index).matnam;
//    astm_fed_spec    = m_tab(i).astm_fs;
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