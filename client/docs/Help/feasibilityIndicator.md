# Feasibility Indicator

ODOP has a multi-colored Feasibility Status Indicator that provides feedback on the 
viability of the current design relative to constraints and FIXes. 
The indicator provides at-a-glance interpretation of the [Objective Value](terminology.html#obj).
 
 Graphic | Description | Obj Value
 --- | --- | ---  
 ![StrictlyFeasible](/docs/Help/png/FI_StrictlyFeasible2.png "FI StrictlyFeasible") | STRICTLY FEASIBLE | zero    
 ![Feasible](/docs/Help/png/FI_Feasible2.png "FI Feasible") | FEASIBLE | < OBJMIN  
 ![Close To Feasible](/docs/Help/png/FI_CloseToFeasible2.png "FI Feasible") | CLOSE TO FEASIBLE | < 4x OBJMIN  
 ![Not Feasible](/docs/Help/png/FI_NotFeasible2.png "FI Feasible") | NOT FEASIBLE | > 4x OBJMIN  
 &nbsp; | &nbsp; | &nbsp; |   
 
The tool tip on the label "Status" provides the numeric values of the current Objective Value and OBJMIN: 
 
![Tool Tip](/docs/Help/png/FI_ToolTip2.png "Feasibility Indicator Tool Tip")   
   
Use the Search feature (<b>Action : Search</b> menu) to obtain the lowest Objective Value 
consistent with the FIXes and constraints imposed on the problem. 
Because Search stops if the Objective Value falls below OBJMIN, 
results in the green zone are considered "as good as feasible" or simply just "FEASIBLE".   
 
The value of OBJMIN may be adjusted on the <b>File : Preferences</b> menu.
Also, OBJMIN is one of the values set by the tweakPrefs script that is reached from the <b>Action : Execute</b> menu.
 
 