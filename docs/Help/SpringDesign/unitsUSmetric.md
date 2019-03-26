#### Units: US (ips) and metric (SI)

ODOP:Spring supports both US customary (inch - pound - second) units and metric (SI) units.
Standard wire diameter size tables are available (and used automatically) for both unit systems.

In order to create spring designs with a specific unit system, it is necessary to open 
 (**File : Open** menu item) a design entry that has been pre-configured for that unit system.

Each ODOP design type will always have a default design starting point (named "startup") available.
Each spring design type (compression, extension & torsion) should also have two additional design
entries available: 
* startup_US-ips
* startup_metric

By default, the design named "startup" will be identical to the design named "startup_US-ips".
In order to create a design utilizing metric units, simply open the "startup_metric" entry.
Save it (**File : Save As** menu item) with a different name so as to preserve the original 
"startup_metric" entry.

Once multi-user support is available, it will be possible for each user to customize one of the 
unit-specific designs and save it on top of the "startup" design.   

&nbsp;
  
[Spring Design Topics](./)   
[Help](../)   
