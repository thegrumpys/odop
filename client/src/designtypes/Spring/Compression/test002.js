import React from 'react';
import { changeSymbolValue } from '../../../store/modelSlice';
export const execute = {
    "name": "test001",
    "steps": [
        {
            title: "Page 01 of 02",
            text: (
                <>
                    Start Performance recording now
                    <br />
                </>
            ),
        },
        {
            title: "Page 02 of 02",
            text: (
                <>
                    CHANGE OD_Free 1.2<br />
                    <br />
                </>
            ),
            actions: [
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2),
                changeSymbolValue("OD_Free",1.2)
            ]
        }
    ]
}