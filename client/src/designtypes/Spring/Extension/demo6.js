import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    "name": "demo6",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                <>
                    <p>
                    The following example briefly illustrates the use of ODOP:Spring in
                    the design of an extension spring.
                    While the difference in difficulty between calculating compression and
                    extension springs by hand may be substantial, you should find that
                    ODOP:Spring makes the design of extension springs no more difficult
                    or time consuming than the design of compression springs.
                    </p>

                    <p>
                    This demo session is written with the assumption that the reader is already familiar with
                    basic ODOP concepts and terminology.
                    To get a more introductory experience,
                    the compression spring demo sessions named "demoDesignValidation" and "demoNewDesign" are a good place to get started.
                    </p>

                    <p>
                    As with the other tutorial and demo sessions,
                    this session needs to start from a known state.
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    </p>

                    <p>
                    Click Next to establish the necessary initialState.
                    </p>
                </>
            )
        },
        {
            title: "Page 02 of 09",
            text: (
                <>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    </p>

                    <p>This problem appears in the  HANDBOOK of SPRING DESIGN  published by:<br />
                    <br />
                    Spring Manufacturers Institute, Inc.<br />
                    2001 Midwest Road, Suite 106<br />
                    Oak Brook, Illinois &nbsp; 60523<br />
                    <br />
                    telephone: 630-495-8588<br />
                    <br />
                    Refer to page 18 of the second printing (1983).<br />
                    ***  Used with permission of Spring Manufacturers Institute, Inc.  ***<br />
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Extension'),
                changeLabelsValue([{name: 'COMMENT', value: 'Extension Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 09",
            text: (
                <>
                <p>
                Before making any changes to our initialState, the Design Example may be restated in a simplified form:<br />
                <br />
                Example 1: Design an extension spring to meet the following requirements:
                </p>

                <table>
                    <tbody>
                        <tr><th>Material</th><td>&nbsp;=</td><td>&nbsp;</td><td>oil-tempered wire</td><td>&nbsp;</td></tr>
                        <tr><th>Ends</th><td>&nbsp;=</td><td>&nbsp;</td><td>loops</td><td>&nbsp;</td></tr>
                        <tr><th>Outside diameter</th><td>&nbsp;=</td><td>&nbsp;1.250</td><td>in.</td><td> (max)</td></tr>
                        <tr><th>Inside diameter</th><td>&nbsp;=</td><td>&nbsp;0.750</td><td>in.</td><td> (min; loops to fit over pin)</td></tr>
                        <tr><th>Load 1</th><td>&nbsp;=</td><td>25</td><td>lb.</td><td>&nbsp;</td></tr>
                        <tr><th>Length 1</th><td>&nbsp;=</td><td>&nbsp;5.6</td><td>in.</td><td>&nbsp;</td></tr>
                        <tr><th>Load 2</th><td>&nbsp;=</td><td>35</td><td>lb.</td><td>&nbsp;</td></tr>
                        <tr><th>Length 2</th><td>&nbsp;=</td><td>&nbsp;6.6</td><td>in.</td><td>&nbsp;</td></tr>
                        <tr><th>Cycle life</th><td>&nbsp;=</td><td>10,000</td><td>cycles</td><td>&nbsp;</td></tr>
                    </tbody>
                </table>
                <br />

                <p>
                </p>
                </>
            )
        },
        {
            title: "Page 04 of 09",
            text: (
                <>
                    <p>
                    The demo session has now entered what is known about the problem.
                    <br />
                    We'll allow a clearance, say 0.015 inch, on the coil diameters.<br />
                    For the inside  diameter: 0.750 + 0.015 = 0.765<br />
                    For the outside diameter: 1.250 - 0.015 = 1.235<br />
                    <br />
                    In summary, the changes were:<br />
                    &nbsp; CHANGE  Material_Type  OIL_TEMPERED_MB<br />
                    &nbsp; CHANGE  End_Type  Full_Loop<br />
                    &nbsp; CHANGE  ID_Free MIN   .765<br />
                    &nbsp; CHANGE  OD_Free MAX  1.235<br />
                    &nbsp; FIX  Force_1  25<br />
                    &nbsp; FIX  L_1    5.6<br />
                    &nbsp; FIX  Force_2  35<br />
                    &nbsp; FIX  L_2    6.6
                    </p>

                    <p>
                    This is a good time to scroll down and confirm these changes are now in place.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Material_Type",3),
                changeSymbolValue("End_Type",1),
                setSymbolFlag('ID_Free', MIN, CONSTRAINED),
                changeSymbolConstraint('ID_Free', MIN, 0.765),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 1.235),
                fixSymbolValue('Force_1', 25.0),
                fixSymbolValue('L_1', 5.6),
                fixSymbolValue('Force_2', 35.0),
                fixSymbolValue('L_2', 6.6)
            ]
        },
        {
            title: "Page 05 of 09",
            text: (
                <>
                    <p>
                    In the process of transitioning to the next page, the demo session will run Search.
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
            title: "Page 06 of 09",
            text: (
                <>
                    <p>
                    Now let's see what the search has achieved.
                    </p>

                    <p>
                    Yes, the program agrees that a feasible solution is available.  But
                    before we get involved with the details, since the handbook selected a
                    standard wire diameter (0.105), we should do the same.  Then we need to
                    repeat the search to adjust the other parameters.
                    <br /><br />
                    The next page will handle those details.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 07 of 09",
            text: (
                <>
                    <p>
                    </p>

                    <p>
                    The <b>Action : Select Size</b> menu item can be used to select the nearest standard wire diameter.
                    You can experiment with that now.
                    </p>

                    <p>
                    In the process of transitioning to the next page, the demo session will
                    FIX a value of 0.105 inch on Wire_Dia and then
                    run another search to re-establish corresponding values for all the other problem variables.
                    </p>
                </>
            )
        },
        {
            title: "Page 08 of 09",
            text: (
                <>
                    <p>
                    This is your opportunity for a detailed look at the numbers.
                    Don't forget to review the Report(s).
                    </p>

                    <p>
                    The handbook solution produced:<br />
                        Initial length  &nbsp; &nbsp; 3.735 in.  &nbsp; &nbsp; &nbsp; &nbsp; Initial tension  &nbsp; 6.35 lb.<br />
                        Length at 1  &nbsp; &nbsp; &nbsp; 5.6  in. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Force at 1   &nbsp; &nbsp;  25    lb.<br />
                        Length at 2  &nbsp; &nbsp; &nbsp; 6.6  in. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Force at 2  &nbsp; &nbsp; 35    lb.<br />
                        Outside diameter  1.105 in.  &nbsp; &nbsp; &nbsp; &nbsp; Initial stress  14,000 psi<br />
                        Active coils  &nbsp; &nbsp; &nbsp; 17.5  coils   &nbsp; &nbsp; &nbsp; Wire diameter  &nbsp; 0.105 in.<br />
                    </p>
                    <p>
                    The two solutions are in reasonable agreement.
                    </p>

                    <p>
                    The next page will go one step further by entering the handbook solution and comparing predictions.
                    In the process,
                    ODOP:Spring's calculation of deflection in the loops (Hook_Deflect_All) will be disabled.
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.105),
                search()
            ]
        },
        {
            title: "Page 09 of 09 (last page)",
            text: (
                <>
                    <p>
                    In order to disable ODOP:Spring's calculation of deflection in the loops:<br />
                    &nbsp; CHANGE END_TYPE User_Specified<br />
                    &nbsp; CHANGE Hook_Deflect_All 0.0
                    </p>

                    <p>
                    The handbook solution produced:<br />
                    <br />
                    Initial length  &nbsp; &nbsp; 3.735 in.  &nbsp; &nbsp; &nbsp; &nbsp; Initial tension  &nbsp; 6.35 lb.<br />
                    Length at 1  &nbsp; &nbsp; &nbsp; 5.6  in. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Force at 1   &nbsp; &nbsp;  25    lb.<br />
                    Length at 2  &nbsp; &nbsp; &nbsp; 6.6  in. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Force at 2  &nbsp; &nbsp; 35    lb.<br />
                    Outside diameter  1.105 in.  &nbsp; &nbsp; &nbsp; &nbsp; Initial stress  14,000 psi<br />
                    Active coils  &nbsp; &nbsp; &nbsp; 17.5  coils   &nbsp; &nbsp; &nbsp; Wire diameter  &nbsp; 0.105 in.<br />
                    </p>

                    <p>
                    The agreement between results is now almost perfect.
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('OD_Free', 1.105),
                fixSymbolValue('Coils_T', 17.5),
                fixSymbolValue('Initial_Tension', 6.35),
                changeSymbolValue("End_Type",6),
                changeSymbolValue("Hook_Deflect_All",0.0)
            ]
        }
    ]
}