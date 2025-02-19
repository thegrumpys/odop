
## TorsionStresses - allowable stress update March 2025  

Starting with ODOP:Spring version 5.2 released in March, 2025 (torsion spring "Model Version: 11" as shown in Help : About)
default values in the internal materials table have changed to allow higher stresses in torsion springs.  

This change allows higher stresses to be considered "feasible".  
The Search feature will produce designs that are less conservative (more highly stressed) and 
as compared to previous versions, show greater cycle life and/or reduced weight.  

Design models saved in prior versions opened in the current or newer versions will show increases in factor of safety
and cycle life. 
Only torsion spring designs that rely on the internal material table (Prop_Calc_Method = 1) are affected.
It is possible that designs previously saved showing "Feasible" show "Not Feasible" when opened in newer versions because 
the FS_2 MAX constraint is violated. 
If this is a concern, simply increase the value of FS_2 MAX constraint.  For example, from a value of 1.6 to a value of 1.8.  

For additional information, please [contact customer support](/docs/About/ContactUs.html).

