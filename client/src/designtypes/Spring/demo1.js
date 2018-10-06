import React from 'react';
import { changeSymbolValue, fixSymbolValue, changeSymbolConstraint, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, search } from '../../store/actionCreators';
import { MAX, CONSTRAINED } from '../../store/actionTypes';
export const execute = {
    "name": "demo1",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                    <React.Fragment>
                        <p>
                        The following example illustrates the use of ODOP:Spring in
                        the design of a compression spring. 
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
                    </React.Fragment>
                )
        },
        {
            title: "Page 02 of 11",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    </p>

                    <p>
                    In general, the easiest way to begin is to modify an existing design.
                    This demo session will modify this design until it meets the requirements 
                    of the current design problem.
                    The following sequence will illustrate this process.
                    </p>
                    
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring')
            ]
        },
        {
            title: "Page 03 of 11",
            text: (
                <React.Fragment>
                    <p>This problem appears in the  HANDBOOK of SPRING DESIGN  published by:<br />
                    <br />
                    Spring Manufacturers Institute, Inc.<br />
                    2001 Midwest Road, Suite 106<br />
                    Oak Brook, Illinois &nbsp; 60523<br />
                    <br />
                    telephone: 630-495-8588<br />
                    <br />
                    Refer to page 15 of the second printing (1983).<br />
                    ***  Used with permission of Spring Manufacturers Institute, Inc.  ***<br />
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 11",
            text: (
                <React.Fragment>
                    <p>
                    Before making any additional changes, 
                    Example 1 may be restated: &nbsp; Design a compression spring such that<br />
                    <br />
                    outside diameter =  0.925 in.<br />
                    free length      =  1.713 in.<br />
                    load             = 50.0   lb. &nbsp; at length = 1.278 in.<br />
                    solid height    &lt;=  1.060 in.<br />
                    material         =  oil tempered wire<br />
                    ends             =  closed & ground<br />
                    </p>
                    
                    <p>This is a good time to take a good look at the existing values.
                    Many values will update immediately as the demo process enters changes
                    to match the problem specifications.
                    You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.
                    The changes will happen immediately after this click of the Next button.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 11",
            text: (
                <React.Fragment>
                    <p>
                    Now, the demo session has entered everything we know about the problem
                    exactly as stated.
                    All the numbers (Dependent Variable values, Constraint Violations, etc.) 
                    updated immediately as the demo process entered changes to match the 
                    problem specifications.
                    </p>
                    
                    In summary, the changes were:<br />
                    FIX OD_Free 0.925<br />
                    FIX L_Free 1.713<br />
                    FIX Force_2 50.0<br />
                    FIX L_2 1.278<br />
                    CHANGE L_Solid MAX 1.060<br />
                    CHANGE Material_Type OIL_TEMPERED_MB<br />
                    <br />
                    <p>
                    Again, you can scroll the page down to view the complete set of values. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('OD_Free', 0.925),
                fixSymbolValue('L_Free', 1.713),
                fixSymbolValue('Force_2', 50.0),
                fixSymbolValue('L_2', 1.278),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.060),
                changeSymbolValue("Material_Type",3)
            ]
        },
        {
            title: "Page 06 of 11",
            text: (
                <React.Fragment>
                    <p>
                    We can be sure that a search is necessary.  It's quite unlikely that
                    the starting values would have produced the desired combination of
                    force and deflection at point 2.
                    </p>
                    <p>
                    But first, we have made a small change that will allow ODOP:Spring to
                    consider designs with a larger than normal factor of safety.
                    Specifically, <br />
                    CHANGE  FS_2  MAX  2.0
                    </p>
                    <p>
                    Again, this is a good time to take a good look at the existing values.
                    The Search will take place immediately after this click of the Next button.
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolConstraint('FS_2', MAX, 2.0)
            ]
        },
        {
            title: "Page 07 of 11",
            text: (
                <React.Fragment>
                    <p>
                    The Search process has completed.
                    </p>
                    <p>
                    Again, this is a good time to take a good look at the existing values.
                    Click on the Report tabs to view even more details.
                    Be sure to click on the "Design:" tab to return to the main page 
                    before continuing. 
                    </p>
                    <p>You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.</p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 08 of 11",
            text: (
                <React.Fragment>
                    <p>
                    The handbook solution did a bit of hand waving and used  0.125 inch
                    for wire diameter.
                    <br />
                    Let's see what ODOP:Spring says is a standard size for wire diameter ...<br />
                    <br />
                    select wire<br />
                    1<br />
                    </p>
                    <p>
                    Oops ! That feature is not implemented yet.
                    We will have to settle for: <br />
                    FIX Wire_Dia 0.125
                    </p>
                    <p>
                    That value is now in place.
                    We will need to Search one more time to bring all the numbers into alignment.
                    That Search will happen when you click the Next button.
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.125),
            ]
        },
        {
            title: "Page 09 of 11",
            text: (
                <React.Fragment>
                    <p>
                    The second Search process has completed.
                    The changes were quite small.
                    </p>
                    <p>
                    The next page will provide the handbook solution.
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 10 of 11",
            text: (
                <React.Fragment>
                    The handbook solution produced:
                        <table>
                            <tbody>
                                <tr><th>spring rate</th><td>=&nbsp;</td><td>&nbsp; 115</td><td>lb. per in.</td></tr>
                                <tr><th>load at solid</th><td>=&nbsp;</td><td>&nbsp;&nbsp; 75.1</td><td>lb.</td></tr>
                                <tr><th>wire diameter</th><td>=&nbsp;</td><td>&nbsp; &nbsp; 0.125</td><td>in.</td></tr>
                                <tr><th>mean diameter</th><td>=&nbsp;</td><td>&nbsp; &nbsp; 0.80</td><td>in.</td></tr>
                                <tr><th>active coils</th><td>=&nbsp;</td><td>&nbsp; &nbsp; 6</td><td>coils</td></tr>
                                <tr><th>solid height</th><td>=&nbsp;</td><td>&nbsp; &nbsp; 1.00</td><td>in.</td></tr>
                                <tr><th>stress at solid</th><td>=</td><td>97,092</td><td>psi &nbsp; (corrected)</td></tr>
                            </tbody>
                        </table>
                    <br />
                    <p>
                    The difference in force at solid and stress at solid is attributable
                    to the fact that the handbook analysis made an initial assumption
                    of solid height equal to 1.06 inches, then later failed to adjust
                    the assumption to correspond to the actual 1.00 inch solid height.
                    </p>
                    <p>
                    Compare the Handbook solution (above) to the values produced by ODOP:Spring (below and Reports).
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 11 of 11 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    We can quickly confirm this notion by setting FORCE_2 to the handbook's value.
                    Basically, <br />
                    CHANGE  Force_2  75.1
                    <br />
                    So, now that the new value for Force_2 is in place,
                    the value of STRESS_2 is a reasonable match for the corresponding
                    stress value in the handbook example.
                    </p>
                    <p>
                    We can wrap up by saying that the ODOP:Spring values are a good match
                    for the handbook solution.
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Force_2', 75.1)
            ]
        },
    ]
}