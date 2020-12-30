import React from 'react';
import { changeSymbolValue, loadInitialState, changeLabelsValue } from '../../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    Welcome to the ODOP:Spring web app!
                    The compression spring Calculator view is below. 
                    </p>
                    
                    <p>
                    The white entry fields below are inputs to the Calculator.
                    Once input values are entered, calculation results will appear
                    in the currently empty gray fields.
                    </p>

                    <p>
                    Push the blue "Next" button in the upper right to show the next page of instructions, hints and tips. 
                    Push the darker gray "Exit" button to close this light green panel. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("OD_Free", Number.NaN),
                changeSymbolValue("Wire_Dia", 0.10),
                changeSymbolValue("L_Free", Number.NaN),
                changeSymbolValue("Coils_T", Number.NaN),
                changeSymbolValue("Force_1", Number.NaN),
                changeSymbolValue("Force_2", Number.NaN),
                changeLabelsValue([{name: 'COMMENT', value: 'Welcome - Compression spring - Calculator view'}])
            ]
        },
        {
            title: "Page 02 of 04",
            text: (
                <React.Fragment>
                    <p>
                    The ODOP:Spring Calculator view is based on applied load.
                    Forces are calculation inputs. Deflections are outputs. 
                    Alternative calculation approaches are supported by other views.
                    Use the <b>View</b> menu above to switch views.
                    </p>
                    
                    <p>
                    ODOP displays the multi-colored Feasibility Status indicator as feedback on the viability of the current design.
                    For more information about design feasibility and about the Feasibility Status indicator, follow these links: 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/feasibility" target="_blank" rel="noopener noreferrer">Feasiblity</a>,&nbsp; 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/designSituations" target="_blank" rel="noopener noreferrer">Design Situations</a>&nbsp; and 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#feasibleRegion" target="_blank" rel="noopener noreferrer">Feasible Region</a>.&nbsp; 
                   </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 03 of 04",
            text: (
                <React.Fragment>
                    <p>
                    Calculator view provides a table of commonly available wire diameters that depends on the selected Material_Type and units (U.S., metric). 
                    Choose a standard wire diameter by selecting the Wire_Dia field and scrolling to the desired value. 
                    The selected value is marked with FIXed status so that it is not manipulated by the ODOP Search feature (<b>Action : Search</b> menu).
                    </p>
                    
                    <p>
                    Tooltips are available for many elements of the Calculator view.
                    Hover the cursor (tap a touch screen) to learn about these elements.
                    Additional insights are available in the on-line Help plus Tutorial and Demo sessions.
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 04 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    The <b>File : Open</b> menu provides the ability to open and operate with existing designs of 
                    other spring types (extension, torsion) and units (U.S., metric).
                   </p>
                    
                    <p>
                    Push the gray "Exit" button in the upper right to close this light green panel.
                    Enter input values in the white fields.
                    View the corresponding Calculator outputs.
                    Switch to other views to utilize the full capabilities of ODOP:Spring.
                   </p>
                    
                    <p>
                    We welcome your feedback.  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/About/ContactUs" target="_blank" rel="noopener noreferrer">Contact Us.</a>&nbsp; 
                    </p>
                    <br />
                </React.Fragment>
            )
        }
    ]
}
