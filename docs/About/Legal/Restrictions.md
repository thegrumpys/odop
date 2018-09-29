## Restrictions

This section covers a few restrictions and limitations of the ODOP:Spring
program.  Please review the [Disclaimer](Disclaimer) section for 
liability limitations.

The current release of ODOP:Spring is valid only for helical coil compression,
extension and torsion springs that have the properties of uniform pitch,
cylindrical shape, & round wire.  The design equations consider only static
and cyclic applications.  Do not apply the program to designs where spring
dynamics ("surge" effects) are important.

Compression spring stress values produced by the REPORT 2 feature include a
stress correction factor (Kw2) that is appropriate for use after set
removal.  Otherwise, the current release of ODOP:Spring does not take into
consideration any kind of pre-stressing or "set-removal" operations.

The current release of ODOP:Spring does not take into consideration any
effects of stress relaxation or creep.  Do not apply the program to designs
that are sensitive to reduction of load capacity over time, and/or operate
at high temperatures and high stress.
   
Accurate material property information is extremely important for
satisfactory results.  The material property values supplied with ODOP:Spring
are approximate and are not suitable for a high precision design
application, or one with a small factor of safety.  Consider these values
to be a starting point at best.  The material property tables are intended
for modification by the user so that values appropriate to available
materials and applications can be included.

The current release of ODOP:Spring does not take manufacturing tolerances
into consideration.  All values are "nominal" and should be taken to
represent the average of a statistically large number of samples.  When
dealing with design specifications that place a specific limit on a
value such as outside diameter, inside diameter, solid height, etc.,
the user is expected to offset the value entered as a constraint level by
the anticipated manufacturing tolerance.
   
The standard size tables supplied with the current release of ODOP:Spring do
not represent the product offerings of any single manufacturer.  These
tables are samples, intended for modification by the end user to represent
the material size spectrum locally available.  Please review the operation
of the SELECT SIZE menu entry for a better understanding of how to use these
tables.

The spring catalogs supplied with the current release of ODOP:Spring are
intended for demonstration purposes only.  They do not necessarily
represent the current offering of any single manufacturer.
   
[About](../)
