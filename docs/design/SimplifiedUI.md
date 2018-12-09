## Ideas for Simplified Design Check UI (Design Calculator)

This article provides a description of a proposed alternate user interface.
This approach would co-exist with the original ODOP user interface as a tab, 
in parallel to the original "Design" tab.
It is not anticipated that the underlying model would require any changes to
support the proposed UI.

The motivation for this alternate user interface is:
*  address a perceived demand for an easy to use design calculator
*  dramatically simplified operation for this limited case

The (Design Check / Design Calculator) tab and result section might look something like:   
![Simplified Tab and Result Section](./png/CheckTab_ResultSection.png "[Simplified Tab and Result Section")   
Note that the Objective Value and OBJMIN disappear.
Report tabs (if any) would continue unchanged.   

As first opened...
*  input field headers (Independent, Dependent, Calculation Inputs) are blank
*  Independent Variable & Dependent Variable checkboxes do not exist
*  constraint columns (checkbox, Value & Violation) do not exist
*  assuming the Startup entry has no FIXed variables, initially, all of the input fields are blank
*  initially (before Check Design button is pressed), the Value fields are blank   

![Simplified Variable and Empty Values Section](./png/Variable_ValuesSection.png "[Simplified Variable and Empty Values Section")   

As the user enters values in the Input fields, nothing happens.
Any Independent or Dependent Variables that the user enters are put into FIXed status with the user specified value.
When the user hits the "Check Design" button, a Search is executed.
Only then is the "Value" column populated.
The user is allowed further changes in inputs and clicks on the "Check Design" button.   

The following image illustrates what things might look like after clicking the "Check Design" button.   
![Simplified UI after Check Design](./png/AfterCheckDesign.png "[Simplified UI after Check Design")   

&nbsp;

Notes:  
* It might be desirable to have the Sub-Problems feature implemented
in order to keep spring design users out of trouble with things like Prop\_Calc_Method.
* In order to implement a spring design calculator, relaxed constraints as compared to those
defaulted in initialState / startup are likely desirable.
In turn, if the user simply switches from Design Check to Design mode, 
these relaxed constraints could lead to less desirable results than the default constraints.

