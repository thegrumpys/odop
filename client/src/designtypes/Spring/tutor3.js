import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, search } from '../../store/actionCreators';
import { MAX, CONSTRAINED } from '../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    In this tutorial session we will continue to develop the idea of
                    using "constraints" and "constraint levels" to express goals
                    for a design. 
                    Once we have established a set of goals or objectives that
                    a given design is to achieve, we can use the Search capability 
                    to find a design that will (hopefully) achieve those objectives.
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
            title: "Page 02 of 13",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this demo session are now established.<br />
                    <br />
                    It's time to take a look at the set of constraint levels. 
                    Note that the default set of constraint levels are set to allow a broad range
                    of springs to be feasible.<br />
                    <br />
                    Each constraint has a corresponding constraint violation that represents
                    the difference between the current value of the quantity being
                    constrained and the constraint level.  The "Violation"
                    column lists constraint violation as a percentage of the
                    corresponding constraint level.  A negative value implies that the
                    constraint is satisfied.  A positive value implies that the
                    constraint is violated. 
                    </p>
                    
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring')
            ]
        },
        {
            title: "Page 03 of 13",
            text: (
                <React.Fragment>
                    <p>
                    The value of the "Objective Function" is the thing that the search procedure
                    uses to measure how close a given design is to being feasible.
                    It is formed by adding a contribution from all the violated constraints.
                    Thus, as in this case, if all the constraints are satisfied, the
                    objective function is zero and we have a feasible design.<br />
                    <br />
                    Let's find out what a violated constraint looks like.<br />
                    <br />
                    Take a look at the current values of outside diameter in the free condition and
                    its associated constraint.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 13",
            text: (
                <React.Fragment>
                    <p>
                    The tutorial has changed a constraint: CHANGE  OD_Free MAX 0.9<br />
                    <br />
                    Take a look at the results.
                    </p>
                    
                    <p>
                    It should be pretty hard to miss the violation of OD_FREE MAX.
                    Also, the objective function value is greater than zero. 
                    This is a good clue that there is work for the search procedure to do.<br />
                    <br />
                    Shall we see if Search can find a design with a smaller (less than
                    0.9 inch OD) spring that can still support the designated load ?
                    </p>
                    
                    <p>You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.</p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 0.9)
            ]
        },
        {
            title: "Page 06 of 13",
            text: (
                <React.Fragment>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (<b>Action : Search</b> menu) for a solution.
                    Specifically, Search will find values of the free Independent Variables
                    that cause the newly established Constraint to be satisfied.
                    </p>

                    <p>
                    &nbsp;
                    <br />
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 13",
            text: (
                <React.Fragment>
                    <p>
                    OK, let's take a look at the results.
                    Yes,  A feasible solution is available. Please take a moment to scroll through and view the values.
                    Note that the OD in the free condition is far enough below .9 inches to guarantee that the OD in
                    the solid condition is also below .9 inches.
                    Look at the constraint violations to see how Search
                    really did its job and left no remaining constraint violations.
                    </p>
                    <p>
                    This can be seen more readily in Report&nbsp;1&nbsp;(mini). 
                    Simply select (click on) that tab to view the report.
                    The message: 
                    "<b>Coil to coil contact may cause inaccuracy in point 2.</b>" 
                    is produced any time that the second load uses more
                    than 80 % of available deflection.
                    </p>
                    <p>There is no warning about buckling so that is not a concern for this design.</p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 05 of 13",
            text: (
                <React.Fragment>
                    <p>
                    If you are still on the Report tab,
                    don't forget to switch back to the tab containing the main page ("Design:").
                    </p>
                    
                    <p>
                    Now that we have covered the concept of constraints, we can describe
                    the use of FIX on a state variable in more precise terms.  The FIX
                    of a state variable is the creation of a two sided constraint that
                    is more heavily weighted than a normal constraint.  Thus when we
                    used FIX to establish a specific deflection in the earlier section
                    of the tutorial, we were actually using the search to solve a two
                    sided constraint problem.
                    </p>

                    <p>
                    Once that you've made it this far through the tutorial, you know
                    enough to be really dangerous.  Most spring design can be accomplished
                    with the commands that have been covered already.  Let's run through
                    one quick example that combines a few FIXes and a few modified
                    constraint levels, then turn you loose for some more practice.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 08 of 13",
            text: (
                <React.Fragment>
                    <p>
                    For our sample problem let's suppose that we want to design a spring
                    to support a load of 280 pounds at a deflection of 5.5 inches. 
                    The spring must operate in a 2.0 inch hole and must not set if compressed
                    to solid.  Considering that we haven't yet covered changing material
                    and end types, we'll use the currently established MUSIC_WIRE and
                    CLOSED&GROUND ends.
                    </p>
                    
                    <p>
                    In tutorial "shorthand" notation, the tutorial has entered:<br />
                    <br />
                    FIX  Force_2   280<br />
                    FIX  Deflect_2   5.5<br />
                    CHANGE  OD_Free MAX  2.0<br />
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Force_2', 280.0),
                fixSymbolValue('Deflect_2', 5.5),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 2.0)
            ]
        },
        {
            title: "Page 09 of 13",
            text: (
                <React.Fragment>
                    <p>
                    Now that there has been a slight change in wire diameter, another search
                    will be required to make corresponding adjustments in the other parameters.
                    For this problem, only the number of coils remains to be determined.
                    </p>
                    
                    <p>
                    Look for the results on the next page.
                    <br /><br />
                    </p>
                    
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.120)
            ]
        },
        {
            title: "Page 10 of 13",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini). 
                    Simply select (click on) that tab to view the report.
                    </p>
                    
                    <p>
                    Note that this design is very close to delivering 1.75 inches
                    compressed height at 60 pounds force.
                    <br /><br />
                    </p>
                    
                    <p>
                    Next we'll make a detailed comparison with the handbook results.
                    Click Next to see the handbook inputs entered into the appropriate ODOP:Spring variables.
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 11 of 13",
            text: (
                <React.Fragment>
                    <p>
                    If you are still on a Report tab,
                    don't forget to switch back to the tab containing the main page ("Design:").
                    </p>
                    
                    <p>
                    The demo session has now imposed the values:<br />
                    <br />
                    CHANGE  Wire_Dia  .1205<br />
                    CHANGE  Coils_T  13
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Wire_Dia",0.1205),
                changeSymbolValue("Coils_T", 13),
            ]
        },
        {
            title: "Page 12 of 13",
            text: (
                <React.Fragment>
                    <p>
                    The handbook results:<br />
                    &nbsp; &nbsp;  solid height = 1.57 in.<br />
                    &nbsp; &nbsp;  stress correction factor = 1.21 &nbsp; (see Report 2)<br />
                    &nbsp; &nbsp;  stress at solid      = 104000  psi  (corrected)<br />
                    &nbsp; &nbsp;  stress at 60 lb load =  92900  psi  (corrected)<br />
                    &nbsp; &nbsp;  spring index = 7.3
                    </p>
                    
                    <p>
                    The results are in very good agreement.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 13 of 13 (last page)",
            text: (
                <React.Fragment>
                    <p>Several more demo problems are available. 
                    They are named DEMO1, DEMO2, ... etc. 
                    Refer to the documentation section (on-line Help entry) covering the Tutorial 
                    for a list of the Tutorial and DEMO topics.</p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP:Spring features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                    <br />
                </React.Fragment>
            )
        }
    ]
}
