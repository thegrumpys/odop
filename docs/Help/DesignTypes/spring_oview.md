#### Spring Design Overview

This section presents design process information that is common to each of the
coil spring types supported by ODOP:Spring.

For specifics, see:   
* [Advanced Spring Operations](./advancedSpringOperations)   
* [Compression Spring](./c_spring)   
* [Extension Spring](./e_spring)   
* [Torsion Spring](./t_spring)   

**SPRING BASICS**   
 This section provides a limited amount of introductory material on spring
 design in the context of the ODOP:Spring program.

 It is not the intent of the ODOP:Spring documentation to teach spring
 design.  The ODOP:Spring program is aimed at experienced spring designers and
 engineers who have some background in strength of materials and failure
 theories.  The REFERENCES documentation section (below) contains a list of
 reference works that cover spring design.  This section should be read in
 conjunction with other sections of the ODOP:Spring documentation.  In
 particular, refer to the specific spring type sections for additional details on
 variable NAMES and Force-Deflection Diagrams.

**The essential challenge of spring design:**   
The challenge of any design problem is to select values for those
parameters that are under the designer's control such that the design
produces the desired performance.

Even with something as simple as a coil spring, the design problem can be
presented in dozens of different ways.  Sometimes the problem is stated
in terms that specify A, B and C, requiring X, Y and Z to be calculated.
Other times the problem is stated in terms that specify X, Y and Z,
requiring A, B and C to be calculated.  Therefore, it is not realistic to
solve the design equations for a single set of inputs and outputs.  It
is simply not possible to make all design problems fall neatly into a 
step by step procedure.

ODOP:Spring approaches this characteristic of design by letting the
designer to express what is known about the problem, 
and what needs to be achieved and then providing an
ability for the program to search for an acceptable solution.

In coil spring design, it is parameters like outside diameter, wire diameter,
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
negligible cost, spring design would be relatively easy.  Because the
range of available materials is limited and the spring properties just
get better as the material properties improve, ODOP:Spring implements
material properties as Calculation Inputs rather than as Independent Variables to
be searched over.  If material properties were allowed to vary during
the search, the program would always select the strongest material that
it could find.

In summary, the essential challenge of spring design is to take what is known
about the problem and select values for the independent variables that
achieve the required performance.  If available materials will not
deliver this performance, it is necessary to make some compromises.
ODOP:Spring provides tools to assist in the process of making those
compromises, but the ultimate responsibility for the design rests with
the designer.

   
**Force-Deflection relationships:**   
Each of the spring type specific sections presents a Force-Deflection Diagram. 
Most of a spring design problem can be stated in terms of those diagrams. 
New users need to understand the diagram and understand
the names that ODOP:Spring uses in order to specify a design problem.

The vertical axis in each diagram is force.  The horizontal axis is
distance; either deflection or spring length.  The force-deflection
relationship of a cylindric coil spring of uniform pitch 
(refer to [Restrictions](../../About/Legal/Restrictions) ) is linear. 
The slope of the line is the spring RATE measured in force per unit deflection.

ODOP:Spring produces information about
four points on the force-deflection curve.  As described in the
WHAT TO DO IF section (below), specifying both force and deflection 
for any two points will completely specify the force-deflection line. 
Any additional specification on RATE or one of the other points will over
specify the problem.  Unless the redundant specification is exactly in
line with the other values, the conflict will keep ODOP:Spring from
finding a feasible solution.  Consistent specification of constraints
and FIX values is the responsibility of the ODOP:Spring user.
   
**Allowable stresses and Factor of Safety**   
ODOP:Spring can use a table of material properties to determine permissible
stress levels for various commonly used spring materials. 
This process is described in greater detail in the section below titled
MATERIALS.  The included table of material properties contains
values for tensile strength at two wire diameters, (.010 inch and .400
inch) plus conversion factors to produce estimates of allowable stresses
for both static and cyclic (endurance) applications.  The allowable
shear stresses (Stress\_Lim\_Endur and Stress\_Lim\_Stat) are calculated
from the tabulated values of tensile strength and the conversion factors
(%\_Tensile\_Endur and %\_Tensile\_Stat) for each new wire diameter.

Because allowable stresses change for each new wire diameter considered,
ODOP:Spring works in terms of a "factor of safety".  A factor of safety
may be described as measuring "how much better the design is than it HAS
to be".  Specifically, factor of safety is allowable stress divided by
actual stress.  For example, if a spring is made of wire that has an
allowable stress of 100,000 psi, when that spring supports a load that
generates 50,000 psi of stress, the factor of safety is 2.00.
   
The factor of safety concept applies to both static loads and cycle
life.  The calculation of FS\_CycleLife includes the material's
endurance limit (Stress\_Lim\_Endur), static load and fluctuating
component of stress in a calculation originally developed by Soderberg.
Additional information on this calculation is available in the sources
listed in the REFERENCES section.

Additional discussion on these topics is available in the sections
below titled FACTOR OF SAFETY and CYCLE LIFE.

Selection of materials from the ODOP:Spring materials table is covered 
below in the MATERIALS section and in the tutorial.

   
**How to judge a good spring design:**   
The interpretation of a "good" spring design depends strongly on the
intended application.  It is possible that some applications will
require a spring to operate at stress levels that would make it totally
unsuitable for other, only slightly different applications.

The REPORT tabs present crucial information about the performance of
a design in a specialized, compact format.

In general, a finished design should not have significant remaining
constraint violations.  In particular, L\_2 below L\_Solid in a
compression spring is a sign of problems that need to be resolved.
   
The force-deflection characteristics of a coil spring are approximately
linear in the range of 20 to 80 % of available deflection.  Outside this
range, effects of end coils and nonuniform coil pitch influence the
accuracy of analytical predictions.

For compression springs, the REPORT 2 tab will produce an
informational message any time that more than 80 % of available
deflection (%\_Avail_Deflect) is used at the second load point.  Note
that the default start point (startup) supplied with ODOP:Spring has
%\_Avail_Deflect constrained to be less than 90.0, thus in the "as
supplied" condition, ODOP:Spring will frequently select designs that
produce this informational message.
   
The factor of safety at point 2 should be greater than 1.0.  Some
specialized compression spring applications may require a factor of
safety less than 1.0 in the solid condition.  A spring will "set" and
not return to the original free length if deflected beyond a factor of
safety of 1.0.

If minimum weight is desired, the spring needs to operate at relatively
high stresses.  Unless the design of a compression spring is constrained
by rate or solid height considerations, the factor of safety at point 2,
solid and cycle life should all be close to 1.0.  If a long cycle life
is not necessary, the FS\_CycleLife may actually be less than 1.0.  A
minimum weight design should have the value of %\_Avail_Deflect close to
the maximum value for allowable for the application.

If low risk of failure or a long cycle life is desired, the spring
should operate at relatively low stresses.  The spring should have
factors of safety, including FS\_CycleLife, that are significantly
greater than 1.0.
   
If a compression spring is intended for operation without lateral
support it should have a ratio of free length to coil diameter
(Slenderness) below approximately 4 to avoid buckling.  Lateral support
is usually provided by operation in a sleeve or over a post.  The
constraint Slenderness MAX can be used to restrict the search to designs
that will not tend to buckle.  Note that the value of Slenderness is not
constrained in the default start point (startup) and thus the search may produce
designs that are prone to buckling. 
The compression spring REPORT 1 tab will provide an
indication as to the possibility of bucking for your specific design and
loading condition.

Please review the discussion in the [Restrictions](../../About/Legal/Restrictions) 
section of the documentation to insure that you apply ODOP:Spring appropriately. 
The design equations in the current release of ODOP:Spring do NOT cover all
possible spring applications.

More precise treatments of this subject are available in the sources
listed in the REFERENCES section of the documentation (below).

   
**Technique:**   
A typical spring design process should start by entering what is known
about the problem.  As described in more detail in the [INTRODUCTION](../introduction) 
section of the documentation, any time after starting ODOP:Spring and
reaching the main page, a complete spring design is already defined.  
Use the numeric entry fields plus FIX checkboxess to alter that existing
design to reflect what is known about the problem at hand.

The main page and REPORT tabs can be used to
view the current state of the design.  The main page will show which
constraints are violated.  Use the [SEARCH](../search) menu item to have ODOP:Spring
select values for the free independent variables that reduce (and
hopefully eliminate) constraint violations thus achieving a feasible
design.

Typically, the process of designing a completely new spring should start
with (at least) Wire\_Dia and Coils\_T in free status.  Once a feasible
design is established, the SELECT SIZE menu item can be used to select
the nearest standard wire size from the appropriate standard sizes
table.  After the selection, an additional search should be executed to
adjust values of the remaining independent variables to compensate for
the change in Wire\_Dia.
   
Additional information on operating techniques is presented in the
documentation sections [Introduction](../introduction) and 
[GETTING STARTED](../gettingStarted). 
The demo and tutorial sessions supplied with ODOP:Spring provide detailed 
commentary on how to solve a variety of problems.

   
**REFERENCES**   
 There are many excellent sources of information on spring design.  Several
 on the following list were consulted in the development of the ODOP:Spring
 program.  No single source contains a comprehensive set of equations and/or
 material property values found in ODOP:Spring.  The references are presented
 in alphabetical order by title.

    Design Handbook - Engineering Guide to Spring Design
    Form no. 515  
    Copyright 1981,  Library of Congress Number 81-67959
    Associated Spring - Barnes Group Inc.
    18 Main St.
    Bristol, Ct.   06010
    203-582-9581

    Design of Machine Elements   (sixth edition, 1985)
    M. F. Spotts
    Prentice-Hall, Inc.  Englewood Cliffs, N.J.

    Handbook of Spring Design
    Copyright 1981   ISBN 00-9604120-0-8
    Spring Manufacturer's Institute Inc.   
    380 West Palatine Rd.
    Wheeling, IL.  60090
    312-520-3290
   
    Machinery's Handbook
    ISBN  0-8311-1155-0
    Industrial Press Inc.   
    200 Madison Ave.,   
    New York, NY  10157  

    Mark's Standard Handbook for Mechanical Engineers
    ISBN  0-07-004123-7
    McGraw-Hill Book Co, Inc.   New York, N.Y.

    Mechanical Design Analysis
    M. F. Spotts
    Prentice-Hall, Inc.  
    Englewood Cliffs, N.J.
    Copyright 1964, 
    Library of Congress Number 64-18626

    Mechanical Springs    (second edition, 1963)
    A. M. Wahl
    McGraw-Hill Book Co, Inc.   New York, N.Y.

    Roark's Formulas for Stress and Strain
   
    Spring Designer's Handbook
    Harold Carlson
    Marcel Dekker, Inc.  
    270 Madison Ave., New York, NY  10016
    Copyright 1978,  
    Library of Congress Number 77-27436  TJ210.C37

 A list of "Useful Publications for Spring Makers" appears in the May 1985
 issue of "Springs, The Magazine of Spring Technology" published by:

    Spring Manufacturer's Institute Inc.
    380 West Palatine Rd.    
    Wheeling, IL.  60090    
    312-520-3290
   
**RESTRICTIONS**   

Refer to: [Restrictions](../../About/Legal/Restrictions)
   
**NAMES**   
 ODOP:Spring contains many kinds of names.  Menu item names are discussed
 individually in the later sections of the documentation.  Names for independent
 variables, dependent variables, constants and constraints are discussed
 in this section and in the specific sections on compression, extension and torsion
 springs.

 In general, the names are constructed for consistency and to have common
 prefixes.  Names frequently have multiple words,
 or abbreviations hooked together with the underscore (_) character.  For
 example, the free length is named L\_Free to be consistent with other length
 names (L\_Solid, L\_1, and L\_2). 

 The names for Independent Variables, Dependent Variables, Calculation Inputs 
 and Properties are defined in the initialState.js file.  
 Changes in this file can change names for all future designs based on it. 
   
 The force deflection diagrams contained in the specific spring type sections 
 may assist understanding of the following discussion.  Additional
 information is contained in the section (above) titled SPRING BASICS.

 ODOP:Spring produces information about four points on a compression spring's
 force - deflection curve.  Three points are analyzed for an extension
 spring.  This information includes length, deflection, force, outside
 diameter, inside diameter, stress and static factor of safety.  This
 information is listed in a compressed format by the REPORT tabs.  The
 equations assume that the spring will operate between two load points, named 1
 and 2, somewhere in the spring's elastic region.  It is entirely possible
 for point 1 to correspond with the spring's free state, or for a
 compression spring, point 2 can correspond to the spring's solid condition.
 In fact, because the force-deflection equations don't know anything about
 the spring's solid condition, point 2 can be set to represent an impossible
 situation requiring the spring to be compressed beyond solid.  In this
 situation, the constraint on %\_Avail_Deflect will be violated.  The
 search will attempt to resolve the conflict.
   
For specifics on names associated with each spring type, see:   
* [Compression Spring](./c_spring)   
* [Extension Spring](./e_spring)   
* [Torsion Spring](./t_spring)   
   
**SPRING CONSTRAINTS**   
 While most of ODOP:Spring constraints are obvious, a few need a bit of
 additional explanation.  This section primarily covers constraints that are
 established in the default start point (startup).
 Remember that the user may use checkboxes and numeric entry fields to establish additional
 constraints on any variable, dependent or independent.  
 Unchecking a checkbox will eliminate any constraints, including the default constraints
 established by the start point (startup).  Further information is available in the
 documentation sections SPRING BASICS (above), the
 NAMES sections of each of the specific spring types and
 [Terminology](../terminology).
   
**Constraints common to both compression and extension springs:**

L\_Stroke MIN is a lower constraint on L\_Stroke, the length difference
between point 1 and point 2.  Refer to the force-deflection diagram in
the documentation section for each specific spring type for an illustration of
L\_Stroke.

ID\_Free MIN is established by the default start point (startup) because it
discourages the search from investigating designs with a zero or
negative inside diameter, and there by encountering numerical
difficulties.

FS\_2 MIN and FS\_2 MAX work together to keep the design in a reasonable
range of working stress.  FS\_2 MIN works to keep the design from being
overstressed.  FS\_2 MAX works to keep the design from being
understressed and overweight.
   
FS\_CycleLife is the factor of safety produced by the Soderberg cycle life
calculation.  If a design has FS\_CycleLife greater than 1.0, then the
combination of average stress and the fluctuating component of stress for
that design is reasonably small compared to the endurance limit.  In this
situation, an application cycling between point 1 and point 2 may expect a
life that exceeds the value selected for Life\_Category.  Remember that
the endurance limit will vary as a function of the material selected, the
surface treatment (shot peening), and the selected cycle life.

As described in the documentation section on CYCLE LIFE (below), ODOP:Spring is
capable of directly calculating Cycle\_Life only for materials contained in
the materials table.  The FS\_CycleLife variable is the only way of
gaging cycle life for user defined material properties (Prop\_Calc\_Method =
2 and 3).

FS\_CycleLife MIN is a lower constraint level associated with
FS\_CycleLife.  A value less than 1.0 will permit designs that risk
failure in high cycle applications.
   

   
**FACTOR OF SAFETY**

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
also permit this approach. 
Refer to [Design to Stress](./advancedSpringOperations) for additional information.

The factor of safety concept applies to both static loads and cycle life.
The calculation of FS\_CycleLife includes the material's endurance limit
(Stress\_Lim\_Endur), plus static and fluctuating components of stress in a
calculation originally developed by Soderberg.  Stress\_Lim\_Endur is
normally determined by the materials table and the user's selection of
cycle life and surface treatment (shot peening) with Life\_Category.  
Additional information on the cycle life calculation is
available in the documentation sections for the specific spring types
and also in the sources listed in the REFERENCES section (above).
   
Refer to additional discussion in the sections titled SPRING BASICS (above), 
NAMES (above and specific spring type sections) and CYCLE LIFE (below).  
Selection of materials (and corresponding material properties) 
from the ODOP:Spring materials table is covered in the MATERIALS
section (next, below) and in the tutorial.

   
**MATERIALS**   
Spring wire and bar materials available in the default material table supplied 
with ODOP:Spring include:

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

   
By default, ODOP:Spring gets material property data from the materials table. 
Alternate material tables may be provided to contain material
property values that match locally available materials or individual
experience and preferences.  Thus the currently active materials table may
not match the default table described above. 
Refer to the [Restrictions](../../About/Legal/Restrictions)
section of the documentation for additional information.

The way that ODOP:Spring handles material property data is dependent on the
user specified settings of the Calculation Inputs:  Material\_Type and
Prop\_Calc\_Method. 
Note that by default, when using a material selected from the materials table,
allowable stresses are calculated as a function of wire diameter.
In general, the user may ignore these details and use
the defaults built into the program. 
Establish material property values simply by selecting a Material\_Type. 
In the case that more control of material property data entering 
the calculations is desired, the details provided in 
[Prop_Calc_Method](./advancedSpringOperations) and 
[Materials](./materials) may be useful. 

Examples of these procedures are presented in tutorial section TUTOR5.

   
**END TYPES**   
The current version of the ODOP:Spring program implements six spring end
types for compression springs and five different end types for extension
springs.  In addition, the user can define specialized end conditions.
These end types are represented by the Calculation Input End\_Type which
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
Inactive\_Coils.  L\_Solid, pitch and other variables are affected
indirectly.  For an extension spring, the end type directly impacts
calculation of Hook\_Deflect\_All, End\_ID, Extended\_End\_ID, L\_End and
L\_Extended\_End.  Other variables are impacted indirectly.

More detail on how to handle end types is provided in the
documentation sections on the specific spring types:   
* [Compression Spring](./c_spring)   
* [Extension Spring](./e_spring)   
* [Torsion Spring](./t_spring)   

Additional information on spring end types is available in the sources listed
in the REFERENCES section of the documentation (above).

   
**CYCLE LIFE**   
This section presents a discussion of cycle life considerations and
describes the Soderberg calculation and the ODOP:Spring interpretation of
FS\_CycleLife.  A discussion of hook stresses in extension springs appears in
the Extension Spring section.

ODOP:Spring provides two different approaches to the cycle life issue.  For
materials contained in the materials table (Prop\_Calc\_Method=1), ODOP:Spring
will calculate cycle life directly.  This calculation is based on the
"modified Goodman method".  Note that the value produced by this
calculation applies only to body coils and is only approximate.  It is
useful in comparing the relative effect of different loading conditions,
or relative performance of different designs, but you should expect results
in practice to vary widely from the cycle life value predicted.

For materials not contained in the materials table (Prop\_Calc\_Method=2 or
3), ODOP:Spring does not have enough information available to directly
calculate cycle life and so the Cycle\_Life variable is set to "NaN", 
an abbreviation for "Not a Number". 
In this case, the FS\_CycleLife variable described here can be used to get
some indication of a design's life in a specific cyclic application.
   
The user may user the Calculation Input Life\_Category to select 
one of eight possible combinations of "cycle life conditions" and
surface treatments (shot peening) expected in the application of the spring
being designed.  The selection is used to determine a value for %\_Tensile\_Endur
from the materials table which then is applied to the
interpolated value of tensile strength for that material and wire diameter
to produce a value for the material's endurance limit (Stress\_Lim\_Endur).

As illustrated in the tutorial section TUTOR4, the default start point (startup)
supplied with ODOP:Spring does not provide default constraints for Cycle\_Life
or FS\_CycleLife.  Simply designating a Life\_Category 
is not enough to have ODOP:Spring search for designs with a long cycle life.
To have ODOP:Spring search for designs with a long cycle life, 
alter constraint values such as:

    CHANGE  Cycle_Life  MIN  nnnnnn
    CHANGE  FS_CycleLife  MIN  1.0
   
FS\_CycleLife is the factor of safety produced in a calculation originally
developed by Soderberg.  The calculation of FS\_CycleLife includes the
material's endurance limit (Stress\_Lim\_Endur), plus static and fluctuating
components of stress.

If a design has FS\_CycleLife greater than 1.0, then the combination of
average stress and the fluctuating component of stress for that design is
reasonably small compared to the endurance limit.  A life that exceeds
the value selected in Life\_Category may be expected in an application
cycling between point 1 and point 2.

Remember that the endurance limit will vary as a function of the material
selected, the surface treatment (shot peening), and the selected cycle
life category.

Additional information on the cycle life calculation is available in
tutorial session TUTOR4, in the documentation on the specific spring types 
and also in the sources listed in the REFERENCES section (above).
   
   
**WHAT TO DO IF**   
This section is intended to anticipate some of the more common user
problems and suggest solutions.

If constraints are violated without apparent reason:   
Check for an over specified problem.  Considering that coil springs of
uniform pitch and cylindric shape are linear devices, specifying both
force and deflection at any two points will determine the spring
constant.  An additional "fix" on RATE or an active L\_Stroke MIN
constraint will then cause the problem to be over specified and it may
be impossible to find any set of independent variables that will not
violate the constraints.  There are numerous ways to over specify the
problem.  Have you found one ?

Check the buckling constraint, Slenderness MAX.   
If it is violated, are you really concerned about buckling ? 
The feasible region will be
substantially greater if you are willing to accept a spring that
would buckle without additional support.
   
Check fatigue life constraints, Cycle\_Life and FS\_CycleLife.  If either
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
documentation sections  [Introduction](../introduction), and 
[Terminology](../terminology). 
In the case that
one or more constraints are also violated, SEARCH will find a compromise
between violations of the constraints and failure to achieve the desired
value for FIXed state variables.  The nature of this compromise is
influenced the values of the internal variables (File : Preferences) 
FIX\_WT, CON\_WT, and ZERO\_WT.
   
If the program terminates abnormally:   
If you can repeat the problem, please report it via the procedures
for opening an issue on GitHub.

If the results appear to be wrong:   
ODOP:Spring is constantly undergoing improvement.  In spite of years of
field experience with the underlying solution techniques and 
a considerable amount of testing and verification,
there is always a possibility of error.  
Please review the [Restrictions](../../About/Legal/Restrictions)
section of documentation.  Review the material properties.  Check the
inconsistency with another design method (hand calculator, spreadsheet
calculation, etc.).  If the problem remains unresolved, please report it
via the procedures for opening an issue on GitHub.

