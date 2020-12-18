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
                    The white entry fields are inputs to the Calculator.
                    Once input values are in place, calculation results will appear.
                    </p>

                    <p>
                    Push the blue "Next" button in the upper right to show the next page of instructions, hints and tips. 
                    Push the darker gray "Exit" button to continue without this light green panel. 
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
                    The ODOP:Spring Calculator view has forces as inputs and deflections as calculation outputs. 
                    The Advanced view supports a variety of alternative approaches.
                    </p>
                    
                    <p>
                    While Calculator view does not provide direct control over constraints,
                    it does display the multi-colored Feasibility Status indicator as feedback on the viability of the current design.
                    For more information about design Feasibility and about the Feasibility Status indicator, follow these links: 
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
                    Calculator view provides a table of standard wire diameters that depends on the selected Material_Type and units (U.S., metric). 
                    Choose a standard wire diameter by selecting the Wire_Dia field and scrolling to the desired value. 
                    This will leave the selected value in FIXed status.
                    FIXed status causes the Search to achieve a specified fixed value for the associated variable.
                    FREE status allows the search to manipulate the associated variable to achieve a feasible design.
                    For more information, see: 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#fix" target="_blank" rel="noopener noreferrer">FIX</a>&nbsp; 
                    and various tutorial (tutorTour) and demo (demo, demo1) sessions.
                    For more information on these sessions, see:
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    </p>
                    
                    <p>
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
                    ODOP:Spring's Advanced view provides access to the full set of features including
                    constraints and FIX / FREE.
                    Use the <b>View : Advanced</b> menu to switch into Advanced view.
                    </p>
                    
                    <p>
                    The <b>File : Open</b> menu provides the ability to open and operate with existing designs of 
                    other spring types (extension, torsion) and units (U.S., metric).
                   </p>
                    
                    <p>
                    Push the gray "Exit" button in the upper right to continue.
                    Enter input values in the white fields.
                    View the corresponding Calculator outputs.
                    Switch to Advanced mode to utilize the full capabilities of ODOP:Spring.
                   </p>
                    
                    <p>
                    We welcome your feedback.  
                    &nbsp;<a href="https://thegrumpys.github.io/odop/About/ContactUs" target="_blank" rel="noopener noreferrer">Contact Us.</a>&nbsp; 
                    </p>
                    <br />
                </React.Fragment>
            )
        }
    ]
}
