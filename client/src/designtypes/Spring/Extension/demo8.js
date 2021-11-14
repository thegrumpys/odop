import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, freeSymbolValue, loadInitialState, setSymbolFlag, resetSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    "name": "demo8",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                <>
                    <p>
                    The following example illustrates the use of ODOP:Spring in
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

                    <p>
                    <br />
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
                    
                    <p>
                    Our next problem is similar to a sample extension spring problem
                    contained in the design handbook of a large spring manufacturer.
                    </p>
                    
                    <p>
                    Design an extension spring to meet the following requirements:
                    </p>
                    
                    <table>
                        <tbody>
                        <tr><th>Material</th><td>&nbsp;=</td><td>&nbsp;ASTM A227</td><td>&nbsp;</td><td>&nbsp;(Hard drawn wire)</td></tr>
                        <tr><th>Ends</th><td>&nbsp;=</td><td>&nbsp;Full Loop</td><td>&nbsp;</td><td>&nbsp;(Extension permitted.)</td></tr>
                        <tr><th>Outside dia.</th><td>&nbsp;=</td><td>&nbsp;0.276</td><td>in.</td><td>&nbsp;(max)</td></tr>
                        <tr><th>Load 1</th><td>&nbsp;=</td><td>&nbsp;3.93</td><td>lb.</td><td>&nbsp;(+/- 15%)</td></tr>
                        <tr><th>Length 1</th><td>&nbsp;=</td><td>&nbsp;0.984</td><td>in.</td><td>&nbsp;(+/-12%)</td></tr>
                        <tr><th>Load 2</th><td>&nbsp;=</td><td>&nbsp;6.74</td><td>lb.</td><td>&nbsp;</td></tr>
                        <tr><th>Length 2</th><td>&nbsp;=</td><td>&nbsp;1.142</td><td>in.</td><td>&nbsp;</td></tr>
                        </tbody>
                    </table>
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
                    We begin by entering the problem as specified.
                    At first glance, it appears that there is nothing particularly
                    problematic about these specifications. 
                    The problem does not appear to be overspecified.
                    </p>
                    
                    <p>
                    The demo session has now entered what is known about the problem. 
                    In summary, the changes were:<br />
                    &nbsp; CHANGE  Material_Type  HARD_DRAWN_WIRE<br />
                    &nbsp; CHANGE  End_Type  Full_Loop<br />
                    &nbsp; CHANGE  OD_Free MAX  0.261 &nbsp; &lt;---  0.015 margin<br />
                    &nbsp; FIX  Force_1  3.93 &nbsp; <br />
                    &nbsp; FIX  L_1    0.984<br />
                    &nbsp; FIX  Force_2  6.74 &nbsp; <br />
                    &nbsp; FIX  L_2   1.142
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Material_Type",1),
                changeSymbolValue("End_Type",1),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 0.261),
                changeSymbolConstraint('Force_1', MIN, 3.929),
                resetSymbolFlag('Force_1', MIN, CONSTRAINED),
                fixSymbolValue('Force_1', 3.93),
                fixSymbolValue('L_1', 0.984),
                fixSymbolValue('Force_2', 6.74),
                fixSymbolValue('L_2', 1.142)
            ]
        },
        {
            title: "Page 04 of 09",
            text: (
                <>
                    <p>
                    Note that previously initialState had End_Extension FIXed at a value of 0.0 in. 
                    </p>
                    
                    <p>
                    For now, we'll let the solution process select any value of End_Extension that
                    assists the solution:<br />
                    &nbsp; FREE  End_Extension
                    </p>

                    <p>
                    This is a good time to scroll down and confirm these changes are now in place.
                    In the process of moving to the next page, the demo session will run Search.
                    </p>
                </>
            ),
            actions: [
                freeSymbolValue('End_Extension'),
            ]
        },
        {
            title: "Page 05 of 09",
            text: (
                <>
                    <p>
                    While ODOP:Spring is able to find a solution that satisfies the design
                    criteria, it is a bit different from the handbook solution. 
                    The remainder of this demo session will look at the differences.
                    </p>

                    <p>
                    Before further examination of the details, the demo session will select the 
                    standard wire size that is the next size larger than the current 
                    (non-standard) value determined by this search.
                    Depending on the size of the change, another search is usually
                    required to adjust for the different wire diameter.
                    </p>

                    <p>
                    The <b>Action : Select Size</b> menu item can be used to select the nearest standard wire diameter.
                    You can experiment with that now.
                    </p>

                    <p>
                    In the process of transitioning to the next page, the demo session will
                    FIX a value of 0.035 inch on Wire_Dia and then
                    run another search to re-establish corresponding values for all the other problem variables.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 06 of 09",
            text: (
                <>
                    <p>
                    The handbook results:
                    </p>
                    
                    <table>
                        <tbody>
                        <tr><td>&nbsp; Free length</td><td>&nbsp;</td><td>&nbsp;&nbsp; .854 in.</td><td>&nbsp; &nbsp;</td><td>Wire Diameter</td><td>&nbsp;</td><td>&nbsp; .035 in.</td></tr>
                        <tr><td>&nbsp; Initial Tension</td><td>&nbsp;</td><td>&nbsp;1.68  lb.</td><td>&nbsp; &nbsp;</td><td>End Extension</td><td>&nbsp;</td><td>&nbsp;0.0 in.</td></tr>
                        <tr><td>&nbsp; Outside dia.</td><td>&nbsp;</td><td>&nbsp; .248 in.</td><td>&nbsp; &nbsp;</td><td>Active Coils</td><td>&nbsp;</td><td>13.2 coils</td></tr>
                        <tr><td>&nbsp; Load 1</td><td>&nbsp;</td><td>&nbsp;3.93 lb.</td><td>&nbsp; &nbsp;</td><td>Load 2</td><td>&nbsp;</td><td>&nbsp;6.74 lb.</td></tr>
                        <tr><td>&nbsp; Length 1</td><td>&nbsp;</td><td>0.984 in.</td><td>&nbsp; &nbsp;</td><td>Length 2</td><td>&nbsp;</td><td>&nbsp;1.142 in.</td></tr>
                        <tr><td>&nbsp; Stress 2</td><td>&nbsp;</td><td>103,000</td><td>psi.&nbsp; &nbsp;</td><td>&nbsp;</td></tr>
                        </tbody>
                    </table>
                   
                    <p>
                    </p>
                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.035),
                search()
            ]
        },
        {
            title: "Page 07 of 09",
            text: (
                <>
                    <p>
                    Now that we have demonstrated that the ODOP:Spring software can produce 
                    an acceptable design, 
                    the demo session will enter the handbook results in order to 
                    provide a validation of the the software's internal calculations.
                    </p>
                    
                    <p>
                    The handbook does its calculations in metric units, later converting to
                    equivalent English units. 
                    The 0.9 mm wire diameter is approximated as an 0.035 inch English size.  
                    The comparison works better if we tell ODOP:Spring the exact decimal inch 
                    equivalent of 0.9 mm.
                    </p>
                    
                    <p>
                    Using the ODOP:Spring definition of End_Extension, 
                    the handbook solution uses a zero end extension.
                    </p>
                   
                    <p>
                    The demo session will impose an entire set of new values 
                    in the process of moving to the next page.
                    </p>
                </>
            ),
            actions: [
            ]
        },
        {
            title: "Page 08 of 09",
            text: (
                <>
                    <p>
                    The demo session has just entered the handbook solution. 
                    </p>

                    <p>
                    ODOP:Spring normally makes an allowance for deflection in the hooks.
                    The handbook calculation did not make any such allowance.  
                    Our comparison will be closer if set the ODOP:Spring allowance to zero.
                    Because the hook deflection allowance is determined from a table based
                    on end type, it will be necessary to "switch off" this table look up
                    process first.  
                    That is accomplished by selecting the "User_Specified" end type.
                    </p>
                    
                    <p>
                    CHANGE  End_Type  User_Specified<br />
                    CHANGE  Hook_Deflect_All  0.0
                    </p>
                    
                    <p>
                    change  OD_Free   0.248<br />
                    change  Wire_Dia  0.035433   &lt;---  0.9 mm<br />
                    change  Coils_T  13.2    &lt;--- no allowance for hook deflection<br />
                    change  Initial_Tension  1.68<br />
                    change  End_Extension  0.0     &lt;--- per comment on previous page<br />
                    change  Force_1  3.93<br />
                    change  Force_2  6.74
                    </p>
                   
                    <p>
                    The handbook results will be repeated on the next page in order to provide
                    a more convenient comparison.
                    Wait for the next page to scroll through the ODOP:Spring design to compare results.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue('OD_Free', 0.248),
                changeSymbolValue('Wire_Dia', 0.035433),
                changeSymbolValue('Coils_T', 13.2),
                changeSymbolValue('Initial_Tension', 1.68),
                changeSymbolValue('End_Extension', 0.0),
                changeSymbolValue("End_Type",6),
                changeSymbolValue("Hook_Deflect_All", 0.0)
            ]
        },
        {
            title: "Page 09 of 09 (last page)",
            text: (
                <>
                    <p>
                    To repeat, the handbook solution produced:<br />
                    </p>
                    
                    <table>
                        <tbody>
                        <tr><td>&nbsp; Free length</td><td>&nbsp;</td><td>&nbsp;&nbsp; .854 in.</td><td>&nbsp; &nbsp;</td><td>Wire Diameter</td><td>&nbsp;</td><td>&nbsp; .035 in.</td></tr>
                        <tr><td>&nbsp; Initial Tension</td><td>&nbsp;</td><td>&nbsp;1.68  lb.</td><td>&nbsp; &nbsp;</td><td>End Extension</td><td>&nbsp;</td><td>&nbsp;0.0 in.</td></tr>
                        <tr><td>&nbsp; Outside dia.</td><td>&nbsp;</td><td>&nbsp; .248 in.</td><td>&nbsp; &nbsp;</td><td>Active Coils</td><td>&nbsp;</td><td>13.2 coils</td></tr>
                        <tr><td>&nbsp; Load 1</td><td>&nbsp;</td><td>&nbsp;3.93 lb.</td><td>&nbsp; &nbsp;</td><td>Load 2</td><td>&nbsp;</td><td>&nbsp;6.74 lb.</td></tr>
                        <tr><td>&nbsp; Length 1</td><td>&nbsp;</td><td>0.984 in.</td><td>&nbsp; &nbsp;</td><td>Length 2</td><td>&nbsp;</td><td>&nbsp;1.142 in.</td></tr>
                        <tr><td>&nbsp; Stress 2</td><td>&nbsp;</td><td>103,000</td><td>psi.&nbsp; &nbsp;</td><td>&nbsp;</td></tr>
                        </tbody>
                    </table>

                    <p>
                    </p>
                   
                    <p>
                    This completes our analysis of this problem.
                    </p>
                    
                    <p>
                    While once again we found that there can be several solutions to the
                    same set of specifications, overall the ODOP:Spring calculations compare well to the
                    handbook results.
                    </p>
                </>
            )
        }
    ]
}