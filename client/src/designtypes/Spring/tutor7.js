import React from 'react';
import { changeSymbolValue, fixSymbolValue, changeSymbolConstraint, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, search, seek } from '../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    This section of the tutorial will introduce the concept of optimization
                    and use of the SEEK command to find a design of minimum weight (material
                    volume).  As a bonus, this section will also cover the use of the
                    ODOP internal variables and the <b>File : Preferences</b> menu item.
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP <b>Compression Spring</b> design model.
                    </p>
                    
                    <p>
                    To continue with this session, just click the "Next" button as you finish
                    reading each page (step). 
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 16",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    First, the subject of optimization ...
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
                    make compensating changes and start over.
                    </p>
                </React.Fragment>
            ),
            actions: [
                loadInitialState('Spring')
            ]
        },
        {
            title: "Page 03 of 16",
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
            title: "Page 04 of 16",
            text: (
                <React.Fragment>
                    <p>
                    If the use of PROP_CALC_METHOD seems a bit unfamiliar, you may wish to
                    review the on-line documentation sections (HELP entries) on Names, Materials, 
                    and Advanced Spring Operations. 
                    Also, an earlier tutorial section (tutor5) and one of the demo problems (demo4)
                    provide additional details.
                    </p>
                    
                    <p>
                    Changing FS_2 MIN to be 1.0 causes the value of STRESS_LIM_STAT
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
            title: "Page 05 of 16",
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
            title: "Page 06 of 16",
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
                In other situations the designer may need to determine
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
            title: "Page 07 of 16",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
                seek("Weight", MIN)
                ]
        },
        {
            title: "Page 08 of 16",
            text: (
                <React.Fragment>
                    <p>
                    Stop !
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 09 of 16",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    <br />
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 10 of 16",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 11 of 16",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 12 of 16",
            text: (
                <React.Fragment>
                    <p>
                    </p>

                    <p>
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 13 of 16",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 14 of 16",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 15 of 16",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    </p>
                    
                    <p>
                    This session has touched on a few of the most basic concepts of ODOP operation.
                    </p>
                    
                    <ul>
                        <li>
                        It is possible to set a value on any Independent Variable
                            <ul>
                                <li>
                                    Dependent Variables will immediately recalculate to reflect that value.
                                </li>
                            </ul>
                        </li>
                        
                        <li>
                        If constraints are violated, a Search can manipulate values of free
                        Independent Variables in order to achieve a feasible solution
                        (if one exists).
                        </li>
                        
                        <li>
                        It is possible to FIX the value of any Variable.
                            <ul>
                                <li>
                                    FIXed Independent Variables are not altered by the Search process.
                                </li>
                                <li>
                                    FIXed Dependent Variables require a Search to establish their value.
                                </li>
                            </ul>
                        </li>
                    </ul>
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 16 of 16 (last page)",
            text: (
                <React.Fragment>
                    <p>
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
