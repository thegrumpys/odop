# Alerts &nbsp; 

ALERTS are informational messages that are produced as you change the values of your design. 
Press the Alerts button on the main pages (Advanced and Calculator Views) 
to see an alert presentation that is color coded and sorted by severity: 
Severity | Content                                          | Color  
---      | ---                                              | ---  
 Err     | value is outside its valid range                 | red  
 Warn    | relationship between values incorrect or invalid | orange  
 Notice  | constraints that are significantly violated      | green  
 Info    | insights about aspects of system operation       | black  

Informational alerts (Info) alerts also highlight the configuration of 
Functionally Determined Constraint Levels [(FDCL)](/docs/Help/terminology.html#fdcl). 

The Value field allows in-place adjustment of the associated variable's value and constraint levels. 
This field operates the same as the corresponding fields on the main pages (Advanced and Calculator Views). 
Thus, where possible, the color of the number presented in the value field tracks the color of the 
[multi-colored Feasibility Status Indicator](/docs/Help/feasibilityIndicator.html). 
Otherwise, the field color tracks the message Severity level. 

In order to assure that ODOP : Spring's core solution algorithms 
will not encounter numeric difficulty when starting from a physically unrealistic situation, 
alerts of error (Err) severity will generaly block operation of the Search, Seek and Trade features. 
It will be necessary to identify the source of errors and manually provide more appropriate values 
in order to proceed with Search, Seek and Trade. 
Where possible, the linked detailed entries (below) provide specific guidance in moving to values 
that will resolve the alerts. 

### On this page (design type independent alerts):   
 - [Invalid - Value less than limit](alerts.html#Validity_Below)  
 - [Invalid - Value greater than limit](alerts.html#Validity_Above)  
 - [Constraint inconsistency](alerts.html#Constraint_Inconsistency)  
 - [Constraint MIN violation](alerts.html#MIN_Violation)  
 - [Constraint MAX violation](alerts.html#MAX_Violation)  
 - [Fix violation](alerts.html#Fix_Violation)  
 - [No Free Independent Variables](alerts.html#NoFreeIV)  
 - [Functionally Determined Constraint Level (FDCL) is configured](alerts.html#FDCL)  

### On other pages (design type specific alerts):   
 - [L_Free < L_Solid](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_Free_LT_L_Solid)  
 - [L_2 < L_solid](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_2_LT_L_Solid)  
 - [Coils_A is less than 1](/docs/Help/DesignTypes/Spring/alerts.html#Coils_A_LT_1)  
 - [Wire diameter is less than reasonable](/docs/Help/DesignTypes/Spring/alerts.html#Wire_Dia_LT_reasonable)  
 - [Wire diameter is greater than reasonable](/docs/Help/DesignTypes/Spring/alerts.html#Wire_Dia_GT_reasonable)  
 - [Value of Tensile is suspect](/docs/Help/DesignTypes/Spring/alerts.html#TensileValueSuspect)  
 - [FS_CycleLife MIN not set](/docs/Help/DesignTypes/Spring/alerts.html#FS_CycleLife_MIN_not_set)  
 - [FS_Solid < 1.0](/docs/Help/DesignTypes/Spring/Compression/alerts.html#FS_Solid_LT_1)  
 - [Over-design concern](/docs/Help/DesignTypes/Spring/alerts.html#OverDesign)  
 - [Spring Index manufacturability concern](/docs/Help/DesignTypes/Spring/alerts.html#SI_manufacturability)  
 - [Force_2 < Force_1](/docs/Help/DesignTypes/Spring/Compression/alerts.html#F1_GE_F2)  
 - [%_Avail_Deflect @ 2 > 80%](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect2_GT_80)  
 - [%_Avail_Deflect @ 1 < 20%](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect1_LT_20)  
 - [Buckling concern](/docs/Help/DesignTypes/Spring/Compression/alerts.html#buckling)  

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
The associated variable's MIN constraint is violated by more than a trivial amount. 

In order to resolve this alert: 
 - Use the Search feature (see next paragraph)  
 - Allow smaller values of the associated variable by decreasing the MIN constraint value.  
 - Disable the constraint  

It is quite possible that the constraint violation in question was created by use of the Search feature. 
In that case, further use of Search without introducing other changes is unlikely to be helpful. 
The most productive course of action may be to relax other seemingly unrelated violated constraints and rerun Search. 
The constraint(s) with the largest violations are the most leveraged and should be examined first. 

See also: 
 - [Constraints](/docs/Help/terminology.html#constraints)
 - [Feasibility](/docs/Help/feasibility.html)
 - [Design situations](/docs/Help/designSituations.html)  
 
___

<a id="MAX_Violation"></a>  
___

## Constraint MAX violation 
The associated variable's MAX constraint is violated by more than a trivial amount. 

In order to resolve this alert: 
 - Use the Search feature (see next paragraph).  
 - Allow larger values of the associated variable by increasing the MAX constraint value.  
 - Disable the constraint.  

It is quite possible that the constraint violation in question was created by use of the Search feature. 
In that case, further use of Search without introducing other changes is unlikely to be helpful. 
The most productive course of action may be to relax other violated constraints and rerun Search. 
The constraint(s) with the largest violations are the most leveraged and should be examined first. 

See also: 
 - [Constraints](/docs/Help/terminology.html#constraints)
 - [Feasibility](/docs/Help/feasibility.html)
 - [Design situations](/docs/Help/designSituations.html)  

___

<a id="Fix_Violation"></a>  
___

## Fix Violation 
The associated Dependent Variable is in Fixed status. 
Its value differs from the target value established by the Fix by more than a trivial amount.   

In order to resolve this alert: 
 - Use the Search feature (see next paragraph).  
 - Change the Fix target value to something more consistent with what can be achieved within the remaining constraints and Fixes.  
 - Disable the Fix.  

It is possible that the Fix violation in question was created by use of the Search feature. 
In that case, further use of Search without introducing other changes is unlikely to be helpful. 
The most productive course of action may be to relax unrelated violated constraints and Fixes and then rerun Search. 
The constraint(s) with the largest violations are the most leveraged and should be examined first. 

See also: 
 - [Fix & Free](/docs/Help/terminology.html#fix)
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
Specifically, uncheck the checkbox that is positioned between the associated variable's 
value and its units label. 
When in Calculator View, first click the variable in order to open its value change dialog box. 

See also:  
 - [Terminology - AutoFix](/docs/Help/terminology.html#autoFix)  
 - [Setting Values](/docs/Help/settingValues.html)

___

<a id="FDCL"></a>  
___

## Functionally Determined Constraint Level (FDCL) is configured 
A functionally Determined Constraint Level (FDCL) is configured for this variable. 

See Also:  
 - [Terminology - Function Constraints](/docs/Help/terminology.html#fdcl)  
 - [Constraints unique to extension springs](/docs/Help/DesignTypes/Spring/Extension/description.html#e_springConstraints)  

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

