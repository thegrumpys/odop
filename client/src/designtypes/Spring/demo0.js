import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, setSymbolFlag, saveOutputSymbolConstraints, search } from '../../store/actionCreators';
import { MIN, MAX, FIXED, CONSTRAINED } from '../../store/actionTypes';
export const execute = {
    steps: [
        {
            text: (
                <React.Fragment>
                    <p>The following example briefly illustrates the use of SpringSys to check
                    the design of a compression spring.  This example also appears in the
                    appendix to the SpringSys User's Manual.</p>
                    
                    <p>Refer to the session named LONGDEMO for a more detailed example of design
                    from original specifications.  DEMO6, DEMO7 and DEMO8 present examples of 
                    extension spring design.  Refer to the User's Manual and the various
                    tutorial sessions, TUTOR1, TUTOR2, ...  TUTOR9 for detailed instructions
                    on how to use SpringSys.</p>
                    
                    <p>To continue with this example, just strike the "Enter" key as you finish
                    reading each frame.  This key corresponds to the "carriage return" key
                    of a typewriter and may be marked with a down and left arrow that looks
                    like:   &lt;--'</p>
                </React.Fragment>
            )
        },
        {
            text: (
                <React.Fragment>
                    <p>Estimate the life of a compression spring of the specified dimensions
                    when subjected the given working lengths; determine corresponding forces,
                    stress levels, tendency to buckle, and other figures of merit for the
                    design.</p>
                    
                    <table>
                        <tr><th>wire diameter</th>      <td>=</td> <td>0.0395</td> <td>inches</td> <td width="5%"></td> <td>Music wire  ASTM A228</td></tr>
                        <tr><th>outside diameter</th>   <td>=</td> <td>0.357</td>  <td>inches</td> <td></td> <td>closed & ground ends</td></tr>
                        <tr><th>free length</th>        <td>=</td> <td>0.807</td>  <td>inches</td></tr>
                        <tr><th>total coils</th>        <td>=</td> <td>8.0</td>    <td>turns</td></tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr><th>first load height</th>  <td>=</td> <td>0.689</td>  <td>inches</td></tr>
                        <tr><th>second load height</th> <td>=</td> <td>0.394</td>  <td>inches</td></tr>
                    </table>
                </React.Fragment>
            )
        },
        {
            text: (
                <React.Fragment>
                    <p>To begin solving this problem, we invoke the SpringSys START command.</p>

                    <p>This command will read a file (named STARTUP.DSN) from the disk
                    and then begin a brief dialog about materials, end type, and cycle life
                    requirements.  When this sequence is complete, the program will go to
                    its "command level" as indicated by the prompt "SpringSys".</p>

                    <p>The startup file contains all the information necessary to describe a
                    single spring design.  Once at command level, the SpringSys commands may
                    be used to modify this design until it meets the requirements of the
                    current design problem.</p>

                    <p>The following sequence will illustrate this process</p>
                </React.Fragment>
            )
        },
        {
            text: (
                <React.Fragment>
                    start  startup  no<br/>
                    3    &lt;--- review list of available material types ...<br/>
                    1    &lt;--- select from table ...<br/>
                    1    &lt;--- select from list of material descriptions ...<br/>
                    music_wire     ...<br/>
                    0    &lt;--- continue to command level ...<br/>

                    <p>We have completed the startup dialog and have reached the SpringSys
                    command level.</p>

                    <p>Since you are probably not familiar with the names of SpringSys variables,
                    the next screen will illustrate several SpringSys variable names in the
                    context of a force-deflection diagram.</p>
                </React.Fragment>
            )
        },
        {
            text: (
                <React.Fragment>
                   <img src="designtypes/Spring/ForceVsDeflection.png" alt="ForceVsDeflection diagram"/>
                </React.Fragment>
            )
        },
        {
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
                changeSymbolValue('Wire_Dia', 0.0395),
                setSymbolFlag('Wire_Dia', MIN, FIXED),
                setSymbolFlag('Wire_Dia', MAX, FIXED),
                changeSymbolValue('OD_Free', 0.357),
                setSymbolFlag('OD_Free', MIN, FIXED),
                setSymbolFlag('OD_Free', MAX, FIXED),
                changeSymbolValue('L_Free', 0.807),
                setSymbolFlag('L_Free', MIN, FIXED),
                setSymbolFlag('L_Free', MAX, FIXED),
                changeSymbolValue('Coils_T', 8),
                setSymbolFlag('Coils_T', MIN, FIXED),
                setSymbolFlag('Coils_T', MAX, FIXED),
                saveOutputSymbolConstraints('L_1'),
                setSymbolFlag('L_1', MIN, FIXED|CONSTRAINED),
                setSymbolFlag('L_1', MAX, FIXED|CONSTRAINED),
                changeSymbolConstraint('L_1', MIN, 0.689),
                changeSymbolConstraint('L_1', MAX, 0.689),
                saveOutputSymbolConstraints('L_2'),
                setSymbolFlag('L_2', MIN, FIXED|CONSTRAINED),
                setSymbolFlag('L_2', MAX, FIXED|CONSTRAINED),
                changeSymbolConstraint('L_2', MIN, 0.394),
                changeSymbolConstraint('L_2', MAX, 0.394)
            ]
        },
        {
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
            text: (
                <React.Fragment>
                    report
                </React.Fragment>
            )
        },
        {
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
            text: (
                <React.Fragment>
                    list constants
                </React.Fragment>
            )
        },
        {
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
