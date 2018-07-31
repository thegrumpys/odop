## System Control variables and multi-user operation

A collection of "System Control" variables such as:   
IOOPT, MAXIT, WEAPON, NMERIT, FIX_WT, CON_WT, ZERO_WT, VIOL_WT, MFN_WT, OBJMIN, DEL, DELMIN, TOL and SMALLNUM   
are changed by the user in the *File : Preferences* menu item.
In the CLI program, they were changeable in the SET command.

In milestone / Software version 0.6, these quantities may be stored with the design model and thus get reloaded with every File : Open operation.

Some (many?, most?) of these quantantities are more closely tied to system operation and user preferences than a specific design problem.
Thus, it may be appropriate to store them in a place that doesn't reset every time that a new design is opened.

Also, because some of these quantities are associated with the user, 
there is an interaction with ideas and plans for multi-user operation, including user authentication 
(currently planned for implementation after software version 1.0).
Given that (some?, many?, most?) of these quantities should be associated with each user and get loaded when the user authenticates to the system,
the preferred storage location might be in partions of the database associated with the user as opposed to portions associated with designs (the "design library").

Considering that changes to the storage location of these quantities might impact a significant amount of code and fundamental aspects of the Redux store,
it might be desirable to implement the change sooner rather than later.
