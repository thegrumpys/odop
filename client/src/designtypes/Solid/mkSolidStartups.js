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
                        <li>{'loadInitialState("Solid","US"),'}</li>
                        <li>{'changeName("Startup"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Rectangular Solid default Startup - US units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "Startup".
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Solid","US"),
                changeName("Startup"),
                changeLabelsValue([{name: "COMMENT", value: "Rectangular Solid default Startup - US units ..."}]),
                startup(),
            ]
        }
       {
            title: "Make metric units Startup model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Solid","Metric"),'}</li>
                        <li>{'changeName("Startup"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Rectangular Solid default Startup - metric units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "Startup".
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Solid","Metric"),
                changeName("Startup_Metric"),
                changeLabelsValue([{name: "COMMENT", value: "Rectangular Solid default Startup - metric units ..."}]),
                startup(),
            ]
        }
    ]
}
