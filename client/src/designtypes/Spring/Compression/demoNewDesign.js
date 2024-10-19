import React from 'react';
import { Image } from 'react-bootstrap';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, logUsage, setSymbolFlag, changeLabelsValue, search } from '../../../store/actions';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
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
                </>
            )
        },
        {
            title: "Page 02 of 14",
            text: (
                <>
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
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring demoNewDesign'}])
            ]
        },
        {
            title: "Page 03 of 14",
            text: (
                <>
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
                </>
            )
        },
        {
            title: "Page 04 of 14",
            text: (
                <>
                   <Image fluid src="/docs/About/img/DesignProcessFlowDiagram.png" alt="DesignProcessFlowDiagram"/>
                </>
            )
        },
        {
            title: "Page 05 of 14",
            text: (
                <>
                   <Image fluid src="/docs/Help/DesignTypes/Spring/img/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </>
            )
        },
        {
            title: "Page 06 of 14",
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
            title: "Page 07 of 14",
            text: (
                <>
                    <p>
                    The demo has now entered what is known about the problem.
                    In summary, the changes were:<br />
                    </p>
                    CHANGE  Material_Type OIL_TEMPERED_MB<br />
                    CHANGE  Life_Category 1 Million cycles - Not peened<br />
                    CHANGE  FS_CycleLife MIN 1.0<br />
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
                </>
            ),
            actions: [
                changeSymbolValue("Material_Type",3),
                changeSymbolValue("Life_Category",3),
                changeSymbolValue("End_Type",4),
                setSymbolFlag('FS_CycleLife', MIN, CONSTRAINED),
                changeSymbolConstraint('FS_CycleLife', MIN, 1.0),
                setSymbolFlag('Cycle_Life', MIN, CONSTRAINED),
                changeSymbolConstraint('Cycle_Life', MIN, 1000000),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 1.25),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.30),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint('L_Stroke', MIN, 0.65),
                fixSymbolValue('Force_1', 30.0),
                fixSymbolValue('Force_2', 60.0)
            ]
        },
        {
            title: "Page 08 of 14",
            text: (
                <>
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
                    &nbsp;<a href="/docs/Help/feasibilityIndicator.html" target="_blank" rel="noopener noreferrer">Feasibility Indicator</a>&nbsp;
                    provides additional details.
                    </p>

                    <p>
                    This demo session will run the Search process during the transition to the next page.
                    </p>
                </>
            )
        },
        {
            title: "Page 09 of 14",
            text: (
                <>
                    <p>We have a solution. Please take a moment to scroll through and view the values.</p>
                    <p>
                    Note that results of additional calculations are given in the Reports.
                    Use the View menu to access Reports.
                    The message:
                    "<b>Coil to coil contact may cause inaccuracy in point 2.</b>"
                    is produced any time that the second load uses more
                    than 80 % of available deflection.
                    </p>
                    <p>There is no alert or Report 1 warning about buckling so that is not a concern for this design.</p>
                </>
            ),
            actions: [
                logUsage('event','demoNewDesign', { event_label: 'Page 09 of 14' }),
                search()
            ]
        },
        {
            title: "Page 10 of 14",
            text: (
                <>
                    <p>
                    If you are still on a Report view,
                    don't forget to switch back to a main page (Advanced or Calculator View).
                    </p>

                    <p>
                    As a general rule, in the first approach to a new problem,
                    let the calculations use an arbitrary (non-standard) wire diameter.
                    As a last step, select a standard wire diameter.
                    Then with Wire_Dia in FIXed status, execute a search to make any necessary
                    adjustments in the remaining free Independent Variables.
                    </p>

                    <p>
                    This is an opportunity for you to
                    go to the <b>Action : Select Size...</b> menu item
                    and see how to chose the nearest standard wire diameter.
                    <br /><br />
                    In Demo / Tutorial speak:<br />
                    Select  Size  Wire_Dia  0.135<br />
                    <br />
                    Please confirm that Wire_Dia is FIXed at 0.135 and then click Next
                    to move to the next page.
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.135)
            ]
        },
        {
            title: "Page 11 of 14",
            text: (
                <>
                    <p>
                    Now that there has been a slight change in wire diameter, another search
                    will be required to make corresponding adjustments in the other
                    parameters such as number of coils, outside diameter and free length.
                    </p>

                    <p>
                    Look for the search results on the next page.
                    <br /><br />
                    </p>

                    <p>
                    <br /><br />
                    </p>
                </>
            ),
        },
        {
            title: "Page 12 of 14",
            text: (
                <>
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
                    The ODOP Design Library is "cloud", not local, storage.
                    Alternatively, the <b>File : Export</b> menu item saves to your local Downloads folder.
                    Also, it should be possibile to use the print features of the browser to
                    send one or more of the Reports to a local printer or perhaps save to a .PDF file.
                    Your browser documentation should provide more details about printing.
                    </p>

                    <p>
                    The next page covers use of the catalog.
                    Selecting a catalog entry will replace the current design.
                    So again, if this were a real design situation as opposed to a demo session,
                    this would be a good time to save your work before continuing.
                    </p>
                </>
            ),
            actions: [
                logUsage('event','demoNewDesign', { event_label: 'Page 12 of 14' }),
                search()
            ]
        },
        {
            title: "Page 13 of 14",
            text: (
                <>
                    <p>
                    If you are still on a Report view,
                    don't forget to switch back to a main page (Advanced or Calculator View).
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
                </>
            )
        },
        {
            title: "Page 14 of 14 (last page)",
            text: (
                <>
                    <p>
                    Several more demo problems are available.
                    They are named demo1, demo2, ... etc.
                    Refer to the on-line documentation section (Help entry) covering the
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp;
                    for a list of topics.
                    </p>

                    <p>
                    If you do not wish to continue with more demonstration problems,
                    you can experiment with the various ODOP:Spring features, menus and reports.
                    The Help menu is a good place to start.
                    </p>

                    <p>
                    Select (click on) the <b>Close</b> button to end this tutorial session.
                    </p>
                    <br />
                </>
            )
        }
    ]
}
