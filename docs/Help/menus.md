#### ODOP Menus

This topic covers the ODOP menu structure. 
Additional content will be developed as time and priority permits. 

<!--- When there is real content here, don't forget to include it in the appropriate index.md files.  -->

**On this page:**  
[ODOP logo](menus#ODOPlogo)  
[Sign In...](menus#SignIn)  
[File : Open...](menus#FileOpen)  
[File : Save](menus#FileSave)  
[File : SaveAs...](menus#FileSaveAs)  
[Action : Search](menus#ActionSearch)  
[Action : Seek...](menus#ActionSeek)  
[Action : Trade...](menus#ActionTrade)  
[Action : Select Size...](menus#ActionSelectSize)  
[Action : Select Catalog...](menus#ActionSelectCatalog)  
[Action : Execute...](menus#ActionExecute)  
[View : Advanced](menus#ViewAdvanced)  
[View : Calculator](menus#ViewCalculator)  
[View : Reports](menus#ViewReports)  
[Help : Index](menus#HelpIndex)  
[Help : Demo...](menus#HelpDemo)  
[Help : Tutorial...](menus#HelpTutorial)  
[Help : About](menus#HelpAbout)  

___

<a id="ODOPlogo"></a>  
___

**ODOP logo**  

The ODOP logo at the far left of the menu bar resets the app. 
Specifically, the reset operation causes a reload of the app home page.

After reset, if AutoSave data for an in-progress design is available, that data will be reloaded. 
Once reloaded, AutoSave data is cleared.
In most cases the first reset will return the design to the state prior to the most recent
Search, Seek, Trade, Select Size or Select Catalog operation. 
A second reset returns to the default design type and Startup design.

Considering that it is possible for a reset to cause a loss of work in progress,
it is good practice to save your work (**File : Save** or **File : Export**) 
before invoking a reset of the app.  

[See also: AutoSave](autoSave)   
___

<a id="SignIn"></a>  
___

**Sign In...**  

The Sign In button appears on the menu bar between the ODOP logo and the File menu.
Use the Sign In button to create a new user account or log into an existing account.  

[See also: User Accounts](../About/userAccounts)   

___

<a id="FileOpen"></a>  
___

**File : Open...**  

The File : Open menu item produces a dialog box that allows the selection of design type 
(for example, compression, extension and torsion springs) and 
a specific starting design.  

The dialog also offers a Sign In opportunity to create a new user account 
or to log into an existing account.

The units system, for example, US Customary units (inches, pounds) 
or metric units (mm, newtons) is established by the selected starting design.

[See also: Default Designs](defaultDesigns)   
___

<a id="FileSave"></a>  
___

**File : Save**  
Content describing FileSave goes here  


___

<a id="FileSaveAs"></a>  
___

**File : SaveAs...**  
Content describing FileSaveAs goes here  


___

<a id="ActionSearch"></a>  
___

**Action : Search**  

The Action : Search menu item invokes the Search algorithm. 
Search will alter the values of any FREE independent variables to find 
a design that satisfies constraints and FIXes. 

In other words, 
FIXed status causes Search to achieve or hold a specified value. 
FREE status allows Search to manipulate that variable to achieve a feasible design. 

Search operates to minimize the value of the [objective function](terminology#obj). 
The current design is used as a starting point. 
Search stops if the Objective Value falls below OBJMIN.  

[See also: Search](search)   
[See also: Feasibility](feasibility)

___

<a id="ActionSeek"></a>  
___

**Action : Seek...**  
Content describing Action : Seek goes here  


___

<a id="ActionTrade"></a>  
___

**Action : Trade...**  
Content describing Action : Trade goes here  



___

<a id="ActionSelectSize"></a>  
___

**Action : Select Size...**  
Content describing Action : Select Size goes here  



___

<a id="ActionSelectCatalog"></a>  
___

**Action : Select Catalog...**  
Content describing Action : Select Catalog goes here  



___

<a id="ActionExecute"></a>  
___

**Action : Execute...**  
Content describing Action : Execute goes here  



___

<a id="ViewAdvanced"></a>  
___

**View : Advanced**  
 
Advanced View is a design type independent display of all input and output variables.
It provides access to all program features.

Use the checkboxes in the variables column to control FIX / FREE status.
Use the constraints column to establish or modify Min and/or Max values of constraints on the corresponding variables.

[Spring variables displayed in Advanced View](https://www.springdesignsoftware.org/odop/docs/Help/png/ScrCap_3TypeNoted.png)


___

<a id="ViewCalculator"></a>  
___

**View : Calculator**  

Calculator View, available for spring design types, 
provides a simplified display of major input and output variables in a compact format specific to spring design. 
 
Right click (long press on a touch screen) on one of the white entry fields or a darker (more bold) 
numeric value to control FIX / FREE status and to establish or modify constraints on those variables. 
For now, Firefox users need to use Advanced View in order to access FIX / FREE and constraints. 

Enabled constraints are indicated by a fine border line at the edge of a numeric field.
A border on the left indicates that a lower (Min) constraint is enabled.
A border on the right indicates that an upper (Max) constraint is enabled.
A heavier border on both left and right of a numeric field indicates FIXed status.
No border line indicates FREE status and no constraint enabled.


[Spring variables displayed in Calculator View](https://www.springdesignsoftware.org/odop/docs/Help/png/ScrCap_3TypeCalcNoted.png)


___

<a id="ViewReports"></a>  
___

**View : Reports**  
Content describing Reports goes here  



___

<a id="HelpIndex"></a>  
___

**Help : Index**  
Content describing on-line Help goes here  



___

<a id="HelpDemo"></a>  
___

**Help : Demo...**  
Content describing Help Demo goes here  



___

<a id="HelpTutorial"></a>  
___

**Help : Tutorial**  
Content describing Help Tutorial goes here  



___

<a id="HelpAbout"></a>  
___

**Help : About**  
Content describing Help About goes here  

1  

2  

3  

4  

5  

6  

7  

8  

9  

10  

___

&nbsp;
 
[Help](./)

