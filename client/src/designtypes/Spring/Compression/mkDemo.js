import React from 'react';
import {
    MIN,
    MAX,
    CONSTRAINED,
} from '../../../store/actionTypes';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    changeSymbolValue,
    changeSymbolConstraint,
    startup,
} from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Make Demo model",
            text: (
                <React.Fragment>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Spring/Compression","US"),'}</li>
                        <li>{'changeName("Demo"),'}</li>
                        <li>{'changeLabelsValue([\{name\: "COMMENT", value\: "Compression Spring demo start point"\}]),'}</li>
                        <li>{'changeSymbolValue("L_Free", 3),'}</li>
                        <li>{'changeSymbolConstraint("Cycle_Life", MIN, 1.02),'}</li>
                        <li>{'changeSymbolConstraint("Cycle_Life", MAX, 1.5),'}</li>
                        <li>{'changeSymbolConstraint("%_Avail_Deflect", MAX, 98),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                </React.Fragment>
            ),
            actions: [
                loadInitialState("Spring/Compression","US"),
                changeName("Demo"),
                changeLabelsValue([{name: "COMMENT", value: "Compression Spring demo start point"}]),
                changeSymbolValue("L_Free", 3),
                changeSymbolConstraint("Cycle_Life", MIN, 1.02),
                changeSymbolConstraint("Cycle_Life", MAX, 1.5),
                changeSymbolConstraint("%_Avail_Deflect", MAX, 98),
                startup(),
            ]
        }
    ]
}
