### Setting Values   

This entry covers the input of values into ODOP. 
Additional information on the operation of [Fix, Free](terminology#fix) and [constraints](terminology#constraints) is provided.   
___   

Quick overview:

![Independent variable value input dialog box](./png/ValueInputDialogIndep5Noted.png "Independent variable value input dialog box")   

![Dependent Variable value input dialog box](./png/ValueInputDialogDep5Noted.png "Dependent variable value input dialog box")   
___   

Related topics:

* [Terminology - all](terminology)
* ["Fix" and "Free" terms](terminology#fix)
* ["Search" term](terminology#search)
* [Design Situations](designSituations)
* [Default Designs](defaultDesigns)
* [Feasibility](feasibility)
* [Search](search)
* [Seek](seek)
* [Trade](trade)
* [Hints, Tips and Tricks](htt)
___   


The details:

**Views**

The ODOP View menu provides access to various "Views".  
Each view is just a different way of looking at the current state of the [mathematical model](terminology#mathModel). 
All ODOP [design types](terminology#designTypes) provide an "[Advanced View](menus#ViewAdvanced)" 
that permits input of values and provides access to all features.
The ODOP spring design types also provide output-only "[Reports](menus#ViewReports)" and 
a simplified spring design specific "[Calculator View](menus#ViewCalculator)" that accepts inputs.

User inputs to Advanced View And Calculator View operate similiarly.   

**Input Operations Common to Both Advanced View and Calculator View**

New values for a variable may be supplied by clicking on the desired value and directly over-writing the existing value. 
The existing value may be edited. 
Double-click (double-tap a touch screen) to replace the entire value.  

Use the checkbox immediately right of the variable value to control [Fix / Free](terminology#fix) status. 
Use the checkbox immediately left of constraint levels to enable or disable [constraints](terminology#constraints). 
See the annotated screen capture above. 

_[Independent Variables](terminology#independentVar)_

Free status allows [Search](terminology#search) to change this variable to achieve a feasible design. 
Fix status prevents Search from changing the specified value for this variable.  

While a variable in Fix status cannot have its value adjusted 
in order to contribute to achieving a feasible design, 
Search will adjust the value of other variables in Free status to achieve feasibility. 

_[Dependent Variables](terminology#dependentVar)_

Fix status causes Search to to achieve the specified value for this variable if possible.
Otherwise, a compromise is achieved.

_[Constraints](terminology#constraints)_

When a minimum constraint is enabled, if possible Search will maintain a value greater than the minimum.
Otherwise, a compromise is achieved.

When a maximum constraint is enabled, if possible Search will maintain a value less than the maximum.
Otherwise, a compromise is achieved.   

A constraint that is not enabled will have no influence on the result produced by Search.   

**Operations specific to Calculator View**  

Calculator View provides access to Fix / Free and constraints in a pop-up value input dialog box. 
Use right-click (long press on a touch screen) on the variable of interest to access the associated value input dialog box. 
With Calculator View, values with a darker, more bold font may be changed by the user.
Values with a dim or less bold font are calculated results and cannot be directly changed.
See the annotated images in the "Quick overview" section above.
___   

Notes:   
 - Do not leave a value field blank.  See also: [Not a Number](htt#nan)
 - Input of values less than 1.0 requires a leading zero.  For example, enter "0.25", not ".25".
 
&nbsp;   

[Help](./)