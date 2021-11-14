import React from 'react';
import { changeSymbolValue, fixSymbolValue, loadInitialState, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { changeSystemControlsValue } from '../../../store/actionCreators';
export const execute = {
    "name": "demo9",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                <>
                    <p>
                    The following example briefly illustrates the use of ODOP:Spring in
                    the design of an extension spring. 
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
                </>
            )
        },
        {
            title: "Page 02 of 09",
            text: (
                <>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    </p>
                    
                    <p>This problem appears in the&nbsp; SPRING DESIGNER'S HANDBOOK &nbsp; &nbsp; by &nbsp;Harold Carlson<br />
                    <br />
                    Published by:<br />
                        &nbsp; &nbsp; Marcel Dekker, Inc.<br />
                        &nbsp; &nbsp; 270 Madison Avenue<br />
                        &nbsp; &nbsp; New York,  NY    10016<br />
                    <br />
                    Refer to Problem 3 &nbsp; on page 202 &nbsp;of the 10th printing &nbsp; (1978).
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Extension'),
                changeLabelsValue([{name: 'COMMENT', value: 'Extension Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 09",
            text: (
                <>
                <p>
                Before making any changes to our initialState, the design problem may be restated in a simplified form:<br />
                <br />
                Problem 3: &nbsp; Design an extension spring such that the following specifications are met:
                </p>
                
                <table>
                    <tbody>
                        <tr><th>material</th><td>&nbsp;=</td><td colSpan="2">&nbsp;oil tempered MB wire</td><td>&nbsp;ASTM A229</td><td>&nbsp;</td></tr>
                        <tr><th>ends</th><td>&nbsp;=</td><td colSpan="2">&nbsp;regular full hooks</td><td>&nbsp;over center</td><td>&nbsp;</td></tr>
                        <tr><th>outside diameter</th><td>&nbsp;=</td><td>&nbsp;0.5</td><td>in.</td><td>&nbsp;</td></tr>
                        <tr><th>free length</th><td>&nbsp;=</td><td>&nbsp;2.938</td><td>in.</td><td>&nbsp;(inside hooks)</td></tr>
                        <tr><th>force</th><td>&nbsp;=</td><td>15.0</td><td>pounds</td><td>&nbsp;(incl. initial tension)</td></tr>
                        <tr><th>at length</th><td>&nbsp;=</td><td>&nbsp;4.688</td><td>in.</td><td>&nbsp;(inside hooks)</td></tr>
                    </tbody>
                </table>
                <br />
               
                <p>
                Determine (a standard) wire size, stress, and number of coils.
                </p>
                </>
            )
        },
        {
            title: "Page 04 of 09",
            text: (
                <>
                    <p>
                    Carlson's Figure 128 indicates that the length added by the hook at each
                    end should be 75-85 % of a body inside diameter.  
                    So, we'll select an End_Type of 75%_Hook to start.
                    </p>

                    <p>
                    The change will be applied in the process of transitioning to the next page.
                    <br /><br />
                    </p>
                </>
            ),
            actions: [
            ]
        },
        {
            title: "Page 05 of 09",
            text: (
                <>
                    <p>
                    The demo session has now entered what is known about the problem.<br /> 
                    <br />
                    In summary, the changes were:<br />
                    &nbsp; CHANGE  Material_Type  OIL_TEMPERED_MB<br />
                    &nbsp; CHANGE  End_Type  75%_Hook<br />
                    &nbsp; FIX  OD_Free  0.5<br />
                    &nbsp; FIX  L_Free  2.938<br />
                    &nbsp; FIX  Force_2  15<br />
                    &nbsp; FIX  L_2     4.688
                    </p>
                    
                    <p>
                    This is a good time to scroll down and confirm these changes are now in place.
                    Also, the next page will adjust values found in the <b>File : Preferences</b> menu.
                    You may want to take this opportunity to look at the default values before 
                    those adjustments are made.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Material_Type",3),
                changeSymbolValue("End_Type",4),
                saveOutputSymbolConstraints('OD_Free'),
                fixSymbolValue('OD_Free', 0.5),
                fixSymbolValue('L_Free', 2.938),
                fixSymbolValue('Force_2', 15.0),
                fixSymbolValue('L_2', 4.688)
            ]
        },
        {
            title: "Page 06 of 09",
            text: (
                <>
                    <p>
                    While not necessary for the solution of this problem, 
                    new preference values have been imposed to illustrate how it is done in a Demo session.
                    Look at the <b>File : Preferences</b> menu to see the details.
                    The values are the same as provided by running the <b>Action : Execute : tweakPrefs</b> 
                    &nbsp; menu item.
                    </p>
                    
                    <p>
                    In the process of transitioning to the next page, the demo session will run Search.
                    </p>
                </>
            ),
            actions: [
                changeSystemControlsValue({maxit: 190, objmin: 0.000005, delmin: 0.00001, tol: 0.00001, smallnum: 1e-8})
            ]
        },
        {
            title: "Page 07 of 09",
            text: (
                <>
                    <p>
                    Now let's see what the search has achieved.
                    </p>

                    <p>
                    Yes, the program agrees that a feasible solution is available.  
                    But before we get involved with the details, 
                    since the handbook selected a standard wire diameter (0.0625), 
                    we should do the same. 
                    Then we need to repeat the search to adjust the other parameters.
                    </p>
                    
                    <p>
                    The <b>Action : Select Size</b> menu item can be used to select the nearest standard wire diameter.
                    You can experiment with that now.
                    </p>
                   
                    <p>
                    In the process of transitioning to the next page, the demo session will
                    FIX a value of 0.062 inch on Wire_Dia and then
                    run another search to re-establish corresponding values for all the other problem variables.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 08 of 09",
            text: (
                <>
                    <p>
                    This is your opportunity for a detailed look at the numbers. 
                    Don't forget to review the Report(s).
                    </p>
                    
                    <p>
                    The handbook solution produced:<br />
                        Initial length  &nbsp; &nbsp; 2.938 in.  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Initial tension  &nbsp; 3.0 lb.<br />
                        Length at 2  &nbsp; &nbsp; &nbsp; 4.688  in. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Force at 2  &nbsp; &nbsp; &nbsp; 15 lb.<br />
                        Outside diameter  0.5 in.  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Initial stress &nbsp; 13700 psi<br />
                        Active coils  &nbsp; &nbsp; &nbsp; &nbsp; 37.2 coils &nbsp; &nbsp; &nbsp; &nbsp; Wire diameter &nbsp; 0.0625 in.<br />
                        Stress at 2   &nbsp; &nbsp; 82200 psi (torsion) &nbsp; Hook stress &nbsp; 156800 &nbsp;psi (bending)<br />
                    </p>
                    <p>
                    The two solutions are in reasonable agreement.
                    </p>
                   
                    <p>
                    The next page will go one step further by entering the handbook solution and permit a direct comparison.
                    In the process, 
                    ODOP:Spring's calculation of deflection in the loops (Hook_Deflect_All) will be disabled.
                    Also, in order to use Carlson's 11,200,000 psi value for Torsion Modulus (G),
                    the Calculation Input Prop_Calc_Method will be changed to allow material properties that are
                    not determined by ODOP:Spring's built-in materials table.
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.062),
                search()
            ]
        },
        {
            title: "Page 09 of 09 (last page)",
            text: (
                <>
                    <p>
                    In order to disable ODOP:Spring's calculation of deflection in the loops:<br />
                    &nbsp; CHANGE END_TYPE User_Specified<br />
                    &nbsp; CHANGE Hook_Deflect_All 0.0
                    </p>
                    
                    <p>
                    In order to change the value of Torsion_Modulus:<br />
                    &nbsp; CHANGE Prop_Calc_Method 2<br />
                    &nbsp; CHANGE Torsion Modulus 11200000.0
                    </p>
                    
                    <p>
                    To repeat, the handbook solution produced:<br />
                    Initial length  &nbsp; &nbsp; 2.938 in.  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Initial tension  &nbsp; 3.0 lb.<br />
                    Length at 2  &nbsp; &nbsp; &nbsp; 4.688  in. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Force at 2  &nbsp; &nbsp; &nbsp; 15 lb.<br />
                    Outside diameter  0.5 in.  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Initial stress &nbsp; 13700 psi<br />
                    Active coils  &nbsp; &nbsp; &nbsp; &nbsp; 37.2 coils &nbsp; &nbsp; &nbsp; &nbsp; Wire diameter &nbsp; 0.0625 in.<br />
                    Stress at 2   &nbsp; &nbsp; 82200 psi (torsion) &nbsp; Hook stress &nbsp; 156800 &nbsp;psi (bending)<br />
                    </p>

                    <p>
                    The agreement between results is quite good. 
                    Not perfect, but as close as can be expected.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue('Wire_Dia', 0.0625),
                changeSymbolValue('Coils_T', 37.2),
                fixSymbolValue('Initial_Tension', 3.0),
                changeSymbolValue("End_Type",6),
                changeSymbolValue("Hook_Deflect_All",0.0),
                changeSymbolValue("Prop_Calc_Method",2),
                changeSymbolValue("Torsion_Modulus", 11200000.0)
            ]
        }
    ]
}