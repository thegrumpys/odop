#### Torsion Spring Design Type

The Torsion Spring design type is a full-featured mathematical model enabling 
the engineering design of helical coil torsion springs.   

This section presents material unique to the Torsion Spring design type.
The more general material available at [Spring Design Topics](/docs/Help/SpringDesign)
provides important supplemental information.   

___

**On this page:**  
[Torsion spring moment-deflection diagram](t_spring.html#t_springFD_Diag)  
[Torsion spring moment-deflection point names](t_spring.html#t_springFD_Names)  
[Torsion spring dimensions](t_spring.html#t_springDims)  
[Independent Variable names](t_spring.html#t_springIV_Names)  
[Dependent Variable names](t_spring.html#t_springDV_Names)  
[Calculation Input names](t_spring.html#t_springCalcInputNames)  
[Values in reports](t_spring.html#t_springOtherValues)  
[Torsion spring end types](t_spring.html#t_springEndTypes)  
<!--- [Constraints unique to torsion springs](t_spring.html#t_springConstraints)  -->

&nbsp;
___

<a id="t_springFD_Diag"></a>  
___

**Torsion spring moment-deflection diagram**   

                 |                / 
         M_2 ----|---------------/  
                 |              /:
           M     |             / :
                 |            /  :        ODOP:Spring
           O     |           /   :          Names
                 |          /    :  
           M     |         /     :          Torsion
                 |        /      :          spring
           E     |       /       :  
                 |      /        :  
        M_1 -----|-----/         :  
                 |    /:         :  
           N     |   / :<------->:------- Stroke
                 |  /  :         :  
           T     | /   :         :  
                 |/____:_________:_________
            L_Free     :         :  
                      L_1       L_2
                 Deflect_1     Deflect_2
     
                 D E F L E C T I O N

&nbsp;   

___

<a id="t_springFD_Names"></a>  
___

**Torsion spring moment-deflection point names**   

 The torsion spring moment-deflection points and associated names are:

             length    torque     outside  inside    stress    factor of
            deflection            diameter diameter            safety
             ______    ______     ________ ________  ______    ________
    
    free:    L_Body               OD_Free   ID_Free
    
    point 1:  L_1        M_1                        Stress_1
             Deflect_1
    
    point 2:  L_2        M_2                        Stress_2    FS_2
             Deflect_2
    
    max safe:   


 point 1 = minimum operating load &nbsp; &nbsp; point 2 = maximum operating load   

&nbsp;
   

___

<a id="t_springDims"></a>  
___

**Torsion spring dimensions**  

The following diagram may be of some assistance in interpreting the names 
associated with various dimensions of a torsion spring.  
   
![Torsion Spring Names](/docs/Help/DesignTypes/png/TorsionNames.png "Torsion Spring Names")   

&nbsp;   
   
___

<a id="t_springIV_Names"></a>  
___

**Independent Variable names:**   

    Wire_Dia     -  wire diameter
    
    OD_Free      -  outside diameter in the free condition
    
    Coils_T      -  total number of coils
    
    M_1          -  load (moment) at point 1  (minimum operating load)
    
    M_2          -  load (moment) at point 2  (maximum operating load)
    
    Coil_Spacing -  extra space between each coil
   
&nbsp;
   
___

<a id="t_springDV_Names"></a>  
___

**Dependent Variable names**:

    Mean_Dia       -  mean diameter of spring coil in free condition
                     (OD_free + ID_Free)/2 
     
    ID_Free        -  inside diameter of spring coil in free condition
    
    Coils_A        -  number of active coils (turns)
                      (includes arm deflection)
                      
    Rate           -  spring constant - moment per unit deflection 
    
    Deflect_1      -  deflection caused by M_1
    
    Deflect_2      -  deflection caused by M_2
    
    L_Body         -  spring body length in free condition 
    
    L_1            -  spring body length at minimum operating load  (M_1) 
    
    L_2            -  spring body length at maximum operating load  (M_2) 
    
    End_Angle_Free -  relative angle between arms in free condition 
    
    Stroke         -  angular displacement from point 1 to point 2 
    
    Weight         -  weight of one spring; wire density * wire volume 
    
    Spring_Index   -  spring index;  the ratio Coil_Dia/Wire_Dia 
    
    End_Deflect_All - End deflection allowance  (equivalent coils) 
    
    Stress_1       -  bending stress at point 1 
    
    Stress_2       -  bending stress at point 2 
    
    FS_2           -  static factor of safety at point 2
                      The ratio of allowable stress at point 2
                      to the calculated stress induced by the load at
                      point 2  (Stress_Lim_Bnd_Stat/Stress_2). 
                      
    FS_Cycle_Life  -  factor of safety based on the Soderberg endurance
                      limit calculation.  This figure uses the allowable
                      endurance stress (Stress_Lim_Bnd_Endur) to include
                      fatigue considerations.  
                      Refer to additional discussion in the Cycle_Life section.
                      
    Cycle_Life     -  expected cycle life based on a calculation using the 
                      "modified Goodman method".  This value is approximate.  
                      Refer to additional discussion in the Cycle_Life section.
                      
    Force_Arm_2    -  Force produced at distance of Arm_2
                    
    Energy         -  Change in elastic potential energy between 
                      point 1 and point 2.

&nbsp;
For additional information: [Cycle_Life](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  
&nbsp;  

___

<a id="t_springCalcInputNames"></a>  
___

**Calculation Input names**   

    Spring_Type    -  character string used only as label
    
    Prop_Calc_Method - This selection controls how material properties and
                       and allowable stresses are determined.
                     1 indicates values come from materials table;
                       allowable stresses will be calculated as a function
                       of Wire_Dia.
                     2 indicates tensile and allowable % are supplied
                       by the user; allowable stresses are calculated.
                     3 indicates allowable stresses are supplied directly
                       by the user.
                       Refer to documentation section on Materials.
    
    Material_Type  -  This selection determines which entry in
                      the material table is used to determine
                      allowable stresses when Prop_Calc_Method is 1.
                      Otherwise is ignored.
    
    ASTM/Fed_Spec  -  character string used only as a label to further
                      identify the origin of material property data
    
    Process        -  character string used to identify the
                      manufacturing process.  It is controlled
                      by the material selected from the material table.
                      Values are usually Cold_Coiled or Hot_Wound.
                      Refer to discussion under Hot_Factor_Kh.
    
    Heat_Treat     -  Selects heat treatment process.
                      Controls use of Kb - stress correction factor
    
<!---  -->
<!---    MATERIAL_FILE    -  character string containing the material table name. -->
<!---            It is normally established by the initialState.js file.  -->
<!---  -->
     
    Life_Category  -  This selection captures the user's input about shot peening
                      and required cycle life.  It is used in the
                      calculation of FS_Cycle_Life.
                      Refer to documentation section on Cycle_Life.
    
    End_Type       -  This selection indicates end configuration:
                      Tangent ends versus User Specified ends.
    
    Density          -  wire density; weight per unit volume 
    
    Elastic_Modulus  -  Modulus of Elasticity modulus (E) 
                         (a.k.a. Young's Modulus)
                         
    Hot_Factor_Kh    -  empirical correction factor for hot wound modulus 
    
    Tensile          -  selected material tensile strength 
    
    %_Ten_Bnd_Endur  -  fraction of tensile strength for bending endurance 
    
    %_Ten_Bnd_Stat   -  fraction of tensile strength for bending static load 
    
    Stress_Lim_Bnd_Endur -  allowable stress limit; cyclic application (bending) 
    
    Stress_Lim_Bnd_Stat  -  allowable stress limit; static application (bending)
    
    Arm_1, etc.      -  refer to the diagram in torsion spring dimensions
    
    Catalog_Name     -  name of the catalog containing the most recently 
                        selected catalog entry.
                        
    Catalog_Number   -  catalog number of the most recent catalog entry.  


&nbsp;
For additional information: 
 - [Materials](/docs/Help/SpringDesign/materials.html)   
 - [Cycle_Life](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  
 - [Torsion spring end types](t_spring.html#t_springEndTypes)   
 - [Torsion spring dimensions](t_spring.html#t_springDims)  
 
&nbsp;
   
___

<a id="t_springOtherValues"></a>  
___

**Values in reports**   

Other values calculated and displayed in the Reports include:

    Wire Length      -  total length of wire required to manufacture the
                        spring, not including any waste.
    
    Safe Load        -  The load supported by the spring at maximum 
                        allowable stress (Stress_Lim_Bnd_Stat).
    
    Pitch            -  coil to coil spacing in the free state
    
    Weight/1000      -  weight per 1000 springs 
    
    Stress Ratio     -  ratio of minimum stress to maximum stress
                       (STRESS_1/STRESS_2)
    
    Kb               -  stress correction factor
                       (see: Heat_Treat)
    
    Helix Angle      -  angle, in degrees, of the spring helix relative
                        to a perpendicular to the spring axis

&nbsp;

___

<a id="t_springEndTypes"></a>  
___

**End Types**   

For torsion springs, the Calculation Input End_Type has the following possible values:

         Torsion   
         
    1    Tangent
    2    User_Specified

In the current version of ODOP:Spring, no calculations depend on these End_Type settings.
They are for display only.   

Separately, the values of Arm\_1, Arm\_2, L\_End\_1, L\_End\_2, XLen\_1 and XLen_2 are available to
describe end conditions. 
This diagram  may be helpful.   

![Torsion Spring Names](/docs/Help/DesignTypes/png/TorsionNames.png "Torsion Spring Names")   

&nbsp;

[Design Types](/docs/Help/DesignTypes)   
[Spring Design Topics](/docs/Help/SpringDesign)   
[Help](/docs/Help)   


&nbsp;


<!---
While single line comments work as expected, 
the previous version of Eclipse required a multi-line comment must be the last thing in the file.
Eclipse .md Preview suppressed display of everything after the comment header.

The following lines are alternate syntax for in-line image links   
See docs/procedures/ImageLocations for preferred approach on image path.   

![Torsion Spring Names](/docs/Help/DesignTypes/png/TorsionNames.png "Torsion Spring Names")   

<img src="/docs/Help/DesignTypes/png/TorsionNames.png" alt="Torsion Spring Names"/>

![Torsion Spring Names](https://odop.herokuapp.com/docs/Help/DesignTypes/png/TorsionNames.png "Torsion Spring Names")   

-->

