import React from 'react';
import { changeSystemControlsValue } from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            text: (
                <React.Fragment>
                    <p>
                    Click Next to tweak these Preference values for improved Search precision.
                    </p>
                    
                    <p>
                    maxit = 190<br />
                    objmin = 0.000005<br />
                    delmin = 0.00001<br />
                    tol = 0.00001<br />
                    smallnum = 1e-8<br />
                    </p>
                    
                    <p>
                    Note: these changes may result in longer execution times for some Searches.
                    </p>
                </React.Fragment>
            )
        },
        {
            text: (
                <React.Fragment>
                    <b>New values:</b><br />
                    maxit = 190<br />
                    objmin = 0.000005<br />
                    delmin = 0.00001<br />
                    tol = 0.00001<br />
                    smallnum = 1e-8<br />
                    <br />
                    Reset original values with <b>File : Preferences</b> Restore Defaults<br />
                    Click Next to close.
                </React.Fragment>
            ),
            actions: [
                changeSystemControlsValue({maxit: 190, objmin: 0.000005, delmin: 0.00001, tol: 0.00001, smallnum: 1e-8})
            ]
        }
    ]
}
