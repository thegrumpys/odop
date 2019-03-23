####  Sub-Problems feature

The entry [Ideas for a web page menu structure](./menu) briefly introduced a possible implementation of a sub-problem capability.
This entry is intended to provide more detail.

Experience with early design optimization software revealed that users of large design problems desire the ability to
partition those large problems into multiple parts.
In this situation, partitioning is typically along the lines of physical sub-systems.
Recent discussions on how to handle multiple variations within a single problem "type" 
returned to a similar notion of "sub-problems. 
For example, with the type "Solid", variations might include cube, sphere and cylinder.
For the type "Spring", variations might include compression, extension and torsion.  

A possible implementation of IOCLASS is to associate each Design Parameter and State Variable (and Calculation Input?)
with a value which can enable or disable the display of that quantity. 
This quantity could be assigned in a **View : Define Sub-Problems** menu entry.
From there, the user could use the **View : Display Sub-Problems** menu item to 
establish a set of sub-problems (check boxes?) that they wish to have displayed.
For example, if the user checked boxes 1, 2, 5 and 7, and unchecked all the remaining checkboxes,
the system would display every Design Parameter and State Variable with an IOCLASS value of 1 or 2 or 5 or 7.
Other Design Parameter and State Variables would not be displayed.

For sub-problems that align with sub-systems of a physical system,
it is possible that the designer would want Design Parameters of hidden sub-problems to remain free
and have them calculated in the EQNSET.
For sub-problems that align with variations of a type,
it is possible that the user would want Design Parameters of hidden sub-problems to be fixed.
The distinction here is how many and which Design Parameters the search algorithm attempts to manipulate.

It seems plausible that a Calculation Input (previously, "Constant") could be used to control a 
branch table that limits which calculations get executed in the EQNSET code. 

Separately, it may be possible to use the object oriented features of JavaScript to implement sub-problems. 
Following the previous example, cube, sphere and cylinder might be instances of the class Solid.
Compression, extension and torsion might be instances of the class Spring.
The class might contain a super-set of all Design Parameters and State Variables.
The instances would each inherit a unique sub-set of those DP & SV's.

There is a point of concern in a situation where design parameters are shared across sub-problems
("length" could be shared between cube, and cylinder;
"diameter" could be shared between sphere and cylinder;
WireDiameter could be shared between all of the spring types).
In this situation, changes in the active sub-problem could potentially cause constraints in
inactive sub-problems to become binding (active).
Given that those constraints are not visible, 
it might be very difficult for the user to understand exactly what is preventing achieving a
feasible design.
 
