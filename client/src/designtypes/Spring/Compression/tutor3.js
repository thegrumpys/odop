import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../store/actionCreators';
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
                    for the ODOP <b>Compression Spring</b> design type.
                    </p>
                    
                    <p>
                    To continue with this session, just click the "Next" button as you finish
                    reading each page (step). 
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 15",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    </p>
                    
                    <p>
                    It's time to take a look at the set of constraint levels. 
                    Note that the default set of constraint levels imposed in the initialState 
                    are set to allow a broad range of springs to be feasible.
                    More information about the constraints of spring design is provided in the
                    on-line documentation section (Help entry) titled Spring Design Overview.
                    </p>
                    
                    <p>
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
                loadInitialState('Spring'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 15",
            text: (
                <React.Fragment>
                    <p>
                    The "Objective Value" is the thing that the search procedure
                    uses to measure how close a given design is to being feasible.
                    It is formed by adding a contribution from all the violated constraints.
                    Thus, as in this case, if all the constraints are satisfied, the
                    objective value is zero and we have a feasible design.<br />
                    <br />
                    Let's find out what a violated constraint looks like.<br />
                    <br />
                    Take a look at the current values of outside diameter in the free condition and
                    its associated constraint.
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 15",
            text: (
                <React.Fragment>
                    <p>
                    The tutorial has changed a constraint: CHANGE  OD_Free MAX 0.9<br />
                    <br />
                    Take a look at the results.
                    </p>
                    
                    <p>
                    It should be pretty hard to miss the violation of OD_FREE MAX.
                    Also, the Objective Value is greater than zero. 
                    This is a good clue that there is work for the search procedure to do.<br />
                    <br />
                    Shall we see if Search can find a design with a smaller (less than
                    0.9 inch OD) spring that can still support the designated load ?
                    Note that the tutorial has also put Force_2 in FIXed status so that 
                    designated load will not be changed by the search process.
                    </p>
                    
                    <p>You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.</p>
                </React.Fragment>
            ),
            actions: [
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 0.9),
                fixSymbolValue('Force_2')
            ]
        },
        {
            title: "Page 05 of 15",
            text: (
                <React.Fragment>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (<b>Action : Search</b> menu) for a solution.
                    Specifically, Search will find values of the free Independent Variables
                    that cause the newly established Constraint to be satisfied.
                    </p>

                    <p>
                    The search will take place during the transition to the Next page.
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of 15",
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
            title: "Page 07 of 15",
            text: (
                <React.Fragment>
                    <p>
                    If you are still on the Report tab,
                    don't forget to switch back to the tab containing the main page ("Design:").
                    </p>
                    
                    <p>
                    Now that we have covered the concept of constraints, we can describe
                    the use of FIX on a state variable in more precise terms.  The FIX
                    of a Dependent Variable is the creation of a two sided constraint that
                    is more heavily weighted than a normal constraint.  Thus when we
                    used FIX to establish a specific deflection in the earlier section
                    of the tutorial, we were actually using the search to solve a two
                    sided constraint problem.
                    </p>

                    <p>
                    Once that you've made it this far through the tutorial, you know
                    enough to be really dangerous.  Most spring design can be accomplished
                    with the capabilities that have been covered already.  Let's run through
                    one quick example that combines a few FIXes and a few modified
                    constraint levels, then turn you loose for some more practice.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 08 of 15",
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
            title: "Page 09 of 15",
            text: (
                <React.Fragment>
                    <p>
                    Note the warning message on Report 1.
                    </p>
                    <p>
                    While it normally doesn't make much difference where we start a search,
                    applying a 280 pound load to a spring that was designed to support a
                    40 pound load will (mathematically) drive that spring far below its
                    solid condition.  The search process will generally cope with such a
                    poor starting point, but in some cases, you may wish to save a bit of
                    time by entering  values that are a little closer to the final solution.
                    </p>
                    
                    <p>
                    OK, the tutorial will let Search do its thing. 
                    Look for the results on the next page.
                    <br /><br />
                    </p>
                    
                </React.Fragment>
            )
        },
        {
            title: "Page 10 of 15",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini). 
                    Simply select (click on) that tab to view the report.
                    </p>
                    
                    <p>
                    So far so good,  OD is less than 2.0.
                    Yes, deflection is close to 5.5 inches.
                    </p>
                    
                    <p>
                    Looks fine here. It is time to move on.
                    </p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 11 of 15",
            text: (
                <React.Fragment>
                    <p>
                    If you are still on a Report tab,
                    don't forget to switch back to the tab containing the main page ("Design:").
                    </p>
                    
                    <p>
                    Before we take a break, let's try just one more design.<br />
                    <br />
                    To get started, the tutorial has already reset everything to the wide open 
                    conditions in the initialState starting point.
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.)
            ]
        },
        {
            title: "Page 12 of 15",
            text: (
                <React.Fragment>
                    <p>
                    This time, let's see if we can handle a design that has both force and
                    length specified at each of two points.
                    </p>
                    
                    <p>
                    Suppose we want a spring that delivers 15 pounds force at a length
                    of 2 inches, and 65 pounds force at a length of 1.25 inches.
                    </p>
                    
                    <p>
                    Again, the tutorial has already imposed the changes ...<br />
                    FIX  Force_1  15<br />
                    FIX  L_1       2<br />
                    FIX  Force_2  65<br />
                    FIX  L_2    1.25<br />
                    </p>
                    
                    <p>
                    Search will do its thing during the transition to the Next page.
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Force_1', 15.),
                fixSymbolValue('L_1', 2.),
                fixSymbolValue('Force_2', 65.),
                fixSymbolValue('L_2', 1.25)
            ]
        },
        {
            title: "Page 13 of 15",
            text: (
                <React.Fragment>
                    <p>
                    Now for a look at the results ...
                    One would expect a bit more wire diameter to support that extra load.
                    </p>
                    
                    <p>
                    The lengths are essentially as requested.  This design is satisfactory.
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 14 of 15",
            text: (
                <React.Fragment>
                    <p>
                    This section of the tutorial has covered a lot of important ground.
                    We have seen how constraints can express one sided goals for the
                    design.  By manipulating the constraint levels 
                    and establishing target values for the Dependent Variables with FIX,
                    we set up a design problem to solve with Search.
                    By selecting different combinations of constraints and FIXes, we can express
                    a great variety of different spring design problems.  Take a few minutes
                    before starting the next section of the tutorial to try a few.
                    </p>
                    
                    <p>
                    The next section of the tutorial will cover the techniques necessary
                    to Save or print the information about a design. 
                    Once saved, this information can be picked up for further work in a later session.
                    
                    After that, another section of the tutorial will introduce the
                    techniques for selecting spring wire materials (with their associated
                    allowable stresses) and selecting spring end types.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 15 of 15 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    More tutorial and demo problems are available. 
                    They are named: tutor4, tutor5, demo1, demo2, ... etc. 
                    Refer to the documentation section (on-line Help entry) covering the Tutorial 
                    for a list of the Tutorial and Demo topics.</p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP:Spring features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                    <br />
                </React.Fragment>
            )
        }
    ]
}
