import React from 'react';
import { changeSymbolValue, fixSymbolValue, search } from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    Welcome to the "Guided Design" tutorial session
                    for the <b>compression spring</b> design type.
                    This session is appropriate for a situation where you are creating a 
                    design from the original problem specification as opposed to validating
                    an existing or hypothesized design.
                    </p>
                    
                    <p>
                    This session is different than other tutorial and demo sessions in that it 
                    provides only high-level textual guidance for a spring design workflow and 
                    does not actually execute any design changes. 
                    The intent is that you will supply the numbers and menu selections;
                    this tutorial will supply step-by-step instructions and explanations to
                    guide you through the design process
                    </p>
                    
                    <p>
                    Where the other tutorial and demo sessions will start by imposing a known
                    starting design (called initialState), 
                    this session will allow the existing design to remain in place.
                    It will be helpful if this design is a valid and consistent spring so as to 
                    provide a reasonable starting point for the search process. 
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
                    
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    you should understand that this tutorial session is "live" and not
                    a simple playback of a previous recording.  
                    The ODOP main page has simply been displaced downward by the text in this  
                    light green section.
                    All the menus and other inputs to the program remain available and active.
                    With a bit of coaching provided by this tutorial session, 
                    you are expected to enter values and execute menu selections appropriate to the
                    design problem at hand.
                    </p>
                    
                    <p>
                    The next screen will display a diagram illustrating the major steps that this session 
                    will guide you through.
                    After reviewing the diagram, use the "Next" button to continue.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 03 of 16",
            text: (
                <React.Fragment>
                <img src="designtypes/Spring/Compression/SpringDesignWorkflowDiagram.png" alt="Spring Design Workflow Diagram"/>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 16",
            text: (
                <React.Fragment>
                    <p>
                    This is the time to express your objectives (goals, requirements) for the design at hand 
                    in terms of constraints (Min & Max) and FIXes.
                    Fill in the values and checkboxes now.
                    </p>
                    
                    <p>
                    For now, leave wire diameter (Wire_Dia) free.  
                    This will allow the search process to manipulate wire diameter as necessary to achieve those goals.
                    Selecting an available wire size happens later in the session.
                    </p>
                    
                    <p>
                    Use the "Next" button to proceed after your inputs are complete.
                    Note that it will be possible to use the "Back" button to return to the beginning of any step  
                    if any corrections or additional inputs are desired later.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 16",
            text: (
                <React.Fragment>
                    <p>
                    The preceding changes have likely caused the violation of one or more constraints.
                    If so, the current design is considered to be "infeasible" or "NOT FEASIBLE".
                    The <b>Search</b> feature will adjust values of the Independent Variables in an 
                    attempt to find a design that does not violate constraints.
                    </p>
                    
                    <p>
                    Invoke the <b>Search</b> feature now.  Use the <b>Action : Search</b> menu above.
                    </p>
                    
                    <p>
                    Use the "Next" button to continue.
                    </p>
                    
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of 16",
            text: (
                <React.Fragment>
                    <p>
                    If the "Feasibility:" result of the search is "NOT FEASIBLE", then it will likely be necessary 
                    to accept compromise and adjust the goals for the design. 
                    This can be done manually.
                    Also, the on-line Help provides a description of the <b>Trade</b> feature and instruction on its use.
                    Trade can be used to gain a better understanding of exactly how much constraint levels need to be adjusted 
                    in order to find the "nearest" feasible design.
                    </p>
                    
                    <p>
                    If the "Feasibility:" result of the search is "FEASIBLE" or "MARGINALLY FEASIBLE", 
                    then the <b>Seek</b> feature may be able to provide an optimized result. 
                    </p>
                    
                    <p>
                    This is a good time to take a close look at existing values.
                    You may need to scroll down to see everything.
                    The Report tabs (upper right) offer additional information in a spring design specific format.
                    </p>
                    
                    <p>
                    Use the "Next" button to proceed.
                    </p>
                    
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 16",
            text: (
                <React.Fragment>
                    <p>
                    Invoke the <b>Seek</b> feature now.  Use the <b>Action : Seek...</b> menu above.
                    </p>
                    
                    <p>
                    While it is possible to seek the constrained extreme of any independent or dependent variable 
                    that is not in FIXed status, for compression springs, the most likely candidates are: 
                    min Weight, max Cycle_Life, min OD_Free or min L_Solid (solid height).
                    </p>
                    
                    <p>
                    When examining the results of <b>Seek</b>, you may notice that multiple constraints are
                    violated by a small amount.  
                    The design will be classified as "MARGINALLY FEASIBLE" or even "NOT FEASIBLE".
                    This is normal.
                    The solution algorithm is finding a balance between the rewards and penalties of 
                    violating those constraints
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 08 of 16",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            )
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
                    exceed the 98 per cent maximum on %_Avail_Deflect.
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
                    Indeed, the design now utilizes less than 98 percent of its available deflection.
                    Also, Wire_Dia has remained at 0.110 inches 
                    and Force_2 at 40 pounds as specified. 
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
                    The tutorial has imposed: FIX L_Stroke 1.725
                    </p>
                    
                    <p>
                    The FIX is implemented as a weighted double-sided constraint.
                    </p>
                    
                    <p>
                    Again, a Search will be required to establish values for the free Independent Variables
                    such that the FIXed value of L_Stroke is established while simultaneously keeping %_Avail_Deflect 
                    below the 98 percent maximum.
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
                    
                    <p>
                    More compression spring tutorial sessions are available. 
                    They have names like tutorTour, tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the 
                    tutorial for a list of the Tutorial and Demo topics.
                    </p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                </React.Fragment>
            )
        }
    ]
}
