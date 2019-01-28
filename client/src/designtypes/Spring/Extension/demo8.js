import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, freeSymbolValue, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, FIXED, CONSTRAINED } from '../../../store/actionTypes';
import { changeSystemControlsValue } from '../../../store/actionCreators';
export const execute = {
    "name": "demo8",
    "steps": [
        {
            title: "Session Now In Progress",
            "name": "page0x",
            text: (
                <React.Fragment>
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
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 11",
            text: (
                <React.Fragment>
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
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Extension'),
                changeLabelsValue([{name: 'COMMENT', value: 'Extension Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 11",
            text: (
                <React.Fragment>
                <p>
                </p>
                
                <p>
                </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 11",
            text: (
                <React.Fragment>
                    <p>
                    </p>

                    <p>
                    </p>
                   
                    <p>
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 11",
            text: (
                <React.Fragment>
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
                    &nbsp; CHANGE  OD_Free MAX  0.276 &nbsp; <br />
                    &nbsp; FIX  Force_1  3.93 &nbsp; <br />
                    &nbsp; FIX  L_1    0.984<br />
                    &nbsp; FIX  Force_2  6.74 &nbsp; <br />
                    &nbsp; FIX  L_2   1.142
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Material_Type",1),
                changeSymbolValue("End_Type",1),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 0.276),
                freeSymbolValue('End_Extension'),
                changeSymbolConstraint('Force_1', MIN, 3.929),
                fixSymbolValue('Force_1', 3.93),
                fixSymbolValue('L_1', 0.984),
                fixSymbolValue('Force_2', 6.74),
                fixSymbolValue('L_2', 1.142)
            ]
        },
        {
            title: "Page 06 of 11",
            text: (
                <React.Fragment>
                    <p>
                    Note that previously initialState had End_Extension FIXed at a value of 0.0 in. 
                    </p>
                    
                    <p>
                    For now, we'll let the solution process select any value of end extension that
                    assists the solution:<br />
                    FREE  End_Extension
                    </p>
                    
                    <p>
                    Pending implementation of FDCL, set constraint FS_SI_Lo MIN; tweakPrefs.
                    </p>

                    <p>
                    This is a good time to scroll down and confirm these changes are now in place.
                    After the click on Next, the demo session will run Search.
                    </p>
                </React.Fragment>
            ),
            actions: [
                freeSymbolValue('End_Extension'),
                setSymbolFlag('FS_SI_Lo', MIN, CONSTRAINED),
                changeSystemControlsValue({maxit: 190, objmin: 0.000005, delmin: 0.00001, tol: 0.00001, smallnum: 1e-8})
            ]
        },
        {
            title: "Page 07 of 11",
            text: (
                <React.Fragment>
                    <p>
                    While ODOP:Spring is able to find a solution that satisfies the design
                    criteria, it is quite different from the handbook solution.  The
                    remainder of this session will look at the differences in detail.<br />
                    <br />
                    Recall that the handbook requested a spring which has a "minimum hook
                    extension" of 0.725 inch.  
                    The handbook definition of this quantity appears to be: 
                    (free length - body length)/2  
                    </p>

                    <p>
                    As illustrated on the Report 1 and Report 3 tabs,
                    ODOP:Spring calculates length between hooks as body length plus 75% or
                    100% (depending on End_Type) of a coil inside diameter for each end.
                    End_Extension is an offset in addition to this allowance for the ends.
                    
                    Specifically, the ODOP:Spring Calculation Inputs L_End and L_Extended_End 
                    are determined by End_Type.
                    Typically, these quantities will represent the 75% or 100% of a coil
                    inside diameter that is added to L_Body in order to establish L_Free.
                    <br /><br />
                    For a spring with "Full" hook or loop ends, ODOP:Spring's End_Extension 
                    would be:
                    free length - (body length + 2 coil inside diameters)
                    </p>

                    <p>
                    For the handbook solution:<br />
                    5.125   - (3.600 + 2 * 0.405)  =  0.715   inches<br />
                    We will use this value shortly in a ODOP:Spring analysis of the handbook
                    solution.
                    </p>

                    <p>
                    However, for our current situation, if the handbook wants to maintain at
                    least (2 * 0.725) in the ends and the coil inside diameter is 0.405, we
                    should specify a ODOP:Spring End_Extension  MIN  of 1.450 - 0.810 = 0.640
                    inches.
                    </p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 08 of 11",
            text: (
                <React.Fragment>
                    <p>
                    The demo session has now imposed:
                    CHANGE  End_Extension MIN  0.640
                    </p>

                    <p>
                    The handbook solution used a standard wire diameter.
                    The <b>Action : Select Size</b> menu item can be used to select the nearest standard wire diameter.
                    You can experiment with that now.
                    </p>
                   
                    <p>
                    While it appears that a smaller standard wire diameter would be possible, 
                    in order to be consistent with the handbook,
                    the demo session will impose a Wire_Dia value of 0.120 
                    in the process of transitioning to the next page.
                    Another search will re-establish corresponding values for all the other problem variables.
                    </p>
                </React.Fragment>
            ),
            actions: [
                setSymbolFlag('End_Extension', MIN, CONSTRAINED),
                changeSymbolConstraint('End_Extension', MIN, 0.640)
            ]
        },
        {
            title: "Page 09 of 11",
            text: (
                <React.Fragment>
                    <p>
                    Note that even though the ODOP:Spring value for initial tension is
                    significantly higher than the handbook's value (14.4 lb.),  it is still
                    at the lower boundary of the range that is considered "readily obtainable" for
                    0.120 wire and a Spring_Index near 4.4.
                    </p>
                    <br />

                    <p>
                    The handbook solution produced:<br />
                    &nbsp; Force 1  &nbsp; &nbsp; 50    pounds &nbsp; &nbsp; &nbsp; &nbsp;  Length 1  &nbsp; 5.625  inches<br />
                    &nbsp; Force 2  &nbsp;  94.5  pounds &nbsp; &nbsp; &nbsp; Length 2   &nbsp;   6.250  inches<br />
                    &nbsp; Init. tens. &nbsp; 14.4  pounds &nbsp; &nbsp;  Length free &nbsp;  5.125  inches
                    </p>
                    <p>
                    &nbsp; OD free  &nbsp; &nbsp;  0.645  inches  &nbsp; &nbsp;  Wire dia &nbsp;  0.120  inches<br />
                    &nbsp; Act. coils &nbsp; &nbsp;  29.   Coils &nbsp; &nbsp; &nbsp; &nbsp; Rate &nbsp;    71.2    lb/in<br />
                    &nbsp; Body length &nbsp;  3.60   inches &nbsp; &nbsp;  Stress &nbsp;    99000      psi
                    </p>
                   
                    <p>
                    This is a good time to scroll through the ODOP:Spring design to compare results.
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.120),
                search()
            ]
        },
        {
            title: "Page 10 of 11",
            text: (
                <React.Fragment>
                    <p>
                    Now that we've seen how ODOP:Spring can derive a design that's close to
                    the handbook design, 
                    the demo session has entered the handbook solution 
                    so that we can see what ODOP:Spring thinks of it.
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
                    Now we'll enter the values produced by the handbook solution and compare
                    the results.
                    </p>
                    
                    <p>
                    CHANGE  OD_Free   0.645   (0.010 margin)<br />
                    CHANGE  Coils_T  29.0    (no allowance for hook deflection)<br />
                    CHANGE  Initial_Tension  14.4<br />
                    CHANGE  End_Extension  0.715   (per earlier calculation)<br />
                    CHANGE  Force_1  50.0<br />
                    CHANGE  Force_2  94.5
                    </p>
                   
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue('OD_Free', 0.645),
                changeSymbolValue('Coils_T', 29.0),
                changeSymbolValue('Initial_Tension', 14.4),
                changeSymbolValue('End_Extension', 0.715),
                changeSymbolValue('Force_1', 50.0),
                changeSymbolValue('Force_2', 94.5),
                changeSymbolValue("End_Type",6),
                changeSymbolValue("Hook_Deflect_All",0.0)
            ]
        },
        {
            title: "Page 11 of 11 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    To repeat, the handbook solution produced:<br />
                    &nbsp; Force 1  &nbsp; &nbsp; 50    pounds &nbsp; &nbsp; &nbsp; &nbsp;  Length 1  &nbsp; 5.625  inches<br />
                    &nbsp; Force 2  &nbsp;  94.5  pounds &nbsp; &nbsp; &nbsp; Length 2   &nbsp;   6.250  inches<br />
                    &nbsp; Init. tens. &nbsp; 14.4  pounds &nbsp; &nbsp;  Length free &nbsp;  5.125  inches
                    </p>
                    <p>
                    &nbsp; OD free  &nbsp; &nbsp;  0.645  inches  &nbsp; &nbsp;  Wire dia &nbsp;  0.120  inches<br />
                    &nbsp; Act. coils &nbsp; &nbsp;  29.   Coils &nbsp; &nbsp; &nbsp; &nbsp; Rate &nbsp;    71.2    lb/in<br />
                    &nbsp; Body length &nbsp;  3.60   inches &nbsp; &nbsp;  Stress &nbsp;    99000      psi
                    </p>

                    <p>
                    ODOP:Spring thinks that this design has one small problem ...
                    
                    The desired initial tension is in the region that the handbook describes
                    as "difficult to maintain with accurate and uniform results".

                    The handbook never explicitly calculates the stress induced by the 14.4
                    pound initial tension.  It indicates that since 14.4 pounds is less than
                    the 28.4 pounds "attainable" with 22,000 psi initial stress (taken from
                    the chart), the situation is acceptable.
                    </p>
                   
                    <p>
                    This completes our analysis of this problem.
                    If this example seemed a bit long and drawn out ...  it was.
                    </p>
                    
                    <p>
                    Note that simply because the design specification and ODOP:Spring use the
                    same or similar names for a variable doesn't mean they are truly the same.  In
                    this case, End_Extension MIN and minimum hook extension had different meanings.
                    
                    While once again we found that there can be several solutions to the
                    same spring problem, overall the ODOP:Spring calculations compare well to the
                    handbook results.
                    </p>
                </React.Fragment>
            )
        }
    ]
}