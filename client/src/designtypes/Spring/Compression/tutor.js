import React from 'react';
import { Image } from 'react-bootstrap';
import { changeSymbolValue, fixSymbolValue, loadInitialState, changeLabelsValue, search } from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    Welcome to the first ODOP tutorial session.
                    This session will provide an introduction to basic ODOP features and concepts
                    in the context of the compression spring design type.
                    </p>

                    <p>
                    If you are here simply as a "tourist" and are only interested in picking up a "flavor"
                    for ODOP:Spring as opposed to learning the underlying
                    concepts and major features at the disposal of a serious spring designer,
                    you may want to skip forward to the sample problems.
                    You may do this by Canceling this session and selecting one of the spring
                    design Demo sessions available from the <b>Help : Demo...</b> menu
                    when a Spring design type is loaded.
                    </p>

                    <p>
                    As with most of the other tutorial and demo sessions,
                    this session needs to start from a known state.
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP Compression Spring design type using U.S. customary units.
                    </p>

                    <p>
                    To continue with this session, just click the "Next" button as you finish
                    reading each page (step).
                    </p>
                </>
            )
        },
        {
            title: "Page 02 of 16",
            text: (
                <>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>

                    <p>
                    It will be helpful for you to understand that this tutorial session is "live" and not
                    a simple playback of a previous recording.
                    The ODOP main page has simply been displaced downward by the text in this light green
                    section.
                    All the menus and other inputs to the program remain available.
                    </p>

                    <p>
                    ODOP contains an "on-line" help facility.
                    It includes an overview of the program,
                    &nbsp;<a href="/docs/About/introPagesOverview.html" target="_blank" rel="noopener noreferrer">multiple introductory sections</a>&nbsp;
                    to help you in the process of getting started
                    plus helpful hints and detailed explanations of major features.
                    But first, a few words about what <b>not</b> to expect ...
                    The on-line help facility is not intended to replace the documentation that comes
                    with your browser or computer system.
                    Also, the Help facility is not intended to teach spring design.
                    The spring design user is expected to know the
                    basic physics of springs and strength of materials.
                    The spring design content assumes that the user is familiar with the
                    concepts of stress, factor of safety, yield point, endurance limit, etc.
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 16",
            text: (
                <>
                    <p>
                    So, as you are reading, please click the Help menu above.
                    It will drop down to provide a list of entries (topics) to choose from.
                    Selecting <b>Index</b> on this list will bring up a new browser tab with the
                    list of available Help entries. You can switch back and forth between the tabs
                    or close the new tab in order to return to this discussion.
                    </p>

                    <p>
                    Several of these entries are designed to bring new users up to speed
                    as quickly as possible.
                    </p>

                    <p>
                    &nbsp;<a href="/docs/Help/features.html" target="_blank" rel="noopener noreferrer">Features</a>&nbsp;
                    and
                    &nbsp;<a href="/docs/Help/introduction.html" target="_blank" rel="noopener noreferrer">Introduction</a>&nbsp;
                    cover many of the concepts behind the program.
                    </p>

                    <p>
                    &nbsp;<a href="/docs/Help/terminology.html" target="_blank" rel="noopener noreferrer">Terminology</a>&nbsp;
                    explains some of the unique terms that the program
                    and its supporting documentation insist on using.
                    ODOP is structured to be general and extensible to new kinds of designs.
                    The expectation is that this generality will pay off in the program's
                    ability to solve the really hard problems.
                    </p>

                    <p>
                    &nbsp;<a href="/docs/Help/gettingStartedSpring.html" target="_blank" rel="noopener noreferrer">Getting Started (spring)</a>&nbsp;
                    describes how to launch the first sessions of the spring design Tutorial and the spring design Demo
                    plus makes a few suggestions on how new users should approach learning the program.
                    </p>
                </>
            )
        },
        {
            title: "Page 04 of 16",
            text: (
                <>
                    <p>
                    It is likely that you have already discovered that ODOP provides a "tooltip" feature.
                    If using a touchpad or mouse, simply hover the cursor over any of the
                    titles or Variable names on the main page.
                    A tooltip will pop-up with additional information about that portion of
                    the screen or variable.
                    If you are using a touch screen device, it will be necessary to tap the
                    item of interest in order to see the tooltip.
                    </p>

                    <p>
                    This is a good time to explore the page and those tool tips.
                    When you are ready,
                    just click the Next button to continue with this session of the tutorial.
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 05 of 16",
            text: (
                <>
                    <p>
                    In the rest of this section of the tutorial we will cover the basic analysis
                    and solution features offered by ODOP.
                    First, you will see how the Independent Variables
                    (inputs <b>TO</b> the design equations) can be changed and how these changes
                    are immediately reflected in the values of the Dependent Variables
                    (outputs <b>FROM</b> the design equations).
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
            title: "Page 06 of 16",
            text: (
                <>
                <Image fluid src="/docs/Help/DesignTypes/Spring/img/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </>
            )
        },
        {
            title: "Page 07 of 16",
            text: (
                <>
                    <p>
                    This is a good time to take a close look at existing values.
                    You may need to scroll down to see everything.
                    </p>

                    <p>
                    In the process of moving to the following page, the tutorial will impose a new value
                    for an input (Independent Variable) ... the free length (L_Free) of our compression spring.
                    Take note of the current value of %_Avail_Deflect so that you can see the
                    impact of the change.
                    </p>

                    <p>
                    When you click on Next, the tutorial will set the value of L_Free to 3.0 inches.
                    </p>
                </>
            )
        },
        {
            title: "Page 08 of 16",
            text: (
                <>
                    <p>
                    The tutorial has now entered a value of 3.0 inches for L_Free.
                    In the shorthand summary that will be used in the remaining tutorial
                    and demo sessions, the action was:
                    </p>

                    <p>
                    CHANGE  L_Free  3.0<br />
                    </p>

                    <p>
                    Notice how the outputs (Dependent Variables) have immediately updated to reflect
                    the change.
                    The remaining Independent Variable values remain as established by the initialState
                    that was imposed at the start of this session.
                    </p>

                    <p>
                    Also notice that this change to L_Free by this tutorial session did not leave it in Fixed status.
                    By default, the ODOP AutoFix feature is enabled.
                    Thus, a user making a change to the value of an independent variable like OD_Free
                    will leave it in Fixed status.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("L_Free", 3.0)
            ]
        },
        {
            title: "Page 09 of 16",
            text: (
                <>
                    <p>
                    Okay, that wasn't really very exciting.
                    The objective here is to illustrate how ODOP can do simple analysis.
                    Given the physical description of the object under consideration,
                    ODOP can use the mathematical model to predict aspects of its performance.
                    For a spring, that is things like spring Rate, stresses,
                    factor of safety, cycle life, etc.
                    If working with the Rectangular Solid demonstration case,
                    we would be speaking in terms of things like Volume, Weight, etc.
                    </p>

                    <p>
                    Ready for another example ?
                    </p>

                    <p>
                    When you click on Next, the tutorial will impose a value of 12 coils (turns) on Coils_T.<br />
                    <br />
                    CHANGE Coils_T 12
                    </p>
                </>
            )
        },
        {
            title: "Page 10 of 16",
            text: (
                <>
                    <p>
                    Well, that brought a little more color into the ODOP world !
                    </p>

                    <p>
                    If you scroll down, you can see that the
                    design now exceeds the MAX constraint on %_Avail_Deflect
                    (percentage of available deflection at load point 2).
                    Since a constraint is violated, this design is considered to be
                    "Not Feasible".
                    A Search (Search button or <b>Action : Search</b> menu) will be required to
                    find values of free (not Fixed) Independent Variables such that
                    constraints are not violated.
                    </p>

                    <p>
                    Before we get into Search, let's suppose that we really don't want
                    the Search process to change either the 0.1055 inch value for Wire_Dia or the
                    39 pound value of Force_2 that were established by default (the initialState).
                    When you click Next, the tutorial will check the appropriate Fix checkboxes
                    (positioned between the Value entry fields and the Units fields)
                    to put Wire_Dia and Force_2 into Fixed status.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Coils_T",12)
            ]
        },
        {
            title: "Page 11 of 16",
            text: (
                <>
                    <p>
                    Now, the Fix checkboxes for Wire_Dia and Force_2 are checked.
                    Also, Fixed status is indicated by heavy borders at the right and left of the Value field.
                    </p>

                    <p>
                    By having Wire_Dia and Force_2 in Fixed status, the search will be able to adjust
                    only the values of OD_Free, Wire_Dia, L_Free and Coils_T to find a design that
                    does not exceed the maximum on %_Avail_Deflect.
                    Of course, the entire collection of Dependent Variables will respond
                    to any changes in the Independent Variables.
                    </p>
                    <br /><br />
                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia'),
                fixSymbolValue('Force_2')
            ]
        },
        {
            title: "Page 12 of 16",
            text: (
                <>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (Search button or <b>Action : Search</b> menu)
                    for a solution.
                    Specifically, Search will find values of the free Independent Variables
                    that cause the constraints and Fixes to be satisfied.
                    </p>

                    <p>
                    If the program can find a solution that completely satisfies all the constraints,
                    it will display "<b>Strictly FEASIBLE</b>" in the Result section (immediately below these words).
                    If a satisfactory solution is found, but one or more constraints remain violated by a
                    trivial amount, the program will display "<b>FEASIBLE</b>" in the Result section.
                    </p>

                    <p>
                    Click "Next".
                    The search operation will take place as we transition to the next page.
                    </p>
                </>
            ),
        },
        {
            title: "Page 13 of 16",
            text: (
                <>
                    <p>We have a solution. Please take a moment to scroll through and view the values.</p>

                    <p>
                    Indeed, the design now utilizes less than 90 percent of its available deflection.
                    Also, Wire_Dia has remained at 0.1055 inches
                    and Force_2 at 39 pounds as specified.
                    </p>

                    <p>
                    Finally, to wrap up this session,
                    the next page will demonstrate how it is possible to specify
                    the value of L_Stroke, a Dependent Variable.
                    We will choose 1.725 inches, a value very close to what was in place
                    prior to making the changes up to this point in this tutorial session.
                    </p>
                    <br /><br />
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 14 of 16",
            text: (
                <>
                    <p>
                    The tutorial has imposed: Fix L_Stroke 1.725
                    </p>

                    <p>
                    The Fix is implemented as a weighted double-sided constraint.
                    </p>

                    <p>
                    Again, a Search will be required to establish values for the free Independent Variables
                    such that the Fixed value of L_Stroke is established while simultaneously keeping %_Avail_Deflect
                    below the maximum.
                    </p>

                    <p>
                    Look for the results on the next page.
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('L_Stroke', 1.725)
            ]
        },
        {
            title: "Page 15 of 16",
            text: (
                <>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    </p>

                    <p>
                    This session has touched on a few of the most basic concepts of ODOP operation.
                    </p>

                    <ul>
                        <li>
                        It is possible to set the value of any Independent Variable
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
                        It is possible to Fix the value of any Variable.
                            <ul>
                                <li>
                                    Fixed Independent Variables are not altered by the Search process.
                                </li>
                                <li>
                                    Fixed Dependent Variables require a Search to establish their value.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 16 of 16 (last page)",
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
                    More compression spring tutorial sessions are available.
                    They have names like tutorTour, tutor3, tutor4, ... etc.
                    Refer to the on-line documentation section (Help entry) covering the
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp;
                    for a list of topics.
                    </p>

                    <p>If you do not wish to continue with more demonstration problems,
                    you can experiment with the various ODOP features, menus and reports.
                    The HELP menu is a good place to start. </p>
                </>
            )
        }
    ]
}
