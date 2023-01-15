import React from 'react';
import DesignTable from "../../components/DesignTable"
import Calculator from "./Calculator"

export function getViewNames() {
    return [
        { name: "Advanced", title: 'Advanced', component: <DesignTable /> },
        { name: "Calculator", title: 'Calculator', component: <Calculator /> },
    ];
}
