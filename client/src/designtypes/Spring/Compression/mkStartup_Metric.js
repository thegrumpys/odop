import React from 'react';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    startup,
} from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Make Startup_Metric model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Spring/Compression","Metric"),'}</li>
                        <li>{'changeName("Startup_Metric"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Compression Spring default start point - Metric units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                </>
            ),
            actions: [
                loadInitialState("Spring/Compression","Metric"),
                changeName("Startup_Metric"),
                changeLabelsValue([{name: "COMMENT", value: "Compression Spring default start point - Metric units ..."}]),
                startup(),
            ]
        }
    ]
}
