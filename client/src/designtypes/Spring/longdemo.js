import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, search } from '../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    The following example illustrates the use of ODOP:Spring in
                    the design of a compression spring from original specifications.
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
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of xx",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    Before we make additional changes, let's review the problem statement:<br />
                    </p>
                    
                    <p>
                    Design a compression spring such that the following conditions are met:<br />
                    <br />
                    material = oil tempered MB wire<br />
                    ends     = closed & ground<br />
                    near infinite cycle life<br />
                    outside diameter: anything less than 1.250 inches<br />
                    solid height:     anything less than 1.300 inches<br />
                    <br />
                    The spring will cycle over a 0.65 inch stroke and must produce:<br />
                    &nbsp; &nbsp; an initial load of 30 pounds and<br />
                    &nbsp; &nbsp; a  final   load of 60 pounds<br />
                    <br />
                    Determine free length, wire diameter and number of coils.<br />
                    Use a standard wire size.<br />
                    Determine if a similar spring is available in the catalog.<br />
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring')
            ]
        },
        {
            title: "Page 03 of xx",
            text: (
                <React.Fragment>
                    <p>
                    In general, the easiest way to begin is to modify an existing design.
                    This demo session will modify this design until it meets the requirements 
                    of the current design problem.
                    The following sequence of pages will illustrate this process.
                    </p>
                    
                    <p>
                    Since you may not be familiar with the names of ODOP:Spring variables,
                    the next screen will illustrate several variable names in the
                    context of a force-deflection diagram.
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of xx",
            text: (
                <React.Fragment>
                   <img src="designtypes/Spring/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of xx",
            text: (
                <React.Fragment>
                    <p>Next, the demo session will enter everything we know about the problem. </p>
                    
                    <p>This is a good time to take a good look at the existing values.
                    Many values will update immediately as the demo session enters the changes.</p>
                    
                    <p>You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of xx",
            text: (
                <React.Fragment>
                    <p>
                    The demo has now entered what is known about the problem. 
                    In summary, the changes were:<br />
                    </p>
                    CHANGE Material_Type OIL_TEMPERED_MB<br />
                    CHANGE  Cycle_Life  MIN  1000000<br />
                    CHANGE  OD_Free   MAX  1.25<br />
                    CHANGE  L_Solid   MAX  1.30<br />
                    CHANGE  L_Stroke  MIN  0.65<br />
                    FIX  Force_1  30.0<br />
                    FIX  Force_2  60.0<br />
                    <br />
                    <p>
                    The remaining Independent Variable values remain as established by the initialState. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Material_Type",3),
                changeSymbolValue("End_Type",4),
                saveOutputSymbolConstraints('Cycle_Life'),
                setSymbolFlag('Cycle_Life', MIN, CONSTRAINED),
                changeSymbolConstraint('Cycle_Life', MIN, 1000000),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 1.25),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.30),
                saveOutputSymbolConstraints('L_Stroke'),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint('L_Stroke', MIN, 0.65),
                fixSymbolValue('Force_1', 30.0),
                fixSymbolValue('Force_2', 60.0),
            ]
        },
        {
            title: "Page 07 of xx",
            text: (
                <React.Fragment>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (menu Action : Search) for a solution.
                    Specifically, to find values of the free Independent Variables
                    that cause the Constraints and FIXes that have just been established
                    to be satisfied.
                    </p>

                    <p>
                    If the program can find a solution that satisfies all the constraints,
                    it will display "<b>FEASIBLE</b>" in the Result section (immediately below these words).  
                    If a satisfactory solution is found, but one or more constraints remain violated by a
                    trivial amount, the program will display "<b>MARGINALLY FEASIBLE</b>" in the Result section.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 08 of xx",
            text: (
                <React.Fragment>
                    <p>We have a solution. Please take a moment to scroll through and view the values.</p>
                    <p>Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini). 
                    Simply select (click on) that tab to view the report.</p>
                    <p>The message: 
                    "<b>Coil to coil contact may cause inaccuracy in point 2.</b>" 
                    is produced any time that the second load uses more
                    than 80 % of available deflection.</p>
                    <p>There is no warning about buckling so that is not a concern for this design.</p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 09 of xx",
            text: (
                <React.Fragment>
                    <p>
                    Don't forget to switch back to the tab containing the main page ("Design:").
                    <br /><br />
                    Just in case you missed them on the previous screen,
                    scroll down to view the values of <b>Cycle_Life, %_Avail_Deflect</b> and <b>Weight</b>.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 10 of xx",
            text: (
                <React.Fragment>
                    <p>This completes the first ODOP:Spring demonstration problem.</p>
                    
                    <p>Several more demo problems are available. 
                    They are named DEMO1, DEMO2, ... etc. 
                    Refer to the documentation section (Help entry) named  TUTORIAL  
                    for a list of the Tutorial and DEMO topics.</p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP:Spring features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 11 of xx (last page)",
            text: (
                <React.Fragment>
                    <p>
                    The next demonstration problem provides a more 
                    detailed example of spring design from original specifications.  
                    Select "LONGDEMO" from the <b>Help : Demo...</b> menu item.
                    </p>
                    
                    <p>
                    Additional demonstration sessions are available. 
                    For example,
                    DEMO6, DEMO7 and DEMO8 present examples of extension spring design.
                    Tutorial sessions, TUTOR1, TUTOR2, ... etc. provide instructions on how to use 
                    the ODOP software.
                    </p>
                </React.Fragment>
            )
        }
    ]
}
