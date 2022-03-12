#### Design Situations   

At the time that a design problem is initially formed by establishing Fixes and constraints,
the high level situation will likely be one of three cases:
  - under-specified
  - properly-specified  (well formed)
  - over-specified
  
Under-specified situations have too few constraints. 
There is nothing that prevents Seek from producing a trivial result.
A Seek operation on an under-specified situation will likely result in an extremely poor ("degenerate") design.
For example, **Seek Min Weight** could produce a design with close to zero dimensions.
Well, probably not what you wanted but at least it has very low weight !

Over-specified situations have fixes and constraints that are mutually exclusive, allowing no solution.
See below for examples.
A Search operation on an over-specified situation will almost certainly produce a Feasibility result 
that is "NOT FEASIBLE".
It is also possible for a properly-specified situation with ambitious goals to produce a 
"NOT FEASIBLE" search result. 
Unfortunately, without a careful analysis plus good understanding of the equations and values involved,
it will be difficult to distinguish the difference between these two cases.

Properly-specified situations without overly ambitious goals may provide a "feasible region" 
where a range of variable values do not violate constraints.
In this case, a Search will terminate when it finds the first feasible result.
A Seek is necessary to find a design that is "best" ... 
specifically, the min or max of one of the design variables.

Note that the ODOP default designs, a.k.a. Startup and initialState, are under-specified.
Depending on the selection of the variable to minimize or maximize, 
these designs require the user to add additional constraints 
in order to produce a useful result with Seek.

&nbsp;

**Examples**

In the Rectangular Solid design type that provides a simple demonstration case, 
an over-specified situation can be created by establishing a minimum constraint on Volume
while there is also a maximum constraint on Weight.
Weight and Volume are directly linked by the material Density, 
a Calculation Input that is not available for Search to adjust.
Thus, depending on the values, 
finding a feasible solution may be impossible.

Coil spring design offers many such opportunities to over-specify a design situation.
Some of these are a consequence of 
[Hooke's Law](https://en.wikipedia.org/wiki/Hooke%27s_law) 
which says that the force-deflection relationship of coil springs is linear. 

 - This discussion applies to helical coil compression, extension and torsion springs 
that have the properties of uniform pitch and cylindrical shape with loading along the coil axis 
and ignores deviation from linearity caused by real-world issues such as 
tolerances and small geometric imperfections. 

For compression and torsion springs, 
by definition of the term "deflection", there is a requirement of zero force at zero deflection. 
For compression and torsion springs, 
the zero force at zero deflection point has to fall on the line 
describing the 
[relationship between force and deflection](/docs/Help/png/ForceVsDeflection.png).

ODOP:Spring allows the user to specify force and deflection at two load points. 
For compression and torsion springs, 
If the line defined by those two points does not pass through zero force at zero deflection, 
the Search process (<b>Action : Search</b> menu item) will likely determine the result is "NOT FEASIBLE".
In summary, this is the same situation as attempting to specify a straight line with more than two points. 
The Search feature can produce a feasible design only if all the points are on the same straight line.

For extension springs, the potential to vary initial tension (within limits) may allow the user
some flexibility in specifying force and deflection at two load points.

For compression springs, 
as long as L_Free (free length) is not FIXed or constrained, 
there is flexibility in specifying force and <b>length</b> at two load points. 
The solution reaches feasibility by finding an appropriate value for L_Free.  

<!---  begin comment
More examples are pending a future update to this file.
In the mean time ...   
end comment  --->
  
See also:   
  - [Feasibility](feasibility.html)   
  - [Terminology](terminology.html)   
  
&nbsp;
 
In getSizeEntries [Help](/docs/Help)
  