#### AutoSave

This topic covers the ODOP AutoSave feature and recovery of a design from AutoSave data.  

**On this page:**  
[Background](autoSave.html#Background)  
[ODOP features impacting AutoSave data](autoSave.html#CreateDelete)  
[Recovering a design from AutoSave data](autoSave.html#Recovery)  
[Notes](autoSave.html#Notes)  

___

<a id="Background"></a>  
___

**Background**  

Power failure, system crash or loss of network connectivity prevent a Save operation and 
potentially incur loss of a user's work since the previous Save operation.

Separately, most browser users are conditioned to use the browser "Reload" a.k.a. "Refresh" button 
as a means to recovery from various operational difficulties and anomalies. 
Unfortunately, 
using the browser Reload function with a single page web app such as ODOP 
will likely incur a complete reset of the app potentially 
resulting in loss of work since the previous Save operation. 
Similarly, use of the browser "Back" function followed by "Forward" or 
use of the ODOP logo icon at the left of the menu & tab bar
will  result in reset of the app.   

*Note:*   
*The on-line Help documentation pages are not subject to the same concerns about 
browser Reload, browser Back / Forward and the ODOP logo icon.*

In order to at least partially address these issues,
the ODOP software provides a basic AutoSave feature.
AutoSave data is created and stored locally. 
While not technically a browser "cookie",
AutoSave data utilizes a similar mechanism.
Only one AutoSave design is available at any point in time.
___

<a id="CreateDelete"></a>  
___

**ODOP features impacting AutoSave data**  


- Action : Search, Seek, Trade, Select Size and Select Catalog 
cause AutoSave data to be created before the function.

- File : Open, Save and SaveAs 
cause AutoSave data to be deleted after the function.

- Sign Out deletes AutoSave data.

- Action : Execute and the Tutorial and Demo features are able to save and / or restore AutoSave data. 

- Recovery of a design causes that AutoSave data to be deleted.

- Other operations do not utilize or affect AutoSave data.

___

<a id="Recovery"></a>  
___

**Recovering a design from AutoSave data**  

If AutoSave data exists at the time the app starts, 
it will automatically load and provide a blue pop-up message describing the situation. 

___

<a id="Notes"></a>  
___

**Notes**  

The operation of the AutoSave feature allows a browser refresh / reload or click on the ODOP logo to be used 
as an "undo" for the most recent Action : Search, Seek, Trade, Select Size and Select Catalog. 
From there, an additional browser refresh / reload or press on the ODOP logo will replace the design 
recovered from AutoSave data with the default design type (compression spring) and design (Startup). 

Note that not all operations are recoverable by the current AutoSave implementation. 
Users should save or export frequently and 
use the browser Reload and Back functions only with the understanding that 
design changes applied since your last save or export may be lost. 
The AutoSave feature may assist in recovery but it is not guaranteed to
capture all of the latest changes.  

The AutoSave feature is not available when operating in "private browsing mode" 
(Chrome "Incognito", Edge "InPrivate", Firefox "Private Window", etc.).

___

See also:   
  - [File : Save](menus.html#FileSave)   
  - [File : Export](menus.html#FileExport)   
  - [User accounts](../About/userAccounts.html)   
  
&nbsp;
 
[Help](/docs/Help)
