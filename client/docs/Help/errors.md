# Errors &nbsp; 

This topic provides details for various messages produced by the software 
including each of the error conditions that may block the 
Action : Search, Seek, Trade and Catalog functions. 

### On this page:   
 - [Invalid Value messages](errors.html#invalid)  
 - [Search errors](errors.html#searchErr)  
 - [Seek errors](errors.html#seekErr)  
 - [Trade errors](errors.html#tradeErr)  
 - [Catalog errors](errors.html#catErr)  
 - [NaN = "Not a Number"](errors.html#NaN)

___

<a id="invalid"></a>  
___

## Invalid Value messages 
Each Independent Variable, Dependent Variable and numeric Calculation Input has a predefined range 
(validmin to validmax) for which it is considered to be valid. 
If a variable has a value outside this range, it is said to be "invalid". 
Just as Search will work to stay within constraint boundaries, 
it will work to keep each variable within its valid range. 

Most commonly, negative values for quantities like diameters are considered to be invalid.

The Alerts facility will identify variables that have values outside their valid range. 
Press the Alerts button to see a list of active alerts. 
Any variables with values outside their valid range will be identified as "INVALID VALUE". 
Independent Variables can be modified directly and are sorted to the top of the list. 
As Dependent Variables cannot be modified directly, 
they are classified with "Info" severity and sorted to the bottom of the list. 
Select the entry in the "Value" column to modify the associated variable's value or the value of its constraints. 

See Also: 
 - [Alerts](/docs/Help/alerts.html) 

___

<a id="searchErr"></a>  
___

## Search Errors 
Conditions that block the operation of Search include: 
 - [No free independent variables](/docs/Help/alerts.html#NoFreeIV) 
 - [Constraints are inconsistent](/docs/Help/alerts.html#Constraint_Inconsistency) 

Follow the link above that corresponds to the message blocking Search.

#### Invalid Values
While usually a situation of having started with invalid values,
it is possible for Search to return a design that contains invalid values. 
The Help links provided in the Alerts panel may provide specific recommendations to help clear the condition. 
In some cases it may be necessary to identify which input(s) are responsible for the invalid values and then
manually adjust the value of those inputs so as to clear the invalid condition. 

Use the AutoSave feature to recover a design as it existed before a Search. 

See Also: 
 - [AutoSave](/docs/Help/autoSave.html) 
 - [Alerts](/docs/Help/alerts.html) 
 - [Setting Values](/docs/Help/settingValues.html)

___

<a id="seekErr"></a>  
___

## Seek Errors 
 Conditions that block the operation of Seek include: 
 - [No free independent variables](/docs/Help/alerts.html#NoFreeIV) 
 - [Constraints are inconsistent](/docs/Help/alerts.html#Constraint_Inconsistency) 

Follow the link above that corresponds to the message blocking Search.

Use the AutoSave feature to recover a design as it existed before a Seek. 

See Also: 
 - [AutoSave](/docs/Help/autoSave.html) 
 - [Alerts](/docs/Help/alerts.html) 
 - [Setting Values](/docs/Help/settingValues.html)

___

<a id="tradeErr"></a>  
___

## Trade Errors 

Use the AutoSave feature to recover a design as it existed before use of the Trade feature. 

See Also: 
 - [AutoSave](/docs/Help/autoSave.html) 
 - [Alerts](/docs/Help/alerts.html) 

Provide links or instructions to resolve each.  

___

<a id="catErr"></a>  
___

## Catalog Errors 

Use the AutoSave feature to recover a design as it existed before use of the Select Catalog feature. 

See Also: 
 - [AutoSave](/docs/Help/autoSave.html) 
 - [Alerts](/docs/Help/alerts.html) 

___

<a id="NaN"></a>  
___

## NaN = "Not a Number" 
  
See also: 
 - [NaN = "Not a Number"](/docs/Help/htt.html#nan)  

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


