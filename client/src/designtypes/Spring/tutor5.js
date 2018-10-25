import React from 'react';
import { changeSymbolValue, fixSymbolValue, loadInitialState, search } from '../../store/actionCreators';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    This section of the tutorial will cover the use of the ODOP:Spring
                    Calculation Inputs, material selection, material properties 
                    (like allowable stresses) and spring end types.
                    </p>
                    
                    <p>
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
                    Let's start with a quick review of the Compression Spring Calculation Inputs and their
                    current values.
                    If you are not already familiar with the list,
                    please take a moment to scroll down and look at the items under the Calculation Inputs
                    heading.
                    Review the tooltips for additional insights.
                    </p>
                    
                    <p>
                    The on-line documentation sections (Help entries) available
                    under the <b>Spring Design</b> and <b>Compression Spring</b> headings provide a more
                    detailed definition for each of the Calculation Inputs.  It would make the
                    tutorial too long (and boring !) to review each quantity here.
                    However, it is important to make sure that you understand that
                    STRESS_LIM_STAT and STRESS_LIM_ENDUR are the allowable
                    stress limits for static load and endurance respectively.  The factor of
                    safety numbers are calculated directly from STRESS_LIM_STAT and STRESS_LIM_ENDUR.
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
                    ODOP:Spring provides flexibility in how material properties are determined. 
                    There are three different capabilities:
                    </p>
                    
                    <ul>
                        <li>
                        By default, the selected MATERIAL_TYPE is used to get values from 
                        an internal table. These values
                        are combined with the current WIRE_DIA and cycle life conditions to
                        calculate the values of the allowable stresses STRESS_LIM_ENDUR and
                        STRESS_LIM_STAT.  Thus, every time the user or the search changes the
                        value of WIRE_DIA, a new set of allowable stresses is calculated,
                        resulting in new factor of safety values.
                        </li>
                        <li>
                        It is possible to use a material that is not in the supplied table, 
                        or to use values that are different than those in the table.
                        </li>
                        <li>
                        Finally, it is possible to directly specify the allowable stresses
                        to be used.  The later two options eliminate the dependence on
                        WIRE_DIA.
                        </li>
                    </ul>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 16",
            text: (
                <React.Fragment>
                    <p>
                    We will examine each of these capabilities in detail, starting with the
                    easy, most frequently used case.
                    </p>
                    
                    <p>
                    Take a moment to scroll down to the Calculation Inputs section.
                    Locate Material_Type.
                    Click on the downward pointing triangle to drop down the selection list.
                    Observe how selecting different materials changes the values of 
                    Torsion_Modulus, Tensile, %_Tensile_Stat and %_Tensile_Endur.
                    </p>
                    
                    <p>
                    Now, look at the drop down for Life_Category.
                    When a static Life_Category is selected, the values of 
                    %_Tensile_Stat and %_Tensile_Endur are identical.
                    When a longer target life Life_Category is selected, the value of
                    %_Tensile_Endur is reduced.
                    In summary ... by default, MATERIAL_TYPE is used
                    to get the values of TORSION_MODULUS, TENSILE,
                    %_TENSILE_ENDUR and %_TENSILE_STAT from the material table.  These
                    values are combined with the current WIRE_DIA to calculate the values of
                    the allowable stresses STRESS_LIM_ENDUR and STRESS_LIM_STAT.
                    In turn, those allowable stress values are used to calculate the
                    Factor of Safety numbers that can be used as constraints on the design.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 16",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of 16",
            text: (
                <React.Fragment>
                <p>
                </p>
                
                <p>
                </p>
                <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 16",
            text: (
                <React.Fragment>
                    <p>
                    This is a good time to take a close look at existing values.
                    You may need to scroll down to see everything.
                    </p>
                    
                    <p>
                    In the process of moving to the following page, the tutorial will impose a new value 
                    for an input (Independent Variable) ... the Wire_Dia of our compression spring. 
                    Take note of the current value of Rate or %_Avail_Deflect so that you can see the 
                    impact of the change.
                    </p>
                    
                    <p>
                    When you click on Next, the tutorial will set the value of Wire_Dia to 0.110 inches.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 08 of 16",
            text: (
                <React.Fragment>
                    <p>
                    The tutorial has now entered a value of 0.110 inches for Wire_Dia. 
                    In the shorthand summary that will be used in the remaining tutorial 
                    and demo sessions, the action was:
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
                    Now that we have expressed what we want the design to accomplish,
                    we will ask the Search algorithm (<b>Action : Search</b> menu) for a solution.
                    Specifically, Search will find values of the free Independent Variables
                    that cause the Constraints and FIXes to be satisfied.
                    </p>

                    <p>
                    If the program can find a solution that satisfies all the constraints,
                    it will display "<b>FEASIBLE</b>" in the Result section (immediately below these words).  
                    If a satisfactory solution is found, but one or more constraints remain violated by a
                    trivial amount, the program will display "<b>MARGINALLY FEASIBLE</b>" in the Result section.
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 13 of 16",
            text: (
                <React.Fragment>
                    <p>
                    We have a solution. Please take a moment to scroll through and view the values.
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
                search()
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
                search()
            ]
        },
        {
            title: "Page 16 of 16 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>Several more tutorial sessions are planned. 
                    They will have names like tutor1, tutor2, ... etc. 
                    Refer to the documentation section (Help entry) covering the tutorial 
                    for a list of the Tutorial and DEMO topics.</p>
                    
                    <p>If you do not wish to continue with more demonstration problems, 
                    you can experiment with the various ODOP features, menus and reports. 
                    The HELP menu is a good place to start. </p>
                </React.Fragment>
            )
        }
    ]
}
