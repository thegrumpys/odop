import React from 'react';
import { changeSymbolValue, loadInitialState, changeLabelsValue } from '../../../store/actionCreators';
export const execute = {
    "name": "mkHotWndStartup",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                <React.Fragment>
                    <p>
                    Starting from initialState, this session creates a Startup design 
                    optimized for large hot-wound compression springs.  
                    While it uses the Execute / Demo / Tutorial mechanism
                    associated with end-user training,
                    this session is not intended for end-users. 
                    </p>
                    
                    <p>
                    This session provides an alternative approach to maintaining the 
                    desired designs across releases that impact initialState.
                    Perhaps it will work out as a way to avoid coding migrations.
                    </p>
                    
                    <p>
                    As with the most tutorial and demo sessions, 
                    this session will start from the compression spring initialState.  
                    So, if you have entered any work of value that is not yet saved,
                    either exit or use the 
                    <b> File : Save </b> menu item to save your work before continuing.
                    </p>

                    <p>
                    Click Next to establish the necessary initialState.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 04",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this session are now established.
                    </p>
                    
                    <p>
                    The next step will impose the values associated with hot wound compression springs. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Hot Wound Compression Spring Startup'}])
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
                changeSymbolValue("OD_Free", 6.0),
                changeSymbolValue("Wire_Dia", 0.625),
                changeSymbolValue("L_Free", 10.0),
                changeSymbolValue("Coils_T", 7.0),
                changeSymbolValue("Force_1", 100.0),
                changeSymbolValue("Force_2", 1200.0),
                changeSymbolValue("Material_Type", 16),
                changeSymbolValue("End_Type", 5)
            ]
        },
        {
            title: "Page 04 of 04 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    Invoke the <b>File : Save As </b> menu and save <b>HotWound</b> now.
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