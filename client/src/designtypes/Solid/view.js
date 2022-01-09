import React from 'react';
import DesignTable from "../../components/DesignTable"
import MinMaxSeekView from "../../components/MinMaxSeekView"

export function getViewNames() {
//    console.log('In getViewNames');
    return [
        { name: "Advanced", title: 'Design', component: <DesignTable /> },
        { name: "MinMaxSeek", title: 'MinMaxSeek', component: <MinMaxSeekView /> },
    ];
}
