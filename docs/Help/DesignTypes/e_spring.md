#### Extension Spring Design Type

This section presents material unique to the Extension Spring design type.

   
EXTENSION SPRING NAMES   

 The force deflection points and associated names are:   

             length    force        outside  inside    stress    factor of
                                    diameter diameter            safety
             ______    ______       ________ ________  ______    ________

    free:    L_FREE_(W/ENDS)        OD_FREE  ID_FREE

    point 1:    L_1    FORCE_1                        STRESS_1

    point 2:    L_2    FORCE_2                        STRESS_2    FS_2


 point 1 = minimum operating load;     point 2 = maximum operating load

   
 Independent Variable names:

    WIRE_DIA         -  wire diameter

    OD_FREE      -  outside diameter in the free condition

    COILS_T      -  total number of coils, including inactive coils

    INITIAL_TENSION  -  initial tension of extension spring (free condition)

    END_EXTENSION    -  Length added to the spring by a straight wire
            extension between the body of the spring and
            the ends.  The value of END_EXTENSION is the sum
            for both ends of the spring.

    FORCE_1      -  load at point 1    (minimum operating load)

    FORCE_2      -  load at point 2    (maximum operating load)
   
 Calculation Input names  (character strings):

    SPRING_TYPE      -  character string used only as label

    MATERIAL_TYPE    -  character string that is used to determine which
            entry in the material table is used to determine
            allowable stresses when PROP_CALC_METHOD is 1.
            Otherwise is ignored.

    ASTM/FED-SPEC    -  character string used only as a label to further
            identify the origin of material property data

    END_TYPE         -  character string that is used to determine
            calculations for INACTIVE_COILS, HOOK_DEFLECT_ALL,
            and end dimensions.  Refer to END_CALC_METHOD.

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

   
 Calculation Input names  (integer constants):

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

   
 Calculation Input names  (floating point constants):

    INACTIVE_COILS   -  number of inactive coils (depends on end type)
    DENSITY      -  wire density; weight per unit volume
    TORSION_MODULUS  -  torsional modulus (G)
    HOT_FACTOR_KH    -  empirical correction factor for hot wound modulus
    TENSILE      -  tensile strength in PSI
    %_TENSILE_ENDUR  -  fraction of tensile strength for torsion endurance
    %_TENSILE_STAT   -  fraction of tensile strength for torsion static load
    %_TENSILE_BEND   -  fraction of tensile strength for bending in end
    STRESS_LIM_ENDUR -  allowable stress limit; cyclic application (torsion)
    STRESS_LIM_STAT  -  allowable stress limit; static application (torsion)
    STRESS_LIM_BEND  -  allowable stress limit; static application (bending)
    SI_LO_FACTOR     -  used in calculation of minimum initial stress
    SI_HI_FACTOR     -  used in calculation of maximum initial stress
    END_ID       -  inside diameter of hook or loop
    EXTENDED_END_ID  -  inside diameter of hook or loop at other end
    L_END        -  distance from body to inside of hook
    L_EXTENDED_END   -  distance from body to inside of hook at other end
    HOOK_DEFLECT_ALL -  number of coils allowed for hook deflection
   
 Dependent Variable names:

    MEAN_DIA         -  mean diameter of spring coil in free condition
            (OD_free + ID_FREE)/2
    ID_FREE      -  inside  diameter in free condition
    COILS_A      -  number of active coils (turns)
    RATE         -  spring constant - force per unit deflection
    DEFLECT_1        -  deflection at FORCE_1
    DEFLECT_2        -  deflection at FORCE_2
    L_BODY_(FREE)    -  length of body in free condition (without ends)
    L_FREE_(W/ENDS)  -  length of the entire spring, in free condition
    L_1          -  spring length at minimum operating load  (FORCE_1)
    L_2          -  spring length at maximum operating load  (FORCE_2)
    L_STROKE         -  net deflection between point 1 and point 2
    WEIGHT       -  weight of spring; wire density * wire volume
    SPRING_INDEX     -  spring index;  the ratio COIL_DIA/WIRE_DIA
   
    STRESS_INITIAL   -  stress produced by initial tension
    STRESS_1         -  torsional stress at point 1
    STRESS_2         -  torsional stress at point 2
    STRESS_HOOK      -  bending stress in the hook at point 2
    FS_2         -  static factor of safety at point 2
            This is the ratio of allowable stress at point 2
            to the calculated stress induced by the load at
            point 2  (STRESS_LIM_STAT/STRESS_2).
    FS_CYCLE_LIFE    -  factor of safety based on the Soderberg endurance
            limit calculation.  This figure uses the allowable
            endurance stress (STRESS_LIM_ENDUR) to include
            fatigue considerations.  Refer to additional
            discussion in the CYCLE_LIFE section.
    FS_HOOK      -  factor of safety in hook based on STRESS_HOOK
            and STRESS_LIM_BEND
    CYCLE_LIFE       -  expected cycle life based on a calculation
            using the "modified Goodman method".  This value is
            approximate.  Refer to additional discussion in the
            CYCLE_LIFE section.
   
    STRESS_INIT_LO   -  lower limit of initial stress for proper
            manufacturability.
    STRESS_INIT_HI   -  upper limit of initial stress for proper
            manufacturability
    FS_SI_LO         -  factor of safety on lower limit of initial stress
    FS_SI_HI         -  factor of safety on upper limit of initial stress
    F_1>IT_MARGIN    -  amount by which FORCE_1 exceeds INITIAL_TENSION
   
 Other values are calculated and displayed by the REPORT menu items.  These
 include:   

    wire_length      -  total length of wire required to manufacture the
            spring, not including any waste.

    safe_load        -  load supported by the spring at a stress of
            STRESS_LIM_STAT

    stress ratio     -  ratio of minimum stress to maximum stress
            (STRESS_1/STRESS_2)

    Kw1          -  stress correction factor due to curvature.

    torsion stress at end  - stress in hook or loop
    bending stress at end  - stress in hook or loop  (STRESS_HOOK)


 The following diagram may be of some assistance in interpreting the various
 dimensions of an extension spring.

   
              Extension Spring Names   


    |<-----------  L_FREE  -------------->|   

         |<----  L_BODY  ---->|   

                                |
       .  ____________________     .           _v_
     /'  |                    |         `\
    |    |            |       |       OD_FREE
     \   |            |      /
      `._|____________________|________.'              ___
                                ^
                                |

                 ---->|    |<---- END_EXTENSION   

     -->|    |<--- L_END   

                     ---->|   |<---- L_EXTENDED_END   

                     
   
FORCE-DEFLECTION DIAGRAMS   

                     
   

            |         /
        FORCE_2 ----|------------/
            |       /:         ODOP:Spring Names
      F         |      / :
            |     /  :            extension
      O         |    /   :             spring
            |   /    :
      R         |      /     :
            |     /      :
      C     FORCE_1 ----|----/       :
            |   /:       :
      E         |  / :<----->:------- L_STROKE
            | /  :       :
        INITIAL_ _ _|/   :       :
        TENSION |    :       :
            |____:_______:________
           L_FREE    :       :
                 L_1     L_2
               DEFLECT_1     DEFLECT_2

              D E F L E C T I O N
   
               
   
Constraints unique to extension springs:

These constraints are slightly different than the other constraints.
Rather than having levels that are expressed as simple constants, they
express a desired relationship between selected variables.  Refer to the
documentation sections named "FUNCTION" and "LIST LEVELS" for additional
information.

In the default extension spring start point (startup), FORCE\_1 MIN is
a "function" of INITIAL\_TENSION.  This says that the force at the first
load point should be greater than the value of INITIAL\_TENSION.

STRESS\_INITIAL MIN and STRESS\_INITIAL MAX are also defined as functions.
These constraints say that the stress produced by INITIAL\_TENSION should
be within the limits specified in the initial selection specifying
extension spring Calculation Inputs.  The selection values are
"readily obtainable" or "special request".


CYCLE LIFE   

Hook or loop ends on an extension spring are loaded in both bending and
torsion.  Depending on the radius of the bend that tilts the last coil
upward to form the hook or loop, either the bending or torsional stresses
may be the first to induce failure.  Note that fatigue failure in the end
of an extension spring may also be induced by stress concentration caused
by tooling marks.  Refer to the sources listed in the REFERENCES section
for additional details.

ODOP:Spring uses bending stresses in the calculation of FS\_HOOK.   FS\_HOOK is
not constrained in the default extension spring start point (startup).
In order to establish such a constraint, use the numeric entry fields.  For
example:

        CHANGE  FS_HOOK  MIN  1.0
        CHANGE  STRESS_HOOK  MAX  STRESS_LIM_BEND

STRESS\_LIM\_BEND is based on %\_TENSILE\_BEND, a percentage of the selected
material's tensile strength.  This percentage is determined based on the
desired cycle life conditions established by LIFE\_CATEGORY.

   
Torsional stresses in the end of an extension spring are calculated and
listed with the REPORT 2 tab.  The REPORT 2 tab will flag these
stresses if they exceed the value of STRESS\_LIM\_ENDUR.  Note that the value
listed for CYCLE\_LIFE is based on stresses in the body coils; it does not
apply to the hooks, loops or other forms of attachment.


**END TYPES**   
The current version of the ODOP:Spring program implements five different end types for extension
springs.  In addition, the user can define specialized end conditions.
These end types are represented by the Calculation Input END\_TYPE which
has the following possible values:

          Extension

    1   FULL_LOOP
    2   75%_LOOP
    3   FULL_HOOK
    4   75%_HOOK
    5   CLOSE_WOUND_COIL
    6   USER_SPECIFIED

For an extension spring, the end type directly impacts
calculation of HOOK\_DEFLECT\_ALL, END\_ID, EXTENDED\_END\_ID, L\_END and
L\_EXTENDED\_END.  Other variables are impacted indirectly.
   
FULL\_LOOP implies a loop matching the diameter of the coil body.  The
distance from the last body coil to the inside of each hook (loop) is equal
to the inside diameter of the body.

75%\_LOOP implies a shortened hook (loop) where the inside of the hook
(loop) falls 75% of an inside diameter from the end of the body.  Hook
stresses are calculated based on body diameter in the hook (loop).

Additional information may be found in the documentation sections for
EQNSET.  The EXTENSION NAMES section contains a diagram illustrating
extension spring end dimensions.
   
When END\_TYPE is set to one of the standard (non USER_SPECIFIED) selections, the quantities
described above as "directly impacted" will be set by the program from
values contained in internal tables.  If the user attempts to alter one of
the "directly impacted" values without first
changing the value of END\_TYPE to USER_SPECIFIED, the attempt will be immediately
over-written with the value from the internal table.

When the value of END\_TYPE is
USER\_SPECIFIED, the constants described above as "directly impacted"
may be set by the user with the numeric entry field.
   
More precise treatments of this subject are available in the sources listed
in the REFERENCES section of the documentation.



