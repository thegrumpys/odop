#### Compression Spring Design Type

The Compression Spring design type is a full-featured app enabling the engineering 
design of helical coil compression springs.

___

This section presents material unique to the Compression Spring design type.
In conjunction with reading the material below, please be sure to review the material 
available at [Spring Design Topics](../SpringDesign).   

**Compression Spring Names**   

 The force-deflection points and associated names are:

             length    force        outside  inside    stress        factor of
                                    diameter diameter                safety
             ______    ______       ________ ________  ______        ________
    
    free:    L_FREE                 OD_FREE  ID_FREE
    
    point 1: L_1      FORCE_1                       STRESS_1
    
    point 2: L_2      FORCE_2                       STRESS_2       FS_2
    
    solid:   L_SOLID  FORCE_SOLID                   STRESS_SOLID   FS_SOLID


 point 1 = minimum operating load &nbsp; point 2 = maximum operating load   

   
**Independent Variable names:**   

    WIRE_DIA     -  wire diameter
    
    OD_FREE      -  outside diameter in the free condition
    
    COILS_T      -  total number of coils, including inactive coils
    
    L_FREE       -  free length
    
    FORCE_1      -  load at point 1  (minimum operating load)
    
    FORCE_2      -  load at point 2  (maximum operating load)
   
   
**Calculation Input names**  (character strings):   

    SPRING_TYPE      -  character string used only as label
    
    MATERIAL_TYPE    -  character string that is used to determine which
            entry in the material table is used to determine
            allowable stresses when PROP_CALC_METHOD is 1.
            Otherwise is ignored.
    
    ASTM/FED-SPEC    -  character string used only as a label to further
            identify the origin of material property data
    
    END_TYPE         -  character string that is used to determine
            calculations for INACTIVE_COILS and L_SOLID & pitch.
    
    CATALOG_NUMBER   -  character string that contains the catalog number of
            the most recent catalog selection.  Otherwise is
            ignored.
    
    PROCESS      -  character string used to identify the
            manufacturing process.  It is normally controlled
            by the material selected from the material table.
            Values are usually COLD_COILED or HOT_WOUND.
            Refer to discussion under HOT_FACTOR_KH.
    
    MATERIAL_FILE    -  character string containing the material table name.
            It is normally established by the initialState.js file.

   
**Calculation Input names**  (integer constants):

    PROP_CALC_METHOD -  This value controls how material properties and
            and allowable stresses are determined.
            1 indicates values come from materials table;
            allowable stresses will be calculated as a function
            of WIRE_DIA.
            2 indicates tensile and allowable % are supplied
            by the user; allowable stresses are calculated.
            3 indicates allowable stresses are supplied directly
            by the user.
            Refer to documentation section on MATERIALS.
    
    LIFE_CATEGORY    -  This value reflects the user's input about shot
            peening and required cycle life.  It is related
            to the calculation of FS_CYCLE_LIFE.
            Refer to documentation section on CYCLE_LIFE.

   
**Calculation Input names**  (floating point constants):

    INACTIVE_COILS   -  number of inactive coils (depends on end type)
    ADD_COILS@SOLID  -  extra coils included in solid height calculation
            refer to END_TYPES for additional information
    DENSITY      -  wire density; weight per unit volume
    TORSION_MODULUS  -  torsional modulus (G)
    HOT_FACTOR_KH    -  empirical correction factor for hot wound modulus
    TENSILE      -  tensile strength in PSI
    %_TENSILE_ENDUR  -  fraction of tensile strength for torsion endurance
    %_TENSILE_STAT   -  fraction of tensile strength for torsion static load
    STRESS_LIM_ENDUR -  allowable stress limit; cyclic application (torsion)
    STRESS_LIM_STAT  -  allowable stress limit; static application (torsion)

   
**Dependent Variable names**:

    MEAN_DIA         -  mean diameter of spring coil in free condition
                       (OD_free + ID_FREE)/2
    COILS_A      -  number of active coils (turns)
    RATE         -  spring constant - force per unit deflection
    DEFLECT_1        -  deflection at FORCE_1
    DEFLECT_2        -  deflection at FORCE_2
    L_1          -  spring length at minimum operating load  (FORCE_1)
    L_2          -  spring length at maximum operating load  (FORCE_2)
    L_STROKE         -  net deflection between point 1 and point 2
    L_SOLID      -  solid height
    SLENDERNESS      -  ratio of L_FREE to COIL_DIA.  The "form factor"
            that governs a spring's tendency to buckle
    ID_FREE      -  inside  diameter in free condition
    WEIGHT       -  weight of spring; wire density * wire volume
    SPRING_INDEX     -  spring index;  the ratio COIL_DIA/WIRE_DIA
    FORCE_SOLID      -  force produced in solid condition
    STRESS_1         -  torsional stress at point 1
    STRESS_2         -  torsional stress at point 2
    STRESS_SOLID     -  torsional stress in the solid condition
    FS_2         -  static factor of safety at point 2
            This is the ratio of allowable stress at point 2
            to the calculated stress induced by the load at
            point 2  (STRESS_LIM_STAT/STRESS_2).
    FS_SOLID         -  static factor of safety at solid condition
            (STRESS_LIM_STAT/STRESS_SOLID)
    FS_CYCLE_LIFE    -  factor of safety based on the Soderberg endurance
            limit calculation.  This figure uses the allowable
            endurance stress (STRESS_LIM_ENDUR) to include
            fatigue considerations.  Refer to additional
            discussion in the CYCLE_LIFE section.
    CYCLE_LIFE       -  expected cycle life based on a calculation
            using the "modified Goodman method".  This value is
            approximate.  Refer to additional discussion in the
            CYCLE_LIFE section.
    %_AVAIL_DEFLECT  -  the percentage of available deflection consumed at
            load point 2.

**Other Values**   

Other values are calculated and displayed by the REPORT tabs. 
These include:

    wire length      -  total length of wire required to manufacture the
            spring, not including any waste.
    
    safe load        -  The load supported by the spring in the solid
            condition or at a stress equal to the
            STRESS_LIM_STAT value, whichever is lower.
    
    pitch        -  coil to coil spacing in the free state
    
    weight       -  weight of spring including a term due to
            free length
    
    buckling         -  indication of tendency to buckle given the current
            design and loading conditions.
    
    stress ratio     -  ratio of minimum stress to maximum stress
            (STRESS_1/STRESS_2)
    
    Kw1, Kw2         -  stress correction factors due to curvature.
    
    helix angle      -  angle, in degrees, of the spring helix relative
            to a perpendicular to the spring axis


**COMPRESSION SPRING FORCE-DEFLECTION DIAGRAM**   

    FORCE_SOLID -|---------------/.
                 |              / .
     FORCE_2 ----|-------------/  .
                 |            /:  .      ODOP:Spring
           F     |           / :  .        Names
                 |          /  :  .
           O     |         /   :  .       compression
                 |        /    :  .         spring
           R     |       /     :  .
                 |      /      :  .
    FORCE_1 -----|-----/       :  .
                 |    /:       :  .
           C     |   / :<----->:------- L_STROKE
                 |  /  :       :  .
           E     | /   :       :  .
                 |/____:_______:__._______
            L_FREE     :       :  L_SOLID
                      L_1     L_2
                 DEFLECT_1    DEFLECT_2
     
                 D E F L E C T I O N

&nbsp;

**Constraints unique to compression springs:**   

SLENDERNESS is a compression spring's ratio of free length (L\_FREE) to
mean coil diameter (COIL\_DIA).  If this ratio exceeds 4 for a
compression spring, that spring will have a tendency to buckle under
load.  In that case, the spring will usually need support in the form of
a sleeve or post.  In order to restrain the search to select designs
that do not have a tendency to buckle, set the value of SLENDERNESS MAX
to a value of 4.0 or less.

   
If a compression spring is intended for operation without lateral
support it should have a ratio of free length to coil diameter
(SLENDERNESS) below approximately 4 to avoid buckling.  Lateral support
is usually provided by operation in a sleeve or over a post.  The
constraint SLENDERNESS MAX can be used to restrict the search to designs
that will not tend to buckle.  Note that the value of SLENDERNESS is not
constrained in the default start point (startup) and thus the search may produce
designs that are prone to buckling. 
The compression spring REPORT 1 tab will provide an
indication as to the possibility of bucking for your specific design and
loading condition.


%\_AVAIL\_DEFLECT is the percentage of available deflection consumed at
load point 2.  %\_AVAIL\_DEFLECT is usually constrained to be less than 85
to 98 percent.  Thus it requires the search to select designs that
provide a small margin between load point 2 and the solid condition.


**END TYPES**   
The current version of the ODOP:Spring program implements six spring end
types for compression springs. 
In addition, the user can define specialized end conditions.
These end types are represented by the Calculation Input END\_TYPE which
for compression springs has the following possible values:

          Compression 
    
    1     OPEN    
    2     OPEN&GROUND   
    3     CLOSED   
    4     CLOSED&GROUND  
    5     TAPERED_C&G  
    6     PIG-TAIL
    7     USER_SPECIFIED  

For a compression spring, the end type directly impacts calculation of
INACTIVE\_COILS.  L\_SOLID, pitch and other variables are affected
indirectly.  Other variables are impacted indirectly.

Additional information may be found in the documentation sections for
EQNSET. 
   
When END\_TYPE is set to one of the standard (non USER_SPECIFIED) selections, the quantities
described above as "directly impacted" will be set by the program from
values contained in internal tables.  If the user attempts to alter one of
the "directly impacted" values without first
changing the value of END\_TYPE to USER_SPECIFIED, the attempt will be immediately
over-written with the value from the internal table.

When the value of END\_TYPE is
USER\_SPECIFIED, the constants described above as "directly impacted"
may be set by the user with the numeric entry field.
   
In order to facilitate the treatment of unusual compression spring end
types such as the "tapered, closed and ground" configuration common to hot
wound springs, ODOP:Spring has added an extra term into the solid height
calculation.  ADD\_COILS@SOLID is a constant that is normally determined by
the value of the character string END\_TYPE.  It is used to separate the
solid height calculation from the rate equation which is dependent on the
value of INACTIVE\_COILS.  ADD\_COILS@SOLID represents the number of wire
diameters added into the solid height beyond COILS\_T.  For OPEN and CLOSED
end types, it has a value of +1.0.  For OPEN&GROUND and CLOSED&GROUND end
types, it has a value of 0.0.  For the TAPERED\_C&G end type,
ADD\_COILS@SOLID has a value of -0.5.

Note that the ADD\_COILS@SOLID term is not included in COILS\_T or the wire
length and weight calculations.  It is only an adjustment for the solid
height calculation and not the correct way to represent dead coils.
   
Users that understand the impact of the ADD\_COILS@SOLID term may control it
directly to represent unusual end configurations; for example, springs that
have a different end type at each end.  To establish the value of
INACTIVE\_COILS and/or ADD\_COILS@SOLID directly, first select a value of
END\_TYPE of USER_SPECIFIED.  For example to represent a
spring with one end CLOSED with the other end CLOSED&GROUND:

    CHANGE  END_TYPE  USER_SPECIFIED
    CHANGE  INACTIVE_COILS   2.0
    CHANGE  ADD_COILS@SOLID  0.5

To represent a spring with ten active coils, two dead coils and closed
ends:

    CHANGE  END_TYPE  USER_SPECIFIED
    FIX COILS_T     14.0
    CHANGE  INACTIVE COILS   4.0
    CHANGE  ADD_COILS@SOLID  1.0

   
**BUCKLING**   

                     free length          L_FREE
    SLENDERNESS = ----------------  =  -------------
                    coil diameter        MEAN_DIA

If a compression spring is intended for operation without lateral support
it should have a ratio of free length to coil diameter (SLENDERNESS) less
than approximately 4 to avoid buckling.  Lateral support is usually
provided by operation in a sleeve or over a post.

The constraint SLENDERNESS MAX can be used to restrict the search to
designs that will not tend to buckle.  Note that SLENDERNESS is not
constrained in the default startup.  Thus, unless this constraint is
established, a search may produce designs that are subject to buckling.

The REPORT tabs will provide an indication as to the possibility of
bucking for each specific design and loading condition.  Both the
fixed-free and fixed-fixed end conditions are covered.

More precise treatments of this subject are available in the sources listed
in the REFERENCES section of the documentation.


[Design Types](./)   
[Help](../)   

