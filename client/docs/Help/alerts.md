# Alerts &nbsp; 

Alerts are informational messages that are produced as you change the values of your design. 
 
![Alert panel](/docs/Help/img/AlertPanel.png "Alert panel")   

Press Alert buttons on the main pages (Advanced and Calculator Views) 
to see an alert presentation that is organized by severity: 
Severity | Content                                          | Font  
---      | ---                                              | ---  
 Err     | value is outside its valid range                 | Bold  
 Warn    | relationship between values incorrect or invalid | Bold, Italic  
 Notice  | constraints that are significantly violated      | Standard (Roman)  
 Info    | insights about aspects of system operation       | Italic  

Informational (Info) alerts also highlight the configuration of 
Functionally Determined Constraint Levels [(FDCL)](/docs/Help/terminology.html#fdcl). 

Designs with values outside their valid range are likely physically impossible.
In spring design, negative values for wire diameter, coil diameter and number of coils are obvious examples.
Other situations, for example where an increase in wire diameter results in a negative value for coil inside diameter 
or an increase in force at the second load point takes a compression spring below its solid condition 
may be a bit less obvious. 

If started from a design with one or more values outside their valid range 
the Search feature may not be able to resolve the problem. 
In this situation, Search finishes with a different design point that is also invalid and
with a message to correct the invalid condition manually. 
In order to proceed with a new Search, 
identify the source of invalid values and manually enter more appropriate values. 
As zero and negative numbers are a common source of invalid values, look for those first. 

In order to avoid numeric difficulty when starting from a physically unrealistic situation, 
alerts of error (Err) severity may block operation of the Seek and Trade features. 
In order to proceed with Seek and Trade it will be necessary to identify the source of errors 
and manually provide more appropriate values. 

The Value field of the Alerts presentation allows in-place adjustment of the 
associated variable's value and constraint levels. 
Select this field to get a value change dialog box that 
operates the same as the corresponding fields on the main pages (Advanced and Calculator Views). 
Where possible, the color of the number presented in the value field tracks the color of the 
[multi-colored Feasibility Status Indicator](/docs/Help/feasibilityIndicator.html). 

Where possible, the linked detailed entries (below) provide specific guidance in moving to values 
that will resolve the alerts. 

### On this page (design type independent alerts):   
 - [Objective Value is Infinity](alerts.html#OBJ_Infinite)
 - [Objective Value is Not a Number (NaN)](alerts.html#OBJ_NaN)
 - [Invalid - Value less than limit](alerts.html#Validity_Below)  
 - [Invalid - Value greater than limit](alerts.html#Validity_Above)  
 - [Invalid Constraint - Less than limit](alerts.html#Constraint_Below)  
 - [Invalid Constraint - Greater than limit](alerts.html#Constraint_Above)  
 - [Constraint inconsistency](alerts.html#Constraint_Inconsistency)  
 - [Constraint MIN violation](alerts.html#MIN_Violation)  
 - [Constraint MAX violation](alerts.html#MAX_Violation)  
 - [Fix violation](alerts.html#Fix_Violation)  
 - [Not a Number (NaN)](alerts.html#NotNumber)  
 - [No Free Independent Variables](alerts.html#NoFreeIV)  
 - [Functionally Determined Constraint Level (FDCL) is enabled](alerts.html#FDCL)  

### On other pages (design type specific alerts):   
 - [OD_Free exactly twice Wire_Dia](/docs/Help/DesignTypes/Spring/alerts.html#OD2xWire_Dia)  
 - [OD_Free equal to Wire_Dia](/docs/Help/DesignTypes/Spring/alerts.html#OD_eq_Wire_Dia)  
 - [Wire_Dia > ID_Free](/docs/Help/DesignTypes/Spring/alerts.html#Wire_Dia_GT_ID_Free)  
 - [Material properties for this Wire_Dia may not be accurate](/docs/Help/DesignTypes/Spring/alerts.html#MatPropAccuracy)  
 - [FS_CycleLife MIN not set](/docs/Help/DesignTypes/Spring/alerts.html#FS_CycleLife_MIN_not_set)  
 - [Over-design concern](/docs/Help/DesignTypes/Spring/alerts.html#OverDesign)  
 - [Coils_A is less than 1](/docs/Help/DesignTypes/Spring/alerts.html#Coils_A_LT_1)  
 - [Spring Index manufacturability concern](/docs/Help/DesignTypes/Spring/alerts.html#SI_manufacturability)  
 - [Cycle_Life calculation is not available](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA)  
 - [Cycle_Life not defined beyond yield](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeNA_FS_2)  
 - [Cycle_Life value is extrapolated](/docs/Help/DesignTypes/Spring/alerts.html#Cycle_LifeExtrapolated)  
 - [Over specification concern; Both OD and ID are fixed](/docs/Help/DesignTypes/Spring/alerts.html#OD_ID_BothFixed)  
 - [Default constraint not enabled](/docs/Help/DesignTypes/Spring/alerts.html#DefaultConstraint)  
 - [Value of Tensile is suspect](/docs/Help/DesignTypes/Spring/alerts.html#TensileValueSuspect)  
 - [Coils_T = Inactive_Coils](/docs/Help/DesignTypes/Spring/Compression/alerts.html#Coils_T_eq_Inactive_Coils)  
 - [Force_1 >= Force_2](/docs/Help/DesignTypes/Spring/Compression/alerts.html#F1_GE_F2)  
 - [Excess Force](/docs/Help/DesignTypes/Spring/Compression/alerts.html#Excess_Force)  
 - [L_Free < L_Solid](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_Free_LT_L_Solid)  
 - [L_2 < L_solid](/docs/Help/DesignTypes/Spring/Compression/alerts.html#L_2_LT_L_Solid)  
 - [FS_Solid < 1.0](/docs/Help/DesignTypes/Spring/Compression/alerts.html#FS_Solid_LT_1)  
 - [%_Avail_Deflect @ 2 > 80%](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect2_GT_80)  
 - [%_Avail_Deflect @ 1 < 20%](/docs/Help/DesignTypes/Spring/Compression/alerts.html#PC_Avail_Deflect1_LT_20)  
 - [Buckling concern](/docs/Help/DesignTypes/Spring/Compression/alerts.html#buckling)  
 - [Force_1 < Initial_Tension](/docs/Help/DesignTypes/Spring/Extension/alerts.html#F1_LT_IT)  
 - [Stress_Initial < Stress_Init_Lo](/docs/Help/DesignTypes/Spring/Extension/alerts.html#SInit_LT_SInit_Lo)  
 - [Stress_Initial > Stress_Init_Hi](/docs/Help/DesignTypes/Spring/Extension/alerts.html#SInit_GT_SInit_Hi)  
 - [Fatigue failure at end is possible](/docs/Help/DesignTypes/Spring/Extension/alerts.html#FatigueInHook)  
 - [Material property data not available](/docs/Help/DesignTypes/Spring/Extension/alerts.html#NoMatProp)  
 - [M_1 >= M_2](/docs/Help/DesignTypes/Spring/Torsion/alerts.html#M1_GE_M2)  

___

<a id="OBJ_Infinite"></a>  
___

Alert entry #ODOP01
##  Objective Value is Infinity
The Objective Value can become Infinity when numerical difficulties such as division by zero are encountered 
while solving the design equations.  

Other entries in the Alerts panel may provide more specific details about which variables are causing the problem 
as well as specific guidance on how to resolve the situation.

An Objective Value of Infinity will cause a warning message when using the Search (solve) feature 
(Search button or Action : Search menu).  

See also:
 - [Terminology - Objective Function, Objective Value](/docs/Help/terminology.html#obj)  
 
___

<a id="OBJ_NaN"></a>  
___

Alert entry #ODOP02
##  Objective Value is Not a Number (NaN)
The Objective Value should not be able to achieve a value of NaN.
If you are able to repeat this situation, 
please contact customer support. 

See also: 
 - [Terminology - Objective Function, Objective Value](/docs/Help/terminology.html#obj)  
 - [NaN](https://en.wikipedia.org/wiki/NaN)  
 - [Contact Us](/docs/About/ContactUs.html)  

___

<a id="Validity_Below"></a>  
___

Alert entry #ODOP03
## Invalid - Value less than limit 
The value of the associated variable is less than the validmin limit as defined in the design type's initialState.  

This is a generic alert message so guidance on how to resolve this condition is not available here. 
Look for other alert messages as they might provide more specific advice. 
Look for zero or negative values. 
Undoing or reducing the size of recent changes may be helpful. 

This alert means that the mathematical model for this design is not valid for the current set of inputs. 
Given the current set of Independent Variables, the design is likely outside the limits of physical reality. 
For example, in coil spring design, outside diameters (OD_FREE) less than twice the wire diameter (Wire_Dia) 
will produce a negative inside diameter, an impossible situation. 
Multiple Invalid messages may cascade out of a single out-of-range input value. 

This condition may produce a warning message or even block the Seek and Trade features from starting. 

See also:
 - [Terminology - Validity](/docs/Help/terminology.html#validity)  

___

<a id="Validity_Above"></a>  
___

Alert entry #ODOP04
## Invalid - Value greater than limit 
The value of the associated variable is greater than the validmax limit defined in the design type's initialState.  

This is a generic alert message so guidance on how to resolve this condition is not available here. 
Look for other alert messages as they might provide more specific advice. 
Look for zero or negative values. 
Undoing or reducing the size of recent changes may be helpful. 

This alert means that the mathematical model for this design is not valid for the current set of inputs. 
Given the current set of Independent Variables, the design is likely outside the limits of physical reality. 
For example, in coil spring design, outside diameters (OD_FREE) less than twice the wire diameter (Wire_Dia) 
will produce a negative inside diameter, an impossible situation.  
Multiple Invalid messages may cascade out of a single out-of-range input value. 

This condition may produce a warning message or even block the Seek and Trade features from starting. 

See also:
 - [Terminology - Validity](/docs/Help/terminology.html#validity)  

___

<a id="Constraint_Below"></a>  
___

Alert entry #ODOP05
## Invalid Constraint - Less than limit 
The value of the associated constraint is less than the validmin limit for the associated variable as defined in the design type's initialState. 
The problem is in the constraint (MIN or MAX) value, not the value of the variable itself.  

This means that, given the current constraint value (for example, a MIN value that allows a negative diameter), 
the design could be taken outside the limits of physical reality. 
The mathematical model for this design is not valid for values outside these these limits. 

Look for zero or negative numbers in the MIN field of the associated variable. 
Change to positive, non-zero numbers as appropriate. 
Look for other messages as they might provide more specific advice. 
Undoing or reducing the size of recent constraint changes may be helpful. 

See also:
 - [Terminology - Validity](/docs/Help/terminology.html#validity)  

___

<a id="Constraint_Above"></a>  
___

Alert entry #ODOP06
## Invalid Constraint - Greater than limit 
The value of the associated constraint is greater than the validmax limit for the associated variable as defined in the design type's initialState. 
The problem is in the constraint (MIN or MAX) value, not the value of the variable itself.  

This means that, given the current input value, 
the design could be taken outside the limits of physical reality. 
The mathematical model for this design is not valid for values outside these these limits. 

Look at the MAX constraint field of the associated variable. 
Adjust it as appropriate. 
Look for other messages as they might provide more specific advice. 
Undoing or reducing the size of recent constraint changes may be helpful. 

See also:
 - [Terminology - Validity](/docs/Help/terminology.html#validity)  

___

<a id="Constraint_Inconsistency"></a>  
___

Alert entry #ODOP07
## Inverted Constraint Range / Constraint Inconsistency 
Constraints on the associated variable are inconsistent. 
Specifically, the MAX constraint value is less than the MIN constraint value. 

To resolve the situation, change one or both of the associated variable's constraint values. 
Increase the MAX value and / or decrease the MIN value until there is no overlap. 

This inconsistency may block the Search, Seek and Trade features from starting.

See also: 
 - [Constraints](/docs/Help/terminology.html#constraints)  
 - [Setting Values](/docs/Help/settingValues.html)  

___

<a id="MIN_Violation"></a>  
___

Alert entry #ODOP08
## Constraint MIN violation 
The associated variable's MIN constraint is violated by more than a trivial amount. 

In order to resolve this alert: 
 - Use the Search feature (see next paragraph)  
 - Allow smaller values of the associated variable by decreasing the MIN constraint value.  
 - Disable the constraint  

It is quite possible that the constraint violation in question was created by use of the Search feature. 
In that case, further use of Search without introducing other changes is unlikely to be helpful. 
The most productive course of action may be to Free one or more variables currently in Fixed status or 
relax other, perhaps seemingly unrelated, violated constraints and then run Search again. 

When Search returns a design judged to be NOT FEASIBLE, 
constraint(s) with the largest violations are the most leveraged and should be examined first. 
The full set of constraint violations is visible in Advanced View. 
In Calculator View, individual constraint violations are displayed in the Value Input dialog that results when selecting 
(clicking on) an Independent or Dependent Variable. 

If Search has returned a design with violated constraints and judged to be NOT FEASIBLE, 
it is possible that too many variables in Fixed status have caused the design to become over-specified. 
If it it not possible to completely Free one or more variables currently in Fixed status, 
perhaps it would be helpful to replace a Fix with MIN and MAX constraints that allow a range of flexibility. 
Additional information on over-specified designs is available in the 
[Design situations](/docs/Help/designSituations.html) Help entry. 

See also: 
 - [Constraints](/docs/Help/terminology.html#constraints)
 - [Feasibility](/docs/Help/feasibility.html)
 - [Design situations](/docs/Help/designSituations.html)  
 
___

<a id="MAX_Violation"></a>  
___

Alert entry #ODOP09
## Constraint MAX violation 
The associated variable's MAX constraint is violated by more than a trivial amount. 

In order to resolve this alert: 
 - Use the Search feature (see next paragraph).  
 - Allow larger values of the associated variable by increasing the MAX constraint value.  
 - Disable the constraint.  

It is quite possible that the constraint violation in question was created by use of the Search feature. 
In that case, further use of Search without introducing other changes is unlikely to be helpful. 
The most productive course of action may be to Free one or more variables currently in Fixed status or 
relax other, perhaps seemingly unrelated, violated constraints and then run Search again. 

When Search returns a design judged to be NOT FEASIBLE, 
constraint(s) with the largest violations are the most leveraged and should be examined first. 
The full set of constraint violations is visible in Advanced View. 
In Calculator View, individual constraint violations are displayed in the Value Input dialog that results when selecting 
(clicking on) an Independent or Dependent Variable. 

If Search has returned a design with violated constraints and judged to be NOT FEASIBLE, 
it is possible that too many variables in Fixed status have caused the design to become over-specified. 
If it it not possible to completely Free one or more variables currently in Fixed status, 
perhaps it would be helpful to replace a Fix with MIN and MAX constraints that allow a range of flexibility. 
Additional information on over-specified designs is available in the 
[Design situations](/docs/Help/designSituations.html) Help entry. 

See also: 
 - [Constraints](/docs/Help/terminology.html#constraints)
 - [Feasibility](/docs/Help/feasibility.html)
 - [Design situations](/docs/Help/designSituations.html)  

___

<a id="Fix_Violation"></a>  
___

Alert entry #ODOP10
## Fix Violation 
The associated Dependent Variable is in Fixed status. 
Its value differs from the target value established by the Fix by more than a trivial amount.   

In order to resolve this alert: 
 - Use the Search feature (see next paragraph).  
 - Change the Fix target value to something more consistent with what can be achieved within the remaining constraints and Fixes.  
 - Disable the Fix.  

It is possible that the Fix violation in question was created by use of the Search feature. 
In that case, further use of Search without introducing other changes is unlikely to be helpful. 
The most productive course of action may be to Free one or more variables currently in Fixed status or 
relax other, perhaps seemingly unrelated, violated constraints and then run Search again. 

When Search returns a design judged to be NOT FEASIBLE, 
constraint(s) with the largest violations are the most leveraged and should be examined first. 
The full set of constraint violations is visible in Advanced View. 
In Calculator View, individual constraint violations are displayed in the Value Input dialog that results when selecting 
(clicking on) an Independent or Dependent Variable. 

If Search has returned a design with violated constraints and judged to be NOT FEASIBLE, 
it is possible that too many variables in Fixed status have caused the design to become over-specified. 
If it it not possible to completely Free one or more variables currently in Fixed status, 
perhaps it would be helpful to replace a Fix with MIN and MAX constraints that allow a range of flexibility. 
Additional information on over-specified designs is available in the 
[Design situations](/docs/Help/designSituations.html) Help entry. 

See also: 
 - [Fix & Free](/docs/Help/terminology.html#fix)
 - [Feasibility](/docs/Help/feasibility.html)
 - [Design situations](/docs/Help/designSituations.html)  

___

<a id="NotNumber"></a>  
___

Alert entry #ODOP11
## Not a Number (NaN) 
The value of the associated variable is Not a Number ([NaN](https://en.wikipedia.org/wiki/NaN)). 
This is a computational error condition that may cascade to other variables.  

In most cases, the best way to resolve this alert is to revert the most recent change to a variable. 
If that works, try establishing values that are part way to the value causing the problem. 
It is possible that using the Search feature could resolve the alert. 
It is also possible that use of the Search feature could create this alert.
In that case, it may be possible to clear the alert by making small changes to one or more Independent Variables. 
If all else fails and a Search or Seek operation has been previously executed in the current design session, 
the [AutoSave](/docs/Help/autoSave.html) feature may allow you to fall back to a previous design.

The most likely source of this condition is user input that creates a mathematical difficulty such as division by zero.
For example, in round wire coil springs, 
if the value of OD_Free is exactly twice the value of Wire_Dia, the associated ID_Free will have a value of exactly 0.0.
This will likely create a division by zero situation in the calculation of other variables. 
NaN can appear when mathematical operations involve multiple infinities.

As it is possible to Save or Export a design with this condition,
it is possible to encounter this alert on File : Open or File : Import of a previously saved design.    

If you feel that this alert is not appropriate for your situation, please contact customer support. 

See also: 
 - [NaN](https://en.wikipedia.org/wiki/NaN)  
 - [AutoSave](/docs/Help/autoSave.html)  
 - [Contact Us](/docs/About/ContactUs.html)  

___

<a id="NoFreeIV"></a>  
___

Alert entry #ODOP12
## No Free Independent Variables 
If all [Independent Variables](/docs/Help/terminology.html#independentVar) (inputs) are in 
[Fixed](/docs/Help/terminology.html#fix) status, 
there is nothing left for Search to manipulate in order to achieve a feasible design. 

In order to resolve this situation, put one or more Independent Variables in Free status. 
Specifically, uncheck the checkbox that is positioned between the associated variable's 
value and its units label. 
When in Calculator View, first click the variable in order to open its value change dialog box. 

This condition may block use of the Search, Seek and Trade features. 

It is possible that operation of the [AutoFix](/docs/Help/terminology.html#autoFix) feature 
has contributed to the situation. 

Rather than having a quantity set to a specific value with Fixed status,
it may be appropriate to use [Constraints](/docs/Help/terminology.html#constraints) to 
limit the range of values that quantity can achieve. 

See also:  
 - [Terminology - Independent Variables](/docs/Help/terminology.html#independentVar)  
 - [Terminology - Fix and Free](/docs/Help/terminology.html#fix)  
 - [Terminology - Constraints](/docs/Help/terminology.html#constraints)  
 - [Terminology - AutoFix](/docs/Help/terminology.html#autoFix)  
 - [Setting Values](/docs/Help/settingValues.html)  

___

<a id="FDCL"></a>  
___

Alert entry #ODOP13
## Functionally Determined Constraint Level (FDCL) is enabled 
This variable has a functionally Determined Constraint Level (FDCL) configured and enabled. 

This is not an error situation. 
Rather, this informational alert is intended to make sure that the user is aware that these FDCL type
constraints are enabled. 

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
   
 &nbsp;   
  
 &nbsp;   
   
 &nbsp;   
  
 &nbsp;   

