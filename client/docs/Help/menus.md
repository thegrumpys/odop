# ODOP Menus &nbsp; 

This topic covers the ODOP menu structure. 

### On this page:   
 * [ODOP logo](menus.html#ODOPlogo) 
 * [Sign In...](menus.html#SignIn) 

 - [File : Open...](menus.html#FileOpen) 
 - [File : Save](menus.html#FileSave) 
 - [File : Save As...](menus.html#FileSaveAs) 
 - [File : Delete...](menus.html#FileDelete) 
 - [File : Import...](menus.html#FileImport) 
 - [File : Export](menus.html#FileExport) 
 - [File : DownloadAll](menus.html#FileDownloadAll) 
 - [File : Preferences](menus.html#FilePreferences) 
 - [File : Properties](menus.html#FileProperties) 

 * [Action : Search](menus.html#ActionSearch) 
 * [Action : Seek...](menus.html#ActionSeek) 
 * [Action : Trade...](menus.html#ActionTrade) 
 * [Action : Select Size...](menus.html#ActionSelectSize) 
 * [Action : Select Catalog...](menus.html#ActionSelectCatalog) 
 * [Action : Execute...](menus.html#ActionExecute) 

 - [View : Advanced](menus.html#ViewAdvanced) 
 - [View : Calculator](menus.html#ViewCalculator) 
 - [View : Reports](menus.html#ViewReports) 

 * [Help : Message of the Day](menus.html#HelpMotD) 
 * [Help : Index](menus.html#HelpIndex) 
 * [Help : Demo...](menus.html#HelpDemo) 
 * [Help : Tutorial...](menus.html#HelpTutorial) 
 * [Help : About](menus.html#HelpAbout/index.html) 

___

<a id="ODOPlogo"></a>  
___

## ODOP logo   

The ODOP logo at the far left of the menu bar causes a reload of the app home page. 
This action resets the app.

After reset, if AutoSave data for an in-progress design is available, that data will be reloaded. 
Once reloaded, AutoSave data is cleared.
In most cases the first reset will return the design to the state prior to the most recent
Search, Seek, Trade, Select Size or Select Catalog operation. 
A second consecutive reset removes all in-memory aspects of the previous design and 
returns to the default design type and Startup design.

Considering that it is possible for a reset to cause a loss of work in progress,
it is good practice to save your work (**File : Save** or **File : Export**) 
before invoking a reset of the app.  

See also: 
 - [AutoSave](autoSave.html)   

___

<a id="SignIn"></a>  
___

## Sign In...   

The Sign In button appears on the menu bar between the ODOP logo and the File menu.
Use the Sign In button to create a new user account or log into an existing account.  

See also: 
 - [User Accounts](/docs/About/userAccounts.html)   

___

<a id="FileOpen"></a>  
___

## File : Open...   

The File : Open... menu item produces a dialog box that allows the selection of design type 
(for example, compression, extension and torsion springs) and 
a specific starting design. 
The selected design comes from the cloud-based ODOP Design Library and replaces the current design. 
This starting design may be system provided or a private design saved in a user account. 
System provided designs are marked "[ReadOnly]". 

The dialog also offers a Sign In opportunity to create a new user account 
or to log into an existing account. 

The units system, for example, US Customary units (inches, pounds) 
or metric units (mm, newtons) is established by the selected starting design. 

See also:   
 - [Default Designs](defaultDesigns.html)   
 - [User Accounts](/docs/About/userAccounts.html)   
 - [Units: US customary and metric](SpringDesign/unitsUSmetric.html)   
 - [Import and Export](htt.html#fileImportAndExport)   
 - [ODOP Design Library](terminology.html#designLib)   

___

<a id="FileSave"></a>  
___

## File : Save   

The File : Save menu item updates the current design into the cloud-based ODOP Design Library. 
It is necessary to be logged into a user account. 
If not logged in to a user account, a pop-up providing a Sign In opportunity will appear. 

See also:   
 - [Default Designs](defaultDesigns.html)   
 - [User Accounts](/docs/About/userAccounts.html)   

___

<a id="FileSaveAs"></a>  
___

## File : Save As...   

The File : Save As... menu item saves the current design into the cloud-based ODOP Design Library with a new name.  

It is necessary to be logged into a user account. 
If not logged in to a user account, a button providing a Sign In opportunity will appear.  

In order to support an ability to export designs into files in a local file system, 
when creating names, the characters  
<b> < > : " / \ | ? * </b>  
are replaced with an underscore.

See also:   
 - [Default Designs](defaultDesigns.html)   
 - [User Accounts](/docs/About/userAccounts.html)  
 - [Data Retention Policy](/docs/About/Legal/dataRetentionPolicy.html)  

___

<a id="FileDelete"></a>  
___

## File : Delete...   

The File : Delete... menu item removes the selected design. 
It is necessary to be logged into a user account. 
If not logged in to a user account, a pop-up providing a Sign In opportunity will appear. 

After deleting a design with the same name as a system supplied design, 
the system supplied design is revealed. 
System provided designs are marked "[ReadOnly]". 

There is no un-delete feature. 

See also:   
 - [Default Designs](defaultDesigns.html)   
 - [User Accounts](/docs/About/userAccounts.html)   

___

<a id="FileImport"></a>  
___

## File : Import...   

The File : Import menu item restores a previously exported design as the current design.   

The current design will be replaced by the design being imported.

See also:   
 - [Import and Export](htt.html#fileImportAndExport)  
 - [File : Export](menus.html#FileExport)  

___

<a id="FileExport"></a>  
___

## File : Export   

The File : Export menu item saves the current design as a download into a file in the local file system. 
By default, the file is placed in the user's download folder (directory) with a file name extension of ".json". 
Use browser settings to control the default download folder or be prompted to specify a folder every time. 

See also:   
 - [Import and Export](htt.html#fileImportAndExport)   
 - [File : Import...](menus.html#FileImport)   
 - [File : Download All](menus.html#FileDownloadAll)   
 - [.json files](https://en.wikipedia.org/wiki/JSON)   

___

<a id="FileDownloadAll"></a>  
___

## File : DownloadAll   

The File : Download All  menu item saves all designs from the user's ODOP Design Library into a 
file in .ZIP format in the user's local file system.
The individual design files have a file name extension of ".json".  

Designs are not migrated to the latest version as part of the DownloadAll operation.

The .ZIP file created by Download All contains a directory structure based on design type (Compression, Extension, Torsion, etc.). 
For an "extract all" operation, different operating systems and data compression utilities differ in handling this directory structure. 
 - When using the "Extract all" feature of Microsoft Windows File Explorer, 
it is necessary to remove the last portion of the proposed directory name (the name of the .ZIP file) 
before clicking the "Extract all" button in order to avoid a redundant level in the created directory tree. 
 - When using the Windows "tar" command in a command window, 
 an "extract all" operation (tar -xf) will not create a redundant level in the created directory tree.  

Once extracted from the .ZIP file, designs may be brought into ODOP:Spring app with the [File : Import...](menus.html#FileImport) menu item. 

See also:   
 - [Import and Export](htt.html#fileImportAndExport)   
 - [File : Import...](menus.html#FileImport)   
 - [.json files](https://en.wikipedia.org/wiki/JSON)   

___

<a id="FilePreferences"></a>  
___

## File : Preferences   

The File : Preferences menu item provides access to a group of values that control various aspects of 
ODOP operation. 
Most of these values control behavior of the numerical search algorithm. 
A few control aspects of the on-screen display for Advanced View. 

Name    | Description 
--------|------------
ioopt   | IO option. Influences detail of output in the user interface. Default = 3. Open browser console and increase this value to see more.  Decrease to see less.
maxit   | Iteration limit for Search. Default = 600. See on-line Help entry on Search
weapon  | Reserved for future use
nmerit  | Reserved for future use
fix_wt  | Weight factor for contribution of fixed dependent variable violations to Objective Value. Default = 1.5.
con_wt  | Weight factor for constraint violations in calculation of Objective Value. Default = 1.0
zero_wt | Reserved for future use
viol_wt | Weight factor for sum of constraint violations relative to the Merit Function in calculation of Objective Value. Default = 1.0
mfn_wt  | Weight factor for Merit Function. Influences contribution of the Merit Function relative to constraint violations in calculation of Objective Value. Influences degree of constraint violation in outcome of Seek. Default = 0.005.
objmin  | Convergence criterion for Search. Default = 0.00001. See on-line Help entry on Search
del     | Starting value of the local exploration size. Default = 1.0. See on-line Help entry on Search
delmin  | Convergence criterion for Search. Default = 0.0001. See on-line Help entry on Search
tol     | Pattern Search's pattern break and step cut criterion. Default = 0.0001. See on-line Help entry on Search
smallnum   | Used as test to avoid division by zero. Used to detect unreasonably small values. Default = 1.0e-07
show_units | Setting value to 0 suppresses the units column in Advanced View. Default = 1. Use to reduce the need for horizontal scrolling on small displays.
show_violations | Setting value to 0 suppresses the constraint violations column in Advanced View. Default = 1. Setting value to 2 shows degree of constraint satisfaction as a negative number.
enable_auto_fix | Automatically applies Fixed status to independent variables whose values are changed by user input. Default = 1. Set value to 0 to disable this behavior.
enable_auto_search | When enabled, the Auto Search feature automatically triggers a Search operation after user input. Default = 1. Set value to 0 to disable this behavior.

See also:   
 - [Search](search.html)   
 - [Terminology - Preferences](terminology.html#preferences)   

___

<a id="FileProperties"></a>  
___

## File : Properties   

The File : Properties menu item provides access to a group of user controlled text strings 
(label - value pairs) that can be used to label a design. 
For the coil spring designs, the default labels include: 
COMMENT, 
Contact person, 
Company name, 
Street, 
City, 
State & ZIP, 
Phone, 
Date, 
Part Number, 
Finish 
and other fields. 

The content of these fields is displayed on Report 3. 
Thus, information entered into File : Properties can be used to support the documentation of a spring design. 
See your browser documentation for details on how to print or save into .PDF format a page like Report 3. 
From there, the information can be included as part of a Request for Quotation 
or other transfer of the design information. 

The number of text strings and default labels for these text strings are part 
of the initialState definition for each design type. 

See also:   
 - [View : Reports](menus.html#ViewReports)   
 - [Terminology - Properties](terminology.html#properties)   
 - [Printing](htt.html#printing)   

___

<a id="ActionSearch"></a>  
___

## Action : Search   

The Action : Search menu item and the Search (solve) button invoke the numerical search algorithm 
to provide ODOP's back-solving capability. 
The Search feature gives a flexible approach to invert the dependent-independent relationships of the design equations. 
Search will alter the values of any Free independent variables to find 
a "feasible" design that satisfies constraints and Fixes. 

Specifically, 
Fixed status causes Search to achieve or hold a specified value. 
Free status allows Search to manipulate that variable to achieve a feasible design. 

Search operates to minimize the Objective Value, 
or more specifically, the value of the [objective function](terminology.html#obj). 
The current design is used as a starting point. 
Search stops if the Objective Value falls below OBJMIN. 

Results of a Search are reported in the Result Section that appears 
at the upper portion of the main page (Advanced and Calculator views). 

![Result Section](/docs/Help/img/ResultSectionToolTip.png "Result Section")  

The tooltip associated with the "Status" label of multi-color Feasibility Indicator provides 
the numeric values of the current Objective Value and OBJMIN. 

The Action : Search menu item is enabled and the Search (solve) button appears only when 
the design is **not** feasible. 
Specifically, the Search feature is available only when constraints are violated to the extent that 
the Objective Value is greater than OBJMIN. 
If desired, use the [File : Preferences](menus.html#FilePreferences) menu 
or the increasePrecision [execute](menus.html#ActionExecute) script to adjust the value of OBJMIN. 

See also:   
 - [Search](search.html)   
 - [Feasibility](feasibility.html)   
 - [Feasible Region](terminology.html#feasibleRegion)  
 - [Design Situations](designSituations.html)   
 - [Constraints](terminology.html#constraints)   
 - [FIX and FREE](terminology.html#fix)   
 - [File : Preferences](menus.html#FilePreferences)   

___

<a id="ActionSeek"></a>  
___

## Action : Seek...   

The Action : Seek menu item provides ODOP's goal seeking capability.
The Seek feature can obtain the constrained extreme of any variable, independent or dependent. 

For example in spring design, Seek can be asked to find the lightest material weight 
(or lowest spring rate, least solid height, greatest factor of safety, etc.) 
while maintaining specified objectives for force and deflection, stress, diameters, etc. 

Seek will prompt for the name of the varible to be investigated and the direction (Max or Min) to move in. 

Results of a Seek are reported in the Result Section that appears 
at the upper portion of the main page (Advanced and Calculator views). 

![Result Section](/docs/Help/img/ResultSectionToolTip.png "Result Section")  

The Action : Seek menu item is enabled and the Seek (optimize) button appears only when 
the design **is** feasible. 
Specifically, the Seek feature is available only when no constraints are violated 
or constraints are violated only to the extent that the Objective Value is less than OBJMIN. 
If desired, use the [File : Preferences](menus.html#FilePreferences) menu 
or the increasePrecision [execute](menus.html#ActionExecute) script to adjust the value of OBJMIN. 

The Seek feature does not operate on [Calculation Inputs](/docs/Help/terminology.html#calcInputs). 

See also:   
 - [Seek](seek.html)   
 - [Feasibility](feasibility.html)   
 - [Feasible Region](terminology.html#feasibleRegion)   
 - [Design Situations](designSituations.html)   
 - [File : Preferences](menus.html#FilePreferences)   

___

<a id="ActionTrade"></a>  
___

## Action : Trade...   

The Action : Trade menu item provides a feature to guide the restructuring of goals 
associated with an infeasible design in a way that is most consistent with original objectives. 

For example in spring design, 
if all of the original design objectives cannot be achieved concurrently, 
 one or more (For example: spring cycle life) may be slightly compromised 
in order to maintain the others (For example: weight, loads, deflections, outside diameter and solid height). 

Trade prompts the user step-by-step through a process that starts with a list of violated constraints. 
The user designates the constraints eligible to be relaxed and in what proportions. 
After allowing the user to provide an exploration step size, 
Trade extrapolates to the "nearest" feasible design in the designated direction and offers the user 
the opportunity to accept that set of constraints. 

The Action : Trade menu item is enabled only when the design is **not** feasible. 
Specifically, the Trade feature is available when constraints are violated to the extent that 
the Objective Value is greater than OBJMIN. 
If desired, use the [File : Preferences](menus.html#FilePreferences) menu 
or the increasePrecision [execute](menus.html#ActionExecute) script to adjust the value of OBJMIN. 

See also:   
 - [Trade](trade.html)   
 - [Constraints](terminology.html#constraints)   
 - [Feasibility](feasibility.html)   
 - [Feasible Region](terminology.html#feasibleRegion)   
 - [Design Situations](designSituations.html)   

___

<a id="ActionSelectSize"></a>  
___

## Action : Select Size...   

 The Action : Select Size menu item searches a table for standard sizes nearest 
 to the current value of the designated Independent Variable. 

 If the user selects a standard size from the table, that value will be 
 established for the selected Independent Variable, which is then put in 
 "Fixed" status.  The user should then execute a Search to obtain 
 corresponding values for the other Independent Variables. 
  
 If the currently active design type does not provide a standard size table,
 The Action : Select Size ... menu item will be disabled.
 
 In ODOP:Spring, selecting a new value of Wire_Dia automatically 
 incorporates selection from the appropriate (US, metric) standard size table and 
 automatically puts the selected value in Fixed status. 

See also:   
 - [Spring Design - Select Wire Size](SpringDesign/selectSizeCatalog.html)   

___

<a id="ActionSelectCatalog"></a>  
___

## Action : Select Catalog...   

The Action : Select Catalog menu item selects the closest or otherwise 
most appropriate design from a catalog of stock designs. 

Once the user picks the desired catalog from a drop-down list, 
a selection list containing the "closest" four entries from that catalog appears. 
These designs are ranked based on their Objective Value. 
Thus ODOP chooses from the catalog based on how well the 
catalog design meets the user's objectives (as expressed by Fixes and constraints) 
as opposed to simply choosing designs physically similar to the target design. 
  
 If the currently active design type does not provide at least one catalog,
 The Action : Select Catalog ... menu item will be disabled.

The stock spring catalogs currently supplied with ODOP:Spring include 
generic compression and extension spring catalogs plus 
U.S. Military Standard 24585 (SAE-AS24585) for compression springs 
and MS24586 (SAE-AS24586) for extension springs. 

Note that it may be desirable to save (File : Save, File : Save As or File : Export) 
the current design before selecting a catalog entry. 

See also:   
 - [Spring Design - Select Catalog Entry](SpringDesign/selectSizeCatalog.html)   
 - [Extension spring catalog lookup](htt.html#e_springCatLookup)   

___

<a id="ActionExecute"></a>  
___

## Action : Execute...   

The Action : Execute menu item invokes pre-programmed scripts that can perform 
various tasks for the user. 
For example, the "Welcome" scripts that run when the ODOP:Spring app is started from 
the SpringDesignSoftware.org Getting-Started page are implemented this way. 
  
Typically, users will see only the "increasePrecision" script available for selection. 
This script will alter a group of "preference" values to improve the precision of search results. 
Specifically, after running this script, the Search process will run longer and expend more effort 
to refine the results by perhaps an extra significant digit. 

See also:   
 - [File : Preferences](menus.html#FilePreferences)   


___

<a id="ViewAdvanced"></a>  
___

## View : Advanced   
 
Advanced View is a design type independent display of all input and output variables. 
It provides access to all program features. 

Use the checkboxes in the variables column to control Fix / Free status. 
Use the constraints column to establish or modify Min and/or Max values of constraints on the corresponding variables. 

[Spring variables displayed in Advanced View](/docs/Help/img/ScrCap_3TypeNoted.png)


___

<a id="ViewCalculator"></a>  
___

## View : Calculator   

Calculator View, available for spring design types, 
provides a simplified display of major input and output variables in a compact format specific to spring design. 
Use Advanced View to access the complete set of variables and features. 
 
Select one of the white entry fields to change a value, control Fix / Free status and to establish or modify constraints. 
Fields with an asterisk in the upper left are Dependent Variables. 

Enabled constraints are indicated by a fine border line at the edge of a numeric field. 
A border on the left indicates that a lower (Min) constraint is enabled. 
A border on the right indicates that an upper (Max) constraint is enabled. 
A heavier border on both left and right of a numeric field indicates Fixed status. 
No border line on either left or right indicates Free status and no constraint enabled. 

[Spring variables displayed in Calculator View](/docs/Help/img/ScrCap_3TypeCalcNoted.png)  

___

<a id="ViewReports"></a>  
___

## View : Reports   

Each design type may (or may not) have design type specific reports available on the View menu. 
Each of the currently available coil spring design types offers three reports. 
 - Report 1 provides an overview of the design; basically a spring design specific summary of the most useful information 
 - Report 2 has a focus on stress information and cycle life 
 - Report 3 is intended to be printed or saved into .PDF format so that it can be included as part of a request for quotation 

![Screen capture of Report 1](/docs/Help/img/ScrCap_Report1Noted.png "Report 1")  

Information entered into the File : Properties menu of coil spring design types is included as part of Report 3. 
Thus, this information can be used to support the documentation of a spring design. 
See your browser documentation for details on how to print or save into .PDF format a page like Report 3. 
From there, the information can be included as part of a Request for Quotation or other transfer of the design information. 

See also:   
 - [File : Properties](menus.html#FileProperties)   
 - [Terminology - Properties](terminology.html#properties)   
 - [Printing](htt.html#printing)   

___

<a id="HelpMotD"></a>  
___

## Help : Message of the Day   

The ODOP app Message-of-the-Day provides current information on 
recent and impending releases, planned outages, newly discovered issues and work-arounds. 

The first line contains the date of the most recent update. 
Check this information to stay up-to-date on issues affecting the ODOP software. 

___

<a id="HelpIndex"></a>  
___

## Help : Index   

The Help : Index menu item displays a list of links to the various ODOP on-line Help articles. 
Most of these articles are common to all design types. 
An entry describing [Available Design Types](DesignTypes) is near the bottom of the list. 

A link to a list of [Spring Design Topics](SpringDesign) is near the bottom of the list.
The last link on the list is an alternate way to reach the [About](/docs/About/index.html) articles.

___

<a id="HelpDemo"></a>  
___

## Help : Demo...   

When enabled, the Help : Demo menu item provides a selection list of design type specific 
demonstration sessions. 
If no demonstration sessions are available for that design type, the Help : Demo menu item 
will be disabled. 

See also:   
 - [Spring design demonstration sessions](tutordemo.html)   

___

<a id="HelpTutorial"></a>  
___

## Help : Tutorial...   

When enabled, the Help : Tutorial menu item provides a selection list of design type specific 
tutorial sessions. 
If no tutorial sessions are available for that design type, the Help : Tutorial menu item 
will be disabled. 
 
See also:   
 - [Spring design tutorial sessions](tutordemo.html)   

___

<a id="HelpAbout"></a>  
___

## Help : About   

The Help : About menu item displays information about the ODOP software. 

This information includes: 
 - a link to the "About: articles in the on-line Help 
 - a link to the description page for the current design type
 - a link to the SpringDesignSoftware.org website home page 
 - a link to the Wikipedia article describing open-source software 
 - a description of the ODOP license 
 - the current ODOP software version 
 - the current design type (Model), version and associated units 

___

&nbsp; 
 
[Help](/docs/Help/index.html) 

