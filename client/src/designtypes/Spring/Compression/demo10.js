import React from 'react';
import { changeSymbolValue, fixSymbolValue, loadInitialState, resetSymbolFlag, changeLabelsValue, changeSystemControlsValue, search } from '../../../store/actions';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    The following example provides the ODOP:Spring solution to a reference book
                    problem illustrating the design of a compression spring .
                    </p>

                    <p>
                    While this particular problem statement struggles with ambiguity on
                    details like end type and stress correction factor,
                    it provides a good opportunity to demonstrate how to handle a "design-to-stress"
                    approach that is common in traditional manual calculations.
                    More detail on this point appears later in this session.
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
            title: "Page 02 of 15",
            text: (
                <>
                    <p>
                    The initial conditions expected by this demo session are now established.<br />
                    <br />
                    Our next problem appears in the
                    &nbsp; &nbsp; <b>SPRING DESIGNER'S HANDBOOK</b> &nbsp; &nbsp; by  Harold Carlson<br />
                    Published by  Marcel Dekker, Inc. &nbsp; &nbsp; 270 Madison Avenue &nbsp; &nbsp; New York, &nbsp; NY &nbsp; &nbsp; 10016<br />
                    <br />
                    Refer to  Problem 6  on page 233  of the 10th printing  (1978).
                    </p>
                    <br /><br />
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring demo10'}])
            ]
        },
        {
            title: "Page 03 of 15",
            text: (
                <>
                    <p>
                    We will start by skipping the sailboat context and briefly restate the problem.
                    Our challenge is to design a compression spring such that the following
                    specifications are met:<br />
                    <br />
                    material              =  302  stainless<br />
                    maximum force (solid) = 90.0  pounds<br />
                    maximum deflection    =  3.0  inches<br />
                    mean diameter      =  1.0 inch &nbsp; (arbitrary value utilized in handbook solution)<br />
                    design stress (solid) = 80,000 psi &nbsp; (uncorrected)<br />
                    <br />
                    </p>

                    <p>
                    Select free length, wire diameter and number of coils
                    for a compression spring to be fitted with drawbars and
                    used in an extension spring application.
                    Compression to solid is probable in this application.
                    </p>
                </>
            )
        },
        {
            title: "Page 04 of 15",
            text: (
                <>
                    <p>
                    This problem statement is a bit unusual in that it has the design load coincide with the solid condition.
                    Because the problem has specified a specific stress level,
                    we will treat this as a "design-to-stress" problem.
                    You may wish to review the
                    &nbsp;<a href="/docs/Help/SpringDesign/advancedSpringOperations.html" target="_blank" rel="noopener noreferrer">Design To Stress</a>&nbsp;
                    and
                    &nbsp;<a href="/docs/Help/SpringDesign/materials.html" target="_blank" rel="noopener noreferrer">Materials</a>&nbsp;
                    sections of the documentation (on-line Help entries) for additional information.
                    </p>

                    <p>
                    Before we start making changes,
                    this is a good time for you to review our starting values.
                    </p>

                    <p>
                    At this point we are going to take a side trip into the nitty-gritty
                    of the Wahl stress correction factor.
                    The handbook requests a design that provides a specific uncorrected stress level.
                    ODOP:Spring has the correction factor built in to its calculations.
                    So, we need to determine the necessary correction factor
                    and then use that to manually adjust the target stress value used by ODOP:Spring.
                    </p>

                    <p>
                    Also, before abandoning the material table,
                    we will take a sneak peek at the value of wire tensile strength
                    associated with the handbook solution.
                    This will provide a bit of context in evaluating the handbook design.
                    </p>
                </>
            )
        },
        {
            title: "Page 05 of 15",
            text: (
                <>
                    <p>
                    The following changes have now been imposed by the demo session:
                    </p>

                    <p>
                    CHANGE Material_Type 302_STAINLESS &nbsp; <br />
                    CHANGE OD_Free 1.142<br />
                    CHANGE Wire_Dia 0.142
                    </p>

                    <p>
                    Observe that Report 2 displays a kw1 correction factor of 1.211.
                    Observe that the material table provides a Tensile stress value of 196,938 PSI
                    associated with a wire size of 0.142 inch.
                    </p>

                    <p>
                    In the process of moving to the next page,
                    this demo session will select a property calculation method that does not utilize the built-in
                    table of material properties.
                    The values of Density, Torsion Modulus and Tensile for 302 Stainless will carry forward
                    but other properties will be specified separately.
                    Specifically, the stress correction factor adjusted value of allowable stress will be applied.
                    In the process, the previous values of OD_Free and Wire_Dia will be restored so that the demo session
                    is not able to "cheat" and start the solution with the handbook answer already in place.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Material_Type",7),
                changeSymbolValue("OD_Free",1.142),
                changeSymbolValue("Wire_Dia",0.142)
            ]
        },
        {
            title: "Page 06 of 15",
            text: (
                <>
                    <p>
                    The following changes have now been imposed by the demo session:
                    </p>

                    <p>
                    CHANGE Prop_Calc_Method 3<br />
                    CHANGE OD_Free 1.1<br />
                    CHANGE Wire_Dia 0.1055<br />
                    CHANGE Stress_Lim_Stat 96880
                    </p>

                    <p>
                    Again, the change to Prop_Calc_Method is the key to our "design-to-stress" approach.
                    It is what allows stress limits to be directly specified and not supplied from the materials table.
                    The value of 96,880 is the problem-specified 80,000 PSI with
                    the previously noted stress correction factor applied.
                    </p>

                    <p>
                    Next, the demo session will enter everything we know about the problem.
                    As usual, affected values will update immediately as the demo session enters the changes.
                    &nbsp;
                    <br />
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("Prop_Calc_Method",3),
                changeSymbolValue("OD_Free",1.1),
                changeSymbolValue("Wire_Dia",0.1055),
                changeSymbolValue("Stress_Lim_Stat",96880)
            ]
        },
        {
            title: "Page 07 of 15",
            text: (
                <>
                    <p>
                    The demo has now entered what is known about the problem.
                    In summary, the changes were:
                    </p>

                    <p>
                    CHANGE  End_Type Closed<br />
                    FIX Force_1 0.0<br />
                    FIX Force_2 90.0<br />
                    FIX Force_Solid 90.0<br />
                    FIX L_Stroke 3.0<br />
                    FIX Mean_Dia 1.0<br />
                    FIX Stress_Solid 96880<br />
                    </p>
                    <br />

                    <p>
                    Once we make a few adjustments to constraints supplied by the initialState starting point
                    the problem set up will be complete.
                    </p>
                </>
            ),
            actions: [
                changeSymbolValue("End_Type",3),
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 90.0),
                fixSymbolValue('Force_Solid', 90.0),
                fixSymbolValue('L_Stroke', 3.0),
                fixSymbolValue('Mean_Dia', 1.0),
                fixSymbolValue('Stress_Solid', 96880.0)
            ]
        },
        {
            title: "Page 08 of 15",
            text: (
                <>
                    <p>
                    As per the discussion in
                    &nbsp;<a href="/docs/Help/SpringDesign/advancedSpringOperations.html" target="_blank" rel="noopener noreferrer">Design To Stress</a>&nbsp;
                    the demo session has adjusted constraints:
                    </p>

                    <p>
                    Free FS_2<br />
                    Free FS_Solid<br />
                    Free %_Avail_Deflect<br />
                    &nbsp;
                    <br />
                    The remaining Independent Variable values remain as established by the initialState.
                    </p>

                    <p>
                    Separately, in the interest of obtaining a high precision result,
                    the demo session has established the same set of search algorithm tuning parameters
                    that are described in the <b>Action : Execute : increasePrecision</b> menu item.
                    </p>
                </>
            ),
            actions: [
                resetSymbolFlag('FS_2', MIN, CONSTRAINED),
                resetSymbolFlag('FS_2', MAX, CONSTRAINED),
                resetSymbolFlag('FS_Solid', MIN, CONSTRAINED),
                resetSymbolFlag('%_Avail_Deflect', MAX, CONSTRAINED),
                changeSystemControlsValue({maxit: 1000, objmin: 0.000001, delmin: 0.00001, tol: 0.00001, smallnum: 1e-8})
            ]
        },
        {
            title: "Page 09 of 15",
            text: (
                <>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (<b>Action : Search</b> menu) for a solution.
                    Specifically, Search will find values of the free Independent Variables
                    that cause the newly established Constraints and FIXes to be satisfied.
                    </p>

                    <p>
                    &nbsp;
                    <br />
                    </p>
                </>
            )
        },
        {
            title: "Page 10 of 15",
            text: (
                <>
                    <p>Yes,  A feasible solution is available. Please take a moment to scroll through and view the values.</p>
                    <p>
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini).
                    Use the View menu to select that Report.
                    The message:
                    "<b>Coil to coil contact may cause inaccuracy in point 2.</b>"
                    is produced any time that the second load uses more
                    than 80 % of available deflection.
                    </p>
                    <p>
                    Note the warning about buckling.
                    Buckling should not be an immediate concern for a compression spring that will be fitted with drawbars
                    if utilized in a near static application.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 11 of 15",
            text: (
                <>
                    <p>
                    If you are still viewing the Report,
                    you may want to switch back to the main page.
                    </p>

                    <p>
                    As a general rule, in the first approach to a new problem,
                    we let the calculations use an arbitrary (non-standard) wire diameter.
                    </p>

                    <p>
                    While the difference is quite small, in order to compare with the handbook result,
                    the demo session will impose the handbook value of Wire_Dia.
                    Specifically:
                    <br /><br />
                    FIX Wire_Dia 0.142<br />
                    <br />
                    Look for the new value of Wire_Dia on the next page.
                    </p>
                </>
            )
        },
        {
            title: "Page 12 of 15",
            text: (
                <>
                    <p>
                    Now that there has been a slight change in wire diameter, another search
                    will be required to make corresponding adjustments in the other parameters.
                    </p>

                    <p>
                    Look for the results on the next page.
                    <br /><br />
                    </p>

                </>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.142)
            ]
        },
        {
            title: "Page 13 of 15",
            text: (
                <>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini).
                    Use the View menu to select that Report.
                    </p>

                    <p>
                    </p>

                    <p>
                    The original problem statement did not specify an end type.
                    It turns out that selecting a different end type may impact free length
                    but otherwise doesn't impact the final solution.
                    </p>

                    <p>
                    Next, we'll make a detailed comparison with the handbook results.
                    </p>
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 14 of 15",
            text: (
                <>
                    <p>
                    The handbook results:<br />
                    &nbsp; &nbsp;  wire diameter = 0.142 in.<br />
                    &nbsp; &nbsp;  stress at solid = 80,000  psi &nbsp;  (uncorrected)<br />
                    &nbsp; &nbsp;  number of active coils = 16.95 &nbsp; (rounded to 17)
                    </p>

                    <p>
                    The ODOP:Spring solution required an adjustment:<br />
                    &nbsp; &nbsp;  Wahl stress correction factor kw1 = 1.21 &nbsp;  (from Report 2)<br />
                    &nbsp; &nbsp;  stress at solid = 96,880  psi &nbsp;  (corrected)
                    </p>

                    <p>
                    With the adjustment in place, the results are in very good agreement.
                    </p>

                    <p>
                    While the ambiguity over stress correction factor and end type provided a few
                    challenges in formulating this demonstration session,
                    the real objective of demonstrating how ODOP:Spring can handle a "design-to-stress"
                    problem has been achieved.
                    </p>

                    <p>
                    Finally, it seems appropriate to comment that the handbook specifies a stress level
                    that seems excessive for stainless steel.
                    Perhaps the handbook problem was originally developed in the context of carbon steel
                    and then later switched to specify stainless to accomodate the background story
                    of a maritime environment.
                    In any case, we should anticipate a short cycle life for this design.
                    </p>
                </>
            )
        },
        {
            title: "Page 15 of 15 (last page)",
            text: (
                <>
                    <p>
                    Several more demo problems are available.
                    They are named demo1, demo2, ... etc.
                    Refer to the on-line documentation section (Help entry) covering the
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp;
                    for a complete list of additional tutorial and demo topics.
                    </p>

                    <p>If you do not wish to continue with more demonstration problems,
                    you can experiment with the various ODOP:Spring features, menus and reports.
                    The HELP menu is a good place to start. </p>
                    <br />
                </>
            )
        }
    ]
}
