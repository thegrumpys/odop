import React from 'react';
import { changeSymbolValue, changeSymbolConstraint, loadInitialState, changeLabelsValue } from '../../../store/actionCreators';
import { MAX } from '../../../store/actionTypes';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    This section covers the use of 
                    ODOP internal variables and 
                    adjusting them with the <b>File : Preferences</b> menu item.
                    Also covered, the use of labels and setting them with 
                    the <b>File : Properties</b> menu item. 
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
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 07",
            text: (
                <React.Fragment>
                    <p>
                    The initial conditions expected by this tutorial session are now established.
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
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
            title: "Page 03 of 07",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    On the subject of internal variables ...
                    </p>

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
                    Many of the Preferences quantities are related to control of the search
                    process.  Others are weighting factors that have some influence on
                    search results.
                    Refer to the on-line documentation section (Help entry) on 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/search" target="_blank" rel="noopener noreferrer">Search</a>&nbsp; 
                    for additional details.
                    </p>

                    <p>
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 04 of 07",
            text: (
                <React.Fragment>
                    <p>
                    </p>
                    
                    <p>
                    This completes our 
                    quick look at the internal variables found in the&nbsp;
                    <b>File : Preferences</b> menu item.
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    </p>
                    <br />
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 05 of 07",
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
                    <br /><br />
                </React.Fragment>
            ),
            actions: [
            ]
        },
        {
            title: "Page 06 of 07",
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
            )
        },
        {
            title: "Page 07 of 07 (last page)",
            text: (
                <React.Fragment>
                    <p>
                    Congratulations, you've finished another section of the tutorial.
                    Take a few minutes at this point to experiment on your own. 
                    </p>
                    
                    <p>
                    Also, look in the on-line documentation section (Help entry) titled  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/SpringDesign/selectSizeCatalog" 
                    target="_blank" rel="noopener noreferrer">TODO</a>.&nbsp; 
                    </p>
                    
                    <p>
                    More tutorial sessions are available. 
                    They have names like tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a list of topics.
                    </p>
                    <br /><br />
                </React.Fragment>
            )
        }
    ]
}
