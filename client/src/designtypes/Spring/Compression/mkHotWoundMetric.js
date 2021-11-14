import React from 'react';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    changeSymbolValue,
    changeSymbolConstraint,
    startup,
} from '../../../store/actionCreators';
import {
    MAX,
} from '../../../store/actionTypes';
export const execute = {
    "name": "mkHotWoundMetric",
    "steps": [
        {
            title: "Make HotWoundMetric model",
            "name": "page0x",
            text: (
                <>
                    <p>
                    This session creates a metric Startup design optimized for 
                    designing large hot-wound compression springs.  
                    While it uses the Execute / Demo / Tutorial mechanism
                    associated with end-user training,
                    this session is not intended for end-users. 
                    </p>
                    <p>
                    Hot wound values are now in place.
                    </p>
                    <ol>
                        <li>{'loadInitialState("Spring/Compression","Metric"),'}</li>
                        <li>{'changeName("HotWoundMetric"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Hot Wound Compression Spring - metric units"}]),'}</li>
                        <li>{'changeSymbolValue("OD_Free", 152.5),'}</li>
                        <li>{'changeSymbolValue("L_Free", 250.0),'}</li>
                        <li>{'changeSymbolValue("Wire_Dia", 16.0),'}</li>
                        <li>{'changeSymbolValue("Coils_T", 7.0),'}</li>
                        <li>{'changeSymbolValue("Force_1", 444.8),'}</li>
                        <li>{'changeSymbolValue("Force_2", 6000.0),'}</li>
                        <li>{'changeSymbolValue("Material_Type", 16),'}</li>
                        <li>{'changeSymbolValue("End_Type", 5),'}</li>
                        <li>{'changeSymbolConstraint("Force_1", MAX, 500.),'}</li>
                        <li>{'changeSymbolConstraint("Force_2", MAX, 10000.),'}</li>
                        <li>{'changeSymbolConstraint("L_Solid", MAX, 500.),'}</li>
                        <li>{'changeSymbolConstraint("Force_Solid", MAX, 10000.),'}</li>
                        <li>{'changeSymbolConstraint("Cycle_Life", MAX, 10000000),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Invoke the <b>File : Save </b> menu to save <b>HotWoundMetric</b> now.
                    </p>
                    <p>
                    In order to make the design available to all users as [ReadOnly],
                    make the value of the user field in the design table null.
                    </p>
                    <p>
                    When ready, use the "Exit" button to resume regular operation of the program.
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Spring/Compression","Metric"),
                changeName("HotWoundMetric"),
                changeLabelsValue([{name: "COMMENT", value: "Hot Wound Compression Spring - metric units"}]),
                changeSymbolValue("OD_Free", 152.5),
                changeSymbolValue("Wire_Dia", 16.0),
                changeSymbolValue("L_Free", 250.0),
                changeSymbolValue("Coils_T", 7.0),
                changeSymbolValue("Force_1", 444.8),
                changeSymbolValue("Force_2", 6000.0),
                changeSymbolValue("Material_Type", 16),
                changeSymbolValue("End_Type", 5),
                changeSymbolConstraint("Force_1", MAX, 500.),
                changeSymbolConstraint("Force_2", MAX, 10000.),
                changeSymbolConstraint("L_Solid", MAX, 500.),
                changeSymbolConstraint("Force_Solid", MAX, 10000.),
                changeSymbolConstraint("Cycle_Life", MAX, 10000000),
                startup(),
            ]
        }
    ]
}