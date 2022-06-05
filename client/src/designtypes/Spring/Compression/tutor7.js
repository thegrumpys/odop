import React from 'react';
import { Image } from 'react-bootstrap';
import { changeSymbolValue, fixSymbolValue, changeSymbolConstraint, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search, seek } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    ODOP Seek provides a powerful facility for asking "What if ... " and "What's best ?" kinds of questions. 
                    In order to do this, Seek utilizes the concepts of mathematical optimization. 
                    Specifically, the program can probe the constrained extreme of any variable, independent or dependent. 
                    For example, within the context of coil spring design ODOP:Spring can be asked to find the lightest material weight 
                    (or lowest spring rate, least solid height, greatest factor of safety, greatest cycle life, greatest energy storage, etc.) 
                    all while maintaining specified objectives for force-deflection characteristics, stress, diameters, etc. 
                    It is this "goal seeking" capability that makes ODOP:Spring much more than a spring calculator. 
                    </p>
                    
                    <p>
                    This section of the tutorial will set up a few different compression spring problems, 
                    each with a reasonably large feasible region, and then use the 
                    ODOP Seek feature (<b>Action : Seek</b> menu) to probe the limits in various directions. 
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    this session needs to start from a known state.  
                    So, if you have entered any work of value that is not yet saved,
                    use the <b>File : Save</b> menu item to save your work before continuing.
                    Moving to the next page will establish the necessary initialState
                    for the ODOP Compression Spring design type.
                    </p>
                    
                    <p>
                    To continue with this session, just <b>click the "Next" button</b> as you finish
                    reading each page (step). 
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 02 of 17",
            text: (
                <>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    First, a few words on the subject of optimization ...
                    </p>

                    <p>
                    Visualize for a moment the consequences of specifying only a minimum load ...
                    say 20 pounds ...  that a spring should support and then asking ODOP:Spring to
                    design a spring of minimum weight without supplying any additional constraints.
                    </p>
                    
                    <p>
                    If we just turn the software loose, we are asking for a spring with the least
                    amount of metal that could still support 20 pounds of force.  However, given
                    no additional constraints, the process is likely to produce some pretty
                    bizarre results.  
                    For example, without a constraint on inside diameter, 
                    the coil outside diameter could be reduced (mathematically, if not physically) 
                    to twice the wire diameter or perhaps even less. 
                    Without a constraint on Rate or 
                    Stroke (change in length between point 1 and point 2), 
                    the number of coils could be reduced to something less than one  
                    and free length reduced down to equal the solid height.  
                    The result is the mathematical equivalent of a solid bar supporting
                    the 20 pound load.
                    </p>
                    
                    <p>
                     Well, at least it has the minimum weight that we asked for !
                     </p>
                     
                     <p>
                    When asking to optimize a design, you must understand that the search process will
                    find such trivial (also called "degenerate") cases.  It is necessary to
                    impose realistic constraints and when the process does something unexpected,
                    make appropriate changes to constraints and run through the calculation process again.
                    </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 17",
            text: (
                <>
                    <p>
                    One more point ... <br />
                    When Search terminates with a strictly feasible solution (i.e. Objective Value = 0.0), 
                    the resulting solution point is likely only one of many possible solution points. 
                    The entire collection of feasible solution points bounded by the various constraints 
                    is referred to as a "feasible region". 
                    </p>
                    
                    <p>
                    The ODOP Search feature will terminate when it finds its first feasible solution. 
                    The Seek solution process is easier if it has a feasible design as its starting point. 
                    At a minimum, it should be understood that a feasible design is available. 
                    In the case that a Search has terminated without finding a feasible point, 
                    use of the 
                    &nbsp;<a href="/docs/Help/trade.html" target="_blank" rel="noopener noreferrer">Trade</a>&nbsp; 
                    feature may be appropriate.
                    </p>
                    
                    <p>
                    <br />
                    </p>
                    <br /><br />
                </>
            )
        },
        {
            title: "Page 04 of 17",
            text: (
                <>
                    <p>
                    We start by adding a few constraints to the compression spring starting point used in other tutorial sessions.
                    This will leave us with a well formed 
                    &nbsp;<a href="/docs/Help/designSituations.html" target="_blank" rel="noopener noreferrer">Design Situation</a>&nbsp; 
                    and a reasonable feasible region to work in.
                    </p>
                    
                    <p>
                    By now, you should be familiar with "tutorial shorthand".
                    </p>
                    
                    <p>
                    FIX  Force_1   0.0<br />
                    FIX  Force_2  20.0<br />
                    CHANGE  OD_Free MAX   1.5<br />
                    CHANGE  L_Stroke MIN  1.0<br />
                    CHANGE  L_Solid MAX   1.5
                    </p>
                    
                    <p>
                    The changes are now in place.
                    This is a good opportunity to scroll down and review the setup.
                    Don't forget to check out the Reports.  
                    </p>
                    
                    <p>
                    We will execute a search in the process of moving to the next page.
                    </p>
                    <br /><br />
                </>
            ),
            actions: [
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 20.0),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 1.5),
                saveOutputSymbolConstraints('L_Stroke'),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint('L_Stroke', MIN, 1.0),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.5)
            ]
        },
        {
            title: "Page 05 of 17",
            text: (
                <>
                    <p>
                    Our search is complete.
                    As expected, a feasible solution is available.
                    </p>
                    
                    <p>
                    Now we can try exploring in various directions.  
                    For the moment, we're simply gaining insight on the 
                    range of feasible solutions available with this set of constraints.
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    Take note of the current value of Weight. 
                    In the process of moving to the next page the tutorial session will 
                    invoke the Seek feature. <br />
                    <br />
                    SEEK  MIN  Weight
                    </p>
                    
                    <Image fluid src="/docs/Help/img/SeekMinWeight.png" alt="SeekMinWeight"/>
                    
                    <br />
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 06 of 17",
            text: (
                <>
                    <p>
                    If you see the Feasibility status shown as "NOT FEASIBLE",
                    It means that the solution point has slightly violated constraints
                    in order to achieve improvements in the result 
                    (minimum Weight in this case).
                    </p>
                    <p>
                    You may see the message:
                    <br />
                    "TO FURTHER IMPROVE RESULT, RE-EXECUTE SEEK"
                    <br />
                    This can happen when the optimum is far from the starting point.
                    As a result, the internal estimate of the optimum was not perfect.
                    Simply re-execute Seek to refine the result.
                    </p>
                    
                    
                    <p>
                    Let's try exploring in a different direction.
                    Perhaps this will be a design that prioritizes a softer spring 
                    with a reduced spring rate.
                    Take note of the current value of Rate. 
                    </p>
                    
                    <p>
                    In the process of moving to the next page 
                    the tutorial will execute:
                    <br /><br />
                    SEEK  MIN  Rate
                    </p>
                    <br />
                </>
            ),
            actions: [
                seek("Weight", MIN),
                seek("Weight", MIN)
            ]
        },
        {
            title: "Page 07 of 17",
            text: (
                <>
                    <p>
                    Have a look at our minimum rate spring.
                    Again, it is helpful to look at the Reports.
                    </p>
                    
                    <p>
                    In general, it is the interaction of more than one constraint that 
                    limits further progress in achieving even better results.
                    In this case the constraints on coil diameter and solid height
                    prevent further progress in reducing the spring rate.
                    If you are looking for a spring with a good cycle life 
                    or no tendency to buckle under load, 
                    additional constraints will be necessary.
                    </p>
                    
                    <p>
                    Let's see what happens if we ask for a spring with the lowest possible solid height
                    consistent with our objectives for OD, Stroke, and load capacity.
                    </p>
                    
                    <p>
                    In the process of moving to the next page 
                    the tutorial will execute:
                    <br /><br />
                    SEEK  MIN  L_Solid
                    </p>
                    <br /><br />
                </>
            ),
            actions: [
                seek("Rate", MIN),
                seek("Rate", MIN)
            ]
        },
        {
            title: "Page 08 of 17",
            text: (
                <>
                    <p>
                    Have a look at our minimum solid height spring.
                    Again, be sure to look at the Reports.
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    At this point, you likely feel that you have seen enough of this set of constraints.
                    It is time to get a fresh start with requirements for a somewhat larger spring.
                    Moving to the next page will reestablish the start point as it was 
                    at the beginning of this tutorial session and immediately add new constraints.
                    </p>
                    <br /><br />
                </>
            ),
            actions: [
                seek("L_Solid", MIN),
                seek("L_Solid", MIN)
            ]
        },
        {
            title: "Page 09 of 17",
            text: (
                <>
                    <p>
                    Now, let's see if we can find the minimum weight spring necessary to
                    support a 100 pound static load at a minimum of 2.5 inches
                    deflection.  Just to make the problem a little bit more interesting,
                    we'll ignore the material and simply say that we want no more than 80,000
                    PSI stresses.
                    </p>
                    
                    <p>
                    The tutorial has just imposed these changes in order to describe this problem:<br />
                    <br />
                    FIX  Force_1  0<br />
                    FIX  Force_2  100<br />
                    CHANGE  L_Stroke  MIN  2.5 &nbsp; &#60;--- use constraint, not FIX<br />
                    <br />
                    CHANGE  Prop_Calc_Method  3  &nbsp;  &#60;--- specify allowable stress<br />
                    CHANGE  Stress_Lim_Stat  80000<br />
                    CHANGE  FS_2  MIN  1.0  &nbsp;  &#60;--- more details on next page<br />
                    </p>
                    <br />
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolConstraint('%_Avail_Deflect', MAX, 98.),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}]),
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
            title: "Page 10 of 17",
            text: (
                <>
                    <p>
                    If the use of Prop_Calc_Method seems a bit unfamiliar, you may wish to
                    review the on-line documentation sections (HELP entries) on 
                    &nbsp;<a href="/docs/Help/DesignTypes/Spring/Compression/description.html" target="_blank" rel="noopener noreferrer">Compression Spring Design Type</a>, 
                    &nbsp;<a href="/docs/Help/SpringDesign/materials.html" target="_blank" rel="noopener noreferrer">Materials</a> and 
                    &nbsp;<a href="/docs/Help/SpringDesign/advancedSpringOperations.html" target="_blank" rel="noopener noreferrer">Advanced Spring Operations</a>.&nbsp; 
                    Also, an earlier tutorial section (tutor5) and one of the demo problems (demo4)
                    provide additional details.
                    </p>
                    
                    <p>
                    Changing FS_2 MIN to be 1.0 causes the value of Stress_Lim_Stat
                    (80,000 PSI) to apply at point 2.
                    There will be no additional margin in the factor of safety.
                    </p>
                    
                    <p>
                    As mentioned previously, while it is not always absolutely necessary, 
                    it is best practice to start the optimization process from or near a feasible start point.  
                    At the very least, you want to know that a feasible solution is available.
                    </p>
                    
                    <p>
                    Moving to the next page will execute a search.
                    </p>
                </>
            )
        },
        {
            title: "Page 11 of 17",
            text: (
                <>
                    <p>
                    Yes, a feasible solution is available.
                    You should scan through the details.
                    </p>
                    
                    <p>
                    The search stops with the first feasible design it finds.  It is not
                    necessarily a design that delivers 80,000 PSI stress at point 2.
                    However, when we ask for a minimum weight design (that is also a
                    feasible design), we can expect the process to take up the slack
                    and achieve the desired 80,000 psi stress at
                    point 2 (100 pound load).
                    </p>
                    
                    <p>
                    Optionally, you can use the <b>File : Properties</b> menu  
                    to mark this design with a comment like:
                    "This is the point where we start optimizing" and
                    use <b>File : Save As</b> to save it into the Design Library
                    with a name like "tutor7StartPoint".
                    </p>
                    <br />
                </>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 12 of 17",
            text: (
                <>
                    <p>
                    Before going further, look at the current value of weight.
                    We expect that the ultimate answer will be less than that. 
                    After all, that's what optimization is all about.
                    </p>
                    
                    <p>
                    <b>Seek MIN Weight</b> will execute in the process of moving to the next page.
                    </p>
                    <br /><br />
                </>
            )
        },
        {
            title: "Page 13 of 17",
            text: (
                <>
                    <p>
                    We have a solution.
                    It is typical for Seek to produce a solution that "bends" the constraints 
                    just a bit.
                    The underlying math is balancing the penalty of violating the constraints 
                    with the reward of an improved value of the target variable.
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
                </>
            ),
            actions: [
                seek("Weight", MIN)
                ]
        },
        {
            title: "Page 14 of 17",
            text: (
                <>
                    <p>
                    Next we'll use the Seek feature to find a design that supports the
                    greatest possible load within specific limits on outside diameter and
                    solid height.
                    </p>
                    
                    <p>
                    Moving to the next page will reestablish the initialState
                    for the ODOP Compression Spring design model
                    and immediately add new constraints on diameter, solid height and deflection.
                    </p>
                    
                    <p>
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 15 of 17",
            text: (
                <>
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
                </>
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
            title: "Page 16 of 17",
            text: (
                <>
                    <p>
                    Take a moment to browse through the results that Seek MAX Force_2 produced.
                    </p>
                    
                    <p>
                    This completes our overview of the ODOP Seek feature.
                    </p>
                    
                    <p>
                    To summarize,
                    the ODOP:Spring Seek feature (<b>Action : Seek</b> menu)
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
                    the greatest load, greatest factor of safety, lowest spring rate, 
                    greatest cycle life or greatest energy storage that
                    may be produced within the space constraints of the application.
                    </p>
                    
                    <p>
                    Seek is the right tool for that job.
                    </p>
                    <br /><br />
                </>
            ),
            actions: [
                seek("Force_2", MAX),
                seek("Force_2", MAX)
            ]
        },
        {
            title: "Page 17 of 17 (last page)",
            text: (
                <>
                    <p>
                    The next tutorial section looks at the ODOP Trade feature.  In many
                    ways Trade is a mirror image capability to that of Seek.
                    When a design problem is expressed in terms of constraints and first
                    submitted to the search, the feasibility of the design will be
                    determined.  If the result is feasible, Seek may be used to
                    probe the limits of the feasible region.  
                    However if the result is not feasible by a significant margin, 
                    Trade may be used to identify those constraints that are most
                    leveraged and thus guide the designer to restructure his goals in a way that
                    is most consistent with the performance that can be achieved within the
                    limits of available space and material properties.
                    </p>
                    
                    <p>
                    More tutorial sessions are available. 
                    They have names like tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a list of topics.
                    </p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                </>
            )
        }
    ]
}
