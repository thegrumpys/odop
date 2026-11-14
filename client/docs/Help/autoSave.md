# AutoSave

This topic covers the ODOP AutoSave feature and recovery of a design from AutoSave data.  

### On this page:   
 - [Background](autoSave.html#Background)  
 - [ODOP features impacting AutoSave data](autoSave.html#CreateDelete)  
 - [Recovering a design from AutoSave data](autoSave.html#Recovery)  
 - [Using AutoSave in before / after comparisons](autoSave.html#BeforeAfter)  
 - [Notes](autoSave.html#Notes)  

___

<a id="Background"></a>  
___

## Background   

A power failure, system crash or loss of network connectivity can interrupt a Save operation
and put work done since the previous Save at risk.

You might use your browser's Reload or Refresh button when a page stops responding.
Reloading a single-page web app like ODOP resets the app and can discard unsaved work.
Using the browser's Back button followed by Forward, or clicking the ODOP logo at the
left of the menu and tab bar, can also reset the app.

*Note:*   
*The on-line Help documentation pages are not subject to the same concerns about 
browser Reload, browser Back / Forward and the ODOP logo icon.* 

AutoSave gives you a way to recover some of that work.
ODOP stores AutoSave data in your browser's local storage. Tabs and windows on the same
ODOP site in the same browser profile share one AutoSave design. Each new AutoSave replaces
the previous copy.
___

<a id="CreateDelete"></a>  
___

## ODOP features impacting AutoSave data   


- Action → Search, Seek and Trade create AutoSave data before they run. Automatic Search
and optimization buttons that run Seek also create AutoSave data.

- Action → Select Size and Select Catalog create AutoSave data before applying your choice.
If Select Size triggers an automatic Search, the Search replaces that copy with one that
already includes the selected size.

- File → Preferences and Properties create AutoSave data after you apply changes.

- File → Open and Import clear AutoSave data after loading a design. Loading a starting
design through File → New or File → Open also clears it.

- File → Save and Save As clear AutoSave data when saving starts. The copy is already gone
if the save fails.

- AutoSave works whether or not you are signed in. Signing out leaves the copy in your browser.

- Action → Execute, tutorials and demos can create AutoSave data by running actions such as
Search. For example, Tutor 6 creates a copy when it runs Search. Starting a script,
tutorial or demo by itself leaves the current copy alone.

- Recovering a design clears its AutoSave data.

___

<a id="Recovery"></a>  
___

## Recovering a design from AutoSave data   

If AutoSave data exists at the time the app starts, 
a blue pop-up message will indicate that an AutoSave design is available 
and provide the opportunity to recover it. 
Selecting "Yes" recovers the latest available design and clears the copy.
Selecting "No" loads the default design and clears the AutoSave copy once that design loads.

While ODOP is open, you can also recover the copy through **File → New** or, where available,
**File → Open**.
Choose **Load Auto Save** when the button appears. The recovered design replaces the design
in the current tab.

If the copy was created during a tutorial, demo or script, recovery returns you to the
saved design. To resume the tutorial, demo or script after restarting ODOP, launch it again.

If the app is started directly from odop.springdesignsoftware.org without parameters as part of the URL, 
the default is Compression spring, US Customary units and Advanced View. 
If the app is started from SpringDesignSoftware.org, 
the default is the spring type, units and View that are selected there. 

___

<a id="BeforeAfter"></a>  
___

## Using AutoSave in before / after comparisons   

The AutoSave feature can provide a before / after comparison for Search and Seek.
After completing one of those operations, open a new tab or window in the same browser profile
before another action replaces or clears the AutoSave copy. Copy the ODOP address from the
original tab into the new one. Respond "Yes" to recover the latest available copy.
If the operation's copy is still available, the new tab shows the design before the
operation. Switch between the two tabs to compare. Recovery clears the shared copy for
both tabs.

Trade also creates an AutoSave copy when it starts. Some Trade strategies run additional
searches after relaxing constraints. Those searches can replace the original copy with
an intermediate design.

___

<a id="Notes"></a>  
___

## Notes   

Recovering the AutoSave copy can serve as a one-time undo. Reload the app or click the
ODOP logo and choose "Yes" to return to the most recent AutoSave. Any changes made after
that copy was created are lost in the tab where you recover it.

If you reload or click the ODOP logo again before another AutoSave is made, ODOP loads
the default design.

For long-term storage, use File → Save, Save As or Export.

AutoSave captures the design at specific points. Save or export frequently, and keep in mind
that using the browser Reload or Back functions can discard changes made since your last
Save or Export.

AutoSave can work in private browsing mode if the browser allows ODOP to store data.
The browser clears the copy when that private session ends.

___
See also:   
  - [Launching the app](launchODOP.html)   
  - [File : Save](menus.html#FileSave)   
  - [File : Export](menus.html#FileExport)   
  - [User accounts](../About/userAccounts.html)   
  
&nbsp;
 
[Help](/docs/Help/index.html) 
