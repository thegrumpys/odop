#### Getting Started   

**Under Construction**
This page is still a work in progress !

**Getting Started**   
 Getting started with any computer program, ODOP included, 
 is usually a matter of ...  Try it.  You'll like it !   
 
 Dive in and bash away at the program. 
 It's not possible to break anything and a little experimentation
 usually goes a long way.  In the worst case, you'll come away from the
 experience with a little more motivation to read more of the on-line documentation.

As noted in the [introduction](../About/intro), OPOP currently offers three
design types to work with: Piston-Cylinder, Rectangular Solid and Compression Spring. 
If you are interested in learning about capabilities and concepts,
the Rectangular Solid design type is intended as an easy to understand 
demonstration problem and is a good place to start.


**Launching the program**   

While it is possible to use the ODOP software from a mobile device,
establishing initial impressions with a full size monitor, keyboard and mouse
is recommended.
When first launching the program, 
you will be presented with the opportunity to select a design type.
Within each design type, you will have the opportunity to select an existing design.
Each design type will have a default design with the name "startup".

This screen capture illustrates selecting the Solid design type 
and its default design called startup.   
[Start with Rectangular Solid](./png/SelectSolid.png)

It should be possible to operate with this material in one
browser tab while the ODOP main page is in another browser tab.
So, if you haven't started ODOP already, 
open a new browser tab and follow this link:   
[Demonstration version of ODOP](https://odop.herokuapp.com/)


**A Quick Tour of the Main Page**

Have a look at the main menu (**File &nbsp; Action &nbsp; View &nbsp; Help**) 
highlighted inside the red oval.
Select one of the main menu entries and a drop-down with sub-items will appear.   
* [The Menus](./png/MainMenu.png)   

Here is an example of how each main menu item will drop down to provide 
specific menu items.
Note that menu entries associated with not yet implemented features are disabled (grey).
This screen clip illustrates how to get to the index of Help pages.   
* [Help Index](./png/HelpIndex.png)   

At the upper right of the main page you see a "tab" with the name "Design:",
an icon associated with the design type (a rectangular box in this case) and
the name of the specific design that is currently open.
As illustrated below, Spring designs will each have 
three additional tabs providing Reports.
* [Tab Icon Name](./png/TabIconName.png)   

The Result section is positioned near the top of the main page.
This area provides feedback about the solution process.
If you hover the cursor over a heading, a tool-tip will pop up to
provide more information regarding each item.
* [Result Section](./png/ResultSection.png)   

There are numeric entry fields for each of the variables.
The user can change the value of Independent Variables by positioning
the cursor in the field and over-writing the existing value.
Recalculation will happen immediately.
The Dependent Variables abd Objective Function will immediately
reflect the result of the new value for that Independent Variable.
* [Independent Variables](./png/Independent.png)   

In order change the value of a Dependent Variable, it is necessary
to FIX (see below) its value and then execute the Search function
(menu Action : Search).
* [Dependent Variables](./png/Dependent.png)   

Calculation Inputs are quantities that can be modified by the user
but are not subject to Constraints, FIX or manipulation by the Search process.
* [Calculation Inputs](./png/CalcInput.png)   

This clip illustrates how a Calculation Input can expand into a table 
that the user can select from.
In this case, the user selects a material and the appropriate value of
density is provided to the calculations.
* [CalcInputTable](./png/CalcInputTable.png)   

Constraints are single sided (MAX or MIN) limits imposed on the 
selected Variable. 
First, mark the checkbox and then enter a value in the entry field.
The amount of constraint violation will be immediate recalculated;
a positive value if violated or a negative value if satisfied.
The value of the Objective Function will immediately reflect the 
impact of a violated constraint.
This example illustrates the 108 inch limit on Length+Girth
and the 70 pound limit on weight.
* [Constraint](./png/Constraint.png)   

In order to FIX the value of an Independent Variable, put a check
in the box immediately to the right of its value.
Note the checkboxes highlighted by the red oval in  this example.
* [IV_Fix](./png/IV_Fix.png)   

In order to FIX the value of a Dependent Variable, put a check 
in the box immediately to the right of its value.
This will cause both associated constraints to be check and the 
corresponding constraint entry fields to become available for input.
Enter the FIX value into either entry field.
Thus, the FIX of a Dependent Variable is effectively a double-sided constraint.
* [DV_Fix](./png/DV_Fix.png)   


**USING HELP**   

 A good place to go from here is to get a good look at what is available 
 in the on-line documentation. 
 The various entries that are available after selecting the Help : Index menu item
 cover the generic features and capabilities of the ODOP software.
 If time is available, work through those entries from top to bottom.
 
 On-line documentation for ODOP:Spring appears in the Available Design Types section.


**USING THE TUTORIAL AND DEMO FACILITY**   

 The tutorial is designed to introduce new users to ODOP:Spring commands and concepts. 
 It is recommended for new users as the most effective and
 organized way of learning the program.  
 
Go to the Help : Tutorial menu item and select a tutorial session to work with.

Tutorial sessions are fairly brief.
The user is not required to do anything more complicated than
read and hit the Next button.
Each tutorial session covers a specific operation or capability of the software.
It is possible to stop a tutorial / demo session at any point.

Demo sessions generally provide solutions to widely available spring
design examples and sample problems.
The focus is on solving the problem, not explaining the operation of the software.


**Spring Design Process**
The remainder of this discussion will use examples from
the compression spring design type.

Start from an existing design.

CHANGE independent variables.
For the compression spring design type, those include
  Wire\_Dia, OD_Free, Coils\_T, L\_Free, Force\_1, or Force\_2.
 Observe that recalculations happen immediately.
 
 Look at Reports contained in the three report tabs.
 * [Spring Report Tabs](./png/SpringReportTabs.png)   
 
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