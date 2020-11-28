import React from 'react';
import * as o from './symbol_table_offsets';
import * as mo from '../mat_ips_offsets';
import Report1 from "./Report1"
import Report2 from "./Report2"
import Report3 from "./Report3"

export function getReportNames() {
    // Note: report names must match cases in switch statement below
    return [
        { name: '1 (mini)', component: <Report1 /> },
        { name: '2 (pre-set)', component: <Report2 /> },
        { name: '3 (maxi)', component: <Report3 /> },
    ];
}
