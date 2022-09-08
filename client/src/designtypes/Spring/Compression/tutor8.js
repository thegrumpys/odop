import React from 'react';
import { fixSymbolValue, changeSymbolConstraint, loadInitialState, setSymbolFlag, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    </p>
                    
                    <p>
                    This tutorial section provides content on the ODOP Trade feature.
                    Background information is available in the on-line documentation section (Help entry) on 
                    &nbsp;<a href="/docs/Help/trade.html" target="_blank" rel="noopener noreferrer">Trade</a>.&nbsp; 
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP Compression Spring design type using U.S. customary units.
                    </p>
                    
                    <p>
                    To continue with this session, just <b>click the "Next" button</b> as you finish
                    reading each page (step). 
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 02 of 08",
            text: (
                <>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    To demonstrate the use of Trade, it will be necessary to find a
                    problem that does not have a feasible solution.  
                    Back in the tutorial section tutor4 where the <b>File : Save</b> and <b>File : Open</b> menu items were covered,
                    we invented a problem that did not initially have a feasible solution.
                    Let's look at that one again.  It went something like:
                    <br /><br />
                    Suppose we want a spring that will fit in a 2.00 inch diameter hole,
                    that can be no more than 1.20 inches deep 
                    (i.e. the spring's solid height must be less than this value).  
                    The spring must support 250 pounds and sustain at least
                    1.0 inch of deflection from no load to full load.
                    <br /><br />
                    We add the requirement of a moderate cycle life.
                    </p>
                    
                    <p>
                    The tutorial will impose these requirements in the process of moving to the next page.
                   </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 08",
            text: (
                <>
                    <p>
                    </p>
                    
                    <p>
                    In "Tutorial shorthand", the changes just imposed by the tutorial are:<br />
                    <br />
                        CHANGE  Cycle_Life MIN  50000<br />
                        CHANGE  OD_Free MAX  2.0<br />
                        CHANGE  L_Solid MAX  1.2<br />
                        CHANGE  L_Stroke MIN 1.0<br />
                        FIX  Force_1  0<br />
                        FIX  Force_2  250<br />
                    </p>
                    
                    <p>
                    So now, we're set up to consider designs that will have a somewhat longer cycle life.
                    </p>

                    <p>
                    The 250 pound load has given us an unreasonable start point. 
                    Look at the alerts.
                    In this case, we'll ignore the warnings and continue with a search.
                    </p>
                    
                    <p>
                    </p>

                    <p>
                    Moving to the next page will execute a search to determine if a feasible solution is available.
                    </p>
                    <br />
                </>
            ),
            actions: [
                setSymbolFlag('Cycle_Life', MIN, CONSTRAINED),
                changeSymbolConstraint('Cycle_Life', MIN, 50000.0),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 2.0),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.2),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint('L_Stroke', MIN, 1.0),
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 250.0)
            ]
        },
        {
            title: "Page 04 of 08",
            text: (
                <>
                    <p>
                    The search couldn't find a design that satisfied all of our objectives
                    so it did its best and found a compromise.
                    </p>
                    
                    <p>
                    You can see from the entries in red that multiple constraints are violated.  
                    The relative magnitude of those violations contains information as to 
                    which constraints are most leveraged.  
                    The search finds that it is to its advantage to violate
                    some constraints more than others.
                    </p>
                    
                    <p>
                    This design obviously needs some work.
                    </p>
                    
                    <p>
                    In the rest of this tutorial section we will use <b>Action : Trade </b> 
                    to look at how the constraints on stroke, outside diameter, cycle life 
                    and solid height trade off against each other.
                    </p>
                    <br />
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 05 of 08",
            text: (
                <>
                    <p>
                    Trade will ask for "weights" to apply to each of the violated constraints.  
                    These weights define the direction that Trade will move in for constraint relaxation.  
                    Only the relative size of the weights matters.  
                    The individual components are not expected to add to 100%.
                    Trade will normalize the inputs to unit value.
                    </p>
                    
                    <p>
                    Trade needs the user to enter an exploration size. 
                    A default value is provided. 
                    The accuracy of this value is not critical. 
                    If the number entered is too large, Trade
                    will find a feasible solution, report the results and offer the
                    opportunity to start again with a smaller step.  If the estimate is too
                    small, a second or even third pass through the Trade process may be
                    taken to refine the result.  An appropriate exploration size
                    can be gauged by looking at the magnitude of the constraint violations.
                    The exploration size in percent should be larger than the largest
                    percentage constraint violation, perhaps even larger than the sum of
                    all the constraint violations.
                    </p>
                    
                    <p>
                    The tutorial is not yet ready to directly control the Trade feature.
                    You will need to take a more active role.
                    </p>
                    
                    <p>
                    Drop down the Action menu and select <b>Trade. </b>
                    Select the <b>Arbitrary</b> strategy (green button).
                    </p>
                    
                    <p>
                    Enter <b>0.0</b> for the weight on each violated constraint except <b>L_Stroke </b> 
                    which should be set to <b>1.0</b>. 
                    Select <b>Continue</b>.
                    </p>
                    
                    <p>
                    Accept the default step size and 
                    select <b>Continue</b>. 
                    It may take several seconds to compute the result. 
                    </p>
                    
                    <p>
                    Observe that Trade predicts a feasible solution if the L_Stroke MIN constraint 
                    is moved from 1.0 inches to something slightly less than 0.8 inches. 
                    </p>
                    
                    <p>
                    In the interest of keeping this session short and on track, 
                    we will skip the opportunity to refine the result. 
                    Select <b>Done</b>.  
                    This will exit Trade with no changes. 
                    Use the <b>Next</b> button to continue to next page of this tutorial session.
                    </p>
                </>
            ),
            actions: [
            ]
        },
        {
            title: "Page 06 of 08",
            text: (
                <>
                    <p>
                    Ready for another shot at it ?   This time we'll work with OD_FREE MAX.
                    </p>
                    
                    <p>
                    For another change of pace, we'll run a second pass through
                    Trade to refine the result a bit more.
                    </p>
                
                    <p>
                    &nbsp; 
                    <br /><br /><br />
                    </p>
                
                    <p>
                    &nbsp; 
                    <br /><br />
                    </p>
                    
                    <p>
                    Drop down the Action menu and select <b>Trade. </b>
                    Select the <b>Arbitrary</b> strategy (green button).
                    </p>
                    
                    <p>
                    Enter <b>0.0</b> for the weight on each violated constraint except <b>OD_Free </b> 
                    which should be set to <b>1.0</b>. 
                    Select <b>Continue</b>.
                    </p>
                    
                    <p>
                    Again, accept the default step size and 
                    select <b>Continue</b>. 
                    As noted previously, it may take a few seconds for Trade to compute its results.
                    </p>
                
                    <p>
                    The magnitude of the values remaining in the Violation column suggest that 
                    we should be able get a better answer by repeating the Trade algorithm. 
                    <b> Accept</b> the resulting set of constraints. 
                    <b> Repeat</b> the process with the same <b>Arbitrary</b> direction, 
                    the same weights and the new default step size.
                    </p>
                    
                    <p>
                    Observe that Trade predicts a feasible solution if the OD_Free MAX constraint 
                    is moved from the previous value of 2.0 inches 
                    to a new value of approximately 2.6 inches. 
                    </p>
                    
                    <p>
                    <b>Accept</b> the result.
                    Enter <b>Done</b> and review the results.  
                    Use <b>Next</b> to continue to the next page of this tutorial session.
                    </p>
                </>
            )
        },
        {
            title: "Page 07 of 08",
            text: (
                <>
                    <p>
                    <p>
                    Based on the Objective Value, it appears that moving the constraint from
                    its original value of 2.0 inches to a new value of approximately 2.6 inches 
                    produces a result that is is right at the edge of feasibility.
                    </p>
                    
                    Of course it is possible to combine any or all of these approaches.
                    Trade will be happy to calculate how far it is necessary to move
                    if multiple constraints are to be adjusted concurrently ... 
                    just give more than one non-zero entry
                    when defining the weights at the beginning of Trade's process.
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    <br /><br />
                    </p>
                </>
            ),
            actions: [
            ]
        },
        {
            title: "Page 08 of 08 (last page)",
            text: (
                <>
                    <p>
                    Congratulations, you've finished another section of the tutorial.
                    Take a few minutes at this point to experiment on your own. 
                    </p>
                    
                    <p>
                    Also, be sure to look in the on-line documentation section (Help entry) titled  
                    &nbsp;<a href="/docs/Help/trade.html" target="_blank" rel="noopener noreferrer">Trade</a>&nbsp; 
                    </p>
                    
                    <p>
                    More tutorial sessions are available. 
                    They have names like tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a list of topics.
                    </p>
                    <br /><br />
                </>
            )
        }
    ]
}
