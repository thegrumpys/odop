import React from 'react';
import { changeSystemControlsValue } from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            text: (
                <>
                    <p>
                    Click Next to use these Preference values for improved Search precision.
                    </p>

                    <p>
                    maxit = 1000<br />
                    objmin = 0.000001<br />
                    delmin = 0.00001<br />
                    tol = 0.00001<br />
                    smallnum = 1e-8<br />
                    </p>

                    <p>
                    Note: these changes may result in longer execution times for some Searches.
                    </p>
                </>
            )
        },
        {
            text: (
                <>
                    <b>New values:</b><br />
                    maxit = 1000<br />
                    objmin = 0.000001<br />
                    delmin = 0.00001<br />
                    tol = 0.00001<br />
                    smallnum = 1e-8<br />
                    <br />
                    Reset original values with <b>File : Preferences</b> Restore Defaults<br />
                    Click Close to end.
                </>
            ),
            actions: [
                changeSystemControlsValue({maxit: 1000, objmin: 0.000001, delmin: 0.00001, tol: 0.00001, smallnum: 1e-8})
            ]
        }
    ]
}
