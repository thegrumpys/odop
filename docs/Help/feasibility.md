## FEASIBILITY
 This section is referenced by the message produced when SEARCH converges
 without a feasible solution.  Well, if you are in that situation ...

 Don't panic !  Don't get the idea that the program is unable to find an
 answer when you know that a reasonable answer is available.

 Look at the violations.  Adjust constraint levels.  Repeat the search.


ZM
 When SEARCH terminates without a feasible solution, it generally means that
 two or more constraints are in conflict.  This is not a hopeless situation.
 There is a good possibility that one or more of those constraints is
 needlessly restrictive.  If they are CHANGEd to a less restrictive value, a
 second SEARCH will likely find a feasible solution.

 Use the LIST VIOLATIONS command to determine which constraints are active.
 Examine the requirements of the application and determine if the constraint
 levels associated with any of the active constraint may be relaxed.  Review
 the section titled WHAT_TO_DO_IF.  It describes a number of possible
 (probable) constraint conflicts and recommends a few solutions.  Use the
 LIST FIXED command to review the list of fixed variables.

 Use the CHANGE command to alter the values of the active constraint levels
 to more appropriate values.  Use the FREE command to allow SEARCH to alter
 the value of any variables that are not absolutely determined by the
 application.

 Repeat the SEARCH command.
ZM
 The TRADE command is designed to assist the process of finding a feasible
 design when the designer is faced with two or more conflicting constraints.
 TRADE will use an extrapolation technique to predict the "nearest" feasible
 point from the result of a series of searches.

 You may wish to review the sections titled TRADE_OVERVIEW and TRADE before
 using the TRADE command.

ZM
 To complete the discussion of feasibility, it is appropriate to cover a few
 points about the other side of the coin ...  the situation where a feasible
 solution is available.

 First, remember that "Marginally Feasible" means that the search decided to
 quit when it got within a small fraction of a percent of completely
 feasible, but one or more constraints is still violated by a trivial
 amount.  The search is programmed to stop when very close to a feasible
 solution because it is possible for it to move ever closer to feasibility
 without actually achieving it for an unreasonable amount of time.  The
 OBJMIN internal variable controls the stop  vs.  continue decision.  Use
 LIST INTERNAL and SET OBJMIN xxxxx to control it.

ZM
 When search terminates with a strictly feasible solution (i.e.  OBJ = 0.0),
 the resulting solution point is only one of many possible solution points.
 The entire collection of feasible solution points is referred to as a
 "feasible region".  The boundaries of this region are formed by the various
 constraints.

 SEARCH will terminate when it finds its first feasible solution.  Since
 we have not asked the search to "optimize" anything (refer to SEEK for
 that), it does not have any way to determine that one specific feasible
 design is better than any other feasible design.  The search will simply
 stop and allow the user to examine the results.  This is the reason why the
 feasible result of a search may be very close to one constraint, yet very
 far away from others.

 The SEEK command is designed to assist in evaluating various
 design possibilities within a feasible region.
