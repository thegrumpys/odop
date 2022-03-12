#### Compression Spring Design Type

The Compression Spring design type is a full-featured mathematical model enabling 
the engineering design of helical coil compression springs.   

This section presents material unique to the Compression Spring design type.
The more general material available at [Spring Design Topics](../SpringDesign)
provides important supplemental information.   

___

**On this page:**  
[Compression spring force-deflection diagram](c_spring.html#c_springFD_Diag)  
[Compression spring force-deflection point names](c_spring.html#c_springFD_Names)  
[Independent Variable names](c_spring.html#c_springIV_Names)  
[Dependent Variable names](c_spring.html#c_springDV_Names)  
[Calculation Input names](c_spring.html#c_springCalcInputNames)  
[Values in reports](c_spring.html#c_springOtherValues)  
[Constraints unique to compression springs](c_spring.html#c_springConstraints)  
[Compression spring end types](c_spring.html#c_springEndTypes)  
[Buckling](c_spring.html#c_springBuckling)  

&nbsp;
___

<a id="c_springFD_Diag"></a>  
___

**Compression spring force-deflection diagram**   

    Force_Solid -|---------------/.
                 |              / .
     Force_2 ----|-------------/  .
                 |            /:  .      ODOP:Spring
           F     |           / :  .        Names
                 |          /  :  .
           O     |         /   :  .       Compression
                 |        /    :  .         spring
           R     |       /     :  .
                 |      /      :  .
    Force_1 -----|-----/       :  .
                 |    /:       :  .
           C     |   / :<----->:------- L_Stroke
                 |  /  :       :  .
           E     | /   :       :  .
                 |/____:_______:__._______
            L_Free     :       :  L_Solid
                      L_1     L_2
                 Deflect_1    Deflect_2
     
                 D E F L E C T I O N

&nbsp;   
___

<a id="c_springFD_Names"></a>  
___

**Compression spring force-deflection point names**   

 The compression spring force-deflection points and associated names are:

             length    force        outside  inside    stress      factor of
                                    diameter diameter              safety
             ______    ______       ________ ________  ______      ________
    
    free:    L_Free                 OD_Free  ID_Free
    
    point 1: L_1      Force_1                         Stress_1
    
    point 2: L_2      Force_2                         Stress_2      FS_2
    
    solid:   L_Solid  Force_Solid                     Stress_Solid  FS_Solid


 point 1 = minimum operating load &nbsp; &nbsp; point 2 = maximum operating load   

&nbsp;
   
___

<a id="c_springIV_Names"></a>  
___

**Independent Variable names:**   

    Wire_Dia     -  wire diameter
    
    OD_Free      -  outside diameter in the free condition
    
    Coils_T      -  total number of coils, including inactive coils
    
    L_Free       -  free length
    
    Force_1      -  load at point 1  (minimum operating load)
    
    Force_2      -  load at point 2  (maximum operating load)
    
&nbsp;
   
___

<a id="c_springDV_Names"></a>  
___

**Dependent Variable names**:

    Mean_Dia     -  mean diameter of spring coil in free condition
                     (OD_Free + ID_Free)/2
                     
    Coils_A      -  number of active coils (turns)
    
    Rate         -  spring constant - force per unit deflection
    
    Deflect_1    -  deflection at Force_1
    
    Deflect_2    -  deflection at Force_2
    
    L_1          -  spring length at minimum operating load  (Force_1)
    
    L_2          -  spring length at maximum operating load  (Force_2)
    
    L_Stroke     -  net deflection between point 1 and point 2
    
    L_Solid      -  solid height
    
    Slenderness  -  ratio of L_Free to Mean_Dia.  The "form factor"
                    that governs a spring's tendency to buckle
                    
    ID_Free      -  inside  diameter in free condition
    
    Weight       -  weight of spring; wire density * wire volume
    
    Sring_Index  -  spring index;  the ratio Mean_Dia/Wire_Dia
    
    Force_Solid  -  force produced in solid condition
    
    Stress_1     -  torsional stress at point 1
    
    Stress_2     -  torsional stress at point 2
    
    Stress_Solid -  torsional stress in the solid condition
    
    FS_2         -  static factor of safety at point 2
                    This is the ratio of allowable stress at point 2
                    to the calculated stress induced by the load at
                    point 2  (Stress_Lim_Stat/Stress_2).
                    
    FS_Solid     -  static factor of safety at solid condition
                     (Stress_Lim_Stat/Stress_Solid)
                     
    FS_CycleLife -  factor of safety based on the Soderberg endurance
                    limit calculation.  This figure uses the allowable
                    endurance stress (Stress_Lim_Endur) to include
                    fatigue considerations. Refer to additional 
                    discussion in the Cycle_Life topic.
                    
    Cycle_Life   -  expected cycle life based on a calculation
                    using the "modified Goodman method".  This value is
                    approximate.  Refer to additional discussion in the
                    Cycle_Life topic.
                    
    %_Avail_Deflect - the percentage of available deflection consumed at
                    load point 2.
                    
    Energy       -  Change in elastic potential energy between 
                    point 1 and point 2.

&nbsp;
For additional information: [Cycle_Life](../SpringDesign/spring_oview.html#cycleLife)  
&nbsp;
   
___

<a id="c_springCalcInputNames"></a>  
___

**Calculation Input names**  

    Spring_Type   -  character string used only as a label
    
    Prop_Calc_Method -  Property Calculation Method
                controls how material properties and
                allowable stresses are determined.
                1 indicates values come from materials table;
                allowable stresses will be calculated as a 
                function of Wire_Dia.
                2 indicates tensile and allowable % are supplied
                by the user; allowable stresses are calculated.
                3 indicates allowable stresses are supplied 
                directly by the user.
                Refer to the on-line documentation section 
                on Materials.
    
    Material_Type -  selects an entry in the material table.
                     Is used to determine allowable stresses when
                     Prop_Calc_Method is 1.
                     Otherwise is ignored.
    
    ASTM/Fed-Spec -  character string used only as a label to further
                     identify the origin of material property data
    
    Process       -  character string used to identify the
                     manufacturing process.  It is normally controlled
                     by the material selected from the material table.
                     Values are usually Cold_Coiled or Hot_Wound.
                     Refer to discussion under Hot_Factor_Kh.
    
<!---     Material_File -  character string containing the material table name. -->
<!---                      It is normally established by the initialState.js file. -->
    
    Life_Category    -  This value reflects the user's input about 
                        shot peening and required cycle life.  
                        It is input to the calculation of FS_CycleLife.
                        Refer to documentation section on Cycle_Life.
    
    Density          -  wire density; weight per unit volume
    
    Torsion_Modlus   -  torsional modulus (G); 
                        a.k.a. shear modulus or modulus of rigidity
    
    Hot_Factor_Kh    -  empirical correction factor for hot wound modulus
    
    Tensile          -  tensile strength 
    
    %_Tensile_Endur  -  fraction of tensile strength for torsion endurance
    
    %_Tensile_Stat   -  fraction of tensile strength for torsion static load
    
    Stress_Lim_Endur -  allowable stress limit; cyclic application (torsion)
    
    Stress_Lim_Stat  -  allowable stress limit; static application (torsion)
    
    End_Type         -  character string that is used to determine
                        calculations for Inactive_Coils and L_Solid & Pitch.
    
    Inactive_Coils   -  number of inactive coils (depends on End_Type)
    
    Add_Coils@Solid  -  extra coils included in solid height calculation
                        refer to End_Type for additional information
    
    Catalog_Name     -  name of the catalog containing the most recently 
                        selected catalog entry.
                        
    Catalog_Number   -  catalog number of the most recent catalog entry.  

&nbsp;
For additional information: 
 - [Materials](../SpringDesign/materials.html)   
 - [Cycle_Life](../SpringDesign/spring_oview.html#cycleLife)  
 - [Compression spring end types](c_spring.html#c_springEndTypes)   
&nbsp;
   
___

<a id="c_springOtherValues"></a>  
___

**Values in reports**   

Other values calculated and displayed in the Reports include:

    Wire Length  -  total length of wire required to manufacture the
                    spring, not including any waste.
    
    Safe Load    -  The load supported by the spring in the solid
                    condition or at a stress equal to the
                    Stress_Lim_Stat value, whichever is lower.
    
    Pitch        -  coil to coil spacing in the free state
    
    Weight       -  weight of 1,000 springs 
    
    Buckling     -  indication of tendency to buckle given the current
                    design and loading conditions.
    
    Stress Ratio -  ratio of minimum stress to maximum stress
                     (Stress_1/Stress_2)
    
    Kw1, Kw2     -  stress correction factors due to curvature.
    
    Helix Angle  -  angle, in degrees, of the spring helix relative
                    to a perpendicular to the spring axis
&nbsp;

___

<a id="c_springConstraints"></a>  
___

**Constraints unique to compression springs:**   

Slenderness is a compression spring's ratio of free length (L\_Free) to
mean coil diameter (Mean\_Dia).  If this ratio exceeds 4 for a
compression spring, that spring will have a tendency to buckle under
load.  In that case, the spring will usually need support in the form of
a sleeve or post.  In order to restrain the search to select designs
that do not have a tendency to buckle, set the value of Slenderness MAX
to a value of 4.0 or less. 
For additional information, see: [Buckling](c_spring.html#c_springBuckling)  


%\_Avail\_Deflect is the percentage of available deflection consumed at
load point 2.  %\_Avail\_Deflect is usually constrained to be less than 85
to 98 percent.  Thus, it requires the search to select designs that
provide a small margin between load point 2 and the solid condition.

&nbsp;

___

<a id="c_springEndTypes"></a>  
___

**End Types**   

ODOP:Spring currently implements six spring end types for compression springs. 
In addition, the user can define specialized end conditions.
These end types are represented by the Calculation Input End\_Type which
for compression springs has the following possible values:

          Compression 
    
    1     Open    
    2     Open&Ground   
    3     Closed   
    4     Closed&Ground  
    5     Tapered_C&G  
    6     Pig-Tail
    7     User_Specified  

For a compression spring, the end type selection directly impacts the value of
Inactive\_Coils and Add\_Coils@Solid. 
L\_Solid, Pitch and other variables are impacted indirectly. 

<!--- Additional information may be found in the documentation sections for EQNSET.  -->
   
When End\_Type is set to one of the standard (non User_Specified) selections, 
Inactive\_Coils and Add\_Coils@Solid will be set by the 
program from values contained in internal tables. 
When the value of End\_Type is User_Specified, 
the user may set these values by making an entry in the corresponding 
numeric entry field.
   
In order to facilitate the treatment of less common compression spring end
types such as the "Tapered, Closed and Ground" configuration associated with hot
wound springs, ODOP:Spring has added an extra term into the solid height
calculation.  Add\_Coils@Solid is a constant that is normally determined by
the value of End\_Type.  It is used to separate the
solid height calculation from the rate equation which is dependent on the
value of Inactive\_Coils.  Add\_Coils@Solid represents the number of wire
diameters added into the solid height beyond Coils\_T.  For Open and Closed
end types, it has a value of +1.0.  For Open&Ground and Closed&Ground end
types, it has a value of 0.0.  For the Tapered\_C&G end type,
Add\_Coils@Solid has a value of -0.5.

Note that the Add\_Coils@Solid term is not included in Coils\_T or the wire
length and weight calculations.  It is only an adjustment for the solid
height calculation and is not the correct way to represent dead coils.
   
The Add_Coils@Solid term may be used to represent unusual end configurations. 
For example, springs that have a different end type at each end. 
To establish the value of Inactive\_Coils and/or Add_Coils@Solid directly, 
first select a value of End\_Type of User_Specified.  

Examples:   
To represent a spring with one end Closed 
and with the other end Closed&Ground:

    CHANGE  End_Type  User_Specified
    CHANGE  Inactive_Coils   2.0
    CHANGE  Add_Coils@Solid  0.5

To represent a spring with ten active coils, two dead coils and closed
ends:

    CHANGE  End_Type  User_Specified
    FIX Coils_T     14.0
    CHANGE  Inactive_Coils   4.0
    CHANGE  Add_Coils@Solid  1.0

&nbsp;
   
___

<a id="c_springBuckling"></a>  
___

**Buckling**   

A compression spring intended for operation without lateral support
should have a ratio of free length to coil diameter (Slenderness) less
than approximately 4 to avoid buckling. 
For designs with a greater Slenderness ratio, lateral support is usually
provided by operation in a sleeve or over a post.


                     free length          L_Free
    Slenderness = ----------------  =  -------------
                    coil diameter        Mean_Dia

The constraint Slenderness MAX can be used to restrict the search to
designs that will not tend to buckle.  Note that Slenderness is not
constrained in the default startup design.  Thus, unless this constraint is
established, a search may produce designs that are subject to buckling.

The Report tabs will provide an indication as to the possibility of
bucking for each specific design and loading condition.  Both the
fixed-free and fixed-fixed end conditions are covered.

More precise treatments of this subject are available in the sources listed
in the [Spring Design References](../SpringDesign/references.html) section 
of the documentation.

&nbsp;

[Design Types](./)   
[Spring Design Topics](../SpringDesign)   
[Help](../)   

