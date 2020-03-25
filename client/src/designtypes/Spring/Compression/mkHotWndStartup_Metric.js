import React from 'react';
import { changeSymbolValue, changeLabelsValue } from '../../../store/actionCreators';
export const execute = {
    "name": "mkHotWndStartup",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                <React.Fragment>
                    <p>
                    This session creates a metric Startup design optimized for 
                    large hot-wound compression springs.  
                    While it uses the Execute / Demo / Tutorial mechanism
                    associated with end-user training,
                    this session is not intended for end-users. 
                    </p>
                    
                    <p>
                    Rather than starting from initialState  
                    this session will rely on the user to open Startup_Metric.  
                    So, if you have entered any work of value that is not yet saved,
                    either exit or use the 
                    <b> File : Save </b> menu item to save your work before continuing.
                    </p>

                    <p>
                    Invoke the <b>File : Open </b> menu and load <b>Startup_Metric</b> now.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 04",
            text: (
                <React.Fragment>
                    <p>
                    Please confirm that this design is using metric units.
                    </p>
                    
                    <p>
                    The next step will impose the values associated with hot wound compression springs. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeLabelsValue([{name: 'COMMENT', value: 'Hot Wound Compression Spring - metric units'}])
            ]
        },
        {
            title: "Page 03 of 04",
            text: (
                <React.Fragment>
                    <p>
                    Hot wound values are now in place. 
                    Click Next when ready to continue.
                    </p>
                    <br /> <br />
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("OD_Free", 152.5),
                changeSymbolValue("Wire_Dia", 16.0),
                changeSymbolValue("L_Free", 250.0),
                changeSymbolValue("Coils_T", 7.0),
                changeSymbolValue("Force_1", 444.8),
                changeSymbolValue("Force_2", 6000.0),
                changeSymbolValue("Material_Type", 16),
                changeSymbolValue("End_Type", 5)
            ]
        },
        {
            title: "Page 04 of 04 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    Invoke the <b>File : Save As </b> menu and save <b>HotWoundMetric</b> now.
                    </p>
                    <p>
                    In order to make the design available to all users as [ReadOnly],
                    make the value of the user field in the design table null.
                    </p>
                    <p>
                    When ready, use the "Exit" button to resume regular operation of the program with the existing design.
                    </p>
                </React.Fragment>
            ),
            actions: [
//                placeholder
            ]
        }
    ]
}