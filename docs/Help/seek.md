 When SEARCH terminates with a strictly feasible solution (i.e.  OBJ = 0.0),
 the resulting solution point is only one of many possible solution points.
 The entire collection of feasible solution points is referred to as a
 "feasible region".  The boundaries of this region are formed by the various
 constraints.

 SEARCH will terminate when it finds its first feasible solution.  Since
 we have not asked the search to "optimize" anything, it does not have
 any way to determine that one specific feasible design is better than any
 other feasible design.  The search will simply stop and allow the user to
 examine the results.  This is the reason why the feasible result of a
 search may be very close to one constraint, yet very far away from
 others.

 SEEK should have a feasible design as its starting point.  In the case that
 a SEARCH has terminated without finding a feasible point, use of the TRADE
 feature may be appropriate.  TRADE is discussed in the tutorial and other
 sections of the documentation.

 SEEK will automatically invoke SEARCH to maximize or minimize the indicated
 variable subject to the prevailing constraints and FIXes.  SEEK assumes the
 availability of a region of feasible solutions.

 EXAMPLES:
       SEEK  MIN  WEIGHT
       SEEK  MAX  CYCLE_LIFE
       SEEK  MIN  RATE
       SEEK  MIN  L_SOLID

 SEEK functions by forming a "merit function" from the indicated variable
 and adding that into the "objective function" that the search process
 normally operates on.  In order to blend these two functions in a way that
 will produce the desired results, it is necessary to have an estimate of
 the optimum of the merit function. SEEK will form this estimate by executing a
 preliminary search. 

 The value of the internal variable MFN_WT will have some impact on the
 results produced by SEEK.  Refer to the documentation on the File:Preferences menu item
 for additional information.
