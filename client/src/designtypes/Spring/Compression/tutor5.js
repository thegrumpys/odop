import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, loadInitialState, changeLabelsValue } from '../../../store/actionCreators';
import { MAX } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
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
                    for the ODOP Compression Spring design type.
                    </p>
                    
                    <p>
                    To continue with this session, just click the "Next" button as you finish
                    reading each page (step). 
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 02 of 09",
            text: (
                <>
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
                    The on-line documentation sections (Help entries) titled 
                    &nbsp;<a href="/docs/Help/SpringDesign.html" target="_blank" rel="noopener noreferrer">Spring Design</a>&nbsp; 
                    and 
                    &nbsp;<a href="/docs/Help/DesignTypes/c_spring.html" target="_blank" rel="noopener noreferrer">Compression Spring</a>&nbsp; 
                    provide a more detailed definition for each of the Calculation Inputs.  
                    It would make the tutorial too long (and boring !) to review each quantity here.
                    However, it is important to make sure that you understand that
                    Stress_Lim_Stat and Stress_Lim_Endur are the allowable
                    stress limits for static load and endurance respectively. 
                    The factor of safety numbers are calculated directly from Stress_Lim_Stat and Stress_Lim_Endur.
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
            title: "Page 03 of 09",
            text: (
                <>
                    <p>
                    ODOP:Spring provides flexibility in how material properties are determined. 
                    There are three different capabilities:
                    </p>
                    
                    <ol>
                        <li>
                        By default, the selected Material_Type is used to get values from 
                        an internal table. These values
                        are combined with the current Wire_Dia and the cycle life target to
                        calculate the values of the allowable stresses: Stress_Lim_Endur and
                        Stress_Lim_Stat.  Thus, every time the user or the search changes the
                        value of Wire_Dia, a new set of allowable stresses is calculated,
                        resulting in new factor of safety values.
                        </li>
                        <li>
                        It is possible to use a material that is not in the supplied table, 
                        or to use values that are different than those in the table.
                        </li>
                        <li>
                        It is possible to directly specify the allowable stresses to be used. 
                        </li>
                    </ol>
                    <p>
                    The later two options eliminate the dependence on Wire_Dia.
                    </p>
                    <br /><br />
                </>
            )
        },
        {
            title: "Page 04 of 09",
            text: (
                <>
                    <p>
                    We will examine each of these capabilities in detail, starting with the
                    default case.
                    </p>
                    
                    <p>
                    Take a moment to scroll down to the Calculation Inputs section.
                    Locate Material_Type.
                    Click on the downward pointing triangle to drop down the selection list.
                    The on-line documentation (Help entry) on 
                    &nbsp;<a href="/docs/Help/SpringDesign/materials.html" target="_blank" rel="noopener noreferrer">Spring Materials</a>&nbsp; 
                    provides additional descriptive information on each of the entries in this table.
                    </p>
                    
                    <p>
                    Observe how selecting different materials changes the values of 
                    Torsion_Modulus, Tensile, %_Tensile_Stat and %_Tensile_Endur.
                    Observe how changes in Wire_Dia impact the values of 
                    the allowable stresses Stress_Lim_Endur and Stress_Lim_Stat.
                    </p>
                    
                    <p>
                    Now, look at the drop down for Life_Category.
                    When a static Life_Category is selected, the values of 
                    %_Tensile_Stat and %_Tensile_Endur are identical.
                    When a longer target life Life_Category is selected, the value of
                    %_Tensile_Endur is reduced.
                    In summary ... by default, Material_Type is used
                    to get the values of Torsion_Modulus, Tensile,
                    %_Tensile_Endur and %_Tensile_Stat from the material table.  These
                    values are combined with the current Wire_Dia to calculate the values of
                    the allowable stresses Stress_Lim_Endur and Stress_Lim_Stat.
                    In turn, those allowable stress values are used to calculate the
                    Factor of Safety numbers that can be used as constraints on the design.
                    </p>
                </>
            )
        },
        {
            title: "Page 05 of 09",
            text: (
                <>
                    <p>
                    This is a good time for a bit of experimentation.
                    </p>
                    
                    <p>
                    Notice that currently it it not possible to change any 
                    of the values that are determined by the materials table.
                    Specifically, these include
                    Torsion_Modulus, Tensile, %_Tensile_Endur, %_Tensile_Stat
                    Stress_Lim_Endur and Stress_Lim_Stat.
                    </p>
                    <br /><br />
                </>
            )
        },
        {
            title: "Page 06 of 09",
            text: (
                <>
                    <p>
                    For the case where there is a desire to specify a material that is
                    not in the material table, or to specify values that do not match those in
                    the table, change Prop_Calc_Method to indicate that the 
                    material table should no longer be used.
                    Specifically, setting Prop_Calc_Method to <b>"2-Use Tensile & %_Tensile_..."</b>
                    will allow the user to establish arbitrary values for
                    Torsion_Modulus, Tensile, %_Tensile_Endur and %_Tensile_Stat.
                    Wire_Dia will no longer be a factor in the calculation of allowable stresses
                    Stress_Lim_Endur and Stress_Lim_Stat.
                    </p>
                
                    <p>
                    Please take this opportunity to change the value of 
                    Prop_Calc_Method to "2-Use Tensile & %_Tensile_...".
                    Experiment with changing the values listed above.
                    Observe that Stress_Lim_Endur and Stress_Lim_Stat are now determined by the 
                    user specified values of Tensile, %_Tensile_Endur and %_Tensile_Stat
                    and are no longer dependent on Wire_Dia.
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 07 of 09",
            text: (
                <>
                    <p>
                    Finally, the user may directly establish values of the allowable stresses. 
                    This is accomplished by changing the value of Prop_Calc_Method to
                    <b> "3-Use Stress_Lim_..."</b>.
                    </p>
                    
                    <p>
                    In the case that Prop_Calc_Method is set to "3-Use Stress_Lim_..."
                    ODOP:Spring will assume that the allowable stresses 
                    (Stress_Lim_Endur and Stress_Lim_Stat) are directly set by the user. 
                    There is no relationship to Wire_Dia. 
                    </p>
                    
                    <p>
                    Please take this opportunity to change the value of 
                    Prop_Calc_Method to "3-Use Stress_Lim_...".
                    Experiment with changing the values listed above.
                    Observe that Stress_Lim_Endur and Stress_Lim_Stat are now directly determined by the 
                    user specified values and are no longer dependent on Wire_Dia.
                    </p>
                    <br />
                </>
            )
        },
        {
            title: "Page 08 of 09",
            text: (
                <>
                    <p>
                    It is time to move on to a discussion of End_Types
                    </p>
                    
                    <p>
                    Locate End_Type.
                    Click to drop down the selection list.
                    Make a few changes and observe the effect on
                    the number of inactive coils.  Of course, changes in the number
                    of active coils changes Rate and many other aspects of the spring.
                    </p>
                    
                    <p>
                    Note the "Tapered, Closed & Ground" and "Pig-tail" end types that
                    are common in hot-wound springs.
                    Refer to the discussion in the on-line documentation (Help entry) on 
                    &nbsp;<a href="/docs/Help/DesignTypes/c_spring.html#c_springEndTypes" target="_blank" rel="noopener noreferrer">Compression Spring End Types</a>&nbsp; 
                    for information on Add_Coils@Solid and the 
                    calculation of solid height for these end types.
                    </p>
                    
                    <p>
                    Note the "User Specified" end type.
                    This entry is provided in order to label unusual end configurations
                    (for example, a spring with extra dead coils or with two different end types)
                    where the designer has provided custom values for Inactive_Coils and
                    Add_Coils@Solid.
                    Additional information is available in the same on-line documentation section for
                    the Compression Spring design type.
                    </p>
                </>
            )
        },
        {
            title: "Page 09 of 09 (last page)",
            text: (
                <>
                    <p>
                    Congratulations, you've finished another section of the tutorial.
                    You should feel confident about selecting materials and changing
                    end types. 
                    Take a few minutes at this point to experiment on your own. 
                    </p>
                    
                    <p>
                    Also, look in the on-line documentation section (Help entry) titled  
                    &nbsp;<a href="/docs/Help/SpringDesign/materials.html" target="_blank" rel="noopener noreferrer">Spring Materials</a>.&nbsp; 
                    </p>
                    
                    <p>
                    More tutorial sessions are available. 
                    They have names like tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="/docs/Help/tutordemo.html" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a list of topics.
                    </p>
                </>
            )
        }
    ]
}
