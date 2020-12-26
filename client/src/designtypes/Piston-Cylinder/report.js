import React from 'react';
import DesignTable from "../../components/DesignTable"

export function getReportNames() {
//    console.log('In getReportNames');
    return [
        { name: "View0", title: 'Design', component: <DesignTable /> },
    ];
}
