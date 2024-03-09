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
    changeSymbolConstraint,
    changeSymbolValue,
    setSymbolFlag,
    startup,
} from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Make US units Startup model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Solid","US"),'}</li>
                        <li>{'changeName("Startup"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Rectangular Solid default start point - US units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "Startup".
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Solid","US"),
                changeName("Startup"),
                changeLabelsValue([{name: "COMMENT", value: "Rectangular Solid default start point - US units ..."}]),
                startup(),
            ]
        },
       {
            title: "Make metric units Startup model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Solid","Metric"),'}</li>
                        <li>{'changeName("Startup_Metric"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "Rectangular Solid default start point - Metric units ..."}]),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "Startup_Metric".
                    </p>
                </>
            ),
            actions: [
                loadInitialState("Solid","Metric"),
                changeName("Startup_Metric"),
                changeLabelsValue([{name: "COMMENT", value: "Rectangular Solid default start point - Metric units ..."}]),
                startup(),
            ]
        },
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
                    <p>
                    Ready to save with the name "70PoundGoldBar".
                    </p>
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
        },
        {
            title: "Make StandardGoldBar model",
            text: (
                <>
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
                    <p>
                    Ready to save with the name "StandardGoldBar".
                    </p>
                </>
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
        },
        {
            title: "Make USPS_MachinableParcels model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Solid","US"),'}</li>
                        <li>{'changeName("USPS_MachinableParcels"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "USPS Machinable Parcel dimensions"}]),'}</li>
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
                    <p>
                    Ready to save with the name "USPS_MachinableParcels".
                    </p>
                </>
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
        },
        {
            title: "Make USPS_MaxVolume model",
            text: (
                <>
                    <p>Setting the following symbol table actions:</p>
                    <ol>
                        <li>{'loadInitialState("Solid","US"),'}</li>
                        <li>{'changeName("USPS_MaxVolume"),'}</li>
                        <li>{'changeLabelsValue([{name: "COMMENT", value: "USPS maximum volume given max 108 inches length + girth "}]),'}</li>
                        <li>{'changeSymbolValue("Length",36),'}</li>
                        <li>{'changeSymbolValue("Width",18),'}</li>
                        <li>{'changeSymbolValue("Height",18),'}</li>
                        <li>{'changeSymbolValue("Material",3),'}</li>
                        <li>{'changeSymbolValue("Density",0.00004334),'}</li>
                        <li>{'startup(),'}</li>
                    </ol>
                    <p>
                    Ready to save with the name "USPS_MaxVolume".
                    </p>
                </>
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
