import * as o from './offsets';
import * as mo from './mat_ips_offsets';
export function init(p) {
//    console.log('In init p=',p);
 var x = [];
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

 var m_tab = require('./mat_ips.json');
//    console.log("m_tab=", m_tab);
 

 /*  taken from SETIDX.PLI
 
 Establish values for MATERIAL_INDEX and END_TYPE_INDEX
 based on MATERIAL_TYPE and END_TYPE.

 Cross check values of PROP_CALC_METHOD and END_CALC_METHOD.
*/
 //
    i = x[o.Material_Type];
//    console.log("i_1= ", i);
    x[o.Material_Index] = i;
    
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
    i = x[o.Material_Index];
//    console.log("i_2= ", i);
// if i > 0 then
    if (i > 0) {
//    do;
//    if prop_calc_method ^= 1 then             /*   debug  */
    if (x[o.Prop_Calc_Method] !== 1) {
//           put skip list('TAB2D:   PROP_CALC_METHOD SET TO 1.');
//        console.log('TAB2D:   PROP_CALC_METHOD SET TO 1.');
//    prop_calc_method = 1;
        x[o.Prop_Calc_Method] = 1;
    }
//
//    material_type    = m_tab(material_index).matnam;
//    astm_fed_spec    = m_tab(i).astm_fs;
    x[o.ASTM_Fed_Spec] = m_tab[i][mo.astm_fs] + '/' + m_tab[i][mo.fedspec];
//    if m_tab(i).kh < 1.0 then process = 'HOT_WOUND';
    if (m_tab[i][mo.kh] < 1.0) {
        x[o.Process] = "Hot_Wound";
    }
//             else process = 'COLD_COILED';
    else {
        x[o.Process] = "Cold_Coiled";
    }
//    density      = m_tab(i).dens;
    x[o.Density]      = m_tab[i][mo.dens];
//    torsion_modulus  = m_tab(i).gg;
    x[o.Torsion_Modulus]  = ten3 * m_tab[i][mo.gg];
//
//    hot_factor_kh    = m_tab(i).kh;
    x[o.Hot_Factor_Kh]    = m_tab[i][mo.kh];
//    tensile_010      = m_tab(i).t010;
    x[o.tensile_010]      = ten3 * m_tab[i][mo.t010];
//    tensile_400      = m_tab(i).t400;
    tensile_400         = ten3 * m_tab[i][mo.t400];
    
    var life_category = x[o.Life_Category];
//    pc_tensile_endur = m_tab(i).pte(life_catagory);
    x[o.PC_Tensile_Endur] = m_tab[i][mo.pte1+life_category-1];
//    pc_tensile_stat  = m_tab(i).fy;
    x[o.PC_Tensile_Stat]  = m_tab[i][mo.pte1];
//    pc_tensile_bend  = m_tab(i).ptb(life_catagory);

    //                         /*  Kludge for torsion  */
//    if nmerit = 3 then
//    do;
//    torsion_modulus = m_tab(i).ee;
//    pc_tensile_stat = m_tab(i).ptb(1);
//    end;
//
//    wire_dia=p(2);
//    console.log("wire_dia = ", x[o.Wire_Dia]);
//    const_term=log10(tbase010);
    x[o.const_term] = Math.log10(x[o.tbase010]);
//    slope_term=(tensile_400 - tensile_010) /
//           (log10(tbase400) - const_term);
//    console.log("tensile_400 = ", tensile_400);
    x[o.slope_term] = (tensile_400 - x[o.tensile_010]) / (Math.log10(x[o.tbase400]) - x[o.const_term]);
//    tensile=slope_term*(log10(x[o.Wire_Dia])-const_term) + tensile_010;
    x[o.Tensile] = x[o.slope_term] * (Math.log10(x[o.Wire_Dia]) - x[o.const_term]) + x[o.tensile_010];
//    stress_lim_endur=tensile*pc_tensile_endur/100.0;
    x[o.Stress_Lim_Endur] = x[o.Tensile] * x[o.PC_Tensile_Endur] / 100.0;
//    stress_lim_stat =tensile*pc_tensile_stat /100.0;
    x[o.Stress_Lim_Stat]  = x[o.Tensile] * x[o.PC_Tensile_Stat]  / 100.0;
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

    console.log('In init p=',p,' x=',x);
    return x;

}
