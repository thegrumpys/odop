# Auto Fix, Auto Search

This topic covers the ODOP Auto Fix and Auto Search features.

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

The Auto Fix feature may be enabled / disabled via 
the checkbox to the right of the Alerts feature on a main page (Advanced View or Calculator View) 
or via the preference value "enable_auto_fix" in File : Preferences. 

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

When checked, a Search is automatically triggered when the current design is not feasible and the cursor moves away from a changed value.
For more detail, enter "AutoSearch" in Help Lookup.
When unchecked, the Search feature executes only when a Search (solve) button is pushed or the Action : Search (solve) menu entry is invoked.
The behavior is the same as the File : Preferences enable_auto_search value. 

While similar to the default recalc behavior of a spreadsheet, 
this behavior can insert a delay in the display of Search results in the message field relative to entering the changed value.

See Also:
 - [Terminology Search](/docs/Help/terminology.html#search)  
