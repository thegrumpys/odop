# Compression Spring Design Type
![Compression spring image](/docs/Help/DesignTypes/Spring/img/SpringCompression_.png "Compression spring image")  

The Compression Spring design type is a full-featured mathematical model for engineering round-wire 
helical coil compression springs.  

This section presents material unique to the Compression Spring design type. 
The more general material available at [Spring Design Topics](/docs/Help/SpringDesign/index.html) 
provides important supplemental information.  

___

### On This Page:   
 - [Compression spring variable names on Force-Deflection diagram](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springFD_Diag)  
 - [Compression Spring Variable Names on image of physical spring](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springImage)  
 - [Compression spring Force-Deflection point names](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springFD_Names)  
 - [Independent Variable names](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springIV_Names)  
 - [Dependent Variable names](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springDV_Names)  
 - [Calculation Input names](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springCalcInputNames)  
 - [Values in reports](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springOtherValues)  
 - [Constraints unique to compression springs](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)  
 - [Compression spring end types](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springEndTypes)  
 - [Dead Coils](/docs/Help/DesignTypes/Spring/Compression/description.html#deadCoils)  
 - [User specified end type examples](/docs/Help/DesignTypes/Spring/Compression/description.html#userEndTypes)  
 - [Buckling](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springBuckling)  
 - [Shot Peen](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springShotPeen)  
 - [Related topics](/docs/Help/DesignTypes/Spring/Compression/description.html#relatedTopics)  

&nbsp;
___

<a id="c_springFD_Diag"></a>  
___

## Compression Spring Variable Names on Force-Deflection Diagram  

[<img src="/docs/Help/DesignTypes/Spring/img/ForceVsDeflection.png" alt="Compression Spring Variable Names on Force - Deflection Diagram">](/docs/Help/DesignTypes/Spring/img/ForceVsDeflection.png "Compression Spring Variable Names on Force - Deflection Diagram")  

___

<a id="c_springImage"></a>  
___

## Compression Spring Variable Names on Image of Physical Spring

![Compression Spring Variable Names on on image of physical spring](/docs/Help/DesignTypes/Spring/img/AnnotatedCSpring.png "Compression Spring Variable Names on on image of physical spring")  

___

<a id="c_springFD_Names"></a>  
___

## Compression Spring Variable Names for Force-Deflection Points  

 The compression spring force-deflection points and their associated names are: 
 &nbsp;           | length  | force       | outside diameter | inside diameter | stress       | factor of safety 
 ---              | ---     | ---         | ---              |  ---            | ---          |  ---             
**free:**         | L_Free  |             | OD_Free          | ID_Free         |              |                  
**point&nbsp;1:** | L_1     | Force_1     |                  |                 | Stress_1     |                  
**point&nbsp;2:** | L_2     | Force_2     |                  |                 | Stress_2     | FS_2             
**solid:**        | L_Solid | Force_Solid |                  |                 | Stress_Solid | FS_Solid         

**point 1** – minimum operating load &nbsp; &nbsp; **point 2** – maximum operating load 

&nbsp;
   
___

<a id="c_springIV_Names"></a>  
___

## Independent Variable Names: 

Name     | <span style="font-weight: normal; font-size: 0.85em;">Thumbnail <br/> Image</span> | Description  
 ---     | :---:  | ---         
Wire_Dia | [<img src="/designtypes/Spring/Compression/tooltips/Wire_Dia.png" alt="Wire_Dia" title="Wire_Dia" width="33%">](/designtypes/Spring/Compression/tooltips/Wire_Dia_lg.png "Wire_Dia") | wire diameter 
OD_Free  | [<img src="/designtypes/Spring/Compression/tooltips/OD_Free.png"  alt="OD_Free"  title="OD_Free"  width="33%">](/designtypes/Spring/Compression/tooltips/OD_Free_lg.png  "OD_Free")  | outside diameter in the free condition 
Coils_T  | [<img src="/designtypes/Spring/Compression/tooltips/Coils_T.png"  alt="Coils_T"  title="Coils_T"  width="33%">](/designtypes/Spring/Compression/tooltips/Coils_T_lg.png  "Coils_T")  | total number of coils, <br/> including inactive coils 
L_Free   | [<img src="/designtypes/Spring/Compression/tooltips/L_Free.png"   alt="L_Free"   title="L_Free"   width="33%">](/designtypes/Spring/Compression/tooltips/L_Free_lg.png   "L_Free")   | length in the free condition <br/> (free length) 
Force_1  | [<img src="/designtypes/Spring/Compression/tooltips/Force_1.png"  alt="Force_1"  title="Force_1"  width="33%">](/designtypes/Spring/Compression/tooltips/Force_1_lg.png  "Force_1")  | load at point 1 <br/> (minimum operating load) 
Force_2  | [<img src="/designtypes/Spring/Compression/tooltips/Force_1.png"  alt="Force_2"  title="Force_2"  width="33%">](/designtypes/Spring/Compression/tooltips/Force_2_lg.png  "Force_2")  | load at point 2 <br/> (maximum operating load) 

&nbsp;

___

<a id="c_springDV_Names"></a>  
___

## Dependent Variable Names:   

Name         | <span style="font-weight: normal; font-size: 0.85em;">Thumbnail <br/> Image</span> | Description  
 ---         | ---    | ---         
Mean_Dia     | [<img src="/designtypes/Spring/Compression/tooltips/Mean_Dia.png"  alt="Mean_Dia"  title="Mean_Dia"  width="85%">](/designtypes/Spring/Compression/tooltips/Mean_Dia_lg.png  "Mean_Dia")  | mean diameter of spring coil in free condition <br/>`(OD_Free + ID_Free)/2` 
Coils_A      |        | number of active coils (turns) 
Rate         | [<img src="/designtypes/Spring/Compression/tooltips/Rate.png"      alt="Rate"      title="Rate"     >](/designtypes/Spring/Compression/tooltips/Rate_lg.png      "Rate")      | spring constant - force per unit deflection 
Deflect_1    | [<img src="/designtypes/Spring/Compression/tooltips/Deflect_1.png" alt="Deflect_1" title="Deflect_1">](/designtypes/Spring/Compression/tooltips/Deflect_1_lg.png "Deflect_1") | deflection at `Force_1` 
Deflect_2    | [<img src="/designtypes/Spring/Compression/tooltips/Deflect_2.png" alt="Deflect_2" title="Deflect_2">](/designtypes/Spring/Compression/tooltips/Deflect_2_lg.png "Deflect_2") | deflection at `Force_2` 
L_1          | [<img src="/designtypes/Spring/Compression/tooltips/L_1.png"       alt="L_1"       title="L_1"      >](/designtypes/Spring/Compression/tooltips/L_1_lg.png       "L_1")       | spring length at minimum operating load  (`Force_1`) 
L_2          | [<img src="/designtypes/Spring/Compression/tooltips/L_2.png"       alt="L_2"       title="L_2">](/designtypes/Spring/Compression/tooltips/L_2_lg.png       "L_2")       | spring length at maximum operating load  (`Force_2`) 
L_Stroke     | [<img src="/designtypes/Spring/Compression/tooltips/L_Stroke.png"  alt="L_Stroke"  title="L_Stroke" >](/designtypes/Spring/Compression/tooltips/L_Stroke_lg.png  "L_Stroke")  | net deflection between point 1 and point 2 
L_Solid      | [<img src="/designtypes/Spring/Compression/tooltips/L_Solid.png"   alt="L_Solid"   title="L_Solid"  >](/designtypes/Spring/Compression/tooltips/L_Solid_lg.png "L_Solid")     | solid height 
Slenderness  |        | ratio of `L_Free` to `Mean_Dia`.  This "form factor" governs a spring's tendency to buckle 
ID_Free      | [<img src="/designtypes/Spring/Compression/tooltips/ID_Free.png"   alt="ID_Free"   title="ID_Free"  >](/designtypes/Spring/Compression/tooltips/ID_Free_lg.png "ID_Free")     | inside diameter in free condition 
Weight       | [<img src="/designtypes/Spring/Compression/tooltips/Weight.png" alt="Weight" title="Weight">](/designtypes/Spring/Compression/tooltips/Weight_lg.png "Weight") | weight of spring; wire density * wire volume 
Spring_Index |        | spring index;  the ratio `Mean_Dia/Wire_Dia` 
Force_Solid  | [<img src="/designtypes/Spring/Compression/tooltips/Force_Solid.png" alt="Force_Solid" title="Force_Solid">](/designtypes/Spring/Compression/tooltips/Force_Solid_lg.png "Force_Solid") | force produced in solid condition 
Stress_1     |        | torsional stress at point 1 
Stress_2     |        | torsional stress at point 2 
Stress_Solid |        | torsional stress in the solid condition 
FS_2         |        | static factor of safety at point 2.  This is the ratio of allowable stress to the calculated stress induced by the load at point 2  `(Stress_Lim_Stat/Stress_2)`. 
FS_Solid     |        | static factor of safety at solid condition  `(Stress_Lim_Stat/Stress_Solid)` 
FS_CycleLife |        | factor of safety based on the Soderberg endurance limit calculation.  It uses the allowable endurance stress (Stress_Lim_Endur) to account for fatigue effects. Refer to additional discussion in the [Cycle_Life](/docs/Help/SpringDesign/spring_oview.html#cycleLife) topic. 
Cycle_Life   |        | expected cycle life based on a calculation using the "modified Goodman method".  This value is approximate.  Refer to additional discussion in the  [Cycle_Life](/docs/Help/SpringDesign/spring_oview.html#cycleLife) topic. 
%_Avail_Deflect |     | the percentage of available deflection consumed at load point 2. 
Energy       |        | change in elastic potential energy between point 1 and point 2.  

&nbsp; 

___

<a id="c_springCalcInputNames"></a>  
___

## Calculation Input Names 

Name           | &nbsp; | Description  
 ---           | ---    | ---         
Spring_Type    |        | character string used only as a label 
Prop_Calc_Method |      | Property Calculation Method controls how material properties and allowable stresses are determined. See also: [Materials](/docs/Help/SpringDesign/materials.html). 
&nbsp;           |      | **1** - indicates values come from materials table; allowable stresses will be calculated as a function of `Wire_Dia`. 
&nbsp;           |      | **2** - indicates tensile and allowable % are supplied by the user; allowable stresses are calculated. 
&nbsp;           |      | **3** - indicates allowable stresses are supplied directly by the user. 
Material_Type  |        | selects an entry in the material table. Is used to determine allowable stresses when `Prop_Calc_Method` is 1. Otherwise is ignored. 
ASTM/Fed-Spec  |        | character string used only as a label to further identify the origin of material property data 
Process        |        | character string used to identify the manufacturing process.  It is normally controlled by the material selected from the material table. Values are usually `Cold_Coiled` or `Hot_Wound`. See also: `Hot_Factor_Kh` (below). 
Life_Category  |        | This value reflects the user's input about shot peening and required cycle life. It is input to the calculation of `FS_CycleLife`. See also: [Cycle_Life](/docs/Help/SpringDesign/spring_oview.html#cycleLife) 
Density        |        | wire density; weight per unit volume 
Torsion_Modulus|        | torsional modulus (G); a.k.a. shear modulus or modulus of rigidity 
Hot_Factor_Kh  |        | empirical correction factor applied to hot wound modulus 
Tensile        |        | tensile strength 
%_Tensile_Endur|        | allowable fraction of tensile strength for torsion endurance (cyclic load)  See also: [Cycle_Life](/docs/Help/SpringDesign/spring_oview.html#cycleLife) 
%_Tensile_Stat |        | allowable fraction of tensile strength for torsion static load 
Stress_Lim_Endur |      | allowable stress limit; cyclic application (torsion) 
Stress_Lim_Stat  |      | allowable stress limit; static application (torsion) 
End_Type       |        | character string that is used to determine values for `Inactive_Coils`, `L_Solid` and `Pitch`;  See also: [Compression spring end types](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springEndTypes)
Inactive_Coils |        | number of inactive coils <br/> (depends on `End_Type`) 
Grind_Amount   |        | number of wire diameters removed by a grinding operation; <br/> See also: [Compression spring end types](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springEndTypes) 
Taper_Amount   |        | the solid height reduction, measured in wire diameters, created by a tapering operation on the wire diameter of the first and last coil(s) of a hot-wound compression spring.
Catalog_Name   |        | name of the catalog containing the most recently selected catalog entry 
Catalog_Number |        | catalog number of the most recent catalog entry 

<!---     Material_File -  character string containing the material table name. -->
<!---                      It is normally established by the initialState.js file. -->

&nbsp; 

___

<a id="c_springOtherValues"></a>  
___

## Values in Reports    

Other values calculated and displayed in the Reports include:

Name           | &nbsp; | Description  
 ---           | ---    | ---         
Wire&nbsp;Length |      | total length of wire required to manufacture the spring, not including any waste 
Safe Load      |        | The load supported by the spring in the solid condition or at a stress equal to the `Stress_Lim_Stat` value, whichever is lower. 
Pitch          |        | distance between the wire centers of adjacent coils, measured in the free state 
Weight         |        | weight of 1,000 springs 
Buckling       |        | indication of tendency to buckle given the current design and loading conditions 
Stress Ratio   |        | ratio of minimum stress to maximum stress `(Stress_1/Stress_2)` 
Kw1, Kw2       |        | stress correction factors due to curvature 
Helix Angle    |        | angle, in degrees, of the spring helix relative to a perpendicular to the spring axis  

&nbsp;

___

<a id="c_springConstraints"></a>  
___

## Constraints Unique to Compression Springs:    

#### Slenderness 
Slenderness is the ratio of free length (`L_Free`) to mean coil diameter (`Mean_Dia`). 
When this ratio exceeds about 4 for a compression spring, that spring will have a 
tendency to buckle under load. 
In that case, the spring will usually need support in the form of a sleeve or post. 
To restrict the search to designs that are unlikely to buckle, 
set the `Slenderness` MAX constraint to a value of 4.0 or less. 

For additional information, see: [Buckling](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springBuckling) 

#### %_Avail_Deflect 
`%_Avail_Deflect` is the percentage of available deflection consumed at load point 2. 
`%_Avail_Deflect` is usually constrained to be less than 85 to 98 percent. 
Setting `%_Avail_Deflect` MAX in this way influences the search to select designs that provide a small margin 
between load point 2 and the solid condition. 

&nbsp; 

___

<a id="c_springEndTypes"></a>  
___

## Compression Spring End Types 

The current version of ODOP:Spring implements twelve compression spring end types 
(two of those are user customizable alternatives). 
For compression springs, the Calculation Input `End_Type` has the following possible values: 

&nbsp;| &nbsp; |Compression spring end types 
 ---  | ---    | ---         
1     | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringOpenEnd.png" alt="C_SpringOpenEnd" title="C_SpringOpenEnd" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringOpenEnd_lg.png "C_SpringOpenEnd") | Open      
2     | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringOpenGndEnd.png" alt="C_SpringOpenGndEnd" title="C_SpringOpenGndEnd" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringOpenGndEnd_lg.png "C_SpringOpenGndEnd") | Open&Ground    
3     | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringClosedEnd.png" alt="C_SpringClosedEnd" title="C_SpringClosedEnd" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringClosedEnd_lg.png "C_SpringClosedEnd") | Closed  
4     | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringClosedGndEnd.png" alt="C_SpringClosedGndEnd" title="C_SpringClosedGndEnd" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringClosedGndEnd_lg.png "C_SpringClosedGndEnd") | Closed&Ground   
5     | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder.png" alt="C_SpringPlaceholder" title="C_SpringPlaceholder" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder_lg.png "C_SpringPlaceholder") | DoubleClosed  
6     | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder.png" alt="C_SpringPlaceholder" title="C_SpringPlaceholder" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder_lg.png "C_SpringPlaceholder") | DoubleClosed&Ground  
7     | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder.png" alt="C_SpringPlaceholder" title="C_SpringPlaceholder" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder_lg.png "C_SpringPlaceholder") | TaperedClosed  
8     | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder.png" alt="C_SpringPlaceholder" title="C_SpringPlaceholder" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder_lg.png "C_SpringPlaceholder") | TaperedClosed&Ground  
9     | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder.png" alt="C_SpringPlaceholder" title="C_SpringPlaceholder" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder_lg.png "C_SpringPlaceholder") | PigtailClosed  
10    | [<img src="/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder.png" alt="C_SpringPlaceholder" title="C_SpringPlaceholder" width="25%">](/designtypes/Spring/Compression/tooltips/C_SpringPlaceholder_lg.png "C_SpringPlaceholder") | PigtailClosed&Ground 
&nbsp;|        | 
11    |        | UserSpecified  
12    |        | UserSpecified&Ground 

For a compression spring, the end type selection directly determines the value of
`Inactive_Coils` and, when applicable, `Grind_Amount` and/or `Taper_Amount`. 
`L_Solid`, `Pitch` and other variables are then affected indirectly.  

<!--- Additional information may be found in the documentation sections for EQNSET.  -->

When `End_Type` is set to one of the standard (non UserSpecified) selections, 
`Inactive_Coils`, `Grind_Amount` and `Taper_Amount` will be set by ODOP:Spring 
from values contained in an internal table. 
When the value of `End_Type` is UserSpecified (UserSpecified&Ground), 
the user may set these values by making an entry in the corresponding numeric entry field.  
#### Grind_Amount, Taper_Amount 
In order to facilitate the treatment of less common compression spring end types such as 
the "Tapered, Closed and Ground" configuration associated with hot-wound springs, 
ODOP:Spring has added the extra (Calculation Input) terms `Grind_Amount` and `Taper_Amount` 
into the solid height calculation. 
This is done to separate the solid height calculation from the rate equation.  

The `End_Type` drop-down selection list sets the values of `Inactive_Coils`,
`Grind_Amount` and `Taper_Amount` from an internal table. 
`Grind_Amount` is the number of wire diameters removed by a grinding operation. 
`Taper_Amount` is the solid height reduction, measured in wire diameters,
created by a tapering operation on the wire diameter of the first and last coils of a 
hot-wound compression spring. 

The terminology here can be misinterpreted. 
The “tapered” end type does not refer to a conical (non-cylindrical) spring; 
it refers only to local tapering of the end coil's `Wire_Dia` to reduce solid height.

<!--- Introduce Closed&Ground here.  -->

For the TaperedClosed&Ground end type, `Grind_Amount` and `Taper_Amount` each 
have a value of 0.5. 
The tapering operation reduces the solid height by 25% of a wire diameter at each end. 
The grinding operation removes 25% of a nominal wire diameter (50% of the tapered dimension) 
from each end of the spring.  

Note that the `Grind_Amount` and `Taper_Amount` terms are not included in the wire length 
and weight calculations. 
These values are only an adjustment for the solid height calculation.  

The `Grind_Amount` and `Taper_Amount` terms may be used with `Inactive_Coils` to represent 
unusual end configurations. 
For example, springs that have a different end type at each end. 
To establish the value of `Inactive_Coils` or `Grind_Amount` or `Taper_Amount` directly, 
first select a value of `UserSpecified` (`UserSpecified&Ground)` for `End_Type`.  

&nbsp; 

___

<a id="deadCoils"></a>  
___

## Dead Coils 

In a compression spring, "dead coils" are additional close wound coils, 
typically placed at each end. 
Dead coils can be effective in preventing individual springs from tangling after coiling.  

The appropriate way to handle dead coils is to select the "UserSpecified" end type 
and increase the value of `Inactive_Coils` by the desired number of dead coils.

&nbsp; 

___

<a id="userEndTypes"></a>  
___

## User Specified End Type Examples 

To represent a spring with one end Closed 
and with the other end Closed&Ground: 

    CHANGE  End_Type  UserSpecified
    CHANGE  Inactive_Coils   2.0
    CHANGE  Grind_Amount  0.5

To represent a spring with ten active coils, two dead coils and closed ends: 

    FIX Coils_T     14.0
    CHANGE  End_Type  DoubleClosed

To represent a spring with ten active coils, four dead coils and closed & ground ends: 

    FIX Coils_T     16.0
    CHANGE  End_Type  UserSpecified&Ground
    CHANGE  Inactive_Coils   6.0
    CHANGE  Grind_Amount  1.0

&nbsp;  

___

<a id="c_springBuckling"></a>  
___

## Buckling 

A compression spring intended for operation without lateral support 
should have a ratio of free length to coil diameter (`Slenderness`) less 
than approximately 4 to avoid buckling. 
For designs with a greater `Slenderness` ratio, lateral support is usually 
provided by operation in a sleeve or over a post. 


                     free length  
    Slenderness = ----------------  =  L_Free / Mean_Dia 
                    coil diameter  

The constraint `Slenderness` MAX can be used to restrict the search to 
designs that will not tend to buckle. 
Note that `Slenderness` is not constrained in the default startup design. 
Thus, unless this constraint is established, 
a search may produce designs that are subject to buckling. 

The Report tabs indicate the likelihood of bucking for each specific design and loading condition. 
Both the fixed-free and fixed-fixed end conditions are covered.

More precise treatments of this subject are available in the resources listed in the 
[Spring Design References](/docs/Help/SpringDesign/references.html) 
section of the documentation.  

___

<a id="c_springShotPeen"></a>  
___

## Shot Peen 

Coil springs may be shot peened in order to introduce favorable (compressive)
stress at the surface. 
This improves cycle life at the cost of a secondary operation during manufacturing.  

The Calculation Input `Life_Category` allows the user to specify that the 
spring will be shot peened.  

Selecting a non-default `Life_Category` that describes a shot peened spring in 
cyclic service works with the built-in materials table to choose a value for `Stress_Lim_Endur`. 
As described in 
[Cycle Life](/docs/Help/SpringDesign/spring_oview.html#cycleLife), 
to realize the desired impact of shot peening on the final spring design, 
you should also enable the MIN constraint on `FS_CycleLife`.

See also: 
 - [Cycle Life](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  
 - [Wikipedia on shot peening](https://en.wikipedia.org/wiki/Shot_peening)  

___

<a id="relatedTopics"></a>  
___

## Related topics 

 - [Design Types](/docs/Help/DesignTypes/index.html)   
 - [Spring Design Topics](/docs/Help/SpringDesign/index.html)   
 - [Restrictions](/docs/About/Legal/Restrictions.html)   
 - [Help](/docs/Help/index.html)   

&nbsp;  
  
&nbsp;  

<!---
Commented out ... transferred from early in this file ... Preserving for possible future use.

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
           C     |   / :<----- >:------- L_Stroke
                 |  /  :       :  .
           E     | /   :       :  .
                 |/____:_______:__._______
            L_Free     :       :  L_Solid
                      L_1     L_2
                 Deflect_1    Deflect_2
     
                 D E F L E C T I O N
&nbsp;   
 -->

