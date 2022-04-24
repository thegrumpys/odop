# Terminology

The following terms have special meanings used in the context of this program.

**On this page:**  
[MATHEMATICAL MODEL](terminology.html#mathModel)  
[DESIGN TYPES](terminology.html#designTypes)  
[INDEPENDENT VARIABLES](terminology.html#independentVar)  
[DEPENDENT VARIABLES](terminology.html#dependentVar)  
[CALCULATION INPUTS](terminology.html#calcInputs)  
[CONSTRAINTS](terminology.html#constraints)  
[CONSTRAINT VIOLATIONS](terminology.html#constraintViol)  
[FUNCTION CONSTRAINTS (FDCL)](terminology.html#fdcl)  
[FIX](terminology.html#fix)  
[AUTOFIX](terminology.html#autoFix)  
[FEASIBLE REGION](terminology.html#feasibleRegion)  
[OBJECTIVE FUNCTION](terminology.html#obj)  
[PREFERENCES](terminology.html#preferences)  
[PROPERTIES](terminology.html#properties)  
[EQUATION SETS](terminology.html#eqnSet)  
[SEARCH](terminology.html#search)  
[ODOP DESIGN LIBRARY](terminology.html#designLib)  
[MIGRATION](terminology.html#migration)  
[SPRING DESIGN VARIABLE NAMES](terminology.html#sdnames)  
[FACTOR OF SAFETY](terminology.html#FactorOfSafety)  

___

<a id="mathModel"></a>  
___

**MATHEMATICAL MODEL**   
A mathematical model is a set of equations that describes the behavior of 
a real world problem of interest.
Within the context of the ODOP software, the terms "mathematical model",
"design type" and "equation set" are closely related.
Each design type has a mathematical model at its core.

For examples, see:   
* [Piston-Cylinder](/docs/Help/DesignTypes/png/PCylDiagram.png) 
* [Rectangular Solid](/docs/Help/DesignTypes/png/RectangularSolidDiagram.png).   

See "Design Types" and "Equation Set" below for more detail.

___

<a id="designTypes"></a>  
___

**DESIGN TYPES**   
A Design Type is a specific design problem. 
As noted above, each Design Type has a mathematical model of 
some aspect of the real world at its core. 
Examples included with the ODOP software include
compression, extension and torsion springs,
a Rectangular Solid and a Piston-Cylinder.
A "design" is a specific and unique instance of a Design Type. 
These designs can be opened, edited and saved in a way similar to the way that
word processing documents, spreadsheets and graphic presentations operate.
The ODOP software stores multiple designs of each Design Type in 
its database (a.k.a. design library).

___

<a id="independentVar"></a>  
___

**INDEPENDENT VARIABLES** &nbsp;  (inputs, design parameters)   
The independent variables are the inputs of the design equations.
They are the quantities on the right hand side of the equals sign that
can be arbitrarily selected by the designer or search routine. 
Once values are selected for each independent variable, 
the design is completely determined. 
For independent variables, a Fix status reduces the computational demand 
of the numerical search problem.
See the [Fix](terminology.html#fix) entry below for more details.

___

<a id="dependentVar"></a>  
___

**DEPENDENT VARIABLES** &nbsp;  (outputs, state variables)   
The dependent variables are the outputs of the design equations.
They are the quantities on the left hand side of the equal sign.
Frequently, dependent variables are measures of the performance of a given
design and can be thought of as indicating the "state" of the design. 
A [Search](terminology.html#search) is required to establish appropriate values of the
independent variables to produce the desired value of a dependent
variable in Fix status.  
A a dependent variable in Fix status increases the
computational demand of the numerical search problem.
See the [FIX](terminology.html#fix) entry below for more details.

___

<a id="calcInputs"></a>  
___

**CALCULATION INPUTS** &nbsp;  (previously, "Constants")   
Calculation Inputs are inputs to the design equations and are adjustable by the
user, but are not manipulated by the search algorithm or subject to Fix or constraints. 
Calculation Inputs frequently represent material properties or other 
physical parameters.

___

<a id="constraints"></a>  
___

**CONSTRAINTS**   
Constraints are one sided boundaries that represent goals for the design
problem.  Either dependent or independent variables may be constrained to
be greater than or less than a simple constant or a functionally
determined quantity such as a different dependent or independent
variable or Calculation Input. 
The section below on [FUNCTION CONSTRAINTS](terminology.html#fdcl) 
provides more information on this subject.

In order to establish a constraint, it is necessary to check the corresponding
Minimum or Maximum constraint checkbox and enter a value for the desired 
constraint level in the corresponding entry field.

If any constraint is violated, a [Search](search.html) operation is 
required to establish appropriate values of the free (not Fix status) 
Independent Variables to meet the specified constraint levels.
In order to save time and provide more predictable operation,
ODOP will stop the search process if it gets very close to a feasible design 
but still violates one or more constraints by a fraction of a percent. 
In this case, the design is referred to as "marginally feasible".

[Design Situations](designSituations.html) provides more insights on how
constraints are used to properly specify a design problem.

___

<a id="constraintViol"></a>  
___

**CONSTRAINT VIOLATIONS**   
A constraint violation represents the difference between the current
value of a given variable and its corresponding constraint level.  By
convention, negative values represent constraint satisfaction, positive
values represent constraint violation.

___

<a id="fdcl"></a>  
___

**FUNCTION CONSTRAINTS (FDCL)**   
When a constraint level is determined as the value of another Independent Variable,
Dependent Variable or Calculation Input (as opposed to being a simple constant),
it is referred to as a "Functionally Determined Constraint Level" (FDCL).
Such constraint levels can be configured by selecting (clicking into) the (MIN or MAX)
constraint value field of eligible variables.
After clicking a constraint field of an eligible variable, 
the user will be able to select from a list of variable names available 
to be used as constraint levels.
The variables that can be constrained this way and the variables that are eligible
as choices to be selected as constraints are configured in the design type's
initialState.   

More specific information is available in the On-line Help section covering 
[extension spring constraints](DesignTypes/e_spring.html#e_springConstraints).

___

<a id="fix"></a>  
___

**FIX and FREE**   
The user can establish (i.e. Fix or hold) the value of any variable, independent or dependent.
Fix status is designated by checking the checkbox immediately to the right
of the variable's value.

Placing an Independent Variable in Fix status simply removes that variable from the set that
is manipulated by the Search algorithm.
This reduces the computational effort required for the Search to find a solution.
The user can change the value of an Independent Variable by 
entering a different value in that variable's value field. 
The corresponding values of dependent variables are calculated and displayed immediately.

Fixing a Dependent Variable is accomplished internally by establishing a weighted, double-sided constraint.
While not a significant concern, 
this increases the computational effort required for the Search to find a solution.
Once the appropriate Fix checkbox is checked, 
enter a target value in either the Minimum or Maximum constraint level entry field.
A  [Search](terminology.html#search) (Action : Search menu) is required to establish the desired values.

Clearing the checkbox (Free status) allows the Search to alter the value of the corresponding variable
subject to constraints, if established.

A "design" is determined primarily (ignoring the role of Calculation Inputs for the moment)
by the set of independent variables.
While a variable in Fix status cannot have its value adjusted 
in order to contribute to achieving a feasible design, 
Search will adjust the value of other variables in Free status to achieve feasibility. 
If no variables with Free status are available, Search will produce an error message.

Establishing additional constraints and placing variables in Fix status 
can reduce the ability of Search to find a feasible solution.
Too many constraints and variables in Fix status can create an over-specified situation. 

See also: [Design Situations](designSituations.html)

___

<a id="autoFix"></a>  
___

**AUTOFIX**   

The AutoFix feature, introduced in ODOP version 4.1, automatically applies "Fixed" status 
to variables whose values are changed by user input. 

ODOP Search (invoked by the Search button or the Action : Search menu item) works to 
hold or achieve values in Fixed status.
Alternatively, ODOP Search will manipulate the values of variables not in Fixed status 
(a.k.a. "Free" status) in order to achieve a feasible design.

The preference value "enable_auto_fix", accessed through the File : Preferences... menu,
controls operation of the AutoFix feature.
In order to revert to the previous behavior, set the value of "enable_auto_fix" to 0.

See also: [terminology Fix](terminology.html#fix) 

___

<a id="feasibleRegion"></a>  
___

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
For more information, see: [Trade](/docs/Help/trade.html).

___

<a id="obj"></a>  
___

**OBJECTIVE FUNCTION**   
The objective function constitutes the numerical search problem.  It is
formed as a blend of violated constraints, dependent variable Fix 
violations and in the case of the [SEEK](seek.html) feature, a "merit function" that
represents the variable under investigation.  The search algorithm works
to drive the objective function to the lowest value possible.
For more detail, see the [SEARCH](terminology.html#search) entry below.

___

<a id="preferences"></a>  
___

**PREFERENCES** &nbsp; (Internal Variables &nbsp; File : Preferences menu item)   
Preference settings control the operation of the program. 
They have no direct meaning to the design problem. 
For more specific information, refer to the documentation section
(on-line Help entry) on [Search](search.html) 
and Tutorial session tutor9.

___

<a id="properties"></a>  
___

**PROPERTIES** &nbsp; (File : Properties menu item)   
It is possible to store a series of text strings with a design in order 
to carry descriptive information. 
The File : Properties menu is used to establish a set of label - value 
pairs where the text of the value is set by the user. 

For coil spring designs, the content of these fields is displayed on Report 3. 
Thus, information entered into File : Properties can be used to support the documentation of a spring design.
See your browser documentation for details on how to print or save into .PDF format a page like Report 3. 
From there, the information can be included as part of a Request for Quotation or other transfer of the design information.

The number of labels and the text of the label are established in the design type 
source code in the initialState.js file.

See also:   
[File : Properties](menus.html#FileProperties)   
[View : Reports](menus.html#ViewReports)   
[Printing](htt.html#printing)


___

<a id="eqnSet"></a>  
___

**EQUATION SETS**   
The ODOP software allows for multiple design types and thus multiple sets of 
design equations (mathematical models of a specific design problem) 
to be concurrently available. 
Currently implemented Design Types include:
* [Compression Spring](/docs/Help/DesignTypes/c_spring.html)   
* [Extension Spring](/docs/Help/DesignTypes/e_spring.html)   
* [Torsion Spring](/docs/Help/DesignTypes/t_spring.html)   
* [Rectangular Solid](/docs/Help/DesignTypes/r_solid.html)
* [Piston-Cylinder](/docs/Help/DesignTypes/pcyl.html) 

The simplest way to use a different design type and equation set is to select a 
design type that uses the desired equation set at the time that the ODOP 
software first starts. 
A default design named "Startup" should be available for each design type.
An explanation of how to select a design type and open a design of that type 
is provided in: [Getting Started](gettingStarted.html).   

Additional information on how to implement new ODOP design types is available
in the [NewDesignType](/docs/procedures/NewDesignType.html) documentation.


___

<a id="search"></a>  
___

**SEARCH**    
The term "Search" is used in the sense of "Search for a solution". 
The ODOP Search feature (<b>Action : Search</b> menu item or Search button) 
is used to find a feasible design. 
The action of Search is conceptually similar to a manual recalculation operation in a spreadsheet program.   

The [Search](search.html) algorithm manipulates the values of independent variables 
so as to minimize the Objective Value. 
Because the [OBJECTIVE FUNCTION](terminology.html#obj) is constructed as a sum of 
constraint and dependent variable Fix violations, 
minimizing the Objective Value will minimize violations and 
thus move in the direction of a feasible design.
The solution provided by  Search represents the best available solution to the 
designer's goals as expressed by constraints and Fixes. 
If a solution that meets all of these goals, is not available, 
the search process converges to a compromise.
Typically, this compromise violates multiple constraints.

While the ODOP software is modular and can potentially support multiple numerical search algorithms, 
the current ODOP software release supplies only one such numerical search algorithm.
Additional information on the search algorithm is available in the 
[Search](/docs/Help/search.html) Help entry.   


___

<a id="designLib"></a>  
___

**ODOP DESIGN LIBRARY**   
The design library is a database physically located on an Internet server,
a.k.a. "in the cloud". 
Design information stored in the design library does not appear on the local storage of your computer. 
You must be logged in to an ODOP user account in order to save designs into the ODOP design library.    

See: [User Accounts](/docs/About/userAccounts.html) for details on how to obtain an account.

___

<a id="migration"></a>   
___

**MIGRATION**   
The term "migration" refers to the process of upgrading designs created in a previous 
version of the software to the format required by the current version. 
This process changes the underlying data structures that describe the design. 
Opening a design saved in a prior version will produce a pop-up message of the form:   
"Migrated design from version {_previous version number_} to {_current version number_}".   
Saving the design will eliminate the message on future open operations.
Complete detail on the latest changes is available in GitHub.    

The Help : About menu item lists the Design Model version for the currently open design type 
in the form: "Design Model version   {_current version number_}".

Help : About also displays the current ODOP software version in the form: 
"Software version   {_Major.Minor.Patch_}". 
The ODOP version is independent of the version of any specific design type (a.k.a. model).
A change in software version may or may not be associated with a change in the 
design model version number for any design type.
A change in the version number of any design type will usually be associated with a change in the 
minor or major field of the ODOP software version.   


___

<a id="sdnames"></a>  
___

**SPRING DESIGN VARIABLE NAMES**   

[Variable names illustrated on compression spring Force-Deflection diagram:](/docs/Help/png/ForceVsDeflection.png)
___

<a id="FactorOfSafety"></a>  
___

**FACTOR OF SAFETY**   

This term is described in detail in the spring design overview section: 
[Factor of Safety](SpringDesign/spring_oview.html#FoS)

___

See also:
 - [Terms common to all spring types](SpringDesign/spring_oview.html) 
 - [Compression spring](/docs/Help/DesignTypes/c_spring.html) 
 - [Extension spring](/docs/Help/DesignTypes/e_spring.html) 
 - [Torsion spring](/docs/Help/DesignTypes/t_spring.html) 


___

&nbsp;   

[Help](/docs/Help)
