import React from 'react';
import { changeSymbolValue, fixSymbolValue, changeSymbolConstraint, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
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
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
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
                        CHANGE  FS_2 MAX 2.0 &nbsp; &#60;--- allow more conservative designs<br/>
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
                    Look for warnings on Report 1 and Calculator View.
                    In this case, we'll ignore the warning.
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
                saveOutputSymbolConstraints('Cycle_Life'),
                setSymbolFlag('Cycle_Life', MIN, CONSTRAINED),
                changeSymbolConstraint('Cycle_Life', MIN, 50000.0),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 2.0),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.2),
                saveOutputSymbolConstraints('L_Stroke'),
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
                    This is the last page of the test case 
                    </p>
                    <br />
                </>
            ),
            actions: [
                search()
            ]
        }
    ]
}
