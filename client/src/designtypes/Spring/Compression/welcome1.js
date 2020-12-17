import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    Welcome !
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    Setting variables to Number.NaN is next.
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 07",
            text: (
                <React.Fragment>
                    <p>
                    Please review the test setting Independent Variables to Number.NaN.
                    </p>
                    
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("OD_Free", Number.NaN),
                changeSymbolValue("Wire_Dia", 0.10),
                changeSymbolValue("L_Free", Number.NaN),
                changeSymbolValue("Coils_T", Number.NaN),
                changeSymbolValue("Force_1", Number.NaN),
                changeSymbolValue("Force_2", Number.NaN),
                changeLabelsValue([{name: 'COMMENT', value: 'Welcome script test'}])
            ]
        },
        {
            title: "Page 03 of 07",
            text: (
                <React.Fragment>
                    <p>
                    Page 3
                    <br />
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 07",
            text: (
                <React.Fragment>
                Page 4
                    <br /><br />
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 07",
            text: (
                <React.Fragment>
                    <p>
                    Page 5 has set a bunch of stuff.
                    <br />
                    </p>
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('OD_Free', 1.0),
                fixSymbolValue('L_Free', 3.25),
                fixSymbolValue('L_2', 1.75),
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 60.0),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.625),
                changeSymbolValue("End_Type",4),
                changeSymbolValue("Material_Type",3)
            ]
        },
        {
            title: "Page 06 of 07",
            text: (
                <React.Fragment>
                    <p>
                    Page 6
                    </p>

                    <p>
                    &nbsp;
                    <br />
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page nn of nn (last page)",
            text: (
                <React.Fragment>
                    <p>
                    Last page.
                    </p>
                    
                    <br />
                </React.Fragment>
            )
        }
    ]
}
