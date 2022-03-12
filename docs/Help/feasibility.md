## Feasibility

The multi-colored [Feasibility Status Indicator](feasibilityIndicator.html) provides
feedback on the viability of the current design relative to constraints and FIXes.
 
 If you are in a situation where your current design is described as "<b>NOT FEASIBLE</b>" 
 in bold, red, all-caps ...  
 
 Don't panic!  
 Don't get the idea that the program is unable to find an
 answer when you know that a reasonable answer is available. 
 Similarly, don't get the idea that the program considers a known good design to be bad.
 
 The notion of "feasible" refers to all constraints being met. 
 [SEARCH](search.html) (<b>Action&nbsp;:&nbsp;Search</b> menu) operates to find a feasible design,
 one that meets all FIXes and constraints.
 So, be sure that you have executed a Search.
 
 If you are in a situation where Search does not produce a feasible result ...  
 Look at the violations.  Adjust FIXes and constraint levels.  Repeat the Search.

 When Search terminates without a feasible solution, it generally means that
 two or more constraints are in conflict.  This is not a hopeless situation.
 There is a good possibility that one or more of those constraints is
 needlessly restrictive.  If they are changed to a less restrictive value, a
 second Search may find a feasible solution.

 Active constraints are highlighted in the program user interface. 
 Examine the associated constraint violations to determine 
 which constraints are dominating the situation.
 Evaluate the requirements of the application and determine if the constraint
 levels associated with any of the active constraints may be relaxed. 
 Alter the values of the active constraint levels to more appropriate values by making
 entries in the "value" column under "Min Constraint" or Max Constraint" headings.  
 
 The Help section titled WHAT TO DO IF in [Spring Overview](/docs/Help/SpringDesign/spring_oview.html) describes a 
 number of possible  (probable) constraint conflicts and recommends a few solutions. 
 For example, confirm that any variables in fixed status 
 (check-boxes in the "Fix" column) 
 really need to be FIXed. 
 Uncheck those boxes to allow Search to alter the value of any variables 
 that are not absolutely determined by the application and then repeat the Search.

 [TRADE](trade.html) is designed to assist the process of finding a feasible
 design when the designer is faced with two or more conflicting constraints.
 TRADE will use a series of searches and an extrapolation technique to predict 
 the "nearest" feasible point.

 To complete the discussion of feasibility, it is appropriate to cover a few
 points about the other side of the coin ...  the situation where a feasible
 solution is available.

 "Strictly feasible" is a situation where all constraints are satisfied (i.e.  OBJ = 0.0). 
 "Feasible" is a situation where Search decided to quit when 
 it got within a small fraction of a percent of completely feasible, 
 but one or more constraints is still violated by a trivial  amount. 
 The search is programmed to do this because it is possible 
 for it to spend for an unreasonable amount of time moving ever closer 
 to feasibility  without actually achieving it. 
 The OBJMIN preference setting controls the stop  vs. continue decision. 
 Use the File : Preferences menu item to control it.

 When Search terminates with a strictly feasible solution,
 the resulting solution point is only one of many possible solution points.
 The entire collection of feasible solution points is referred to as a
 "feasible region".  The boundaries of this region are formed by the various
 constraints.

 Search will terminate when it finds its first feasible solution.  Since
 we have not asked the search to "optimize" anything (refer to [SEEK](seek.html) for
 that), it does not have any way to determine that one specific feasible
 design is better than any other feasible design.  The search will simply
 stop and allow the user to examine the results.  This is the reason why the
 feasible result of a search may be very close to one constraint, yet very
 far away from others.

 The SEEK command assists in evaluating various
 design possibilities within a feasible region.

See also:   
 &nbsp; [Terminology](terminology.html)   
 &nbsp; [Design Situations](designSituations.html)   

&nbsp;

 [Help](./)
 