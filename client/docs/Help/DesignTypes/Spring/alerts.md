# Spring Alerts &nbsp; 

Alerts common to all round-wire coil springs 

### On this page:   
 - [Wire_Dia > ID_Free](alerts.html#Wire_Dia_GT_ID_Free)  
 - [Material properties for this Wire_Dia may not be accurate](alerts.html#MatPropAccuracy)  
 - [FS_CycleLife MIN not set](alerts.html#FS_CycleLife_MIN_not_set)  
 - [Over-design concern](alerts.html#OverDesign)  
 - [Coils_A is less than 1](alerts.html#Coils_A_LT_1)  
 - [Spring Index manufacturability concern](alerts.html#SI_manufacturability)  
 - [Cycle_Life calculation is not available](alerts.html#Cycle_LifeNA)  
 - [Cycle_Life not defined beyond yield](alerts.html#Cycle_LifeNA_FS_2)  
 - [Value of Tensile is suspect](alerts.html#TensileValueSuspect)  

___

<a id="Wire_Dia_GT_ID_Free"></a>  
___

Alert entry #S51
## Wire_Dia > ID_Free 
The wire diameter (Wire_Dia) is greater than the coil inside diameter (ID_Free).

Most spring wire is not sufficiently ductile to be wound this tight. 

Resolve this alert by increasing the value of OD_Free or decreasing the value of Wire_Dia. 

Alternatively, confirm that the Spring_Index MIN constraint is enabled at a constraint level of 4 or greater 
and run Search (menu Action : Search or the Search button). 

Before finalizing a design that has this alert outstanding, 
check with the spring manufacturer regarding capabilities and costs. 

___

<a id="MatPropAccuracy"></a>  
___

Alert entry #S52
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

Alert entry #S53
## FS_CycleLife MIN is not set. 
A more restrictive Life_Category has been selected but 
the corresponding constraint on FS_CycleLife is not enabled. 

Selecting a Life_Category gets a corresponding value of %_Tensile_Endur from the internal material table. 
This value is then used to calculate Stress_Lim_Endur. 
The MIN constraint on FS_CycleLife must be enabled in order to have Search achieve designs 
that do not exceed the designated Stress_Lim_Endur. 

Suggest enabling the FS_CycleLife MIN constraint. 

See also: 
 - [Cycle Life section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  
 - Tutorial session tutor4  

___

<a id="OverDesign"></a>  
___

Alert entry #S54
## Over-design concern 
The term "over-design" implies that this design may be excessively conservative. 
Its Factor of Safety at operating point 2 exceeds the maximum constraint. 

Suggest investigating a smaller wire diameter. 
One approach is to run Search (menu Action : Search or Search button) with Wire_Dia in Free status. 

Later, when ready to finalize the design, 
investigate design variations with the nearest standard wire diameters. 
Select and Fix the nearest smaller wire diameter.  Run Search.
Select and Fix the nearest larger wire diameter.  Run Search.
Compare the results. 
It may be necessary to accept a small amount of over-design in order to utilize a standard wire diameter. 

Alternatively, increase the FS_2 MAX constraint or disable that MAX constraint. 
This will likely result in a very conservative (heavy) design.

See also: 
 - [Factor of Safety section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#FoS)  
 - [Advanced Spring Operations](/docs/Help/SpringDesign/advancedSpringOperations.html)  

___

<a id="Coils_A_LT_1"></a>  
___

Alert entry #S55
## Coils_A is less than 1 
A warning alert is produced whenever the current design has fewer than one active coil.  

This is not an error that will block operations like Search, Seek and Trade. 
As less than one coil may not be the intent, the warning is intended to bring the situation to the designer's attention. 

___

<a id="SI_manufacturability"></a>  
___

Alert entry #S56
## Spring Index manufacturability concern 
Spring index less than 4 is considered "difficult to manufacture".  

Spring index greater than 25 is considered "difficult to control".  

Check with the spring manufacturer regarding capabilities and costs. 

___

<a id="Cycle_LifeNA"></a>  
___

Alert entry #S57
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

Alert entry #S58
## Cycle_Life not defined beyond yield 
The load specified in the current design is sufficiently large to cause the wire to yield. 
The notion of cycle life does not apply. 

More specifically, the current design has a Factor of Safety at the second working point (FS_2) that is less than 1.0.
This means that the current set of inputs have resulted in a stress at point 2 
(maximum operating load) that exceeds the maximum allowable stress. 
For this design, the wire is at or perhaps even beyond its yield point. 
In this situation, the direct cycle life calculation (Cycle_Life variable - Modified Goodman calculation) is not meaningful. 

**Note:**   
In this case of unrealistically high stress at point 2, 
if Cycle_Life is Fixed or has either MIN or MAX constraints enabled, 
Search is not likely to find a solution that is judged to be FEASIBLE. 

**Recommendations:**   
Change inputs such that stress at working point 2 (maximum operating load) is reduced. 

Increase | &nbsp; | Decrease  
---      | ---    | ---  
Wire_Dia | &nbsp; | Force_2 or M_2 
 &nbsp;  | &nbsp; | OD_Free  

Perhaps the best approach is to to confirm that one or more of these variables is in Free status 
and then run Search. 

See also: 
 - [Cycle Life section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  

___

<a id="TensileValueSuspect"></a>  
___

Alert entry #S59
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

