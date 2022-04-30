# Idea for a Refine Search feature

It is my understanding that in the math associated with linear programming, there is a theorm 
(or something along those lines) 
that says an optimal solution must lie at the intersection of constraints (a vertex of the feasible region).
In the non-linear world, this is not necessarily true, particularly if a non-linear merit function is involved.
However, the linear case may provide insights for an approach to refining the results produced by the current SEARCH algorithm.

Proposal:   
At the conclusion of a search that does not have a merit function (i.e. non-Seek), 
conduct one or more additional searches and then report the results in some appropriate way.
Specifically, the (sequence of?) additional searche(s) would be driven by FIXing the value of each 
(not already fixed) design parameter at the value of a **nearby** constrint and then conducting an additional search.

While this process could be conducted one design parameter at a time, 
it is likely simpler to conduct a single search with the entire set of (not previously fixed) design parameters FIXed at nearby constraint levels.
If no free design parameters remain, no search is necessary, but the comparison remains valid.

Defining "nearby":
* likely needs to change with the value of obj.
* likely needs to consider the proximity of the opposing constraint level on that design parameter. (min versus max)
* Perhaps this approach should be limited to only cases where the original search produces a marginally feasible result.

Reporting the results:
* report only the best of all
* a menu item for comparing the refinement to the current (default) search results and providing the users with a choice
* something else

While the same idea might be applied to state variables, the associated leverage is not as clear.

