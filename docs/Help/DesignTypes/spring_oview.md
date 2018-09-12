#### Spring Design Overview

SPRING_BASICS   
 This section presents a limited amount of introductory material on spring
 design in the context of the ODOP:Spring program.

 It is not the function of the ODOP:Spring documentation to teach spring
 design.  The ODOP:Spring program is aimed at experienced spring designers and
 engineers who have some background in strength of materials and failure
 theories.  The documentation section titled REFERENCES contains a list of
 reference works that cover spring design.  This section should be read in
 conjunction with other sections of the ODOP:Spring documentation, in
 particular, the sections titled NAMES and FD_DIAGRAMS (force-deflection
 diagrams).

The essential challenge of spring design:   
The challenge of any design problem is to select values for those
parameters that are under the designer's control such that the design
produces the desired performance.

Even with something as simple as springs, the design problem can be
presented in dozens of different ways.  Sometimes the problem is stated
in terms that specify A, B and C, requiring X, Y and Z to be calculated.
Other times the problem is stated in terms that specify X, Y and Z,
requiring A, B and C to be calculated.  Therefore, it is not possible to
solve the design equations for a single set of inputs and outputs.  It
is not possible to make all design problems fall neatly into a step by
step procedure.

ODOP:Spring approaches this characteristic of design by letting the
designer to express what is known about the problem, 
and what needs to be achieved and then providing an
ability for the program to search for an acceptable solution.

In spring design, it is parameters like outside diameter, wire diameter,
free length, and number of coils that are directly under the designer's
control.  Other variables like spring rate, stress, cycle life, solid
height, initial tension or tendency to buckle are a consequence of the
selection of the physical parameters.  As with any design situation,
there are significant limitations on the range of values that the
various parameters and variables can take on.

Typically a designer can express his goals for the performance of a
given design in terms of one-sided limitations that ODOP:Spring refers to
as constraints.  For example, the outside diameter must be less than X,
the inside diameter greater than Y, the solid height less than Z.

Sometimes the designer's limitations are two sided.  For example, it may
be necessary to select appropriate values for directly controlled
parameters (wire diameter, outside diameter, number of coils) such that
another variable (such as spring rate or length at a given load) is
exactly equal to a specified value.
   
Material properties are another good example of a designer's
limitations.  If massless, infinitely strong materials were available at
negligible cost, spring design would not be difficult.  Because the
range of available materials is limited and the spring properties just
get better as the material properties improve, ODOP:Spring implements
material properties as Calculation Inputs rather than as independent variables to
be searched over.  If material properties were allowed to vary during
the search, the program would always select the strongest material that
it could find.

Thus, the essential challenge of spring design is to take what is known
about the problem and select values for the independent variables that
achieve the required performance.  If available materials will not
deliver this performance, it is necessary to make some compromises.
ODOP:Spring provides tools to assist in the process of making those
compromises, but the ultimate responsibility for the design rests with
the designer.

   
Force-Deflection relationships:   
Take a look at the force-deflection diagram in the section titled
FD_DIAGRAMS.  Most of a spring design problem can be stated in terms of
those diagrams.  New users need to understand the diagram and understand
the names that ODOP:Spring uses in order to specify a design problem.

The vertical axis in each diagram is force.  The horizontal axis is
distance; either deflection or spring length.  The force-deflection
relationship of a cylindric coil spring of uniform pitch (refer to the
RESTRICTIONS section) is linear.  The slope of the line is the spring
RATE measured in force per unit deflection.

As described in the NAMES section, ODOP:Spring produces information about
four points on the force-deflection curve.  As described in the
WHAT_TO_DO_IF section, specifying both force and deflection for any two
points will completely specify the force-deflection line.  Any
additional specification on RATE or one of the other points will over
specify the problem.  Unless the redundant specification is exactly in
line with the other values, the conflict will keep ODOP:Spring from
finding a feasible solution.  Consistent specification of constraints
and FIX values is the responsibility of the ODOP:Spring user.
   
The constraints of spring design:   
The constraints used by ODOP:Spring are described in the documentation
sections titled NAMES and SPRING_CONSTRAINTS.  The discussion in the
section named SPRING_CONSTRAINTS is common with the tutorial section
covering constraints.  It is recommended that new users take the time to
work through the tutorial.  Because it is somewhat interactive and has
the ODOP:Spring program available to illustrate various points, it is a
better learning tool than simply reading the manual.

By specifying appropriate values for each of the constraints, 
we can have ODOP:Spring design a spring that meets our objectives.

   
Allowable stresses and Factor of Safety   
ODOP:Spring uses a table of material properties to determine permissible
stress levels for various commonly used spring materials.  This process
is described in greater detail in the documentation section titled
MATERIALS.  The table of material properties contains
values for tensile strength at two wire diameters, (.010 inch and .400
inch) plus conversion factors to produce estimates of allowable stresses
for both static and cyclic (endurance) applications.  The allowable
shear stresses (STRESS_LIM_ENDUR and STRESS_LIM_STAT) are calculated
from the tabulated values of tensile strength and conversion factors
(%_TENSILE_ENDUR and %_TENSILE_STAT) for each new wire diameter.

Because allowable stresses change for each new wire diameter considered,
ODOP:Spring works in terms of a "factor of safety".  A factor of safety
may be described as measuring "how much better the design is than it HAS
to be".  Specifically, factor of safety is allowable stress divided by
actual stress.  For example, if a spring is made of wire that has an
allowable stress of 100,000 psi, when that spring supports a load that
generates 50,000 psi of stress, the factor of safety is 2.00.
   
The factor of safety concept applies to both static loads and cycle
life.  The calculation of FS_CYCLE_LIFE includes the material's
endurance limit (STRESS_LIM_ENDUR), static load and fluctuating
component of stress in a calculation originally developed by Soderberg.
Additional information on this calculation is available in the sources
listed in the REFERENCES section.

Additional discussion on these topics is available in the sections
titled FACTOR_OF_SAFETY and CYCLE_LIFE.

Selection of materials from the ODOP:Spring materials table is covered in
the MATERIALS section and in the tutorial.

   
 How to judge a good spring design:   
The interpretation of a "good" spring design depends strongly on the
intended application.  It is possible that some applications will
require a spring to operate at stress levels that would make it totally
unsuitable for other, only slightly different applications.

The REPORT commands present crucial information about the performance of
a design in a specialized, compact format.

In general, a finished design should not have significant remaining
constraint violations.  In particular, L_2 below L_SOLID in a
compression spring is a sign of problems that need to be resolved.
   
The force-deflection characteristics of a coil spring are approximately
linear in the range of 20 to 80 % of available deflection.  Outside this
range, effects of end coils and nonuniform coil pitch influence the
accuracy of analytical predictions.

For compression springs, the REPORT 2 command will produce an
informational message any time that more than 80 % of available
deflection (%_AVAIL_DEFLECT) is used at the second load point.  Note
that the default startup file supplied with ODOP:Spring (STARTUP.DSN) has
%_AVAIL_DEFLECT constrained to be less than 90.0, thus in the "as
supplied" condition, ODOP:Spring will frequently select designs that
produce this message.
   
The factor of safety at point 2 should be greater than 1.0.  Some
specialized compression spring applications may require a factor of
safety less than 1.0 in the solid condition.  A spring will "set" and
not return to the original free length if deflected beyond a factor of
safety of 1.0.

If minimum weight is desired, the spring needs to operate at relatively
high stresses.  Unless the design of a compression spring is constrained
by rate or solid height considerations, the factor of safety at point 2,
solid and cycle life should all be close to 1.0.  If a long cycle life
is not necessary, the FS_CYCLE_LIFE may actually be less than 1.0.  A
minimum weight design should have the value of %_AVAIL_DEFLECT close to
the maximum value for allowable for the application.

If low risk of failure or a long cycle life is desired, the spring
should operate at relatively low stresses.  The spring should have
factors of safety, including FS_CYCLE_LIFE, that are significantly
greater than 1.0.
   
If a compression spring is intended for operation without lateral
support it should have a ratio of free length to coil diameter
(SLENDERNESS) below approximately 4 to avoid buckling.  Lateral support
is usually provided by operation in a sleeve or over a post.  The
constraint SLENDERNESS MAX can be used to restrict the search to designs
that will not tend to buckle.  Note that the value of SLENDERNESS is not
constrained in the default startup file, and thus the search may produce
designs that are prone to buckling.  The REPORT command will provide an
indication as to the possibility of bucking for your specific design and
loading condition.

Please review the discussion in the RESTRICTIONS section of the
documentation to insure that you apply ODOP:Spring appropriately.  The
design equations in the current release of ODOP:Spring do NOT cover all
possible spring applications.

More precise treatments of this subject are available in the sources
listed in the REFERENCES section of the documentation.

   
 Technique:   
A typical spring design process should start by entering what is known
about the problem.  As described in more detail in the INTRODUCTION
section of the documentation, any time after starting ODOP:Spring and
reaching the command prompt, a complete spring design is already
defined.  Use the CHANGE, FIX, and FREE commands to alter that existing
design to reflect what is known about the problem at hand.

The LIST INDEPENDENT, LIST DEPENDENT and REPORT commands can be used to
view the current state of the design.  LIST VIOLATIONS will show which
constraints are violated.  Use the SEARCH command to have ODOP:Spring
select values for the free independent variables that reduce (and
hopefully eliminate) constraint violations thus achieving a feasible
design.

Typically, the process of designing a completely new spring should start
with (at least) WIRE_DIA and COILS_T in free status.  Once a feasible
design is established, a SELECT WIRE_DIA command can be used to select
the nearest standard wire size from the appropriate standard sizes
table.  After the selection, an additional search should be executed to
adjust values of the remaining independent variables to compensate for
the change in WIRE_DIA.
   
Additional information on operating techniques is presented in the
documentation sections INTRODUCTION and GETTING_STARTED.  The demo and
tutorial sessions supplied with ODOP:Spring provide detailed commentary on
how to solve a variety of problems.

   
REFERENCES   
 There are many excellent sources of information on spring design.  Several
 on the following list were consulted in the development of the ODOP:Spring
 program.  No single source contains a comprehensive set of equations and/or
 material property values found in ODOP:Spring.  The references are presented
 in alphabetical order by title.

    Design Handbook - Engineering Guide to Spring Design
    Form no. 515  Copyright 1981,  Library of Congress Number 81-67959
    Associated Spring - Barnes Group Inc.
    18 Main St.
    Bristol, Ct.   06010
    203-582-9581

    Design of Machine Elements   (sixth edition, 1985)
    M. F. Spotts
    Prentice-Hall, Inc.  Englewood Cliffs, N.J.

    Handbook of Spring Design
    Copyright 1981   ISBN 00-9604120-0-8
    Spring Manufacturer's Institute Inc.             312-520-3290
    380 West Palatine Rd.
    Wheeling, IL.  60090
   
    Machinery's Handbook
    ISBN  0-8311-1155-0
    Industrial Press Inc.  200 Madison Ave., New York, NY  10157

    Mark's Standard Handbook for Mechanical Engineers
    ISBN  0-07-004123-7
    McGraw-Hill Book Co, Inc.   New York, N.Y.

    Mechanical Design Analysis
    M. F. Spotts
    Prentice-Hall, Inc.  Englewood Cliffs, N.J.
    Copyright 1964, Library of Congress Number 64-18626

    Mechanical Springs    (second edition, 1963)
    A. M. Wahl
    McGraw-Hill Book Co, Inc.   New York, N.Y.

    Roark's Formulas for Stress and Strain
   
    Spring Designer's Handbook
    Harold Carlson
    Marcel Dekker, Inc.  270 Madison Ave., New York, NY  10016
    Copyright 1978,  Library of Congress Number 77-27436  TJ210.C37

 A list of "Useful Publications for Spring Makers" appears in the May 1985
 issue of "Springs, The Magazine of Spring Technology" published by:

    Spring Manufacturer's Institute Inc.
    380 West Palatine Rd.    Wheeling, IL.  60090    312-520-3290
   
RESTRICTIONS   
This section covers a few restrictions and limitations of the ODOP:Spring
program.  Please review the About : Disclaimer section for liability limitations.

The current release of ODOP:Spring is valid only for helical coil compression,
extension and torsion springs that have the properties of uniform pitch,
cylindrical shape, & round wire.  The design equations consider only static
and cyclic applications.  Do not apply the program to designs where spring
dynamics ("surge" effects) are important.

Compression spring stress values produced by the REPORT 2 feature include a
stress correction factor (Kw2) that is appropriate for use after set
removal.  Otherwise, the current release of ODOP:Spring does not take into
consideration any kind of pre-stressing or "set-removal" operations.

The current release of ODOP:Spring does not take into consideration any
effects of stress relaxation or creep.  Do not apply the program to designs
that are sensitive to reduction of load capacity over time, and/or operate
at high temperatures and high stress.
   
Accurate material property information is extremely important for
satisfactory results.  The material property values supplied with ODOP:Spring
are approximate and are not suitable for a high precision design
application, or one with a small factor of safety.  Consider these values
to be a starting point at best.  The material property tables are intended
for modification by the user so that values appropriate to available
materials and applications can be included.

The current release of ODOP:Spring does not take manufacturing tolerances
into consideration.  All values are "nominal" and should be taken to
represent the average of a statistically large number of samples.  When
dealing with design specifications that place a specific limit on a
value such as outside diameter, inside diameter, solid height, etc.,
the user is expected to offset the value entered as a constraint level by
the anticipated manufacturing tolerance.
   
The standard size tables supplied with the current release of ODOP:Spring do
not represent the product offerings of any single manufacturer.  These
tables are samples, intended for modification by the end user to represent
the material size spectrum locally available.  Please review the operation
of the SELECT SIZE menu entry for a better understanding of how to use these
tables.

The spring catalogs supplied with the current release of ODOP:Spring are
intended for demonstration purposes only.  They do not necessarily
represent the current offering of any single manufacturer.
   
NAMES   
 ODOP:Spring contains many kinds of names.  Command names are discussed
 individually in the later sections of the manual.  Names for independent
 variables, dependent variables, constants and constraints are discussed
 here and in the sections titled C_NAMES and E_NAMES for Compression and
 Extension names respectively.

 In general, the names are constructed for consistency and to have common
 prefixes so that the substring abbreviation feature of the command
 interpreter may be used effectively.  Names frequently have multiple words,
 or abbreviations hooked together with the underscore (_) character.  For
 example, the free length is named L_FREE to be consistent with other length
 names (L_SOLID, L_1, and L_2).  The command LIST L_ will list current
 values for all length names including the various length constraints.
 Other name groupings include FORCE_, STRESS_, FS_, OD_, and ID_.

 The names for parameters, variables, constants, etc.  are defined in the
 startup file.  By editing this file, the user can change these names to any
 character string of his preference.  Additional information may be found in
 the sections named START, FILES_ON_DISK, and STARTUP.DSN.
   
 The force deflection diagrams contained in the section named FD_DIAGRAMS
 may assist understanding of the following discussion.  Additional
 information is contained in the section titled SPRING_BASICS.

 ODOP:Spring produces information about four points on a compression spring's
 force - deflection curve.  Three points are analyzed for an extension
 spring.  This information includes length, deflection, force, outside
 diameter, inside diameter, stress and static factor of safety.  This
 information is listed in a compressed format by the REPORT command.  The
 equations assume that the spring will operate between two points, named 1
 and 2, somewhere in the spring's elastic region.  It is entirely possible
 for point 1 to correspond with the spring's free state, or for a
 compression spring, point 2 can correspond to the spring's solid condition.
 In fact, because the force-deflection equations don't know anything about
 the spring's solid condition, point 2 can be set to represent an impossible
 situation requiring the spring to be compressed beyond solid.  In this
 situation, the constraint on %_AVAIL_DEFLECT will be violated.  The
 search will attempt to resolve the conflict.
   
 Names that apply to the design of a compression spring are covered in the
 documentation section C_NAMES.

 Names that apply to the design of an extension spring are covered in the
 documentation section E_NAMES.

   
C_NAMES
               Compression spring names

 The force deflection points and associated names are:

         length    force        outside  inside    stress        factor of
                    diameter diameter            safety
         ______    ______       ________ ________  ______        ________

 free:       L_FREE         OD_FREE  ID_FREE

 point 1:    L_1      FORCE_1                  STRESS_1

 point 2:    L_2      FORCE_2                  STRESS_2      FS_2

 solid:      L_SOLID  FORCE_SOLID              STRESS_SOLID  FS_SOLID


 point 1 = minimum operating load;     point 2 = maximum operating load

   
 Independent Variable names:

    WIRE_DIA         -  wire diameter

    OD_FREE      -  outside diameter in the free condition

    COILS_T      -  total number of coils, including inactive coils

    L_FREE       -  free length

    FORCE_1      -  load at point 1  (minimum operating load)

    FORCE_2      -  load at point 2  (maximum operating load)
   
 Constant names  (character strings):

    SPRING_TYPE      -  character string used only as label

    MATERIAL_TYPE    -  character string that is used to determine which
            entry in the material file is used to determine
            allowable stresses when PROP_CALC_METHOD is 1.
            Otherwise is ignored.

    ASTM/FED-SPEC    -  character string used only as a label to further
            identify the origin of material property data

    END_TYPE         -  character string that is used to determine
            calculations for INACTIVE_COILS and L_SOLID & pitch.
            Refer to documentation section on END_CALC_METHOD.

    CATALOG_NUMBER   -  character string that contains the catalog number of
            the most recent catalog selection.  Otherwise is
            ignored.
   
    PROCESS      -  character string used to identify the
            manufacturing process.  It is normally controlled
            by the material selected from the material file.
            Values are usually COLD_COILED or HOT_WOUND.
            Refer to discussion under HOT_FACTOR_KH.

    MATERIAL_FILE    -  character string containing the material file name.
            It is normally established by the STARTUP file.

   
 Constant names  (integer constants):

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
   
    END_CALC_METHOD  -  This value controls the calculation of
            INACTIVE_COILS.
            1 indicates that the value comes from an internal
            table based on END_TYPE.
            2 indicates that the value is supplied by the user.
            Refer to documentation section on END_TYPE.

    LIFE_CATEGORY    -  This value reflects the user's input about shot
            peening and required cycle life.  It is related
            to the calculation of FS_CYCLE_LIFE.
            Refer to documentation section on CYCLE_LIFE.

   
 Constant names  (floating point constants):

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

   
 Dependent Variable names:

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

   
 Other values are calculated and displayed by the REPORT command.  These
 include:

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

   
E_NAMES
               Extension spring names

 The force deflection points and associated names are:

         length    force        outside  inside    stress        factor of
                    diameter diameter            safety
         ______    ______       ________ ________  ______        ________

 free:       L_FREE_(W/ENDS)        OD_FREE  ID_FREE

 point 1:    L_1      FORCE_1                  STRESS_1

 point 2:    L_2      FORCE_2                  STRESS_2      FS_2


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
   
 Constant names  (character strings):

    SPRING_TYPE      -  character string used only as label

    MATERIAL_TYPE    -  character string that is used to determine which
            entry in the material file is used to determine
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
            by the material selected from the material file.
            Values are usually COLD_COILED or HOT_WOUND.
            Refer to discussion under HOT_FACTOR_KH.

    MATERIAL_FILE    -  character string containing the material file name.
            It is normally established by the STARTUP file.

   
 Constant names  (integer constants):

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
   
    END_CALC_METHOD  -  This value controls the calculation of
            INACTIVE_COILS.
            1 indicates that the value comes from an internal
            table based on END_TYPE.
            2 indicates that the value is supplied by the user.
            Refer to documentation section on END_TYPE.

    LIFE_CATEGORY    -  This value reflects the user's input about shot
            peening and required cycle life.  It is related
            to the calculation of FS_CYCLE_LIFE.
            Refer to documentation section on CYCLE_LIFE.

   
 Constant names  (floating point constants):

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
   
 Other values are calculated and displayed by the REPORT command.  These
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

   
FD_DIAGRAMS


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
   

 The remaining names used by ODOP:Spring are described in the NAMES section of
 the documentation.

   
SPRING_CONSTRAINTS   
 While most of ODOP:Spring constraints are obvious, a few need a bit of
 additional explanation.  This section primarily covers constraints that are
 established in the default startup files STARTUP.DSN and EXTEN.DSN.
 Remember that the user may use the CHANGE command to establish additional
 constraints on any variable, dependent or independent.  The FREE command
 may be used to eliminate any constraints, including the default constraints
 established by the startup file.  Further information is available in the
 documentation sections named TERMINOLOGY, CONSTRAINT_OVIEW, SPRING_BASICS
 and NAMES.

 This discussion is accessed by the tutorial section covering constraints.

   
 Constraints common to both compression and extension springs:

L_STROKE MIN is a lower constraint on L_STROKE, the length difference
between point 1 and point 2.  Refer to the force-deflection diagram in
the documentation section named FD_DIAGRAMS for an illustration of
L_STROKE.

ID_FREE MIN is established in the default startup files because it
discourages the search from investigating designs with a zero or
negative inside diameter, and there by encountering numerical
difficulties.

FS_2 MIN and FS_2 MAX work together to keep the design in a reasonable
range of working stress.  FS_2 MIN works to keep the design from being
overstressed.  FS_2 MAX works to keep the design from being
understressed and overweight.
   
FS_CYCLE_LIFE is the factor of safety produced by the Soderberg cycle life
calculation.  If a design has FS_CYCLE_LIFE greater than 1.0, then the
combination of average stress and the fluctuating component of stress for
that design is reasonably small compared to the endurance limit.  In this
situation, an application cycling between point 1 and point 2 may expect a
life that exceeds the value selected in the initial dialog.  Remember that
the endurance limit will vary as a function of the material selected, the
surface treatment (shot peening), and the selected cycle life.

As described in the documentation section on CYCLE_LIFE, ODOP:Spring is
capable of directly calculating CYCLE_LIFE only for materials contained in
the MATERIALS.DAT file.  The FS_CYCLE_LIFE variable is the only way of
gaging cycle life for user defined material properties (PROP_CALC_METHOD =
2 and 3).

FS_CYCLE_LIFE MIN is a lower constraint level associated with
FS_CYCLE_LIFE.  A value less than 1.0 will permit designs that risk
failure in high cycle applications.
   
Constraints unique to compression springs:   

SLENDERNESS is a compression spring's ratio of free length (L_FREE) to
mean coil diameter (COIL_DIA).  If this ratio exceeds 4 for a
compression spring, that spring will have a tendency to buckle under
load.  In that case, the spring will usually need support in the form of
a sleeve or post.  In order to restrain the search to select designs
that do not have a tendency to buckle, set the value of SLENDERNESS MAX
to a value of 4.0 or less.

%_AVAIL_DEFLECT is the percentage of available deflection consumed at
load point 2.  %_AVAIL_DEFLECT is usually constrained to be less than 85
to 98 percent.  Thus it requires the search to select designs that
provide a small margin between load point 2 and the solid condition.

   
Constraints unique to extension springs:

These constraints are slightly different than the other constraints.
Rather than having levels that are expressed as simple constants, they
express a desired relationship between selected variables.  Refer to the
documentation sections named "FUNCTION" and "LIST LEVELS" for additional
information.

In the default extension spring startup file (EXTEN.DSN), FORCE_1 MIN is
a "function" of INITIAL_TENSION.  This says that the force at the first
load point should be greater than the value of INITIAL_TENSION.

STRESS_INITIAL MIN and STRESS_INITIAL MAX are also defined as functions.
These constraints say that the stress produced by INITIAL_TENSION should
be within the limits specified in the initial dialog specifying
extension spring constants.  The dialog refers to the range of these
values as "readily obtainable" or "special request".

   
FACTOR_OF_SAFETY

                         allowable stress
    factor of safety =  ------------------
                         actual stress


 Factor of safety may be interpreted as:
    "How much better this design is than it HAS to be."


Example:   

A design with a factor of safety of 2.0 has stresses that are half of the
allowable stresses and thus "it is twice as good as it HAS to be".

   
ODOP:Spring works in terms of a "factor of safety" because allowable stresses
change for each new wire diameter considered.  If specific stress limits
were imposed on a design, it would not be possible to automatically adjust
to higher allowable stresses whenever smaller wire diameters were
considered by the SEARCH process.  Because many designers are accustomed to
designing to specific stress limits, ODOP:Spring has been programmed to
permit this approach.  Refer to the section titled DESIGN_TO_STRESS for
additional information.

The factor of safety concept applies to both static loads and cycle life.
The calculation of FS_CYCLE_LIFE includes the material's endurance limit
(STRESS_LIM_ENDUR), plus static and fluctuating components of stress in a
calculation originally developed by Soderberg.  STRESS_LIM_ENDUR is
normally determined by the materials table and the user's selection of
cycle life and surface treatment (shot peening) during the ODOP:Spring
startup dialog.  Additional information on the cycle life calculation is
available in the documentation sections EQNSET1 and EQNSET2 and also in the
sources listed in the REFERENCES section.
   
Refer to additional discussion in the sections titled SPRING_BASICS, NAMES
and CYCLE_LIFE.  Selection of materials (and corresponding material
properties) from the ODOP:Spring materials table is covered in the MATERIALS
section and in the tutorial.

   
MATERIALS   
Materials available in the default material file supplied with ODOP:Spring
include:

      Common Name    ASTM     FED_SPEC    Notes

    HARD_DRAWN_WIRE  A227                Class II
    MUSIC_WIRE       A228     QQW-470
    OIL_TEMPERED_MB  A229     QQW-428    Class II
    CHROME_VANADIUM  A232     QQW-412
    CHROME_SILICON   A401     QQW-412
    SAE9250          A401     QQW-412
    302_STAINLESS   Type302   QQW-423
    17-7_STAINLESS   A313    (cond_CH)
    SPRING_BRASS     B134     QQW-321
    PHOSPHOR_BRONZE  B159     QQW-401
    MONEL             400    (AMS7233)
    INCONEL_X-750   SprTmp   (AMS5698)
    BERYLLIUM-COPPER  B197    QQW-530
    5160H            A125-52
    5160H-CG         A125-52          centerless ground
   
ODOP:Spring normally gets material property data from the materials file
(.MAT suffix).  This file may be altered by the user to contain material
property values that match locally available materials or individual
experience and preferences.  Thus the currently active materials file may
not match the default file described above.  Refer to the RESTRICTIONS
section of the documentation for additional information.

The way that ODOP:Spring handles material property data is dependent on the
user specified settings of the constants:  MATERIAL_TYPE and
PROP_CALC_METHOD.  In general, the user may ignore these details and use
the defaults built into the program.  Also, by using the menu driven dialog
that is available during the startup process, the user can establish his
own material properties values without too much concern for the following
discussion.  However, in the case that more control of material property
data entering the calculations is desired, the following discussion may be
useful.  Examples of these procedures are presented in tutorial section
TUTOR5.

   
The MATERIAL_TYPE constant is a character string indicating which entry in
the material file (.MAT suffix) should be used to determine material
properties and allowable stress limits.  Specifically, the term "material
properties" includes the values for DENSITY, TORSION_MODULUS, and TENSILE.
The term "allowable stress limits" includes values for STRESS_LIM_STAT and
STRESS_LIM_ENDUR which are normally calculated based on the material
properties plus the current value of WIRE_DIA combined with %_TENSILE_STAT
and %_TENSILE_ENDUR.

If ODOP:Spring finds a match for the current value of MATERIAL_TYPE in the
material file, then material properties from the file will be used to
determine allowable stress limits.  If ODOP:Spring does not find a match for
MATERIAL_TYPE, then the currently existing values for material properties
(as established by the user or read from the startup file) will be used to
determine allowable stress limits.
   
To use a material that is not in the material file (.MAT suffix), or to use
material property values that are different than those contained in the
table, it is necessary to set the value of the MATERIAL_TYPE constant to
any value that is not in the material file.  After this is done, enter
any new values for TORSION_MODULUS, TENSILE, %_TENSILE_STAT or
%_TENSILE_ENDUR.  These new values will be used calculate the allowable
stresses; STRESS_LIM_STAT and STRESS_LIM_ENDUR.

   
ODOP:Spring will treat material properties in one of three different ways
depending on the value of the constant PROP_CALC_METHOD.

If PROP_CALC_METHOD has a value of 1 (the normal default), then the
material properties are selected and allowable stresses calculated as
previously described.  Specifically, if PROP_CALC_METHOD has a value of 1,
ODOP:Spring will calculate the allowable stresses as a function of WIRE_DIA.
A log-linear interpolation scheme will use the values of WIRE_DIA, plus the
table supplied values of tensile at 0.010, tensile at 0.400,
%_TENSILE_STAT, and %_TENSILE_ENDUR to calculate new values for TENSILE,
STRESS_LIM_STAT and STRESS_LIM_ENDUR at each step in the SEARCH process.
This insures that the allowable stresses used in the factor of safety
calculations exactly match the trial values of WIRE_DIA selected by SEARCH.

   
If the user selects a material that is not in the material file,
PROP_CALC_METHOD is automatically switched to a value of 2.  In this
situation, the user supplied values of TENSILE, %_TENSILE_STAT and
%_TENSILE_ENDUR are used to calculate the allowable stresses
STRESS_LIM_STAT and STRESS_LIM_ENDUR.

If the user selects a material that is not in the material file (.MAT
suffix), and PROP_CALC_METHOD is CHANGEd to 3, then ODOP:Spring will not
modify the values of STRESS_LIM_STAT and STRESS_LIM_ENDUR in any way.
These values will remain as established in the startup file or as set by
the user with the CHANGE command.  The values of MATERIAL_TYPE, TENSILE,
%_TENSILE_STAT and %_TENSILE_ENDUR will be ignored.

In most cases, the user does not need to be concerned with these details.
They are necessary only to use material properties or allowable stresses
that are different from those determined by the materials file.
   
The following example illustrates how to establish a value of
TORSION_MODULUS that is different from the value in the material table.
STRESS_LIM_STAT and STRESS_LIM_ENDUR will continue to be based on the
current values of %_TENSILE_STAT and %_TENSILE_ENDUR whether established by
the user or carried over from the values established in the materials table
or startup file.  The order in which these commands are entered is
significant.

    CHANGE  MATERIAL_TYPE   USER_DEFINED
    CHANGE  TORSION_MODULUS  xxxxxxxx

The program will issue a confirming message after each command.
   
The same process applies to values for %_TENSILE_STAT and %_TENSILE_ENDUR.

The following example illustrates how to establish a value of
%_TENSILE_STAT that is different from the value in the material table.
STRESS_LIM_STAT and STRESS_LIM_ENDUR will continue to be based on the new
value of %_TENSILE_STAT and existing value of %_TENSILE_ENDUR.  The order
in which these commands are entered is significant.

    CHANGE  MATERIAL_TYPE   USER_DEFINED
    CHANGE  %_TENSILE_STAT  xxxxxxxx

The program will issue a confirming message after each command.

   
 The following example illustrates how to establish values of
 TORSION_MODULUS, STRESS_LIM_STAT and STRESS_LIM_ENDUR.  There will be no
 dependence on the WIRE_DIA or any values from the materials table.  The
 order in which these commands are entered is significant.

    CHANGE  MATERIAL_TYPE  USER_DEFINED
    CHANGE  PROP_CALC_METHOD  3
    CHANGE  TORSION_MODULUS   xxxxxxxx
    CHANGE  STRESS_LIM_STAT   yyyyyy
    CHANGE  STRESS_LIM_ENDUR  zzzzzz

   
The SAVE command will capture the complete status of the design including
the material property information.  After using the START command to read a
previously SAVEd design, the complete status of the design will be
restored.

Additional information on controlling the way material property data is
used in the calculations is presented in the section DESIGN_TO_STRESS.

   
END_TYPES   
The current version of the ODOP:Spring program implements six spring end
types for compression springs and five different end types for extension
springs.  In addition, the user can define specialized end conditions.
These end types are represented by the character constant END_TYPE which
has the following possible values:

          Compression           Extension

    1     OPEN              1   FULL_LOOP
    2     OPEN&GROUND       2   75%_LOOP
    3     CLOSED            3   FULL_HOOK
    4     CLOSED&GROUND     4   75%_HOOK
    5     TAPERED_C&G       5   CLOSE_WOUND_COIL
    6     PIG-TAIL

    7     USER_SPECIFIED        6   USER_SPECIFIED

For a compression spring, the end type directly impacts calculation of
INACTIVE_COILS.  L_SOLID, pitch and other variables are affected
indirectly.  For an extension spring, the end type directly impacts
calculation of HOOK_DEFLECT_ALL, END_ID, EXTENDED_END_ID, L_END and
L_EXTENDED_END.  Other variables are impacted indirectly.

   
FULL_LOOP implies a loop matching the diameter of the coil body.  The
distance from the last body coil to the inside of each hook (loop) is equal
to the inside diameter of the body.

75%_LOOP implies a shortened hook (loop) where the inside of the hook
(loop) falls 75% of an inside diameter from the end of the body.  Hook
stresses are calculated based on body diameter in the hook (loop).

Additional information may be found in the documentation sections for
EQNSET1 and EQNSET2.  The E_NAMES section contains a diagram illustrating
extension spring end dimensions.

   
END_CALC_METHOD will have a value of 1 when the value of END_TYPE matches
one of the standard types listed above.  In this case, the constants
described above as "directly impacted" will be set by the program from
values contained in internal tables.  If the user attempts to alter one of
the "directly impacted" values with the CHANGE command without first
changing the value of END_TYPE, the attempt will be immediately
over-written with the value from the internal table.

END_CALC_METHOD will have a value of 2 when the value of END_TYPE is
USER_SPECIFIED, or any other string that does not match one of the standard
types.  In this case, the constants described above as "directly impacted"
may be set by the user with the CHANGE command.
   
In order to facilitate the treatment of unusual compression spring end
types such as the "tapered, closed and ground" configuration common to hot
wound springs, ODOP:Spring has added an extra term into the solid height
calculation.  ADD_COILS@SOLID is a constant that is normally determined by
the value of the character string END_TYPE.  It is used to separate the
solid height calculation from the rate equation which is dependent on the
value of INACTIVE_COILS.  ADD_COILS@SOLID represents the number of wire
diameters added into the solid height beyond COILS_T.  For OPEN and CLOSED
end types, it has a value of +1.0.  For OPEN&GROUND and CLOSED&GROUND end
types, it has a value of 0.0.  For the TAPERED_C&G end type,
ADD_COILS@SOLID has a value of -0.5.

Note that the ADD_COILS@SOLID term is not included in COILS_T or the wire
length and weight calculations.  It is only an adjustment for the solid
height calculation and not the correct way to represent dead coils.
   
Users that understand the impact of the ADD_COILS@SOLID term may control it
directly to represent unusual end configurations; for example, springs that
have a different end type at each end.  To establish the value of
INACTIVE_COILS and/or ADD_COILS@SOLID directly, first specify a value of
END_TYPE that is not known to ODOP:Spring.  This may be done in the
startup dialog or with the CHANGE command.  For example to represent a
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

   
BUCKLING
                     free length          L_FREE
    SLENDERNESS = ----------------  =  -------------
                    coil diameter        MEAN_DIA

If a compression spring is intended for operation without lateral support
it should have a ratio of free length to coil diameter (SLENDERNESS) less
than approximately 4 to avoid buckling.  Lateral support is usually
provided by operation in a sleeve or over a post.

The constraint SLENDERNESS MAX can be used to restrict the search to
designs that will not tend to buckle.  Note that SLENDERNESS is not
constrained in the default startup file.  Thus, unless this constraint is
established, a search may produce designs that are subject to buckling.

The REPORT command will provide an indication as to the possibility of
bucking for each specific design and loading condition.  Both the
fixed-free and fixed-fixed end conditions are covered.

More precise treatments of this subject are available in the sources listed
in the REFERENCES section of the documentation.

   
CYCLE_LIFE   
This section presents a discussion of cycle life considerations and
describes the Soderberg calculation and the ODOP:Spring interpretation of
FS_CYCLE_LIFE.  A discussion of hook stresses in extension springs is
included.

ODOP:Spring provides two different approaches to the cycle life issue.  For
materials contained in the materials table (PROP_CALC_METHOD=1), ODOP:Spring
will calculate cycle life directly.  This calculation is based on the
"modified Goodman method".  Note that the value produced by this
calculation applies only to body coils and is only approximate.  It is
useful in comparing the relative effect of different loading conditions,
or relative performance of different designs, but you should expect results
in practice to vary widely from the cycle life value predicted.

For materials not contained in the materials table (PROP_CALC_METHOD=2 or
3), ODOP:Spring does not have enough information available to directly
calculate cycle life and so the CYCLE_LIFE variable is set to zero.  In
this case, the FS_CYCLE_LIFE variable described here can be used to get
some indication of a design's life in a specific cyclic application.
   
During the normal startup dialog, the user may supply a number that
describes one of eight possible combinations of "cycle life conditions" and
surface treatments (shot peening) expected in the application of the spring
being designed.  The response is used to select a value for %_TENSILE_ENDUR
from the materials table (.MAT suffix) which then is applied to the
interpolated value of tensile strength for that material and wire diameter
to produce a value for the material's endurance limit (STRESS_LIM_ENDUR).

As illustrated in the tutorial section TUTOR4, the default startup files
supplied with ODOP:Spring do not provide default constraints for CYCLE_LIFE
or FS_CYCLE_LIFE.  Simply designating a LIFE_CATEGORY in the startup dialog
is not enough to have ODOP:Spring search for designs with a long cycle life.
To have ODOP:Spring search for designs with a long cycle life, use commands
such as:

    CHANGE  CYCLE_LIFE  MIN  nnnnnn
    CHANGE  FS_CYCLE_LIFE  MIN  1.0

   
FS_CYCLE_LIFE is the factor of safety produced in a calculation originally
developed by Soderberg.  The calculation of FS_CYCLE_LIFE includes the
material's endurance limit (STRESS_LIM_ENDUR), plus static and fluctuating
components of stress.

If a design has FS_CYCLE_LIFE greater than 1.0, then the combination of
average stress and the fluctuating component of stress for that design is
reasonably small compared to the endurance limit.  A life that exceeds
the value selected in the initial dialog may be expected in an application
cycling between point 1 and point 2.

Remember that the endurance limit will vary as a function of the material
selected, the surface treatment (shot peening), and the selected cycle
life category.

Additional information on the cycle life calculation is available in
tutorial session TUTOR4, in the documentation sections EQNSET1 and EQNSET2
and also in the sources listed in the REFERENCES section.
   
Hook or loop ends on an extension spring are loaded in both bending and
torsion.  Depending on the radius of the bend that tilts the last coil
upward to form the hook or loop, either the bending or torsional stresses
may be the first to induce failure.  Note that fatigue failure in the end
of an extension spring may also be induced by stress concentration caused
by tooling marks.  Refer to the sources listed in the REFERENCES section
for additional details.

ODOP:Spring uses bending stresses in the calculation of FS_HOOK.   FS_HOOK is
not constrained in the default extension spring startup file (EXTEN.DSN).
In order to establish such a constraint, use the CHANGE command.  For
example:
        CHANGE  FS_HOOK  MIN  1.0
        CHANGE  STRESS_HOOK  MAX  STRESS_LIM_BEND

STRESS_LIM_BEND is based on %_TENSILE_BEND, a percentage of the selected
material's tensile strength.  This percentage is determined based on the
desired cycle life conditions established during the startup dialog.

   
Torsional stresses in the end of an extension spring are calculated and
listed with the command REPORT 2.  The REPORT 2 command will flag these
stresses if they exceed the value of STRESS_LIM_ENDUR.  Note that the value
listed for CYCLE_LIFE is based on stresses in the body coils; it does not
apply to the hooks, loops or other forms of attachment.

   
WHAT_TO_DO_IF   
This section is intended to anticipate some of the more common user
problems and suggest solutions.

If constraints are violated without apparent reason:   
Check for an over specified problem.  Considering that coil springs of
uniform pitch and cylindric shape are linear devices, specifying both
force and deflection at any two points will determine the spring
constant.  An additional "fix" on RATE or an active L_STROKE MIN
constraint will then cause the problem to be over specified and it may
be impossible to find any set of independent variables that will not
violate the constraints.  There are numerous ways to over specify the
problem.  Have you found one ?

Check the buckling constraint, SLENDERNESS MAX.  If it is violated,
are you really concerned about buckling ?  The feasible region will be
substantially greater if you are willing to accept a spring that
would buckle without additional support.
   
Check fatigue life constraints, CYCLE_LIFE and FS_CYCLE_LIFE.  If either
is violated, are you really concerned about fatigue life ?  The feasible
region will be somewhat larger if you are willing to accept a spring
that does not have a great cycle life.

Check for a conflict between FS_2 MAX and another constraint such as
FS_SOLID MIN.  The FS_2 MAX constraint is intended to prevent the search
from stopping at an overly conservative design.  However, in some cases,
particularly where force and deflection are specified at two points, it
is not possible to find a feasible solution without increasing the value
of FS_2 MAX.  If you find that your design violates FS_2 MAX in addition
to other constraints, and you are willing to accept a more conservative
design, use the CHANGE command to increase the value of FS_2 MAX.
   
If FIXed variables do not take on the proper values:   
Confirm that you have executed a SEARCH after establishing the FIX.
Use of the SEARCH command is always necessary to find the appropriate
values of the independent variables so that the dependent variables take
on their FIXed values.  You may wish to review material contained in the
help file sections named INTRO, FIX, and TERMINOLOGY.  In the case that
one or more constraints are also violated, SEARCH will find a compromise
between violations of the constraints and failure to achieve the desired
value for FIXed state variables.  The nature of this compromise is
influenced the values of the internal variables FIX_WT, CON_WT, and
ZERO_WT.
   
If the program terminates abnormally:   
If you can repeat the problem, please report it via the procedures
for opening an issue on GitHub.

If the results appear to be wrong:   
ODOP:Spring is constantly undergoing improvement.  In spite of years of
field experience and a considerable amount of testing and verification,
there is always a possibility of error.  Please review the RESTRICTIONS
section of documentation.  Review the material properties.  Check the
inconsistency with another design method (slide rule, manual
calculation, etc).  If the problem remains unresolved, please report it
via the procedures for opening an issue on GitHub.

