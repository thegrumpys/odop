# Alerts &nbsp; 

This topic provides details for each of the alerts.

### On this page:   
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
 - [Force_2 < Force_1](alerts.html#F2_LT_F1)  
 - [Padding - delete before release](alerts.html#padding)  

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
 - [Compression Spring Constraints](/docs/Help/DesignTypes/c_spring.html#c_springConstraints)   
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
 Wire_Dia | &nbsp; | Coil_Dia  
 &nbsp; | &nbsp; | Force_2

Compression spring lengths are ordered from the largest (L_Free) to L_1 to L_2 to the smallest (L_Solid). 
The [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png) provides more detail on this point. 

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/c_spring.html#c_springConstraints)   
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

<a id="F2_LT_F1"></a>  
___

## Force_2 < Force_1 
The value of Force_2 is less than the value of Force_1. 

Compression spring forces are ordered from the smallest (free condition) to Force_1 to Force_2 to the largest (Force_Solid). 
The [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png) provides more detail on this point. 

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/c_spring.html#c_springConstraints)   
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


