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


| Trigger | When ODOP saves the copy |
| --- | --- |
| **Search** | Immediately before Search runs. This includes Search from the Action menu, the results table, a variable’s menu, and Search steps in tutorials, demos, and scripts. For example, Tutor 6 creates a copy when Search runs on page 4 and again later. Starting a tutorial, demo, or script by itself leaves the current copy alone. |
| **Automatic Search after an edit** | After applying the edit and before Search runs, if automatic Search is enabled and the edit meets its trigger conditions. This can follow changes to values, fixed/free settings, and constraints. |
| **Seek from the interface** | Immediately before Seek runs. This includes Seek from the Action menu, the results table, variable controls such as spring wire diameter, and design-specific optimization buttons. A script that runs Seek directly skips this step. |
| **Trade** | When Trade starts, then again before each Search it runs. A later Search can replace the original copy after constraints have already changed. |
| **Select Size or Select Catalog** | Before applying your choice. If Select Size then triggers automatic Search, that Search replaces the copy with one that already includes the selected size. |
| **File → Preferences or Properties** | After applying your changes. Preferences can also trigger automatic Search. |

Opening or saving designs can also affect the recovery copy.

- File → Open and Import clear AutoSave data after loading a design. Loading a starting
design through File → New or File → Open also clears it.

- File → Save and Save As clear AutoSave data when saving starts. The copy is already gone
if the save fails.

- AutoSave works whether or not you are signed in. Signing out leaves the copy in your browser.

- Recovering a design clears its AutoSave data.

___

<a id="Recovery"></a>  
___

## Recovering a design from AutoSave data   

ODOP offers recovery when an AutoSave copy is available.

| When | What you select |
| --- | --- |
| At startup, including after a reload | **Yes** in the **ODOP Design Recovery** prompt. |
| While the app is open | **File → New → Load Auto Save**. |
| While the app is open, where File Open is available | **File → Open → Load Auto Save**. |

When you recover a design, ODOP loads the latest available copy into the current tab
and clears it from shared browser storage. Selecting **No** at startup loads the default
design and clears the AutoSave copy once that design loads.

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
