#### AutoSave

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

- Action : Search, Seek, Trade, Select Size and Select Catalog 
cause AutoSave data to be created before the function.

- File : Open, Save, SaveAs and Logout 
cause AutoSave data to be deleted after the function.

- Action : Execute and the Tutorial and Demo features are able to save and / or restore AutoSave data. 

- Other operations do not utilize or affect AutoSave data.

If AutoSave data exists at the time the app starts, 
a "Load AutoSave" button will be available.
Pressing this button will cause the AutoSave data to replace the current design.

Note that not all operations are recoverable by the current AutoSave implementation. 
Users should save or export frequently and 
use the browser Reload and Back functions only with the understanding that 
design changes applied since your last save or export may be lost. 
The AutoSave feature may assist in recovery but it is not guaranteed to
capture all of the latest changes.  

&nbsp;
 
[Help](./)
