import React from 'react';
import { changeSymbolConstraint, changeSymbolValue, changeSystemControlsValue, loadInitialState, search, resetSymbolFlag, setSymbolFlag } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Branch 590 test script",
            text: (
                <>
                    <p>
                    This script provides multiple test cases exploring how Search responds to validity. 
                    Specifically, cases where a search started from a valid or invalid start point will produce a valid or invalid result.
                    The last three cases are examples where Search in ODOP:Spring v4.0.x and earlier would start valid but end invalid.
                    </p>
                </>
            )
        },
        {
            title: "Page 02 - VALID to VALID",
            text: (
                <>
                    <p>
                    Conditions already established:
                    </p>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set Force_2 MIN = 40.0 pounds<br />
                    Set L_Stroke MIN = 1.75 inches<br />
                    </p>
                    <p>
                    Click Next to run Search.
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                setSymbolFlag('Force_2', MIN, CONSTRAINED),
                changeSymbolConstraint("Force_2", MIN, 40.0),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint("L_Stroke", MIN, 1.75),
            ]
        },
        {
            title: "Page 03 - VALID to VALID",
            text: (
                <>
                    <p>
                    Search should have produced a VALID solution.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 04 - INVALID to VALID",
            text: (
                <>
                    <p>
                    Conditions already established:
                    </p>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    Set Force_2 MIN = 40.0 pounds<br />
                    Set L_Stroke MIN = 1.75 inches<br />
                    Set Force_2 = 90.0 pounds<br />
                    </p>
                    <p>
                    Click Next to run Search.
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSystemControlsValue({maxit: 600}),
                setSymbolFlag('Force_2', MIN, CONSTRAINED),
                changeSymbolConstraint("Force_2", MIN, 40.0),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint("L_Stroke", MIN, 1.75),
                changeSymbolValue("Force_2", 90.0),
            ]
        },
        {
            title: "Page 05 - INVALID to VALID",
            text: (
                <>
                    <p>
                     Search should have produced a VALID solution.
                   </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 06 - INVALID to INVALID",
            text: (
                <>
                    <p>
                    Conditions already established:
                    </p>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    Set OD_Free = -1.1 inches<br />
                    </p>
                    <p>
                    Click Next to run Search.
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSystemControlsValue({maxit: 600}),
                changeSymbolValue("OD_Free", -1.1),
            ]
        },
        {
            title: "Page 07 - INVALID to INVALID",
            text: (
                <>
                    <p>
                    It is anticipated that Search produced an INVALID and NOT FEASIBLE solution.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 08 - INVALID to VALID to INVALID to VALID",
            text: (
                <>
                    <p>
                    Original Case 1:<br />
                    Starting Search from this point in v4.0.x produced negative Wire_Dia and other variables. 
                    Improved default constraints and sdlim values permit v4.2.2 to produce a valid and feasible result 
                    from this start point. 
                    </p>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    Wire_Dia = 0.4 inch<br />
                    </p>
                    <p>
                    Click Next to run Search.
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSystemControlsValue({maxit: 600}),
                changeSymbolValue("Wire_Dia", 0.4),
            ]
        },
        {
            title: "Page 09 - INVALID to VALID to INVALID to VALID",
            text: (
                <>
                    <p>
                    In v4.3 (post branches 590 & 569), console.log diagnostics show that
                    Search goes from a INVALID to VALID to INVALID to VALID and feasible solution.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 10 - INVALID to VALID to INVALID to VALID",
            text: (
                <>
                    <p>
                    Original Case 2:<br />
                    Starting Search from this point in v4.0.x produced negative Coils_A and other variables. 
                    Improved default constraints and sdlim values permit v4.2.2 to produce a valid and feasible result 
                    from this start point. 
                    </p>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    OD_Free = 91.1 inches<br />
                    </p>
                    <p>
                    Click Next to run Search.
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSystemControlsValue({maxit: 600}),
                changeSymbolValue("OD_Free", 91.1),
            ]
        },
        {
            title: "Page 11 - VALID to INVALID to INVALID to VALID",
            text: (
                <>
                    <p>
                    In v4.3 (post branches 590 & 569), console.log diagnostics show that
                    Search goes from a INVALID to VALID to INVALID to VALID solution. 
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 12 - INVALID to VALID to INVALID to VALID",
            text: (
                <>
                    <p>
                    Original Case 3:<br /> 
                    Starting Search from this point in v4.0.x produced negative ID_Free and other variables. 
                    Improved default constraints and sdlim values permit v4.2.2 to produce a valid and feasible result 
                    from this start point. 
                    </p>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    OD_Free = 11.1 inches<br />
                    Spring_Index MIN 1.0
                    Spring_Index MAX 1.6
                    </p>
                    <p>
                    Click Next to run Search.
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSystemControlsValue({maxit: 600}),
                changeSymbolValue("OD_Free", 11.1),
                resetSymbolFlag('Spring_Index', MIN, CONSTRAINED),
                changeSymbolConstraint('Spring_Index', MIN, 1.0),
                setSymbolFlag('Spring_Index', MAX, CONSTRAINED),
                changeSymbolConstraint('Spring_Index', MAX, 1.6),
            ]
        },
        {
            title: "Page 13 - INVALID to VALID to INVALID to VALID",
            text: (
                <>
                    <p>
                    In v4.3 (post branches 590 & 569), console.log diagnostics show that
                    Search goes from a INVALID to VALID to INVALID to VALID solution.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        }
    ]
}
