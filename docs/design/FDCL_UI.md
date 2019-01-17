## Functionally Determined Constraint Level - User Interface

Everything that you wanted to know about 
Functionally Determined Constraint Levels
but were afraid to ask.

* * * * * * * * * * * * * * * * * * * * * * 

In SpringSys, a FDCL can be the value of an independent (p)
or dependent (x) variable or a floating point constant (d).
It cannot be a string constant (ds), an integer constant (di) 
or any kind of "freeform" expression.

The FREE command is used to remove a FDCL.

In order to impose a FDCL in SpringSys, 
use the CHANGE command with a valid (variable or constant) name 
where a simple value might otherwise appear.   
Example:   
CHANGE  Stress\_Hook  MAX  Stress\_Lim_Bend

In SpringSys, when an FDCL is established, 
the LIST command STATUS column 
(might show "FIXED") will show "FUNCTION".
The CONSTRAINT LEVELS MIN and MAX columns will show
the current numerical value of the associated FDCL.

**Extension spring FDCLs:**

**Constraint on: &nbsp; &nbsp; &nbsp;  Is current value of:**   

Force\_1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; MIN &nbsp; &nbsp; &nbsp; Initial\_Tension   
Stress\_Initial &nbsp; MIN &nbsp; &nbsp; &nbsp; Stress\_Init_Lo   
Stress\_Initial &nbsp; MAX &nbsp; &nbsp; &nbsp; Stress\_Init_Hi   

Stress\_Hook &nbsp; MAX &nbsp; &nbsp; &nbsp; Stress\_Lim_Bend   

&nbsp;

GitHub issue #179 "Investigate Rectangular Solid handling of "Girth" "
describes how implementing FDCL might be useful for the 
Rectangular Solid design type.

&nbsp;

**User interface alternatives for configuring FDCL in ODOP**

1)  Have the user to enter variable names into the constraint fields.   

I don't think that this is the best approach. It is more consistent to select from a list.


2) Invoke the FDCL configuration process from a menu item that uses a modal dialog.
Most of the details including status indication could be as described below.

I think that #3 is a better alternative.


3) Invoke the FDCL configuration process by clicking in a constraint's value field.

This alternative would produce a modal dialog (or pop-over) that offers an entry field 
for entering constant values plus a selection list containing the names of
all available variables.
Perhaps a radio button is necessary to designate whether the constant value
or the variable name is active.

In order for the user to view / confirm the currently established FDCL configuration,
it would be necessary to click in the constraint's value field and thus 
re-invoke the configuration modal (or pop-over).

Note that it might be necessary to add a property to each name in initialState
in order to designate their availability for selection
(i.e. exclude character strings, selection lists, etc.).

The fact that an FDCL is active could be indicated by color
- of the check mark ?
- of the check box perimeter ?
- of the checkbox cell ?
- of the constraint value background ?   

(note: color of constraint text and color of the perimeter of constraint box are already utilized)

The color of the value background has been mentioned for use in Demo & Tutor sessions
as a way to bring user attention to the subject of the discussion.

It is also possible to show that FDCL is active by adding an icon, likely adjacent to the checkbox.
This approach is less desirable because it requires extra screen real estate.

Perhaps the best approach is to change the color of the checkbox cell.


4)  Can you think of a better approach ?

