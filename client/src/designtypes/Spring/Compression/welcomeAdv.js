import React from 'react';
import { saveAutoSave } from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    Welcome to the ODOP:Spring web app!
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/menus#ViewAdvanced" target="_blank" rel="noopener noreferrer">Advanced view </a> 
                    is below. 
                    The existing values are an arbitrary starting point. 
                    Modify them to meet your requirements. 
                    </p>
                    
                    <p>
                    Values in the 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#independentVar" target="_blank" rel="noopener noreferrer">Independent Variables</a>&nbsp; 
                    and 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#calcInputs" target="_blank" rel="noopener noreferrer">Calculation Inputs</a>&nbsp; 
                    sections below are inputs.
                    As input values are entered, calculation results will appear immediately in the 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#dependentVar" target="_blank" rel="noopener noreferrer">Dependent Variables</a>&nbsp; 
                    section. 
                    Dependent Variables can be controlled by setting 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#constraints" target="_blank" rel="noopener noreferrer">constraints</a>&nbsp; 
                    or 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#fix" target="_blank" rel="noopener noreferrer">FIXed status</a>.&nbsp; 
                    Use the 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/search" target="_blank" rel="noopener noreferrer">Search</a>&nbsp; 
                    function (<b>Action : Search</b> menu) to find a design that meets constraints and FIXes.
                    </p>

                    <p>
                    Push the blue "Next" button in the upper right to show the next page of instructions, hints and tips. 
                    Push the darker gray "Exit" button to close this light green panel. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                saveAutoSave()
            ]
        },
        {
            title: "Page 02 of 04",
            text: (
                <React.Fragment>
                    <p>
                    <a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#fix" target="_blank" rel="noopener noreferrer">FIXed status</a>&nbsp; 
                    causes Search to achieve or hold a specified value.
                    FREE status allows Search to manipulate the variable to achieve a feasible design. 
                    The <a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    sessions provide additional detail on these concepts as well as more advanced topics 
                    such as user specified material properties and end types.
                    </p>

                    <p>
                    The multi-colored 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/feasibility" target="_blank" rel="noopener noreferrer">Feasibility Status indicator</a>,&nbsp; 
                    provides feedback on the viability of the current design.
                    See also: 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/designSituations" target="_blank" rel="noopener noreferrer">Design Situations</a>&nbsp; and 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#feasibleRegion" target="_blank" rel="noopener noreferrer">Feasible Region</a>.&nbsp; 
                   </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 03 of 04",
            text: (
                <React.Fragment>
                    <p>
                    The ODOP:Spring Advanced view allows access to all program features.
                    Alternative presentations are provided by other views.
                    Use the <b>View</b> menu above to switch views.
                    </p>
                    
                    <p>
                    Tooltips are available for many elements of the Advanced view.
                    Hover the cursor over an item of interest (tap on a touch screen) to learn about these elements.
                    </p>
                    
                    <p>
                    The <b>File : Open</b> menu above provides the ability to open existing designs of 
                    supported spring 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/DesignTypes" target="_blank" rel="noopener noreferrer">types</a>&nbsp; 
                    (
                    <a href="https://www.springdesignsoftware.org/odop/docs/Help/DesignTypes/c_spring" target="_blank" rel="noopener noreferrer">compression,</a>&nbsp; 
                    <a href="https://www.springdesignsoftware.org/odop/docs/Help/DesignTypes/e_spring" target="_blank" rel="noopener noreferrer">extension</a>&nbsp;
                    &  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/DesignTypes/t_spring" target="_blank" rel="noopener noreferrer">torsion</a> 
                    ) and 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/SpringDesign/unitsUSmetric" target="_blank" rel="noopener noreferrer">units (U.S., metric)</a>.&nbsp; 
                    These system-provided designs can be a starting point for new custom designs. 
                    Sign up for a free  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/About/userAccounts" target="_blank" rel="noopener noreferrer">user account</a>&nbsp; 
                    to save private designs into the cloud-based ODOP Design Library.  
                   </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 04 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    In summary: 
                    <br />
                    Enter known values. 
                    Use constraints and FIX to describe what the design needs to achieve.
                    Be sure to select appropriate values for Material_Type and End_Type.
                    Use the Search function (<b>Action : Search</b> menu) to find a feasible solution.
                    Use the Seek function (<b>Action : Seek</b> menu) to optimize a feasible design.
                   </p>
                    
                    <p>
                    Push the gray "Exit" button in the upper right to close this light green panel.
                   </p>
                    
                    <p>
                    We welcome your feedback.  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/About/ContactUs" target="_blank" rel="noopener noreferrer">Contact Us.</a>&nbsp; 
                    </p>
                </React.Fragment>
            )
        }
    ]
}
