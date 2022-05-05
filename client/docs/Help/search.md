# Search

The term "Search" is used in the sense of "Search for a solution". 
The ODOP Search feature (<b>Action : Search</b> menu item or Search button) 
is used to find a feasible design. 
In the sense that it is a manual operation used to find a solution,
Search is conceptually similar to a manual recalculation operation in a spreadsheet program.   

The **Action : Search** menu invokes the SEARCH algorithm.
SEARCH will alter the values of any free independent variables to find a
design that satisfies all constraints while also achieving the desired
value for each fixed dependent variable.

SEARCH operates to minimize the objective value. 
The current design is used as a starting point.

Only one SEARCH algorithm is available in the software at this time.
It is a "logic" method of compact implementation.  It is "robust" 
(i.e. usually finds the right answer) but not always efficient.

&nbsp;

## Search algorithm tuning parameters

Adjust internal variables with the <b>File : Preferences</b> menu item. 

The search routine returns a line of text (Termination Message) 
indicating the reason for terminating the search. 
Two notifications are common to all search routines.

*   OBJMIN - the search terminated by finding a point with an objective 
function value less than OBJMIN.   
*   MAXIT &nbsp; - the search terminated by exceeding the maximum number of 
iterations.

Return codes unique to SEARCH1 are:

*  DELMIN  - search terminated due to cutting step size to a value 
smaller than DELMIN.  This usually indicates that no 
feasible solution is available. 
Perhaps the use of the TRADE command would be appropriate.

*  SHORT SEARCH - indicates that the search terminated after very few 
steps (iterations) of the search algorithm. 
The remaining constraint violations (if any) may be quite random and not the 
result of extensive refinement by the search.

Preferences (Internal quantities; see: **File : Preferences**) used by SEARCH1 are:

* MAXIT - maximum number of search pattern moves allowed before a 
notification is sent to the user  (default=100). 
Each iteration requires a minimum of N+1 and a maximum of 2N+1 
calls to the equation set routine, where N is the number of free 
independent variables.

* DEL - local exploration size, decreases as step size is cut 
(the default of 1.0 implies a starting exploration of 5% of the parameter value)

* DELMIN - convergence criterion,   (default=1.0E-04)

* OBJMIN - convergence criterion for minimum objective function value
(default=5.0E-05)

* TOL - pattern break and step cut criterion.   
If each new objective function value is not at least (TOL\*100) % 
better than the previous one, 
then a pattern break or step cut occurs.  i.e.:
if NEW\_OBJ+TOL*OLD\_OBJ < OLD_OBJ then (continue with pattern). 
The default value is TOL=1.0E-04 (i.e. TOL=0.0001). 
In general, larger values of TOL will cause a shorter, less accurate search. 
Smaller values of TOL will cause a longer search. 
Extremely small values of TOL (significantly less than 1.0E-08) 
risk causing the comparison to fall off the computer's word length. 
The result is effectively TOL=0.0 producing a failed search. 
Values of TOL greater than 1.0E-02 may result in searches 
that are too inaccurate to be used effectively by SEEK, and TRADE.   
 
 
 [Help](/docs/Help)