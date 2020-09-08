import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, loadInitialState, fixSymbolValue, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    This section of the tutorial will cover the use of the ODOP:Spring &nbsp;
                    <b>Action : Select Size</b> and <b>Action : Select Catalog</b> menus.
                    </p>
                    
                    <p>
                    After designing a custom compression spring, we will select an appropriate
                    standard wire size from the ODOP:Spring standard size table. 
                    Following another search, 
                    we will use the Select Catalog menu to scan the ODOP:Spring sample compression spring
                    catalog to determine the four entries closest to our custom spring.  
                    After selecting the best of the four, 
                    we'll compare its performance to our original objectives.
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP Compression Spring design type.
                    </p>
                    
                    <p>
                    To continue with this session, just <b>click the "Next" button</b> as you finish
                    reading each page (step). 
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 07",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    At this point, we need a spring to design.  
                    How about this for a problem statement ?<br />
                    <br />  
                    - outside diameter less than 0.925 inch<br />
                    - free length 1.713 inch<br />
                    - supports 50 pounds static load at length 1.278 inches<br />
                    - solid height less than 1.060 inches<br />
                    - hard drawn wire, closed & ground ends<br />
                    <br />
                    (Used with permission of Spring Manufacturers Institute,  Inc.)
                    </p>
                    
                    <p>
                    We'll solve this problem in three steps:<br />
                    - determine wire diameter and number of coils to meet the requirements
                    as though this were an entirely custom design
                    <br />
                    - select the nearest standard wire size and re-execute the search to
                    determine the corresponding change in number of coils
                    <br />
                   - determine the four catalog entries closest to the resulting spring
                   and select the closest one for further examination
                   </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 07",
            text: (
                <React.Fragment>
                    <p>
                    Okay, first we enter what we know this spring has to do. 
                    As usual, we use FIX and constraints to express our objectives for the design.<br />
                    <br />
                    CHANGE  Material_Type  HARD_DRAWN_WIRE<br />
                    CHANGE  OD_Free MAX  .920 &nbsp; - - - (0.005 margin)<br />
                    CHANGE  L_Solid MAX  1.06<br />
                    <br />
                    FIX  L_Free   1.713<br />
                    FIX  Force_1  0<br />
                    FIX  Force_2 50<br />
                    FIX  L_2      1.278
                    </p>
                    
                    <p>
                    You can scroll down to confirm that this tutorial session has imposed the above values.
                    </p>

                    <p>
                    Report 1 provides a warning message.  
                    When free length reduced to 1.713 and the load increased to 50 pounds, 
                    the current values of Wire_Dia and Coils_T 
                    (determined from the initial conditions established at the beginning of this tutorial session) 
                    produced a starting point where L_2, the length at load point 2,
                    is less than zero.  
                    This is an impossible condition and provides a difficult start point for the search.  
                    The message suggests that we might get better (and more reliable) performance 
                    if we remedy the situation manually.  
                    However in this case, we'll ignore the message and proceed with the search.
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Material_Type",1),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 0.920),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.06),
                fixSymbolValue('L_Free', 1.713),
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 50.0),
                fixSymbolValue('L_2', 1.278)
            ]
        },
        {
            title: "Page 04 of 07",
            text: (
                <React.Fragment>
                    <p>
                    The search is complete.
                    Take a moment to get a detailed look at the results ...
                    </p>
                    
                    <p>
                    The tutorial is not yet ready to manipulate the <b>Action : Select Size</b>&nbsp;
                    and <b>Action : Select Catalog</b> menu items.
                    So for now, you will need to do that on your own.
                    </p>
                    
                    <p>
                    Use the <b>Action : Select Size</b> menu item to find the nearest standard wire diameter.  
                    It will return with Wire_Dia in FIXed status.
                    </p>
                    
                    <p>
                    In the process of moving to the next page, the tutorial will confirm that Wire_Dia is 
                    fixed at 0.120 inch and then run another search.
                    But first, we'll make a small change that will allow ODOP:Spring to
                    consider designs with a larger factor of safety than the default established by 
                    this tutorial session's initial conditions: <br />
                    <br />
                    CHANGE  FS_2  MAX  2.0
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 05 of 07",
            text: (
                <React.Fragment>
                    <p>
                    The search is complete.
                    Let's take a look ... 
                    Note the 50 pounds load at 1.278 length is very close to being achieved.
                    </p>
                    
                    <p>
                    Now we'll take a look at a design from the catalog.  
                    Note that selecting from a catalog will replace the current design.
                    If this was not a tutorial session, you might want to use the <b>File : Save As</b> menu
                    to insure that your custom design is available for future reference.
                    </p>
                    
                    <p>
                    While multiple catalogs are available to select from,
                    this tutorial session expects you to keep the default catalog selected.
                    The four entries are ordered by the value of their objective function.
                    The first entry will have the least constraint violation.
                    </p>
                    
                    <p>
                    Now, use the <b>Action : Select Catalog</b> menu item to 
                    display the four nearest entries in the catalog.  
                    &nbsp; <b>Select the first entry</b>&nbsp;
                    and continue to the next page of this tutorial session.
                    </p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.120),
                changeSymbolConstraint('FS_2', MAX, 2.0),
                search()
            ]
        },
        {
            title: "Page 06 of 07",
            text: (
                <React.Fragment>
                    <p>
                    Look at the constraint violations to judge how well the catalog spring
                    meets the objectives originally set out for this design.
                    </p>
                
                    <p>
                    We don't expect that a spring selected from off the shelf will do as well as as a 
                    custom designed spring.  
                    That requirement of starting with a free length of
                    1.713 inches and achieving exactly a 50 pound load at a length of 1.278
                    inches is a bit unusual.
                    </p>
                    
                    <p>
                    As you can see, we found a reasonable, but not perfect match in the catalog.
                    This, of course, was partially predetermined.  
                    The problem was selected to  have an answer that fell within the range 
                    of spring sizes covered by the  catalog (.125 to 1.75 outside diameter).  
                    If you are designing suspension springs for railway freight cars, 
                    a different catalog might be appropriate.  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/About/ContactUs" 
                    target="_blank" rel="noopener noreferrer">Contact technical support</a>&nbsp; 
                    to make that happen.<br />
                    <br />
                    That's enough for this section of the tutorial.  
                    You are encouraged to experiment with the SELECT command using various 
                    different springs.
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 07 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    Congratulations, you've finished another section of the tutorial.
                    Take a few minutes at this point to experiment on your own. 
                    </p>
                    
                    <p>
                    Also, look in the on-line documentation section (Help entry) titled  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/SpringDesign/selectSizeCatalog" 
                    target="_blank" rel="noopener noreferrer">Select Size and Select Catalog</a>.&nbsp; 
                    </p>
                    
                    <p>
                    More tutorial sessions are available. 
                    They have names like tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a list of topics.
                    </p>
                    <br /><br />
                </React.Fragment>
            )
        }
    ]
}
