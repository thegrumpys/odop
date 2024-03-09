import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    "name": "demo14",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                <>
                    <p>
                    The following example briefly illustrates the use of ODOP:Spring in
                    the design of a torsion spring.
                    </p>

                    <p>
                    This demo session is written with the assumption that the reader is already familiar with
                    basic ODOP concepts and terminology.
                    To get a more introductory experience,
                    the compression spring demo sessions named "demoDesignValidation" and "demoNewDesign" are a good place to get started.
                    </p>

                    <p>
                    A detailed description of
                    <a href="/docs/Help/DesignTypes/Spring/Torsion/description.html" target="_blank" rel="noopener noreferrer"> torsion spring names </a>
                    is provided in the On-line Help.
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
            title: "Page 02 of 08",
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
                    Refer to page 25 of the 1991 edition.<br />
                    ***  Used with permission of Spring Manufacturers Institute, Inc.  ***<br />
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Torsion'),
                changeLabelsValue([{name: 'COMMENT', value: 'Torsion Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 08",
            text: (
                <>
                <p>
                Before making any changes to our initialState, the Design Example may be restated in a simplified form:<br />
                <br />
                Design a torsion spring to counterbalance a trap door.
                The spring should carry 18 pounds (90% of the door's 20 pound weight) in the door closed position.
                The door's center of gravity is 9 inches from the hinge.
                The torsion spring should exert 10 lb-in of torque to hold the door open at a deflection
                of 110 degrees from the closed position.
                </p>

                <p>
                Determine a standard wire diameter and number of coils for a torsion spring
                with appropriate clearance for working over a 1.1 inch diameter shaft
                (a suggestion of a 1.5 inch mean diameter is provided).
                </p>

                <table>
                    <tbody>
                        <tr><th>material</th><td>&nbsp;=</td><td>&nbsp;</td><td>oil-tempered wire</td><td>&nbsp;</td></tr>
                        <tr><th>ends</th><td>&nbsp;=</td><td>&nbsp;</td><td>tangent</td><td>&nbsp;</td></tr>
                        <tr><th>inside diameter</th><td>~=</td><td>&nbsp;1.20</td><td>in.</td><td>(1.1 shaft plus approx. 10% clearance)</td></tr>
                        <tr><th>length of Arm 2</th><td>&nbsp;=</td><td>9.0</td><td>in.</td><td>&nbsp;</td></tr>
                        <tr><th>Force @ Arm 2</th><td>&nbsp;=</td><td>18.0</td><td>lb.</td><td>&nbsp;</td></tr>
                        <tr><th>Moment in open position</th><td>&nbsp;=</td><td>10.0</td><td>lb-in.</td><td>&nbsp;</td></tr>
                        <tr><th>Stroke</th><td>&nbsp;=</td><td>110</td><td>degrees</td><td>&nbsp;</td></tr>
                    </tbody>
                </table>
                <br />

                <p>
                The handbook example uses allowable stresses appropriate for a static load and
                does not state a requirement for cycle life.
                There is no mention of spacing between coils or
                arm lengths necessary to compute wire length and weight.
                </p>
                </>
            )
        },
        {
            title: "Page 04 of 08",
            text: (
                <>
                    <p>
                    The demo has now entered what is known about the problem.
                    In summary, the changes were:<br />
                    <br />
                    CHANGE  Material_Type  OIL_TEMPERED_MB<br />
                    <br />
                    FIX     M_1  10.0<br />
                    CHANGE  ID_Free MIN  1.20<br />
                    CHANGE  ID_Free MAX  1.25<br />
                    <br />
                    FIX  Stroke  110.0<br />
                    FIX  Force_Arm_2  18.0<br />
                    CHANGE  Arm_2  9.0<br />
                    </p>

                    <p>
                    This is a good time to scroll down and confirm these changes are now in place.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Material_Type",3),
                fixSymbolValue('M_1', 10.0),
                setSymbolFlag('ID_Free', MIN, CONSTRAINED),
                changeSymbolConstraint('ID_Free', MIN, 1.20),
                setSymbolFlag('ID_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('ID_Free', MAX, 1.25),
                fixSymbolValue('Stroke', 110.0),
                fixSymbolValue('Force_Arm_2', 18.0),
                changeSymbolValue("Arm_2",9.0)
            ]
        },
        {
            title: "Page 05 of 08",
            text: (
                <>
                    <p>
                    Note that the Handbook solution was required to calculate moment in the closed position (180 lb-in).
                    ODOP:Spring was able to accept the specifications for Force_Arm_2 and length of Arm_2 directly and
                    thus eliminated the need for that side calculation.
                    </p>

                    <p>
                    After the click on Next, the demo will run Search.
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
                    Now let's see what the search has achieved.
                    Don't forget to review the Report(s).
                    </p>

                    <p>
                    &nbsp;
                    <br />
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 07 of 08",
            text: (
                <>
                    <p>
                    The handbook solution used a standard wire diameter.
                    </p>

                    <p>
                    The <b>Action : Select Size</b> menu item can be used to select the nearest standard wire diameter.
                    You can experiment with that now.
                    </p>

                    <p>
                    In the process of transitioning to the next page, the demo session will
                    FIX a value of 0.225 inch on Wire_Dia and then
                    run another search to re-establish corresponding values for all the other problem variables.
                    </p>
                </>
            )
        },
        {
            title: "Page 08 of 08 (last page)",
            text: (
                <>
                    <p>
                    </p>
                    <br />

                    <p>
                    The handbook solution produced:<br />
                         &nbsp; wire diameter  =  0.225 in.<br />
                         &nbsp; total coils    =  9.6   coils<br />
                         &nbsp; deflected inside diameter   = 1.233 in.<br />
                         &nbsp; deflected body length   = 2.458 in.<br />
                         &nbsp; stress (152 lb-in) = 142,000 psi.
                    </p>
                    <p>
                    The two solutions are in reasonable agreement.
                    </p>

                    <p>
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.225),
                search()
            ]
        }
    ]
}