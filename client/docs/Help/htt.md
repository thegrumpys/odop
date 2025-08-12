# Hints, Tips and Tricks

This topic covers various points that may allow a better user experience with the ODOP software. 

### On this page:  
 - [How to approach a new design problem](htt.html#newDesign)  
 - [Use the power of Search and Seek](htt.html#Search_Seek)  
 - [File : Save As and File : Save](htt.html#fileSaveAndSaveAs)  
 - [File : Import and File : Export](htt.html#fileImportAndExport)  
 - [Side-by-Side comparison of designs](htt.html#sideBySideCompare)  
 - [Maximizing content visible in Help](htt.html#maxVis)  
 - [NaN = "Not a Number"](htt.html#nan)  
 - [Browser refresh and back / forward](htt.html#browserRefresh)  
 - [Auto Fix Feature](htt.html#autoFix)  
 - [Auto Search Feature](htt.html#autoSearch)  
 - [AutoSave Feature](htt.html#autoSave)  
 - [Seek violates constraints](htt.html#SeekViol)  
 - [Off-line Operation](htt.html#offlineOps)  
 - [Bookmark the app](htt.html#bookmark)  
 - [Closing or exiting the app](htt.html#shutdown)  
 - [Password Reset](htt.html#passwordReset)  
 - [Responsive software design](htt.html#responsiveDesign)  
 - [Optimizing for small screens](htt.html#smallScreen)  
 - [Printing](htt.html#printing)  
 - [Design Migration](htt.html#designMigration)  
 - [Extension spring catalog lookup](htt.html#e_springCatLookup)  
 - [How to pronounce ODOP](htt.html#pronounceODOP)  
 - [Reporting problems with the ODOP app](htt.html#reportProblems)  

___

<a id="newDesign"></a>  
___

## How to approach a new design problem 
At a high level, the process is to modify an existing design to reflect the requirements of the application at hand. 
Specifically, the user is expected to modify one of the startup designs by use of the 
[Fix feature](terminology.html#fix), set [constraints](terminology.html#constraints) as required 
by the application and then run [Search](/docs/Help/terminology.html#search). 

Operation of the [AutoFix feature](terminology.html#autoFix) (enabled by default) makes it a good practice to 
run Search frequently. 
This practice makes it easier to identify if (when!) specifying additional values has caused the design problem 
to become over-specified. 

The various [tutorial and demo sessions](tutordemo.html) provide additional insights. 

<!--- ToDo: create a hints article/topic for spring design.  Keep Wire_Dia free.  See guidedDesign.  etc. --> 

See Also:   
 - [Setting Values](settingValues.html)   
 - [Feasibility](feasibility.html)   
 - [Design situations](designSituations.html)   
 - [Intro Pages Overview](/docs/About/introPagesOverview.html)   
 - [Search](search.html)   
 - [Getting Started With the Spring Tutorial and Demo](gettingStartedSpring.html)   
 - [Spring design technique](/docs/Help/SpringDesign/spring_oview.html#Technique)   

___

<a id="Search_Seek"></a>  
___

## Use the power of Search and Seek  

Optimization software like ODOP offers considerable leverage over a calculator approach. 
If you find that you are repeatedly entering trial values of Independent Variables and then 
examining the corresponding values of Dependent Variables 
it is likely that you are missing out on the power that the ODOP software has to offer. 
You should be expressing your goals for the design by establishing the values for 
constraints and FIXes and then using the [Search](/docs/Help/terminology.html#search) 
and [Seek](/docs/Help/terminology.html#seek) features. 

The [Tutorial and Demo](/docs/Help/tutordemo.html) features offer multiple examples 
of the best way to utilize the Search and Seek features. 

___

<a id="fileSaveAndSaveAs"></a>  
___

## File : Save As and File : Save  
A design investigation may evolve through a sequence of preliminary or candidate designs. 
As each candidate design is established, it can be marked with a **File : Properties** comment 
and saved into the Design Library with **File : Save As**. 
In particular, it may be desirable to save the current design before selecting a 
new standard size or catalog item. 

The [ODOP Design Library](terminology.html#designLib) is a database physically located on 
an Internet server, a.k.a. "in the cloud". 
Design information stored in the Design Library does not appear on the local storage of your computer. 
In order to save designs into the Design Library it is necessary to sign into an 
[ODOP User Account](/docs/About/userAccounts.html).  

___

<a id="fileImportAndExport"></a>  
___

## File : Import and File : Export 
The ODOP app can export the state of the current design as a download into a file in the local file system. 
By default, the file is placed in the user's download folder (directory) 
with a file name extension of ".json". 
Use browser settings to control the default download folder or 
to be prompted to specify a folder every time. 

The [File : Import](menus.html#FileImport) menu item will restore a previously exported design as the current design.  

See Also: 
  - [File : DownloadAll](menus.html#FileDownloadAll)  
  - [.json files](https://en.wikipedia.org/wiki/JSON)   
 

___

<a id="sideBySideCompare"></a>  
___

## Side-by-Side comparison of designs 
It is generally possible to open two tabs in the same browser session with an ODOP design session in each. 
With a widescreen monitor, two independent browser sessions can provide a 
non-overlapping side-by-side positioning of two separate ODOP sessions thus 
facilitating comparison of two designs. 
Adjustments the browser's font size or "zoom" scale may be necessary for best results. 

One of the two ODOP sessions can be the current design.
The other session can open a saved design or import a previously exported design for comparison.

One of the two ODOP sessions can keep a current most desirable design. 
The other browser session can continue forward with additional trial designs. 
The side-by-side aspect of the screen layout can help quickly identify the preferred design. 

The AutoSave feature can provide a before / after comparison for Search, Seek and Trade. 

See also:   
 - [Using AutoSave in before / after comparisons](/docs/Help/autoSave.html#BeforeAfter)  
 - [Responsive software design](htt.html#responsiveDesign)  
 - [Optimizing for small screens](htt.html#smallScreen)  

___

<a id="maxVis"></a>  
___

## Maximizing content visible in Help 
The on-line documentation (Help) is based on a "theme" that is responsive to the available 
width of the window. 
If the window is sufficiently wide, the header and trailer information appears on the left. 
As the width of the window is reduced, the header and trailer information will move to top and bottom. 
While somewhat counter-intuitive, a reduced width window actually allows greater width for the content. 
Several places in the ODOP Help topics have images and tables that will benefit from the greater 
width. 

___

<a id="nan"></a>  
___

## NaN = "Not a Number"   
If you see "NaN" where you expect to see a number, 
it is likely because the software has encountered a computational issue like division by zero. 
It is possible that a single calculation problem will propagate NaN into many output values. 

The Alerts facility (Alerts button) provides warning messages for physically impossible 
designs that may be the source of NaN and other computational difficulty. 
So, if you encounter NaN where you expect a numeric value, 
examine the Alerts for additional messages. 

See Also:   
 - [Alerts](/docs/Help/alerts.html)   
 - [Wikipedia NaN](https://en.wikipedia.org/wiki/NaN)  

___

<a id="browserRefresh"></a>  
___

## Browser refresh and back / forward 
Unfortunately, using the browser Reload a.k.a. "Refresh" function with a single page 
web app such as ODOP will likely result in a complete reset of the main page and 
potential loss of a user's work since the previous Save operation. 
Similarly, use of the browser "Back" function followed by "Forward" will likely result in 
reset of the main page. 

The [AutoSave](autoSave.html) feature can partially mitigate the consequences of an unintended 
browser reset (refresh). 

Note: 
The on-line documentation pages (Help) are not subject to the same concerns about browser refresh 
and browser back / forward. 

___

<a id="autoFix"></a>  
___

## Auto Fix Feature   
The [Auto Fix](/docs/Help/terminology.html#autoFix) feature 
automatically sets Fixed status on variables modified by the user. 
It is enabled by default.  

Auto Fix applies only to future changes. 
It does not affect any existing variables in Fixed status.  

The Auto Fix feature is helpful in that it eliminates the surprise experienced by new users 
when Search modifies a value that they thought they had established. 
The downside of Auto Fix is that tends to create over-specified [design situations](/docs/Help/designSituations.html) 
which can be difficult to recognize. 
Specifically, the [Auto Fix](/docs/Help/terminology.html#autoFix) feature may contribute to unintentionally 
placing [Independent Variables](/docs/Help/terminology.html#independentVar) in [Fixed](/docs/Help/terminology.html#fix) status.

See Also:
 - [Terminology Auto Fix](/docs/Help/terminology.html#autoFix)  
 - [Auto Fix](/docs/Help/autoFixSearchStdSize.html#autoFix)  
 - [Terminology Fix & Free](/docs/Help/terminology.html#fix)  
 - [Design Situations](/docs/Help/designSituations.html)  

___

<a id="autoSearch"></a>  
___

## Auto Search Feature   
The [Auto Search](/docs/Help/terminology.html#autoSearch) feature automatically triggers a Search operation after user input. 
It is enabled by default.  

Having Search run after every input should allow the user to better understand which of multiple inputs 
causes the design to become infeasible.

See Also:
 - [Terminology Auto Search](/docs/Help/terminology.html#autoSearch)  
 - [Auto Search](/docs/Help/autoFixSearchStdSize.html#autoSearch)  
 
___

<a id="autoSave"></a>  
___

## AutoSave Feature   
The ODOP software offers a basic AutoSave feature. 
See [AutoSave](autoSave.html) for details. 

___

<a id="SeekViol"></a>  
___

## Seek violates constraints 
Designs created by Seek will have violated constraints.

Small violations of multiple constraints is expected behavior. 
In fact, it is an indication that Seek is operating properly and 
leaving no "slack" remaining in any relationship that can help achieve a more favorable result. 

Seek is balancing the "reward" gained by violating constraints with the penalty for violating those constraints.

If the remaining constraint violations are undesired, run Search.
Search will find a nearby feasible design.
Yet another Seek may (or may not) find a design with slightly smaller constraint violations than the first Seek.

The File : Preferences... value mfn_wt has an impact on the amount of constraint violation produced by Seek. 
Smaller values of mfn_wt will produce less constraint violation. 
Very small values of mfn_wt will result in Seek ignoring the contribution of its target variable.   

Finally, if the remaining constraint violations are a problem, 
try offsetting (tightening) the constraint levels by an amount similar to the violation. 
Run Seek again. 
The result should be close to the desired target. 

___

<a id="offlineOps"></a>  
___

## Off-line Operation 
Off-line operation is not currently supported. 

If a design session is in progress when network connectivity is lost, 
it is possible that design activity can continue but it will not be possible to 
save into the design library or open new designs from the library 
until network connectivity is restored. 
It should be possible to use the **File : Export** menu to save designs to 
local storage even after a loss of network connectivity. 

___

<a id="bookmark"></a>  
___

## Bookmark the app   
It is possible to save a couple clicks in opening the app. 
Bookmark (or create a favorite): 

https://odop.springdesignsoftware.org/ 

___

<a id="shutdown"></a>  
___

## Closing or exiting the app 
Use  **File : Save As** or **File : Export** to preserve the current state of a design in progress. 
Sign out by using "Sign Out" on the menu bar (positioned right of the ODOP icon and left of the File menu). 
Finally, close the browser tab or browser window containing the ODOP app. 

___

<a id="passwordReset"></a>  
___

## Password reset 
See: [Password Reset](/docs/About/userAccounts.html#passwordReset) 

Once you have established a password, 
simply [launch the ODOP:Spring app](/docs/Help/launchODOP.html) 
and click the "**Sign In...**" button at the left of the menu bar in order to get to the Sign In page. 
It is also possible to launch the app from the SpringDesignSoftware.org home page, 
Getting Started page or any of the three spring type pages. 

___

<a id="responsiveDesign"></a>  
___

## Responsive software design 
As a "responsive" web app, the ODOP software will change its screen layout and 
input behavior in response to the capabilities of the user's device. 
Specifically, as available screen width diminishes, 
sections on the right of the Advanced View main page will reposition to the bottom of the page. 
This means that more vertical scrolling will be required but font sizes will remain legible, 
even on a small screen device such as a smartphone. 
Note that while operation on a small screen device may be possible, 
the scrolling necessary to accommodate screen size limitations may impact productivity. 
For that reason, 
establishing initial impressions with a full size monitor, keyboard and mouse is recommended. 

___

<a id="smallScreen"></a>  
___

## Optimizing for small screens 
Once familiar with the ODOP screen layout and operations on a large screen, 
two **File : Preferences** settings may be used to facilitate operation on a small screen. 
Specifically, 
changing show_units to a value of 0 will suppress display of the Advanced View main page units column 
and changing show_violations to 0 will suppress display of the violations column. 

These settings are saved along with the design. 

___

<a id="printing"></a>  
___

## Printing 
The Report pages offer a **Print** button that directly invokes the printing features of your browser. 
In order to print Advanced View main page or Calculator View main page,
you must manually invoke the print features of your browser. 

Depending on the browser and operating system, it may be possible to 
"print" into a local .PDF file. 
Again, depending on the browser, operating system, selected paper size, and web page 
(Advanced View main page or Calculator View main page versus Report pages), 
it may be necessary to adjust the print scale to obtain optimum results. 
For example, with Chromium based browsers like Google Chrome and Microsoft Chromium Edge, 
when US letter size paper is selected, 
a print scale of 79% may produce the best results for the Advanced View main page or Calculator View main page. 

In order to set print scale with Chromium Edge use the sequence: 
Settings and more / Print / Printer = Microsoft Print to PDF / More settings / Scale (%) = 79. 

___

<a id="designMigration"></a>  
___

## Design Migration 
The term "migration" refers to the process of upgrading designs created in a previous version of the software to the format required by the current version. 
See: [MIGRATION](terminology.html#migration) 

___

<a id="e_springCatLookup"></a>  
___

## Extension spring catalog lookup 
Entries in the provided extension spring catalog (previously MS24586, now SAE-AS24586) 
run toward the low side of the initial tension range targeted by ODOP:Spring's default constraints. 
If experiencing difficulty in selecting springs from the supplied catalog, try setting the 
Calculation Input named SI_Range to a value of "Special_Request". 

See also:   
 - [Extension spring design - Initial_Tension](/docs/Help/DesignTypes/Spring/Extension/description.html#e_springIT_Range) 

___

<a id="pronounceODOP"></a>  
___

## How to pronounce ODOP 
The preferred pronunciation is the individual letters O-D-O-P, 
not a single word like O-dop. 

___

<a id="reportProblems"></a>  
___

## Reporting problems with the ODOP software 
Your feedback is greatly appreciated. 
You may use the email address or phone number on the 
[Contact Us](/docs/About/ContactUs.html) page. 

Also, you may search for and review known issues on 
[GitHub](https://github.com/thegrumpys/odop/issues). 
In order to comment on an existing issue or to open a new issue, 
a (free) GitHub account is required. 
Follow the "Sign up" link at the top right. 
Open a new issue by clicking the green "New issue" button (upper right). 

___

&nbsp;
 
[Help](/docs/Help/index.html) 

&nbsp;
 
<!--- * begin comment *

 - [Unexpected delay when first opening the app](htt.html#delay)  

___

<a id="delay"></a>  
___

## Unexpected delay when first opening the app   
Note that loading the ODOP app the first time may take 20 seconds or longer. 
This is a technical issue related to web hosting during program development. 
A production web hosting arrangement will not have this delay.

 * end comment *
--> 
