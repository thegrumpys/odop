## Side-by-Side comparison of designs

The ability to compare designs in a side-by-side presentation can be quite useful.   

The PCyl-CLI code has a primitive comparison capability in the LIST DESIGN and LIST STATE commands.
The old DEMO and TUTORIAL features took advantage of this capability to facilitate on-screen before and after comparisons.
Specifically, the process of invoking Search would copy the current state into "oldvalue".
At that point, the search process could be continued or abandoned and other changes made.
LIST DESIGN and LIST STATE then can be used to show current values and old values in a side-by-side format.

Because ODOP is implemented as a web app, it is easy to bring up two different browser windows, position them side-by-side
and then open different designs out of the library in each window.
This approach does not provide coordinated scrolling, but it does get the job done.

A dedicated side-by-side design comparison feature should be considered for a future release of the ODOP software
because it can improve on what is possible with the two browser window approach. 
Specifically:
* Coordinated scrolling
* Compare design variations that have not been saved into the design library 
* Improve utilization of screen real estate; better response to limitations of narrow screen formats

Perhaps it is possible to use the Redux "immutable store" capability in order to have one side of the comparison
"travel back in time" similar to an "UnDo" feature. 
For example, the left side of the display could present the current design 
(screen real estate limitations may make it necessary to suppress constraint and violation information).
The right side of the display could present a previous design from the current session.
Perhaps it would be possible to have the user click on forward and back buttons that take the right window
through the history of the current session.
If this is possible, hopefully there would also be a capability for the user to replace the current state with an older state.

 