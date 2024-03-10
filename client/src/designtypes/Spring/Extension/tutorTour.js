import React from 'react';
import { Image } from 'react-bootstrap';
// import { changeSymbolValue, changeSymbolConstraint, loadInitialState, changeLabelsValue } from '../../../store/modelSlice';
// import { MAX } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    This tutorial session provides a quick tour of the ODOP "main" page
                    also known as the "Advanced View".
                    This session is independent of the spring type (compression, extension or torsion)
                    and does not make any changes to the existing design.
                    </p>

                    <p>
                    To continue with this session, just click the "Next" button as you finish
                    reading each page (step).
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 02 of 22",
            text: (
                <>
                    <p>
                    The remainder of this session will display a sequence of small
                    snippets of the main page and then provide a description of how each
                    section contributes the the operation of the program.
                    </p>

                    <p>
                    The text and screen clips of the tutorial appear with a light green
                    background below the main menu and above the body of the main page.
                    Scroll down to see the remainder of the page.
                    The app remains fully functional.
                    You can follow instructions provided in the tutorial sessions
                    and the app will respond.
                    </p>
                    <br />
                </>
            ),
            actions: [
//                loadInitialState('Spring/Compression'),
//                changeSymbolValue("L_Free", 3.0),
//                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
//                changeLabelsValue([{name: 'COMMENT', value: 'tutorTour - Compression Spring tutorial session'}])
            ]
        },
        {
            title: "Page 03 of 22",
            text: (
                <>
                    <p>
                    The snippet below illustrates the main menu (<b>File &nbsp; Action &nbsp; View &nbsp; Help</b>)
                    highlighted inside the red oval.
                    The menu section of the main page is above and slightly left of this text.
                    </p>

                    <Image fluid src="/docs/Help/img/MainMenu.png" alt="Main Menu"/>

                    <p>
                    <br />
                    </p>

                    <p>
                    Take this opportunity to select one of the main menu entries.
                    A drop-down with sub-items will appear.
                    Feel free to explore and review the entire menu structure.
                    Click "Next" when you are ready to proceed.
                    </p>
                </>
            )
        },
        {
            title: "Page 04 of 22",
            text: (
                <>
                    <p>
                    ODOP contains an "on-line" help facility.
                    It includes an overview of the program, a generic
                    &nbsp;<a href="/docs/Help/gettingStarted.html" target="_blank" rel="noopener noreferrer">Getting Started</a>&nbsp;
                    section, a
                    &nbsp;<a href="/docs/Help/gettingStartedSpring.html" target="_blank" rel="noopener noreferrer">spring design oriented Getting Started</a>&nbsp;
                    section plus helpful hints and detailed explanations of major features.
                    </p>

                    <p>
                     But first, a few words about what <b>not</b> to expect ...
                    The on-line help facility is not intended to replace the documentation that comes
                    with your browser or computer system.
                    Also, the Help facility is not intended to teach spring design.
                    The spring design user is expected to know the
                    basic physics of springs and strength of materials.
                    The spring design content assumes that the user is familiar with the
                    concepts of stress, factor of safety, yield point, endurance limit, etc.
                   </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 05 of 22",
            text: (
                <>
                    <p>
                    Here is an example of how each main menu item will drop down to provide specific menu items.
                    The lower red arrow in this screen clip illustrates how to get to the index of Help pages.
                    </p>
                    <Image fluid src="/docs/Help/img/HelpIndex.png" alt="Help Index"/>

                    <p>
                    <br/>
                    The upper red arrow shows how full-text search of the on-line Help is available.
                    Enter a search term in the Help lookup field and click the magnifying glass icon.
                    Enter the term "Lookup" to get details on how to form phrases and more complex queries.
                    </p>
                </>
            )
        },
        {
            title: "Page 06 of 22",
            text: (
                <>
                    <p>
                    In the right portion of the menu bar (above this text),
                    you should see an icon associated with the design type
                    (in this case, an illustration of the currently active spring type)
                    and the name of the specific design that is currently open.
                    Spring designs will each have three additional views (highlighted in red below)
                    providing spring-specific reports.
                    </p>

                    <Image fluid src="/docs/Help/img/SpringReportTabs.png" alt="Spring Report Tabs"/>

                    <p>
                    <br />
                    </p>

                    <p>
                    You can take this opportunity to click on each of the Report views to get acquainted with the
                    information provided there.
                    Be sure to return to the main page before clicking "Next" to continue.
                    </p>
                </>
            )
        },
        {
            title: "Page 07 of 22",
            text: (
                <>
                    <p>
                    The Result section is positioned below this text, near the top of the main page.
                    This area provides feedback about the solution process.
                    </p>

                    <Image fluid src="/docs/Help/img/ResultSection.png" alt="Result Section"/>

                    <p>
                    <br />
                    </p>

                    <p>
                    </p>

                    <p>
                    </p>
                </>
            )
        },
        {
            title: "Page 08 of 22",
            text: (
                <>
                    <p>
                    If you hover the cursor over a heading or a variable name,
                    a tool-tip will pop up to provide more information regarding each item.
                    </p>

                    <Image fluid src="/docs/Help/img/ResultSectionToolTip.png" alt="Result Section ToolTip"/>

                    <p>
                    <br />
                    </p>


                    <p>
                    You can take this opportunity to survey the remainder of the tool-tips on the main page.
                    </p>

                    <p>
                    </p>
                </>
            ),
            actions: [
            ]
        },
        {
            title: "Page 09 of 22",
            text: (
                <>
                    <p>
                    There are numeric entry fields for each of the variables.
                    The user can change the value of Independent Variables by positioning
                    the cursor in the field and over-writing the existing value.
                    Recalculation will happen immediately.
                    The Dependent Variables, constraint violations and Objective Value will immediately
                    reflect the result of the new value for that Independent Variable.
                    </p>

                    <Image fluid src="/docs/Help/img/IndependentSpring.png" alt="Independent Variable Entry Fields"/>

                    <p>
                    </p>
                </>
            )
        },
        {
            title: "Page 10 of 22",
            text: (
                <>
                    <p>
                    In order change the value of a Dependent Variable, it is necessary
                    to FIX its value (more about FIX coming soon) and then execute the Search feature
                    (Search button or <b>Action : Search</b> menu).
                    </p>

                    <Image fluid src="/docs/Help/img/DependentSpring.png" alt="Dependent Variable Entry Fields"/>

                    <p>
                    </p>
                </>
            ),
        },
        {
            title: "Page 11 of 22",
            text: (
                <>
                    <p>
                    Calculation Inputs are quantities that can be modified by the user
                    but are not subject to constraints, FIX or manipulation by the Search process.
                    </p>

                    <Image fluid src="/docs/Help/img/CalcInputSpring.png" alt="Calculation Input Entry Fields"/>

                    <p>
                    <br />
                    You will likely need to scroll down to see the section of the main page containing
                    Calculation Inputs.
                    Scroll back up and click "Next" when ready to continue.
                    </p>
                </>
            ),
        },
        {
            title: "Page 12 of 22",
            text: (
                <>
                    <p>
                    This clip illustrates how a Calculation Input with a drop-down arrow
                    can expand into a table that the user can select from.
                    In this case, the user selects a material and the appropriate
                    material property values are provided to the calculations.
                    </p>

                    <Image fluid src="/docs/Help/img/CalcInputTableSpring.png" alt="Calculation Input Selection Table"/>

                    <p>
                    </p>
                </>
            ),
        },
        {
            title: "Page 13 of 22",
            text: (
                <>
                    <p>
                    Constraints are single sided (Max or Min) limits imposed on the
                    selected Variable.
                    First, mark the constraint checkbox and then enter a value in the entry field.
                    The amount of constraint violation will be recalculated immediately;
                    a positive value if violated or a negative value if satisfied.
                    The Objective Value will reflect the aggregate impact of all violated constraints.
                    This example illustrates a few of the constraints provided with
                    the default design named "Startup".
                    </p>

                    <Image fluid src="/docs/Help/img/ConstraintSpring.png" alt="Constraints"/>

                    <p>
                    </p>
                </>
            ),
        },
        {
            title: "Page 14 of 22",
            text: (
                <>
                    <p>
                    In order to FIX the value of an Independent Variable, put a check
                    in the box immediately to the right of its value.
                    Note the checkboxes highlighted by the red oval in  this example.
                    </p>

                    <Image fluid src="/docs/Help/img/IV_FixSpring.png" alt="Fix an Independent Variable"/>

                    <p>
                    </p>
                </>
            ),
        },
        {
            title: "Page 15 of 22",
            text: (
                <>
                    <p>
                    In order to FIX the value of a Dependent Variable, put a check
                    in the box immediately to the right of its value.
                    This will cause both associated constraints to be checked and the
                    corresponding constraint entry fields to become available for input.
                    Enter the FIX value into either entry field.
                    Thus, the FIX of a Dependent Variable is effectively a double-sided constraint.
                    </p>

                    <Image fluid src="/docs/Help/img/DV_FixSpring.png" alt="Fix a Dependent Variable"/>

                    <p>
                    </p>
                </>
            ),
        },
        {
            title: "Page 16 of 22",
            text: (
                <>
                    <p>
                    </p>

                    <p>
                    To summarize:
                    </p>

                    <ul>
                        <li>
                        It is possible to set a value on any Independent Variable
                            <ul>
                                <li>
                                    Dependent Variables will immediately recalculate to reflect that value.
                                </li>
                            </ul>
                        </li>

                        <li>
                        If constraints are violated, a Search can manipulate values of free
                        Independent Variables in order to achieve a feasible solution
                        (if one exists).
                        </li>

                        <li>
                        It is possible to FIX the value of any Variable.
                            <ul>
                                <li>
                                    FIXed Independent Variables are not altered by the Search process.
                                </li>
                                <li>
                                    FIXed Dependent Variables require a Search to establish their value.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </>
            )
        },
        {
            title: "Page 17 of 22",
            text: (
                <>
                    <p>
                    ALERTS are error, warning, notice and informational messages produced in response to design changes.
                    A red "badge" on the Alerts button indicates the total number of pending alerts.
                    </p>
                    <Image fluid src="/docs/Help/img/AlertPanel.png" alt="Alert Panel"/>

                    <p>
                    <br/>
                    Click the Alerts button to open and close the Alerts panel.
                    The Help button will open a new browser tab containing a more detailed explanation of each alert.
                    Where possible, this explanation includes suggestions on how to resolve the alert.
                    </p>
                </>
            )
        },
        {
            title: "Page 18 of 22",
            text: (
                <>
                    <p>
                    The quick tour of the Advanced View main page is now complete.
                    This is a good time good to get a better look at what is available
                    in the on-line documentation.
                    Selecting <b>Index</b> from the Help menu will bring up a new browser tab with the
                    list of available Help topics.
                    From there, switch back and forth between the browser tabs to see both the Help content and the ODOP app.
                    </p>

                    <Image fluid src="/docs/Help/img/HelpIndex.png" alt="Help Index"/>

                    <p>
                    <br />
                    Topics on the Index page appear in an order ranked from more general and introductory to more specific.
                    Spring specific details appear in the Spring Design topic at the bottom of the list.
                    </p>
                </>
            ),
        },
        {
            title: "Page 19 of 22",
            text: (
                <>
                    <p>
                    Spring design demonstration sessions illustrate problem solving techniques as well as provide
                    sample solutions to several generally available reference book problems.
                    Use the <b>Help : Demo...</b> menu item to select the desired demo session.
                    </p>

                    <Image fluid src="/docs/Help/img/HelpDemo.png" alt="Help Demo"/>
                    <br />
                    <Image fluid src="/docs/Help/img/SelectSpringDemo.png" alt="Select Spring Demo"/>

                    <p>
                    </p>
                </>
            ),
        },
        {
            title: "Page 20 of 22",
            text: (
                <>
                    <p>
                    This tutorial session will now wrap up with a few bits of
                    general information.
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
            title: "Page 21 of 22",
            text: (
                <>
                <Image fluid src="/docs/Help/DesignTypes/Spring/img/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </>
            )
        },
        {
            title: "Page 22 of 22 (last page)",
            text: (
                <>
                    <p>
                    Remember that it is always possible to restart a given session of
                    the ODOP demo / tutorial.
                    If at any point you become curious about
                    "Why does the tutorial do it that way ?",
                    you can finish that tutorial section normally,
                    then return to the point in question later.
                    Alternatively, it is possible to make a sequence of changes in mid-tutorial
                    to explore your ideas and then use the "Back" button to get back on
                    track with the tutorial.
                    You are encouraged to experiment with the program.
                    You are not likely to break it or wear it out !
                    </p>

                    <p>
                    More tutorial sessions are available.
                    They have names like tutor3, tutor4, ... etc.
                    Refer to the on-line documentation section (Help entry) covering the
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp;
                    for a list of topics.
                    </p>

                    <p>If you do not wish to continue with more tutorial sessions or demonstration problems,
                    you can experiment with the various ODOP features, menus and reports.
                    The HELP menu is a good place to start. </p>
                </>
            )
        }
    ]
}
