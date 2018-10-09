import React from 'react';
import { changeSystemControlsValue } from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            text: (
                <React.Fragment>
                    <p>
                    Click Next to tweak Preference values for improved Search precision.
                    </p>
                    
                    <p>
                    Note: these changes may result in longer execution times for Search.
                    </p>
                    
                    <p>
                    &nbsp;
                    </p>
                </React.Fragment>
            )
        },
        {
            text: (
                <React.Fragment>
                    Changes imposed are:<br />
                    maxit = 190<br />
                </React.Fragment>
            ),
            actions: [
                changeSystemControlsValue({maxit: 190})
            ]
        }
    ]
}
