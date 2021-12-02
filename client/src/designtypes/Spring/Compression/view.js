import React from 'react';
import DesignTable from "../../../components/DesignTable"
import Calculator from "./Calculator"
import Report1 from "./Report1"
import Report2 from "./Report2"
import Report3 from "./Report3"

export function getViewNames() {
    return [
        { name: "Advanced", title: 'Advanced', component: <DesignTable /> },
        { name: "Calculator", title: 'Calculator', component: <Calculator /> },
        { name: "Report1", title: 'Report 1 (mini)', component: <Report1 /> },
        { name: "Report2", title: 'Report 2 (stress; pre-set)', component: <Report2 /> },
        { name: "Report3", title: 'Report 3 (maxi)', component: <Report3 /> },
    ];
}
