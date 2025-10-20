# Spring Material Table key

This file is intended as documentation for the ODOP:Spring material tables 
(odop\client\src\designtypes\Spring\mat_us.json, mat_metric.json)

Column   | Description &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp;
 ---     | ---     
 matnam  | Material common name 
 astm_fs | ASTM or other primary designation 
 fedspec | US Federal designation, other secondary designation or comment/note 
 Density | lb/cu-in or g/mm^3 
 ee      | [Elastic modulus](https://en.wikipedia.org/wiki/Elastic_modulus) (E) a.k.a. [Young's modulus](https://en.wikipedia.org/wiki/Young%27s_modulus) 
 gg      | Torsion modulus (G) a.k.a. [shear modulus or modulus of rigidity](https://en.wikipedia.org/wiki/Shear_modulus) 
 kh      | Reduction factor applied to modulus of hot-wound materials 
 t010    | Tensile strength of wire of 0.010 inch diameter (or metric equiv.). Used in interpolation / extrapolation of wire tensile strength. PSI or MPa.
 t400    | Tensile strength of wire of 0.400 inch diameter (or metric equiv.). Used in interpolation / extrapolation of wire tensile strength. PSI or MPa. 
 pte1    | %_Tensile_Endur for Life_Category 1 (Static - Not peened). Compression spring. Soderberg calculation. Also used as pte5. 
 pte2    | %_Tensile_Endur for Life_Category 2 (100,000 cycles - Not peened). Allowable % of tensile for a cyclic load application. 
 pte3    | %_Tensile_Endur for Life_Category 3 (1 Million cycles - Not peened). See: [Alternative failure criteria](https://en.wikipedia.org/wiki/Fatigue_(material)) 
 pte4    | %_Tensile_Endur for Life_Category 4 (10 Million cycles - Not peened). And see: [Soderberg Line](https://en.wikipedia.org/wiki/Goodman_relation)
 pte6    | %_Tensile_Endur for Life_Category 6 (100,000 cycles - Shot peened). Allowable % of tensile for cyclic load application. 
 pte7    | %_Tensile_Endur for Life_Category 7 (1 Million cycles - Shot peened). 
 pte8    | %_Tensile_Endur for Life_Category 8 (10 Million cycles - Shot peened). 
 ptb1    | %_Tensile_Bend for Life_Category 1 (Static - Not peened). Bending in extension spring ends. Soderberg calculation. Also used as ptb5.
 ptb2    | %_Tensile_Bend for Life_Category 2 (100,000 cycles - Not peened) 
 ptb3    | %_Tensile_Bend for Life_Category 3 (1 Million cycles - Not peened) 
 ptb4    | %_Tensile_Bend for Life_Category 4 (10 Million cycles - Not peened). Also used for torsion spring bending (ptb4). See torsion spring init.js for details. 
 ptb6    | Not used 
 ptb7    | Not used 
 ptb8    | Not used 
 ptb1sr  | Allowable % tensile in bending for Life_Category 1 (Static - Not peened) - stress relieved torsion springs 
 ptb1nosr| Allowable % tensile in bending for Life_Category 1 (Static - Not peened) - not stress relieved torsion springs 
 ptb2sr  | Allowable % tensile in bending for Life_Category 2 (100,000 cycles) - stress relieved torsion springs 
 ptb3sr  | Allowable % tensile in bending for Life_Category 3 (1 Million cycles) - stress relieved torsion springs 
 silf    | Stress initial low factor - Calc input to lower end of range of extension spring allowable initial stress. See FDCL on Initial_Stress.  
 sihf    | Stress initial high factor - Calc input to upper end of range of extension spring allowable initial stress 
 sisr    | Stress initial special request - Expanded upper end of range when "Special Request" is designated.
 wire_dia_filename| Name of file containing list of standard wire diameters for this material.
 od_free_filename | Name of file containing list of standard outside diameters for this material.
 dumyc   | Key of source information for this material
 longnam | Long Name - Expanded description of this material.  As of v6.1, not currently displayed in user interface
 
**Notes:**  
 This file and the startup file (initialState) contain the only units dependence within ODOP:Spring. 
 If the startup file is altered consistent with changes to this file, 
 ODOP:Spring can be made to operate in any unit system.

 Modulus and stress values are multiplied by 1000 during the read process.

 %_TENSILE_ENDUR values have been limited at %_TENSILE_STAT (pte1) values.
 This affects primarily the non-ferrous shot peened entries.
 Shot peened %_TENSILE_BEND values are zero because extension springs are not typically peened.  

 Catalog files may be dependent on this file. 
 Do not add or delete entries in this file without checking for corresponding changes to the catalog file(s).  

 See Help lookup Prop_Calc_Method for details on calculation of material properties. 
 Prop_Calc_Method = 1 recalculates tensile strength for every new value of Wire_Dia.  Not so with Prop_Calc_Method 2 and 3. 
 Prop_Calc_Method = 3 does not use any of the percent tensile values. 
 Switching from Prop_Calc_Method 1 to 2 or 3, retains the existing values. 
 Switching from Prop_Calc_Method 2 or 3 to 1 resets to table values. 
 In most cases, it is possible examine the Calculation Inputs to see the values in this table appear in the user interface.
 Examine the appropriate spring type init.js file to better understand how the values in this table feed into the design equations. 

**Key to Source of data**   (multi-digit key means multiple sources)  
0 - not applicable  
1 - major spring manufacturer's design handbook  
2 - Spring Manufacturer's Institute Handbook of Spring Design  
3 - ARMCO datasheet (in files)  
4 - sample 1 (in files)  
5 - SS&M stress charts (in files)  
6 - Marks’ Standard Handbook for Mechanical Engineers  
7 - Spring Designer's Handbook by Harold Carlson -  
    Marcel Dekker (pp 143-162, 341)  
8 - practical experience, survey of spring catalogs  
? - unknown  
 
 