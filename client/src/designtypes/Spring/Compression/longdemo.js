import React from 'react';
import { Image } from 'react-bootstrap';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, logUsage, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
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
                    Moving to the next page will establish the necessary initialState
                    for the ODOP <b>Compression Spring</b> design type.
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
            title: "Page 02 of 14",
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
                    Determine free length, wire diameter and number of coils.
                    Use a standard wire size.
                    Determine if a similar spring is available in the catalog.
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
            title: "Page 03 of 14",
            text: (
                <React.Fragment>
                    <p>
                    In general, the easiest way to begin is to modify an existing design.
                    This demo session will modify this design until it meets the requirements 
                    of the current design problem.
                    The following sequence of pages will illustrate this process.
                    </p>
                    
                    <p>
                    Two diagrams follow.
                    The first provides a high level overview of the ODOP design process or sequence.
                    The second illustrates the names of ODOP:Spring variables 
                    in the context of a force-deflection diagram.
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 14",
            text: (
                <React.Fragment>
                   <Image fluid src="https://www.springdesignsoftware.org/odop/docs/About/png/DesignProcessFlowDiagram.png" alt="DesignProcessFlowDiagram"/>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 14",
            text: (
                <React.Fragment>
                   <Image fluid src="designtypes/Spring/Compression/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of 14",
            text: (
                <React.Fragment>
                    <p>Next, the demo session will enter everything we know about the problem. </p>
                    
                    <p>This is a good time to take a good look at the existing values.
                    Affected values will update immediately as the demo session enters the changes.</p>
                    
                    <p>You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.</p>
                    <br /><br />
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 14",
            text: (
                <React.Fragment>
                    <p>
                    The demo has now entered what is known about the problem. 
                    In summary, the changes were:<br />
                    </p>
                    CHANGE  Material_Type OIL_TEMPERED_MB<br />
                    CHANGE  Life_Category 1 Million cycles - Not peened<br />
                    CHANGE  FS_CycleLife 1.0<br />
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
                changeSymbolValue("Life_Category",3),
                changeSymbolValue("End_Type",4),
                saveOutputSymbolConstraints('FS_CycleLife'),
                setSymbolFlag('FS_CycleLife', MIN, CONSTRAINED),
                changeSymbolConstraint('FS_CycleLife', MIN, 1.0),
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
                fixSymbolValue('Force_2', 60.0)
            ]
        },
        {
            title: "Page 08 of 14",
            text: (
                <React.Fragment>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (<b>Action : Search</b> menu) for a solution.
                    Specifically, Search will attempt to find values of the free Independent Variables
                    that cause the newly established Constraints and FIXes to be satisfied.
                    </p>

                    <p>
                    If the program can find a solution that fully satisfies all the constraints,
                    it will display "<b>STRICTLY FEASIBLE</b>" in the Result section (immediately below these words).  
                    If a satisfactory solution is found, but one or more constraints remain violated by a
                    trivial amount, the program will display "<b>FEASIBLE</b>" in the Result section.
                    If the search process is unable to find a solution, the red "<b>NOT FEASIBLE</b>" will persist.
                    The on-line Help entry covering the multi-color 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/feasibilityIndicator" target="_blank" rel="noopener noreferrer">Feasibility Indicator</a>&nbsp;
                    provides additional details. 
                    </p>

                    <p>
                    This demo session will run the Search process during the transition to the next page.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 09 of 14",
            text: (
                <React.Fragment>
                    <p>We have a solution. Please take a moment to scroll through and view the values.</p>
                    <p>
                    Note that results of additional calculations are given in the Reports. 
                    Use the View menu to access Reports.
                    The message: 
                    "<b>Coil to coil contact may cause inaccuracy in point 2.</b>" 
                    is produced any time that the second load uses more
                    than 80 % of available deflection.
                    </p>
                    <p>There is no warning about buckling so that is not a concern for this design.</p>
                </React.Fragment>
            ),
            actions: [
                logUsage('event','longdemo', { 'event_label': 'Page 09 of 14' }),
                search()
            ]
        },
        {
            title: "Page 10 of 14",
            text: (
                <React.Fragment>
                    <p>
                    If you are still on a Report view,
                    don't forget to switch back to the Advanced view (the main page).
                    </p>
                    
                    <p>
                    As a general rule, in the first approach to a new problem, 
                    let the calculations use an arbitrary (non-standard) wire diameter. 
                    As a last step, select a standard wire diameter.
                    Then with Wire_Dia in FIXed status, execute a search to make any necessary 
                    adjustments in the remaining free Independent Variables.
                    </p>
                    
                    <p>
                    Now to illustrate this, it is time for a bit of audience participation.
                    Since the ODOP demo feature is not yet capable of directly controlling menus,
                    go to the <b>Action : Select Size...</b> menu item
                    to chose the nearest standard wire diameter.
                    <br /><br />
                    In Demo / Tutorial speak:<br />
                    Select  Size  Wire_Dia  0.135<br />
                    <br />
                    Please confirm that Wire_Dia is FIXed at 0.135 and then click Next 
                    to move to the next page.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 11 of 14",
            text: (
                <React.Fragment>
                    <p>
                    Now that there has been a slight change in wire diameter, another search
                    will be required to make corresponding adjustments in the other
                    parameters such as number of coils, outside diameter and free length.
                    </p>
                    
                    <p>
                    Look for the results on the next page.
                    <br /><br />
                    </p>
                    
                    <p>
                    <br /><br />
                    </p>
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 12 of 14",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    Note that results of additional calculations are given in the Reports. 
                    </p>
                    
                    <p>
                    The design is complete.
                    </p>
                    
                    <p>
                    This is a good time to think about saving the design for potential access in the future.
                    Use the <b>File : Save As...</b> menu item to save the design into the Design Library.  
                    Alternatively, it should be possibile to use the print features of the browser to
                    send one or more of the Reports to a local printer or perhaps save to a .PDF file.
                    Your browser documentation should provide more details about printing.
                    </p>
                    
                    <p>
                    The next page covers use of the catalog.
                    Selecting a catalog entry will replace the current design.
                    So again, if this were a real design situation as opposed to a demo session,
                    this would be a good time to save your work before continuing.
                    </p>
                </React.Fragment>
            ),
            actions: [
                logUsage('event','longdemo', { 'event_label': 'Page 12 of 14' }),
                search()
            ]
        },
        {
            title: "Page 13 of 14",
            text: (
                <React.Fragment>
                    <p>
                    If you are still on a Report view,
                    don't forget to switch back to the Advanced view.
                    </p>
                    
                    <p>
                    Finally, we'll use the Select Catalog feature 
                    (<b>Action : Select Catalog...</b> menu item) 
                    to determine if a similar design is available in the built-in catalog. 
                    We'll choose the design that is closest to the current (custom) design, 
                    then evaluate it.
                    Again, the demo session needs your participation on 
                    the Action menu ...
                    <br /><br />
                    In Demo / Tutorial speak:<br />
                    Select  Catalog
                    </p>
                    
                    <p>
                    You have the opportunity to specify a catalog. 
                    Details on up to four entries from that catalog are displayed.
                    Pressing the "Select" button causes the
                    selected entry to become the current design providing an opportunity
                    to compare its performance to the previously established constraints.
                    </p>
                    
                    <p>
                    Please take this opportunity to select a spring from the catalog.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 14 of 14 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    Several more demo problems are available. 
                    They are named demo1, demo2, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a list of topics.
                    </p>
                    
                    <p>
                    If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP:Spring features, menus and reports. 
                    The Help menu is a good place to start. 
                    </p>
                    
                    <p>
                    Select (click on) the <b>Exit</b> button to end this tutorial session.
                    </p>
                    <br />
                </React.Fragment>
            )
        }
    ]
}
