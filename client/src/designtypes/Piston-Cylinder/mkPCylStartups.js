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
            title: "Make US units Startup model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Piston-Cylinder","US"),'}</li>
                        <li>{'changeName("Startup"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "PCYL Default startup - US units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "Startup".
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Piston-Cylinder","US"),
                changeName("Startup"),
                changeLabelsValue([{name: "COMMENT", value: "PCYL Default startup - US units ..."}]),
                startup(),
            ]
        },
        {
            title: "Make metric units Startup model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Piston-Cylinder","Metric"),'}</li>
                        <li>{'changeName("Startup_Metric"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "PCYL Default startup - metric units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "Startup_Metric".
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Piston-Cylinder","Metric"),
                changeName("Startup_Metric"),
                changeLabelsValue([{name: "COMMENT", value: "PCYL Default startup - metric units ..."}]),
                startup(),
            ]
        }
    ]
}
