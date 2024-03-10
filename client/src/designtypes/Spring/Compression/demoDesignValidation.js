import React from 'react';
import { Image } from 'react-bootstrap';
import { loadInitialState, logUsage, fixSymbolValue, changeLabelsValue, search } from '../../../store/modelSlice';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    The following example illustrates the use of ODOP:Spring to validate
                    the design of a compression spring.
                    Also known as "design check", this is a straightforward calculation of
                    stresses and other figures of merit for a design with known
                    wire diameter, coil diameter, number of coils, free length and
                    applied loads or deflections.
                    </p>

                    <p>
                    As described in the tutorial session named tutorTour,
                    this light green panel is inserted above the main page.
                    The ODOP:Spring app is just displaced downward.
                    It remains fully functional.
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
            title: "Page 02 of 10",
            text: (
                <>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    Before we make additional changes, let's review the problem statement:<br />
                    </p>

                    <p>
                    Estimate the life of a compression spring of the specified dimensions
                    when subjected to the given working lengths; determine corresponding forces,
                    stress levels, tendency to buckle, and other figures of merit for the design.
                    </p>

                    <table>
                        <tbody>
                            <tr><th>wire diameter</th><td>=</td><td>0.0395</td><td>inches</td><td width="5%"></td><td>Music wire  ASTM A228</td></tr>
                            <tr><th>outside diameter</th><td>=</td><td>0.357</td><td>inches</td><td></td><td>closed & ground ends</td></tr>
                            <tr><th>free length</th><td>=</td><td>0.807</td><td>inches</td></tr>
                            <tr><th>total coils</th><td>=</td><td>8.0</td><td>turns</td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><th>first load height</th><td>=</td><td>0.689</td><td>inches</td></tr>
                            <tr><th>second load height</th><td>=</td><td>0.394</td><td>inches</td></tr>
                        </tbody>
                    </table>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring demoDesignValidation'}])
            ]
        },
        {
            title: "Page 03 of 10",
            text: (
                <>
                    <p>
                    In general, the easiest way to begin is to modify an existing design.
                    This demo session will modify this design until it meets the requirements of the current design problem.
                    The following sequence of pages will illustrate this process.
                    </p>

                    <p>
                    Since you may not be familiar with the names of ODOP:Spring variables,
                    the next screen will illustrate several variable names in the
                    context of a force-deflection diagram.
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 04 of 10",
            text: (
                <>
                   <Image fluid src="/docs/Help/DesignTypes/Spring/img/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </>
            )
        },
        {
            title: "Page 05 of 10",
            text: (
                <>
                    <p>Next, we enter everything we know about the problem. </p>

                    <p>Because this session is simply checking the performance of an existing design,
                    we will primarily use the ODOP capability to FIX the value of selected Independent
                    and Dependent variables.
                    Other demo and tutorial sessions
                    that illustrate the use of ODOP:Spring in an original design situation
                    will introduce additional capabilities of the software.</p>

                    <p>This is a good time to take a good look at the existing values.
                    Many values will update immediately as the demo session enters the changes.</p>

                    <p>You can scroll the page down to view the complete set of values.
                    Scroll back up in order to use the Next button to continue.</p>
                </>
            )
        },
        {
            title: "Page 06 of 10",
            text: (
                <>
                    <p>
                    This demo session has now entered what is known about the problem.
                    In summary, the changes were:<br />
                    </p>
                    FIX  Wire_Dia   0.0395<br/>
                    FIX  OD_Free    0.357<br/>
                    FIX  L_Free     0.807<br/>
                    FIX  Coils_T    8<br/>
                    FIX  L_1 &nbsp; 0.689<br/>
                    FIX  L_2 &nbsp; 0.394<br/>
                    <br />
                    <p>
                    The current values for Force_1 and Force_2 are left as established by the initialState.
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.0395),
                fixSymbolValue('OD_Free', 0.357),
                fixSymbolValue('L_Free', 0.807),
                fixSymbolValue('Coils_T', 8),
                fixSymbolValue('L_1', 0.689),
                fixSymbolValue('L_2', 0.394),
            ]
        },
        {
            title: "Page 07 of 10",
            text: (
                <>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask "Search" for a solution.
                    Specifically, to solve for the Force_1 and Force_2
                    values that correspond to the FIXes that have just been established.
                    </p>

                    <p>
                    If the Search process can find a solution that fully satisfies all the constraints,
                    it will display "<b>STRICTLY FEASIBLE</b>" in the Result section (immediately below these words).
                    If a satisfactory solution is found, but one or more constraints remain violated by a
                    trivial amount, the program will display "<b>FEASIBLE</b>" in the Result section.
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
            title: "Page 08 of 10",
            text: (
                <>
                    <p>
                    We have a solution.
                    Take a moment to scroll through and view the values.
                    </p>

                    <p>
                    Note that figures of merit such as cycle life, weight,
                    percentage of available deflection utilized at load point 2
                    and various stress related details are available in the Reports.
                    Use the View menu to access Reports.
                    </p>

                    <p>
                    The "<b>%_Avail_Deflect @ 2 > 80%</b>" alert and Report 1 message:
                    "<b>Coil to coil contact may cause inaccuracy in point 2.</b>"
                    are produced any time that the second load uses more
                    than 80 % of available deflection.
                    </p>
                    <p>
                    There is no alert or Report1 warning about buckling so that is not a concern for this design.
                    </p>
                </>
            ),
            actions: [
                logUsage('event','demo', { event_label: 'Page 08 of 10' }),
                search()
            ]
        },
        {
            title: "Page 09 of 10",
            text: (
                <>
                    <p>
                    Don't forget to switch the view back to a main page (Advanced or Calculator View).
                    <br /><br />
                    Just in case you missed them on the previous screen, you can
                    scroll down to view the values of <b>Cycle_Life, %_Avail_Deflect</b> and <b>Weight </b>
                    to complete the original problem objectives.
                    </p>
                </>
            )
        },
        {
            title: "Page 10 of 10 (last page)",
            text: (
                <>
                    <p>
                    This completes the first ODOP:Spring demonstration problem.
                    </p>

                    <p>
                    The next demonstration problem provides a more
                    detailed example of spring design from original specifications.
                    Select "demoNewDesign" from the <b>Help : Demo...</b> menu item.
                    </p>

                    <p>
                    Several more demo problems are available.
                    They are named demo1, demo2, ... etc.
                    Tutorial sessions named tutor3, tutor4, ... etc. provide instructions on how to use
                    the ODOP software.
                    Refer to the on-line documentation section (Help entry) covering the
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp;
                    for a complete list of the tutorial and demo topics.
                    </p>

                    <p>
                    If you do not wish to continue with more demonstration problems,
                    you can experiment with the various ODOP:Spring features, menus and reports.
                    The HELP menu is a good place to start.
                    </p>
                </>
            )
        }
    ]
}
