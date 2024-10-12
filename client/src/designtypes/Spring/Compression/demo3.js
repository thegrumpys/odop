import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, search } from '../../../store/modelActions';
import { MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    The following example illustrates the use of ODOP:Spring in
                    the design of a compression spring from original specifications.
                    </p>

                    <p>
                    As with the other tutorial and demo sessions,
                    this session needs to start from a known state.
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState.
                    </p>

                    <p>
                    To continue with this example, just click the "Next" button as you finish
                    reading each page (step).
                    </p>
                    <br />
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

                    <p>
                    Before we make any changes, let's review a problem statement that
                    is similar to a sample compression spring problem
                    contained in the design handbook of a large spring manufacturer.
                    </p>

                    <p>
                    Determine wire size, number of coils and corrected stress at solid height, given:<br />
                          material     =  oil tempered wire,  ASTM A229<br />
                          ends         =  squared and ground<br />
                          operation in a hole  =  1.575 inch in diameter<br />
                          static load, room temperature:<br />
                          point 1  = &nbsp; 61.8  lb.    at   height  =  2.362 in.<br />
                          point 2  = 112.0  lb.    at   height  =  1.969 in.<br />
                          This spring must not set when compressed to solid.<br />
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression')
            ]
        },
        {
            title: "Page 03 of 11",
            text: (
                <>
                    <p>Next, the demo session will enter everything we know about the problem. </p>

                    <p>This is a good time to take a good look at the existing values.
                    Affected values will update immediately as the demo session enters
                    changes when moving to the next page.</p>

                    <p>You can scroll the page down to view the complete set of values.
                    Scroll back up in order to use the Next button to continue.</p>
                    <br /><br />
                </>
            )
        },
        {
            title: "Page 04 of 11",
            text: (
                <>
                    <p>
                    The demo has now entered what is known about the problem.
                    In summary, the changes were:<br />
                    </p>
                    CHANGE  Material_Type OIL_TEMPERED_MB<br />
                    CHANGE  End_Type Closed & Ground<br />
                    CHANGE  od_free max  1.56  &nbsp;(allow margin for dia. tolerance)<br />
                    FIX  Force_1   61.8<br />
                    FIX  L_1        2.362<br />
                    FIX  Force_2  112.0<br />
                    FIX  L_2        1.969<br />
                    <br />
                    <p>
                    The remaining Independent Variable values remain as established by the initialState.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Material_Type",3),
                changeSymbolValue("End_Type",4),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 1.56),
                fixSymbolValue('Force_1', 61.8),
                fixSymbolValue('L_1', 2.362),
                fixSymbolValue('Force_2', 112.0),
                fixSymbolValue('L_2', 1.969)
            ]
        },
        {
            title: "Page 05 of 11",
            text: (
                <>
                <p>
                Take a look at Report&nbsp;1&nbsp;(mini).
                Use the View menu to select that Report.
                <br /><br />
                Note the warning message.  It says that when applying a 112
                pound force, the current values of WIRE_DIA, COILS_T and L_FREE
                (remaining as established by the initialState) create a starting
                point where L_2, the length at point 2, is less than the solid length
                (less than zero, actually).
                This is an impossible condition and provides a difficult start point for the search.
                However in this case, we'll ignore the message and proceed with the search.
                </p>
                <br /><br />
                </>
            )
        },
        {
            title: "Page 06 of 11",
            text: (
                <>
                    <p>We have a solution. Please take a moment to scroll through and view the values.</p>
                    <p>
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini).
                    The message:
                    "<b>Coil to coil contact may cause inaccuracy in point 2.</b>"
                    is produced any time that the second load uses more
                    than 80 % of available deflection.
                    </p>
                    <p>There is no warning about buckling so that is not a concern for this design.</p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 07 of 11",
            text: (
                <>
                    <p>
                    If you are still viewing the Report,
                    don't forget to switch back to the main page.
                    </p>

                    <p>
                    Clearly, there is more than one possible solution to this problem, as stated.
                    We established a constraint on outside diameter,
                    thus permitting any value less than this maximum value.
                    ODOP:Spring seems to
                    have discovered a solution with a significantly smaller outside diameter
                    than the one derived in the handbook (1.5 in.), yet it meets all the
                    other problem specifications.
                    </p>

                    <p>
                    The handbook selected the design's outside diameter based on 95 % of the hole diameter.
                    This could be significant if buckling is an issue.
                    A larger outside diameter will be less prone to buckling.
                    Also, a correct fit within the hole will provide lateral support for the spring
                    and thus reduce any tendency to buckle.
                    </p>

                    <p>
                    Before going further, be sure to look at the wire size, number of coils,
                    stress at solid, factor of safety and weight of
                    the design produced by ODOP:Spring.
                    </p>
                </>
            )
        },
        {
            title: "Page 08 of 11",
            text: (
                <>
                    <p>
                    The demo session has now entered the handbook solution.
                    We can look at the ODOP:Spring analysis of the handbook result.
                    </p>

                    <p>
                    CHANGE  Wire_Dia  0.189<br />
                    CHANGE  OD_Free   1.5<br />
                    CHANGE  L_Free    2.843<br />
                    CHANGE  Coils_T   8.4<br />
                    </p>

                    <p>
                    <br /><br />
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Wire_Dia",0.189),
                changeSymbolValue("OD_Free",1.5),
                changeSymbolValue("L_Free",2.843),
                changeSymbolValue("Coils_T",8.4)
            ]
        },
        {
            title: "Page 09 of 11",
            text: (
                <>
                    <p>
                    Please take a moment to scroll through and view the values.
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini).
                    </p>

                    <p>
                    While the ODOP:Spring solution and the handbook solution are quite different,
                    the ODOP:Spring analysis of the handbook design
                    is very close to the results predicted by the handbook.
                    </p>
                    <p>
                    The handbook solution produced:<br />
                    wire size = 0.189; number of coils = 8.4, stress at solid = 97300 psi<br />
                    Point 1: &nbsp; 61.8 pounds at height = 2.362  inch<br />
                    Point 2: 112.0 pounds at height = 1.969  inch<br />
                    </p>
                </>
            )
        },
        {
            title: "Page 10 of 11",
            text: (
                <>
                    <p>
                    If you are still viewing a Report, don't forget to switch back to the main page.
                    </p>

                    <p>
                    As you can see by the violation of the upper constraint on the
                    factor of safety at Point 2 (FS_2),
                    ODOP:Spring is not entirely happy with the handbook design because it is
                    very conservative (low stress).
                    The ODOP compression spring initialState contains an upper
                    constraint on factor of safety at point 2 (FS_2 MAX = 1.5) that causes
                    the program to seek designs that are not excessively conservative.
                    Remember that this constraint is easily adjusted simply by changing the
                    value in that constraint field.
                    </p>

                    <p>
                    As can be expected, there is a weight penalty for a more conservative design.
                    The ODOP:Spring design had a smaller factor of safety and less weight.
                    </p>
                </>
            )
        },
        {
            title: "Page 11 of 11 (last page)",
            text: (
                <>
                    <p>
                    This completes our analysis of this problem.
                    </p>

                    <p>
                    Several more demo problems are available.
                    They are named demo1, demo2, ... etc.
                    Refer to the on-line documentation section (Help entry) covering the
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp;
                    for a complete list of additional tutorial and demo topics.
                    </p>

                    <p>
                    If you do not wish to continue with more demonstration problems,
                    you can experiment with the various ODOP:Spring features, menus and reports.
                    The HELP menu is a good place to start.
                    </p>
                </>
            )
        }
    ]
}
