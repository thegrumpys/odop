import React from 'react';
import { changeSymbolValue, fixSymbolValue, changeSymbolConstraint, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search, seek } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    This section of the tutorial will introduce the concept of optimization.
                    The ODOP Seek feature (<b>Action : Seek</b> menu) will be used to find 
                    a design optimized for of minimum weight (material volume) and again
                    to find a design optimized to produce maximum force within constraints. 
                    As a bonus, this section will also cover the use of the
                    ODOP internal variables and the <b>File : Preferences</b> menu item.
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP <b>Compression Spring</b> design type.
                    </p>
                    
                    <p>
                    To continue with this session, just click the "Next" button as you finish
                    reading each page (step). 
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 12",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    First, a few words on the subject of optimization ...
                    </p>

                    <p>
                    Visualize for a moment the consequences of specifying only a minimum load ...
                    say 10 pounds ...  that a spring should support, then asking ODOP:Spring to
                    design a spring of minimum weight without supplying any additional constraints.
                    </p>
                    
                    <p>
                    If we just turn the software loose, we are asking for a spring with the least
                    amount of metal that could still support 10 pounds of force.  However, given
                    no additional constraints, the process is likely to produce some pretty
                    bizarre results.  For example, without a constraint on inside diameter, the
                    coil outside diameter could be reduced to twice the wire diameter or 
                    (mathematically if not physically) perhaps even less. 
                    Without a constraint on
                    Rate or Stroke (change in length between point 1 and point 2), the number of coils
                    could be reduced to near zero and free length down to equal the solid
                    height.  The result is the mathematical equivalent of a solid bar supporting
                    the 10 pound load.
                    </p>
                    
                    <p>
                     Well, at least it has the minimum weight that we asked for !
                     </p>
                     
                     <p>
                    When asking to optimize a design, you must understand that the software will
                    find such trivial (also called "degenerate") cases.  It is necessary to
                    impose realistic constraints and when the process does something unexpected,
                    make compensating changes and run through the calculation process again.
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 12",
            text: (
                <React.Fragment>
                    <p>
                    Before we go further, we need a design problem to optimize.
                    So, let's see if we can find the minimum weight spring necessary to
                    support a 100 pound static load at a minimum of 2.5 inches
                    deflection.  Just to make the problem a little bit more interesting,
                    we'll ignore the material and say that we want no more than 80,000
                    PSI stresses.
                    </p>
                    
                    <p>
                    By now, you should be familiar with "tutorial shorthand".
                    The tutorial has just imposed these changes in order to describe this problem:<br />
                    <br />
                    FIX  Force_1  0<br />
                    FIX  Force_2  100<br />
                    CHANGE  L_Stroke  MIN  2.5 &nbsp; &#60;--- use constraint, not FIX<br />
                    
                    CHANGE  Prop_Calc_Method  3  &nbsp;  &#60;--- specify allowable stress<br />
                    CHANGE  Stress_Lim_Stat  80000<br />
                    CHANGE  FS_2  MIN  1.0  &nbsp;  &#60;--- more details on next page<br />
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 100.0),
                saveOutputSymbolConstraints('L_Stroke'),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint('L_Stroke', MIN, 2.5),
                changeSymbolValue("Prop_Calc_Method", 3),
                changeSymbolValue("Stress_Lim_Stat", 80000.0),
                saveOutputSymbolConstraints('FS_2'),
                setSymbolFlag('FS_2', MIN, CONSTRAINED),
                changeSymbolConstraint('FS_2', MIN, 1.0)
                ]
        },
        {
            title: "Page 04 of 12",
            text: (
                <React.Fragment>
                    <p>
                    If the use of Prop_Calc_Method seems a bit unfamiliar, you may wish to
                    review the on-line documentation sections (HELP entries) on Names, Materials, 
                    and Advanced Spring Operations. 
                    Also, an earlier tutorial section (tutor5) and one of the demo problems (demo4)
                    provide additional details.
                    </p>
                    
                    <p>
                    Changing FS_2 MIN to be 1.0 causes the value of Stress_Lim_Stat
                    (80,000 PSI) to apply at point 2.
                    There will be no additional margin in the factor of safety.
                    </p>
                    
                    <p>
                    While it is not always absolutely necessary, it is usually a good
                    idea to start the optimization process from or near a feasible start
                    point.  At the vary least, you want to know that a feasible
                    solution is available.
                    </p>
                    
                    <p>
                    Moving to the next page will execute a search.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 12",
            text: (
                <React.Fragment>
                    <p>
                    Yes, a feasible solution is available.
                    You should scan through the details.
                    </p>
                    
                    <p>
                    The search stops with the first feasible design it finds.  It is not
                    necessarily a design that delivers 80,000 PSI stress at point 2.
                    However, when we ask for a minimum weight design (that is also a
                    feasible design), we can expect to achieve the desired 80,000 psi stress at
                    point 2 (100 pound load).
                    </p>
                    
                    <p>
                    Optionally, you can mark this design with a comment like:
                    "This is the point where we start optimizing" and
                    use <b>File : Save As</b> to save it into the Design Library
                    with a name like "tutor7StartPoint".
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 06 of 12",
            text: (
                <React.Fragment>
                <p>
                The ODOP:Spring Seek feature (<b>Action : Seek</b> menu)
                provides the ability to maximize or minimize
                any single variable (Independent or Dependent) 
                subject to the existing constraints on the problem. 
                In other words, Seek does constrained optimization. 
                </p>
                
                <p>
                In spring design, a common
                requirement is to find the spring of least weight that satisfies a
                specific set of requirements.  
                In other situations, the designer may need to determine
                the greatest load, greatest factor of safety or lowest spring rate that
                may be produced within the space constraints of a specific outside
                diameter and solid height.
                </p>
                
                <p>
                Before going further, look at the current value of weight.
                We expect that the ultimate answer will be less than that. 
                After all, that's what optimization is all about.
                </p>
                
                <p>
                <b>Seek MIN Weight</b> will execute in the process of moving to the next page.
                </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 12",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution.
                    While not far away from feasible, this solution "bends" the constraints just a bit
                    in order to get a better (lower) value of weight.
                    </p>
                    
                    <p>
                    Note that we achieved something very close to the desired 80,000 PSI at point 2.
                    </p>
                    
                    <p>
                    If you previously saved the starting point (tutor7StartPoint) into the Design Library, 
                    you can now set up a second design session in another browser window,
                    retrieve that optimization starting point and then arrange a side-by-side 
                    comparison between the current design and the one that that existed before 
                    minimizing weight.
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                seek("Weight", MIN)
                ]
        },
        {
            title: "Page 08 of 12",
            text: (
                <React.Fragment>
                    <p>
                    Next we'll use the Seek feature to find a design that supports the
                    greatest possible load within specific limits on outside diameter and
                    solid height.
                    </p>
                    
                    <p>
                    Moving to the next page will reestablish the initialState
                    for the ODOP <b>Compression Spring</b> design model
                    and immediately add new constraints on diameter, solid height and deflection.
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 09 of 12",
            text: (
                <React.Fragment>
                    <p>
                    In "Tutorial Speak" those changes are:<br />
                    <br />
                    CHANGE  OD_Free MAX  1.5<br />
                    CHANGE  L_Solid MAX  1.5<br />
                    CHANGE  L_Stroke MIN 1.0<br />
                    FIX  Force_1 0
                    </p>
                    
                    <p>
                    Even after the changes, this design is feasible.
                    There is no need to run a new search to insure that at
                    least one feasible design is available.
                    Next, we'll ask Seek (<b>Action : Seek</b> menu) to 
                    find a design that maximizes force at point 2.
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 1.5),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.5),
                saveOutputSymbolConstraints('L_Stroke'),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint('L_Stroke', MIN, 1.0),
                fixSymbolValue('Force_1', 0.0)
            ]
        },
        {
            title: "Page 10 of 12",
            text: (
                <React.Fragment>
                    <p>
                    Take a moment to browse through the results that Seek MAX Force_2 produced.
                    </p>
                    
                    <p>
                    This completes our overview of the SpringSys SEEK command.
                    </p>
                    
                    <p>
                    Onward to the subject of internal variables ...
                    </p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
                seek("Force_2", MAX)
            ]
        },
        {
            title: "Page 11 of 12",
            text: (
                <React.Fragment>
                    <p>
                    ODOP contains a number of quantities that you can think of as "internal
                    variables".  They are variables and switches that are used to
                    control the operation of the program.
                    These quantities are not specifically related to spring design.
                    </p>
                    
                    <p>
                    Go to the <b>File : Preferences</b> menu to see the list.
                    </p>
                    
                    <p>
                    Many of the Preferances quantities are related to control of the search
                    process.  Others are weighting factors that have some influence on
                    search results.
                    Refer to the on-line documentation section (Help entry) for Search
                    for additional details.
                    </p>
                    <br /><br />
                </React.Fragment>
            )
        },
        {
            title: "Page 12 of 12 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    This completes our overview of the ODOP Seek feature
                    and a quick look at the internal variables found in the 
                    <b>File : Preferences</b> menu item.
                    Additional examples of  Seek  MIN  Weight  are presented in the
                    TODO: demoxxx example problem. 
                    Use the <b>Help Demo...</b> menu to find that demo session.
                    </p>
                    
                    <p>
                    More tutorial sessions are available. 
                    They have names like tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the 
                    tutorial for a list of the Tutorial and Demo topics.
                    </p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                </React.Fragment>
            )
        }
    ]
}
