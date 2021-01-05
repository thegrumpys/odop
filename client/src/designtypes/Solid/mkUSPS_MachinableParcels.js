import React from 'react';
import {
    MIN,
    MAX,
    CONSTRAINED,
} from '../../store/actionTypes';
import {
    loadInitialState,
    changeName,
    changeLabelsValue,
    changeSymbolValue,
    setSymbolFlag,
    changeSymbolConstraint,
    startup,
} from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Make USPS_MachinableParcels model",
            text: (
                <React.Fragment>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Solid","US"),'}</li>
                        <li>{'changeName("USPS_MachinableParcels"),'}</li>
                        <li>{'changeLabelsValue([\{name\: "COMMENT", value\: "USPS Machinable Parcel dimensions"\}]),'}</li>
                        <br />
                        <li>{'changeSymbolValue("Length",27),'}</li>
                        <li>{'setSymbolFlag("Length", MIN, CONSTRAINED),'}</li>
                        <li>{'changeSymbolConstraint("Length", MIN, 6),'}</li>
                        <li>{'setSymbolFlag("Length", MAX, CONSTRAINED),'}</li>
                        <li>{'changeSymbolConstraint("Length", MAX, 27),'}</li>
                        <br />
                        <li>{'changeSymbolValue("Width",17),'}</li>
                        <li>{'setSymbolFlag("Width", MIN, CONSTRAINED),'}</li>
                        <li>{'changeSymbolConstraint("Width", MIN, 3),'}</li>
                        <li>{'setSymbolFlag("Width", MAX, CONSTRAINED),'}</li>
                        <li>{'changeSymbolConstraint("Width", MAX, 17),'}</li>
                        <br />
                        <li>{'changeSymbolValue("Height",17),'}</li>
                        <li>{'setSymbolFlag("Height", MIN, CONSTRAINED),'}</li>
                        <li>{'changeSymbolConstraint("Height", MIN, 0.25),'}</li>
                        <li>{'setSymbolFlag("Height", MAX, CONSTRAINED),'}</li>
                        <li>{'changeSymbolConstraint("Height", MAX, 17),'}</li>
                        <br />
                        <li>{'setSymbolFlag("Weight", MIN, CONSTRAINED),'}</li>
                        <li>{'changeSymbolConstraint("Weight", MIN, 0.375),'}</li>
                        <li>{'setSymbolFlag("Weight", MAX, CONSTRAINED),'}</li>
                        <li>{'changeSymbolConstraint("Weight", MAX, 25),'}</li>
                        <br />
                        <li>{'changeSymbolValue("Material",4),'}</li>
                        <li>{'changeSymbolValue("Density",0.0001237),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                </React.Fragment>
            ),
            actions: [
                loadInitialState("Solid","US"),
                changeName("USPS_MachinableParcels"),
                changeLabelsValue([{name: "COMMENT", value: "USPS Machinable Parcel dimensions"}]),
                
                changeSymbolValue("Length",27),
                setSymbolFlag("Length", MIN, CONSTRAINED),
                changeSymbolConstraint("Length", MIN, 6),
                setSymbolFlag("Length", MAX, CONSTRAINED),
                changeSymbolConstraint("Length", MAX, 27),
                
                changeSymbolValue("Width",17),
                setSymbolFlag("Width", MIN, CONSTRAINED),
                changeSymbolConstraint("Width", MIN, 3),
                setSymbolFlag("Width", MAX, CONSTRAINED),
                changeSymbolConstraint("Width", MAX, 17),
                
                changeSymbolValue("Height",17),
                setSymbolFlag("Height", MIN, CONSTRAINED),
                changeSymbolConstraint("Height", MIN, 0.25),
                setSymbolFlag("Height", MAX, CONSTRAINED),
                changeSymbolConstraint("Height", MAX, 17),
                
                setSymbolFlag("Weight", MIN, CONSTRAINED),
                changeSymbolConstraint("Weight", MIN, 0.375),
                setSymbolFlag("Weight", MAX, CONSTRAINED),
                changeSymbolConstraint("Weight", MAX, 25),
                
                changeSymbolValue("Material",4),
                changeSymbolValue("Density",0.0001237),
                startup(),
            ]
        }
    ]
}
