# Alerts &nbsp; 

ALERTS are error, warning and informational messages that are produced as you change the values of your design. 
Error (Err) alerts are triggered if a value is outside its valid range. 
Warning (Warn) alerts are triggered if the relationship between two values is incorrect or invalid. 
Notice (Notice) alerts are triggered if constraints are significantly violated. 
Informational alerts (Info) alerts provide insights about various aspects of system operation,
including the configuration of Functionally Determined Constraint Levels 
[(FDCL)](/docs/Help/terminology.html#fdcl). 

The alert presentation is sorted by severity; Err at the top, then Warn, Notice and finally, Info. 
Each severity level has its own color: Err is red,  Warn is orange, Notice is green, and Info is black. 

The Value field allows in-place adjustment of the associated variable's value and constraint levels. 
This field operates the same as the corresponding fields on the main pages (Advanced and Calculator Views). 
Thus, the color of the number presented in the value field tracks the color of the 
[multi-colored Feasibility Status Indicator](/docs/Help/feasibilityIndicator.html). 

In order to assure that ODOP : Spring's core solution algorithms 
will not encounter numeric difficulty when starting from a physically unrealistic situation, 
alerts of error (Err) severity will generaly block operation of the Search, Seek and Trade features. 
It will be necessary to identify the source of errors and manually provide more appropriate values 
in order to proceed with the Search, Seek and Trade features. 
Many of the specific entries below attempt to provide specific guidance in moving to more realistic values 
thus resolving the alerts. 

### On this page:   
 - [Invalid - Value less than limit](alerts.html#Validity_Below)  
 - [Invalid - Value greater than limit](alerts.html#Validity_Above)  
 - [Constraint inconsistency](alerts.html#Constraint_Inconsistency)  
 - [Constraint MIN violation](alerts.html#MIN_Violation)  
 - [Constraint MAX violation](alerts.html#MAX_Violation)  
 - [No Free Independent Variables](alerts.html#NoFreeIV)  

### On design type specific alert pages:   
 - [L_Free < L_Solid](alerts.html#L_Free_LT_L_Solid)  
 - [L_2 < L_solid](alerts.html#L_2_LT_L_Solid)  
 - [Coils_A is less than 1](alerts.html#Coils_A_LT_1)  
 - [Wire diameter is less than reasonable](alerts.html#Wire_Dia_LT_reasonable)  
 - [Wire diameter is greater than reasonable](alerts.html#Wire_Dia_GT_reasonable)  
 - [PC_Avail_Deflect @ 2 > 80%](alerts.html#PC_Avail_Deflect2_GT_80)  
 - [PC_Avail_Deflect @ 1 < 20%](alerts.html#PC_Avail_Deflect1_LT_20)  
 - [FS_CycleLife MIN not set](alerts.html#FS_CycleLife_MIN_not_set)  
 - [Over-design concern](alerts.html#OverDesign)  
 - [Spring Index manufacturability concern](alerts.html#SI_manufacturability)  
 - [Force_2 < Force_1](alerts.html#F1_GE_F2)  
 - [Padding - delete before release](alerts.html#padding)  

___

<a id="Validity_Below"></a>  
___

## Invalid - Value less than or equal to limit 
The value of the associated variable is less than the validmin limit defined in the design type's initialState file. 
This condition blocks the Search, Seek and Trade features from starting. 

Specific advice on how to resolve this condition is not available. 
Look for zero or negative values. 
Undoing or reducing the size of recent changes may be helpful. 

___

<a id="Validity_Above"></a>  
___

## Invalid - Value greater than limit 
The value of the associated variable is greater than the validmax limit defined in the design type's initialState file. 
This condition blocks the Search, Seek and Trade features from starting. 

Specific advice on how to resolve this condition is not available. 
Undoing or reducing the size of recent changes may be helpful. 

___

<a id="Constraint_Inconsistency"></a>  
___

## Constraint_Inconsistency 
Constraints on the associated variable are inconsistent. 
Specifically, the value of the MAX constraint is less than the MIN constraint; 
the value of the MIN constraint is greater than the MIN constraint. 

This situation will block the Search, Seek and Trade features.

To resolve the situation, change one or both of the associated variable's constraint values. 
Increase the MAX value and / or decrease the MIN value until there is no overlap. 

___

<a id="MIN_Violation"></a>  
___

## Constraint MIN violation 
The associated variable's MIN constraint is violated. 

In order to resolve this alert: 
 - Use the Search feature (see next paragraph)  
 - Allow smaller values of the associated variable by decreasing the MIN constraint value.  
 - Disable the constraint  

It is quite possible that the constraint violation in question was created by use of the Search feature. 
In that case, further use of Search without introducing other changes is unlikely to be helpful. 
The most productive course of action may be to relax other seemingly unrelated violated constraints and rerun Search. 
The constraint(s) with the largest violations are the most leveraged and should be examined first. 

See also: 
 - [Feasibility](/docs/Help/feasibility.html)
 - [Design situations](/docs/Help/designSituations.html)  
 
___

<a id="MAX_Violation"></a>  
___

## Constraint MAX violation 
The associated variable's MAX constraint is violated. 

In order to resolve this alert: 
 - Use the Search feature (see next paragraph).  
 - Allow larger values of the associated variable by increasing the MAX constraint value.  
 - Disable the constraint.  

It is quite possible that the constraint violation in question was created by use of the Search feature. 
In that case, further use of Search without introducing other changes is unlikely to be helpful. 
The most productive course of action may be to relax other violated constraints and rerun Search. 
The constraint(s) with the largest violations are the most leveraged and should be examined first. 

See also: 
 - [Feasibility](/docs/Help/feasibility.html)
 - [Design situations](/docs/Help/designSituations.html)  

___

<a id="NoFreeIV"></a>  
___

## No Free Independent Variables 
If all Independent Variables are in Fixed status, 
there is nothing left for Search to manipulate in order to achieve a feasible design. 
This condition will block use of the Search, Seek and Trade features. 

It is possible that operation of the [AutoFix](/docs/Help/terminology.html#autoFix) feature 
has contributed to the situation. 

In order to resolve this situation, put one or more Independent Variables in Free status.

See also:  
 - [Terminology - AutoFix](/docs/Help/terminology.html#autoFix)  
 - [Setting Values](/docs/Help/settingValues.html)

___

<a id="L_Free_LT_L_Solid"></a>  
___

## L_Free < L_Solid 
In a compression spring, 
having free length (L_Free) specified as less than the solid height (L_Solid) is an impossible condition. 
In order to assure that
ODOP : Spring's Search feature will not encounter numeric difficulty when starting from such a physically unrealistic situation, 
where practical, change these values in the direction specified. 
Increase | &nbsp; | Decrease  
--- | --- | ---  
 L_Free | &nbsp; | Wire_Dia  
 &nbsp; | &nbsp; | Coils_T

See also: 
 - [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png)
 - [Compression Spring Constraints](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)   
 - [Errors](errors.html)   

___

<a id="L_2_LT_L_Solid"></a>  
___

## L_2 < L_Solid 
In a compression spring, 
having the length associated with the second operating load (L_2) as less than the solid height (L_Solid) 
is an impossible condition. 
In order to assure that
ODOP : Spring's Search feature will not encounter numeric difficulty when starting from such a physically unrealistic situation, 
where practical, change these values in the direction specified. 
Increase | &nbsp; | Decrease  
--- | --- | ---  
 L_Free | &nbsp; | Coils_T  
 &nbsp; | &nbsp; | Coil_Dia  
 &nbsp; | &nbsp; | Force_2

Compression spring lengths are ordered from the largest (L_Free) to L_1 to L_2 to the smallest (L_Solid). 
The [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png) provides more detail on this point. 

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)   
 - [Errors](errors.html)   

___

<a id="Coils_A_LT_1"></a>  
___

## Coils_A is less than 1 
A warning alert is produced whenever the current design has fewer than one active coil.  

This is not an error that will block operations like Search, Seek and Trade. 
As less than one coil may not be the intent, the warning is intended to bring the situation to the designer's attention. 

___

<a id="Wire_Dia_LT_reasonable"></a>  
___

## Wire diameter is less than reasonable 
This message is provided to warn the user that the current value for wire diameter is outside 
the anticipated range for the selected material type. 

Specifically, the ODOP : Spring software uses an interpolation / extrapolation mechanism to calculate a value 
of tensile strength for each new wire diameter that is evaluated. 
The specific numbers involved change with each different material in the materials table. 
In this case, the current value of Wire_Dia requires an extrapolation well outside the range covered by values in 
the materials table. 
Thus, the corresponding values for tensile strength may not be accurate. 

If possible, select a standard wire size. 

 See also: 
 - [Select Size & Select Catalog](/docs/Help/SpringDesign/selectSizeCatalog.html)

___

<a id="Wire_Dia_GT_reasonable"></a>  
___

## Wire diameter is greater than reasonable 
This message is provided to warn the user that the current value for wire diameter is outside 
the anticipated range for the selected material type. 

Specifically, the ODOP : Spring software uses an interpolation / extrapolation mechanism to calculate a value 
of tensile strength for each new wire diameter that is evaluated. 
The specific numbers involved change with each different material in the materials table. 
In this case, the current value of Wire_Dia requires an extrapolation well outside the range covered by values in 
the materials table. 
Thus, the corresponding values for tensile strength may not be accurate. 

If possible, select a standard wire size. 

 See also: 
 - [Select Size & Select Catalog](/docs/Help/SpringDesign/selectSizeCatalog.html)

___

<a id="PC_Avail_Deflect2_GT_80"></a>  
___

## PC_Avail_Deflect @ 2 > 80% 
Coil to coil contact may cause inaccuracy in operating point 2.  

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force and deflection. 
Howevever, in the real world there are limitations. 

When compression springs are compressed beyond roughly 80% of available deflection 
any lack of perfect uniformity in coil pitch will become a factor in the real (as opposed to theoretical) force-deflection relationship. 
Coil to coil contact will produce an increase in spring rate that continues to increase 
with additional deflection until the solid condition is reached.
Thus when operating beyond 80% of the available deflection expect forces to be somewhat higher (or deflections to be somewhat lower)
than the linear behavior predicted by the equations.  

 See also: 
  - [Restrictions](/docs/About/Legal/Restrictions.html)  
  - [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)  

___

<a id="PC_Avail_Deflect1_LT_20"></a>  
___

## PC_Avail_Deflect @ 1 < 20% 
End effects may cause inaccuracy in operating point 1.  

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force and deflection. 
Howevever, in the real world there are limitations. 

When compression springs are compressed less than roughly 20% of available deflection 
any lack of perfection in the ends will become a factor in the real (as opposed to theoretical) force-deflection relationship. 
For example, ends that are ground imperfectly perpendicular with the coil axis will decrease the apparent spring rate 
in a way that that diminishes with additional deflection until the ends are fully seated. 
Thus when operating within the first 20% of the available deflection expect forces to be somewhat lower (or deflections to be somewhat greater)
than the linear behavior predicted by the equations.  

 See also: 
  - [Restrictions](/docs/About/Legal/Restrictions.html)  
  - [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)  

___

<a id="FS_CycleLife_MIN_not_set"></a>  
___

## FS_CycleLife MIN is not set. 
A more restrictive Life_Category has been selected but 
the corresponding constraint on FS_CycleLife is not enabled. 
Suggest enabling the FS_CycleLife MIN constraint. 

See also: 
 - [Cycle Life section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  
 - Tutorial session tutor4  

___

<a id="OverDesign"></a>  
___

## Over-design concern 
This design may be excessively conservative, 
its Factor of Safety at operating point 2 exceeds the maximum constraint.  

Suggest investigating a smaller wire diameter. 
One approach is to run Search with Wire_Dia in Free status.
Later, select the nearest larger standard wire diameter.  

Alternatively, increase the FS_2 MAX constraint or disable that MAX constraint. 

See also: 
 - [Factor of Safety section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#FoS)  
 - [Advanced Spring Operations](/docs/Help/SpringDesign/advancedSpringOperations.html)  

___

<a id="SI_manufacturability"></a>  
___

## Spring Index manufacturability concern 
Spring index less than 4 is considered "difficult to manufacture".  

Spring index greater than 25 is considered "difficult to control".  

Check with the spring manufacturer regarding capabilities and costs. 

___

<a id="F1_GE_F2"></a>  
___

## Force_1 >= Force_2 
The value of Force_1 is greater than or equal to the value of Force_2. 

Compression spring forces are ordered from the smallest (free condition) to Force_1 to Force_2 to the largest (Force_Solid). 
The [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png) provides more detail on this point. 

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)   
 - [Errors](errors.html)   

___

<a id="padding"></a>  
___

## Padding - delete before release 
 ... details ...    
  &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
  &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
  &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
 &nbsp;   


