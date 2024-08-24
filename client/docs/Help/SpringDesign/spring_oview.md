# Spring Design Overview 

This section presents design process information that is common to each of the 
coil spring types supported by ODOP:Spring. 
___

For specifics, see:   
* [Advanced Spring Operations](/docs/Help/SpringDesign/advancedSpringOperations.html)   
* [Spring Materials](/docs/Help/SpringDesign/materials.html)   
* [Select Size and Select Catalog](/docs/Help/SpringDesign/selectSizeCatalog.html)
* [Spring Design References](/docs/Help/SpringDesign/references.html)   
* [Compression Spring](/docs/Help/DesignTypes/Spring/Compression/description.html)   
* [Extension Spring](/docs/Help/DesignTypes/Spring/Extension/description.html)   
* [Torsion Spring](/docs/Help/DesignTypes/Spring/Torsion/description.html)   

___

### On this page: 

 - [Spring basics](spring_oview.html#SpringBasics)  
 - [The essential challenge of spring design](spring_oview.html#tesosd)  
 - [Force-Deflection relationships](spring_oview.html#FDrelations)  
 - [Allowable stresses and Factor of Safety](spring_oview.html#asfs)  
 - [How to judge a good spring design](spring_oview.html#htjagsd)  
 - [Technique](spring_oview.html#Technique)  
 - [Names](spring_oview.html#Names)  
 - [Spring Constraints](spring_oview.html#SpringConstraints)  
 - [Constraints common to both compression and extension springs](spring_oview.html#cctbcaes)  
 - [Factor of Safety](spring_oview.html#FoS)  
 - [Materials](spring_oview.html#Materials)  
 - [End Types](spring_oview.html#EndTypes)  
 - [Cycle Life](spring_oview.html#cycleLife)  
 - [What To Do If](spring_oview.html#wtdi)  
 - [References](spring_oview.html#References)  
 - [Restrictions](spring_oview.html#Restrictions)  

___

<a id="SpringBasics"></a>  
___

## Spring basics 
 This section provides a limited amount of introductory material on spring
 design in the context of the ODOP:Spring program. 

 It is not the intent of the ODOP:Spring documentation to teach spring design. 
 The ODOP:Spring program is aimed at experienced spring designers and 
 engineers who have some background in strength of materials and failure theories. 
 The [Spring Design References](/docs/Help/SpringDesign/references.html) documentation section contains 
 a list of reference works that cover spring design. 
 This section should be read in conjunction with other sections of the 
 ODOP:Spring documentation. 
 In particular, refer to the specific spring type sections for additional details on 
 variable Names and Force-Deflection Diagrams. 
___

<a id="tesosd"></a>  
___

## The essential challenge of spring design 
The challenge of any engineering design problem is to select values for those 
parameters that are under the designer's control such that the design 
produces the desired performance. 

Even with something as simple as a coil spring, the design problem can be 
presented in dozens of different ways. 
Sometimes the problem is stated in terms that specify A, B and C, 
requiring X, Y and Z to be calculated. 
Other times the problem is stated in terms that specify X, Y and Z, 
requiring A, B and C to be calculated. 
Therefore, it is not realistic to solve the design equations for a single set of inputs and outputs. 
It is simply not possible to make all design problems fall neatly into a step by step procedure. 

ODOP:Spring approaches this characteristic of design by letting the 
designer to express what is known about the problem, 
and what needs to be achieved and then providing an 
ability for the program to search for an acceptable solution. 

In coil spring design, it is parameters like outside diameter, wire diameter, 
free length, and number of coils that are directly under the designer's control. 
Other variables like spring rate, stress, cycle life, solid 
height, initial tension or tendency to buckle are a consequence of the 
selection of the physical parameters. 
As with any design situation,
there are significant limitations on the range of values that the 
various parameters and variables can take on. 

Typically a designer can express his goals for the performance of a 
given design in terms of one-sided limitations that ODOP:Spring refers to as constraints. 
For example, the outside diameter must be less than X, 
the inside diameter greater than Y, the solid height less than Z. 

Sometimes the designer's limitations are two sided. 
For example, it may be necessary to select appropriate values for directly controlled 
parameters (wire diameter, outside diameter, number of coils) such that 
another variable (such as spring rate or length at a given load) is 
exactly equal to a specified value. 

Material properties are another good example of a designer's limitations. 
If massless, infinitely strong materials were available at negligible cost, 
spring design would be relatively easy. 
Because the range of available materials is limited and the spring properties just 
get better as the material properties improve, 
ODOP:Spring implements material properties as Calculation Inputs rather than as 
Independent Variables to be searched over. 
If material properties were allowed to vary during the search, 
the program would always select the strongest material that it could find.

In summary, the essential challenge of spring design is to take what is known 
about the problem and select values for the independent variables that 
achieve the required performance. 
If available materials will not deliver this performance, 
it is necessary to make some compromises. 
ODOP:Spring provides tools to assist in the process of making those compromises, 
but the ultimate responsibility for the design rests with the designer. 

___

<a id="FDrelations"></a>  
___

## Force-Deflection relationships 
Each of the spring type specific sections presents a Force-Deflection Diagram. 
Most of a spring design problem can be stated in terms of those diagrams. 
New users need to understand the diagram and understand 
the names that ODOP:Spring uses in order to specify a design problem. 

The vertical axis in each diagram is force. 
The horizontal axis is distance; either deflection or spring length. 
The force-deflection relationship of a cylindric coil spring of uniform pitch 
(refer to [Restrictions](/docs/Help/../About/Legal/Restrictions.html) ) 
is linear. 
The slope of the line is the spring Rate measured in force per unit deflection. 

ODOP:Spring produces information about four points on the force-deflection curve. 
As described in the What To Do If section (below), 
specifying both force and deflection for any two points will completely 
specify the force-deflection line. 
Any additional specification on Rate or one of the other points will 
over-specify the problem. 
Unless the redundant specification is exactly in line with the other values, 
the conflict will keep ODOP:Spring from finding a feasible solution. 
Consistent specification of constraints and FIX values is the responsibility of the ODOP:Spring user.

___

<a id="asfs"></a>  
___

## Allowable stresses and Factor of Safety 
ODOP:Spring can use a table of material properties to determine permissible 
stress levels for various commonly used spring materials. 
This process is described in greater detail in the section below titled MATERIALS. 
The included table of material properties contains values for 
tensile strength at two wire diameters, (.010 inch and .400 inch) 
plus conversion factors to produce estimates of allowable stresses 
for both static and cyclic (endurance) applications. 
The allowable shear stresses (Stress\_Lim\_Endur and Stress\_Lim\_Stat) are calculated 
from the tabulated values of tensile strength and the conversion factors 
(%\_Tensile\_Endur and %\_Tensile\_Stat) for each new wire diameter. 

Because allowable stresses change for each new wire diameter considered, 
ODOP:Spring works in terms of a "factor of safety". 
A factor of safety may be described as measuring "how much better 
the design is than it HAS to be". 
Specifically, factor of safety is allowable stress divided by actual stress. 
For example, if a spring is made of wire that has an allowable stress of 100,000 psi, 
when that spring supports a load that generates 50,000 psi of stress, 
the factor of safety is 2.00. 

The factor of safety concept applies to both static loads and cycle life. 
The calculation of FS\_CycleLife includes the material's endurance limit (Stress\_Lim\_Endur), 
static load and fluctuating component of stress in a calculation originally developed by Soderberg. 
Additional information on this calculation is available in the sources 
listed in [Spring Design References](/docs/Help/SpringDesign/references.html). 

Additional discussion on these topics is available in the sections 
below on [Factor Of Safety](/docs/Help/SpringDesign/spring_oview.html#FoS) and 
[Cycle Life](/docs/Help/SpringDesign/spring_oview.html#cycleLife). 

Selection of materials from the ODOP:Spring materials table is covered 
below in the [Materials](/docs/Help/SpringDesign/materials.html) section and 
in the [tutorial](/docs/Help/tutordemo.html). 

___

<a id="htjagsd"></a>  
___

## How to judge a good spring design 
The interpretation of a "good" spring design depends strongly on the intended application. 
It is possible that some applications will require a spring to operate at stress levels 
that would make it totally unsuitable for other, only slightly different applications. 

The [Report](/docs/Help/reports.html) tabs present crucial information about the 
performance of a design in a specialized, compact format. 

In general, a finished design should not have significant remaining constraint violations. 
In particular, L\_2 below L\_Solid in a compression spring is a sign of problems that 
need to be resolved. 
   
The force-deflection characteristics of a coil spring are approximately 
linear in the range of 20 to 80 % of available deflection. 
Outside this range, 
effects of end coils and non-uniform coil pitch influence the accuracy of analytical predictions. 

For compression springs, the Report tabs will produce an 
informational message any time that more than 80 % of available 
deflection (%\_Avail_Deflect) is used at the second load point. 
Note that the default start point ("Startup") supplied with ODOP:Spring has 
%\_Avail_Deflect constrained to be less than 90.0 per cent. 
Thus in the "as supplied" condition, 
ODOP:Spring will frequently select designs that produce this informational message. 

The factor of safety at point 2 should be greater than 1.0. 
Some specialized compression spring applications may require a factor of 
safety less than 1.0 in the solid condition. 
There is risk that a spring may "set" and not return to its original free length 
if deflected beyond a factor of safety of 1.0. 

If minimum weight is desired, the spring needs to operate at relatively high stresses. 
Unless the design of a compression spring is constrained 
by rate or solid height considerations, the factor of safety at point 2, 
solid and cycle life should all be close to 1.0. 
If a long cycle life is not necessary, the FS\_CycleLife may actually be less than 1.0. 
A minimum weight design should have the value of %\_Avail_Deflect close to 
the maximum value for allowable for the application. 

If low risk of failure or a long cycle life is desired, the spring 
should operate at relatively low stresses. 
The spring should have factors of safety, including FS\_CycleLife, 
that are significantly greater than 1.0. 

If a compression spring is intended for operation without lateral 
support it should have a ratio of free length to coil diameter 
(Slenderness) below approximately 4 to avoid buckling. 
Lateral support is usually provided by operation in a sleeve or over a post. 
The constraint Slenderness MAX can be used to restrict the search to designs 
that will not tend to buckle. 
Note that the value of Slenderness is not constrained in the default start point 
("Startup") and thus the search may produce designs that are prone to buckling. 
The compression spring REPORT 1 tab will provide an indication as to the 
possibility of bucking for your specific design and loading condition. 

Please review the discussion in the [Restrictions](/docs/Help/../About/Legal/Restrictions.html) 
section of the documentation to insure that you apply ODOP:Spring appropriately. 
The design equations in the current release of ODOP:Spring do NOT cover all 
possible spring applications. 

More precise treatments of this subject are available in the sources listed 
in the [Spring Design References](/docs/Help/SpringDesign/references.html) 
section of the documentation. 

___

<a id="Technique"></a>  
___

## Technique   
A typical spring design process should start by entering what is known about the problem. 
As described in more detail in the [Introduction](/docs/Help/introduction.html) 
section of the documentation, any time after starting ODOP:Spring and 
reaching the main page, a complete spring design is already defined. 
Use the numeric entry fields plus FIX checkboxes to alter that existing 
design to reflect what is known about the problem at hand. 

Entries on the View menu can be used to examine the current state of the design. 
Look at the main page multi-colored [Feasibility Indicator](/docs/Help/feasibilityIndicator.html) 
and bold red or orange values to understand which constraints are violated. 
Use the **Action : [Search](/docs/Help/search.html)** menu item 
to have ODOP:Spring select values for the free Independent Variables that reduce 
(and hopefully eliminate) constraint violations thus achieving a feasible design. 

Typically, the process of designing a completely new spring should start 
with (at least) Wire\_Dia and Coils\_T in free status. 
Once a feasible design is established, 
the **Action : Select Size** menu item can be used to select 
the nearest standard wire size from the appropriate standard sizes table. 
After the selection, an additional search should be executed to 
adjust values of the remaining Independent Variables to compensate for 
the change in Wire\_Dia. 

Additional information on operating techniques is presented in the 
documentation sections [Introduction](/docs/Help/introduction.html), 
[Getting Started](/docs/Help/gettingStarted.html) and 
[Select Size and Select Catalog](selectSizeCatalog.html). 
The [demo and tutorial sessions](/docs/Help/gettingStartedSpring.html) supplied with 
ODOP:Spring provide detailed commentary on how to solve a variety of problems. 
The tutorial section named guidedDesign is specifically constructed to support 
appropriate solution techniques. 

___

<a id="Names"></a>  
___

## Names 
 ODOP:Spring contains many kinds of names. 
 Menu item names are discussed individually in [menus](/docs/Help/menus.html). 
 Names for Independent Variables, Dependent Variables, Calculation Inputs and 
 Constraints are discussed in this section and in the specific sections covering 
 compression, extension and torsion springs. 

 In general, the names are constructed for consistency and to have common prefixes. 
 Names frequently have multiple words, or abbreviations hooked together with the 
 underscore (_) character. 
 For example, the free length is named L\_Free to be consistent with other length 
 names (L\_Solid, L\_1, and L\_2). 

 The names for Independent Variables, Dependent Variables, Calculation Inputs 
 and Properties are defined in the initialState.js file. 
 Name changes in this file carry forward to all future designs based on it. 

 The force deflection diagrams contained in the specific spring type sections 
 may assist understanding of this discussion of spring names. 
 Additional information is contained in the [Spring basics](spring_oview.html#SpringBasics) 
 section above. 
 
 ODOP:Spring produces information about four points on a spring's 
 force - deflection curve. 
 The information includes length, deflection, force, outside 
 diameter, inside diameter, stress and static factor of safety. 
 This information is listed in a compact format by the [Reports](/docs/Help/reports.html). 
 The equations assume that the spring will operate between two load points, 
 named 1 and 2, somewhere in the spring's elastic region. 
 It is entirely possible for point 1 to correspond with the spring's free state, 
 or for a compression spring, point 2 can correspond to the spring's solid condition. 
 In fact, because the force-deflection equations don't know anything about 
 the spring's solid condition, point 2 can be set to represent an impossible 
 situation requiring the spring to be compressed beyond solid. 
 In this situation, the constraint on %\_Avail_Deflect will be violated. 
 The search feature will attempt to resolve the conflict.

For specifics on names associated with each spring type, see:   
* [Compression Spring](/docs/Help/DesignTypes/Spring/Compression/description.html)   
* [Extension Spring](/docs/Help/DesignTypes/Spring/Extension/description.html)   
* [Torsion Spring](/docs/Help/DesignTypes/Spring/Torsion/description.html)   

___

<a id="SpringConstraints"></a>  
___

## Spring Constraints 
 While most of ODOP:Spring constraints are obvious, a few need a bit of additional explanation. 
 The following section covers constraints that are established in the default start point ("Startup"). 
 
 Checkboxes and numeric entry fields may be used to establish additional 
 constraints on any variable, dependent or independent. 
 Unchecking a checkbox will eliminate any constraints, including the default constraints, 
 established by the default start point ("Startup"). 
 Further information is available in the [Spring basics](spring_oview.html#SpringBasics) section above 
 and in the NAMES sections of each of the specific spring types and in 
 [Terminology](/docs/Help/terminology.html). 

___

<a id="cctbcaes"></a>  
___

## Constraints common to both compression and extension springs 

L\_Stroke MIN is a lower constraint on L\_Stroke, the length difference 
between point 1 and point 2. 
Refer to the force-deflection diagram in the documentation section for each 
specific spring type for an illustration of L\_Stroke. 

ID\_Free MIN is established by the default start point ("Startup") because it 
discourages the search from investigating designs with a zero or 
negative inside diameter, and there by encountering numerical difficulties. 

FS\_2 MIN and FS\_2 MAX work together to keep the design in a reasonable 
range of working stress. 
FS\_2 MIN works to keep the design from being overstressed. 
FS\_2 MAX works to keep the design from being understressed and overweight. 

FS\_CycleLife is the factor of safety produced by the Soderberg cycle life calculation. 
If a design has FS\_CycleLife greater than 1.0, then the 
combination of average stress and the fluctuating component of stress for 
that design is reasonably small compared to the endurance limit. 
In this situation, an application cycling between point 1 and point 2 may expect a 
life that exceeds the value selected for Life\_Category. 
Remember that the endurance limit will vary as a function of the material selected, 
the surface treatment (shot peening), and the selected cycle life. 

As described in the documentation section on [Cycle Life](spring_oview.html#cycleLife) below, 
ODOP:Spring is capable of directly calculating Cycle\_Life only for materials contained in 
the materials table. 
The FS\_CycleLife variable is the only way of gaging cycle life for user defined 
material properties (Prop\_Calc\_Method = 2 and 3). 

FS\_CycleLife MIN is a lower constraint level associated with FS\_CycleLife. 
A value less than 1.0 will permit designs that risk failure in high cycle applications. 

For additional information about Prop_Calc_Method, see:
[Spring Materials and Material Properties](/docs/Help/SpringDesign/materials.html) and
[Advanced Spring Operations](/docs/Help/SpringDesign/advancedSpringOperations.html). 

___

<a id="FoS"></a>  
___

## Factor of Safety 

                         allowable stress
    Factor of Safety =  ------------------
                         actual stress


 Factor of Safety may be interpreted as: 
"How much better this design is than it HAS to be." 

In other words, 
the Factor of Safety is a measure of how much stronger a system is than 
it needs to be for an intended load.

**Example:**   
A design with a factor of safety of 2.0 has stresses that are half of the 
allowable stresses and thus "it is twice as good as it HAS to be". 

ODOP:Spring works in terms of a "factor of safety" because allowable stresses 
change for each new wire diameter considered. 
If specific stress limits are imposed on a design, 
it is not possible to automatically adjust to higher allowable stresses 
whenever smaller wire diameters are considered by the Search process. 
Because many spring design professionals are accustomed to designing to 
specific stress limits, ODOP:Spring also permits a 
[Design to Stress](/docs/Help/SpringDesign/advancedSpringOperations.html) 
approach. 

The factor of safety concept applies to both static loads and cycle life. 
The calculation of FS\_CycleLife includes the material's endurance limit 
(Stress\_Lim\_Endur), plus static and fluctuating components of stress in a 
calculation originally developed by Soderberg. 
Stress\_Lim\_Endur is normally determined by the materials table and the 
user's selection of cycle life and surface treatment (shot peening) 
with Life\_Category. 
Additional information on the cycle life calculation is 
available in the documentation sections for the specific spring types 
and also in the resources listed in 
[Spring Design References](/docs/Help/SpringDesign/references.html). 

Refer to additional discussion in the sections titled 
[Spring basics](spring_oview.html#SpringBasics) (above), 
[Names](spring_oview.html#Names) (above and specific spring type sections) 
and [Cycle Life](spring_oview.html#cycleLife) (below). 
Selection of materials (and corresponding material properties) 
from the ODOP:Spring materials table is covered in the 
[Materials](/docs/Help/SpringDesign/materials.html) 
section (next, below) and in the [Tutorial](/docs/Help/tutordemo.html). 

See also: https://en.wikipedia.org/wiki/Factor_of_safety

___

<a id="Materials"></a>  
___

## Materials 

Refer to: [Materials](/docs/Help/SpringDesign/materials.html)   
___

<a id="EndTypes"></a>  
___

## End Types 
The current version of the ODOP:Spring program implements six spring end types 
for compression springs and five different end types for extension springs. 
In addition, the user can define specialized end conditions. 
These end types are represented by the Calculation Input End\_Type which 
has the following possible values: 

 &nbsp; | Compression | &nbsp; | &nbsp; | Extension  
 --- | ---            | ---    | --- | ---  
1    | OPEN           | &nbsp; | 1   | FULL_LOOP  
2    | OPEN&GROUND    |        | 2   |  75%_LOOP  
3    | CLOSED         |        | 3   | FULL_HOOK  
4    | CLOSED&GROUND  |        | 4   |  75%_HOOK  
5    | TAPERED_C&G    |        | 5   | CLOSE_WOUND_COIL  
6    | PIG-TAIL       |        |     |  
7    | USER_SPECIFIED |        | 6   | USER_SPECIFIED  

For a compression spring, the end type directly impacts calculation of 
Inactive\_Coils. 
L\_Solid, pitch and other variables are affected indirectly. 
For an extension spring, the end type directly impacts calculation of 
Hook\_Deflect\_All, End\_ID, Extended\_End\_ID, L\_End and L\_Extended\_End. 
Other variables are impacted indirectly. 

More detail on how to handle end types is provided in the 
documentation sections on the specific spring types:   
* [Compression Spring](/docs/Help/DesignTypes/Spring/Compression/description.html)   
* [Extension Spring](/docs/Help/DesignTypes/Spring/Extension/description.html)   
* [Torsion Spring](/docs/Help/DesignTypes/Spring/Torsion/description.html)   

Additional information on spring end types is available in the resources 
listed in [Spring Design References](/docs/Help/SpringDesign/references.html). 

___

<a id="cycleLife"></a>  
___

## Cycle Life 
This section presents a discussion of cycle life considerations and 
describes the Soderberg calculation and the ODOP:Spring interpretation of 
FS\_CycleLife. 
A discussion of hook stresses in extension springs appears in 
the Extension Spring section. 

ODOP:Spring provides two different approaches to the cycle life issue. 
For materials contained in the materials table (Prop\_Calc\_Method=1), 
ODOP:Spring will calculate cycle life directly. 
This calculation is based on the "modified Goodman method". 
Note that the value produced by this calculation applies only to body coils 
and is only approximate. 
It is useful in comparing the relative effect of different loading conditions, 
or relative performance of different designs, 
but you should expect results in practice to vary widely from the 
cycle life value predicted. 

For more information, 
see: [Goodman relation](https://en.wikipedia.org/wiki/Goodman_relation) 

For materials not contained in the materials table (Prop\_Calc\_Method=2 or 3), 
ODOP:Spring does not have enough information available to directly 
calculate cycle life and so the Cycle\_Life variable is set to zero. 
In this case, the FS\_CycleLife variable described here can be used to get 
some indication of a design's life in a specific cyclic application. 

Use the Calculation Input Life\_Category to select one of eight possible 
combinations of "cycle life conditions" and surface treatments (shot peening) 
expected in the application of the spring being designed. 
The selection is used to determine a value for %\_Tensile\_Endur 
from the materials table which then is applied to the 
interpolated value of tensile strength for that material and wire diameter 
to produce a value for the material's endurance limit (Stress\_Lim\_Endur). 

As illustrated in the tutorial section TUTOR4, the default start point ("Startup") 
supplied with ODOP:Spring does not provide default constraints for Cycle\_Life 
or FS\_CycleLife. 
Simply designating a Life\_Category is not enough to have ODOP:Spring search 
for designs with a long cycle life. 
To have ODOP:Spring search for designs with a long cycle life, 
alter constraint values such as: 

    CHANGE  Cycle_Life  MIN  nnnnnn
    CHANGE  FS_CycleLife  MIN  1.0

FS\_CycleLife is the factor of safety produced in a calculation originally 
developed by Soderberg. 
The calculation of FS\_CycleLife includes the material's endurance limit 
(Stress\_Lim\_Endur), plus static and fluctuating components of stress. 

If a design has FS\_CycleLife greater than 1.0, then the combination of 
average stress and the fluctuating component of stress for that design is 
reasonably small compared to the endurance limit. 
A life that exceeds the value selected in Life\_Category may be expected in an application 
cycling between point 1 and point 2. 

Remember that the endurance limit will vary as a function of the material 
selected, the surface treatment (shot peening), and the selected cycle 
life category. 

Additional information on the cycle life calculation is available in 
tutorial session TUTOR4, in the documentation on the specific spring types 
and also in the resources listed in [Spring Design References](/docs/Help/SpringDesign/references.html). 

___

<a id="wtdi"></a>  
___
   
## What To Do If 
This section is intended to anticipate some of the more common user 
problems and suggest solutions. 

#### If constraints are violated without apparent reason: 
Check for an over specified problem. 
Considering that coil springs of uniform pitch and cylindric shape 
have a linear relationship between force and deflection, 
specifying both force and deflection at any two points will determine 
the spring constant. 
An additional "fix" on Rate or an active L\_Stroke MIN 
constraint will then cause the problem to be over specified and it may 
be impossible to find any set of independent variables that will not 
violate the constraints. 
There are numerous ways to over specify the problem. 
Have you found one ? 

#### Check the buckling constraint, Slenderness MAX. 
If it is violated, are you really concerned about buckling ? 
The feasible region will be substantially greater if you are willing 
to accept a spring that would buckle without additional support. 

#### Check fatigue life constraints, Cycle\_Life and FS\_CycleLife. 
If either is violated, are you really concerned about fatigue life ? 
The feasible region will be somewhat larger if you are willing to 
accept a spring that does not have a great cycle life. 

#### Check for a conflict between FS\_2 MAX and another constraint such as FS\_Solid MIN. 
The FS\_2 MAX constraint is intended to prevent the search 
from stopping at an overly conservative design. 
However in some cases, 
particularly where force and deflection are specified at two points, 
it is not possible to find a feasible solution without increasing the value 
of FS\_2 MAX. 
If you find that your design violates FS\_2 MAX in addition to other constraints, 
and you are willing to accept a more conservative design, 
increase the value of FS\_2 MAX or disable the constraint entirely. 

#### If FIXed variables do not take on the proper values: 
Confirm that you have executed a Search after establishing the FIX. 
Use of the Search menu item is always necessary to find the appropriate 
values of the independent variables so that the dependent variables take 
on their FIXed values. 
You may wish to review material contained in the documentation sections 
[Introduction](/docs/Help/introduction.html), and 
[Terminology](/docs/Help/terminology.html). 
In the case that one or more constraints are also violated, 
Search will find a compromise between violations of the constraints and 
failure to achieve the desired value for FIXed state variables. 
The nature of this compromise is influenced the values of the internal 
variables **(File : Preferences)** FIX\_WT, CON\_WT, and ZERO\_WT. 

#### If the program terminates abnormally: 
If you can repeat the problem, please report it. 
Follow the procedures provided at 
[Contact Us](/docs/About/ContactUs.html). 

#### If the results appear to be wrong: 
ODOP:Spring is constantly undergoing improvement. 
In spite of years of field experience with the underlying solution techniques 
and a considerable amount of testing and verification, 
there is always a possibility of error. 
Please review the [Restrictions](/docs/Help/../About/Legal/Restrictions.html) 
section of documentation. 
Review the material properties. 
Check the inconsistency with another design method (hand calculator, spreadsheet 
calculation, etc.). 
If the problem remains unresolved, please report it. 
Follow the procedures provided at 
[Contact Us](/docs/About/ContactUs.html). 

___

<a id="References"></a>  
___

## References 

Refer to: [Spring Design References](/docs/Help/SpringDesign/references.html)

___

<a id="Restrictions"></a>  
___

## Restrictions 

Refer to: [Restrictions](/docs/Help/../About/Legal/Restrictions.html)

___

&nbsp;

[Spring Design Topics](/docs/Help/SpringDesign/index.html)   
[Help](/docs/Help/index.html)   

