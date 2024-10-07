import React from 'react';
import { changeSymbolValue, fixSymbolValue, changeSymbolConstraint, loadInitialState, setSymbolFlag, changeLabelsValue, search } from '../../../store/actionCreators';
import { MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    "name": "test001",
    "steps": [
        {
            title: "Page 01 of 03",
            text: (
                <>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    </p>

                    <br /><br />
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring performance test001'}])
            ]
        },
        {
            title: "Page 02 of 03",
            text: (
                <>
                    The changes:<br />
                    FIX OD_Free 0.925<br />
                    FIX L_Free 1.713<br />
                    FIX Force_2 50.0<br />
                    FIX L_2 1.278<br />
                    CHANGE L_Solid MAX 1.060<br />
                    CHANGE Material_Type OIL_TEMPERED_MB<br />
                    CHANGE  FS_2  MAX  2.0
                    <br />
                </>
            ),
            actions: [
                fixSymbolValue('OD_Free', 0.925),
                fixSymbolValue('L_Free', 1.713),
                fixSymbolValue('Force_2', 50.0),
                fixSymbolValue('L_2', 1.278),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.060),
                changeSymbolValue("Material_Type",3),
                changeSymbolConstraint('FS_2', MAX, 2.0)
            ]
        },
        {
            title: "Page 03 of 03 (last page)",
            text: (
                <>
                    <p>
                    The Search process has completed.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },

    ]
}