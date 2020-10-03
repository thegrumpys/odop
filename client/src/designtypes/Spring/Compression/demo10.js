import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, freeSymbolValue, loadInitialState, setSymbolFlag, resetSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    The following example provides the ODOP:Spring solution to a reference book 
                    problem illustrating the design of a compression spring .
                    </p>
                    
                    <p>
                    While this particular problem struggles with ambiguity on 
                    issues like end type and stress correction factors,
                    it provides an opportunity to demonstrate how to handle a "design-to-stress" 
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
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 12",
            text: (
                <React.Fragment>
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
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 12",
            text: (
                <React.Fragment>
                    <p>
                    To briefly restate the problem, our challenge is to 
                    design a compression spring such that the following specifications are met:<br />
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
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 12",
            text: (
                <React.Fragment>
                    <p>
                    Because the problem has specified a specific stress level, 
                    we will treat this as a "design-to-stress" problem.  
                    You may wish to review the
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/SpringDesign/advancedSpringOperations" target="_blank" rel="noopener noreferrer">Design To Stress</a>&nbsp; 
                    and 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/SpringDesign/materials" target="_blank" rel="noopener noreferrer">Materials</a>&nbsp; 
                    sections of the documentation (on-line Help entries) for additional information. 
                    </p>
                    
                    <p>
                    This is a good time to take a good look at the existing values.
                    You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.
                    </p>
                    
                    <p>
                    Next, the demo session will enter everything we know about the problem. 
                    Affected values will update immediately as the demo session enters the changes.                     
                    </p>
                    <br /><br />
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 12",
            text: (
                <React.Fragment>
                    <p>
                    The demo has now entered what is known about the problem. 
                    In summary, the changes were:
                    </p>
                    
                    <p>
                    CHANGE Material_Type 302_STAINLESS &nbsp; (sets Density & Torsion Modulus but other properties are specified separately)<br />
                    CHANGE Prop_Calc_Method 3 &nbsp; (allows stress limits to be directly specified; not from materials table)<br /> 
                    CHANGE Stress_Lim_Stat 96960 &nbsp; (80,000 PSI with stress correction applied) <br /> 
x                    CHANGE Tensile 193920 &nbsp; (figured so that allowable stress is 50%) <br /> 
                    CHANGE  End_Type Closed<br />
                    FIX Force_1 0.0<br /> 
                    FIX Force_2 90.0<br /> 
                    FIX Force_Solid 90.0<br /> 
                    FIX L_Stroke 3.0<br /> 
                    FIX Mean_Dia 1.0<br /> 
                    FIX Stress_Solid 96960<br /> 
                    Free FS_2 &nbsp; (as per Design-to-Stress entry in on-line Help) <br /> 
                    Free FS_Solid<br /> 
                    Free %_Avail_Deflect
                    </p>
                    <br />
                    <p>
                    The remaining Independent Variable values remain as established by the initialState. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Material_Type",7),
                changeSymbolValue("Prop_Calc_Method",3),
//                changeSymbolValue("Tensile",193920.0),
                changeSymbolValue("Stress_Lim_Stat",96960),
                changeSymbolValue("End_Type",3),
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 90.0),
                fixSymbolValue('Force_Solid', 90.0),
                fixSymbolValue('L_Stroke', 3.0),
                fixSymbolValue('Mean_Dia', 1.0),
                fixSymbolValue('Stress_Solid', 96960.0),
                saveOutputSymbolConstraints('FS_2'),
//                resetSymbolFlag('FS_2')
//                freeSymbolValue('FS_2')
            ]
        },
        {
            title: "Page 06 of 12",
            text: (
                <React.Fragment>
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
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 12",
            text: (
                <React.Fragment>
                    <p>Yes,  A feasible solution is available. Please take a moment to scroll through and view the values.</p>
                    <p>
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini). 
                    Simply select (click on) that tab to view the report.
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
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 08 of 12",
            text: (
                <React.Fragment>
                    <p>
                    If you are still on the Report tab,
                    you may want to switch back to the tab containing the main page ("Design:").
                    </p>
                    
                    <p>
                    As a general rule, in the first approach to a new problem, 
                    we let the calculations use an arbitrary (non-standard) wire diameter.
                    </p>
                    
                    <p>
                    While the difference is quite small, in order to compare with the handbook result, 
                    the demo session will impose the handbook value of Wire_Dia. 
                    In summary:
                    <br /><br />
                    CHANGE  Wire_Dia 0.142<br />
                    <br />
                    Look for the new value of Wire_Dia on the next page.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 09 of 12",
            text: (
                <React.Fragment>
                    <p>
                    Now that there has been a slight change in wire diameter, another search
                    will be required to make corresponding adjustments in the other parameters.
                    </p>
                    
                    <p>
                    Look for the results on the next page.
                    <br /><br />
                    </p>
                    
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.142)
            ]
        },
        {
            title: "Page 10 of 12",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    Note that results of additional calculations are given in Report&nbsp;1&nbsp;(mini). 
                    Simply select (click on) that tab to view the report.
                    </p>
                    
                    <p>
                    <br /><br />
                    </p>
                    
                    <p>
                    Next we'll make a detailed comparison with the handbook results.
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 11 of 12",
            text: (
                <React.Fragment>
                    <p>
                    The handbook results:<br />
                    &nbsp; &nbsp;  wire diameter = 0.142 in.<br />
                    &nbsp; &nbsp;  stress at solid = 80,000  psi &nbsp;  (uncorrected)<br />
                    &nbsp; &nbsp;  stress at solid = 96,960  psi &nbsp;  (corrected)<br />
                    &nbsp; &nbsp;  number of active coils = 16.95 &nbsp; (rounded to 17)
                    </p>
                    
                    <p>
                    The results are in very good agreement.
                    </p>
                    
                    <p>
                    While the ambiguity over stress correction factor and end type provided a few
                    challenges in formulating this demonstration session, 
                    the real objective of demonstrating how ODOP:Spring can handle a "design-to-stess" 
                    problem has been achieved.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 12 of 12 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    Several more demo problems are available. 
                    They are named demo1, demo2, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a complete list of additional tutorial and demo topics.
                    </p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP:Spring features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                    <br />
                </React.Fragment>
            )
        }
    ]
}
