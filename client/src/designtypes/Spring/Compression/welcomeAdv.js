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
                    &nbsp;<a href="/docs/Help/menus.html#ViewAdvanced" target="_blank" rel="noopener noreferrer">Advanced View </a> 
                    is below. 
                    The existing values are an arbitrary starting point. 
                    Modify them to meet your requirements. 
                    </p>
                    
                    <p>
                    Values in the 
                    &nbsp;<a href="/docs/Help/terminology.html#independentVar" target="_blank" rel="noopener noreferrer">Independent Variables</a>&nbsp; 
                    and 
                    &nbsp;<a href="/docs/Help/terminology.html#calcInputs" target="_blank" rel="noopener noreferrer">Calculation Inputs</a>&nbsp; 
                    sections below are inputs.
                    As input values are entered, calculation results appear immediately in the 
                    &nbsp;<a href="/docs/Help/terminology.html#dependentVar" target="_blank" rel="noopener noreferrer">Dependent Variables</a>&nbsp; 
                    section. 
                    Dependent Variables can be controlled by setting 
                    &nbsp;<a href="/docs/Help/terminology.html#constraints" target="_blank" rel="noopener noreferrer">constraints</a>&nbsp; 
                    or 
                    &nbsp;<a href="/docs/Help/terminology.html#fix" target="_blank" rel="noopener noreferrer">Fixed status</a>.&nbsp; 
                    Use the 
                    &nbsp;<a href="/docs/Help/search.html" target="_blank" rel="noopener noreferrer">Search</a>&nbsp; 
                    function (Search button or the <b>Action : Search</b> menu) to find a design that meets constraints and Fixes.
                    Fixed status causes Search to achieve or hold a specified value.
                    Free status allows Search to manipulate the variable to achieve a feasible design. 
                    By default, specifying a value for an Independent Variable will leave that variable in Fixed status.
                    See
                    &nbsp;<a href="/docs/Help/terminology.html#autoFix" target="_blank" rel="noopener noreferrer">AutoFix</a>&nbsp; 
                    for details. 
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
                logUsage('event','welcomeAdv', { 'event_label': 'Page 01 of 04' }),
                changeResultTerminationCondition('When finished reading all 4 pages, use the gray "Exit" button in the upper right to close the light green panel above.'),
            ]
        },
        {
            title: "Page 02 of 04",
            text: (
                <>
                    <p>
                    The <a href="docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    sessions provide additional detail on these concepts as well as more advanced topics 
                    such as user specified material properties and end types.
                    </p>
                    
                    <p>
                    Expanded descriptions are available as tooltips for many elements of the Advanced View.
                    Hover the cursor (tap on a touch screen) over headings, labels, and variable names to learn more.
                    This compression spring 
                    &nbsp;<a href="/docs/Help/png/ForceVsDeflection.png" target="_blank" rel="noopener noreferrer">Force-Deflection diagram</a>&nbsp; 
                    illustrates selected variable names.  
                    Additional insights are available in the  
                    &nbsp;<a href="/docs/Help" target="_blank" rel="noopener noreferrer">on-line Help</a>&nbsp; 
                    plus 
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    sessions. 
                    </p>

                    <p>
                    The multi-colored 
                    &nbsp;<a href="/docs/Help/feasibility.html" target="_blank" rel="noopener noreferrer">Feasibility Status indicator</a>,&nbsp; 
                    provides feedback on the viability of the current design.
                    See also: 
                    &nbsp;<a href="/docs/Help/designSituations.html" target="_blank" rel="noopener noreferrer">Design Situations</a>&nbsp; and 
                    &nbsp;<a href="/docs/Help/terminology.html#feasibleRegion" target="_blank" rel="noopener noreferrer">Feasible Region</a>.&nbsp; 
                   </p>
                </>
            ), 
            actions: [
                logUsage('event','welcomeAdv', { 'event_label': 'Page 02 of 04' })
            ]
        },
        {
            title: "Page 03 of 04",
            text: (
                <>
                    <p>
                    The ODOP:Spring 
                    &nbsp;<a href="docs/Help/menus.html#ViewAdvanced" target="_blank" rel="noopener noreferrer">Advanced View</a>&nbsp; 
                    allows access to all program features.
                    Alternative presentations are provided by other views.
                    &nbsp;<a href="/docs/Help/menus.html#ViewReports" target="_blank" rel="noopener noreferrer">Reports</a>&nbsp; 
                    present additional information about your current spring design.
                    Use the <b>View</b> menu above to switch views.
                    </p>
                    
                    <p>
                    The <b>File : Open</b> menu above provides the ability to open existing designs of 
                    supported spring 
                    &nbsp;<a href="/docs/Help/DesignTypes" target="_blank" rel="noopener noreferrer">types</a>&nbsp; 
                    (
                    <a href="/docs/Help/DesignTypes/c_spring.html" target="_blank" rel="noopener noreferrer">compression,</a>&nbsp; 
                    <a href="/docs/Help/DesignTypes/e_spring.html" target="_blank" rel="noopener noreferrer">extension</a>&nbsp;
                    &  
                    &nbsp;<a href="/docs/Help/DesignTypes/t_spring.html" target="_blank" rel="noopener noreferrer">torsion</a> 
                    ) and 
                    &nbsp;<a href="/docs/Help/SpringDesign/unitsUSmetric.html" target="_blank" rel="noopener noreferrer">units</a>&nbsp; (U.S., metric). 
                    These system-provided designs can be a starting point for new custom designs. 
                    Sign up for a free  
                    &nbsp;<a href="/docs/About/userAccounts.html" target="_blank" rel="noopener noreferrer">user account</a>&nbsp; 
                    to save private designs into the cloud-based ODOP Design Library.  
                   </p>
                    <br />
                </>
            ),
            actions: [
                logUsage('event','welcomeAdv', { 'event_label': 'Page 03 of 04' })
            ]
        },
        {
            title: "Page 04 of 04 (last page)",
            text: (
                <>
                    <p>
                    In summary: 
                    <br />
                    Enter known values. 
                    Use constraints and Fix to describe what the design needs to achieve.
                    Be sure to select appropriate values for Material_Type and End_Type.
                    Use the Search function (Search button or <b>Action : Search</b> menu) to find a feasible solution.
                    Use the Seek function (<b>Action : Seek</b> menu) to optimize a feasible design.
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
                logUsage('event','welcomeAdv', { 'event_label': 'Page 04 of 04' })
            ]
        }
    ]
}
