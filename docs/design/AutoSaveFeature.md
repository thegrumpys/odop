## AutoSave feature

There are various scenarios in which an AutoSave feature might protect against data loss. 
For example:   

1. Power failure, system crash or loss of network connectivity (prevents Save operation).   
&nbsp;
2. Most browser users are conditioned to use the browser refresh button as a means to 
recovery from various operational difficulties and anomalies. 
Unfortunately, using the browser refresh button or browser back/forward with a 
single page web app such as ODOP will result in a complete reset of the main page 
and potential loss of a user's work since the last Save operation.   
&nbsp;
3. Okta session inactivity timeout (default is 2 hours)   
&nbsp;

An "AutoSave" feature could work to mitigate the potential loss of work. 
Different triggers for AutoSave events are possible.   
For example:   
* After a fixed quantity of time; perhaps user adjustable in preferences 
* After every use of Search, Seek or Trade
* After a change of state 

It may be possible to keep a set of AutoSave points.
Perhaps the user might be able to control how many entries are in the set.
The stack of AutoSaves could be reset every time that the user does a manual Save (SaveAs?) operation.

If it is possible to trigger an asynchronous Save operation by monitoring for a change of state,
it might be possible to wait for a period of inactivity before updating the AutoSave. 
More specifically, it would be desirable to avoid invoking the AutoSave while the user
is in the middle of entering a value or in the middle of Search, Seek or Trade.

Perhaps a normal exit (sign-out) should remove all AutoSave files.
Perhaps a sign-in should look for existing AutoSave files and alert the user that they exist and 
provide instructions on how to recover.

Perhaps it would be useful to have an indicator somewhere near the top of the main page
that indicates that the current state has been AutoSaved.
