# Auto-Search feature and preferences

The experimental implementation of an Auto-Search feature exposed a significant issue.
While the user is in the process of modifying an input field, the search will get fired off with transient, wildly incorrect values for constraint and fix levels. 
When far from a solution point, Pattern Search behavior (acceleration of pattern moves) is inclined to step (far) over constraint boundaries, 
including the evaluation of negative numbers.  Then, the search may converge on a non-physical result (for example, negative radius).
If the starting point of the following search is the finishing point of a previous search that has produced such a non-physical result,
depending on the design problem, Patsh may not recover.  It just gets stuck.

There are multiple approaches to dealing with this problem.

In the first place, the Auto-Search feature should be controllable by a preference menu item. 
Approaches applied to Auto-Search do not have to apply to more manual search mode(s).

During Auto-Search, the starting point of each new search can be set to a known reasonable point.
That should mostly eliminate the behavior of getting stuck in a non-physical solution.

The best approach for establishing a known reasonable starting point is open for discussion.
Possibilities include: 
* a "built-in" set of values similar to initialState.js
* values in the current default design file  
* values in a user-modifiable design file with a reserved name like "AutoSearchStartPoint"

Also, there is a possibility for a quicker and more convenient middle ground between fully manual searches that are invoked by the Action : Search menu item and the current notion of Auto-Search.
For example, a search may be triggered by:
* the action of taking the cursor out of an entry field
* a "Search" button on the main page
* a keystroke such as "enter", "tab", "s" or "ctrl-s" while the cursor is in an entry field.
* a click or double-click on a portion of the screen that is not an entry field
*  - as with manual search, the latter three alternatives allow the user to complete multiple entries before starting a search 

 Note that each of these possibilities is less than perfect.
 * keystrokes such as "enter" and "tab" have different meanings in spreadsheet programs
 * the "ctrl-s" key combination is commonly used as "Save" 
 * if click on non-entry portions of the screen is enabled, tablet users may have problems with unintended inputs
 
 Note that setting the search to a known reasonable start point should apply to Auto-Start only.
 In more manual search modes, the user should be able to control the start point by using the entry field to alter the values of design parameters.
 