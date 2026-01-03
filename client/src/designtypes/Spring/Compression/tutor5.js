import React from 'react';
import { loadInitialState, changeLabelsValue } from '../../../store/actions';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    This section of the tutorial covers ODOP:Spring Calculation Inputs related to material
                    selection, material properties (including allowable stresses), and spring end types.
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
                    To continue with this session, click the "Next" button as you finish
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
                    Confirm that you are in ODOP's Advanced View. 
                    If you are not already familiar with the list,
                    scroll down and look at the items under the Calculation Inputs heading.
                    Hover over the tooltips for additional insight into each quantity.
                    </p>

                    <p>
                    The on-line documentation sections (Help entries) titled 
                    &nbsp;<a href="/docs/Help/SpringDesign/index.html" target="_blank" rel="noopener noreferrer">Spring Design</a>&nbsp; 
                    and 
                    &nbsp;<a href="/docs/Help/DesignTypes/Spring/Compression/description.html" target="_blank" rel="noopener noreferrer">Compression Spring</a>&nbsp; 
                    provide more detailed definitions for each of the Calculation Inputs. 
                    While reviewing every quantity here would make this tutorial unnecessarily long, 
                    it is important to understand that <b>Stress_Lim_Stat</b> and <b>Stress_Lim_Endur </b> 
                    are the allowable stress limits for static load and endurance, respectively. 
                    The factor of safety values are calculated directly from these allowable stresses.
                   </p>
                </>
            ),
            actions: [
                loadInitialState('Spring/Compression'),
                changeLabelsValue([{name: 'COMMENT', value: 'Compression Spring Demo'}])
            ]
        },
        {
            title: "Page 03 of 09",
            text: (
                <>
                    <p>
                    ODOP:Spring provides flexibility in how material properties are determined.
                    There are three different approaches:
                    </p>

                    <ol>
                        <li>
                        By default, the selected <b>Material_Type</b> is used to get values from
                        an internal table. 
                        These values are combined with the current <b>Wire_Dia</b> and the 
                        cycle life target to calculate the allowable stresses: 
                        <b> Stress_Lim_Endur</b> and <b>Stress_Lim_Stat</b>.  
                        Each time the user or the search changes the
                        value of <b>Wire_Dia</b>, a new set of allowable stresses is calculated,
                        resulting in updated factor of safety values.
                        </li>
                        <li>
                        You can use a material that is not in the supplied table, or specify values that
                        differ from those in the table.
                        </li>
                        <li>
                        You can directly specify the allowable stresses to be used.
                        </li>
                    </ol>
                    <p>
                    The later two options eliminate the dependence on <b> Wire_Dia</b>.
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
                    Scroll down to the Calculation Inputs section and locate <b>Material_Type</b>. 
                    Click the downward pointing arrow (triangle) to drop down the selection list.
                    The on-line documentation (Help entry) on
                    &nbsp;<a href="/docs/Help/SpringDesign/materials.html" target="_blank" rel="noopener noreferrer">Spring Materials</a>&nbsp;
                    provides additional descriptive information on each of the entries in this table.
                    </p>

                    <p>
                    Observe how selecting different materials changes the values of 
                    <b> Torsion_Modulus</b>, <b>Tensile</b>, <b>%_Tensile_Stat</b>, and <b> %_Tensile_Endur</b>.
                    Also observe how changes in <b>Wire_Dia</b> affect the allowable stresses 
                    <b> Stress_Lim_Endur</b> and <b>Stress_Lim_Stat</b>.
                    </p>

                    <p>
                    Next, look at the drop down for <b>Life_Category</b>. 
                    When a static life category is selected, the values of 
                    <b> %_Tensile_Stat</b> and <b>%_Tensile_Endur</b> are identical. 
                    When a non-static target life is selected, the value of <b> %_Tensile_Endur</b> is reduced. 
                    In summary, by default, <b>Material_Type</b> is used to obtain the values of 
                    <b> Torsion_Modulus</b>, <b>Tensile</b>, <b>%_Tensile_Endur</b>, and <b> %_Tensile_Stat </b> 
                    from the material table. 
                    These values are combined with the current <b>Wire_Dia</b> to calculate 
                    <b> Stress_Lim_Endur</b> and <b>Stress_Lim_Stat</b>.
                    Those allowable stress values are then used to calculate the
                    Factor of Safety values, which can be used as constraints on the design.
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
                    Notice that, in the default configuration 
                    (<b>Prop_Calc_Method</b> = "1-Use values from material table"), 
                    it is not possible to change any of the 
                    values that are determined by the material table. Specifically, these include 
                    <b> Torsion_Modulus</b>, <b>Tensile</b>, <b>%_Tensile_Endur</b>, 
                    <b> %_Tensile_Stat</b>, <b>Stress_Lim_Endur</b>, and <b>Stress_Lim_Stat</b>. 
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
                    When you need to specify a material that is not in the material table, or to use values
                    that do not match those in the table, change <b>Prop_Calc_Method</b> to
                    indicate that the material table should no longer be used. 
                    Specifically, setting 
                    <b> Prop_Calc_Method</b> to <b>“2-Use Tensile &amp; %_Tensile_...”</b> 
                    allows you to establish arbitrary values for 
                    <b> Torsion_Modulus</b>, <b>Tensile</b>, <b>%_Tensile_Endur</b>, and <b>%_Tensile_Stat</b>. 
                    In this mode, <b> Wire_Dia</b> is no longer a factor in the calculation of allowable stresses 
                    <b> Stress_Lim_Endur</b> and <b>Stress_Lim_Stat</b>. 
                    </p>

                    <p>
                    Please take this opportunity to change the value of
                    Prop_Calc_Method to "2-Use Tensile & %_Tensile_...".
                    Then experiment with changing the values listed above.
                    Observe that <b>Stress_Lim_Endur</b> and <b> Stress_Lim_Stat </b> 
                    are now determined by the user specified values of 
                    <b> Tensile</b>, <b>%_Tensile_Endur</b>, and <b>%_Tensile_Stat</b>,
                    and are no longer dependent on <b>Wire_Dia</b>.
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
                    Finally, you may choose to directly specify the allowable stresses themselves.
                    This is accomplished by changing the value of <b>Prop_Calc_Method</b> to
                    <b> "3-Use Stress_Lim_..."</b>.
                    </p>

                    <p>
                    When <b>Prop_Calc_Method</b> is set to "3-Use Stress_Lim_..."
                    ODOP:Spring assumes that the allowable stresses
                    (<b>Stress_Lim_Endur</b> and <b>Stress_Lim_Stat</b>) are set directly by the user.
                    In this case, there is no relationship between allowable stress and <b>Wire_Dia</b>.
                    </p>

                    <p>
                    Please take this opportunity to change the value of
                    Prop_Calc_Method to "3-Use Stress_Lim_...".
                    Then experiment with changing the allowable stress values.
                    Observe that <b>Stress_Lim_Endur</b> and <b> Stress_Lim_Stat</b> are now directly 
                    determined by the user-specified values and are no longer dependent on <b>Wire_Dia</b>.
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
                    It is time to move on to a discussion of <b>End_Type</b>
                    </p>

                    <p>
                    Locate <b>End_Type</b>.
                    Open the selection list and make a few changes. 
                    Observe the effect on the number of inactive coils.  
                    Changes in the number of active coils changes <b>Rate </b> 
                    and many other aspects of the design.
                    </p>

                    <p>
                    Note the "Tapered, Closed &amp; Ground" and "Pigtail" end types that
                    are common in hot-wound springs.
                    Refer to the discussion in the on-line documentation (Help entry) on
                    &nbsp;<a href="/docs/Help/DesignTypes/Spring/Compression/description.html#c_springEndTypes" target="_blank" rel="noopener noreferrer">Compression Spring End Types</a>&nbsp;
                    for information on <b>Grind_Amount</b>, <b>Taper_Amount</b>, 
                    and the calculation of solid height for these end types.
                    </p>

                    <p>
                    Note the "UserSpecified" and "UserSpecified&Ground" end types. 
                    These entries are provided in order to accommodate unusual end configurations 
                    (for example, a spring with extra dead coils or with two different end types). 
                    The designer can provide custom values for 
                    <b> Inactive_Coils</b>, <b>Grind_Amount</b>, and <b>Taper_Amount</b>. 
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
                    You should now feel confident about selecting materials and changing end types.
                    Take a few minutes at this point to experiment on your own.
                    </p>

                    <p>
                    You may also want to review the on-line documentation (Help entry) titled
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
