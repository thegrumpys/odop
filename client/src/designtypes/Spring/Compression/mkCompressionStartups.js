import React from 'react';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    changeSymbolConstraint,
    changeSymbolValue,
    startup,
} from '../../../store/actionCreators';
import {
    MAX,
} from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Make US units Startup model",
            text: (
                <>
                    <p>
                    This session creates a set of compression spring Startup designs 
                    including US and metric units for both default spring designs 
                    and optimized for designing large hot-wound compression springs. 
                    While this session uses the Execute / Demo / Tutorial mechanism 
                    associated with end-user training, it is not intended for end-users. 
                    </p>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Spring/Compression","US"),'}</li>
                        <li>{'changeName("Startup"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Compression Spring default start point - US units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Confirm that you are logged in and then 
                    invoke the <b>File : Save </b> menu to save with the name <b>"Startup"</b> now.
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Spring/Compression","US"),
                changeName("Startup"),
                changeLabelsValue([{name: "COMMENT", value: "Compression Spring default start point - US units ..."}]),
                startup(),
            ]
        },
        {
            title: "Make metric units Startup model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Spring/Compression","Metric"),'}</li>
                        <li>{'changeName("Startup_Metric"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Compression Spring default start point - Metric units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "Startup_Metric".
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Spring/Compression","Metric"),
                changeName("Startup_Metric"),
                changeLabelsValue([{name: "COMMENT", value: "Compression Spring default start point - Metric units ..."}]),
                startup(),
            ]
        },
        {
            title: "Make US units HotWound Startup model",
            text: (
                <>
                    <p>
                    US units HotWound values are now in place.
                    </p>
                    <ol>
                        <li>{'loadInitialState("Spring/Compression","US"),'}</li>
                        <li>{'changeName("HotWound"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Hot Wound Compression Spring - US units"}]),'}</li>
                        <li>{'changeSymbolValue("OD_Free", 6.0),'}</li>
                        <li>{'changeSymbolValue("Wire_Dia", 0.625),'}</li>
                        <li>{'changeSymbolValue("L_Free", 10.0),'}</li>
                        <li>{'changeSymbolValue("Coils_T", 7.0),'}</li>
                        <li>{'changeSymbolValue("Force_1", 400.0),'}</li>
                        <li>{'changeSymbolValue("Force_2", 1200.0),'}</li>
                        <li>{'changeSymbolValue("Material_Type", 16),'}</li>
                        <li>{'changeSymbolValue("End_Type", 5),'}</li>
                        <li>{'changeSymbolConstraint("Force_1", MAX, 200.),'}</li>
                        <li>{'changeSymbolConstraint("Force_2", MAX, 5000.),'}</li>
                        <li>{'changeSymbolConstraint("Rate", MAX, 500.),'}</li>
                        <li>{'changeSymbolConstraint("Weight", MAX, 100.),'}</li>
                        <li>{'changeSymbolConstraint("Force_Solid", MAX, 5000.),'}</li>
                        <li>{'changeSymbolConstraint("Cycle_Life", MAX, 10000000),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name <b>HotWound</b> now.
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Spring/Compression","US"),
                changeName("HotWound"),
                changeLabelsValue([{name: "COMMENT", value: "Hot Wound Compression Spring - US units"}]),
                changeSymbolValue("OD_Free", 6.0),
                changeSymbolValue("Wire_Dia", 0.625),
                changeSymbolValue("L_Free", 10.0),
                changeSymbolValue("Coils_T", 7.0),
                changeSymbolValue("Force_1", 400.0),
                changeSymbolValue("Force_2", 1200.0),
                changeSymbolValue("Material_Type", 16),
                changeSymbolValue("End_Type", 5),
                changeSymbolConstraint("Force_1", MAX, 200.),
                changeSymbolConstraint("Force_2", MAX, 5000.),
                changeSymbolConstraint("Rate", MAX, 500.),
                changeSymbolConstraint("Weight", MAX, 100.),
                changeSymbolConstraint("Force_Solid", MAX, 5000.),
                changeSymbolConstraint("Cycle_Life", MAX, 10000000),
                startup(),
            ]
        },
        {
            title: "Make metric units HotWoundMetric Startup model",
            text: (
                <>
                    <p>
                    Metric units HotWoundMetric values are now in place.
                    </p>
                    <ol>
                        <li>{'loadInitialState("Spring/Compression","Metric"),'}</li>
                        <li>{'changeName("HotWoundMetric"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Hot Wound Compression Spring - Metric units"}]),'}</li>
                        <li>{'changeSymbolValue("OD_Free", 152.5),'}</li>
                        <li>{'changeSymbolValue("L_Free", 250.0),'}</li>
                        <li>{'changeSymbolValue("Wire_Dia", 16.0),'}</li>
                        <li>{'changeSymbolValue("Coils_T", 7.0),'}</li>
                        <li>{'changeSymbolValue("Force_1", 1780),'}</li>
                        <li>{'changeSymbolValue("Force_2", 5300.0),'}</li>
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
                    Ready to save with the name <b>HotWoundMetric</b> now.
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
                loadInitialState("Spring/Compression","Metric"),
                changeName("HotWoundMetric"),
                changeLabelsValue([{name: "COMMENT", value: "Hot Wound Compression Spring - Metric units"}]),
                changeSymbolValue("OD_Free", 152.5),
                changeSymbolValue("Wire_Dia", 16.0),
                changeSymbolValue("L_Free", 250.0),
                changeSymbolValue("Coils_T", 7.0),
                changeSymbolValue("Force_1", 1780),
                changeSymbolValue("Force_2", 5300.0),
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
