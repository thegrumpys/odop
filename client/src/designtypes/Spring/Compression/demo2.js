import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, changeLabelsValue, search } from '../../../store/actions';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    "name": "demo2",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                <>
                    <p>Welcome back !</p>

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
            title: "Page 02 of 07",
            text: (
                <>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    </p>

                    <p>The following example briefly illustrates the use of ODOP:Spring in
                    the design of a compression spring. </p>

                    <p>
                    To continue with this example, just click the "Next" button as you finish
                    reading each page (step).
                    </p>
                    <br />
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring demo2'}])
            ]
        },
        {
            title: "Page 03 of 07",
            text: (
                <>
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
                </>
            )
        },
        {
            title: "Page 04 of 07",
            text: (
                <>
                    <p>
                    Before making any changes, Example 2 may be restated:  Design a compression spring such that
                    </p>
                    <table>
                        <tbody>
                            <tr><th>ends</th><td>&nbsp;=</td><td>&nbsp;closed</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                            <tr><th>outside diameter</th><td>&nbsp;=</td><td>&nbsp;0.188</td><td>&nbsp;</td><td>(.203 hole minus .015 clearance)</td></tr>
                            <tr><th>material</th><td>&nbsp;=</td><td>302 stainless</td><td>&nbsp;</td><td>(marine environment)</td></tr>
                            <tr><th>solid height</th><td>&lt;=</td><td>0.340</td><td>in.</td><td>&nbsp;</td></tr>
                            <tr><th>"normal" length</th><td>&nbsp;=</td><td>0.385</td><td>in.</td><td>&nbsp;</td></tr>
                            <tr><th>"normal" force</th><td>&nbsp;=</td><td>7.2</td><td>lb.</td><td>&nbsp;</td></tr>
                            <tr><th>free length</th><td>&nbsp;=</td><td>0.475</td><td>in.</td><td>&nbsp;</td></tr>
                        </tbody>
                    </table>
                    <br />
                    <p>
                    In spite of the .340 maximum solid height requirement, special
                    mention is made of the fact that the spring is never compressed
                    beyond its "normal" length of .385 inch.
                    </p>

                    <p>
                    As a hint, it is mentioned that a music wire spring of 0.035 inch
                    wire diameter operated satisfactorily.  This fact was used to aid
                    the handbook solution for number of active coils.
                    </p>
                </>
            )
        },
        {
            title: "Page 05 of 07",
            text: (
                <>
                    <p>
                    The demo has now entered what is known about the problem.
                    In summary, the changes were:<br />
                    <br />
                    CHANGE  Material_Type  302_STAINLESS<br />
                    CHANGE  End_Type  Closed<br />
                    <br />
                    FIX     OD_Free  0.188<br />
                    CHANGE  L_Solid MAX  0.340<br />
                    <br />
                    FIX  L_2  0.385<br />
                    FIX  Force_2  7.2<br />
                    FIX  L_Free  0.475<br />
                    <br />
                    We'll leave wire diameter free, but start at the suggested value of 0.035 inch.
                    <br />
                    CHANGE  Wire_Dia  0.035<br />
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Material_Type",7),
                changeSymbolValue("End_Type",3),
                fixSymbolValue('OD_Free', 0.188),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 0.340),
                fixSymbolValue('L_2', 0.385),
                fixSymbolValue('Force_2', 7.2),
                fixSymbolValue('L_Free', 0.475),
                changeSymbolValue("Wire_Dia",0.035)
            ]
        },
        {
            title: "Page 06 of 07",
            text: (
                <>
                    <p>
                    Taking the hint about the spring never being compressed below its
                    working length of .385 in., we'll permit the factor of safety in the
                    solid condition to drop below 1.00.
                    </p>

                    <p>
                    CHANGE  FS_Solid MIN  0.7
                    </p>

                    <p>
                    After the click on Next, the demo will run Search.
                    </p>
                </>
            ),
            actions: [
                changeSymbolConstraint('FS_Solid', MIN, 0.7)
            ]
        },
        {
            title: "Page 07 of 07 (last page)",
            text: (
                <>
                    <p>
                    Now let's see what the search has achieved.
                    Don't forget to review the Report(s).
                    </p>
                    <p>
                    The handbook solution produced:<br />
                         &nbsp; spring rate     = 80     lb. per in.<br />
                         &nbsp; mean diameter   =   .153 in.<br />
                         &nbsp; active coils    =  6.6   coils<br />
                         &nbsp; solid height    =   .333 in.<br />
                         &nbsp; stress (7.2 lb) = 90,000 psi.
                    </p>
                    <p>
                    The two solutions are in reasonable agreement.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        }
    ]
}