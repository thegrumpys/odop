import React from 'react';
import { changeSymbolValue, loadInitialState, changeLabelsValue, saveAutoSave } from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    Welcome to the ODOP:Spring web app!
                    Advanced view is below. 
                    The existing values are an arbitrary starting point. 
                    Modify them to meet your requirements. 
                    </p>
                    
                    <p>
                    Values in the Independent Variables and Calculation Inputs sections below are inputs.
                    As input values are entered, calculation results will appear immediately. 
                    Dependent Variables can be controlled by setting constraints or setting FIXed status. 
                    Use the Search function (<b>Action : Search</b> menu) to find a design that meets constraints and FIXes.
                    </p>

                    <p>
                    Push the blue "Next" button in the upper right to show the next page of instructions, hints and tips. 
                    Push the darker gray "Exit" button to close this light green panel. 
                    </p>
                    <br />
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
                    <br />
                    <p>
                    The ODOP:Spring Advanced view allows access to all program features.
                    Alternative calculation approaches are supported by other views.
                    Use the <b>View</b> menu above to switch views.
                    </p>
                    
                    <p>
                    The multi-colored Feasibility Status indicator provides feedback on the viability of the current design.
                    For more information about design feasibility and about the Feasibility Status indicator, follow the links: 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/feasibility" target="_blank" rel="noopener noreferrer">Feasiblity</a>,&nbsp; 
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
                    FIXed status causes Search to achieve or hold a specified value.
                    FREE status allows Search to manipulate the variable to achieve a feasible design.
                    For more information, see: 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#fix" target="_blank" rel="noopener noreferrer">FIX</a>&nbsp; 
                    and various tutorial and demo sessions.
                    For more information on these sessions, see:
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    </p>
                    
                    <p>
                    Tooltips are available for many elements of the Advanced view.
                    Hover the cursor over an item of interest (tap a touch screen) to learn about these elements.
                    Additional insights are available in the on-line Help plus Tutorial and Demo sessions.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 04 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    The <b>File : Open</b> menu above provides the ability to open existing designs of 
                    supported spring types (compression, extension & torsion) and units (U.S., metric). 
                    These system-provided designs can be a starting point for new custom designs. 
                   </p>
                    
                    <p>
                    In summary: 
                    <br />
                    Enter values and constraints to describe what is known and what the design needs to achieve. 
                    Be sure to select appropriate values for Material_Type and End_Type.
                    Use the Search function (<b>Action : Search</b> menu) to find a feasible solution.
                    Use the Seek function (<b>Action : Seek</b> menu) to optimize a feasible design.
                    Switch to other views to utilize the full capabilities of ODOP:Spring.
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
