import React from 'react';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    startup,
} from '../../../store/actions';
export const execute = {
    steps: [
        {
            title: "Make US units Startup model",
            text: (
                <>
                    <p>
                    This session creates a set of torsion spring Startup designs
                    including US and metric units.
                    While this session uses the Execute / Demo / Tutorial mechanism
                    associated with end-user training, it is not intended for end-users.
                    </p>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Spring/Torsion","US"),'}</li>
                        <li>{'changeName("Startup"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Torsion Spring default start point - US units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Confirm that you are logged in and then
                    invoke the <b>File : Save </b> menu to save with the name <b>"Startup"</b> now.
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Spring/Torsion","US"),
                changeName("Startup"),
                changeLabelsValue([{name: "COMMENT", value: "Torsion Spring default start point - US units ..."}]),
                startup(),
            ]
        },
        {
            title: "Make metric units Startup_Metric model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Spring/Torsion","Metric"),'}</li>
                        <li>{'changeName("Startup_Metric"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Torsion Spring default start point - Metric units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name <b>"Startup_Metric"</b> now.
                    </p>
                    <p>
                    In order to make these designs available to all users as [ReadOnly],
                    make the value of the user field in the design table null.
                    </p>
                    <p>
                    When ready, use the "Exit" button to close this light green panel and resume regular operation of the program.
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Spring/Torsion","Metric"),
                changeName("Startup_Metric"),
                changeLabelsValue([{name: "COMMENT", value: "Torsion Spring default start point - Metric units ..."}]),
                startup(),
            ]
        }
    ]
}
