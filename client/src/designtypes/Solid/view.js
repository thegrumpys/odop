import React from 'react';
import DesignTable from "../../components/DesignTable"

export function getViewNames() {
//    console.log('In getViewNames');
    return [
        { name: "Advanced", title: 'Design', component: <DesignTable /> },
    ];
}
