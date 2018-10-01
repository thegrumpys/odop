import React from 'react';
import { fixSymbolValue, search } from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>The following example briefly illustrates the use of ODOP:Spring to check
                    the design of a compression spring. </p>
                    
                    <p>Additional demonstration sessions are available. 
                    Refer to the session named LONGDEMO for a more detailed example of spring design
                    from original specifications.  
                    DEMO6, DEMO7 and DEMO8 present examples of extension spring design.
                    Tutorial sessions, TUTOR1, TUTOR2, ... etc. provide instructions on how to use the software.</p>
                    
                    <p>To continue with this example, just click the "Next" button as you finish
                    reading each page (step). </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 15",
            text: (
                <React.Fragment>
                    <p>Estimate the life of a compression spring of the specified dimensions
                    when subjected to the given working lengths; determine corresponding forces,
                    stress levels, tendency to buckle, and other figures of merit for the
                    design.</p>
                    
                    <table>
                        <tbody>
                            <tr><th>wire diameter</th><td>=</td><td>0.0395</td><td>inches</td><td width="5%"></td><td>Music wire  ASTM A228</td></tr>
                            <tr><th>outside diameter</th><td>=</td><td>0.357</td><td>inches</td><td></td><td>closed & ground ends</td></tr>
                            <tr><th>free length</th><td>=</td><td>0.807</td><td>inches</td></tr>
                            <tr><th>total coils</th><td>=</td><td>8.0</td><td>turns</td></tr>
                            <tr><td>&nbsp;</td></tr>
                            <tr><th>first load height</th><td>=</td><td>0.689</td><td>inches</td></tr>
                            <tr><th>second load height</th><td>=</td><td>0.394</td><td>inches</td></tr>
                        </tbody>
                    </table>
                </React.Fragment>
            )
        },
        {
            title: "Page 03 of 15",
            text: (
                <React.Fragment>
                    <p>In general, the easiest way to begin is to modify an existing design. </p>
                    
                    <p>Reminder:  Demo and Tutorial sessions depend on initial conditions. 
                    Review the Help topic on <b>Action : Execute</b> for more details. 
                    If necessary, save your work and then use the <b>File : Open</b> menu item to load the compression spring
                    design named "<b>startup</b>". </p>

                    <p>Each entry in the Library contains all the information necessary to describe a
                    single design.  
                    We will modify this design until it meets the requirements of the current design problem.
                    The following sequence will illustrate this process.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 15",
            text: (
                <React.Fragment>
                    <p>Since you are probably not familiar with the names of ODOP:Spring variables,
                    the next screen will illustrate several variable names in the
                    context of a force-deflection diagram.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 15",
            text: (
                <React.Fragment>
                   <img src="designtypes/Spring/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of 15",
            text: (
                <React.Fragment>
                    <p>Next, we enter everything we know about the problem. </p>
                    
                    <p>Because this session is simply checking the performance of an existing design, 
                    we will primarily use the ODOP capability to FIX the value of Independent 
                    and Dependent variables.  
                    Other demo and tutorial sessions
                    that illustrate the use of ODOP:Spring in an original design situation
                    will introduce additional commands.</p>
                    
                    <p>This is a good time to take a good look at the existing values.
                    Most of these values will update immediately as the demo process enters the changes.</p>
                    
                    <p>You can scroll the page down to view the complete set of values. 
                    Scroll back up in order to use the Next button to continue.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 15",
            text: (
                <React.Fragment>
                    fix  Wire_Dia   0.0395<br/>
                    fix  OD &nbsp;  0.357<br/>
                    fix  L_Free     0.807<br/>
                    fix  Coils_T    8<br/>
                    fix  L_1 &nbsp; 0.689<br/>
                    fix  L_2 &nbsp; 0.394<br/>
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Wire_Dia', 0.0395),
                fixSymbolValue('OD_Free', 0.357),
                fixSymbolValue('L_Free', 0.807),
                fixSymbolValue('Coils_T', 8),
                fixSymbolValue('L_1', 0.689),
                fixSymbolValue('L_2', 0.394),
            ]
        },
        {
            title: "Page 08 of 15",
            text: (
                <React.Fragment>
                    <p>You can now see the changes created by entering what is known about the problem.</p>

                    <p>The current values for Force_1 and Force_2 were established as defaults by <b>startup</b>. 
                    Next, we will ask ODOP:Spring to solve for the Force_1 and Force_2 
                    values that correspond to the FIXes that have just been established.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page 09 of 15",
            text: (
                <React.Fragment>
                    <p>Now that we have expressed what we want the design to accomplish,
                    we will ask "Search" for a solution.</p>

                    <p>If the program can find a solution that satisfies all the constraints,
                    it will display "<b>FEASIBLE</b>" in the Result section (immediately below these words).  
                    If a satisfactory solution is found, but one or more constraints remain violated by a
                    trivial amount, the program will display "<b>MARGINALLY FEASIBLE</b>" in the Result section.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page 10 of 15",
            text: (
                <React.Fragment>
                    <p>We have a solution. Take a moment to scroll through and view the values.</p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 11 of 15",
            text: (
                <React.Fragment>
                    <p>Note that cycle life as well as other figures of merit such as weight and
                    percentage of available deflection utilized at load point 2 are given in
                    Report 1 (mini).  
                    Simply select (click on) that tab to view the report.</p>
                    <p>The message: 
                    "<b>Coil to coil contact may cause inaccuracy in point 2.</b>" 
                    is produced any time that the second load uses more
                    than 80 % of available deflection.</p>
                    <p>There is no warning about buckling so that is not an issue of concern.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page 12 of 15",
            text: (
                <React.Fragment>
                    Don't forget to switch back to the tab containing the main page ("Design:").
                </React.Fragment>
            )
        },
        {
            title: "Page 13 of 15",
            text: (
                <React.Fragment>
                    <p>Just in case you missed them on the previous screen,
                    scroll down to view the values of <b>Cycle_Life, %_Avail_Deflect</b> and <b>Weight</b>.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page 14 of 15",
            text: (
                <React.Fragment>
                    <p>This completes the first ODOP:Spring demonstration problem.</p>
                    
                    <p>Several more demo problems are available. 
                    They are named DEMO1, DEMO2, ... etc. 
                    Refer to the documentation section (Help entry) named  TUTORIAL  
                    for a list of the Tutorial and DEMO topics.</p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP:Spring features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 15 (last page)",
            text: (
                <React.Fragment>
                    <p>In order to resume with the next demonstration problem,
                    select "LONGDEMO" from the <b>Help : Demo...</b> menu item.</p>
                </React.Fragment>
            )
        }
    ]
}
