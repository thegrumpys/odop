# Auto Fix, Auto Search

This topic covers the ODOP Auto Fix (AutoFix, Auto-Fix) and Auto Search (AutoSearch, Auto-Search) features.

### On this page:  
 - [Auto Fix](autoFixAutoSearch.html#autoFix)  
 - [Auto Search](autoFixAutoSearch.html#autoSearch)  

___

<a id="autoFix"></a>  
___

## Auto Fix Feature   
The [Auto Fix](/docs/Help/terminology.html#autoFix) feature 
automatically sets Fixed status on variables modified by the user. 
It is enabled by default. 

Auto Fix applies only to future changes.
It does not affect any existing variables in Fixed status.

Auto Fix may be enabled or disabled by: 
 -  a check box on the main pages (Advanced and Calculator Views) to the right of the Alerts feature.   
 **or** 
 - the preference value "enable_auto_fix", accessed through the **File : Preferences...** menu. 
In order to disable Auto Fix, set the value of "enable_auto_fix" to 0. 

The Auto Fix feature is helpful in that it eliminates the surprise experienced by new users 
when Search modifies a value that they thought they had established. 
The downside of Auto Fix is that tends to create over-specified [design situations](/docs/Help/designSituations.html) 
which can be difficult to recognize. 
Specifically, the [Auto Fix](/docs/Help/terminology.html#autoFix) feature may contribute to unintentionally 
placing [Independent Variables](/docs/Help/terminology.html#independentVar) in [Fixed](/docs/Help/terminology.html#fix) status.

See Also:
 - [Terminology AutoFix](/docs/Help/terminology.html#autoFix)  
 - [Terminology Fix & Free](/docs/Help/terminology.html#fix)  
 - [Design Situations](/docs/Help/designSituations.html)  

___

<a id="autoSearch"></a>  
___

## Auto Search Feature
The Auto Search feature automatically triggers a [Search](/docs/Help/terminology.html#search) operation after user input.
It is enabled by default. 

When Auto Search is enabled, 
a Search is automatically triggered when the the user changes a value, the current design is not feasible and the user: 
 - pushes the "Enter" key <br/> **or** 
 - pushes the "Tab" key <br/> **or** 
 - clicks out of the field containing the changed value  
 
When Auto Search is not enabled, 
the Search feature executes only when a **Search** (solve) button is pushed or the **Action : Search** (solve) menu entry is invoked.

Auto Search may be enabled or disabled by: 
 -  a check box on the main pages (Advanced and Calculator Views) to the right of the Alerts feature.  
 **or** 
 - the preference value "enable_auto_search", accessed through the **File : Preferences...** menu. 
In order to disable Auto Search, set the value of "enable_auto_search" to 0.

While similar to the familiar default recalc behavior of a spreadsheet, 
the operation of Auto Search can be a source of user surprise. 
Specifically, if the user delays "Enter", "Tab" or clicking out of the field containing the changed value, 
the (delayed) corresponding update of Search results (Message field and Multi-color Feasibility Indicator) may be unexpected.  

See Also:
 - [Terminology Search](/docs/Help/terminology.html#search)  
 - [Search](/docs/Help/search.html)
 
___

&nbsp;
 
[Help](/docs/Help/index.html) 

&nbsp;
 
 