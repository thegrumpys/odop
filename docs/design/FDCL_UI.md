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
*Example:*   
CHANGE  Stress\_Hook  MAX  Stress\_Lim_Bend

In SpringSys, when an FDCL is established, 
the LIST command STATUS column 
(might show "FIXED") will show "FUNCTION".
The CONSTRAINT LEVELS MIN and MAX columns will show
the current numerical value of the associated FDCL.
For example, in this SpringSys extension spring output 
the quantity Stress\_Initial is constrained to be a MIN 
of Stress\_Init\_Lo and a MAX of Stress\_Init_Hi.

    DEPENDENT VARIABLES                                       CONSTRAINT LEVELS
                                               STATUS         MIN           MAX
    ID_FREE         =        0.8890  INCHES                   0.1000
    COILS_A         =       10.4000  COILS                    1.0000       50.0000
    RATE            =       17.4088  LB/IN           
    DEFLECT_1       =        0.2298  INCHES          
    DEFLECT_2       =        1.9530  INCHES          
    L_FREE_(W/ENDS) =        2.9385  INCHES          
    L_1             =        3.1683  INCHES          
    L_2             =        4.8915  INCHES          
    L_STROKE        =        1.7233  INCHES                   0.0500
    WEIGHT          =        0.0931  POUNDS          
    SPRING_INDEX    =        9.4265  RATIO           
    STRESS_INITIAL  =    12940.1300  PSI     FUNCTION     10183.3700    16724.5100
    STRESS_2        =    99574.0100  PSI             
    STRESS_HOOK     =   191924.3000  PSI             
    FS_2            =        1.3127  RATIO                    1.1000        1.6000
    FS_CYCLE_LIFE   =        1.2703  RATIO           
    FS_HOOK         =        1.0216  RATIO           
    CYCLE_LIFE      =   794230.0000  CYCLES          
    STRESS_INIT_LO  =    10183.3700  PSI             
    STRESS_INIT_HI  =    16724.5100  PSI             


The SpringSys LIST LEVELS command will report the existing status:

    FUNCTIONALLY DETERMINED CONSTRAINT LEVELS:
    (REFER TO DOCUMENTATION SECTION  "FUNCTION".)

    CONSTRAINT ON:           IS CURRENT VALUE OF:
    ----------------         -------------------
    FORCE_1            MIN   INITIAL_TENSION
    STRESS_INITIAL     MIN   STRESS_INIT_LO
    STRESS_INITIAL     MAX   STRESS_INIT_HI

&nbsp;

**Extension spring FDCLs:**

Extension springs have three FDCLs configured in the default startup file.

**Constraint on: &nbsp; &nbsp; &nbsp;  Is current value of:**   

Force\_1 &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; MIN &nbsp; &nbsp; &nbsp; Initial\_Tension   
Stress\_Initial &nbsp; MIN &nbsp; &nbsp; &nbsp; Stress\_Init_Lo   
Stress\_Initial &nbsp; MAX &nbsp; &nbsp; &nbsp; Stress\_Init_Hi   

One additional FDCL may be routinely configured by the user:

**Constraint on: &nbsp; &nbsp; &nbsp;  Is current value of:**   

Stress\_Hook &nbsp; MAX &nbsp; &nbsp; &nbsp; Stress\_Lim_Bend   

&nbsp;

GitHub issue #179 "Investigate Rectangular Solid handling of "Girth" "
describes how implementing FDCL might be useful for the 
Rectangular Solid design type.

&nbsp;

**User interface alternatives for configuring FDCL in ODOP**

1)  Have the user to enter variable names into the constraint fields.   

*I don't think that this is the best approach. It is more consistent to select from a list.*


2) Invoke the FDCL configuration process from a menu item that uses a pop-up dialog.
Most of the details including status indication could be as described below.

*I think that #3 is a better alternative.*


3) Invoke the FDCL configuration process by clicking in a constraint's value field.

This alternative would produce a modal dialog (or pop-up / pop-over) that offers 
an entry field for entering constant values plus a selection list containing 
the names of all available variables.
Perhaps a radio button is necessary to designate whether the constant value
or the variable name is active.

In order for the user to view / confirm the currently established FDCL configuration,
a tooltip can be provided.

It is likely desirable to add a property to those names in initialState
that are configurable to have a FDCL.
The new property can specify the set of variable names that are eligible for selection.
To be consistent with "cmin" and "max" (the internal variable names for constraint levels), 
the set of eligible names can be "cminchoices" and "cmaxchoices".
Thus, the new property to be added to the Force_1 entry in initialState might look like:

        "cminchoices": { "Initial_Tension" }

If necessary in addition to the tooltip, the fact that an FDCL is active might also 
be indicated by color:
- of the check mark ?
- of the check box perimeter ?
- of the checkbox cell background ?
- of the checkbox cell perimeter ?
- of the constraint value background ?   

Note:   
Color of constraint text and color of the perimeter of constraint box are already utilized.
The color of the constraint value background has been mentioned for use in Demo & Tutor sessions
as a way to bring user attention to the subject of the discussion.

Color choices mentioned in conversation are dark gray, black and dark blue.
If available, a dark violet might be a reasonable choice.

While it is also possible to show that FDCL is active by adding an icon, 
likely adjacent to the checkbox,
this approach is less desirable because it requires extra screen real estate.

Perhaps the best approach is to change the color of the perimeter of the checkbox cell.

**More Notes**   
While the approach described in alternative #3 above might work well for Independent Variables,
the process of imposing FIXed status on Dependent Variables will introduce additional complexity.
The consequences are not fully thought through at this time.

While the current development direction is to hand code the available choices in initialState,
the idea of automatically forming the list based on variables with identical units was discussed.

The alternative of using left click in the constraint value field to supply constant values and
using right click to invoke the FDCL configuration dialog was discussed and rejected.
