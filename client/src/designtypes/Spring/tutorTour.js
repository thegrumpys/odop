import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, loadInitialState, changeLabelsValue } from '../../store/actionCreators';
import { MAX } from '../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    This tutorial session will provide a quick tour of the ODOP "main" page using
                    the compression spring design type as the example.
                    </p>
                    
                    <p>
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
                    To continue with this session, just click the "Next" button as you finish
                    reading each page (step). 
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 20",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    The remainder of this session will display a succession of small 
                    snippets of the main page and then provide a description of how each 
                    section contributes the the operation of the program.
                    </p>
                    
                    <p>
                    The text and screen clips of the tutorial appear with a light green 
                    background below the main menu and above the body of the main page.
                    Scroll down to see the remainder of the page.
                    The app remains fully functional.
                    You can follow instructions provided in the tutorial sessions and the app will
                    respond.
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
                changeLabelsValue([{name: 'COMMENT', value: 'tutorTour - Compression Spring tutorial session'}])
            ]
        },
        {
            title: "Page 03 of 20",
            text: (
                <React.Fragment>
                    <p>
                    The snippet below illustrates the main menu (<b>File &nbsp; Action &nbsp; View &nbsp; Help</b>)
                    highlighted inside the red oval.
                    The menu section of the main page is above and slightly left of this text.
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/MainMenu.png" alt="Main Menu"/>
                    
                    <p>
                    <br />
                    </p>
                    
                    <p>
                    Take this opportunity to select one of the main menu entries. 
                    A drop-down with sub-items will appear. 
                    Feel free to explore and review the entire menu structure.
                    Click "Next" when you are ready to proceed.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 20",
            text: (
                <React.Fragment>
                    
                    <p>
                    ODOP contains an "on-line" help facility.
                    It includes an overview of the program, a <b>Getting Started</b> section plus
                    helpful hints and detailed explanations of major features.  
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
                    
                    <p>
                    <br />
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 20",
            text: (
                <React.Fragment>
                    <p>
                    Here is an example of how each main menu item will drop down to provide 
                    specific menu items.
                    Note that menu entries associated with not yet implemented features are disabled (grey).
                    This screen clip illustrates how to get to the index of Help pages.   
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/HelpIndex.png" alt="Help Index"/>
                    
                    <p>
                    <br />
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of 20",
            text: (
                <React.Fragment>
                    <p>
                    Above, you should see an internal "tab" with the name "Design:",
                    an icon associated with the design type (a helix with open ends in this case) 
                    and the name of the specific design that is currently open.
                    Spring designs will each have three additional tabs (highlighted in red below) 
                    providing spring-specific reports. 
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/SpringReportTabs.png" alt="Spring Report Tabs"/>
                    
                    <p>
                    <br />
                    </p>
                    
                    <p>
                    You can take this opportunity to click on each of the Report tabs to view the 
                    information provided there.
                    Be sure to return to the main page ("Design:") before clicking "Next" to continue.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 20",
            text: (
                <React.Fragment>
                    <p>
                    The Result section is positioned below this text, near the top of the main page.
                    This area provides feedback about the solution process.   
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/ResultSection.png" alt="Result Section"/>
                    
                    <p>
                    <br />
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 08 of 20",
            text: (
                <React.Fragment>
                    <p>
                    If you hover the cursor over a heading or a variable name, 
                    a tool-tip will pop up to provide more information regarding each item.   
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/ResultSectionToolTip.png" alt="Result Section ToolTip"/>
                    
                    <p>
                    <br />
                    </p>
                    
                    
                    <p>
                    You can take this opportunity to survey the remainder of the tool-tips on the main page.
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 09 of 20",
            text: (
                <React.Fragment>
                    <p>
                    There are numeric entry fields for each of the variables.
                    The user can change the value of Independent Variables by positioning
                    the cursor in the field and over-writing the existing value.
                    Recalculation will happen immediately.
                    The Dependent Variables, constraint violations and Objective Value will immediately
                    reflect the result of the new value for that Independent Variable.   
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/IndependentSpring.png" alt="Independent Variable Entry Fields"/>
                    
                    <p>
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 10 of 20",
            text: (
                <React.Fragment>
                    <p>
                    In order change the value of a Dependent Variable, it is necessary
                    to FIX its value (more about FIX coming soon) and then execute the Search feature 
                    (<b>Action : Search</b> menu).   
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/DependentSpring.png" alt="Dependent Variable Entry Fields"/>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 11 of 20",
            text: (
                <React.Fragment>
                    <p>
                    Calculation Inputs are quantities that can be modified by the user
                    but are not subject to constraints, FIX or manipulation by the Search process. 
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/CalcInputSpring.png" alt="Calculation Input Entry Fields"/>
                    
                    <p>
                    <br />
                    You will likely need to scroll down to see the section of the main page containing
                    Calculation Inputs.
                    Scroll back up and click "Next" when ready to continue.
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 12 of 20",
            text: (
                <React.Fragment>
                    <p>
                    This clip illustrates how a Calculation Input with a drop-down arrow 
                    can expand into a table that the user can select from.
                    In this case, the user selects a material and the appropriate 
                    material property values are provided to the calculations. 
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/CalcInputTableSpring.png" alt="Calculation Input Selection Table"/>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 13 of 20",
            text: (
                <React.Fragment>
                    <p>
                    Constraints are single sided (Max or Min) limits imposed on the 
                    selected Variable. 
                    First, mark the constraint checkbox and then enter a value in the entry field.
                    The amount of constraint violation will be recalculated immediately;
                    a positive value if violated or a negative value if satisfied.
                    The Objective Value will reflect the aggregate impact of all violated constraints.
                    This example illustrates a few of the constraints provided with 
                    the default design named "startup".
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/ConstraintSpring.png" alt="Constraints"/>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 14 of 20",
            text: (
                <React.Fragment>
                    <p>
                    In order to FIX the value of an Independent Variable, put a check
                    in the box immediately to the right of its value.
                    Note the checkboxes highlighted by the red oval in  this example.   
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/IV_FixSpring.png" alt="Fix an Independent Variable"/>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 15 of 20",
            text: (
                <React.Fragment>
                    <p>
                    In order to FIX the value of a Dependent Variable, put a check 
                    in the box immediately to the right of its value.
                    This will cause both associated constraints to be checked and the 
                    corresponding constraint entry fields to become available for input.
                    Enter the FIX value into either entry field.
                    Thus, the FIX of a Dependent Variable is effectively a double-sided constraint.   
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/DV_FixSpring.png" alt="Fix a Dependent Variable"/>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 15 of 20",
            text: (
                <React.Fragment>
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
                </React.Fragment>
            )
        },
        {
            title: "Page 16 of 20",
            text: (
                <React.Fragment>
                    <p>
                    The quick tour of the main page is now complete.
                    This is a good time good to get a better look at what is available 
                    in the on-line documentation. 
                    Most of the entries that are available after selecting the Help : Index menu item
                    cover the generic features and capabilities of the ODOP software.
                    So, as you are reading, please click the Help menu above.
                    It will drop down to provide a list of entries (topics) to choose from.
                    Selecting <b>Index</b> on this list will bring up a new browser tab with the
                    list of available Help entries. 
                    You can switch back and forth between the browser tabs.
                    </p>
                    
                    <p>
                    On-line documentation specific to ODOP:Spring appears in the Spring Design topic.
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/HelpIndex.png" alt="Help Index"/>
                    
                    <p>
                    <br />
                    After completing this tutorial session, if time is available, read through those entries from top to bottom.
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 17 of 20",
            text: (
                <React.Fragment>
                    <p>
                    Spring design demonstration sessions illustrate problem solving techniques as well as provide
                    sample solutions to several generally available reference book problems.
                    Use the <b>Help : Demo...</b> menu item to select the desired demo session.   
                    </p>
                    
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/HelpDemo.png" alt="Help Demo"/>
                    <br />
                    <img src="https://raw.githubusercontent.com/thegrumpys/odop/master/docs/Help/png/SelectSpringDemo.png" alt="Select Spring Demo"/>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 18 of 20",
            text: (
                <React.Fragment>
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
                </React.Fragment>
            )
        },
        {
            title: "Page 19 of 20",
            text: (
                <React.Fragment>
                <img src="designtypes/Spring/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </React.Fragment>
            )
        },
        {
            title: "Page 20 of 20 (last page)",
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
                    
                    <p>
                    More tutorial sessions are available. 
                    They have names like tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the 
                    tutorial for a list of the Tutorial and Demo topics.
                    </p>
                    
                    <p>If you do not wish to continue with more tutorial sessions or demonstration problems, 
                    you can experiment with the various ODOP features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                </React.Fragment>
            )
        }
    ]
}
