 The following terms have special meanings used in the context of this
 program.

 INDEPENDENT VARIABLES   (inputs, design parameters)
   The independent variables are the inputs of the design equations.
   They are the quantities on the right hand side of the equals sign that
   can be arbitrarily selected by the designer or search routine.  Once
   values are selected for each independent variable, the design is
   completely determined.  A FIX operation on an independent variable
   reduces the computational demand of the numerical search problem.

 DEPENDENT VARIABLES   (outputs, state variables)
   The dependent variables are the outputs of the design equations.
   They are the quantities on the left hand side of the equal sign.
   Frequently dependent variables are measures of the performance of a given
   design and can be thought of as indicating the "state" of the design.  A
   SEARCH operation is required to establish appropriate values of the
   independent variables to produce the desired value of a FIXed dependent
   variable.  A FIX operation on a dependent variable increases the
   computational demand of the numerical search problem.

 CONSTANTS
   Constants are inputs to the design problem and are adjustable by the
   user, but are not manipulated by the search routine or subject to FIX or
   constraints.  Constants typically represent material properties or other
   physical constants.

 CONSTRAINTS
   Constraints are one sided boundaries that represent goals for the design
   problem.  Either dependent or independent variables may be constrained to
   be greater than or less than a simple constant or a functionally
   determined quantity such as a different dependent or independent
   variable.  The documentation section titled "FUNCTION" provides more
   information on this subject.

 CONSTRAINT VIOLATIONS
   A constraint violation represents the difference between the current
   value of a given variable and its corresponding constraint level.  By
   convention, negative values represent constraint satisfaction, positive
   values represent constraint violation.

 FEASIBLE REGION
   A feasible region may be formed within the boundaries represented by the
   various constraints on the design problem.  If a given design satisfies
   all the constraints, it is said to be "feasible" or in the "feasible
   region".  If the constraint levels are set such that the constraints
   overlap, no solution that satisfies the design equations and the
   constraints simultaneously can be found.  The search will terminate with
   multiple constraints violated.  In this case, there is no feasible
   region.

   When faced with the situation where no feasible solution is available,
   the designer must restructure the problem or his goals in some way to
   permit the desired solution.  Perhaps the solution is to use a stronger
   material.  This can be represented by changing a material constant and
   re-executing the search.  Perhaps use of the TRADE command is appropriate.

 OBJECTIVE FUNCTION
   The objective function constitutes the numerical search problem.  It is
   formed as a blend of violated constraints, dependent variable FIX
   violations and in the case of the SEEK command, a "merit function" that
   represents the variable under investigation.  The search routine attempts
   to drive the objective function to zero.

 INTERNAL VARIABLES
   Internal variables control the operation of the program.  They have no
   direct meaning to the design problem.  For further information, refer to
   the documentation on the SET command.

 EQUATION SETS
   SpringSys is configured to handle multiple sets of design equations named
   EQNSET1, EQNSET2, ...  etc.  The current release of SpringSys uses
   EQNSET1 to handle compression springs and EQNSET2 to handle extension
   springs.  The simplest way to use a different equation set is to read an
   existing startup file that uses that equation set.  For example:
     START  EXTEN  NO

 SEARCH ROUTINES
   SpringSys is configured to handle multiple numerical search algorithms
   named SEARCH1, SEARCH2, ...  etc.  The current release of SpringSys
   supplies only one such numerical search algorithm.
