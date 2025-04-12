import React from 'react';
import DesignTable from "../../../components/DesignTable"
import ReportBase from './ReportBase';
import Calculator from "./Calculator"
import Report1 from "./Report1"
import Report2 from "./Report2"
import Report3 from "./Report3"

export function getViewNames() {
    return [
        { name: "Advanced", title: 'Advanced', component: <DesignTable /> },
        { name: "Calculator", title: 'Calculator', component: <ReportBase><Calculator /></ReportBase> },
        { name: "Report1", title: 'Report 1 (mini)', component: <ReportBase><Report1 /></ReportBase> },
        { name: "Report2", title: 'Report 2 (stress; pre-set)', component: <ReportBase><Report2 /></ReportBase> },
        { name: "Report3", title: 'Report 3 (maxi)', component: <ReportBase><Report3 /></ReportBase> },
    ];
}
