import React from 'react';
import { Image } from 'react-bootstrap';
import { changeSymbolValue, fixSymbolValue, loadInitialState, search } from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    Welcome to the first ODOP tutorial session.
                    This session will provide an introduction to basic ODOP features and concepts
                    in the context of the <b>Rectangular Solid</b> design type.
                    </p>
                    
                    <p>
                    If you are here simply as a "tourist" and are only interested in picking up a "flavor" 
                    for ODOP:Spring as opposed to learning the underlying
                    concepts and major features provided by the ODOP software, 
                    you may want to skip forward to the spring design sample problems. 
                    You may do this by canceling this session and selecting one of the spring 
                    design Demo sessions available from the <b>Help : Demo...</b> menu
                    when a Spring design type is loaded.
                    You can use your web browser's refresh button to restart with the desired
                    spring design type.
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP <b>Rectangular Solid</b> design type.
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
                    ODOP contains an On-line Help facility.
                    It includes an overview of the program, a <b>Getting Started</b> section plus
                    helpful hints and detailed explanations of major features.  
                    But first, a few words about what <b>not</b> to expect.
                    The on-line help facility is not intended to replace the documentation that comes 
                    with your browser or computer system. 
                    Also, the Help facility is not intended to teach the fundamentals of an application 
                    like rectangular boxes or spring design. 
                    Rather, the Help facility will show someone that already understands the basics of
                    strength of materials and the basics of spring design how to operate the program 
                    to create new designs.
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Solid')
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
                    <b>Getting Started</b>  provides a tour of the main page plus makes 
                    a few suggestions on how new users should approach learning the program.<br />
                    </p>
                </>
            )
        },
        {
            title: "Page 04 of 16",
            text: (
                <>
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
                    We'll work with the Rectangular Solid (simple box) design type that 
                    is illustrated on the next page.
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 06 of 16",
            text: (
                <>
                   <Image fluid src="/docs/Help/DesignTypes/img/RectangularSolidDiagram.png" alt="Rectangular Solid diagram"/>
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
                    Pay special attention to the 70 pound maximum constraint on Weight 
                    and the 108 inch maximum on Length+Girth.
                    These are limits that the US Postal Service and many other participants 
                    in the package shipping industry impose on items that they will accept.
                    </p>
                    
                    <p>
                    In the process of moving to the next page, the tutorial will impose a new value 
                    for an input (Independent Variable) ... the Length dimension of our rectangular solid. 
                    Take note of the current value of Volume or Weight so that you can see the 
                    impact of the change.
                    </p>
                    
                    <p>
                    When you click on Next, the tutorial will impose a value of 20 inches on Length.
                    </p>
                </>
            )
        },
        {
            title: "Page 08 of 16",
            text: (
                <>
                    <p>
                    The tutorial has now entered a value of 20 inches for Length. 
                    In the shorthand summary that will be used in the remaining tutorial 
                    and demo sessions, the action was:
                    </p>
                    
                    <p>
                    CHANGE  Length  20.0<br />
                    </p>
                    
                    <p>
                    Notice how the outputs (Dependent Variables) have immediately updated to reflect
                    the change.
                    The remaining Independent Variable values remain as established by the initialState
                    that was imposed at the start of this session. 
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Length",20)
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
                    For the rectangular solid, that is things like Volume, Weight, etc.
                    For a spring, we will be speaking in terms of spring Rate, stresses, 
                    factor of safety, cycle life, etc.
                    </p>
                    
                    <p>
                    Ready for another example ?
                    </p>
                    
                    <p>
                    When you click on Next, the tutorial will impose a value of 12 inches on Height.<br />
                    <br />
                    CHANGE Height 12
                    </p>
                </>
            )
        },
        {
            title: "Page 10 of 16",
            text: (
                <>
                    <p>
                    Well, that brought a little color into the ODOP world !
                    </p>
                    
                    <p>
                    The design now exceeds the 70 pound constraint on Weight.
                    Since a constraint is violated, this design is considered to be
                    "Not Feasible".
                    A Search (<b>Action : Search</b> menu) will be required to
                    find values of free (not FIXed) Independent Variables such that 
                    constraints are not violated.
                    </p>
                    
                    <p>
                    Before we get into Search, let's suppose that we really don't 
                    want the Search process to change the 20 inch value for Length that 
                    we established earlier.
                    When you click Next, the tutorial will check the checkbox 
                    (positioned between the Value entry field and the Units field) 
                    to put Length into FIXed status.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Height",12)
            ]
        },
        {
            title: "Page 11 of 16",
            text: (
                <>
                    <p>
                    Now, the FIX checkbox for Length is checked.
                    </p>
                    
                    <p>
                    By having Length in FIXed status, the search will be able to adjust
                    only the values of Width and Height to find a design that does not 
                    exceed the 70 pound maximum weight.
                    Of course, the entire collection of Dependent Variables will respond 
                    to any changes in the Independent Variables.
                    </p>
                    <br /><br />
                </>
            ),
            actions: [
                fixSymbolValue('Length')
            ]
        },
        {
            title: "Page 12 of 16",
            text: (
                <>
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
                </>
            ),
        },
        {
            title: "Page 13 of 16",
            text: (
                <>
                    <p>We have a solution. Please take a moment to scroll through and view the values.</p>
                    
                    <p>
                    Indeed, the design now weighs less than 70 pounds.
                    Also, Length has remained at 20 inches as specified. 
                    </p>
                    
                    <p>
                    Finally, to wrap up this session,
                    the next page will demonstrate how it is possible to specify
                    the value of Girth, a Dependent Variable
                    (output from the design equations).
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
                    The tutorial has imposed:<br /><br />
                    FIX Girth 35.0
                    </p>
                    
                    <p>
                    The FIX is implemented as a weighted double-sided constraint.
                    </p>
                    
                    <p>
                    Again, a Search will be required to establish values for the free Independent Variables
                    such that the FIXed value of Girth is established while simultaneously keeping Weight 
                    below the 70 pound maximum.
                    </p>
                    
                    <p>
                    Look for the results on the next page.
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('Girth', 35)
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
                    
                    <p>Several more tutorial sessions are available for the compression spring
                    design type. 
                    They have names like tutor1, tutor2, ... etc. 
                    Refer to the documentation section (On-line Help entry) covering the tutorial 
                    for a list of the Tutorial and DEMO topics.</p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                </>
            )
        }
    ]
}
