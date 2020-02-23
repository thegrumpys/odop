## Restrictions

This section covers a few restrictions and limitations of the 
**O**pen **D**esign **O**ptimization **P**latform software 
and the ODOP:Spring app. 
Please review the [Disclaimer](Disclaimer) section for liability limitations.

The current release of ODOP:Spring is valid only for helical coil compression,
extension and torsion springs that have the properties of uniform pitch,
cylindrical shape, & round wire. 
The design equations consider only static and cyclic applications. 
Do not apply the program to designs where spring dynamics 
("surge" effects) are important.
Compression and extension spring loading is assumed to be along the
coil axis.   

The current release of ODOP:Spring does not take into consideration any
effects of stress relaxation or creep.  Do not apply the program to designs
that are sensitive to reduction of load capacity over time, and/or operate
at high temperatures and high stress.
   
Compression spring stress values produced by the REPORT 2 feature include a
stress correction factor (Kw2) that is appropriate for use after set removal. 
Otherwise, the current release of ODOP:Spring does not take into
consideration any kind of pre-stressing or "set-removal" operations.   

Accurate material property information is extremely important for
satisfactory results.  The material property values supplied with ODOP:Spring
are approximate and may not be suitable for a high precision design
application, or one with a small factor of safety. 
Consider these values to be a starting point subject to additional validation. 
The software is designed such that material property values used in the 
calculations may be modified by the user and thus values appropriate to 
available materials and applications can be utilized.

The current release of ODOP:Spring does not take manufacturing tolerances
into consideration.  All values are "nominal" and should be taken to
represent the average of a statistically large number of samples.  When
dealing with design specifications that place a specific limit on a
value such as outside diameter, inside diameter, solid height, etc.,
the user is expected to offset the value entered as a constraint level by
the anticipated manufacturing tolerance.
   
Unless marked otherwise, 
the standard size tables supplied with the current release of ODOP:Spring 
do not represent the product offerings of any single manufacturer. 
These tables are samples intended to illustrate software capabilities.
Please review the operation of the SELECT SIZE menu entry for a better 
understanding of how to use these tables.

Unless marked otherwise, 
the spring catalogs supplied with the current release of ODOP:Spring are
intended for demonstration purposes only. 
The supplied catalogs do not necessarily represent the current offering of 
any single manufacturer.  

Designs saved in the public account are subject to removal one week after 
the most recent update to the design.
Notice of impending cleanup of designs saved in the public account will be posted
at [Message of the Day](../messageOfTheDay).
Clean up activity will likely occur just prior to new releases of the
ODOP software and the ODOP:Spring app.
While designs saved in private accounts will be preserved and version migrated
on a best effort basis,
it should be understood that this data can't be maintained literally forever.
To the extent possible, 
private account holders will be notified by email prior to any account closure
or other impact to saved designs.
   
&nbsp;
   
[About](../)

