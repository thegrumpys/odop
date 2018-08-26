import * as offsets from './offsets';
export function init(d, p) {
    console.log('In init d=',d,' p=',p);

// const Spring_Type = 0;
 const Material_Type = 1;
 const ASTM_Fed_Spec = 2;
// const End_Type = 3;
// const Catalog_Number = 4;
 const Process = 5;
// const Material_File = 6;
// const Dialog_Switch = 7;
 const Prop_Calc_Method = 8;
// const End_Calc_Method = 9;
 const Life_Category = 10;
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
 const tbase010 = 24;
 const tbase400 = 25;
 const const_term = 26;
 const slope_term = 27;
 const tensile_010 = 28;
 
 const Wire_Dia = 1;
 
 var i;
 const ten3 = 1000.0;
 var tensile_400;

   /*  reads material properties file  */
//   if material_file ^= oldmfil then
//       do;
//       i=0;
//       call read_mat(material_file,i);
//       oldmfil=material_file;
//       end;

// const matnam = 0;
 const astm_fs = 1;
 const fedspec = 2;
 const dens = 3;
// const ee = 4;
 const gg = 5;
 const kh = 6
 const t010 = 7;
 const t400 = 8;
 const pte1 = 9;
// const pte2 = 10;
// const pte3 = 11;
// const pte4 = 12;
 //    pte5 
// const pte6 = 13;
// const pte7 = 14;
// const pte8 = 15;
// const ptb1 = 16;
// const ptb2 = 17;
// const ptb3 = 18;
// const ptb4 = 19;
 //    ptb5
// const ptb6 = 20;
// const ptb7 = 21;
// const ptb8 = 22;
// const silf = 23;
// const sihf = 24;
// const sisr = 25;
// const siznam = 26;
// const dumyc = 27;
// const longnam = 28;
 
 var m_tab = require('./mat_ips.json');
    console.log("m_tab=", m_tab);
 

 /*  taken from SETIDX.PLI
 
 Establish values for MATERIAL_INDEX and END_TYPE_INDEX
 based on MATERIAL_TYPE and END_TYPE.

 Cross check values of PROP_CALC_METHOD and END_CALC_METHOD.
*/
 //
    i = p[offsets.Material_Type];
//    console.log("i_1= ", i);
    p[offsets.offsets.Material_Index] = i;
    
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
//        put skip list('END_CALC_METHOD  SET TO 1');
//        end;
//     end;
//  end;
//
//  if material_index = 0 & prop_calc_method = 1 then
//     do;
//     prop_calc_method=2;
//     put skip list('PROP_CALC_METHOD  SET TO 2');
//     end;
//
//  if end_type_index = 0 & end_calc_method = 1 then
//     do;
//     end_calc_method=2;
//     console.log('END_CALC_METHOD  SET TO 2');
//     end;


     /*  taken from READMAT.PLI
      *  Initial manipulations of material array
      */
    // temp = 1000.0;
//        temp = 1000.0;
    // m_tab(i).astm_fs=m_tab(i).astm_fs || '/' || fedspec;
//        m_tab[i][astm_fs] = m_tab[i][astm_fs] + '/' + m_tab[i][fedspec];
    // m_tab(i).ee =    temp*m_tab(i).ee;
//        m_tab[i][ee] = temp * m_tab[i][ee];
    // m_tab(i).gg =    temp*m_tab(i).gg;
//        m_tab[i][gg] = temp * m_tab[i][gg];
    // m_tab(i).t010 =  temp*m_tab(i).t010;
//        m_tab[i][t010] = temp * m_tab[i][t010];
    // m_tab(i).t400 =  temp*m_tab(i).t400;
//        m_tab[i][t400] = temp * m_tab[i][t400];
    // m_tab(i).fy =    m_tab(i).pte(1);             /*  remove  */
    // m_tab(i).pte(5) =m_tab(i).fy;
    // m_tab(i).ptb(5) =m_tab(i).ptb(1);
    // temp1=m_tab(i).gg;

 /*  taken from TAB2D.PLI
    Copy values from property tables to constant vector (D)
    Is coupled to indexes and PROP_CALC_METHOD, END_CALC_METHOD
 */

               /*  copy from material table to constants  */
// i=material_index;
    i = p[offsets.Material_Index];
//    console.log("i_2= ", i);
// if i > 0 then
    if (i > 0) {
//    do;
//    if prop_calc_method ^= 1 then             /*   debug  */
    if (p[offsets.Prop_Calc_Method] !== 1) {
//           put skip list('TAB2D:   PROP_CALC_METHOD SET TO 1.');
        console.log('TAB2D:   PROP_CALC_METHOD SET TO 1.');
//    prop_calc_method = 1;
        p[offsets.Prop_Calc_Method] = 1;
    }
//
//    material_type    = m_tab(material_index).matnam;
//    astm_fed_spec    = m_tab(i).astm_fs;
    p[offsets.ASTM_Fed_Spec] = m_tab[i][offsets.astm_fs] + '/' + m_tab[i][offsets.fedspec];
//    if m_tab(i).kh < 1.0 then process = 'HOT_WOUND';
    if (m_tab[i][offsets.kh] < 1.0) {
        p[offsets.Process] = "Hot_Wound";
    }
//             else process = 'COLD_COILED';
    else {
        p[offsets.Process] = "Cold_Coiled";
    }
//    density      = m_tab(i).dens;
    p[offsets.Density]      = m_tab[i][offsets.dens];
//    torsion_modulus  = m_tab(i).gg;
    p[offsets.Torsion_Modulus]  = ten3 * m_tab[i][offsets.gg];
//
//    hot_factor_kh    = m_tab(i).kh;
    p[offsets.Hot_Factor_Kh]    = m_tab[i][offsets.kh];
//    tensile_010      = m_tab(i).t010;
    p[offsets.tensile_010]      = ten3 * m_tab[i][offsets.t010];
//    tensile_400      = m_tab(i).t400;
    tensile_400         = ten3 * m_tab[i][offsets.t400];
    
    var life_category = p[offsets.Life_Category];
//    pc_tensile_endur = m_tab(i).pte(life_catagory);
    p[offsets.PC_Tensile_Endur] = m_tab[i][offsets.pte1+life_category-1];
//    pc_tensile_stat  = m_tab(i).fy;
    p[offsets.PC_Tensile_Stat]  = m_tab[i][offsets.pte1];
//    pc_tensile_bend  = m_tab(i).ptb(life_catagory);

    //                         /*  Kludge for torsion  */
//    if nmerit = 3 then
//    do;
//    torsion_modulus = m_tab(i).ee;
//    pc_tensile_stat = m_tab(i).ptb(1);
//    end;
//
//    wire_dia=p(2);
//    console.log("wire_dia = ", p[offsets.Wire_Dia]);
//    const_term=log10(tbase010);
    p[offsets.const_term] = Math.log10(p[offsets.tbase010]);
//    slope_term=(tensile_400 - tensile_010) /
//           (log10(tbase400) - const_term);
//    console.log("tensile_400 = ", tensile_400);
    p[offsets.slope_term] = (tensile_400 - p[offsets.tensile_010]) / (Math.log10(p[offsets.tbase400]) - p[offsets.const_term]);
//    tensile=slope_term*(log10(p[offsets.Wire_Dia])-const_term) + tensile_010;
    p[offsets.Tensile] = p[offsets.slope_term] * (Math.log10(p[offsets.Wire_Dia]) - p[offsets.const_term]) + p[offsets.tensile_010];
//    stress_lim_endur=tensile*pc_tensile_endur/100.0;
    p[offsets.Stress_Lim_Endur] = p[offsets.Tensile] * p[offsets.PC_Tensile_Endur] / 100.0;
//    stress_lim_stat =tensile*pc_tensile_stat /100.0;
    p[offsets.Stress_Lim_Stat]  = p[offsets.Tensile] * p[offsets.PC_Tensile_Stat]  / 100.0;
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
