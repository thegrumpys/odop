import React from 'react';
import { changeSymbolValue, fixSymbolValue, changeSymbolConstraint, loadInitialState, setSymbolFlag, saveOutputSymbolConstraints, changeLabelsValue, search } from '../../../store/actionCreators';
import { MIN, MAX, CONSTRAINED } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    This section of the tutorial is going to be a bit different.
                    We'll cover the <b>File : Save</b> and <b>File : Open</b> menu entries 
                    which transfer the complete state of the current design to and from 
                    from the on-line database that is referred to as the "Design Library".
                    In the process of describing the Save and Open features, 
                    plus showing a technique for side-by-side design comparisons, this section of the
                    tutorial will sneak in an excercise featuring an original design that has
                    a set of objectives that initially do not provide a feasible solution.
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
                    Note that the ODOP Design Library is a database "in the cloud".
                    It is not a local file.
                    If we save our current status into the Design Library, 
                    we can use the <b>File : Open</b> menu to return to this point later.
                    There are several reasons why we may want to do this:
                    </p>
                        <ul>
                            <li>
                            Perhaps we are not finished with this design, but it is
                            necessary to interrupt and return to it at some later time.
                            </li>
                            
                            <li>
                            Perhaps this is a successful, but still tentative design. 
                            There is a desire to explore other designs, 
                            but we need the ability to return to this point if
                            those explorations don't produce better results.
                            </li>
                            
                            <li>
                            Perhaps this is a final design, but there is always a chance that
                            the requirements for it may change in the future.
                            We may need to pick up the design process where we left off, perhaps 
                            with just a couple minor changes.
                            </li>
                            
                            <li>
                            As illustrated later in this tutorial session, a previously saved 
                            design that is opened into a separate browser session (or tab) can
                            facilitate a convenient side-by-side comparison of two candidate designs.
                            </li>
                        </ul>
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
                    The <b>File : Properties</b> menu item provides an opportunity to add
                    label and comment information to a design before it is saved.
                    This will be particularly important if saving multiple variations 
                    of a single design.
                    Note that this label and comment information may be updated in the future.
                    Just open the design, modify the information and then re-save with the same name.
                    </p>
                    
                    <p>
                    The ODOP software does not provide a way to print directly from the Design Library.
                    In order to print a design in the library, open it and then switch to one of the Report tabs. 
                    At that point, use the print facilities provided by your browser.
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 12",
            text: (
                <React.Fragment>
                    <p>
                    Well, since it looks like we need a design to save, 
                    it will be necessary to invent one.  
                    In the previous tutorial examples, 
                    we worked only with designs that had feasible solutions. 
                    This time let's see what ODOP:Spring does when we ask for the impossible.
                    </p>
                    
                    <p>
                    Suppose we want a spring that will fit in a 2.00 inch diameter hole
                    that can be no more than 1.20 inches deep (i.e. the spring's solid
                    height).  The spring must support 250 pounds and sustain at least
                    1.0 inch of deflection from no load to full load.
                    </p>
                    
                    <p>
                    Just to make life interesting, let's try to find a spring that has a
                    very long cycle life ...  say 1,000,000 cycles. 
                    Note the constraints that were established in the initialState will 
                    permit a design with a short cycle life. 
                    Specifically, Cycle_Life and FS_CycleLife are not constrained.
                    </p>
                    
                    <p>
                    The tutorial will impose the necessary values in the process of transitioning 
                    to the Next page. 
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 12",
            text: (
                <React.Fragment>
                    <p>
                    In "Tutorial shorthand", the changes just imposed by the tutorial are:<br />
                    <br />
                        CHANGE Life_Category "1 million cycles - Not Peened" &nbsp; &#60;--- request nearest cycle life category<br />
                        CHANGE  FS_CycleLife MIN  1.0<br />
                        CHANGE  OD_Free MAX  1.950 &nbsp; &#60;--- 0.050 margin for hole<br />
                        CHANGE  L_Solid MAX  1.2<br />
                        CHANGE  L_Stroke MIN 1.0<br />
                        FIX  Force_1  0<br />
                        FIX  Force_2  250<br />
                    </p>
                    
                    <p>
                    Now we're set up to consider designs that will have a long cycle life.
                    The 250 pound load has given us an unreasonable start point. 
                    Look for warnings on Report 1.
                    In this case, we'll ignore the warning.
                    Moving to the next page will execute a search.
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("Life_Category",3),
                saveOutputSymbolConstraints('FS_CycleLife'),
                setSymbolFlag('FS_CycleLife', MIN, CONSTRAINED),
                changeSymbolConstraint('FS_CycleLife', MIN, 1.0),
                saveOutputSymbolConstraints('OD_Free'),
                setSymbolFlag('OD_Free', MAX, CONSTRAINED),
                changeSymbolConstraint('OD_Free', MAX, 1.950),
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 1.2),
                saveOutputSymbolConstraints('L_Stroke'),
                setSymbolFlag('L_Stroke', MIN, CONSTRAINED),
                changeSymbolConstraint('L_Stroke', MIN, 1.0),
                fixSymbolValue('Force_1', 0.0),
                fixSymbolValue('Force_2', 250.0)
            ]
        },
        {
            title: "Page 06 of 12",
            text: (
                <React.Fragment>
                <p>
                The search couldn't find a design that satisfied all of our objectives,
                so it did its best and found a compromise.
                This design obviously needs some work.
                We'll get to that shortly, but first, remember that our original
                objective was to work with the Save, Save As and Open features.
                </p>
                
                <p>
                For this step, the tutorial needs you to take a more active role.
                First, go to the <b>File : Properties</b> menu and replace the comment
                with something unique.
                If you are not feeling particularly creative, try the words:
                "This is a first try at this design.".
                </p>
                
                <p>
                Now, go to the <b>File : Save As</b> menu item and save the current state
                with a unique name of your choice.
                If you are not feeling particularly creative, try the name "tutor4".
                </p>
                <br />
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 07 of 12",
            text: (
                <React.Fragment>
                    <p>
                    Now, to continue with our solution to this design problem, let's
                    see if we can improve on the design by altering a few of the
                    Independent Variables and repeating the search.
                    </p>
                    
                    <p>
                    In Tutorial speak, the changes just imposed are:<br />
                    <br />
                        CHANGE  OD_Free  2.0<br />
                        CHANGE  Wire_Dia .22<br />
                        CHANGE  L_Free  3.0<br />
                        CHANGE  Coils_T   7
                    </p>
                    
                    <p>
                    Moving to the next page will provide the results of another search.
                    </p>
                </React.Fragment>
            ),
            actions: [
                changeSymbolValue("OD_Free", 2.0),
                changeSymbolValue("Wire_Dia", 0.22),
                changeSymbolValue("L_Free", 3.0),
                changeSymbolValue("Coils_T", 7.0)
            ]
        },
        {
            title: "Page 08 of 12",
            text: (
                <React.Fragment>
                    <p>
                    It is possible to get a side-by-side comparison between the current design
                    and the previous one that is now saved in the Design Library.
                    </p>
                    
                    <p>
                    Start by opening another session of ODOP:Spring. 
                    If you have a wide-screen monitor, it could be in a separate browser
                    session positioned to the side of the current one.
                    It may be necessary to adjust the browser's font size or "zoom" scale.
                    Otherwise, you can use another tab in the current browser session.
                    </p>
                    
                    <p>
                    Use the <b>File : Open</b> menu item to open the previously saved design
                    in the second browser session or separate tab.
                    With a little bit of window arranging, you should be able to see a 
                    clear comparison.
                    </p>
                </React.Fragment>
            ),
            actions: [
                search()
                ]
        },
        {
            title: "Page 09 of 12",
            text: (
                <React.Fragment>
                    <p>
                    Notice that when the search terminates without finding a
                    feasible solution, the results of two widely different
                    start points can be very close.
                    </p>
                    
                    <p>
                    Our original design specification is impossible to achieve. 
                    We need to compromise somewhere.
                    
                    One possibility is to relax the constraint on solid height. 
                    Let's try that first.
                    
                    Another possibility is to relax the constraint on cycle life. 
                    In each case, ODOP will not have to seek a compromise design and therefore
                    the other constraint violations will disappear without any further
                    concern.
                    </p>
                    
                    <p>
                    In order to pursue relaxing the cycle life constraint instead of the
                    solid height constraint, you could make that change now and then
                    run a search and observe the results.
                    In order to resume with this session of the tutorial, 
                    simply use the Back button (to the left of the blue Next button)
                    to reach any previous page.
                    From there, you can continue forward with this session of the tutorial.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 10 of 12",
            text: (
                <React.Fragment>
                    <p>
                    The tutorial just imposed the changes:<br />
                    <br />
                        CHANGE  L_Solid MAX  2.75<br />
                        CHANGE  FS_2 MAX  1.75
                    </p>
                    
                    <p>
                    The transition to the next page will perform a search.
                    </p>
                    
                    <p>
                    <br />
                    </p>
                </React.Fragment>
            ),
            actions: [
                saveOutputSymbolConstraints('L_Solid'),
                setSymbolFlag('L_Solid', MAX, CONSTRAINED),
                changeSymbolConstraint('L_Solid', MAX, 2.75),
                saveOutputSymbolConstraints('FS_2'),
                setSymbolFlag('FS_2', MAX, CONSTRAINED),
                changeSymbolConstraint('FS_2', MAX, 1.75),
            ]
        },
        {
            title: "Page 11 of 12",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    </p>
                    
                    <p>
                    Indeed, simply relaxing these two constraints provided enough "room" in
                    the design so that it was possible for the search to resolve
                    violations on all the constraints.
                    </p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
                search()
            ]
        },
        {
            title: "Page 12 of 12 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    Feel free to practice various ways to find feasible designs.  You can
                    start by repeating the first portion of this tutorial, then interrupting
                    it after the first search.  Also, you can invent designs of your own, or
                    use any of the "Demo" sessions that are supplied with this software.
                    </p>
                    
                    <p>
                    That should do it for these topics.  You are now qualified to
                    save your spring designs for future reference or
                    continued refinement.
                    </p>
                    
                    <p>
                    The next section of the tutorial will introduce the techniques
                    for selecting spring wire materials (with their associated
                    allowable stresses) and selecting spring end types.
                    </p>
                </React.Fragment>
            ),
        }
    ]
}
