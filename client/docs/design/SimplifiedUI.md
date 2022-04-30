# View Alternatives

Originally titled: _"Ideas for Simplified Design Check UI (Design Calculator)"_, 
this article has been expanded to describe multiple hypothetical alternate user interfaces for ODOP. 

Some sub-set of the alternatives described here can co-exist with the original, fully featured ODOP user interface
previously called the "main page" or "Design" tab. 
Separate entries on the View menu would allow the user to switch between the multiple alternatives. 
Each UI alternative is thought of and referred to as a "view" of the single underlying model. 

Ease of use is the primary motivation for additional or alternate user interfaces.
Specifically: 
*  address a perceived demand for an easy to use design calculator
*  dramatically simplified operation for this limited case 
*  allow users to incrementally learn the concepts required for successful operation of the full feature set

On this page:  
[Features common to each alternative](SimplifiedUI.html#commonFeatures)  
[View : Calculator](SimplifiedUI.html#simpleCalc)  
[View : Basic](SimplifiedUI.html#basicUI)  
[View : Advanced](SimplifiedUI.html#advancedUI)  
[Original article: Ideas for Simplified Design Check UI (Design Calculator)](SimplifiedUI.html#originalArticle)  
&nbsp;


<a id="commonFeatures"></a>
&nbsp;  
**Common Features**

Issue 365 - Change labels: Termination Message, OBJ, OBJMIN  

Ability to use the Exec / Tutor / Demo feature to optionally put text-based "guidance" above each alternative.

There is an idea for a future version of the Exec / Tutor / Demo feature to accept input (yes, no) and 
support conditional logic or branching based on that input. 
Perhaps this can be the foundation for a conversational or "Wizard-like" approach ?  


<a id="simpleCalc"></a>
&nbsp;  
**View : Calculator**  

Simple Spring Calculator  
This alternative provides no direct ability to Constrain, FIX, Search, Seek or Trade. 
Those features should be inaccessible or disabled for this view. 
A user that wants these features should use one of the other views. 

See [Issue #432: Allow value inputs within Reports](https://github.com/thegrumpys/odop/issues/432)  
(screen shots are included in the issue)  

This is a spring design specific view derived from Report1.

It is desirable to limit wire size inputs to the values in the material-appropriate standard size tables.  

<a id="basicUI"></a>
&nbsp;  
**View : Basic**

Philosophically, this alternative is a greatly simplified version of the original full-featured "main page" or "Design tab".  

Start by implementing some aspect of "sub-problems" as described in:   
[#170](https://github.com/thegrumpys/odop/issues/170), 
[#187](https://github.com/thegrumpys/odop/issues/187),
[#90](https://github.com/thegrumpys/odop/issues/90) and 
[Sub-Problems feature](/docs/design/SubProblems.html).  

Note that FIXed Dependent Variables or variables associated with violated constraints must be displayed.

Use this feature to suppress display of all non-critical aspects of the design.
Specifically, PropCalcMethod and 
in extension springs, Calculation Inputs and Dependent variables associated with stress from Initial_Tension.

Supress display of all constraints and violations. 
Use the newly available screen width to give FIX checkboxes a dedicated column 
including its own heading and associated tooltip.

Provide a button labeled "ReCalc" or "Solve" or "Search". 
This button invokes Search.
Search, Seek and Trade remain enabled on the Action menu.

Provide alerts for violated constraints. 
 - Highlight the variable value associated with the violated constraint plus change the tooltip ?
 - Provide an "Info" column with tooltip giving constraint violation details ?

The graphic below shows the extension spring "Basic" View with Objective Value = 0.
Compare with the equivalent view provided in the "Advanced" section below.  
![Extension Spring - Basic, FEASIBLE](/docs/design/png/Basic4.png "Extension Spring - Basic, FEASIBLE")   

The graphic below shows the extension spring "Basic" View with Objective Value > OBJMIN and < 4*OBJMIN. 
Note how violated constraints get an appropriately colored "Info" indicator in the Info column. 
This text can carry a tooltip that provides the "outside the range" details 
similar to how it is handled in the Calculator view.
The Stress_Initial row is normally suppressed in the Basic view, 
but because it is violated, it appears in this case.
![Extension Spring - Basic, VIOLATIONS](/docs/design/png/Basic5.png "Extension Spring - Basic, VIOLATIONS")   


<a id="advancedUI"></a>
&nbsp;  
**View : Advanced**

This alternative is the original full-featured "main page" or "Design tab" as enhanced by 
the ResultTable improvements of Issue 365 and
other incremental improvements (for example, milestone 3.10)

The extension spring "Advanced" view:  
![Extension Spring - Advanced](/docs/design/png/Exten1234.png "Extension Spring - Advanced")  
Contrast this with the "Basic" view above.

<a id="originalArticle"></a>
&nbsp;  
**Ideas for Simplified Design Check UI (Design Calculator)**

The (Design Check / Design Calculator) tab and result section might look something like:   
![Simplified Tab and Result Section](/docs/design/png/CheckTab_ResultSection.png "[Simplified Tab and Result Section")   
Note that the Objective Value and OBJMIN disappear.
Report tabs (if any) would continue unchanged.   

As first opened...
*  input field headers (Independent, Dependent, Calculation Inputs) are blank
*  Independent Variable & Dependent Variable checkboxes do not exist
*  constraint columns (checkbox, Value & Violation) do not exist
*  assuming the Startup entry has no FIXed variables, initially, all of the input fields are blank
*  initially (before Check Design button is pressed), the Value fields are blank   

![Simplified Variable and Empty Values Section](/docs/design/png/Variable_ValuesSection.png "Simplified Variable and Empty Values Section")   

As the user enters values in the Input fields, nothing happens.
Any Independent or Dependent Variables that the user enters are put into FIXed status with the user specified value.
When the user hits the "Check Design" button, a Search is executed.
Only then is the "Value" column populated.
The user is allowed further changes in inputs and clicks on the "Check Design" button.   

The following image illustrates what things might look like after clicking the "Check Design" button.   
![Simplified UI after Check Design](/docs/design/png/AfterCheckDesign.png "[Simplified UI after Check Design")   

&nbsp;

Notes:  
* It might be desirable to have the Sub-Problems feature implemented
in order to keep spring design users out of trouble with things like Prop\_Calc_Method.
* In order to implement a spring design calculator, relaxed constraints as compared to those
defaulted in initialState / startup are likely desirable.
In turn, if the user simply switches from Design Check to Design mode, 
these relaxed constraints could lead to less desirable results than the default constraints.

