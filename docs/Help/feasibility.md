## Feasibility
 
 If you are in a situation where when Search does not produce a feasible result ...   
 
 Don't panic!  
 Don't get the idea that the program is unable to find an
 answer when you know that a reasonable answer is available.

 Look at the violations.  Adjust constraint levels.  Repeat the search.

 When [SEARCH](search) terminates without a feasible solution, it generally means that
 two or more constraints are in conflict.  This is not a hopeless situation.
 There is a good possibility that one or more of those constraints is
 needlessly restrictive.  If they are changed to a less restrictive value, a
 second SEARCH may find a feasible solution.

 Active constraints are highlighted in the program user interface (main page). 
 Examine the associated constraint violations to determine 
 which constraints are dominating the situation.
 Evaluate the requirements of the application and determine if the constraint
 levels associated with any of the active constraints may be relaxed. 
 Alter the values of the active constraint levels to more appropriate values by making
 entries in the "value" column under "Min Constraint" or Max Constraint".  
 
 The Help section titled WHAT TO DO IF in [Spring Overview](./SpringDesign/spring_oview) describes a 
 number of possible  (probable) constraint conflicts and recommends a few solutions. 
 For example, confirm that any variables in fixed status 
 (check boxes in the "Fix" column) 
 really need to be fixed.

 Uncheck those boxes to allow SEARCH to alter the value of any variables 
 that are not absolutely determined by the application.

 Repeat the SEARCH command.

 The [TRADE](trade) command is designed to assist the process of finding a feasible
 design when the designer is faced with two or more conflicting constraints.
 TRADE will use an extrapolation technique to predict the "nearest" feasible
 point from the result of a series of searches.

 You may wish to review the Help section on Trade before  using the TRADE feature.

 To complete the discussion of feasibility, it is appropriate to cover a few
 points about the other side of the coin ...  the situation where a feasible
 solution is available.

 First, remember that "Marginally Feasible" means that the search decided to
 quit when it got within a small fraction of a percent of completely
 feasible, but one or more constraints is still violated by a trivial
 amount.  The search is programmed to stop when very close to a feasible
 solution because it is possible for it to move ever closer to feasibility
 without actually achieving it for an unreasonable amount of time.  The
 OBJMIN preference setting  controls the stop  vs. continue decision. 
 Use the File : Preferences menu item to control it.

 When search terminates with a strictly feasible solution (i.e.  OBJ = 0.0),
 the resulting solution point is only one of many possible solution points.
 The entire collection of feasible solution points is referred to as a
 "feasible region".  The boundaries of this region are formed by the various
 constraints.

 SEARCH will terminate when it finds its first feasible solution.  Since
 we have not asked the search to "optimize" anything (refer to [SEEK](seek) for
 that), it does not have any way to determine that one specific feasible
 design is better than any other feasible design.  The search will simply
 stop and allow the user to examine the results.  This is the reason why the
 feasible result of a search may be very close to one constraint, yet very
 far away from others.

 The SEEK command is designed to assist in evaluating various
 design possibilities within a feasible region.

See also:   
 &nbsp; [Terminology](terminology)   
 &nbsp; [Design Situations](designSituations)   

&nbsp;

 [Help](./)
 