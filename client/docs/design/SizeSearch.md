# SelectSize+Search and SelectSize+Seek - Enhanced SelectSize

This entry describes two hypothetical extensions to the existing ODOP SelectSize feature that invoke the search algorithm 
to evaluate results with multiple standard sizes.  

Preferred names:  SelectSize+Search and SelectSize+Seek. 
Other names considered:  SizeSearch and SizeSeek, SelectSizePlus, SuperSearch, SearchPlus, Survey, SizeSurvey, SmartSelectSize.  

There are at least two alternatives for a user interface. 
 - Preferred: have a second level selection modal (similar to Trade's strategy selection) 
invoked by the current single **Action : SelectSize** menu entry.
The naming for the three alternatives might be SelectSize, SelectSize+Search and SelectSize+Seek 
 - Alternative: two additional menu items: **Action : SelectSize+Search** and **Action : SelectSize+Seek**. 
The current **Action : SelectSize** menu item would continue. 

Currently, the **Action : Select Size** menu item offers 3 standard sizes, 
one smaller and two larger than the current value of the Independent Variable under consideration. 
The user selects one of the three and is returned to the main page with the appropriate variable in FIXed status.
The user then needs to evaluate the need for a search and then, if appropriate, must run the Search manually.

The SelectSize+Search and SelectSize+Seek features visualized here would automate the process.
Specifically, SelectSize+Search would:  

- Check the {Start Point}, if OBJ > OBJMIN, confirm that the size variable is in FREE status and run a search. The result becomes the new {Start Point}.  
- Impose the first standard size in FIXed status.  If OBJ > OBJMIN, run a search, the result becomes {Result 1}.  
- Return to the {Start Point}. Impose the second standard size in FIXed status.  If OBJ > OBJMIN, run a search, the result becomes {Result 2}.  
- Return to the {Start Point}. Impose the third standard size in FIXed status.  If OBJ > OBJMIN, run a search, the result becomes {Result 3}.  

Present the results for selection in a tabular format similar to that used by **Action : Select Catalog**. 
Ideally, the presentation of the the "Objective Value" would follow the color-code convention of the main page. 
The default choice would be the {Result 1, 2 or 3} with the lowest "Objective Value".
After the user selects one of the four points {Cancel = Start Point, Result 1, 2, or 3}, return to the main page with that set of values; 
the {Result 1, 2 or 3} size variable in FIXed status and the correct corresponding value of the "Objective Value". 
If the {Cancel = Start Point} was selected, the size variable should be returned in FREE status.

SelectSize+Seek should operate like SelectSize+Search except using the Seek algorithm.
It will be necessary to prompt the user for the Seek variable and direction (MAX / MIN).

If a decision is made to move Reports to the View menu in order to free-up tabs for display of design alternatives,
the Results could be put into tabs.
Thus, there would be a minimum of four tabs: Start Point and Results 1, 2, and 3.


 