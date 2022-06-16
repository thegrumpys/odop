# Seek

ODOP Seek provides powerful facilities for asking "What if ... " 
and "What's best ?" kinds of questions. 
In order to do this, Seek utilizes the concepts of mathematical optimization. 
Specifically, the program can seek the constrained extreme of any variable, independent or dependent. 

For example, within the context of coil spring design 
ODOP:Spring can be asked to find the lightest material weight 
(or lowest spring rate, least solid height, greatest factor of safety, greatest cycle life, etc.) 
while maintaining specified objectives for force-deflection characteristics, stress, diameters, etc. 
This "goal seeking" capability makes ODOP:Spring much more than a spring calculator and 
one of the most powerful and intuitive coil spring design alternatives available. 

When [Search](search.html) terminates with a strictly feasible solution (i.e. OBJ = 0.0), 
the resulting solution point is only one of many possible solution points. 
The entire collection of feasible solution points is referred to as a "feasible region". 
The boundaries of this region are formed by the various constraints. 

The ODOP Search feature will terminate when it finds its first feasible solution. 
Since we have not asked the search to "optimize" anything, it does not have 
any way to determine that one specific feasible design is better than any 
other feasible design. 
The search will simply stop and allow the user to examine the results. 
This is the reason why the feasible result of a search may be very close to one constraint, 
yet very far away from others. 

Seek should have a feasible design as its starting point. 
At a minimum, it should be understood that a feasible design is available. 
In the case that a Search has terminated without finding a feasible point, 
use of the [Trade](trade.html) feature may be appropriate. 

Seek will automatically invoke SEARCH to maximize or minimize the indicated 
variable subject to the prevailing constraints and FIXes. 
SEEK assumes the availability of a region of feasible solutions. 

## Seek examples: 
* SEEK  MIN  Weight
* SEEK  MAX  Cycle\_Life
* SEEK  MIN  Rate
* SEEK  MIN  L\_Solid
* SEEK  MAX  FS_2
* SEEK  MAX  Energy

Seek functions by forming a "merit function" from the indicated variable 
and adding that into the "objective value" that the search process 
normally operates on. 
In order to blend these two functions in a way that will produce the desired results, 
it is necessary to have an estimate of the optimum of the merit function. 
SEEK will form this estimate by executing a preliminary search. 

## Seek algorithm settings 

Adjust internal control settings with the [File : Preferences](menus.html#FilePreferences) menu item. 

The value of the internal variable MFN_WT will have some impact on the 
results produced by SEEK. 
Refer to [Search](search.html) for additional information on adjusting internal variables 
with the [File : Preferences](menus.html#FilePreferences) menu item. 

&nbsp;  

[Help](/docs/Help) 
