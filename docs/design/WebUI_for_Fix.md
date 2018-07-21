## Ideas regarding the web user-interface for FIX

Multiple implementations are possible.  This page is intended to collect ideas and discuss pros & cons.

#### State Variables
A state variable FIX can appear as a double sided constraint.
This approach will avoid the need any dedicated FIX value entry columns on the main page making for a cleaner page design.

When a state variable FIX checkbox is active (checked):
 * Both constraint level entry boxes (labeled Min or Max "Value") will become enabled.
 * The previous state of the constraint level entries will be remembered so that they can be re-established later.
 * The associated constraint checkboxes will both  be checked.
 * The current value of the state variable will populate both associated constraint level entry boxes.
 * The user will be able to enter a new value (the FIX value) in either constraint level entry box.
    -  In real-time, the value of the other constraint level entry box will update to match the user's entry.
    -  The user will not be able to change the value field for a fixed state variable. This field will continue to reflect the value calculated from the design parameters.
 * The violation values will update to reflect the weighted values.
 * Constraint violation highlights will appear, but may have a different aspect (color, boldness, dashed, etc) than for violated constraints.
 
#### Design Parameters   
 The user interface for establishing a FIX of a design parameter can be the same as for establishing the FIX of a state variable, or not.

The differing approach removes the constraint level input boxes and checkboxes when a design parameter is fixed.
The identical approch causes the design parameters to behave as described above.

After discussion, it is not clear which approach is preferred.  Current thinking is that more experience with the web user interface is necessary to make a good decision.
Perhaps input from beta testers will be required to resolve the issue.
 