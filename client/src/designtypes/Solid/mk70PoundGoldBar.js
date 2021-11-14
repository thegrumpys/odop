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
            title: "Make 70PoundGoldBar model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Solid","US"),'}</li>
                        <li>{'changeName("70PoundGoldBar"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "70 pound gold bar.  "}]),'}</li>
                        <li>{'changeSymbolValue("Length",5.68517),'}</li>
                        <li>{'changeSymbolValue("Width",4.2),'}</li>
                        <li>{'changeSymbolValue("Height",4.2),'}</li>
                        <li>{'changeSymbolValue("Material",13),'}</li>
                        <li>{'changeSymbolValue("Density",0.698),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                </>
            ),
            actions: [
                loadInitialState("Solid","US"),
                changeName("70PoundGoldBar"),
                changeLabelsValue([{name: "COMMENT", value: "70 pound gold bar.  "}]),
                changeSymbolValue("Length",5.68517),
                changeSymbolValue("Width",4.2),
                changeSymbolValue("Height",4.2),
                changeSymbolValue("Material",13),
                changeSymbolValue("Density",0.698),
                startup(),
            ]
        }
    ]
}
