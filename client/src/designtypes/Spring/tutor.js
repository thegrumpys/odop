import React from 'react';
import { changeSymbolValue, fixSymbolValue, loadInitialState, search } from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    Welcome to the first ODOP tutorial session.
                    This session will provide an introduction to basic ODOP features and concepts.
                    </p>
                    
                    <p>
                    If you are here simply as a "tourist" and are only interested in picking up a "flavor" 
                    for ODOP:Spring as opposed to walking through the underlying
                    concepts and major features at the disposal of a serious spring designer, 
                    you may want to skip forward to the sample problems. 
                    You may do this by Canceling this session and selecting one of the spring 
                    design Demo sessions available from the <b>Help : Demo...</b> menu
                    when a Spring design type is loaded.
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP <b>Compression Spring</b> design model.
                    </p>
                    
                    <p>
                    To continue with this session, just click the "Next" button as you finish
                    reading each page (step). 
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 16",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    ODOP contains an "on-line" help facility.
                    It includes an overview of the program, a <b>Getting Started</b> section plus
                    helpful hints and detailed explanations of major features.  
                    But first, a few words about what <b>not</b> to expect ...
                    The on-line help facility is not intended to replace the documentation that comes 
                    with your browser or computer system.  
                    Also, the Help facility is not intended to teach spring design. 
                    The spring design user is expected to know the
                    basic physics of springs and strength of materials. 
                    The spring design content assumes that the user is familiar with the
                    concepts of stress, factor of safety, yield point, endurance limit, etc.
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring')
            ]
        },
        {
            title: "Page 03 of 16",
            text: (
                <React.Fragment>
                    <p>
                    So, as you are reading, please click the Help menu above.
                    It will drop down to provide a list of entries (topics) to choose from.
                    Selecting <b>Index</b> on this list will bring up a new browser tab with the
                    list of available Help entries. You can switch back and forth between the tabs.
                    </p>
                    
                    <p>
                    Several of these entries are designed to bring new users up to speed
                    as quickly as possible.<br />
                    <br />
                    <b>Features</b> and <b>Introduction</b> cover many of the concepts 
                    behind the program.<br />
                    <br />
                    <b>Terminology</b> explains some of the unique terms that the program
                    and its supporting documentation insist on using. 
                    ODOP is structured to be general and extensible to new kinds of designs.
                    The expectation is that this generality will pay off in the program's 
                    ability to solve the really hard problems.<br />
                    <br />
                    <b>Getting Started</b> provides a tour of the main page (below) plus
                    makes a few suggestions on how new users should attack the program.
                    Note that for the compression spring design type, 
                    the "main page" is actually the first of four "tabs" and 
                    has the name "Design:" plus a coil spring icon and the name of the current design. 
                    The remaining tabs are Reports 1 through 3.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 16",
            text: (
                <React.Fragment>
                    <p>
                    Perhaps you have already discovered that ODOP provides a "tooltip" feature.
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
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 16",
            text: (
                <React.Fragment>
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
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of 16",
            text: (
                <React.Fragment>
                <img src="designtypes/Spring/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 16",
            text: (
                <React.Fragment>
                    <p>
                    This is a good time to take a close look at existing values.
                    You may need to scroll down to see everything.
                    </p>
                    
                    <p>
                    In the process of moving to the following page, the tutorial will impose a new value 
                    for an input (Independent Variable) ... the Wire_Dia of our compression spring. 
                    Take note of the current value of Rate or %_Avail_Deflect so that you can see the 
                    impact of the change.
                    </p>
                    
                    <p>
                    When you click on Next, the tutorial will set the value of Wire_Dia to 0.110 inches.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 08 of 16",
            text: (
                <React.Fragment>
                    <p>
                    The tutorial has now entered a value of 0.110 inches for Wire_Dia. 
                    In the shorthand summary that will be used in the remaining tutorial 
                    and demo sessions, the action was:
                    </p>
                    
                    <p>
                    CHANGE  Wire_Dia  0.110<br />
                    </p>
                    
                    <p>
                    Notice how the outputs (Dependent Variables) have immediately updated to reflect
                    the change.
                    The remaining Independent Variable values remain as established by the initialState
                    that was imposed at the start of this session. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Wire_Dia", 0.110)
            ]
        },
        {
            title: "Page 09 of 16",
            text: (
                <React.Fragment>
                    <p>
                    Okay, that wasn't really very exciting. 
                    The objective here is to illustrate how ODOP can do simple analysis. 
                    Given the physical description of the object under consideration, 
                    ODOP can use the mathematical model to predict aspects of its performance.
                    For a spring, that is things like spring Rate, stresses, 
                    factor of safety, cycle life, etc.
                    When working with the rectangular solid, 
                    we will be speaking in terms of things like Volume, Weight, etc.
                    </p>
                    
                    <p>
                    Ready for another example ?
                    </p>
                    
                    <p>
                    When you click on Next, the tutorial will impose a value of 12 coils (turns) on Coils_T.<br />
                    <br />
                    CHANGE Coils_T 12
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 10 of 16",
            text: (
                <React.Fragment>
                    <p>
                    Well, that brought a little color into the ODOP world !
                    </p>
                    
                    <p>
                    If you scroll down, you can see that the
                    design now exceeds the 90 percent MAX constraint on %_Avail_Deflect
                    (percentage of available deflection at load point 2).
                    Since a constraint is violated, this design is considered to be
                    "Not Feasible".
                    A Search (<b>Action : Search</b> menu) will be required to
                    find values of free (not FIXed) Independent Variables such that 
                    constraints are not violated.
                    </p>
                    
                    <p>
                    Before we get into Search, let's suppose that we really don't 
                    want the Search process to change either the 0.110 inch value for Wire_Dia that 
                    we established earlier in this session or the 40 pound value of Force_2 that 
                    was established by the initialState.
                    When you click Next, the tutorial will check the appropriate FIX checkboxes 
                    (positioned between the Value entry fields and the Units fields) 
                    to put Wire_Dia and Force_2 into FIXed status.
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Coils_T",12)
            ]
        },
        {
            title: "Page 11 of 16",
            text: (
                <React.Fragment>
                    <p>
                    Now, the FIX checkboxes for Wire_Dia and Force_2 are checked.
                    </p>
                    
                    <p>
                    By having Wire_Dia and Force_2 in FIXed status, the search will be able to adjust
                    only the values of OD_Free, Wire_Dia, L_Free and Coils_T to find a design that does not 
                    exceed the 90 per cent maximum on %_Avail_Deflect.
                    Of course, the entire collection of Dependent Variables will respond 
                    to any changes in the Independent Variables.
                    </p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Wire_Dia'),
                fixSymbolValue('Force_2')
            ]
        },
        {
            title: "Page 12 of 16",
            text: (
                <React.Fragment>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (<b>Action : Search</b> menu) for a solution.
                    Specifically, Search will find values of the free Independent Variables
                    that cause the Constraints and FIXes to be satisfied.
                    </p>

                    <p>
                    If the program can find a solution that satisfies all the constraints,
                    it will display "<b>FEASIBLE</b>" in the Result section (immediately below these words).  
                    If a satisfactory solution is found, but one or more constraints remain violated by a
                    trivial amount, the program will display "<b>MARGINALLY FEASIBLE</b>" in the Result section.
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 13 of 16",
            text: (
                <React.Fragment>
                    <p>We have a solution. Please take a moment to scroll through and view the values.</p>
                    
                    <p>
                    Indeed, the design now utilizes less than 90 percent of its available deflection.
                    Also, Wire_Dia has remained at 0.110 inches 
                    and Force_2 at 40 poinds as specified. 
                    </p>
                    
                    <p>
                    Finally, to wrap up this session,
                    the next page will demonstrate how it is possible to specify
                    the value of L_Stroke, a Dependent Variable.
                    We will choose 1.725 inches, a value very close to what was in place
                    prior to making the changes up to this point in this tutorial session.
                    </p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 14 of 16",
            text: (
                <React.Fragment>
                    <p>
                    The tutorial has imposed:<br /><br />
                    FIX L_Stroke 1.725.0
                    </p>
                    
                    <p>
                    The FIX is implemented as a weighted double-sided constraint.
                    </p>
                    
                    <p>
                    Again, a Search will be required to establish values for the free Independent Variables
                    such that the FIXed value of L_Stroke is established while simultaneously keeping %_Avail_Deflect 
                    below the 90 percent maximum.
                    </p>
                    
                    <p>
                    Look for the results on the next page.
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('L_Stroke', 1.725)
            ]
        },
        {
            title: "Page 15 of 16",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    </p>
                    
                    <p>
                    This session has touched on a few of the most basic concepts of ODOP operation.
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
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 16 of 16 (last page)",
            text: (
                <React.Fragment>
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
                    
                    <p>Several more tutorial sessions are planned. 
                    They will have names like tutor1, tutor2, ... etc. 
                    Refer to the documentation section (Help entry) covering the tutorial 
                    for a list of the Tutorial and DEMO topics.</p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                </React.Fragment>
            )
        }
    ]
}
