#### Units: US (ips) and metric (SI)

ODOP:Spring supports both US customary (inch - pound - second) units and metric (SI) units.
Standard wire diameter size tables are available (and used automatically) for both unit systems.

In order to create spring designs with a specific unit system, it is necessary to open 
 (**File : Open** menu item) a design entry that has been pre-configured for that unit system.

Each ODOP design type will always have a default design starting point (named "Startup") available.
Each spring design type (compression, extension & torsion) should also have two additional design
entries available: 
* Startup_US-ips
* Startup_Metric

By default, the design named "Startup" will be identical to the design named "Startup_US-ips".
In order to create a design utilizing metric units, simply open the "Startup_Metric" entry.
Save the changed design (**File : Save As** menu item) with a different name so as to preserve access to 
the original system provided entry. 
Saving on top of a system provided startup design will customize the default.
If that customized design is later deleted, the system provided design will again be available.   

&nbsp;
  
[Spring Design Topics](./)   
[Help](../)   
