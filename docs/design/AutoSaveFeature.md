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
* After a change in objective function value

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

A bit of conversation and a superficial review of web search results suggests that there are
at least two main design approaches when implementing AutoSave. 
  + The "old school" approach involves creating files of a different file name than the current 
working document. 
An explicit "Save" or "SaveAs" operation for changes to the current document is required.
In this approach, the system is responsible for determining that an AutoSave file can be created 
without a name conflict.   

  + The "modern" approach (Google Docs, MS Office 365) involves keeping the current working document 
up to date with changes as they happen. 
There is no explicit "Save" operation. 
This approach is counter-intuitive for users that keep a document file for use as a template.
They are typically surprized (and annoyed!) to have their master document over-written to
include what were intended as temporary changes.
One possible way out of this problem is to train users to always duplicate the file that they
intend to work on before making any changes. 
This pushes the responsibility for avoiding name conflicts onto the user and in some use cases
requires the user to clean-up the duplicate files that were created for temporary use.

Suppose multiple users are active in the same account.
Is there a possible of conflict on the AutoSave files ?


