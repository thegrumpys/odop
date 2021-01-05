import React from 'react';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    changeSymbolValue,
    startup,
} from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Make USPS_MaxVolume model",
            text: (
                <React.Fragment>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Solid","US"),'}</li>
                        <li>{'changeName("USPS_MaxVolume"),'}</li>
                        <li>{'changeLabelsValue([\{name\: "COMMENT", value\: "USPS maximum volume given max 108 inches length + girth "\}]),'}</li>
                        <li>{'changeSymbolValue("Length",36),'}</li>
                        <li>{'changeSymbolValue("Width",18),'}</li>
                        <li>{'changeSymbolValue("Height",18),'}</li>
                        <li>{'changeSymbolValue("Material",3),'}</li>
                        <li>{'changeSymbolValue("Density",0.00004334),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                </React.Fragment>
            ),
            actions: [
                loadInitialState("Solid","US"),
                changeName("USPS_MaxVolume"),
                changeLabelsValue([{name: "COMMENT", value: "USPS maximum volume given max 108 inches length + girth "}]),
                changeSymbolValue("Length",36),
                changeSymbolValue("Width",18),
                changeSymbolValue("Height",18),
                changeSymbolValue("Material",3),
                changeSymbolValue("Density",0.00004334),
                startup(),
            ]
        }
    ]
}
