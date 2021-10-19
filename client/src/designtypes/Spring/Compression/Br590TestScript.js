import React from 'react';
import { changeLabelsValue, changeSymbolConstraint, changeSymbolValue, changeSystemControlsValue, loadInitialState, logUsage, search, setSymbolFlag } from '../../../store/actionCreators';
import { MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    This is the Branch 590 test script. 
                    It provides multiple test cases where in ODOP:Spring v4.0.x  
                    a search started from a valid start point will produce a not-valid result.
                    </p>
                    
                    <p>
                    Case 1:  Negative Wire_Dia
                    </p>
                    
                    <p>
                    Click Next to: 
                    <br />
                     - load compression spring initialState<br /> 
                     - change the value of Wire_Dia to 0.4 inch<br /> 
                     - increase the default maxit to 600 
                     </p>
                    
                    <p>
                     Otherwise, click Exit to close.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of xxx",
            text: (
                <React.Fragment>
                    <p>
                    Compression spring initialState has been loaded.
                    </p>
                    
                    <p>
                    <b>New values:</b><br />
                    Wire_Dia = 0.4 inch<br /> 
                    maxit = 600<br />
                    <br />
                    </p>
                    
                    <p>
                    Click Next for Search or Exit to close.
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("Wire_Dia", 0.4),
                changeLabelsValue([{name: 'COMMENT', value: 'Branch 590 test script'}]),
                changeSystemControlsValue({maxit: 600})
            ]
        },
        {
            title: "Page 03 of xxx",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. 
                    Take a moment to scroll through and view the values.
                    </p>
                    
                    <p>
                    Observe that values of Wire_Dia and other variables are negative.
                    </p>
                    
                    <p>
                    In ODOP:Spring v4.0.x additional searches do not resolve that situation.
                    </p>
                    
                    <p>
                     Click Next to move on to the next case or Exit to close.
                    </p>
                </React.Fragment>
            ),
            actions: [
                logUsage('event','Br590TestScript', { 'event_label': 'Page 03 of xxx' }),
                search()
            ]
        },
        {
            title: "Page 04 of xxx",
            text: (
                <React.Fragment>
                    <p>
                    Case 2:  Negative Coils_A
                    </p>
                    
                    <p>
                    Compression spring initialState has been loaded.
                    </p>
                    
                    <p>
                    <b>New values:</b><br />
                    OD_Free = 91.1 inches<br /> 
                    <br />
                    </p>
                    
                    <p>
                    Click Next for Search or Exit to close.
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("OD_Free", 91.1)
            ]
        },
        {
            title: "Page 05 of xxx",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. 
                    Take a moment to scroll through and view the values.
                    </p>
                    
                    <p>
                    Observe that value of Coils_A is invalid (negative).  
                    Other variables are negative
                    </p>
                    
                    <p>
                    In ODOP:Spring v4.0.x additional searches do not make progress towards a feasible design.  It's stuck..
                    </p>
                    
                    <p>
                     Click Next to move on to the next case or Exit to close.
                    </p>
                </React.Fragment>
            ),
            actions: [
                logUsage('event','Br590TestScript', { 'event_label': 'Page 05 of xxx' }),
                search()
            ]
        },
        {
            title: "Page 06 of xxx",
            text: (
                <React.Fragment>
                    <p>
                    Case 3:  Negative ID_Free
                    </p>
                    
                    <p>
                    Compression spring initialState has been loaded.
                    </p>
                    
                    <p>
                    <b>New values:</b><br />
                    OD_Free = 11.1 inches<br /> 
                    Spring_Index MAX 1.6
                    <br />
                    </p>
                    
                    <p>
                    Click Next for Search or Exit to close.
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("OD_Free", 11.1),
                setSymbolFlag('Spring_Index', MAX, CONSTRAINED),
                changeSymbolConstraint('Spring_Index', MAX, 1.6)
            ]
        },
        {
            title: "Page 07 of xxx",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. 
                    Take a moment to scroll through and view the values.
                    </p>
                    
                    <p>
                    Observe that value of ID_Free is invalid (negative).  
                    Other variables are negative
                    </p>
                    
                    <p>
                    In ODOP:Spring v4.0.x additional searches do not make progress towards a feasible design.  It's stuck..
                    </p>
                    
                    <p>
                     This was the last case. Click Exit to close.
                    </p>
                </React.Fragment>
            ),
            actions: [
                logUsage('event','Br590TestScript', { 'event_label': 'Page 07 of xxx' }),
                search()
            ]
        }
    ]
}
