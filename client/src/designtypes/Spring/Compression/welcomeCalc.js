import React from 'react';
import { logUsage, changeResultTerminationCondition } from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    Welcome to the ODOP:Spring web app!
                    &nbsp;<a href="/docs/Help/menus.html#ViewCalculator" target="_blank" rel="noopener noreferrer">Calculator View</a>&nbsp; 
                    is below. 
                    </p>

                    <p>
                    The existing values are an arbitrary starting point. 
                    Modify them to meet your requirements. 
                    Values in the white background fields can be controlled by user input. 
                    Control of Dependent Variables (marked with an asterisk) requires a Search.  
                    Calculation results appear in the light gray background fields.
                    </p>

                    <p>
                    At first glance, ODOP:Spring Calculator View appears to be based on applied load.
                    Forces are inputs (Independent Variables). 
                    Deflections are outputs (Dependent Variables). 
                    There seems to be a requirement to supply a value for wire diameter and the total number of coils 
                    (Independent Variables). 
                    <b> But wait! There is more. </b>
                    Continue reading to learn how access to the ODOP backsolving features (
                          <a href="/docs/Help/terminology.html#fix" target="_blank" rel="noopener noreferrer">Fix / Free</a>,&nbsp; 
                    &nbsp;<a href="/docs/Help/terminology.html#constraints" target="_blank" rel="noopener noreferrer">constraints</a>&nbsp; 
                    and
                    &nbsp;<a href="/docs/Help/search.html" target="_blank" rel="noopener noreferrer">Search</a> 
                    ) allows flexibility on how your design problem is specified.  
                    For example, it is possible to specify force and deflection or spring rate 
                    and then let the Search feature determine the necessary wire diameter, coil diameter and
                    number of coils. 
                    </p>

                    <p>
                    Push the blue "Next" button in the upper right to show the next page of instructions, hints and tips. 
                    Push the darker gray "Exit" button to close (hide) this light green panel. 
                    </p>
                </>
            ),
            actions: [
//                                       We have concluded that AutoSave here is not a good idea
//                saveAutoSave(),
                logUsage('event','welcomeCalc', { event_label: 'Page 01 of 04' }),
//                                       Expect to re-enable NaN in future release
//                                       "NaN" (Not a Number) may appear if inputs are not complete.
//                changeSymbolValue("OD_Free", Number.NaN),
//                changeSymbolValue("Wire_Dia", Number.NaN),
//                changeSymbolValue("L_Free", Number.NaN),
//                changeSymbolValue("Coils_T", Number.NaN),
//                changeSymbolValue("Force_1", Number.NaN),
//                changeSymbolValue("Force_2", Number.NaN),
                changeResultTerminationCondition('When finished reading all four of the Welcome pages above, use the gray "Exit" button in the upper right to close the light green panel.'),
            ]
        },
        {
            title: "Page 02 of 04",
            text: (
                <>
                    <p>
                    Click on one of those white entry fields to specify a value, 
                    control Fix / Free status and to establish or modify constraints. 
                    Fixed status causes the ODOP Search feature (Search button or <b>Action : Search</b> menu) to achieve or hold a specified value.
                    Free status allows Search to manipulate the variable to achieve a feasible design. 
                    By default, specifying a value will leave that variable in Fixed status.
                    See
                    &nbsp;<a href="/docs/Help/terminology.html#autoFix" target="_blank" rel="noopener noreferrer">AutoFix</a>&nbsp; 
                    for details. 
                    The <a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    sessions provide additional detail on these concepts as well as more advanced topics 
                    such as user specified material properties and end types.
                    </p>
                    
                    <p>
                    Expanded descriptions are available as tooltips for many elements of the Calculator View.
                    Hover the cursor (tap on a touch screen) over headings, labels, and variable names to learn more.
                    This compression spring 
                    &nbsp;<a href="/docs/Help/img/ForceVsDeflection.png" target="_blank" rel="noopener noreferrer">Force-Deflection diagram</a>&nbsp; 
                    illustrates selected variable names.  
                    Additional insights are available in the  
                    &nbsp;<a href="/docs/Help" target="_blank" rel="noopener noreferrer">on-line Help</a>&nbsp; 
                    plus 
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    sessions. 
                    </p>
                    <br />
                </>
            ),
            actions: [
                logUsage('event','welcomeCalc', { event_label: 'Page 02 of 04' })
            ]
        },
        {
            title: "Page 03 of 04",
            text: (
                <>
                    <p>
                    The multi-colored 
                    &nbsp;<a href="/docs/Help/feasibility.html" target="_blank" rel="noopener noreferrer">Feasibility Status indicator</a>,&nbsp; 
                    provides feedback on the viability of the current design.
                    See also: 
                    &nbsp;<a href="/docs/Help/designSituations.html" target="_blank" rel="noopener noreferrer">Design Situations</a>&nbsp; and 
                    &nbsp;<a href="/docs/Help/terminology.html#feasibleRegion" target="_blank" rel="noopener noreferrer">Feasible Region</a>.&nbsp; 
                    </p>
                    
                    <p>
                    The Wire_Dia field of Calculator View provides a list of commonly available wire diameters 
                    that depends on the selected Material_Type and 
                    &nbsp;<a href="/docs/Help/SpringDesign/unitsUSmetric.html" target="_blank" rel="noopener noreferrer">units</a>&nbsp; (U.S., metric). 
                    To choose a standard wire diameter, select the Wire_Dia input field, choose "Select std size", 
                    click in the Wire_Dia field and scroll to the desired value. 
                    After selection, the value is automatically marked with Fixed status so that it is not manipulated by Search.
                    </p>
                    
                    <p>
                    Use the <b>View</b> menu above to switch views. 
                    &nbsp;<a href="/docs/Help/menus.html#ViewAdvanced" target="_blank" rel="noopener noreferrer">Advanced View</a>&nbsp; 
                    provides access to the full range of ODOP:Spring features. 
                    &nbsp;<a href="/docs/Help/menus.html#ViewReports" target="_blank" rel="noopener noreferrer">Reports</a>&nbsp; 
                    present additional information about your current spring design.
                    </p>
                    <br />
                </>
            ),
            actions: [
                logUsage('event','welcomeCalc', { event_label: 'Page 03 of 04' })
            ]
        },
        {
            title: "Page 04 of 04 (last page)",
            text: (
                <>
                    <p>
                    The <b>File : Open</b> menu above provides the ability to open existing designs of 
                    supported spring 
                    &nbsp;<a href="/docs/Help/DesignTypes" target="_blank" rel="noopener noreferrer">types</a>&nbsp; 
                    (
                    <a href="/docs/Help/DesignTypes/c_spring.html" target="_blank" rel="noopener noreferrer">compression,</a>&nbsp; 
                    <a href="/docs/Help/DesignTypes/e_spring.html" target="_blank" rel="noopener noreferrer">extension</a>&nbsp;
                    &  
                    &nbsp;<a href="/docs/Help/DesignTypes/t_spring.html" target="_blank" rel="noopener noreferrer">torsion</a> 
                    ) and units (U.S., metric). 
                    These system-provided designs can be a starting point for new custom designs. 
                    Sign up for a free  
                    &nbsp;<a href="/docs/About/userAccounts.html" target="_blank" rel="noopener noreferrer">user account</a>&nbsp; 
                    to save private designs into the cloud-based ODOP Design Library.  
                   </p>
                    
                    <p>
                    In summary: 
                    <br />
                    <b>Click on a value</b> to specify what is known or desired in order to describe 
                    your design objectives in terms of Fix, Free and constraints.  
                    Independent Variables need to have a plausible (not blank; usually not zero and not negative) starting value.
                    Be sure to select appropriate values for Material_Type and End_Type.
                    Use the the Search button or the <b>Action : Search</b> menu to find a feasible design. 
                    Use the <b>Action : Seek</b> menu to optimize a feasible design. 
                    Switch to other views to utilize additional capabilities of ODOP:Spring.
                   </p>
                    
                    <p>
                    Push the gray "Exit" button in the upper right to close this light green panel.
                   </p>
                    
                    <p>
                    We welcome your feedback.  
                    &nbsp;<a href="/docs/About/ContactUs.html" target="_blank" rel="noopener noreferrer">Contact Us.</a>&nbsp; 
                    </p>
                </>
            ),
            actions: [
                logUsage('event','welcomeCalc', { event_label: 'Page 04 of 04' })
            ]
        }
    ]
}
