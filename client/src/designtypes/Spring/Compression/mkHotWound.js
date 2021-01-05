import React from 'react';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    changeSymbolValue,
    startup,
} from '../../../store/actionCreators';
export const execute = {
    "steps": [
        {
            title: "Make HotWoundMetric model",
            text: (
                <React.Fragment>
                    <p>
                    This session creates a Startup design optimized for 
                    large hot-wound compression springs.  
                    While it uses the Execute / Demo / Tutorial mechanism
                    associated with end-user training,
                    this session is not intended for end-users. 
                    </p>
                    <p>
                    Hot wound values are now in place.
                    </p>
                    <ol>
                        <li>{'loadInitialState("Spring/Compression","US"),'}</li>
                        <li>{'changeName("HotWound"),'}</li>
                        <li>{'changeLabelsValue([\{name\: "COMMENT", value\: "Hot Wound Compression Spring Startup"\}]),'}</li>
                        <li>{'changeSymbolValue("OD_Free", 6.0),'}</li>
                        <li>{'changeSymbolValue("Wire_Dia", 0.625),'}</li>
                        <li>{'changeSymbolValue("L_Free", 10.0),'}</li>
                        <li>{'changeSymbolValue("Coils_T", 7.0),'}</li>
                        <li>{'changeSymbolValue("Force_1", 100.0),'}</li>
                        <li>{'changeSymbolValue("Force_2", 1200.0),'}</li>
                        <li>{'changeSymbolValue("Material_Type", 16),'}</li>
                        <li>{'changeSymbolValue("End_Type", 5),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Invoke the <b>File : Save </b> menu to save <b>HotWound</b> now.
                    </p>
                    <p>
                    In order to make the design available to all users as [ReadOnly],
                    make the value of the user field in the design table null.
                    </p>
                    <p>
                    When ready, use the "Exit" button to resume regular operation of the program.
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState("Spring/Compression","US"),
                changeName("HotWound"),
                changeLabelsValue([{name: "COMMENT", value: "Hot Wound Compression Spring Startup"}]),
                changeSymbolValue("OD_Free", 6.0),
                changeSymbolValue("Wire_Dia", 0.625),
                changeSymbolValue("L_Free", 10.0),
                changeSymbolValue("Coils_T", 7.0),
                changeSymbolValue("Force_1", 100.0),
                changeSymbolValue("Force_2", 1200.0),
                changeSymbolValue("Material_Type", 16),
                changeSymbolValue("End_Type", 5),
                startup(),
            ]
        }
    ]
}