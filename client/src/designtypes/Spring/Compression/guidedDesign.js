import React from 'react';
import { Link } from 'react-router-dom';
export const execute = {
    steps: [
        {
            title: "Session Now In Progress",
            text: (
                <React.Fragment>
                    <p>
                    Welcome to the "Guided Design" tutorial session
                    for the <b>compression spring</b> design type.
                    This session is appropriate for a situation where you are creating a 
                    design from the original problem specification as opposed to validating
                    an existing or hypothesized design.
                    </p>
                    
                    <p>
                    This session is different than other tutorial and demo sessions in that it 
                    provides only high-level textual guidance for a spring design workflow and 
                    does not actually execute any design changes. 
                    The intent is that you will supply the numbers and menu selections;
                    this tutorial will supply step-by-step instructions and explanations to
                    guide you through the design process.
                    It would be best if you have had the opportunity to view some of the other, 
                    more introductory, tutorial and demo sessions before working through this one.
                    </p>
                    
                    <p>
                    Where the other tutorial and demo sessions will start by imposing a known
                    starting design (called initialState), 
                    this session will allow the existing design to remain in place.
                    It will be helpful if this design is a valid and consistent spring so as to 
                    provide a reasonable starting point for the search process. 
                    </p>
                    
                    <p>
                    To continue with this session, just click the "Next" button as you finish
                    reading each page (step). 
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 02 of 13",
            text: (
                <React.Fragment>
                    <p>
                    
                    </p>
                    
                    <p>
                    As with the other tutorial and demo sessions, 
                    you should understand that this tutorial session is "live" and not
                    a simple playback of a previous recording.  
                    The ODOP main page has simply been displaced downward by the text in this  
                    light green section.
                    All the menus and other inputs to the program remain available and active.
                    With a bit of coaching provided by this tutorial session, 
                    you are expected to enter values and execute menu selections appropriate to the
                    design problem at hand.
                    </p>
                    
                    <p>
                    The next screen will display a diagram illustrating the major steps that this session 
                    will guide you through.
                    After reviewing the diagram, use the "Next" button to continue.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 03 of 13",
            text: (
                <React.Fragment>
                <img src="designtypes/Spring/Compression/SpringDesignWorkflowDiagram.png" alt="Spring Design Workflow Diagram"/>
                </React.Fragment>
            )
        },
        {
            title: "Page 04 of 13",
            text: (
                <React.Fragment>
                    <p>
                    This is the time to express your objectives (goals, requirements) for the design at hand 
                    in terms of constraints (Min & Max) and FIXes.
                    Fill in the values and checkboxes now.
                    </p>
                    
                    <p>
                    For the moment, leave wire diameter (Wire_Dia) free.  
                    This will allow the search process to manipulate wire diameter as necessary to achieve those goals.
                    Selecting an available wire size happens later in the session.
                    </p>
                    
                    <p>
                    Notice that several constraints are established by default.  
                    For example, you should see established constraints on quantities like
                    Coils_A, Deflect_1, L_Stroke, ID_Free, FS_2, FS_Solid and %_Avail_Deflect.
                    These constraints are helpful in guiding the search process to deliver a good spring design.
                    Without similar constraints, the search process can "cheat", producing a result that is
                    mathematically possible but not particularly helpful in terms of a usable spring design.
                    You should feel free to experiment with different values for these constraint levels.
                    </p>
                    
                    <p>
                    Use the "Next" button to proceed after your inputs are complete.
                    Note that it will be possible to use the tutorial "Back" button to return the active design 
                    to the beginning of any step if any corrections or additional inputs are desired later.
                    Separately, frequent use of the <b>File : Save As...</b> feature will allow you to go back to 
                    a previous point in the design process with relatively little effort.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 05 of 13",
            text: (
                <React.Fragment>
                    <p>
                    The preceding changes have likely caused the violation of one or more constraints.
                    If so, the current design is considered to be "infeasible" or "NOT FEASIBLE".
                    The <b>Search</b> feature will adjust values of the Independent Variables in an 
                    attempt to find a design that does not violate constraints.
                    </p>
                    
                    <p>
                    Invoke the <b>Search</b> feature now.  Use the <b>Action : Search</b> menu above.
                    </p>
                    
                    <p>
                    Use the "Next" button to continue.
                    </p>
                    
                    <br />
                </React.Fragment>
            )
        },
        {
            title: "Page 06 of 13",
            text: (
                <React.Fragment>
                    <p>
                    If the "Feasibility:" result of the search is "NOT FEASIBLE", then it will likely be necessary 
                    to accept compromise and adjust the goals for the design. 
                    This can be done manually.
                    Also, the on-line Help provides a description of the <b>Trade</b> feature and instruction on its use.
                    Trade can be used to gain a better understanding of exactly how much constraint levels need to be adjusted 
                    in order to find the "nearest" feasible design.
                    </p>
                    
                    <p>
                    If the "Feasibility:" result of the search is "FEASIBLE" or "MARGINALLY FEASIBLE", 
                    then the <b>Seek</b> feature may be able to provide an optimized result. 
                    </p>
                    
                    <p>
                    This is a good time to take a close look at existing values.
                    You will likely need to scroll down to see everything.
                    The Report tabs (upper right) offer additional information in a spring design specific format.
                    If you do look at the Report tabs, you may want to 
                    switch back to the main "Design" tab before using the "Next" button to proceed.
                    </p>
                    
                    <p>
                    
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 07 of 13",
            text: (
                <React.Fragment>
                    <p>
                    While the <b>Seek</b> feature can find the constrained extreme of any independent or dependent variable 
                    that is not in FIXed status, for compression springs, the most likely candidates are: 
                    min Weight, max Cycle_Life, min Rate, min OD_Free, min L_Solid (solid height) or max Stroke.
                    </p>
                    
                    <p>
                    Invoke <b>Seek</b> now.  Use the <b>Action : Seek...</b> menu above.
                    </p>
                    
                    <p>
                    When examining the results of <b>Seek</b>, you may notice that multiple constraints are
                    violated by a small amount.  
                    The design likely will be classified as "MARGINALLY FEASIBLE" or even "NOT FEASIBLE".
                    This is normal.
                    The solution algorithm is finding a balance between the rewards and penalties of 
                    violating those constraints
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 08 of 13",
            text: (
                <React.Fragment>
                    <p>
                    Take a moment to review the results. 
                    Is this a reasonable design that meets the original objectives ? 
                    If not, try adjusting constraint levels and repeating <b>Search</b> and <b>Seek</b>.
                    </p>
                    
                    <p>
                    Next, we will get into selecting a standard wire size. 
                    But first, if this design seems like a good starting point, 
                    you should save it with a name like "ProjectX_Baseline".
                    Saving this design will keep it available for re-use in a few more steps.
                    </p>
                    
                    <p>
                    Before saving a design, it is a good practice to update the Comment field with notes
                    for future reference.  Use the <b>File : Properties...</b> menu.
                    </p>
                    
                    <p>
                    Use the <b>File : Save As...</b> menu.
                    Then, use the "Next" button to continue.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 09 of 13",
            text: (
                <React.Fragment>
                    <p>
                    Use the <b>Action : Select Size...</b> menu to select the nearest larger standard wire size.
                    Note that this operation leaves Wire_Dia in FIXed status.
                    </p>
                    
                    <p>
                    Even a small change in wire diameter has likely caused constraints to be violated.
                    This situation can be resolved by repeating <b>Search</b> and <b>Seek</b>&nbsp;
                    with the new (now FIXed) standard wire diameter.
                    </p>
                    
                    <p>
                    If the result appears reasonable,
                    update the Comment and save the design with a name like "ProjectX_Candidate1".
                    <br />
                    
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 10 of 13",
            text: (
                <React.Fragment>
                    <p>
                    Now, just to be sure that we are not missing out on some interesting design possibility,
                    restore that "baseline" design.
                    Use the <b>File : Open...</b> menu.
                    </p>
                    
                    <p>
                    This time use the <b>Action : Select Size...</b> menu to select the nearest <b>smaller</b> standard wire size.
                    As before, use <b>Search</b> to resolve any constraint violations that have crept in
                    with the new (now FIXed) standard wire diameter.
                    If a feasible or marginally feasible design is available, 
                    use <b>Seek</b> to optimize it on the previously used (max or min) criteria.
                    </p>
                    
                    <p>
                    If using a smaller standard wire size does not permit any feasible or marginally feasible solutions,
                    go back and have a look at what might be possible with an even larger standard wire diameter.
                    Again, use <b>Search</b> to resolve any constraint violations that have crept in
                    with the new (now FIXed) standard wire diameter.
                    Use <b>Seek</b> to optimize it on the previously used (max or min) criteria.
                    </p>
                    
                    <p>
                    If the result appears reasonable,
                    update the Comment and save it with a name like "ProjectX_Candidate2".
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 11 of 13",
            text: (
                <React.Fragment>
                    <p>
                    At this point it is appropriate to do a careful comparison of the candidate designs.
                    If you are working with a wide-screen monitor,
                    it should be possible to set up a side-by-side comparison.
                    There is an On-line Help entry that describes how this can be done for Help content. 
                    You can follow the same browser window configuration to work with two
                    ODOP design sessions at the same time.
                    For additional details see:  
                    <br /><br />
                    <b>Note to developers:</b> The link below fails in the local dev environment because it
                    appends the link path to the local path in the browser address line.
                    <br /><br />
                    <Link to="https://thegrumpys.github.io/odop/Help/wideScreen" > Side-by-side sessions on a widescreen monitor </Link>
                    </p>
                    
                    <p>
                    Aside from using a wide-screen monitor, 
                    it is also possible to use your browser's print function to print each of the candidate designs
                    and lay the printed pages side-by-side on a physical desktop.
                    </p>
                    
                    <p>
                    When ready, use the "Next" button to proceed.
                    </p>
                </React.Fragment>
            )
        },
        {
            title: "Page 12 of 13",
            text: (
                <React.Fragment>
                    <p>
                    Your preferred candidate design can be the basis for manufacturing a custom spring.
                    </p>

                    <p>
                    Our last step is to determine if there is an available catalog spring that meets 
                    the original design specifications. 
                    ODOP:Spring comes equipped with multiple spring catalogs, including:
                    <br /><br /> 
                    MS24585 Spring, Helical, Compression: For Loads Below 20 Pounds (SAE-AS24585)
                    <br />
                    MS24586 Spring, Helical, Extension:   For Loads Below 20 Pounds (SAE-AS24586)
                    <br /><br />
                    If necessary, use the <b>File : Open...</b> menu to re-open the preferred candidate design.
                    Use the <b>Action : Select Catalog...</b> menu to review the four most similar designs in the catalog. 
                    The display of catalog entries will be ranked by objective function value (amount of constraint violation).
                    Selecting a design from the catalog will replace the current design so that you can evaluate it.
                    More detail about standard design catalogs is available in the On-line Help. 
                    </p>
                </React.Fragment>
            ),
        },
        {
            title: "Page 13 of 13",
            text: (
                <React.Fragment>
                    <p>
                    If there is something in the catalog that looks workable, 
                    the side-by-side browser configuration can be used to compare the details of the custom spring 
                    to the best of the catalog springs.
                    </p>
                    
                    <p>
                    As noted previously, it is possible to use the tutorial "Back" button to return the 
                    active design to the beginning of any step if any corrections or additional inputs are desired.
                    You may also open a previously saved design to resume from that point.
                    </p>
                    
                    <p>
                    This concludes this Guided Design section of the tutorial.
                    Your feedback is welcome.
                    Use the Contact Us page of the website to find the appropriate contact information.
                    </p>
                    <br /><br />
                </React.Fragment>
            )
        }
    ]
}
