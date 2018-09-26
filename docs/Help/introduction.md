## Introduction

As an introduction to the ODOP software, you should first read the section titled FEATURES. 
This section will build on some of the concepts introduced there. 
Also, you may wish to refer the section titled TERMINOLOGY as part of reading this section.

After developing an understanding of a few conceptual issues, the ODOP
program can be very simple to use.  In particular, at any time after the
program has been started, the state of the program represents a single, unique design. 
The current values of the various independent variables completely specify the design. 
The current values of the dependent variables measure the performance of the design
and thus describe its "state".  

The user may enter new values into the entry fields for independent variables 
thus moving to a new design. 
The program automatically recalculates all of the corresponding dependent variables and
thus the user immediately sees the altered state of the design.

Constraint level entry fields are used to express MAX and MIN bounds for both independent and dependent variables.

A SEARCH (Action : Search menu) is required to find appropriate values of the independent variables
to produce the desired (constrained) values of all independent and  dependent variables. 
The program does not automatically perform a SEARCH every time the user changes a constraint or
FIXes a dependent variable. 
This allows the user to perform a single SEARCH after making several changes.

FIX checkboxes and constraint level entry fields are used before a SEARCH to establish values for dependent variables.
This process effectively inverts the dependent-independent relationships of the design equations.

The design represented by the current state of the program may violate one
or more constraints.  If no constraints are violated, then that design is
said to be in the "feasible region".  With a feasible design at hand, the
user can explore that feasible region.  SEEK (Action : Seek menu) will "optimize" some aspect of
the problem (for example, minimize the weight of material used). 
Another approach to seek further refinement of the design is to incrementally
tighten the constraints until no further progress is available.

If the current design continues to violate one or more constraints after a
SEARCH, then the user must start a process of compromise to find a workable
situation.  Perhaps the right move is to use a stronger material. 
Perhaps it is a simple matter to change the material properties. 
Perhaps altering one or more constraints of lesser importance will open up a feasible region
so that more critical constraints can be held firm.  After a search, the
relative values of the various constraint violations indicate their
relative leverage in the design problem.  Those constraints that are
violated the most, have the most influence.  A small amount of motion there
will have the greatest effect.  The TRADE feature (Action : Trade menu)  has an extrapolation
algorithm that will locate the nearest feasible point with a minimal amount of effort.

ODOP is structured to permit multiple design types to be available concurrently.
At the time that the program first initializes, the user can specify a design type
and then select from a list of existing designs of that type in order to begin work.
For each design type, a default starting point named "startup" should always be availabe.

As of this writing, three design types are included with the ODOP software.
The Piston-Cylinder design type is a small demonstration problem. 
As a design problem, it is interesting because it illustrates competing objectives.
The Rectangular Solid design type is also a small demonstration problem. 
It consists of a mathematical model of a rectangular solid (cube, box)
and is intended to act as an easy to understand showcase of ODOP program capabilities. 
It is a design situation that most people will be familiar and comfortable with.
Work to develop capabilities for designing coil springs is currently in progress.
Support for compression springs is complete.
Support for extension and torsion springs is planned. 
Additional information is available at:
[Design Types](./DesignTypes/index).

