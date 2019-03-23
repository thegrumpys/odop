#### Extension Spring Design Type

The Extension Spring design type is a full-featured app enabling the engineering 
design of helical coil extension springs.

___

This section presents material unique to the Extension Spring design type.
In conjunction with reading the material below, please be sure to review the material 
available at [Spring Design Topics](../SpringDesign).   

&nbsp;
   
**Extension Spring Names**   

 The force-deflection points and associated names are:   

             length    force        outside  inside    stress    factor of
                                    diameter diameter            safety
             ______    ______       ________ ________  ______    ________
    
    free:    L_Free                 OD_Free  ID_Free
    
    point 1:    L_1    Force_1                        Stress_1
    
    point 2:    L_2    Force_2                        Stress_2    FS_2

    max safe:          

 point 1 = minimum operating load;     point 2 = maximum operating load

&nbsp;
   
 **Independent Variable names:**   

    Wire_Dia     -  wire diameter
    
    OD_Free      -  outside diameter in the free condition
    
    Coils_T      -  total number of coils, including inactive coils
    
    Initial_Tension  -  initial tension of extension spring (free condition)
    
    End_Extension    -  Length added to the spring by a straight wire
                        extension between the body of the spring and
                        the ends.  The value of End_Extension is the sum
                        for both ends of the spring.
    
    Force_1      -  load at point 1    (minimum operating load)
    
    Force_2      -  load at point 2    (maximum operating load)
   
**Calculation Input names:**

    Spring_Type      -  character string used only as label
    
    Material_Type    -  character string that is used to determine which
            entry in the material table is used to determine
            allowable stresses when Prop_Calc_Method is 1.
            Otherwise is ignored.
    
    ASTM/Fed-Spec    -  character string used only as a label to further
            identify the origin of material property data
    
    End_Type         -  character string that is used to determine
            calculations for Inactive_Coils, Hook_Deflect_All,
            and end dimensions.   
    
    Process      -  character string used to identify the
            manufacturing process.  It is normally controlled
            by the material selected from the material table.
            Values are usually Cold_Coiled or Hot_Wound.
            Refer to discussion under Hot_Factor_KH.
    
<!---     Catalog_Number -  character string that contains the catalog number of -->
<!---                       the most recent catalog selection.   -->
<!---                       Otherwise is ignored. -->
<!---     Material_File -  character string containing the material table name. -->
<!---                      It is normally established by the initialState.js file. -->
    
    Prop_Calc_Method -  This value controls how material properties and
            and allowable stresses are determined.
            1 indicates values come from materials table;
            allowable stresses will be calculated as a function
            of Wire_Dia.
            2 indicates tensile and allowable % are supplied
            by the user; allowable stresses are calculated.
            3 indicates allowable stresses are supplied directly
            by the user.
            Refer to documentation section on Materials.
    
    Life_Category    -  This value reflects the user's input about shot
            peening and required cycle life.  It is related
            to the calculation of FS_Cycle_Life.
            Refer to documentation section on Cycle_Life.


    Inactive_Coils   -  number of inactive coils (depends on end type)
    Density          -  wire density; weight per unit volume
    Torsion_Modulus  -  torsional modulus (G)
    Hot_Factor_KH    -  empirical correction factor for hot wound modulus
    Tensile          -  tensile strength in PSI
    %_Tensile_Endur  -  fraction of tensile strength for torsion endurance
    %_Tensile_Stat   -  fraction of tensile strength for torsion static load
    %_Tensile_Bend   -  fraction of tensile strength for bending in end
    Stress_Lim_Endur -  allowable stress limit; cyclic application (torsion)
    Stress_Lim_Stat  -  allowable stress limit; static application (torsion)
    Stress_Lim_Bend  -  allowable stress limit; static application (bending)
    SI_Lo_Factor     -  used in calculation of minimum initial stress
    SI_Hi_Factor     -  used in calculation of maximum initial stress
    End_Id           -  inside diameter of hook or loop
    Extended_End_Id  -  inside diameter of hook or loop at other end
    L_End            -  distance from body to inside of hook
    L_Extended_End   -  distance from body to inside of hook at other end
    Hook_Deflect_All -  number of coils allowed for hook deflection
   
**Dependent Variable names:**   

    Mean_Dia        -  mean diameter of spring coil in free condition
                        (OD_free + ID_Free)/2   
                        
    ID_Free         -  inside  diameter in free condition
    Coils_A         -  number of active coils (turns)
    Rate            -  spring constant - force per unit deflection
    Deflect_1       -  deflection at Force_1
    Deflect_2       -  deflection at Force_2
    L_Body       -  length of body in free condition (without ends)
    L_Free       -  length of the entire spring, in free condition
    L_1          -  spring length at minimum operating load  (Force_1)
    L_2          -  spring length at maximum operating load  (Force_2)
    L_Stroke     -  net deflection between point 1 and point 2
    Weight       -  weight of spring; wire density * wire volume
    Spring_Index    -  spring index;  the ratio COIL_DIA/Wire_Dia
    Stress_Initial  -  stress produced by initial tension
    Stress_1        -  torsional stress at point 1
    Stress_2        -  torsional stress at point 2
    Stress_Hook     -  bending stress in the hook at load point 2   
    
    FS_2         -  static factor of safety at point 2
            This is the ratio of allowable stress at point 2
            to the calculated stress induced by the load at
            point 2  (Stress_Lim_Stat/Stress_2).   
            
    FS_Cycle_Life   -  factor of safety based on the Soderberg endurance
            limit calculation.  This figure uses the allowable
            endurance stress (Stress_Lim_Endur) to include
            fatigue considerations.  Refer to additional
            discussion in the Cycle_Life section.   
            
    FS_Hook      -  factor of safety in hook based on Stress_Hook
            and Stress_Lim_Bend   
            
    Cycle_Life      -  expected cycle life based on a calculation
            using the "modified Goodman method".  This value is
            approximate.  Refer to additional discussion in the
            Cycle_Life section.   
    
    Stress_Init_Lo  -  lower limit of initial stress for proper
            manufacturability.   
            
    Stress_Init_Hi  -  upper limit of initial stress for proper
            manufacturability   
            
    FS_SI_Lo        -  factor of safety on lower limit of initial stress
    FS_SI_Hi        -  factor of safety on upper limit of initial stress
    F1_IT_Margin    -  amount by which Force_1 exceeds Initial_Tension
   
**Other values** are calculated and displayed by the REPORT menu items.  These
 include:   

    wire_length      -  total length of wire required to manufacture the
            spring, not including any waste.
    
    safe_load        -  load supported by the spring at a stress of
            Stress_Lim_Stat
    
    stress ratio     -  ratio of minimum stress to maximum stress
            (Stress_1/Stress_2)
    
    Kw1              -  stress correction factor due to curvature.
    
    torsion stress at end  - stress in hook or loop
    bending stress at end  - stress in hook or loop  (Stress_Hook)

&nbsp;


The following diagrams may be of some assistance in interpreting the various
dimensions of an extension spring.

   
              Extension Spring Names   
    
    
     |<-----------  L_Free  -------------->|   
    
          |<----  L_Body  ---->|   
    
                                                 |
        .  ____________________         .       _v_
      /   |                    |         `\
     |    |                    |          |    OD_Free
      \   |                    |          /
       `._|____________________|________.'      ___
                                                 ^
                                                 |
    
                          ---->|       |<---- End_Extension   
    ->|   |<--- L_End   
                                  ---->|   |<--- L_Extended_End   

&nbsp;
                     
    |<--------------------------------- L_Free ------------------------------>|
    |<-- L_End -->|<-- L_Body -->|<-- End_Extension -->|<-- L_Extended_End -->|                    
                     
&nbsp;
   
**FORCE-DEFLECTION DIAGRAM**   
                     
    
    
                        |             /
            Force_2 ----|------------/
                        |           /:         ODOP:Spring Names
      F                 |          / :
                        |         /  :            extension
      O                 |        /   :             spring
                        |       /    :
      R                 |      /     :
                        |     /      :
      C     Force_1 ----|----/       :
                        |   /:       :
      E                 |  / :<----->:------- L_Stroke
                        | /  :       :
            Initial_ _ _|/   :       :
            Tension     |    :       :
                        |____:_______:________
                   L_Free    :       :
                             L_1     L_2
                       Deflect_1     Deflect_2
    
                          D E F L E C T I O N

&nbsp;

**Constraints unique to extension springs:**

While most extension spring constraints have constant levels,
a few are of the "Functionally Determined Constraint Level" variety.
As described in the "Function Constraints" section of the On-line Help 
entry on "Terminology", rather than having constraint levels that are expressed 
as simple constants, these express a desired relationship between 
selected variables.   

In the default extension spring start point (startup), Force\_1 MIN is
a "function" of Initial\_Tension. 
The constraint relationship says that Force\_1, the force at the first
load point, should be greater than the value of Initial\_Tension.

&nbsp;

**Initial Tension Range**

Manufacturing considerations require that the initial tension of an
extension spring fall within an empirical minimum to maximum range.
The software calculates this range and using the constraint defaults established 
in the extension spring startup, the software will search for designs 
that fall within this range.

Specifically, the process starts by computing Stress\_Initial from Initial\_Tension.
The SI_Range selection in extension spring Calculation Inputs provides 
the terms "Readily Obtainable" and "Special Request" that
refer to the ranges achievable in standard practice. 
Both have the same minimum value, 
the "Special Request" range permits a higher maximum initial tension.
Once the SI\_Range selection gets empirical constants SI\_Lo\_Factor and SI\_Hi\_Factor
from the material table, Stress\_Init\_Lo and Stress\_Init\_Hi are computed. 
These values then become the MIN and MAX constraint levels for Stress\_Initial. 

In summary, extension springs have three "Functionally Determined Constraint Levels" 
configured in the default startup design.

**Constraint on: &nbsp; &nbsp; &nbsp;  Is current value of:**   
Force\_1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; MIN &nbsp; &nbsp; &nbsp; Initial\_Tension   
Stress\_Initial &nbsp; MIN &nbsp; &nbsp; &nbsp; Stress\_Init_Lo   
Stress\_Initial &nbsp; MAX &nbsp; &nbsp;&nbsp; Stress\_Init_Hi   

Additional "Functionally Determined Constraint Levels" available for configuration 
by the user include:   

**Constraint on: &nbsp; &nbsp; &nbsp;  Is current value of:**   
Stress\_Hook &nbsp; MAX &nbsp; &nbsp;&nbsp; Stress\_Lim_Bend   

&nbsp;

**Hook Stress**   

The software calculates the bending stress (Sa) and torsional stress (Sb)
in a conventional machine hook of an extension spring.  The bending stress,
a function of hook radius, reaches a maximum at a point (a) on the hook
that is 90 degrees prior to the contact point of an attachment pin or other
means of loading the spring.  The torsional stress, a function of the bend
radius where the spring body transitions into the hook, reaches a maximum
at a point (b).  The current version of of the software will base the torsional
stress calculation on a bend radius of twice the wire diameter.

These stresses are listed in the REPORT 2 tab.  A warning message
will be produced if either of the stresses is high enough to exceed the
corresponding allowable stress value.  Note that the limiting stress
component (bending stress at point (a) vs. torsional stress at point (b) )
is a function of spring index.

&nbsp;

**Cycle Life**   

Hook or loop ends on an extension spring are loaded in both bending and
torsion.  Depending on the radius of the bend that tilts the last coil
upward to form the hook or loop, either the bending or torsional stresses
may be the first to induce failure.  Note that fatigue failure in the end
of an extension spring may also be induced by stress concentration caused
by tooling marks.  Refer to the sources listed in the on-line Help
Spring Design References entry for additional details.

ODOP:Spring uses bending stresses in the calculation of FS\_Hook.   FS\_Hook is
not constrained in the default extension spring start point (startup).
In order to establish such a constraint, use the numeric entry fields.  For
example:

        CHANGE  FS_Hook  MIN  1.0
        CHANGE  Stress_Hook  MAX  Stress_Lim_Bend

Stress\_Lim\_Bend is based on %\_Tensile\_Bend, a percentage of the selected
material's tensile strength.  This percentage is determined based on the
desired cycle life conditions established by Life\_Category.

   
Torsional stresses in the end of an extension spring are calculated and
listed with the Report 2 tab.  The Report 2 tab will flag these
stresses if they exceed the value of Stress\_Lim\_Endur.  Note that the value
listed for Cycle\_Life is based on stresses in the body coils; it does not
apply to the hooks, loops or other forms of attachment.

&nbsp;

**End Types**   
The current version of the ODOP:Spring program implements five different end types for extension
springs.  In addition, the user can define specialized end conditions.
These end types are represented by the Calculation Input End\_Type which
has the following possible values:

          Extension
    
    1   Full_Loop
    2   75%_Loop
    3   Full_Hook
    4   75%_Hook
    5   Close_Wound_Coil
    6   User_Specified

For an extension spring, the end type directly impacts
calculation of Hook\_Deflect\_All, End\_ID, Extended\_End\_ID, L\_End and
L\_Extended\_End.  Other variables are impacted indirectly.
   
Full\_Loop implies a loop matching the diameter of the coil body.  The
distance from the last body coil to the inside of each hook (loop) is equal
to the inside diameter of the body.

75%\_Loop implies a shortened hook (loop) where the inside of the hook
(loop) falls 75% of an inside diameter from the end of the body.  Hook
stresses are calculated based on body diameter in the hook (loop).
   
When End\_Type is set to one of the standard (non User_Specified) selections, the quantities
described above as "directly impacted" will be set by the program from
values contained in internal tables.  If the user attempts to alter one of
the "directly impacted" values without first
changing the value of End\_Type to User_Specified, the attempt will be immediately
over-written with the value from the internal table.

When the value of End\_Type is
User\_Specified, the constants described above as "directly impacted"
may be set by the user with the numeric entry field.
   
More precise treatments of extension spring end types are available in the sources 
listed in the Spring Design References section of the documentation.

&nbsp;

[Design Types](./)   
[Help](../)   

<!---
While single line comments work as expected, a multi-line comment must be the last thing in the file.
Eclipse .md Preview suppresses display of everything after the comment header.

**Under Construction**   
This page is still a work in progress !   

-->

