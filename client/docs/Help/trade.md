## TRADE OVERVIEW
 When a design problem is first submitted to the search, the ability of the
 design to meet the stated constraints will be determined.  If the result is
 not feasible, it is necessary for the designer to restructure the design in
 some way.  One approach is to change the design in some qualitative way,
 for example, to select stronger (and probably more expensive) materials. 
 But first, it makes sense to investigate any available compromise where one or more of the
 original objectives is sacrificed in order to maintain the others.

 The TRADE feature may be used to identify those constraints that
 are most leveraged and guide the designer to restructure his goals in a way
 that is most consistent with the original objectives.

 TRADE is similar to SEEK in that it automatically uses the capabilities
 of FIX and SEARCH and some math on the constraint violations to guide a
 probing process.
   
 As an example, when designing a spring, if the designer's objectives for
 high load capacity, small physical size, and low stress conflict, the
 remaining constraint violations at the termination point of a search will
 show directly the relative benefit of increases in coil diameter as opposed
 to increases in solid height.  The designer can use TRADE to investigate
 how much of an increase in solid height is required to achieve a given
 stress reduction as compared to a specific increase in coil diameter.
 These capabilities improve the designer's ability to understand the
 interaction of his objectives with the physics of the problem and thus to
 achieve a design that best meets the problem requirements.
   
 TRADE can ask for "weights" to apply to each of the violated
 constraints.  These weights define the direction that TRADE will
 investigate for constraint relaxation.  Only the relative size of the
 weights matters.  TRADE will normalize the input to unit value.

 TRADE needs the user to enter an exploration size.  A default value will
 be suggested.  Again, the accuracy of this estimate is not critical.  If
 the number entered is too large, TRADE will find a feasible solution,
 report the results and offer the opportunity to start again with a
 smaller step.  If the estimate is too small, a second or even third pass
 through the process may be taken to refine the result.

 The estimate of the appropriate step size can be gauged by looking at the
 magnitude of the constraint violations.  The exploration size in percent
 should be larger than the largest percentage constraint violation.
 Perhaps even larger than the sum of all the constraint violations.


## TRADE

 TRADE provides decision support for relaxation of constraints.  TRADE
 functions to help locate the "nearest" feasible point when a feasible
 solution is not available with the existing set of constraints.  "Nearest"
 in this case means the feasible point reached with the least total 
 relaxation of constraints.

 TRADE uses a quadratic extrapolation scheme to take steps in the
 "violated constraint space" to find the nearest feasible point in a
 specific direction within this violated constraint space.  It is not
 necessarily true that there will always be a solution available in
 any arbitrary direction within the space.
   
 TRADE makes the assumption that the user has performed a search that has
 converged without a feasible solution immediately preceding its use.

 First, the principle axes of the space (i.e.  the currently active
 constraint set) will be listed and the user will be asked to select a
 strategy.  The default "proportional" option should produce the least
 total motion of the constraint levels and thus produce an answer that
 is mathematically closest to the original constraint set.  However, because
 the average designer is likely to have very strong feelings about the
 relative priorities of his constraints, the "arbitrary" option should
 be of greater interest.

   
#### The strategy options:

* PROPORTIONAL - move constraint levels in a proportion determined by their existing violations (as a measure of their influence).

* ARBITRARY - accept user weights for each of the violated constraints to determine the relaxation direction.

The weights assigned may be either positive or negative.  A positive
weight implies relaxation of a constraint, while a negative weight
implies the movement of a constraint in a more restrictive direction.
However, the final extrapolation will always be in the direction of
feasibility.  that is, the point reached by trade will always have less
restrictive constraints than the starting point, even if all the weights
assigned are negative.

* Relax the violated constraints to their existing violations.

   
 After the strategy is selected, TRADE will then ask the user for a
 percentage step size.  A default value determined from the existing
 constraint violations will be suggested.

 TRADE will then take a (full) step in the relaxation direction by this
 percentage.  A search is performed.  If the result is feasible, TRADE
 will ask for a smaller step size.  If not, the program will perform another
 search to investigate a point half way between the two established points.
 A quadratic extrapolation along the three points will be calculated.

 If the extrapolation succeeds, the results will be listed and the user
 asked to adopt those constraint levels.

 If the extrapolation fails, this may be an indication that there is no
 feasible solution available in that direction.  In this case, TRADE will
 list information about and then ask to adopt the constraint levels
 corresponding to the parabola symmetry axis. 

 A "YES" reply to the opportunity to "adopt these constraints" will invoke
 another search and then allow the user to refine the result by returning to
 the strategy selection phase of the process.

 Additional information on TRADE is available in the tutorial and demo features. 

[Help](/docs/Help)