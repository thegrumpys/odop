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
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/menus#ViewCalculator" target="_blank" rel="noopener noreferrer">Calculator view</a>&nbsp; 
                    is below. 
                    </p>

                    <p>
                    The white background entry fields below are inputs to the Calculator.
                    Calculation results appear in the light gray background fields.
                    The existing values are an arbitrary starting point. 
                    Modify them to meet your requirements. 
                    </p>

                    <p>
                    At first glance, ODOP:Spring Calculator view appears to be based on applied load.
                    Forces are inputs. 
                    Deflections are outputs. 
                    There seems to be a requirement to supply a value for the number of coils. 
                    But wait! There is more.
                    With a little investigation you will find that Calculator view provides access to the
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#fix" target="_blank" rel="noopener noreferrer">FIX / FREE</a>,&nbsp; 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#constraints" target="_blank" rel="noopener noreferrer">constraints</a>&nbsp; 
                    and
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/search" target="_blank" rel="noopener noreferrer">Search</a>&nbsp; 
                    features that allow flexibility on how your design problem is specified.  
                    For example, it is possible to specify force and deflection at two points
                    and then let the software determine the necessary wire diameter, coil diameter and
                    number of coils. 
                    </p>

                    <p>
                    Push the blue "Next" button in the upper right to show the next page of instructions, hints and tips. 
                    Push the darker gray "Exit" button to close this light green panel. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                saveAutoSave(),
//                                       Expect to re-enable NaN in future release
//                                       "NaN" (Not a Number) may appear if inputs are not complete.
//                changeSymbolValue("OD_Free", Number.NaN),
//                changeSymbolValue("Wire_Dia", Number.NaN),
//                changeSymbolValue("L_Free", Number.NaN),
//                changeSymbolValue("Coils_T", Number.NaN),
//                changeSymbolValue("Force_1", Number.NaN),
//                changeSymbolValue("Force_2", Number.NaN),
            ]
        },
        {
            title: "Page 02 of 04",
            text: (
                <React.Fragment>
                    <p>
                    <b>Right click</b> (long press on a touch screen) on 
                    one of those white entry fields or a darker (more bold) numeric value to control 
                    FIX / FREE status and to establish or modify constraints. 
                    FIXed status causes the ODOP Search feature (<b>Action : Search</b> menu) to achieve or hold a specified value.
                    FREE status allows Search to manipulate the variable to achieve a feasible design.
                    The <a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    sessions provide additional detail on these concepts.
                    For now, Firefox users will need to use Advanced View in order to access FIX / FREE and constraints. 
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
                    The Wire_Dia field of Calculator view provides a list of commonly available wire diameters 
                    that depends on the selected Material_Type and 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/SpringDesign/unitsUSmetric" target="_blank" rel="noopener noreferrer">units (U.S., metric)</a>.&nbsp; 
                    Choose a standard wire diameter by selecting the Wire_Dia input field and scrolling to the desired value. 
                    After selection the value is automatically marked with FIXed status so that it is not manipulated by Search.
                    </p>
                    
                    <p>
                    Tooltips are available for many elements of the Calculator view.
                    Hover the cursor (tap on a touch screen) to learn about these elements.
                    Additional insights are available in the  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help" target="_blank" rel="noopener noreferrer">on-line Help</a>&nbsp; 
                    plus 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    sessions.
                    </p>
                    
                    <p>
                    Use the <b>View</b> menu above to switch views. 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/menus#ViewAdvanced" target="_blank" rel="noopener noreferrer">Advanced view</a>&nbsp; 
                    provides access to the full range of ODOP:Spring features.
                    Reports present additional information about your current spring design.
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
                    supported spring 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/DesignTypes" target="_blank" rel="noopener noreferrer">types</a>&nbsp; 
                    (
                    <a href="https://www.springdesignsoftware.org/odop/docs/Help/DesignTypes/c_spring" target="_blank" rel="noopener noreferrer">compression,</a>&nbsp; 
                    <a href="https://www.springdesignsoftware.org/odop/docs/Help/DesignTypes/e_spring" target="_blank" rel="noopener noreferrer">extension</a>&nbsp;
                    &  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/DesignTypes/t_spring" target="_blank" rel="noopener noreferrer">torsion</a> 
                    ) and units (U.S., metric). 
                    These system-provided designs can be a starting point for new custom designs. 
                    Sign up for a free  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/About/userAccounts" target="_blank" rel="noopener noreferrer">user account</a>&nbsp; 
                    to save private designs into the cloud-based ODOP Design Library.  
                   </p>
                    
                    <p>
                    In summary: 
                    <br />
                    Enter input values in the white fields.
                    Be sure to select appropriate values for Material_Type, End_Type and Wire_Dia.
                    View the corresponding Calculator outputs.
                    Use <b>right click</b> to access FIX / FREE and constraints.
                    Switch to other views to utilize additional capabilities of ODOP:Spring.
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
