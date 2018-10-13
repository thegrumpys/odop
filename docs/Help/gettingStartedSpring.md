#### Getting Started With Spring Tutorial and Demo

**Under Construction**   
This page is still a work in progress !

This page will eventually describe how to launch the first session of the spring Tutorial
or the Spring Demo sessions plus provide a few suggestions on how to explore the program.   

Tutorial sessions teach operation of the program.
Use the <b>Help : Tutorial...</b> menu item to select the desired tutorial session.   

![Help Tutorial](./png/HelpTutorial.png "Help Tutorial")   

&nbsp;

![Select Spring Tutorial](./png/SelectSpringTutor.png "[Select Spring Tutorial")   


Demo sessions illustrate problem solving techniques as well as provide
sample solutions to several generally available reference book problems.
Use the <b>Help : Demo...</b> menu item to select the desired demo session.

&nbsp;


**Spring Design Process**   
The remainder of this discussion will use examples from
the compression spring design type in order to
provide a few suggestions on how to explore the program.

Start from an existing design.

CHANGE independent variables.
For the compression spring design type, those include
  Wire\_Dia, OD_Free, Coils\_T, L\_Free, Force\_1, or Force\_2.
 Observe that recalculations happen immediately.
 
&nbsp;

 Look at Reports contained in the three report tabs.   
 ![Spring Report Tabs](./png/SpringReportTabs.png "Spring Report Tabs")   
 
&nbsp;

 Try the SEARCH command to see if it can find a "feasible" solution that
 does not violate any constraints. 
 Establish or change the value of constraint levels; 
 for example,  OD\_Free MAX, L\_Stroke MIN and/or L\_Solid MAX. 
 Repeat the  search and observe how the design is adjusted to accommodate 
 your objectives. 
 To observe how ODOP:Spring reacts to a request to achieve the impossible, 
 increase Force\_2 MIN until SEARCH can no longer find a feasible solution. 
 Move a different constraint, perhaps OD\_Free MAX or another
 constraint that shows up as violated, until SEARCH finds a feasible
 solution again.
 
 Use the FIX capability on one or more dependent variables like 
 RATE, L\_1 or L\_2. 
 Remember that a SEARCH must be performed to establish the desired
 values when you FIX a dependent variable.

 Finally, try to design a spring from scratch. 
 Use the main page entry fields to enter constraints
 associated with a hypothesized design.  Try designing the spring in a ball
 point pen, or perhaps a suspension spring for an automobile or a diesel
 locomotive.  Use the File : SAVE menu item to save the results of your work in 
 the design library.
 
 You can master the advanced features like SEEK and TRADE with the same technique. 
 Dive in and try it. 
 
 Also,  detailed example sessions using SEEK and TRADE are contained in the later
 sections of the tutorial.
 
 Once you have already saved any work that you wish to keep, you can exit the program by
 simply closing the browser tab.

 
[Help](./)

 