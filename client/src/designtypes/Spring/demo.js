import React from 'react';
import { changeSymbolValue } from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            text: (
                <React.Fragment>
                    <p>The following example briefly illustrates the use of SpringSys to check
                    the design of a compression spring.  This example also appears in the
                    appendix to the SpringSys User's Manual.</p>
                    
                    <p>Refer to the session named LONGDEMO for a more detailed example of design
                    from original specifications.  DEMO6, DEMO7 and DEMO8 present examples of 
                    extension spring design.  Refer to the User's Manual and the various
                    tutorial sessions, TUTOR1, TUTOR2, ...  TUTOR9 for detailed instructions
                    on how to use SpringSys.</p>
                    
                    <p>To continue with this example, just strike the "Enter" key as you finish
                    reading each frame.  This key corresponds to the "carriage return" key
                    of a typewriter and may be marked with a down and left arrow that looks
                    like:   &lt;--'</p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue('OD_Free', 2.0),
                changeSymbolValue('Wire_Dia', 0.2)
            ]
        },
        {
            text: (
                <React.Fragment>
                    <p>Estimate the life of a compression spring of the specified dimensions
                    when subjected the given working lengths; determine corresponding forces,
                    stress levels, tendency to buckle, and other figures of merit for the
                    design.</p>
                    
                    wire diameter      = 0.0395 inches     Music wire  ASTM A228<br/>
                    outside diameter   = 0.357  inches     closed & ground ends<br/>
                    free length        = 0.807  inches<br/>
                    total coils        = 8.0    turns<br/>
                    <br/>
                    first load height  = 0.689 inches<br/>
                    second load height = 0.394 inches
                </React.Fragment>
            )
        }
    ]
}
