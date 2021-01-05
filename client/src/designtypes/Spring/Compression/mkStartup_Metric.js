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
                <React.Fragment>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Spring/Compression","Metric"),'}</li>
                        <li>{'changeName("Startup_Metric"),'}</li>
                        <li>{'changeLabelsValue([\{name\: "COMMENT", value\: "Rectangular Solid default Startup file ..."\}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                </React.Fragment>
            ),
            actions: [
                loadInitialState("Solid","US"),
                changeName("Startup_Metric"),
                changeLabelsValue([{name: "COMMENT", value: "Rectangular Solid default Startup file ..."}]),
                startup(),
            ]
        }
    ]
}
