### Setting Values   

This entry covers the input of values into ODOP. 
Additional information on the operation of [Fix, Free](terminology.html#fix) and [constraints](terminology.html#constraints) is provided.   
___   

Quick overview:

![Free independent variable value input dialog box](/docs/Help/png/ValInpDlgIndepFreeNoted.png "Free independent variable value input dialog box")   
![Fixed independent variable value input dialog box](/docs/Help/png/ValInpDlgIndepFixNoted.png "Fixed independent variable value input dialog box")   

![Free dependent variable value input dialog box](/docs/Help/png/ValInpDlgDepFreeNoted.png "Free dependent variable value input dialog box")   
![Fixed dependent variable value input dialog box](/docs/Help/png/ValInpDlgDepFixNoted.png "Fixed Dependent variable value input dialog box")   

___   

The details:

**Views**

The ODOP View menu provides access to various "Views". 
Each view is just a different way of looking at the current state of the [mathematical model](terminology.html#mathModel). 
All ODOP [design types](terminology.html#designTypes) provide an "[Advanced View](menus#ViewAdvanced)" 
that permits input of values and provides access to all features.
The ODOP spring design types also provide output-only "[Reports](menus.html#ViewReports)" and 
a simplified spring design specific "[Calculator View](menus.html#ViewCalculator)" that accepts inputs.

User inputs to Advanced View And Calculator View operate similiarly.   

**Input Operations Common to Both Advanced View and Calculator View**

New values for a variable may be supplied by clicking on the desired value and directly over-writing the existing value. 
The existing value may be edited. 
Double-click (double-tap a touch screen) to replace the entire value.  
The AutoFix feature, introduced in ODOP version 4.1, 
automatically applies Fixed status to variables whose values are changed by user input. 

Use the checkbox immediately right of the variable value to control [Fix / Free](terminology.html#fix) status. 
Use the checkbox immediately left of constraint levels to enable or disable [constraints](terminology.html#constraints). 
See the annotated screen captures above. 

_[Independent Variables](terminology.html#independentVar)_

Free status allows [Search](terminology.html#search) to change this variable to achieve a feasible design. 
Fix status prevents Search from changing the specified value for this variable.  

While a variable in Fix status cannot have its value adjusted 
in order to contribute to achieving a feasible design, 
Search will adjust the value of other variables in Free status to achieve feasibility. 

_[Dependent Variables](terminology.html#dependentVar)_

Fix status causes Search to to achieve the specified value for this variable if possible.
Otherwise, a compromise is achieved.

_[Constraints](terminology.html#constraints)_

When a minimum constraint is enabled, if possible Search will maintain a value greater than the minimum.
Otherwise, a compromise is achieved.

When a maximum constraint is enabled, if possible Search will maintain a value less than the maximum.
Otherwise, a compromise is achieved.   

A constraint that is not enabled will have no influence on the result produced by Search.   

_[Calculation Inputs](terminology.html#calcInputs)_

The simplified and spring-specific Calculator View provides access to Material\_type and End\_Type only. 
Both are drop-down selection lists. 
Advanced View provides access to the full set of input values for each design type.   

_[AutoFix](terminology.html#autoFix)_

The AutoFix feature, introduced in ODOP version 4.1, 
automatically applies Fixed status to variables whose values are changed by user input.
AutoFix behavior may be controlled in the File : Properties menu. 
Set the value of enable_auto_fix to 1 to enable AutoFix behavior. 
Set the value of enable_auto_fix to 0 to disable AutoFix behavior.
 
&nbsp;   
Notes:   
 - Do not leave a value field blank.  See also: [Not a Number](htt.html#nan)
 - Input of values in scientific notation, for example: 1.234e5, is supported.
 - Input of values less than 1.0 does not require a leading zero. 
 - A red border around an input field indicates a non-numeric or otherwise invalid value.

&nbsp;   
**Operations specific to Calculator View**  

When in Calculator View, select one of the white entry fields to change a value, 
control Fix / Free status or establish or modify constraints.
See the annotated images in the "Quick overview" section above. 
Fields with an asterisk in the upper left are Dependent Variables. 
  
Fields with a light gray background are calculated results and cannot be directly changed.   
 
___   


Related topics:

* [Terminology - index to all terms](terminology.html)
* ["Fix" and "Free" terms](terminology.html#fix)
* ["AutoFix" term](terminology.html#autoFix)
* ["Search" term](terminology.html#search)
* [Design Situations](designSituations.html)
* [Default Designs](defaultDesigns.html)
* [Feasibility](feasibility.html)
* [Search](search.html)
* [Seek](seek.html)
* [Trade](trade.html)
* [Hints, Tips and Tricks](/docs/Help/htt.html)   

 
&nbsp;   

In getSizeEntries [Help](/docs/Help)
