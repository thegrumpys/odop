# Ideas regarding the web user-interface for FIX

Multiple implementations are possible.  This page is intended to collect ideas and discuss pros & cons.

# State Variables
A state variable FIX can appear as a double sided constraint.
This approach will avoid the need any dedicated FIX value entry columns on the main page making for a cleaner page design.

When a state variable FIX checkbox is active (checked):
 * Both constraint level entry boxes (labeled Min or Max "Value") will become enabled.
 * The previous state of the constraint level entries will be remembered so that they can be re-established later.
 * The associated constraint checkboxes will both be checked.
 * The current value of the state variable will populate both associated constraint level entry boxes.
 * The user will be able to enter a new value (the FIX value) in either constraint level entry box.
    -  In real-time, the value of the other constraint level entry box will update to match the user's entry.
    -  The user will not be able to change the value field for a fixed state variable. This field will continue to reflect the value calculated from the design parameters.
 * The violation values will update to reflect the weighted values.
 * Constraint violation highlights will appear, but may have a different aspect (color, boldness, dashed, etc) than for violated constraints.
 
# Design Parameters   
 The user interface for establishing a FIX of a design parameter can be the same as for establishing the FIX of a state variable, or not.

The differing approach removes the constraint level input boxes and checkboxes when a design parameter is fixed.
The identical approch causes the design parameters to behave as described above.

After discussion, it is not clear which approach is preferred. 
Current thinking is that more experience with the web user interface is necessary to make a good decision.
Perhaps input from beta testers will be required to resolve the issue.
 
 <br />
 
# October 2018 Discussion 

Reducing the differences on the handling of FIX between Independent and Dependent Variables is 
considered to be a good thing from the user experience point of view. 
As noted in the discussion above, there are multiple ways to achieve the stated objective. 
This section of the discussion simply introduces a few alternatives.   

Note that there is some overlap between this discussion and existing open issues, including: 
 * #131 System-wide input validation 
 *  #31 Allow input of full floating point numbers with exponents such as "1.345e+5"
 *  #25 Handle state variables when FIXED: Auto-Search   

Today's discussion started off with the notion of using InputGroups inside ReactStrap Popovers
to enter values for Independent Variables, Dependent Variables and potentially, Calculation Inputs as well.
In this idea, for IV & DV, the Popover inputGroup has a checkbox used to indicate FIXed status.
An entry to the InputGroup collects all keystrokes and is subject to validation before the value is passed to the 
rest of the system at the time that the Popover clears.
Values displayed on the main page are presented with the format of the toPrecision(4) method.
Values displayed in the InputGroup show the full precision (the current approach for Independent Variables).   

In the case of a change (or FIX) to an Independent Variable, 
there are few differences with the current implementation.
Notably, recalculation of design state via the design equations, violations and Objective Function 
happens once per change as opposed to the current once per keystroke.
In the case of Dependent Variables,
use of the InputGroup automatically puts that Variable in FIXed status with the specified
value filled into lower and upper constraint level fields.
As with the current implementation, the value field for the impacted Dependent Variable
continues to show the output of the equations.
Again, the altered values are imposed on the system only at the time that the Popover clears
as opposed to once per keystroke.   

Hopefully, with implementation of the input validation and the reduction of update frequency,
the previous notion of Auto-Search will be sufficiently workable that it can become the default.
Primarily due to enabling Auto-Search as the default, 
this combination of changes contributes to the goal (stated above) 
to reduce the differences in user experience between changing the value of an Independent Variable
and changing the value of a Dependent Variable.
In each case, the user imposes a change and the results are immediately reflected in the state 
of the system without a need to invoke Search from the Action menu.

It was pointed out that these objectives might be achieved without the use of Popovers.
Thus, using Popovers might not actually improve usability or bring anything fundamentally new into the conversation.
In that situation, the popovers provide little beyond an opportunity for user confusion and the need for more user 
training.


