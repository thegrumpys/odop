## SizeSearch

This entry describes a hypothetical extension to the ODOP Search feature that evaluates the results with multiple standard sizes.  

Other names considered:  SuperSearch, SearchPlus, Survey, SizeSurvey.  

As visualized, this feature would be implemented as an additional **Action : SizeSearch** menu item. 
It would not be a replacement for the current **Action : Select Size** menu item. 

Currently, the **Action : Select Size** menu item offers 3 standard sizes, 
one smaller and two larger than the current value of the Independent Variable under consideration.  
The user selects one of the three and is returned to the main page with the appropriate variable in FIXed status.
The user then needs to evaluate the need for a search and then, if appropriate, must run the Search manually.

The **Action : SizeSearch** feature visualized here would automate the process.
Specifically, SizeSearch would:  

- Check the {Start Point}, if OBJ > OBJMIN, confirm that the size variable is in FREE status and run a search. The result becomes the new {Start Point}.  
- Impose the first standard size in FIXed status.  If OBJ > OBJMIN, run a search, the result becomes {Result 1}.  
- Return to the {Start Point}. Impose the second standard size in FIXed status.  If OBJ > OBJMIN, run a search, the result becomes {Result 2}.  
- Return to the {Start Point}. Impose the third standard size in FIXed status.  If OBJ > OBJMIN, run a search, the result becomes {Result 3}.  

Present the results for selection in a tabular format similar to that used by **Action : Select Catalog**. 
Ideally, the presentation of the the "Objective Value" would follow the color-code convention of the main page. 
The default choice would be the {Result 1, 2 or 3} with the lowest "Objective Value".
After the user selects one of the four points {Cancel = Start Point, Result 1, 2, or 3}, return to the main page with that set of values; 
the {Result 1, 2 or 3} size variable in FIXed status and the correct corresponding value of the "Objective Value". 
If the {Cancel = Start Point} was selected, it should be returned in FREE status.

