# Spring Alerts &nbsp; 

Alerts common to all round-wire coil springs 

### On this page:   
 - [Wire diameter is less than reasonable](alerts.html#Wire_Dia_LT_reasonable)  
 - [Wire diameter is greater than reasonable](alerts.html#Wire_Dia_GT_reasonable)  
 - [FS_CycleLife MIN not set](alerts.html#FS_CycleLife_MIN_not_set)  
 - [Over-design concern](alerts.html#OverDesign)  
 - [Spring Index manufacturability concern](alerts.html#SI_manufacturability)  
 - [Coils_A is less than 1](alerts.html#Coils_A_LT_1)  
 - [Value of Tensile is suspect](alerts.html#TensileValueSuspect)  

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

<a id="Coils_A_LT_1"></a>  
___

## Coils_A is less than 1 
A warning alert is produced whenever the current design has fewer than one active coil.  

This is not an error that will block operations like Search, Seek and Trade. 
As less than one coil may not be the intent, the warning is intended to bring the situation to the designer's attention. 

___

<a id="TensileValueSuspect"></a>  
___

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

