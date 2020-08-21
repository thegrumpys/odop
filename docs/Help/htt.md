### Hints, Tips and Tricks

This topic covers various points that may allow a better user experience with the ODOP software.  

**On this page:**  
[File : Save As and File : Save](htt#fileSaveAndSaveAs)  
[File : Import and File : Export](htt#fileImportAndExport)  
[Side-by-Side comparison of designs](htt#sideBySideCompare)  
[Maximizing content visible in Help](htt#maxVis)  
[NaN = "Not a Number"](htt#nan)  
[Browser refresh and back / forward](htt#browserRefresh)  
[AutoSave Feature](htt#autoSave)  
[Off-line Operation](htt#offlineOps)  
[Unexpected delay when first opening the app](htt#delay)  
[Bookmark the app](htt#bookmark)  
[Closing or exiting the app](htt#shutdown)  
[Password Reset](htt#passwordReset)  
[Responsive software design](htt#responsiveDesign)  
[Printing](htt#printing)  
[Design Migration](htt#designMigration)  
[How to pronounce ODOP](htt#pronounceODOP)  
[Reporting problems with the ODOP app](htt#reportProblems)  

___

<a id="fileSaveAndSaveAs"></a>  
___

**File : Save As** and **File : Save**  
A design investigation may evolve through a sequence of preliminary or candidate designs.
As each candidate design is established, it can be marked with a **File : Properties** comment
and saved into the design library with **File : Save As**.
In particular, it may be desirable to save the current design before selecting a 
new standard size or catalog item.

The design library is a database physically located on an Internet server,
a.k.a. "in the cloud". 
Design information stored in the design library does not appear on the local storage of your computer. 
In order to save designs into the design library it is necessary to be logged into an ODOP user account. 
See: [User Accounts](../About/userAccounts).

___

<a id="fileImportAndExport"></a>  
___

**File : Import** and **File : Export**  
The ODOP app can export the state of the current design as a download into a file in the local file system.
By default, the file is placed in the user's download folder (directory)
with a file name extension of ".json". 
Use browser settings to control the default download folder or 
be prompted to specify a folder every time.   

The **File : Import** menu item will restore a previously exported design as the current design. 

___

<a id="sideBySideCompare"></a>  
___

**Side-by-Side comparison of designs**   
Depending on available screen size, 
it may be possible to open two browser sessions with an ODOP design session in each.
Adjustments the browser's font size or "zoom" scale may be necessary for best results.
A non-overlapping side-by-side positioning of the windows will then 
facilitate comparison of two designs.   

One of the two browser sessions can keep the current most desirable design.
The other browser session can continue forward with additional trial designs.
The side-by-side aspect of the screen layout can help quickly identify the preferred design.

___

<a id="maxVis"></a>  
___

**Maximizing content visible in Help**   
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

**NaN = "Not a Number"**   
If you see "NaN" where you expect to see a number, 
it is likely because the software is dealing with a computational issue
like division by zero.
It is possible that a single calculation problem will propagate NaN into many output values.   

Report 1 of the Spring design types provides warning messages for physically unrealizable
spring designs that may be the source of NaN and other computational difficulty.
So, if you encounter NaN where you expect a numeric value, check Report 1 for additional messages.

___

<a id="browserRefresh"></a>  
___

**Browser refresh and back / forward**   
Unfortunately, using the browser Reload a.k.a. "Refresh" function with a single page 
web app such as ODOP will likely result in a complete reset of the main page and 
potential loss of a user's work since the previous Save operation. 
Similarly, use of the browser "Back" function followed by "Forward" will likely result in 
reset of the main page.   

Note: 
The on-line documentation pages (Help) are not subject to the same concerns about browser refresh 
and browser back / forward.   

___

<a id="autoSave"></a>  
___

**AutoSave Feature**   
The ODOP software offers a basic AutoSave feature.
See [AutoSave](autoSave) for details.   

___

<a id="offlineOps"></a>  
___

**Off-line Operation**   
Off-line operation is not currently supported. 
If a design session is in progress when network connectivity is lost, 
it is possible that design activity can continue but it will not be possible to
save into the design library or open new designs until network connectivity is restored.   

___

<a id="delay"></a>  
___

**Unexpected delay when first opening the app**   
Note that loading the ODOP app the first time may take 20 seconds or longer. 
This is a technical issue related to web hosting during program development. 
A production web hosting arrangement will not have this delay.

___

<a id="bookmark"></a>  
___

**Bookmark the app**   
It is possible to save a couple clicks in opening the app.
Bookmark (or create a favorite): https://odop.herokuapp.com/
___

<a id="shutdown"></a>  
___

**Closing or exiting the app**   
Use  **File : Save As** or **File : Export** to 
preserve the current state of a design in progress. 
Sign out by using "Logout" on the File menu or 
use the browser Reload a.k.a "Refresh" function and then click the "Logout" button.
Finally, close the browser tab or browser window containing the ODOP app.

___

<a id="passwordReset"></a>  
___

**Password reset**   
Use your existing username (email address) and password to login at:   
[https://dev-729070.okta.com](https://dev-729070.okta.com)   
After login, drop down the menu in the upper right that displays your first name
and then use the Change Password section of the Settings page.  

If you don't remember the current password,
select "Forgot password?" under "Need help signing in?" 
on the Sign-in page,

___

<a id="responsiveDesign"></a>  
___

**Responsive software design**   
Developed as a "responsive" web app, the ODOP software will change its screen layout and 
input behavior in response to the capabilities of the user's device. 
Specifically, as available screen width diminishes,
sections on the right of the main page will reposition to the bottom of the page.
This means that more vertical scrolling will be required but font sizes will remain legible,
even on a smartphone.
Note that while operation on a smartphone may be possible, 
the scrolling necessary to accommodate screen size limitations may impact productivity.
Similarly, while it is possible to use the ODOP app from a mobile device, 
establishing initial impressions with a full size monitor, keyboard and mouse is recommended.   

___

<a id="printing"></a>  
___

**Printing**   
Use the print features of the browser.
Depending on the browser and operating system, it may be possible to
"print" into a local .PDF file.
Again, depending on the operating system, browser, web page (main "Design" page versus Report pages) 
and selected paper size,
it may be necessary to adjust the print scale to obtain optimum results.
For example, with Chromium based browsers like Google Chrome and Microsoft Chromium Edge
when US letter size paper is selected, 
a print scale of 79% may produce the best results for the main "Design" page.
In order to set print scale with Chromium Edge use the sequence:
Settings and more / Print / Printer = Microsoft Print to PDF / More settings / Scale (%) = 79.   

___

<a id="designMigration"></a>  
___

**Design Migration**   
The term "migration" refers to the process of upgrading designs created in a previous version of the software to the format required by the current version. 
See: [MIGRATION](terminology#migration)    

___

<a id="pronounceODOP"></a>  
___

**How to pronounce ODOP**   
The preferred pronunciation is the individual letters O-D-O-P, 
not a single word like O-dop.

___

<a id="reportProblems"></a>  
___

**Reporting problems with the ODOP software**   
Your feedback is greatly appreciated.
You may use the email address or phone number on the [Contact Us page](../About/ContactUs).
Also, you may search for and review known issues on 
[GitHub](https://github.com/thegrumpys/odop/issues).
In order to comment on an existing issue or to open a new issue, a (free) GitHub account is required.
Follow the "Sign up" link at the top right.
Open a new issue by clicking the green "New issue" button (upper right).

___

&nbsp;
 
[Help](./)
