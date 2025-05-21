# Spring Alerts &nbsp; 

Alerts common to all round-wire coil springs 

### On this page:   
 - [OD_Free exactly twice Wire_Dia](alerts.html#OD2xWire_Dia)  
 - [OD_Free equal to Wire_Dia](alerts.html#OD_eq_Wire_Dia)  
 - [Wire_Dia > ID_Free](alerts.html#Wire_Dia_GT_ID_Free)  
 - [Wire_Dia Non-standard](alerts.html#Wire_Dia_Non_Std)  
 - [Material properties for this Wire_Dia may not be accurate](alerts.html#MatPropAccuracy)  
 - [FS_CycleLife MIN not set](alerts.html#FS_CycleLife_MIN_not_set)  
 - [Over-design concern](alerts.html#OverDesign)  
 - [Coils_A is less than 1](alerts.html#Coils_A_LT_1)  
 - [Spring Index manufacturability concern](alerts.html#SI_manufacturability)  
 - [Cycle_Life calculation is not available](alerts.html#Cycle_LifeNA)  
 - [Cycle_Life not defined beyond yield](alerts.html#Cycle_LifeNA_FS_2)  
 - [Cycle_Life value is extrapolated](alerts.html#Cycle_LifeExtrapolated)  
 - [Over specification concern; Both OD and ID are fixed](alerts.html#OD_ID_BothFixed)  
 - [Default constraint not enabled](alerts.html#DefaultConstraint)  
 - [Value of Tensile is suspect](alerts.html#TensileValueSuspect)  

___

<a id="OD2xWire_Dia"></a>  
___

Alert entry #S51
##  Outside diameter is exactly twice wire diameter
This situation creates numerical difficulties. 
In mathematics, this is sometimes referred to as a "[pathological](https://en.wikipedia.org/wiki/Pathological_(mathematics))" case.  

To resolve this Alert, increase the value of OD_Free and / or decrease the value of Wire_Dia. 
To achieve a feasible design, continue increasing OD_Free and decreasing Wire_Dia until 
Spring_Index achieves a value within the range of [manufacturability](alerts.html#SI_manufacturability). 

With round wire helical coil springs, 
the case where coil outside diameter (OD_Free) is exactly twice the wire diameter (Wire_Dia) creates numerical problems. 
In this situation, the inside diameter (ID_Free) is exactly zero and the spring index (Spring_Index) is exactly one. 
That value of Spring_Index results in a divide-by-zero problem in the calculation of the Wahl curvature correction factor (kc). 
The result of infinity then propagates through dependent equations. 
Subsequent operations like subtraction of infinities create values of NaN (Not a Number) 
which propagate to additional dependent equations.  

The Search feature may or may not be successful in finding a solution when its start point has such numerical difficulties.  

See also:
 - [Spring index manufacturability concern](alerts.html#SI_manufacturability)  
 - [NaN](/docs/Help/htt.html#nan)  
 - [Wikipedia NaN](https://en.wikipedia.org/wiki/NaN)  
 - [Wikipedia Pathological](https://en.wikipedia.org/wiki/Pathological_(mathematics))  

___

<a id="OD_eq_Wire_Dia"></a>  
___

Alert entry #S52
##  Outside diameter exactly equals wire diameter
This situation creates numerical difficulties.
In mathematics, this is sometimes referred to as a "[pathological](https://en.wikipedia.org/wiki/Pathological_(mathematics))" case.

To resolve this Alert, increase the value of OD_Free and / or decrease the value of Wire_Dia. 
To achieve a feasible design, continue increasing OD_Free and decreasing Wire_Dia until 
Spring_Index achieves a value within the range of [manufacturability](alerts.html#SI_manufacturability). 

With round wire helical coil springs, 
the case where coil outside diameter (OD_Free) is exactly equal the wire diameter (Wire_Dia) creates numerical problems. 
In this situation, the mean diameter (Mean_Dia) and spring index (Spring_Index) are both exactly zero, 
creating a divide-by-zero problem in the calculations. 
The result of infinity then propagates through dependent equations. 
Subsequent operations like subtraction of infinities create values of NaN (Not a Number) 
which propagate to additional dependent equations.  

The Search feature may or may not be successful in finding a solution when its start point has such numerical difficulties.  

See also:
 - [Spring index manufacturability concern](alerts.html#SI_manufacturability)  
 - [NaN](/docs/Help/htt.html#nan)  
 - [Wikipedia NaN](https://en.wikipedia.org/wiki/NaN)  
 - [Wikipedia Pathological](https://en.wikipedia.org/wiki/Pathological_(mathematics))  

___

<a id="Wire_Dia_GT_ID_Free"></a>  
___

Alert entry #S53
## Wire_Dia > ID_Free 
The wire diameter (Wire_Dia) is greater than the coil inside diameter (ID_Free).

Most spring wire is not ductile enough to be wound this tightly. 

Resolve this alert by increasing the value of the variable controlling coil diameter
(OD_Free, Mean_Dia or ID_Free) or decreasing the value of Wire_Dia. 

Alternatively, confirm that the Spring_Index MIN constraint is enabled at a constraint level of 4 or greater 
and run Search (menu **Action : Search** or the Search button). 

Before finalizing a design that has this alert outstanding, 
check with the spring manufacturer regarding capabilities and costs. 

___

<a id="Wire_Dia_Non_Std"></a>  
___

Alert entry #S54
## Wire_Dia Non-standard 
The current value of wire diameter (Wire_Dia) is not a standard (preferred) value for the selected material.  

Multiple standard wire size tables are built-in to the ODOP:Spring software.
 - A single table provides standard metric sizes for all materials. 
 - When working in US Customary units, different materials have unique standard wire size tables.  

### Accessing Standard Wire Sizes  
### - When Auto Std-Size is enabled: 
{Note: Further details will be provided once the code implementation is complete.}

### - When Auto Std-Size is disabled: 
 - **Advanced View**: Access the standard-size table through the Action : Select Size... menu. 
 - **Calculator View**: Click on the Wire_Dia field to display a modal dialog box that provides a 
 drop-down selection of standard wire sizes available for the selected material.  

### Historical Background in Wire Gauging  
In the United States, the evolution of standard or preferred wire sizes began in the early 19th century 
when pioneering manufacturers like Washburn and Moen played a key role in establishing standardized practices for wire production. 
Founded in the 1830s, these companies not only manufactured wire for telegraphy and later for barbed wire 
but also helped define the sizes and tolerances that eventually became known as the Washburn and Moen gauge. 
In parallel, around the same time, an almost identical system — later known as the Roebling wire gauge 
(or sometimes the American Steel Wire Gauge) — emerged. 
In essence, the “Moen & Washburn” gauges and the Roebling gauge refer to the same set of nominal sizes and tolerances.   

### Economic and Practical Incentives for Standard (preferred) Wire Sizes  
1. **Availability and Lead Time**: 
Standard wire sizes are readily available off-the-shelf from suppliers. 
Custom diameters often require special manufacturing runs, leading to longer lead times and potential project delays.  
2. **Cost Efficiency**: 
Standard wire is mass-produced, so it benefits from economies of scale, making it significantly cheaper per unit. 
Custom diameters involve tooling changes or special orders, increasing material and production costs.  
3. **Manufacturing Simplicity**: 
Spring manufacturing equipment is calibrated for standard wire sizes. 
Using custom diameters can require retooling or recalibration, increasing complexity, labor, and risk of errors.  
4. **Design Resources and Predictability**: 
Standard wire sizes have well documented material properties and are supported by existing design tables, software, and handbooks. 
Custom sizes may require additional testing or validation.  
5. **Repair, Replacement, and Maintenance**: 
If a spring in service needs to be replaced, a design using a standard wire diameter makes it easier to source and reproduce. 
Custom sizes can lead to downtime and difficulty sourcing parts later in the product’s lifecycle.  
6. **Waste Reduction**: 
Standard wire is more likely to be used across multiple products or projects, reducing the chance of scrap or leftover unusable material.  
 
**Conclusion:**  
While custom wire diameters might seem attractive for ultra-precise designs, 
the downsides in terms of cost, availability, and complexity usually outweigh the benefits. 
Standard wire diameters offer a reliable, cost-effective, and practical solution that aligns well with manufacturing and supply chain realities.  

See also:
 - [Select Size and Select Catalog](/docs/Help/SpringDesign/selectSizeCatalog.html)  
 - [Preferred wire gauges - history](https://www.sizes.com/materials/wire.htm)  
 - [UK Spring Industry Metrication Report - December, 1971](https://ist.org.uk/wp-content/uploads/_pda/2024/07/Research-Report-196-Metrication-In-The-Spring-Industry.pdf)  

___

<a id="MatPropAccuracy"></a>  
___

Alert entry #S55
## Material properties for this Wire_Dia may not be accurate. 
This message is provided to warn the user that the current value for wire diameter is well outside 
the anticipated range for the selected material type and
the material properties from the internal table may not be completely accurate. 

Specifically, the ODOP : Spring software uses an interpolation / extrapolation mechanism to calculate a new value 
of tensile strength for each new wire diameter that is evaluated. 
The specific numbers involved change with each different material in the materials table. 
In this case, the current value of Wire_Dia requires an extrapolation significantly outside the range covered by values in 
the materials table. 
Thus, the corresponding values for tensile strength may not be completely accurate. 

If possible, select a standard wire size. 

Alternatively, obtain the appropriate value of tensile strength for the wire material and wire diameter in use 
and then modify the Calculation Input <b>Prop_Calc_Method</b> to a value of either 2 or 3 so that the material table is not used and 
it is possible to enter the more accurate value of tensile strength. 

 See also: 
 - [Select Size & Select Catalog](/docs/Help/SpringDesign/selectSizeCatalog.html)  
 - [Spring Materials and Material Properties](/docs/Help/SpringDesign/materials.html)  
 - [Advanced Spring Operations](/docs/Help/SpringDesign/advancedSpringOperations.html)  

___

<a id="FS_CycleLife_MIN_not_set"></a>  
___

Alert entry #S56
## FS_CycleLife MIN is not set. 
A more restrictive Life_Category has been selected but 
the corresponding constraint on FS_CycleLife is not enabled. 

Enable the FS_CycleLife MIN constraint to utilize the selected Life_Category. 

Selecting a Life_Category gets a corresponding value of %_Tensile_Endur from the internal material table. 
This value is then used to calculate Stress_Lim_Endur. 
The MIN constraint on FS_CycleLife must be enabled in order to have Search achieve designs 
that do not exceed the designated Stress_Lim_Endur. 

See also: 
 - [Cycle Life section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  
 - Tutorial session tutor4  

___

<a id="OverDesign"></a>  
___

Alert entry #S57
## Over-design concern 
The term "over-design" implies that this design may be too conservative. 
The Factor of Safety at operating point 2 exceeds the maximum constraint (FS_2 MAX). 

Try investigating a smaller wire diameter. 
One approach is to run Search (menu **Action : Search** or Search button) with Wire_Dia in Free status. 

Later, when ready to finalize the design, 
investigate design variations with the nearest standard wire diameters. 
Select and Fix the nearest smaller standard wire diameter.  Run Search.
Select and Fix the nearest larger standard wire diameter.  Run Search.
Compare the results. 
It may be necessary to accept a small amount of over-design in order to utilize a standard wire diameter. 

Alternatively, increase the FS_2 MAX constraint or disable that MAX constraint. 
This action will allow Search to produce a very conservative (heavy) design and consider it to be feasible.

See also: 
 - [Factor of Safety section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#FoS)  
 - [Advanced Spring Operations](/docs/Help/SpringDesign/advancedSpringOperations.html)  

___

<a id="Coils_A_LT_1"></a>  
___

Alert entry #S58
## Coils_A is less than 1 
A warning alert is produced whenever the current design has less than one active coil.  

As long as Coils_A is greater than zero, this is not an error that will block operations like Search, Seek and Trade. 
As less than one coil may not be the intent, the warning is intended to bring the situation to the designer's attention.  

Values of Coils_A less than or equal to zero will trigger the associated validity alert.

___

<a id="SI_manufacturability"></a>  
___

Alert entry #S59
## Spring Index manufacturability concern 
Spring_Index is the ratio of Mean Diameter to Wire Diameter. 
Specifically: Mean_Dia / Wire_Dia. 

**To resolve this alert:**  
 - If Spring_Index is less than Spring_Index MIN: decrease Wire_Dia or 
increase the variable controlling coil diameter (OD_Free, Mean_Dia or ID_Free).  

 - If Spring_Index is greater than Spring_Index MAX: increase Wire_Dia or 
decrease the variable controlling coil diameter (OD_Free, Mean_Dia or ID_Free).  

Alternatively, confirm that either (or both) Wire_Dia and
the variable controlling coil diameter (OD_Free, Mean_Dia or ID_Free) 
are in Free status and (re-)run Search.  

The presence of this alert indicates that the current design is outside the range 
of constraints Spring_Index MIN to Spring_Index MAX. 
This design may be difficult to manufacture.  

Spring index less than 4 is considered "difficult to manufacture". 
Spring index greater than 25 is considered "difficult to control".  

Ideally, spring index should be in the range of 6 to 12 in order to easily achieve spring industry standard tolerances. 
Reduced coiling machine speeds, specialized fixtures and other tooling may be required outside this range. 
For custom springs with Spring_Index outside the range of easy manufacturability, 
check with the spring manufacturer regarding capabilities and costs.  

The value of Mean_Dia can be controlled in the Advanced View and appears in Report 3.  

___

<a id="Cycle_LifeNA"></a>  
___

Alert entry #S60
## Cycle_Life calculation is not available 
The Cycle_Life variable (Modified Goodman calculation) is available only for materials contained in the internal materials table. 
The current setting of Prop_Calc_Method indicates that material properties are user supplied, 
thus there is not enough information available to directly calculate cycle life. 

The FS_CycleLife variable (Soderberg calculation) remains as a way of gauging cycle life for user defined materials (Prop_Calc_Method = 2 and 3). 

**Note:**   
In this case of user supplied material properties, 
if Cycle_Life is Fixed or has either MIN or MAX constraints enabled, 
Search is not likely to find a solution that is judged to be FEASIBLE. 

In order to continue with user supplied material properties,
disable constraints on Cycle_Life and enable constraints on FS_CycleLife. 

See Also: 
 - [Cycle Life section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  
 - Report 2

___

<a id="Cycle_LifeNA_FS_2"></a>  
___

Alert entry #S61
## Cycle_Life not defined beyond yield 
The load specified in the current design is sufficiently large to cause the wire to yield. 
The notion of cycle life does not apply. 

More specifically, the current design has a Factor of Safety at the second working point (FS_2) that is less than 1.0.
This means that the current set of inputs have resulted in a stress at point 2 
(maximum operating load) that exceeds the maximum allowable stress. 
For this design, the wire is at or perhaps even beyond its yield point. 
In this situation, the direct cycle life calculation (Cycle_Life variable - Modified Goodman calculation) is not meaningful. 

**Recommendations:**   
Change inputs such that stress at working point 2 (maximum operating load) is reduced. 

Increase | &nbsp; | Decrease  
---      | ---    | ---  
Wire_Dia | &nbsp; | Force_2 or M_2 
 &nbsp;  | &nbsp; | OD_Free  

Perhaps the best approach is to to confirm that one or more of these variables is in Free status 
and then run Search. 

**Note:**   
In this case of unrealistically high stress at point 2, 
if Cycle_Life is Fixed or has either MIN or MAX constraints enabled, 
Search is not likely to find a solution that is judged to be FEASIBLE. 

See also: 
 - [Cycle Life section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  
 - [Yield](https://en.wikipedia.org/wiki/Yield_(engineering))  

___

<a id="Cycle_LifeExtrapolated"></a>  
___

Alert entry #S62
##  Cycle_Life value is extrapolated  
This is an information alert. 
No action is required.  

The built-in material table provides allowable stress information derived from published s-n (stress versus number of cycles) data 
that covers the range from 10,000 to 10,000,000 cycles.
In order to facilitate proper operation of the search algorithm, 
the allowable stress data has been extrapolated outside this range and 
thus the current cycle_Life value is not supported by published data.

See also: 
 - [Cycle Life section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  

___

<a id="OD_ID_BothFixed"></a>  
___

Alert entry #S63
##  Over specification concern; Both OD and ID are fixed
To clear this Alert, remove Fixed status from either OD_Free or ID_Free by unchecking the checkbox
immediately to the right of the value field. 

With a helical coil spring, having both outside diameter (OD_Free) and inside diameter (ID_Free) in Fixed status 
raises a concern that the design may be unintentionally [over specified](/docs/Help/designSituations.html). 
In this situation, there is only one possible value of wire diameter (Wire_Dia) that will permit a feasible solution.
That value is not likely a standard wire diameter. 
As this may not be the designer's intent, this alert is intended to bring attention to the situation.

See also: 
 - [Fix and Free](/docs/Help/terminology.html#fix)  
 - [Design situations](/docs/Help/designSituations.html)  

___

<a id="DefaultConstraint"></a>  
___

Alert entry #S64
## Default constraint not enabled 
Disabling default constraints is not recommended. 
Adjust the constraint value instead. 

This alert is produced when constraints enabled by default are disabled. 
The default constraints guide Search to "good" spring designs. 
The Seek and Trade features utilize Search internally and thus those results are also
guided by the default constraints. 

This alert can be also be produced for designs created and saved with older versions of the software. 
Specifically, constraints on Spring_Index were not enabled by default in older designs. 
If this alert is associated with Spring_Index on an older design, it may be ignored. 
Better yet, clear the alert by enabling MIN and MAX constraints on Spring_Index. 

**Examples:** 
 - A lower constraint on deflection at the first operating point (Deflect_1) 
prevents Search from generating negative values for force and deflection at point 1. 
 - Constraints on Spring_Index insure that designs produced by the software are within the range of manufacturability. 
For custom springs, consult your manufacturer regarding capabilities and costs. 
 - Constraints on factor of safety at the second operating point (FS_2) insure that stresses are in an appropriate range. 
 
    + Disabling FS_2 MIN allows Search to return a highly over-stressed design and declare it as "feasible". 

    + Disabling FS_2 MAX allows Search to return a under-stressed design and declare it as "feasible". 
    If a relatively heavy, low-stress design is desired (an "over-design" situation), increase the value of the FS_2 MAX constraint. 

 - For compression springs, disabling the lower (MIN) constraint on factor of safety at solid (FS_Solid MIN) allows 
Search to return a design that would “set” (not return to the original free length if fully deflected) and declare it as “feasible”. 
 - For compression springs, disabling the upper (MAX) constraint on percent available deflection at operating load point 2 (%_Avail_Deflect) 
allows Search to return a design that would deflect all the way to solid under the second operating load (Force_2) and declare it as “feasible”. 
If a design that achieves its second operating load (Force_2) near or at the solid condition is desired, 
change the value of the FS_2 MIN constraint to be 1.0 and the value of the %_Avail_Deflect MAX constraint to be 100.

In summary, while it may be reasonable to adjust the constraint values of a default constraint, 
disabling a default constraint entirely is not recommended. 

___

<a id="TensileValueSuspect"></a>  
___

Alert entry #S65
## Value of Tensile is suspect 
  
The value of Tensile strength is close to or less than zero.
Check that it is correct.  

___

<a id="padding"></a>  
___

##  
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   

  &nbsp;   
  
  &nbsp;   

