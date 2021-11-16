import React from 'react';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    startup,
} from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Make Startup model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Piston-Cylinder","US"),'}</li>
                        <li>{'changeName("Startup"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "PCYL Default startup file ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                </>
            ),
            actions: [
                loadInitialState("Piston-Cylinder","US"),
                changeName("Startup"),
                changeLabelsValue([{name: "COMMENT", value: "PCYL Default startup file ..."}]),
                startup(),
            ]
        }
    ]
}
