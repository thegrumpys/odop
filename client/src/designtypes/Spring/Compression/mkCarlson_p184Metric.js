import React from 'react';
import {
    MIN,
    MAX,
    FIXED,
    CONSTRAINED,
} from '../../../store/actionTypes';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    fixSymbolValue,
    setSymbolFlag,
    changeSymbolValue,
    changeSymbolConstraint,
    startup,
    search,
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
                        <li>{'changeName("Carlson_p184Metric"),'}</li>
                        <li>{'changeLabelsValue([\{name\: "COMMENT", value\: "Carlson p184 - metric units"\}]),'}</li>
                        <li>{'fixSymbolValue("OD_Free", 25),'}</li>
                        <li>{'fixSymbolValue("Wire_Dia", 3),'}</li>
                        <li>{'fixSymbolValue("L_Free", 82),'}</li>
                        <li>{'changeSymbolValue("Coils_T",12.5),'}</li>
                        <li>{'fixSymbolValue("Force_2",267),'}</li>
                        <li>{'fixSymbolValue("L_2", 43.809418537708694)'}</li>
                        <li>{'changeSymbolValue("L_Solid",37.5),'}</li>
                        <li>{'setSymbolFlag("L_Solid", MAX, CONSTRAINED),'}</li>
                        <li>{'changeSymbolValue("Prop_Calc_Method",2),'}</li>
                        <li>{'changeSymbolValue("Material_Type",3),'}</li>
                        <li>{'changeSymbolValue("Torsion_Modulus",77200),'}</li>
                        <li>{'changeSymbolValue("Tensile",1584.2274693883196),'}</li>
                        <li>{'startup(),'}</li>
                        <li>{'search(),'}</li>
                    </ol>
                </React.Fragment>
            ),
            actions: [
                loadInitialState("Spring/Compression","Metric"),
                changeName("Carlson_p184Metric"),
                changeLabelsValue([{name: "COMMENT", value: "Carlson p184 - metric units"}]),
                fixSymbolValue("OD_Free", 25),
                fixSymbolValue("Wire_Dia", 3),
                fixSymbolValue("L_Free", 82),
                changeSymbolValue("Coils_T",12.5),
                fixSymbolValue("Force_2", 267),
                fixSymbolValue("L_2", 43.809418537708694),
                changeSymbolValue("L_Solid",37.5),
                setSymbolFlag("L_Solid", MAX, CONSTRAINED),
                changeSymbolValue("Prop_Calc_Method",2),
                changeSymbolValue("Material_Type",3),
                changeSymbolValue("Torsion_Modulus",77200),
                changeSymbolValue("Tensile",1584.2274693883196),
                startup(),
                search(),
            ]
        }
    ]
}
