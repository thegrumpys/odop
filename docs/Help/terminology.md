## Terminology

The following terms have special meanings used in the context of this program.

**MATHEMATICAL MODEL**   
A mathematical model is a set of equations that describes the behavior of 
a real world problem of interest.
Within the context of the ODOP software, the terms "mathematical model",
"Design Type" and "Equation Set" are closely related.
Each Design Type has a mathematical model at its core.

For examples, see:   
* [Piston-Cylinder](./DesignTypes/png/PCylDiagram.png) 
* [Rectangular Solid](./DesignTypes/png/RectangularSolidDiagram.png).   

See "Design Types" and "Equation Set" below for more detail.

**DESIGN TYPES**   
A Design Type is a specific design problem.  As noted above, each 
Design Type has a mathematical model of some aspect of the real world
at its core.  Examples included with the ODOP software include a 
Piston-Cylinder design, a Rectangular Solid and a Compression Spring.
A "design" is a specific and unique instance of a Design Type. 
The ODOP software will store multiple designs of each Design Type in 
its database (a.k.a. design library).

**INDEPENDENT VARIABLES** &nbsp;  (inputs, design parameters)   
The independent variables are the inputs of the design equations.
They are the quantities on the right hand side of the equals sign that
can be arbitrarily selected by the designer or search routine. 
Once values are selected for each independent variable, 
the design is completely determined. 
For independent variables, a FIX operation reduces the computational demand 
of the numerical search problem.
See the FIX entry below for more details.

**DEPENDENT VARIABLES** &nbsp;  (outputs, state variables)   
The dependent variables are the outputs of the design equations.
They are the quantities on the left hand side of the equal sign.
Frequently, dependent variables are measures of the performance of a given
design and can be thought of as indicating the "state" of the design. 
A SEARCH operation is required to establish appropriate values of the
independent variables to produce the desired value of a FIXed dependent
variable.  A FIX operation on a dependent variable increases the
computational demand of the numerical search problem.
See the FIX entry below for more details.

**CALCULATION INPUTS** &nbsp;  (constants)   
Referred to as "constants" in earlier versions of the software, 
Calculation Inputs are inputs to the design equations and are adjustable by the
user, but are not manipulated by the search algorithm or subject to FIX or constraints. 
Calculation Inputs frequently represent material properties or other 
physical parameters.

**CONSTRAINTS**   
Constraints are one sided boundaries that represent goals for the design
problem.  Either dependent or independent variables may be constrained to
be greater than or less than a simple constant or a functionally
determined quantity such as a different dependent or independent
variable.  The documentation section titled "FUNCTION" provides more
information on this subject.

In order to establish a constraint, it is necessary to check the corresponding
Minimum or Maximum constraint checkbox and enter a value for the desired 
constraint level in the corresponding entry field.

A [SEARCH](search) operation is required to establish appropriate values of the
free (not FIXed) Independent Variables to meet the specified constraint levels.
In order to save time and provide more predictable operation,
ODOP will stop the search process if it gets very close to a feasible design 
but still violates one or more constraints by a fraction of a percent. 
In this case, the design is referred to as "marginally feasible".

**CONSTRAINT VIOLATIONS**   
A constraint violation represents the difference between the current
value of a given variable and its corresponding constraint level.  By
convention, negative values represent constraint satisfaction, positive
values represent constraint violation.

**FIX**   
The user can establish (i.e. FIX) the value of any variable, independent or dependent.
FIXed status is designated by checking the checkbox immediately to the right
of the variable's value.

FIXing an Independent Variable simply removes that variable from the set that
is manipulated by the Search algorithm.
This reduces the computational effort required for the Search to find a solution.
The user can change the value of an independent variable by 
entering a different value in that variable's value field. 
The corresponding values of dependent variables are calculated and displayed immediately.

FIXing a Dependent Variable is accomplished by establishing a weighted, 
double sided constraint.
This increases the computational effort required for the Search to find a solution.
Once the appropriate FIX checkbox is checked, the user will be able to enter
a target value in either the Minimum or Maximum constraint level entry field.
A Search (menu Action : Search) will be required to establish the desired values.

**FEASIBLE REGION**   
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
re-executing the search. 
Perhaps use of the TRADE feature is appropriate.
For more information, see: [Trade](./trade).

**OBJECTIVE FUNCTION**   
The objective function constitutes the numerical search problem.  It is
formed as a blend of violated constraints, dependent variable FIX
violations and in the case of the [SEEK](seek) feature, a "merit function" that
represents the variable under investigation.  The search algorithm works
to drive the objective function to the lowest value possible.
For more detail, see the Search entry below.

**PREFERENCES** &nbsp; (Internal Variables &nbsp; File : Preferences menu item)   
Preference settings control the operation of the program.  They have no
direct meaning to the design problem.  For further information, refer to 
the Help sections on Preferences and Search.

**PROPERTIES** &nbsp; (File : Properties menu item)   
It is possible to store a series of text strings with a design in order 
to carry descriptive information. 
The File : Properties menu is used to establish a set of label - value 
pairs where the text of the value is set by the user.
The number of labels and the text of the label are established in the design type 
source code in the initialState.js file.

**EQUATION SETS**   
The ODOP software allows for multiple design types and thus multiple sets of 
design equations (mathematical models of a specific design problem) 
to be concurrently available. 
The design equations for a specific design type are contained in a source code
file named eqnset.js.
Each design type gets its own sub-directory within the source code.
For example, currently implemented design types include:
* [Rectangular Solid](./DesignTypes/r_solid)
* [Piston-Cylinder](./DesignTypes/pcyl) 
* [Compression Spring](./DesignTypes/c_spring)   

Design types planned for implementation in the future include:
* [Extension Spring](./DesignTypes/e_spring)   
* [Torsion Spring](./DesignTypes/t_spring)   

The simplest way to use a different design type and equation set is to select an
existing design that uses the desired equation set at the time that the ODOP 
software first starts. 
A default design is typically called "startup".

Additional information on how to implement new ODOP design types is available
in the [NewDesignType](../procedures/NewDesignType) documentation.

**SEARCH**    
The [Search](search) algorithm manipulates the values of independent variables 
so as to determine a minimum value of the objective function. 
For more detail, see Objective Function entry above.
The objective function is constructed such that 
(within the limits of the physical reality represented by the design equations)
constraints and dependent variable FIX violations will be minimized in the process.
Thus, the solution provided by the Search will represent a solution to the 
designer's goals as expressed by constraints and FIXes.

While the ODOP software is modular and can potentially support multiple numerical search algorithms, 
the current ODOP software release supplies only one such numerical search algorithm.
Additional information on the search algorithm is available in the 
[Search](./search) Help entry.   

[Help](./)
