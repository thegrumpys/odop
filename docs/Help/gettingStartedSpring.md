#### Getting Started With the Spring Tutorial and Demo

This page describes how to launch the first sessions of the spring design 
Tutorial and the spring design Demo.
A few suggestions on how to explore ODOP:Spring after completing the
tutorial and demo sessions are also provided.   

While a user account is not required to access the ODOP software,
an account with associated username and password is required to save designs into 
the cloud-based ODOP "Design Library".
See: [User Accounts](/docs/About/userAccounts.html) for details on
how to obtain a free account.

A list of various on-line Help pages providing introductory information is available at
[Intro Pages Overview](/docs/About/introPagesOverview.html).
In particular, see [Launching the Program](launchODOP.html) for more detailed instructions on 
how to get the program up and running.

The ODOP software expects to start from an [existing design](/docs/Help/defaultDesigns.html).
While they contain pre-established constraints that 
serve to guide the solution to reasonable and expected results,
the provided Startup designs are [under specified](/docs/Help/designSituations.html). 
You should provide additional constraints and Fixes specific to your spring application.

If you haven't seen it already, the 
[ODOP Design Process Flow Diagram](/docs/About/png/DesignProcessFlowDiagram.png)
provides an important conceptual introduction to the overall design process within ODOP.   

Before continuing with the material below, 
it would be helpful to have the ODOP program is running in a browser window (or tab) 
and that the Compression Spring design type is loaded.
You should see Independent Variables like OD\_Free, Wire\_Dia and L\_Free.
If you see the Independent Variables of the Rectangular Solid design type 
(Length, Width and Height),
simply click the browser Reload (Refresh) button of the window or tab containing the ODOP program 
and then click the **Open** button to switch to the default design type (Spring/Compression) 
with the default design (Startup).  

Tutorial sessions teach operation of the program.
Use the **Help : Tutorial...** menu item (illustrated in the screen captures below) 
to select the desired tutorial session.   

![Help Tutorial](/docs/Help/png/HelpTutorial.png "Help Tutorial")   
   

![Select Spring Tutorial](/docs/Help/png/SelectSpringTutor.png "Select Spring Tutorial")   
   
The spring tutorial session named **tutorTour** is recommended as a good starting point
for users that have not already completed the tour provided in the **Help : Getting Started** topic.   

&nbsp;

Demo sessions illustrate problem solving techniques as well as provide
sample solutions to several generally available reference book problems.
Use the **Help : Demo...** menu item to select the desired demo session.   

![Help Demo](/docs/Help/png/HelpDemo.png "Help Demo")   
   

![Select Spring Demo](/docs/Help/png/SelectSpringDemo.png "[Select Spring Demo")   
   
The spring demo sessions named **demoDesignValidation** and **demoNewDesign** are recommended as a good
starting point for new users.   

&nbsp;

**Spring Design Process**   

After completing tutorial and demo sessions,
a bit of free-form experimentation may be in order.
The remainder of this discussion will provide a few 
suggestions on how to explore the program.

Start from an existing design. 
See [Units: US customary and metric](SpringDesign/unitsUSmetric.html) to
work in metric units. 
More information on default designs is available at [Default Designs](/docs/Help/defaultDesigns.html).

CHANGE independent variables.
For the compression spring design type, those include
  Wire\_Dia, OD\_Free, Coils\_T, L\_Free, Force\_1, or Force\_2.
 Observe that recalculations happen immediately.
 
&nbsp;

 Look at reports contained in the three Report tabs.   
 ![Spring Report Tabs](/docs/Help/png/SpringReportTabs.png "Spring Report Tabs")   
 
&nbsp;

 After introducing enough changes to violate a few constraints,
 run a Search (**Action : Search** menu) to see if it can find a "feasible" 
 solution that  does not violate any constraints. 
 Establish or change the value of constraint levels; 
 for example,  OD\_Free MAX, L\_Stroke MIN and/or L\_Solid MAX. 
 Repeat the  search and observe how the design is adjusted to accommodate 
 your objectives. 
 To observe how ODOP:Spring reacts to a request to achieve the impossible, 
 increase Force\_2 MIN until Search can no longer find a feasible solution. 
 Move a different constraint, perhaps OD\_Free MAX or another
 constraint that shows up as violated, until Search finds a feasible
 solution again.
 
 Use the FIX capability on one or more dependent variables like 
 RATE, L\_1 or L\_2. 
 Remember that a Search must be performed to establish the desired
 values when you FIX a dependent variable.

 Finally, try to design a spring from scratch. 
 Use the entry fields to enter constraints associated with a hypothesized design. 
 Constraint entry fields appear directly in the Advanced View. 
 In Calculator View, click on a white background entry field to change values, control Fix / Free status and establish or modify constraints. 
 Try designing the spring in a ball  point pen, 
 or perhaps a suspension spring for a motorcycle, 
 an automobile or a railroad locomotive. 
 Use the **File : Save** menu item to save the results of your work in 
 the design library.
 
 SEEK and TRADE are covered in later sections of the tutorial.
 You can master these advanced features with the same technique. 
 Dive in and try it! 
 
 Once you have already saved any work that you wish to keep, you can sign out 
 by using "Sign Out" button in the upper left.
 Finally, close the browser tab or browser window containing the ODOP app.
  
&nbsp;   
    
In getSizeEntries [Help](/docs/Help)

 