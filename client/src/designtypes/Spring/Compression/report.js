import React from 'react';
import * as o from './symbol_table_offsets';
import * as mo from '../mat_ips_offsets';
import DesignTable from "../../../components/DesignTable"
import Calculator from "./Calculator"
import Report1 from "./Report1"
import Report2 from "./Report2"
import Report3 from "./Report3"

export function getReportNames() {
    return [
        { name: "View0", title: 'Advanced', component: <DesignTable /> },
        { name: "View1", title: 'Calculator', component: <Calculator /> },
        { name: "View2", title: 'Report 1 (mini)', component: <Report1 /> },
        { name: "View3", title: 'Report 2 (pre-set)', component: <Report2 /> },
        { name: "View4", title: 'Report 3 (maxi)', component: <Report3 /> },
    ];
}
