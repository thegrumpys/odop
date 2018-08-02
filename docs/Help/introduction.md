 As an introduction to SpringSys, you should first read the section titled
 FEATURES.  This section will build on some of the concepts introduced
 there.  Also, you may wish to refer the section titled TERMINOLOGY while
 reading this section.

 After developing an understanding of a few conceptual issues, the SpringSys
 program can be very simple to use.  In particular, at any time after the
 program has been started and reached the command prompt, the state of the
 program represents a single, unique design.  The current values of the
 various independent variables completely specify the design.  The current
 values of the dependent variables measure the performance of the design
 and thus describe its "state".  The LIST command may be used to examine the
 various values that make up this state.

 The user may use the CHANGE command to alter the value of one of the
 independent variables, thus moving to a new design.  Using the LIST command
 automatically recalculates all of the corresponding dependent variables and
 thus the user immediately sees the altered state of the design.

 If the FIX command is used to establish a value for a dependent variable, a
 SEARCH is required to find appropriate values of the independent variables
 to produce the desired value of that dependent variable.  This process
 effectively inverts the dependent-independent relationships of the design
 equations.

 Because the SEARCH process can be lengthy, the program does not
 automatically perform a SEARCH every time the user CHANGEs a constraint or
 FIXes a dependent variable.  This allows the user to perform a single
 SEARCH after making several changes.

 The design represented by the current state of the program may violate one
 or more constraints.  If no constraints are violated, then that design is
 said to be in the "feasible region".  With a feasible design at hand, the
 user can explore that feasible region.  SEEK will "optimize" some aspect of
 the problem (for example, minimize the weight of material used).  Another
 approach to seek further refinement of the design is to incrementally
 tighten the constraints until no further progress is available.

 If the current design continues to violate one or more constraints after a
 SEARCH, then the user must start a process of compromise to find a workable
 situation.  Perhaps the right move is to use a stronger material.  It is
 then a simple matter to CHANGE the material constants.  Perhaps altering
 one or more constraints of lesser importance will open up a feasible region
 so that more critical constraints can be held firm.  After a search, the
 relative values of the various constraint violations indicate their
 relative leverage in the design problem.  Those constraints that are
 violated the most, have the most influence.  A small amount of motion there
 will have the greatest effect.  The TRADE command has an extrapolation
 algorithm that will locate the nearest feasible point with a minimal amount
 of effort.

 SpringSys is structured to permit the use of multiple search algorithms and
 multiple equation sets.  EQNSET1 handles compression springs while EQNSET2
 handles extension springs.  While the default equation set may be changed
 with the SET command, it is most convenient to allow a startup file to
 select it.

 The SpringSys command interpreter will allow substring abbreviation of
 commands and the various parameter, variable, constant and constraint
 names.  Refer to the discussion under TRICKS for more detail.
