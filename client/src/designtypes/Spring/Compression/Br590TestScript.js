import React from 'react';
import { changeSymbolConstraint, changeSymbolValue, changeSystemControlsValue, loadInitialState, search, setSymbolFlag } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Page 01 - Branch 590 test script",
            text: (
                <>
                    <p>
                    This is the Branch 590 test script.
                    It provides multiple test cases where in ODOP:Spring v4.0.x
                    a search started from a valid or invalid start point will produce a valid or invalid result.
                    </p>
                </>
            )
        },
        {
            title: "Page 02 - VALID to VALID",
            text: (
                <>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    Set Force_2 MIN = 40.0 inches<br />
                    Set L_Stroke MIN = 1.74 inches<br />
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSystemControlsValue({maxit: 600}),
                setSymbolFlag('Force_2', MIN, CONSTRAINED),
                changeSymbolConstraint("Force_2", MIN, 40.0),
                changeSymbolConstraint("L_Stroke", MIN, 1.75),
            ]
        },
        {
            title: "Page 03 - VALID to VALID",
            text: (
                <>
                    <p>
                    Search should have gotten a VALID solution.
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
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    Set Force_2 MIN = 40.0 inches<br />
                    Set L_Stroke MIN = 1.74 inches<br />
                    Set Force_2 = 90.0 inches<br />
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSystemControlsValue({maxit: 600}),
                setSymbolFlag('Force_2', MIN, CONSTRAINED),
                changeSymbolConstraint("Force_2", MIN, 40.0),
                changeSymbolConstraint("L_Stroke", MIN, 1.75),
                changeSymbolValue("Force_2", 90.0),
            ]
        },
        {
            title: "Page 05 - INVALID to VALID",
            text: (
                <>
                    <p>
                     Search should have gotten a VALID solution.
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
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    Set OD_Free = -1.1 inches<br />
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
                    Search should have gotten an INVALID solution.
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
                    Case 1:  Negative Wire_Dia
                    </p>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    Wire_Dia = 0.4 inch<br />
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
                    Search should have gone from a VALID to INVALID to INVALID to VALID solution.
                    Observe that values of Wire_Dia and other variables are negative.
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
                    Case 2:  Negative Coils_A
                    </p>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    OD_Free = 91.1 inches<br />
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
                    Search should have gone from a VALID to INVALID to INVALID to VALID solution.
                    Observe that value of Coils_A is invalid (negative).
                    Other variables are negative
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
                    Case 3:  Negative ID_Free
                    </p>
                    <p>
                    Loaded Compression spring initialState.<br />
                    Set maxit = 600<br />
                    OD_Free = 11.1 inches<br />
                    Spring_Index MAX 1.6
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSystemControlsValue({maxit: 600}),
                changeSymbolValue("OD_Free", 11.1),
                setSymbolFlag('Spring_Index', MAX, CONSTRAINED),
                changeSymbolConstraint('Spring_Index', MAX, 1.6),
            ]
        },
        {
            title: "Page 14 - INVALID to VALID to INVALID to VALID",
            text: (
                <>
                    <p>
                    Search should have gone from a VALID to INVALID to INVALID to VALID solution.
                    Observe that value of ID_Free is invalid (negative).
                    Other variables are negative
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        }
    ]
}
