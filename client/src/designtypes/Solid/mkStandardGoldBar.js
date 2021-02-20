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
            title: "Make StandardGoldBar model",
            text: (
                <React.Fragment>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Solid","US"),'}</li>
                        <li>{'changeName("StandardGoldBar"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "The US standard gold bar is not a rectangular solid.  It has sloped sides.  The dimensions here are a rough approximation."}]),'}</li>
                        <li>{'changeSymbolValue("Length",7),'}</li>
                        <li>{'changeSymbolValue("Width",3.625),'}</li>
                        <li>{'changeSymbolValue("Height",1.75),'}</li>
                        <li>{'changeSymbolValue("Material",13),'}</li>
                        <li>{'changeSymbolValue("Density",0.698),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                </React.Fragment>
            ),
            actions: [
                loadInitialState("Solid","US"),
                changeName("StandardGoldBar"),
                changeLabelsValue([{name: "COMMENT", value: "The US standard gold bar is not a rectangular solid.  It has sloped sides.  The dimensions here are a rough approximation."}]),
                changeSymbolValue("Length",7),
                changeSymbolValue("Width",3.625),
                changeSymbolValue("Height",1.75),
                changeSymbolValue("Material",13),
                changeSymbolValue("Density",0.698),
                startup(),
            ]
        }
    ]
}
