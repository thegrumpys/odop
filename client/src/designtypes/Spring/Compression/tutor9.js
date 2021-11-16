import React from 'react';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <>
                    <p>
                    </p>
                    
                    <p>
                    This tutorial section covers the use of ODOP internal variables and 
                    adjusting them with the <b>File : Preferences</b> menu item.
                    Also included here is a discussion of the use of labels and setting them with 
                    the <b>File : Properties</b> menu item. 
                    </p>
                    
                    <p>
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
            title: "Page 02 of 05",
            text: (
                <>
                    <p>
                    ODOP contains a number of quantities that you can think of as "internal variables".  
                    They are variables and switches that are used to
                    control the operation of the program.
                    These quantities are not specifically related to spring design.
                    </p>
                    
                    <p>
                    Without leaving this tutorial session, you can drop down the 
                    <b> File : Preferences</b> menu above to see the list.
                    </p>
                    
                    <p>
                    Many of the Preferences quantities are related to control of the search process.  
                    Others are weighting factors that have some influence on search results.
                    Refer to the on-line documentation section (Help entry) on 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/search" target="_blank" rel="noopener noreferrer">Search</a>&nbsp; 
                    for more specific details.
                    </p>

                    <p>
                    The <b>Action : Execute</b> menu provides the ability to run pre-configured command sequences.
                    The entry named "tweakPrefs" provides an adjustment to a set of search Preferences.
                    Running tweakPrefs will increase the precision of the search result at the expense
                    of longer search run time.   
                    </p>
                    <br />
                </>
            ),
            actions: [
            ]
        },
        {
            title: "Page 03 of 05",
            text: (
                <>
                    <p>
                    The preference items "show_units" and "show_violations" are available to
                    assist in tuning the user interface for operation on small screen devices.
                    Setting the value to zero will suppress display of the Units and / or
                    Violations columns.
                    </p>
                    
                    <p>
                    Additional information on Preferences is available in the documentation section (on-line help entry) 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#preferences" 
                    target="_blank" rel="noopener noreferrer">Preferences</a>.&nbsp; 
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
                </>
            ),
            actions: [
            ]
        },
        {
            title: "Page 04 of 05",
            text: (
                <>
                    <p>
                    The <b>File : Properties</b> menu item provides an opportunity to save  
                    various kinds of textual information with a design. 
                    </p>
                    
                    <p>
                    During a detailed investigation that considers multiple design alternatives, 
                    it is usually helpful to update the design's Comment field
                    before saving each alternative.
                    Also, it is possible to save contact information and other important
                    details associated with the design.
                    </p>
                    
                    <p>
                    Without leaving this tutorial session, you can drop down the 
                    <b> File : Properties</b> menu above to see the list of pre-configured labels.
                    Take a moment to provide text values for a few of these label fields.
                    Report 3 is formatted to support a Request for Quotation.
                    Select the Report 3 tab to see how the labels appear. 
                    </p>
                    
                    <p>
                    Additional information on Properties is available in the documentation section (on-line help entry) 
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/terminology#preferences" 
                    target="_blank" rel="noopener noreferrer">Properties</a>.&nbsp; 
                    </p>
                    <br /><br />
                </>
            ),
            actions: [
            ]
        },
        {
            title: "Page 05 of 05 (last page)",
            text: (
                <>
                    <p>
                    You have reached the last page of the last tutorial session. 
                    So, if you made it this far without skipping any of the earlier sessions,
                    you have covered all of the major ODOP:Spring functions.
                    Congratulations are definitely in order.  
                    </p>
                    
                    <p>
                    The sessions in the Demo series provide sample solutions to
                    selected reference book problems plus assorted tricks and pointers.  
                    You  should be sure to review that material because it will give advice 
                    and examples on problem formulation.  
                    Also, some issues of computational  efficiency are covered.  
                    Short cuts are always nice, 
                    even if the program can find the right answer by doing it the hard way !
                    </p>
                    
                    <p>
                    </p>
                    
                    <p>
                    If you haven't seen them already, more tutorial sessions are available. 
                    They have names like tutor3, tutor4, ... etc. 
                    Refer to the on-line documentation section (Help entry) covering the  
                    &nbsp;<a href="https://www.springdesignsoftware.org/odop/docs/Help/tutordemo" target="_blank" rel="noopener noreferrer">Tutorial and Demo</a>&nbsp; 
                    for a list of topics.
                    </p>
                    <br /><br />
                </>
            )
        }
    ]
}
