#### Design Situations   

At the time that a design problem is initially formed by establishing Fixes and constraints,
the high level situation will likely be one of three cases:
  - under specified
  - properly specified  (well formed)
  - over specified
  
Under specified situations have too few constraints. 
There is nothing that prevents a Seek operation from producing a trivial result.
A Seek operation on an under specified situation will likely result in an extremely poor ("degenerate") design.
For example, Seek min weight could produce a design with close to zero dimensions.
Well, at least it has very low weight !

Over specified situations have fixes and constraints that are mutually exclusive, allowing no solution.
A Search operation on an over specified situation will almost certainly produce a result that is Not Feasible.
It is also possible for a properly specified situation with ambitious goals to produce a 
Not Feasible search result. 
Unfortunately, without a careful analysis plus good understanding of the equations and values involved,
it will be difficult to distinguish the difference between these two cases.

More examples are pending a future update to this file.
In the mean tiime ...   
  
See also:   
  - [Feasibility](feasibility)   
  - [Terminology](terminology)   
  
&nbsp;
 
[Help](./)
  