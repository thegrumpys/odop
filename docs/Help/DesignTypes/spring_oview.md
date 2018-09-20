#### Spring Design Overview

SPRING BASICS   
 This section presents a limited amount of introductory material on spring
 design in the context of the ODOP:Spring program.

 It is not the function of the ODOP:Spring documentation to teach spring
 design.  The ODOP:Spring program is aimed at experienced spring designers and
 engineers who have some background in strength of materials and failure
 theories.  The documentation section titled REFERENCES contains a list of
 reference works that cover spring design.  This section should be read in
 conjunction with other sections of the ODOP:Spring documentation, in
 particular, the sections titled NAMES and FORCE-DEFLECTION DIAGRAMS.

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
material properties as Calculation Inputs rather than as Independent Variables to
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
FORCE-DEFLECTION DIAGRAMS.  Most of a spring design problem can be stated in terms of
those diagrams.  New users need to understand the diagram and understand
the names that ODOP:Spring uses in order to specify a design problem.

The vertical axis in each diagram is force.  The horizontal axis is
distance; either deflection or spring length.  The force-deflection
relationship of a cylindric coil spring of uniform pitch (refer to the
RESTRICTIONS section) is linear.  The slope of the line is the spring
RATE measured in force per unit deflection.

As described in the NAMES section, ODOP:Spring produces information about
four points on the force-deflection curve.  As described in the
WHAT TO DO IF section, specifying both force and deflection for any two
points will completely specify the force-deflection line.  Any
additional specification on RATE or one of the other points will over
specify the problem.  Unless the redundant specification is exactly in
line with the other values, the conflict will keep ODOP:Spring from
finding a feasible solution.  Consistent specification of constraints
and FIX values is the responsibility of the ODOP:Spring user.
   
The constraints of spring design:   
The constraints used by ODOP:Spring are described in the documentation
sections titled NAMES and SPRING CONSTRAINTS.  The discussion in the
section named SPRING CONSTRAINTS is common with the tutorial section
covering constraints.  It is recommended that new users take the time to
work through the tutorial.  Because it is somewhat interactive and has
the ODOP:Spring program available to illustrate various points, it is a
better learning tool than simply reading the manual.

By specifying appropriate values for each of the constraints, 
we can have ODOP:Spring design a spring that meets our objectives.

   
Allowable stresses and Factor of Safety   
ODOP:Spring can use a table of material properties to determine permissible
stress levels for various commonly used spring materials.  This process
is described in greater detail in the documentation section titled
MATERIALS.  The table of material properties contains
values for tensile strength at two wire diameters, (.010 inch and .400
inch) plus conversion factors to produce estimates of allowable stresses
for both static and cyclic (endurance) applications.  The allowable
shear stresses (STRESS\_LIM\_ENDUR and STRESS\_LIM\_STAT) are calculated
from the tabulated values of tensile strength and conversion factors
(%\_TENSILE\_ENDUR and %\_TENSILE\_STAT) for each new wire diameter.

Because allowable stresses change for each new wire diameter considered,
ODOP:Spring works in terms of a "factor of safety".  A factor of safety
may be described as measuring "how much better the design is than it HAS
to be".  Specifically, factor of safety is allowable stress divided by
actual stress.  For example, if a spring is made of wire that has an
allowable stress of 100,000 psi, when that spring supports a load that
generates 50,000 psi of stress, the factor of safety is 2.00.
   
The factor of safety concept applies to both static loads and cycle
life.  The calculation of FS\_CYCLE\_LIFE includes the material's
endurance limit (STRESS\_LIM\_ENDUR), static load and fluctuating
component of stress in a calculation originally developed by Soderberg.
Additional information on this calculation is available in the sources
listed in the REFERENCES section.

Additional discussion on these topics is available in the sections
titled FACTOR OF SAFETY and CYCLE LIFE.

Selection of materials from the ODOP:Spring materials table is covered in
the MATERIALS section and in the tutorial.

   
 How to judge a good spring design:   
The interpretation of a "good" spring design depends strongly on the
intended application.  It is possible that some applications will
require a spring to operate at stress levels that would make it totally
unsuitable for other, only slightly different applications.

The REPORT tabs present crucial information about the performance of
a design in a specialized, compact format.

In general, a finished design should not have significant remaining
constraint violations.  In particular, L\_2 below L\_SOLID in a
compression spring is a sign of problems that need to be resolved.
   
The force-deflection characteristics of a coil spring are approximately
linear in the range of 20 to 80 % of available deflection.  Outside this
range, effects of end coils and nonuniform coil pitch influence the
accuracy of analytical predictions.

For compression springs, the REPORT 2 tab will produce an
informational message any time that more than 80 % of available
deflection (%\_AVAIL\_DEFLECT) is used at the second load point.  Note
that the default start point (startup) supplied with ODOP:Spring has
%\_AVAIL\_DEFLECT constrained to be less than 90.0, thus in the "as
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
is not necessary, the FS\_CYCLE\_LIFE may actually be less than 1.0.  A
minimum weight design should have the value of %\_AVAIL\_DEFLECT close to
the maximum value for allowable for the application.

If low risk of failure or a long cycle life is desired, the spring
should operate at relatively low stresses.  The spring should have
factors of safety, including FS\_CYCLE\_LIFE, that are significantly
greater than 1.0.
   
If a compression spring is intended for operation without lateral
support it should have a ratio of free length to coil diameter
(SLENDERNESS) below approximately 4 to avoid buckling.  Lateral support
is usually provided by operation in a sleeve or over a post.  The
constraint SLENDERNESS MAX can be used to restrict the search to designs
that will not tend to buckle.  Note that the value of SLENDERNESS is not
constrained in the default start point (startup) and thus the search may produce
designs that are prone to buckling.  The REPORT 1 tab will provide an
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
reaching the main page, a complete spring design is already
defined.  Use the numeric entry fields plus FIX checkboxess to alter that existing
design to reflect what is known about the problem at hand.

The main page and REPORT tabs can be used to
view the current state of the design.  The main page will show which
constraints are violated.  Use the SEARCH menu item to have ODOP:Spring
select values for the free independent variables that reduce (and
hopefully eliminate) constraint violations thus achieving a feasible
design.

Typically, the process of designing a completely new spring should start
with (at least) WIRE\_DIA and COILS\_T in free status.  Once a feasible
design is established, the SELECT SIZE menu item can be used to select
the nearest standard wire size from the appropriate standard sizes
table.  After the selection, an additional search should be executed to
adjust values of the remaining independent variables to compensate for
the change in WIRE\_DIA.
   
Additional information on operating techniques is presented in the
documentation sections INTRODUCTION and GETTING STARTED.  The demo and
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
program.  Please review the About : Notice and About : Restrictions sections
 for liability limitations.

The current release of ODOP:Spring is valid only for helical coil compression,
extension and torsion springs that have the properties of uniform pitch,
cylindrical shape, & round wire.  The design equations consider only static
and cyclic applications.  Do not apply the program to designs where spring
dynamics ("surge" effects) are important.

Compression spring stress values produced by the REPORT 2 tab include a
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
 ODOP:Spring contains many kinds of names.  Menu item names are discussed
 individually in the later sections of the documentation.  Names for independent
 variables, dependent variables, constants and constraints are discussed
 here and in the sections titled COMPRESSION SPRING NAMES and 
 EXTENSION SPRING NAMES.

 In general, the names are constructed for consistency and to have common
 prefixes.  Names frequently have multiple words,
 or abbreviations hooked together with the underscore (_) character.  For
 example, the free length is named L\_FREE to be consistent with other length
 names (L\_SOLID, L\_1, and L\_2). 

 The names for parameters, variables, constants, etc.  are defined in the
 initialState.js file.  By editing this file, the user can change these names to any
 character string of his preference.  Additional information may be found in
 the sections named START and STARTUP.
   
 The force deflection diagrams contained in the section named FORCE-DEFLECTION DIAGRAMS
 may assist understanding of the following discussion.  Additional
 information is contained in the section titled SPRING BASICS.

 ODOP:Spring produces information about four points on a compression spring's
 force - deflection curve.  Three points are analyzed for an extension
 spring.  This information includes length, deflection, force, outside
 diameter, inside diameter, stress and static factor of safety.  This
 information is listed in a compressed format by the REPORT tabs.  The
 equations assume that the spring will operate between two points, named 1
 and 2, somewhere in the spring's elastic region.  It is entirely possible
 for point 1 to correspond with the spring's free state, or for a
 compression spring, point 2 can correspond to the spring's solid condition.
 In fact, because the force-deflection equations don't know anything about
 the spring's solid condition, point 2 can be set to represent an impossible
 situation requiring the spring to be compressed beyond solid.  In this
 situation, the constraint on %\_AVAIL\_DEFLECT will be violated.  The
 search will attempt to resolve the conflict.
   
 Names that apply to the design of a compression spring are covered in the
 documentation section on Compression Springs.   

 Names that apply to the design of an extension spring are covered in the
 documentation section on Extension Springs.   

   

   
FORCE-DEFLECTION DIAGRAMS   

Force-Deflection diagrams are contained in the individual 
Compression Spring, Extension Spring and Torsion Spring sections.

 The remaining names used by ODOP:Spring are described in the NAMES section of
 the documentation.

   
SPRING CONSTRAINTS   
 While most of ODOP:Spring constraints are obvious, a few need a bit of
 additional explanation.  This section primarily covers constraints that are
 established in the default start point (startup).
 Remember that the user may use checkboxes and numeric entry fields to establish additional
 constraints on any variable, dependent or independent.  
 Unchecking a checkbox will eliminate any constraints, including the default constraints
 established by the start point (startup).  Further information is available in the
 documentation sections named TERMINOLOGY, CONSTRAINT OVERVIEW, SPRING BASICS
 and NAMES.
 
 This discussion is accessed by the tutorial section covering constraints.

   
 Constraints common to both compression and extension springs:

L\_STROKE MIN is a lower constraint on L\_STROKE, the length difference
between point 1 and point 2.  Refer to the force-deflection diagram in
the documentation section named FORCE-DEFLECTION DIAGRAMS for an illustration of
L\_STROKE.

ID\_FREE MIN is established by default start point (startup) because it
discourages the search from investigating designs with a zero or
negative inside diameter, and there by encountering numerical
difficulties.

FS\_2 MIN and FS\_2 MAX work together to keep the design in a reasonable
range of working stress.  FS\_2 MIN works to keep the design from being
overstressed.  FS\_2 MAX works to keep the design from being
understressed and overweight.
   
FS\_CYCLE\_LIFE is the factor of safety produced by the Soderberg cycle life
calculation.  If a design has FS\_CYCLE\_LIFE greater than 1.0, then the
combination of average stress and the fluctuating component of stress for
that design is reasonably small compared to the endurance limit.  In this
situation, an application cycling between point 1 and point 2 may expect a
life that exceeds the value selected for LIFE\_CATEGORY.  Remember that
the endurance limit will vary as a function of the material selected, the
surface treatment (shot peening), and the selected cycle life.

As described in the documentation section on CYCLE\_LIFE, ODOP:Spring is
capable of directly calculating CYCLE\_LIFE only for materials contained in
the materials table.  The FS\_CYCLE\_LIFE variable is the only way of
gaging cycle life for user defined material properties (PROP\_CALC\_METHOD =
2 and 3).

FS\_CYCLE\_LIFE MIN is a lower constraint level associated with
FS\_CYCLE\_LIFE.  A value less than 1.0 will permit designs that risk
failure in high cycle applications.
   

   
FACTOR OF SAFETY

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
permit this approach.  Refer to the section titled DESIGN TO STRESS for
additional information.

The factor of safety concept applies to both static loads and cycle life.
The calculation of FS\_CYCLE\_LIFE includes the material's endurance limit
(STRESS\_LIM\_ENDUR), plus static and fluctuating components of stress in a
calculation originally developed by Soderberg.  STRESS\_LIM\_ENDUR is
normally determined by the materials table and the user's selection of
cycle life and surface treatment (shot peening) with LIFE\_CATEGORY.  
Additional information on the cycle life calculation is
available in the documentation sections EQNSET and also in the
sources listed in the REFERENCES section.
   
Refer to additional discussion in the sections titled SPRING BASICS, NAMES
and CYCLE LIFE.  Selection of materials (and corresponding material
properties) from the ODOP:Spring materials table is covered in the MATERIALS
section and in the tutorial.

   
MATERIALS   
Materials available in the default material table supplied with ODOP:Spring
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
   
ODOP:Spring normally gets material property data from the materials table. 
This table may be altered by the user to contain material
property values that match locally available materials or individual
experience and preferences.  Thus the currently active materials table may
not match the default table described above.  Refer to the RESTRICTIONS
section of the documentation for additional information.

The way that ODOP:Spring handles material property data is dependent on the
user specified settings of the constants:  MATERIAL\_TYPE and
PROP\_CALC\_METHOD.  In general, the user may ignore these details and use
the defaults built into the program. 
Also, by selecting a MATERIAL\_TYPE, the user can establish 
material property values without too much concern for the following
discussion.  However, in the case that more control of material property
data entering the calculations is desired, the following discussion may be
useful.  Examples of these procedures are presented in tutorial section
TUTOR5.

   
The MATERIAL\_TYPE constant is a character string indicating which entry in
the material table should be used to determine material
properties and allowable stress limits.  Specifically, the term "material
properties" includes the values for DENSITY, TORSION\_MODULUS, and TENSILE.
The term "allowable stress limits" includes values for STRESS\_LIM\_STAT and
STRESS\_LIM\_ENDUR which are normally calculated based on the material
properties plus the current value of WIRE\_DIA combined with %\_TENSILE\_STAT
and %\_TENSILE\_ENDUR.

If ODOP:Spring finds a match for the current value of MATERIAL\_TYPE in the
material table, then material properties from the table will be used to
determine allowable stress limits.  If ODOP:Spring does not find a match for
MATERIAL\_TYPE, then the currently existing values for material properties
(as established by the user or default start point) will be used to
determine allowable stress limits.
   
To use a material that is not in the material table, or to use
material property values that are different than those contained in the
table, it is necessary to select an alternate setting for PROP\_CALC\_METHOD. 
After this is done, enter
any new values for TORSION\_MODULUS, TENSILE, %\_TENSILE\_STAT or
%\_TENSILE\_ENDUR.  These new values will be used calculate the allowable
stresses; STRESS\_LIM\_STAT and STRESS\_LIM\_ENDUR.

   
ODOP:Spring will treat material properties in one of three different ways
depending on the value of the constant PROP\_CALC\_METHOD.

If PROP\_CALC\_METHOD has a value of 1 (the normal default), then the
material properties are selected and allowable stresses calculated as
previously described.  Specifically, if PROP\_CALC\_METHOD has a value of 1,
ODOP:Spring will calculate the allowable stresses as a function of WIRE\_DIA.
A log-linear interpolation scheme will use the values of WIRE\_DIA, plus the
table supplied values of tensile at 0.010, tensile at 0.400,
%\_TENSILE\_STAT, and %\_TENSILE\_ENDUR to calculate new values for TENSILE,
STRESS\_LIM\_STAT and STRESS\_LIM\_ENDUR at each step in the SEARCH process.
This insures that the allowable stresses used in the factor of safety
calculations exactly match the trial values of WIRE\_DIA selected by SEARCH.

   
PROP\_CALC\_METHOD  2.  In this
situation, the user supplied values of TENSILE, %\_TENSILE\_STAT and
%\_TENSILE\_ENDUR are used to calculate the allowable stresses
STRESS\_LIM\_STAT and STRESS\_LIM\_ENDUR.

If the user selects a material that is not in the material table, 
and PROP\_CALC\_METHOD is CHANGEd to 3, then ODOP:Spring will not
modify the values of STRESS\_LIM\_STAT and STRESS\_LIM\_ENDUR in any way.
These values will remain as established in the initial start point (startup) or as set by
the user on the main page.  The values of MATERIAL\_TYPE, TENSILE,
%\_TENSILE\_STAT and %\_TENSILE\_ENDUR will be ignored.

In most cases, the user does not need to be concerned with these details.
They are necessary only to use material properties or allowable stresses
that are different from those determined by the materials table.
   
The following example illustrates how to establish a value of
TORSION\_MODULUS that is different from the value in the material table.
STRESS\_LIM\_STAT and STRESS\_LIM\_ENDUR will continue to be based on the
current values of %\_TENSILE\_STAT and %\_TENSILE\_ENDUR whether established by
the user or carried over from the values established in the materials table
or startup.  The order in which these menu items are entered is significant.

    CHANGE  MATERIAL_TYPE   USER_DEFINED
    CHANGE  TORSION_MODULUS  xxxxxxxx

The program will issue a confirming message after each menu item.
   
The same process applies to values for %\_TENSILE\_STAT and %\_TENSILE\_ENDUR.

The following example illustrates how to establish a value of
%\_TENSILE\_STAT that is different from the value in the material table.
STRESS\_LIM\_STAT and STRESS\_LIM\_ENDUR will continue to be based on the new
value of %\_TENSILE\_STAT and existing value of %\_TENSILE\_ENDUR.  The order
in which these menu items are entered is significant.

    CHANGE  MATERIAL_TYPE   USER_DEFINED
    CHANGE  %_TENSILE_STAT  xxxxxxxx

The program will issue a confirming message after each menu item.

   
 The following example illustrates how to establish values of
 TORSION\_MODULUS, STRESS\_LIM\_STAT and STRESS\_LIM\_ENDUR.  There will be no
 dependence on the WIRE\_DIA or any values from the materials table.  The
 order in which these menu items are entered is significant.

    CHANGE  MATERIAL_TYPE  USER_DEFINED
    CHANGE  PROP_CALC_METHOD  3
    CHANGE  TORSION_MODULUS   xxxxxxxx
    CHANGE  STRESS_LIM_STAT   yyyyyy
    CHANGE  STRESS_LIM_ENDUR  zzzzzz

   
The SAVE menu item will capture the complete status of the design including
the material property information.  After using the START menu item to read a
previously SAVEd design, the complete status of the design will be
restored.

Additional information on controlling the way material property data is
used in the calculations is presented in the section DESIGN TO STRESS.

   
END TYPES   
The current version of the ODOP:Spring program implements six spring end
types for compression springs and five different end types for extension
springs.  In addition, the user can define specialized end conditions.
These end types are represented by the Calculation Input END\_TYPE which
has the following possible values:

          Compression           Extension

    1     OPEN              1   FULL_LOOP
    2     OPEN&GROUND       2   75%_LOOP
    3     CLOSED            3   FULL_HOOK
    4     CLOSED&GROUND     4   75%_HOOK
    5     TAPERED_C&G       5   CLOSE_WOUND_COIL
    6     PIG-TAIL

    7     USER_SPECIFIED    6   USER_SPECIFIED

For a compression spring, the end type directly impacts calculation of
INACTIVE\_COILS.  L\_SOLID, pitch and other variables are affected
indirectly.  For an extension spring, the end type directly impacts
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
constrained in the default startup.  Thus, unless this constraint is
established, a search may produce designs that are subject to buckling.

The REPORT tabs will provide an indication as to the possibility of
bucking for each specific design and loading condition.  Both the
fixed-free and fixed-fixed end conditions are covered.

More precise treatments of this subject are available in the sources listed
in the REFERENCES section of the documentation.

   
CYCLE LIFE   
This section presents a discussion of cycle life considerations and
describes the Soderberg calculation and the ODOP:Spring interpretation of
FS\_CYCLE\_LIFE.  A discussion of hook stresses in extension springs appears in
the Extension Spring section.

ODOP:Spring provides two different approaches to the cycle life issue.  For
materials contained in the materials table (PROP\_CALC\_METHOD=1), ODOP:Spring
will calculate cycle life directly.  This calculation is based on the
"modified Goodman method".  Note that the value produced by this
calculation applies only to body coils and is only approximate.  It is
useful in comparing the relative effect of different loading conditions,
or relative performance of different designs, but you should expect results
in practice to vary widely from the cycle life value predicted.

For materials not contained in the materials table (PROP\_CALC\_METHOD=2 or
3), ODOP:Spring does not have enough information available to directly
calculate cycle life and so the CYCLE\_LIFE variable is set to zero.  In
this case, the FS\_CYCLE\_LIFE variable described here can be used to get
some indication of a design's life in a specific cyclic application.
   
The user may select 
one of eight possible combinations of "cycle life conditions" and
surface treatments (shot peening) expected in the application of the spring
being designed.  The selection is used to determine a value for %\_TENSILE\_ENDUR
from the materials table which then is applied to the
interpolated value of tensile strength for that material and wire diameter
to produce a value for the material's endurance limit (STRESS\_LIM\_ENDUR).

As illustrated in the tutorial section TUTOR4, the default start point (startup)
supplied with ODOP:Spring does not provide default constraints for CYCLE\_LIFE
or FS\_CYCLE\_LIFE.  Simply designating a LIFE\_CATEGORY 
is not enough to have ODOP:Spring search for designs with a long cycle life.
To have ODOP:Spring search for designs with a long cycle life, use menu items
such as:

    CHANGE  CYCLE_LIFE  MIN  nnnnnn
    CHANGE  FS_CYCLE_LIFE  MIN  1.0

   
FS\_CYCLE\_LIFE is the factor of safety produced in a calculation originally
developed by Soderberg.  The calculation of FS\_CYCLE\_LIFE includes the
material's endurance limit (STRESS\_LIM\_ENDUR), plus static and fluctuating
components of stress.

If a design has FS\_CYCLE\_LIFE greater than 1.0, then the combination of
average stress and the fluctuating component of stress for that design is
reasonably small compared to the endurance limit.  A life that exceeds
the value selected in LIFE\_CATEGORY may be expected in an application
cycling between point 1 and point 2.

Remember that the endurance limit will vary as a function of the material
selected, the surface treatment (shot peening), and the selected cycle
life category.

Additional information on the cycle life calculation is available in
tutorial session TUTOR4, in the documentation on EQNSET 
and also in the sources listed in the REFERENCES section.
   

   
WHAT TO DO IF   
This section is intended to anticipate some of the more common user
problems and suggest solutions.

If constraints are violated without apparent reason:   
Check for an over specified problem.  Considering that coil springs of
uniform pitch and cylindric shape are linear devices, specifying both
force and deflection at any two points will determine the spring
constant.  An additional "fix" on RATE or an active L\_STROKE MIN
constraint will then cause the problem to be over specified and it may
be impossible to find any set of independent variables that will not
violate the constraints.  There are numerous ways to over specify the
problem.  Have you found one ?

Check the buckling constraint, SLENDERNESS MAX.  If it is violated,
are you really concerned about buckling ?  The feasible region will be
substantially greater if you are willing to accept a spring that
would buckle without additional support.
   
Check fatigue life constraints, CYCLE\_LIFE and FS\_CYCLE\_LIFE.  If either
is violated, are you really concerned about fatigue life ?  The feasible
region will be somewhat larger if you are willing to accept a spring
that does not have a great cycle life.

Check for a conflict between FS\_2 MAX and another constraint such as
FS\_SOLID MIN.  The FS\_2 MAX constraint is intended to prevent the search
from stopping at an overly conservative design.  However, in some cases,
particularly where force and deflection are specified at two points, it
is not possible to find a feasible solution without increasing the value
of FS\_2 MAX.  If you find that your design violates FS\_2 MAX in addition
to other constraints, and you are willing to accept a more conservative
design, use the numeric entry field item to increase the value of FS\_2 MAX.
   
If FIXed variables do not take on the proper values:   
Confirm that you have executed a SEARCH after establishing the FIX.
Use of the SEARCH menu item is always necessary to find the appropriate
values of the independent variables so that the dependent variables take
on their FIXed values.  You may wish to review material contained in the
documentation sections named INTRO, FIX, and TERMINOLOGY.  In the case that
one or more constraints are also violated, SEARCH will find a compromise
between violations of the constraints and failure to achieve the desired
value for FIXed state variables.  The nature of this compromise is
influenced the values of the internal variables FIX\_WT, CON\_WT, and
ZERO\_WT.
   
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

