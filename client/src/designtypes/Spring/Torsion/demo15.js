import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    "name": "demo14",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                <React.Fragment>
                    <p>
                    This demo session compares torsion spring results produced by ODOP:Spring
                    to results published in a handbook. 
                    
                    This demo session works through a handbook design example and confirms that the 
                    </p>
                    
                    <p>
                    As opposed to a complete design exercise, 
                    this demo session is primarily a simple validation that the values produced by ODOP:Spring's torsion spring
                    calculations are in reasonable agreement with results published in a handbook.
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    </p>

                    <p>
                    Click Next to establish the necessary initialState.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 08",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    </p>
                    
                    <p>
                    This case appears in the
                    &nbsp; &nbsp; <b>SPRING DESIGNER'S HANDBOOK</b> &nbsp; &nbsp; by  Harold Carlson<br />
                    Published by  Marcel Dekker, Inc. &nbsp; &nbsp; 270 Madison Avenue &nbsp; &nbsp; New York, &nbsp; NY &nbsp; &nbsp; 10016<br />
                    <br />
                    Refer to  Problem 4  on page 212  of the 10th printing  (1978).
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Torsion'),
                changeLabelsValue([{name: 'COMMENT', value: 'Torsion Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 08",
            text: (
                <React.Fragment>
                <p>
                Problem 4 may be restated in a simplified form:<br/>
                Determine a standard wire diameter, working stress, number of coils and 
                other dimensions for a torsion spring 
                with appropriate clearance for working over a 21/32 (0.656) inch diameter rod
                A suggestion of a 0.75 inch inside diameter in the free condition is provided.
                </p>
                
                <table>
                    <tbody>
                        <tr><th>material</th><td>&nbsp;=</td><td>&nbsp;</td><td>music wire</td><td>&nbsp;</td></tr>
                        <tr><th>ends</th><td>&nbsp;=</td><td>&nbsp;</td><td>tangent</td><td>&nbsp;</td></tr>
                        <tr><th>inside diameter</th><td>~=</td><td>&nbsp;0.75</td><td>in.</td><td>(0.656 rod plus approx. 10% clearance)</td></tr>
                        <tr><th>Moment in loaded position</th><td>&nbsp;=</td><td>4.0</td><td>lb-in.</td><td>&nbsp;</td></tr>
                        <tr><th>Deflection to loaded position</th><td>&nbsp;=</td><td>200</td><td>degrees</td><td>&nbsp;</td></tr>
                        <tr><th>Coil Spacing</th><td>&nbsp;=</td><td>0.015</td><td>inches</td><td>&nbsp;</td></tr>
                    </tbody>
                </table>
                <br />
               
                <p>
                No information about arm length is provided.
                </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 08",
            text: (
                <React.Fragment>
                    <p>
                    The demo session has now entered a set of initial specifications for the problem. 
                    In summary, the changes were:<br />
                    <br />
                    CHANGE  Material_Type  MUSIC_WIRE<br />
                    <br />
                    FIX   M_1  0.0<br />
                    FIX   M_2  4.0<br />
                    FIX   ID_Free  0.75<br />
                    FIX   Deflect_2  200.0<br />
                    </p>
                    
                    <p>
                    This is a good time to scroll down and confirm these changes are now in place.
                    </p>
                    
                    <p>
                    A search will bring the remaining variables into alignment with these initial specifications.
                    Coil diameter is the primary element impacted here.
                    A search will run during the transition to the next page.
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Material_Type",2),
                fixSymbolValue('M_1', 0.0),
                fixSymbolValue('M_2', 4.0),
                fixSymbolValue('ID_Free', 0.75),
                fixSymbolValue('Deflect_2', 200.0)
            ]
        },
        {
            title: "Page 05 of 08",
            text: (
                <React.Fragment>
                    <p>
                    Now let's see what the search has achieved.
                    Don't forget to review the Report(s).
                    </p>

                    <p>
                    As expected, the design has achieved or come very close to the previously stated requirements for 
                    ID_Free, M_2 and Deflect_2.
                    The (uncorrected) value of stress is a good match to the handbook's value of 162,800 psi.
                    The value of Coils_T is slightly higher than the handbook's value of 7.04 coils.
                    Thus, the value of L_Body is also a bit higher than the handbook's value of 0.504 inch.
                    &nbsp;
                    <br />
                    </p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 06 of 08",
            text: (
                <React.Fragment>
                    <p>
                    The handbook solution used a standard wire diameter.
                    The <b>Action : Select Size</b> menu item can be used to select the nearest standard wire diameter.
                    You can experiment with that now.
                    </p>
                   
                    <p>
                     The handbook recommended a Coil_Spacing of 0.015 inch per coil.
                    Also, the handbook determined a curvature correction factor of 1.06 by reading it from a graph.
                    </p>
                    
                    <p>
                    In the process of transitioning to the next page, the demo session will
                    FIX a value of 0.063 inch on Wire_Dia,
                    adjust the value of Coil_Spacing,
                    change Heat_Treat to "Stress Relieve" in order to utilize a curvature correction factor
                    and then
                    run another search to re-establish corresponding values for all the other problem variables.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 08",
            text: (
                <React.Fragment>
                    <p>
                    The demo session has now imposed the values:<br /> 
                    FIX Wire_Dia 0.063<br /> 
                    CHANGE Coil_Spacing 0.015<br /> 
                    Change Heat_Treat "Stress Relieve"<br /> 
                    and executed another search.
                    </p>
                    <br />

                    <p>
                    The handbook solution produced:<br />
                         &nbsp; wire diameter  =  0.063 in.<br />
                         &nbsp; total coils    =  7.04   coils<br />
                         &nbsp; deflected inside diameter   = 0.6948 in.<br />
                         &nbsp; undeflected body length   = 0.594 in.<br />
                         &nbsp; stress (@ 4.0 lb-in) = 172,568 psi.
                    </p>
                    <p>
                    The two solutions are in reasonable agreement.
                    </p>
                   
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.063),
                changeSymbolValue("Coil_Spacing",0.015),
                changeSymbolValue("Heat_Treat",2),
                search()
            ]
        },
        {
            title: "Page 08 of 08 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    To see an exact comparison, 
                    the demo session will impose the handbook's values for all the Independent Variables.
                    </p>
                </React.Fragment>
            ),
            actions: [
            ]
        }
    ]
}