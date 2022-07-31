import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    The following example provides the ODOP:Spring solution to a reference book 
                    problem illustrating the design of a compression spring .
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState.
                    </p>
                    
                    <p>
                    To continue with this example, just click the "Next" button as you finish
                    reading each page (step). 
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 02 of 13",
            text: (
                <>
                    <p>
                    The initial conditions expected by this demo session are now established.<br />
                    <br />
                    Our next problem appears in the
                    &nbsp; &nbsp; <b>SPRING DESIGNER'S HANDBOOK</b> &nbsp; &nbsp; by  Harold Carlson<br />
                    Published by  Marcel Dekker, Inc. &nbsp; &nbsp; 270 Madison Avenue &nbsp; &nbsp; New York, &nbsp; NY &nbsp; &nbsp; 10016<br />
                    <br />
                    Refer to  Problem 1  on page 179  of the 10th printing  (1978).
                    </p>
                    
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring demo5'}])
            ]
        },
        {
            title: "Page 03 of 13",
            text: (
                <>
                    <p>
                    Design a compression spring such that the following conditions are met:<br />
                    <br />
                    outside diameter  =  1.00  inch<br />
                    free length       =  3.25  inches<br />
                    load              = 60.0   pounds at length = 1.75 inches<br />
                    &nbsp; &nbsp; (1.5 inch deflection from free)<br />
                    solid height      =  1.625 inches maximum<br />
                    ends              =  closed and ground<br />
                    material          =  oil tempered MB wire,  ASTM A229<br />
                    <br />
                    Determine wire diameter, stress, and number of active coils.<br />
                    Select a commonly available wire size.
                    </p>
                </>
            )
        },
        {
            title: "Page 04 of 13",
            text: (
                <>
                    <p>Next, the demo session will enter everything we know about the problem. </p>
                    
                    <p>This is a good time to take a good look at the existing values.
                    Affected values will update immediately as the demo session enters the changes.</p>
                    
                    <p>You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.</p>
                    <br /><br />
                </>
            )
        },
        {
            title: "Page 05 of 13",
            text: (
                <>
                    <p>
                    The demo has now entered what is known about the problem. 
                    In summary, the changes were:<br />
                    </p>
                    FIX  OD_Free  1.00<br />
                    FIX  L_Free   3.25<br />
                    FIX  l_2      1.75<br />
                    FIX  Force_1  0.0<br />
                    FIX  Force_2  60.0<br />
                    CHANGE  L_Solid   MAX  1.625<br />
                    CHANGE  End_Type Closed & Ground<br />
                    CHANGE  Material_Type OIL_TEMPERED_MB<br />
                    <br />
                    <p>
                    The remaining Independent Variable values remain as established by the initialState. 
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('OD_Free', 1.0),
                fixSymbolValue('L_Free', 3.25),
                fixSymbolValue('L_2', 1.75),
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 60.0),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.625),
                changeSymbolValue("End_Type",4),
                changeSymbolValue("Material_Type",3)
            ]
        },
        {
            title: "Page 06 of 13",
            text: (
                <>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (<b>Action : Search</b> menu) for a solution.
                    Specifically, Search will find values of the free Independent Variables
                    that cause the newly established Constraints and FIXes to be satisfied.
                    </p>

                    <p>
                    &nbsp;
                    <br />
                    </p>
                </>
            )
        },
        {
            title: "Page 07 of 13",
            text: (
                <>
                    <p>Yes,  A feasible solution is available. Please take a moment to scroll through and view the values.</p>
                    <p>
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini). 
                    Use the View menu to select that Report.
                    The message: 
                    "<b>Coil to coil contact may cause inaccuracy in point 2.</b>" 
                    is produced any time that the second load uses more
                    than 80 % of available deflection.
                    </p>
                    <p>There is no warning about buckling so that is not a concern for this design.</p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 08 of 13",
            text: (
                <>
                    <p>
                    If you are still viewing a Report, don't forget to switch back to the main page.
                    </p>
                    
                    <p>
                    As a general rule, in the first approach to a new problem, 
                    we let the calculations use an arbitrary (non-standard) wire diameter.
                    </p>
                    
                    <p>
                    Now, in order to conclude this problem,
                    we want to demonstrate the ODOP SELECT SIZE feature. 
                    Go to the <b>Action : Select Size...</b> menu item
                    and chose the nearest standard wire diameter.
                    In summary:
                    <br /><br />
                    SELECT  Wire_Dia 0.120<br />
                    <br />
                    In any case, to guarantee the expected outcome, the demo session will
                    to use a FIX to impose the expected value of Wire_Dia.
                    Look for the new value of Wire_Dia on the next page.
                    </p>
                </>
            )
        },
        {
            title: "Page 09 of 13",
            text: (
                <>
                    <p>
                    Now that there has been a slight change in wire diameter, another search
                    will be required to make corresponding adjustments in the other parameters.
                    For this problem, only the number of coils remains to be determined.
                    </p>
                    
                    <p>
                    Look for the results on the next page.
                    <br /><br />
                    </p>
                    
                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.120)
            ]
        },
        {
            title: "Page 10 of 13",
            text: (
                <>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini). 
                    Use the View menu to select that Report.
                    </p>
                    
                    <p>
                    Note that this design is very close to delivering 1.75 inches
                    compressed height at 60 pounds force.
                    <br /><br />
                    </p>
                    
                    <p>
                    Next we'll make a detailed comparison with the handbook results.
                    Click Next to see the handbook inputs entered into the appropriate ODOP:Spring variables.
                    </p>
                    
                    <p>
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 11 of 13",
            text: (
                <>
                    <p>
                    If you are still viewing a Report, don't forget to switch back to the main page.
                    </p>
                    
                    <p>
                    The demo session has now imposed the values:<br />
                    <br />
                    CHANGE  Wire_Dia  .1205<br />
                    CHANGE  Coils_T  13
                    </p>
                    <br />
                </>
            ),
            actions: [
                changeSymbolValue("Wire_Dia",0.1205),
                changeSymbolValue("Coils_T", 13),
            ]
        },
        {
            title: "Page 12 of 13",
            text: (
                <>
                    <p>
                    The handbook results:<br />
                    &nbsp; &nbsp;  solid height = 1.57 in.<br />
                    &nbsp; &nbsp;  stress correction factor = 1.21 &nbsp; (see Report 2)<br />
                    &nbsp; &nbsp;  stress at solid      = 104000  psi  (corrected)<br />
                    &nbsp; &nbsp;  stress at 60 lb load =  92900  psi  (corrected)<br />
                    &nbsp; &nbsp;  spring index = 7.3
                    </p>
                    
                    <p>
                    The results are in very good agreement.
                    </p>
                </>
            )
        },
        {
            title: "Page 13 of 13 (last page)",
            text: (
                <>
                    <p>
                    Several more demo problems are available. 
                    They are named demo1, demo2, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a complete list of additional tutorial and demo topics.
                    </p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP:Spring features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                    <br />
                </>
            )
        }
    ]
}
