## Early Design Decisions

The ODOP software has a long history. 
In the interest of providing context to anyone looking for insight as to how things got to be the way that they are,
this entry provides a limited amount of detail and insight into the earliest design decisions.

In many ways, the consequences of these early design decisions are deeply entwined into the ODOP code.
While not impossible, considerable effort will be required to change some of these decisions.

&nbsp;

**Unconstrained numerical search and penalty functions**

Early 1970's hardware limitations and the availability of the Hooke and Jeeves Pattern Search algorithm
combined to guide a decision to use unconstrained numerical search and penalty functions.
This decision was reinforced by the limitations of mid-1980's personal computers and MS-DOS.

For more background, see:
 * [Constrained optimization](https://en.wikipedia.org/wiki/Constrained_optimization)
 * [Constraint (mathematics)](https://en.wikipedia.org/wiki/Constraint_(mathematics))
 * [Penalty method, Penalty functions](https://en.wikipedia.org/wiki/Penalty_method)
 * [Pattern Search](https://en.wikipedia.org/wiki/Pattern_search_(optimization))
 * [Hooke-Jeeves-Cpp](https://github.com/akarpovskii/Hooke-Jeeves-Cpp)
 * [Comparison of optimization software](https://en.wikipedia.org/wiki/Comparison_of_optimization_software)
 * [List of optimization software](https://en.wikipedia.org/wiki/List_of_optimization_software)
 * [DECISION TREE FOR OPTIMIZATION SOFTWARE](http://plato.asu.edu/sub/nlores.html)
 * [Figure of merit](https://en.wikipedia.org/wiki/Figure_of_merit)
 * [Fitness function, Merit Function](https://en.wikipedia.org/wiki/Fitness_function)
 * [Loss function, Objective Function](https://en.wikipedia.org/wiki/Loss_function)

&nbsp;
 

**Scaling Denominators**

Early in development it became clear that constraint violations needed to be normalized
as they merge together to form an objective function.
This is accomplished by the scaling denominators (smin, smax, sdlim).
Each violated constraint contributes its penalty to the objective function as a relative, not absolute, amount.


&nbsp;
 

**Objective Function Construction**

The ODOP **Action : Search** menu item invokes the numerical search process to find a feasible solution.
The "merit function" is not active. 
The search process will terminate when the first feasible (or "marginally feasible") solution is found.

In this case, the value of the objective function (OBJ), is computed as 
the sum-of-squares of the normalized constraint violations
plus the sum-of-squares of the normalized Dependent Variable FIX violations.

The Seek feature invoked by the ODOP **Action : Seek** menu item 
adds a normalized "merit function" to the previous calculation of OBJ.

&nbsp;
 

**Summary**

The various limitations to ODOP's formulation of the optimization problem and 
the availability of theoretically better approaches are generally understood. 

Points in favor of the current approach:

 * While not perfectly reliable, it gets the job done most of the time.
It is applied to generally well understood smoothly continuous real-world engineering problems
that while significantly non-linear, have relatively few "pathological" pitfalls.
The design space is relatively well explored before release to an end-user community.

 * We are dealing with engineering applications that do not require perfection or even extraordinary precision.
The necessary engineering approximations are easily achieved.
The design equation and material property approximations failure to model reality 
are generally more significant than any lack of precision of the solution methodology.

 * ODOP remains a proof of concept. 
If the existing scaling denominators and objective function construction were retained,
it would be relative easy to replace the current Pattern Search algorithm with a different
unconstrained minimization algorithm that does not require analytic gradients 
(can use an estimate of the gradient computed as finite differences).
While it would be difficult and time consuming, 
if a major market opportunity justifies it,
it would be possible to replace all of the underlying optimization technology.
In the mean time, the existing implementation provides an infrastructure to discover 
such a major market opportunity.

