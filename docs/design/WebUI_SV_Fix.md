## Ideas regarding the web user-interface for FIX of State Variables

Multiple implementations are possible.  This page is intended to collect ideas and discuss pros & cons.

A state variable FIX can appear as a double sided constraint.
This approach will avoid the need any dedicated FIX value entry columns on the main page making for a cleaner page design.

When a state variable FIX checkbox is active (checked):
 * Both constraint level entry boxes (labeled Min or Max "Value") will become enabled.
 * The previous state of the constraint level entries will be remembered so that they can be re-established later.
 * The associated constraint checkboxes will both  be checked.
 * The current value of the state variable will populate both associated constraint level entry boxes.
 * The user will be able to enter a new value in either constraint level entry box.
    -  In real-time, the value of the other constraint level entry box will update to match the user's entry.
 * The violation values will update to reflect the weighted values.
 * Constraint violation highlights will appear, but may have a different aspect (color, boldness, dashed, etc) than for violated constraints.
 
 