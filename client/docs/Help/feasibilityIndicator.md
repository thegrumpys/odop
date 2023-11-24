# Feasibility Indicator

ODOP has a multi-colored Feasibility Status Indicator that provides feedback on the 
viability of the current design relative to constraints and FIXes. 
The indicator provides an at-a-glance interpretation of the [Objective Value](terminology.html#obj).
 
 Graphic | Description | Obj Value
 --- | --- | ---  
 ![StrictlyFeasible](/docs/Help/img/FI_StrictlyFeasible2.png "FI StrictlyFeasible") | STRICTLY FEASIBLE | zero    
 ![Feasible](/docs/Help/img/FI_Feasible2.png "FI Feasible") | FEASIBLE | < OBJMIN  
 ![Close To Feasible](/docs/Help/img/FI_CloseToFeasible2.png "FI Close To Feasible") | CLOSE TO FEASIBLE | < 4x OBJMIN  
 ![Not Feasible](/docs/Help/img/FI_NotFeasible2.png "FI Not Feasible") | NOT FEASIBLE | > 4x OBJMIN  
 ![Feasibility Undefined](/docs/Help/img/FI_FeasibleUndefined2.png "FI Undefined") | FEASIBILITY UNDEFINED | Infinity  
 &nbsp; | &nbsp; | &nbsp; |   
 
The tool tip on the blue triangle indicator provides the numeric values of the current Objective Value:  
![Indicator ToolTip](/docs/Help/img/FI_IndicatorToolTip2.png "Feasibility Indicator ToolTip")   
 
The tool tip on the info icon to the right of the "Search" button provides the numeric 
value of OBJMIN in addition to the current Objective Value:  
![Search Button Info Icon ToolTip](/docs/Help/img/SearchToolTip2.png "Search Button Info Icon ToolTip")   
   
Use the Search (solve) feature (Search (solve) button or <b>Action : Search (solve)</b> menu) to find a solution. 
Specifically, to obtain the lowest Objective Value possible consistent with the FIXes and constraints imposed on the problem. 
Because Search stops if the Objective Value falls below OBJMIN, 
results in the green zone are considered "as good as feasible" or simply just "FEASIBLE".  
 
The value of OBJMIN may be adjusted on the <b>File : Preferences</b> menu. 
Also, OBJMIN is one of the values set by the increasePrecision script that is available from the <b>Action : Execute</b> menu. 
 