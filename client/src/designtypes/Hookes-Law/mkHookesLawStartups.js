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
                        <li>{'loadInitialState("Hookes-Law","US"),'}</li>
                        <li>{'changeName("Startup"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Hooks Law default start point - US units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "Startup".
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Hookes-Law","US"),
                changeName("Startup"),
                changeLabelsValue([{name: "COMMENT", value: "Hookes Law default start point - US units ..."}]),
                startup(),
            ]
        },
        {
            title: "Make metric units Startup model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Hookes-Law","Metric"),'}</li>
                        <li>{'changeName("Startup_Metric"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Hookes Law default start point - Metric units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "Startup_Metric".
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Hookes-Law","Metric"),
                changeName("Startup_Metric"),
                changeLabelsValue([{name: "COMMENT", value: "Hookes Law default start point - Metric units ..."}]),
                startup(),
            ]
        }
    ]
}
