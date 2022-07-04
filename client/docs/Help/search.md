# Search 

The term "Search" is used in the sense of "Search for a solution". 
The ODOP Search feature (**Action : Search** menu item or Search button) 
is used to find a feasible design. 
In the sense that it is a manual operation used to find a solution,
Search is conceptually similar to a manual recalculation operation in a spreadsheet program. 

The **Action : Search** menu invokes the SEARCH algorithm. 
SEARCH will alter the values of any free independent variables to find a 
design that satisfies all constraints while also achieving the desired 
value for each fixed dependent variable. 

SEARCH operates to minimize the objective value. 
The current design is used as a starting point. 
Because the [OBJECTIVE FUNCTION](terminology.html#obj) is constructed as a sum of 
constraint and dependent variable Fix violations, 
minimizing the Objective Value will minimize violations and 
thus move in the direction of a feasible design.
The solution provided by Search represents the best available solution to the 
designer's goals as expressed by constraints and Fixes. 
If a solution that meets all of these goals, is not available, 
the search process converges to a compromise. 
Typically, this compromise violates multiple constraints.

Search stops when it finds the first feasible design (Objective Value less than OBJMIN). 
In order to optimize a design, see [Seek](/docs/Help/seek.html). 

While the ODOP software is modular and can potentially support multiple numerical search algorithms, 
only one SEARCH algorithm is available in the software at this time. 
It is a "logic" method of compact implementation. 
It is "robust" (i.e. usually finds the right answer) but not always efficient. 

&nbsp;

## Messages returned by Search   

The search routine returns a line of text (Termination Message) 
indicating the reason for terminating the search. 

#### OBJMIN   
**Search terminated when design reached feasibility (Objective value is less than OBJMIN)**   
The search terminated by finding a design with an objective value less than OBJMIN. 
Only constraint violations contribute to the objective value. 
There is no optimization aspect. 

#### MAXIT   
**Search terminated when iteration count exceeded the maximum limit (MAXIT)**   
The search terminated by exceeding the maximum number of iterations. 

#### DELMIN   
**Search terminated when step size reached the minimum limit (DELMIN)**   
The search terminated due to cutting step size to a value smaller than DELMIN. 
This usually indicates that no feasible solution is available. 
Perhaps the use of the TRADE command would be appropriate. 

When Search terminates on the DELMIN criteria it is possible that the design is over-specified. 
See [Design Situations](/docs/Help/designSituations.html) for additional details. 

#### SHORT SEARCH   
**Low iteration count may produce low precision results.**   
The search terminated terminated after very few steps (iterations) of the search algorithm. 
As the results have not benefited from extensive refinement by the search, 
the remaining constraint violations (if any) may be somewhat random.

&nbsp;

## Search algorithm settings 

Adjust these internal control settings with the [File : Preferences](menus.html#FilePreferences) menu item. 

#### MAXIT   
The maximum number of search pattern moves allowed before a notification is sent to the user (default=600). 
Each iteration requires a minimum of N+1 and a maximum of 2N+1 calls to the equation set routine, 
where N is the number of free independent variables. 

#### DEL   
The starting value of the local exploration size. 
DEL decreases as step size is cut. 
The default of 1.0 implies a starting exploration of 5% of the parameter value. 

#### DELMIN   
The step size convergence criterion (default=1.0E-04). 

#### OBJMIN   
The convergence criterion for minimum objective function value (default=1.0E-05). 

#### TOL   
The pattern break and step cut criterion. 
If each new objective function value is not at least (TOL\*100) % better than the previous one, 
then a pattern break or step cut occurs. 
i.e.: if NEW\_OBJ+TOL*OLD\_OBJ < OLD_OBJ then (continue with pattern). 
The default value is TOL=1.0E-04 (i.e. TOL=0.0001). 
In general, larger values of TOL will cause a shorter, less accurate search. 
Smaller values of TOL will cause a longer search. 
Values of TOL on the scale of 1.0E-08 or smaller 
may not change the result as compared to values closer to the default. 
Values of TOL greater than 1.0E-02 (0.01) may result in searches 
that are too inaccurate to be used effectively by SEEK, and TRADE. 
 
 **Notes:**   
 The improvePrecision execute script 
 (available on the [Action : Execute](/docs/Help/menus.html#ActionExecute) menu) 
 can be used to change a group of settings that collectively work to 
 refine the numeric precision of search result. 
 Specifically, after running this script, 
 the Search process will run longer and expend more effort to refine the results 
 by perhaps an extra significant digit. 
 
&nbsp;
 
 [Help](/docs/Help)
 
