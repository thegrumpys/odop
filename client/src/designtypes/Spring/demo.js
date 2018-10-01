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
            title: "Page02",
            text: (
                <React.Fragment>
                    <p>Estimate the life of a compression spring of the specified dimensions
                    when subjected the given working lengths; determine corresponding forces,
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
            title: "Page03",
            text: (
                <React.Fragment>
                    <p>In general, the easiest way to begin is to modify an existing design. </p>
                    
                    <p>Reminder:  Demo and Tutorial sessions depend on initial conditions. 
                    Review the Help topic on <b>Action : Execute</b> for more details. 
                    If necessary, save your work and then use the <b>File : Open</b> menu item to load the compression spring
                    design named "<b>startup</b>". </p>

                    <p>Each entry in the Library contains all the information necessary to describe a
                    single spring design.  
                    We will modify this design until it meets the requirements of the current design problem.</p>

                    <p>The following sequence will illustrate this process.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page04",
            text: (
                <React.Fragment>
                    <p>Since you are probably not familiar with the names of SpringSys variables,
                    the next screen will illustrate several SpringSys variable names in the
                    context of a force-deflection diagram.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page05",
            text: (
                <React.Fragment>
                   <img src="designtypes/Spring/ForceVsDeflection.png" alt="Force vs Deflection graph"/>
                </React.Fragment>
            )
        },
        {
            title: "Page06",
            text: (
                <React.Fragment>
                    <p>Next we enter everything we know about the problem.  Because we are
                    simply checking the performance of an existing design, we will primarily
                    use the SpringSys FIX command.  Other demo and tutorial sessions
                    that illustrate the use of SpringSys in an original design situation
                    will introduce additional commands.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page07",
            text: (
                <React.Fragment>
                    fix  wire_dia  0.0395<br/>
                    fix  od        0.357<br/>
                    fix  l_free    0.807<br/>
                    fix  coils_t   8<br/>
                    fix  l_1       0.689<br/>
                    fix  l_2       0.394<br/>
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
            title: "Page08",
            text: (
                <React.Fragment>
                    <p>The LIST INDEPENDENT command (abbreviated L I) shows the current values of
                    the independent variables.  When a variable is FIXed at a value, the
                    program gives it upper and lower constraints at that value.</p>

                    <p>The current values for FORCE_1 and FORCE_2 were established as defaults by
                    the STARTUP.DSN file.  Next, we will ask SpringSys to solve for the force
                    values that correspond to the FIXes that have just been established.</p>

                    l  i
                </React.Fragment>
            )
        },
        {
            title: "Page09",
            text: (
                <React.Fragment>
                    <p>Now that we have expressed what we want the design to accomplish,
                    we ask SpringSys to "search" for a solution.</p>

                    <p>If the program can find a solution that satisfies all the constraints,
                    it will announce that "THE RESULT IS FEASIBLE".  If a satisfactory
                    solution is found, but one or more constraints remain violated by a
                    trivial amount, the program will announce that "THE RESULT IS MARGINALLY
                    FEASIBLE".</p>
                </React.Fragment>
            )
        },
        {
            title: "Page10",
            text: (
                <React.Fragment>
                    <p>We have a solution.</p>
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page11",
            text: (
                <React.Fragment>
                    <p>Note that cycle life as well as other figures of merit such as weight and
                    percentage of available deflection utilized at load point 2 are given in
                    the following report.  The message "COIL TO COIL CONTACT MAY PRODUCE
                    INACCURACY IN POINT 2" is produced any time that the second load uses more
                    than 80 % of available deflection.</p>

                    <p>The SpringSys  REPORT  and  LIST  commands will give the details of the
                    solution.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page12",
            text: (
                <React.Fragment>
                    report
                </React.Fragment>
            )
        },
        {
            title: "Page13",
            text: (
                <React.Fragment>
                    <p>The SpringSys LIST command will produce specific values in case you missed
                    them on the previous screen.</p>

                    list  cycle_life  %_avail_deflect  weight<br/>

                    <p>The next screen will review the values of various "constants" used in the
                    solution of this problem.  Some of these values were established by when
                    the initial design point was read at the beginning of the session.  The
                    material property values were established by selecting MUSIC_WIRE from the
                    table.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page14",
            text: (
                <React.Fragment>
                    list constants
                </React.Fragment>
            )
        },
        {
            title: "Page15",
            text: (
                <React.Fragment>
                    <p>This completes the first SpringSys demo problem.</p>
                    
                    <p>Several more demo problems are available.  They are named DEMO1, DEMO2,
                    through DEMO9.  Refer to the documentation section (User's Manual or help
                    file) named  TUTORIAL  for a list of the DEMO topics.</p>
                    
                    <p>If you do not wish to continue with more demonstration problems, you can
                    experiment with the various SpringSys commands.  Start by asking for
                    HELP.  When you wish to return to the operating system, use the QUIT
                    command.</p>
                </React.Fragment>
            )
        },
        {
            title: "Page16",
            text: (
                <React.Fragment>
                    <p>In order to resume with the next demonstration problem, type
                    the command  "EXECUTE LONGDEMO"  followed by a carriage return at
                    the  SpringSys:  prompt.</p>
                    
                    <p>No, you don't need the quotes !</p>
                    
                    <p>If you have SpringSys installed such that the tutorial is on a different
                    disk than the main program, you need to precede the file name with the
                    name of that disk and a colon.  Additional information is in the
                    INSTALLATION section of the documentation.</p>
                    
                    <p>For example:   EXECUTE  B:LONGDEMO</p>
                </React.Fragment>
            )
        }
    ]
}
