import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, freeSymbolValue, loadInitialState, setSymbolFlag, resetSymbolFlag, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED, FDCL } from '../../../store/actionTypes';
export const execute = {
    "name": "demo7",
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
                    A detailed description of  
                    <a href="/docs/Help/DesignTypes/Spring/Extension/description.html" target="_blank" rel="noopener noreferrer"> extension spring names </a>
                    is provided in the On-line Help.  
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
            title: "Page 02 of 11",
            text: (
                <>
                    <p>
                    The initial conditions expected by this demo session are now established.
                    </p>
                    
                    <p>This problem appears in the  HANDBOOK of SPRING DESIGN  published by:<br />
                    <br />
                    Spring Manufacturers Institute, Inc.<br />
                    2001 Midwest Road, Suite 106<br />
                    Oak Brook, Illinois &nbsp; 60523<br />
                    <br />
                    telephone: 630-495-8588<br />
                    <br />
                    Refer to page 19 of the second printing (1983)<br />
                    ***  Used with permission of Spring Manufacturers Institute, Inc.  ***<br />
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Extension'),
                changeLabelsValue([{name: 'COMMENT', value: 'Extension Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 11",
            text: (
                <>
                <p>
                Before making any changes to our initialState, the Design Example may be restated in a simplified form:<br />
                <br />
                Example 2: Design an extension spring to meet the following requirements:
                </p>
                
                <table>
                    <tbody>
                    <tr><th>Material</th><td>&nbsp;=</td><td>&nbsp;</td><td>music wire</td><td>&nbsp;</td></tr>
                    <tr><th>Ends</th><td>&nbsp;=</td><td>&nbsp;</td><td>hooks</td><td>&nbsp;(.725 min hook extension)</td></tr>
                    <tr><th>Outside diameter</th><td>&nbsp;=</td><td>&nbsp;0.655</td><td>in.</td><td> (max)</td></tr>
                    <tr><th>Free length</th><td>&nbsp;=</td><td>&nbsp;5.125</td><td>in.</td><td>&nbsp;</td></tr>
                    <tr><th>Load 1</th><td>&nbsp;=</td><td>50</td><td>lb.</td><td>&nbsp;(+/- 5 lb.)</td></tr>
                    <tr><th>Length 1</th><td>&nbsp;=</td><td>&nbsp;5.625</td><td>in.</td><td>&nbsp;</td></tr>
                    <tr><th>Load 2</th><td>&nbsp;=</td><td>105</td><td>lb.</td><td>&nbsp;</td></tr>
                    <tr><th>Length 2</th><td>&nbsp;=</td><td>&nbsp;6.25</td><td>in.</td><td>&nbsp;</td></tr>
                    </tbody>
                </table>
                <br />
               
                <p>
                The handbook example uses allowable stress appropriate for a static load (105,000 psi corrected) and 
                does not state a requirement for cycle life.
                </p>
                </>
            )
        },
        {
            title: "Page 04 of 11",
            text: (
                <>
                    <p>
                    It is important to notice that the handbook has given us three points to
                    define the rate (slope of the linear force-deflection curve) of a coil
                    spring.  Thus, there is a good chance that the problem is 
                    <a href="/docs/Help/designSituations.html" target="_blank" rel="noopener noreferrer"> overspecified</a>. 
                    We are allowed a small tolerant region around load 1,  (+/-5 pounds).
                    Also, later in the problem the handbook indicates that load 2 may also
                    vary by 10%  (94.5 to 105 pounds).
                    </p>

                    <p>
                    An important point should be restated here.  The current version of
                    ODOP:Spring does not incorporate spring manufacturing tolerances.
                    Therefore if a design is not mathematically very close to the design
                    requirements as specified, the program will likely declare it to be
                    unacceptable (infeasible).  If we enter the design as specified in the
                    handbook, putting performance characteristics in a "FIXed" state,
                    ODOP:Spring, will be unable to find a solution due to the fact that, in
                    this case, the three points:  1, 2, and FREE are not on the same
                    straight line.
                    </p>
                   
                    <p>
                    To avoid this problem, we'll specify forces as MAX and MIN values.
                    </p>
                </>
            )
        },
        {
            title: "Page 05 of 11",
            text: (
                <>
                    <p>
                    The demo session has now entered what is known about the problem. 
                    </p>
                    
                    <p>
                    In summary, the changes were:<br />
                    &nbsp; CHANGE  Material_Type  MUSIC_WIRE<br />
                    &nbsp; CHANGE  End_Type  Full_Hook<br />
                    &nbsp; CHANGE  OD_Free MAX  0.645 &nbsp; (includes a 0.010 margin)<br />
                    &nbsp; FIX  L_Free   5.125<br />
                    &nbsp; CHANGE  Force_1  MIN  45 &nbsp; (50 minus 5 pounds)<br />
                    &nbsp; CHANGE  Force_1  MAX  55 &nbsp; (50 plus&nbsp; 5 pounds)<br />
                    &nbsp; FIX  L_1    5.625<br />
                    &nbsp; CHANGE  Force_2  MIN  94.5 &nbsp; (105 minus 10%)<br />
                    &nbsp; CHANGE  Force_2  MAX  105 &nbsp; (stated maximum)<br />
                    &nbsp; FIX  L_2    6.25
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Material_Type",2),
                changeSymbolValue("End_Type",3),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 0.645),
                fixSymbolValue('L_Free', 5.125),
                resetSymbolFlag('Force_1', MIN, FDCL),
                setSymbolFlag('Force_1', MIN, CONSTRAINED),
                changeSymbolConstraint('Force_1', MIN, 45.0),
                setSymbolFlag('Force_1', MAX, CONSTRAINED),
                changeSymbolConstraint('Force_1', MAX, 55.0),
                fixSymbolValue('L_1', 5.625),
                setSymbolFlag('Force_2', MIN, CONSTRAINED),
                changeSymbolConstraint('Force_2', MIN, 94.5),
                setSymbolFlag('Force_2', MAX, CONSTRAINED),
                changeSymbolConstraint('Force_2', MAX, 105.0),
                fixSymbolValue('L_2', 6.25)
            ]
        },
        {
            title: "Page 06 of 11",
            text: (
                <>
                    <p>
                    Note that previously initialState had End_Extension FIXed at a value of 0.0 in. 
                    &nbsp;For now, we'll let the solution process select any value of end extension that
                    assists the solution:<br />
                    &nbsp; FREE  End_Extension
                    </p>

                    <p>
                    This is a good time to scroll down and confirm these changes are now in place.
                    After the click on Next, the demo session will run Search. 
                    The calculations may take several seconds.
                    </p>
                </>
            ),
            actions: [
                freeSymbolValue('End_Extension'),
            ]
        },
        {
            title: "Page 07 of 11",
            text: (
                <>
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
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 08 of 11",
            text: (
                <>
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
                </>
            ),
            actions: [
                setSymbolFlag('End_Extension', MIN, CONSTRAINED),
                changeSymbolConstraint('End_Extension', MIN, 0.640)
            ]
        },
        {
            title: "Page 09 of 11",
            text: (
                <>
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
                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.120),
                search()
            ]
        },
        {
            title: "Page 10 of 11",
            text: (
                <>
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
                </>
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
                <>
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
                </>
            )
        }
    ]
}