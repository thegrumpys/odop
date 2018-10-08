import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, fixSymbolValue, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, search } from '../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    ***  Under Construction  *** <br />
                    This session is still a work in progress. <br /><br />
                    Welcome to the second ODOP tutorial session.
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP Rectangular Solid design model.
                    </p>
                    
                    <p>
                    To continue with this example, just click the "Next" button as you finish
                    reading each page (step). 
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of xx",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    In general, the easiest way to begin is to modify an existing design.
                    This tutorial session will modify this design until it meets the requirements 
                    of the current design problem.
                    The following sequence of pages will illustrate this process.
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Solid')
            ]
        },
        {
            title: "Page 03 of xx",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of xx",
            text: (
                <React.Fragment>
                   <img src="designtypes/Solid/RectangularSolidDiagram.png" alt="Rectangular Solid diagram"/>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of xx",
            text: (
                <React.Fragment>
                    <p>Next, the demo session will enter everything we know about the problem. </p>
                    
                    <p>This is a good time to take a good look at the existing values.
                    Affected values will update immediately as the demo session enters the changes.</p>
                    
                    <p>You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.</p>
                    <br /><br />
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of xx",
            text: (
                <React.Fragment>
                    <p>
                    The demo has now entered what is known about the problem. 
                    In summary, the changes were:<br />
                    </p>
                    CHANGE  Material_Type OIL_TEMPERED_MB<br />
                    CHANGE  Life_Category 1 Million cycles - Not peened<br />
                    CHANGE  FS_CycleLife 1.0<br />
                    CHANGE  Cycle_Life  MIN  1000000<br />
                    CHANGE  OD_Free   MAX  1.25<br />
                    CHANGE  L_Solid   MAX  1.30<br />
                    CHANGE  L_Stroke  MIN  0.65<br />
                    FIX  Force_1  30.0<br />
                    FIX  Force_2  60.0<br />
                    <br />
                    <p>
                    The remaining Independent Variable values remain as established by the initialState. 
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Material_Type",3),
                changeSymbolValue("Life_Category",3),
                changeSymbolValue("End_Type",4),
                saveOutputSymbolConstraints('FS_CycleLife'),
                setSymbolFlag('FS_CycleLife', MIN, CONSTRAINED),
                changeSymbolConstraint('FS_CycleLife', MIN, 1.0),
                saveOutputSymbolConstraints('Cycle_Life'),
                setSymbolFlag('Cycle_Life', MIN, CONSTRAINED),
                changeSymbolConstraint('Cycle_Life', MIN, 1000000),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 1.25),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.30),
                saveOutputSymbolConstraints('L_Stroke'),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint('L_Stroke', MIN, 0.65),
                fixSymbolValue('Force_1', 30.0),
                fixSymbolValue('Force_2', 60.0)
            ]
        },
        {
            title: "Page 07 of xx",
            text: (
                <React.Fragment>
                    <p>
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (<b>Action : Search</b> menu) for a solution.
                    Specifically, Search will find values of the free Independent Variables
                    that cause the newly established Constraints and FIXes to be satisfied.
                    </p>

                    <p>
                    If the program can find a solution that satisfies all the constraints,
                    it will display "<b>FEASIBLE</b>" in the Result section (immediately below these words).  
                    If a satisfactory solution is found, but one or more constraints remain violated by a
                    trivial amount, the program will display "<b>MARGINALLY FEASIBLE</b>" in the Result section.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 08 of xx",
            text: (
                <React.Fragment>
                    <p>We have a solution. Please take a moment to scroll through and view the values.</p>
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 09 of xx",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    As a general rule, in the first approach to a new problem, 
                    we let the calculations use an arbitrary (non-standard) wire diameter. 
                    Now we'll use the ODOP SELECT SIZE feature 
                    (<b>Action : Select Size...</b> menu item)
                    to chose the nearest standard wire diameter.
                    <br /><br />
                    SELECT  Wire_Dia<br />
                    <br />
                    Wait! until the SELECT SIZE feature is implemented, 
                    it will be necessary to use a FIX to impose the correct value of Wire_Dia.
                    Look for the new value of Wire_Dia on the next page.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 10 of xx",
            text: (
                <React.Fragment>
                    <p>
                    Now that there has been a slight change in wire diameter, another search
                    will be required to make corresponding adjustments in the other
                    parameters such as number of coils, outside diameter and free length.
                    </p>
                    
                    <p>
                    Look for the results on the next page.
                    <br /><br />
                    </p>
                    
                    <p>
                    <br /><br />
                    </p>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.135)
            ]
        },
        {
            title: "Page 11 of xx",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    </p>
                    
                    <p>
                    The design is complete.
                    </p>
                    
                    <p>
                    This is a good time to think about saving the design for potential access in the future.
                    You can use the <b>File : Save As...</b> menu item to save the design into the Design Library.  
                    Alternatively, it should be possibile to use the print features of the browser to
                    send one or more of the Reports to a local printer or perhaps save to a .PDF file.
                    Your browser documentation should provide more details.
                    </p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 12 of xx",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 13 of xx (last page)",
            text: (
                <React.Fragment>
                    <p>Several more tutorial sessions are planned. 
                    They will have names like tutor1, tutor2, ... etc. 
                    Refer to the documentation section (Help entry) covering the Tutorial 
                    for a list of the Tutorial and DEMO topics.</p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP:Spring features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                    <br />
                </React.Fragment>
            )
        }
    ]
}
