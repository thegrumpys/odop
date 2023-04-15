# Compression Spring Alerts &nbsp; 

Alerts specific to compression springs. 

### On this page:   
 - [Force_1 > Force_2](alerts.html#F1_GT_F2)  
 - [Excess Force](alerts.html#Excess_Force)  
 - [L_Free < L_Solid](alerts.html#L_Free_LT_L_Solid)  
 - [L_2 < L_solid](alerts.html#L_2_LT_L_Solid)  
 - [FS_Solid < 1.0](alerts.html#FS_Solid_LT_1)  
 - [Default constraint not enabled](alerts.html#C_DefaultConstraint)  
 - [%_Avail_Deflect @ 2 > 80%](alerts.html#PC_Avail_Deflect2_GT_80)  
 - [%_Avail_Deflect @ 1 < 20%](alerts.html#PC_Avail_Deflect1_LT_20)  
 - [Buckling concern](alerts.html#buckling)  

___

<a id="F1_GT_F2"></a>  
___

Alert entry #C101
## Force_1 > Force_2 
The force (applied load) at operating point 1 (Force_1) is greater than the force at operating point 2 (Force_2). 

Compression spring forces are ordered from the smallest (free condition) to Force_1 to Force_2 to the largest (Force_Solid). 
The [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png) provides more detail on this point. 

Resolve this alert by reducing the value of Force_1 below the value of Force_2. 

It should also be possible to 
confirm that Force_1 is in Free status, 
confirm that the constraint L_Stroke MIN is enabled with a greater-than-zero constraint level 
and then use the Search feature (menu Action : Search or Search button). 

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)   
 - [Errors](/docs/Help/errors.html)   

___

<a id="Excess_Force"></a>  
___

Alert entry #C102
## Excess Force 
The value of force specified at the second load point (Force_2) exceeds the amount of force necessary to drive the spring 
to its solid condition (Force_Solid). 

To resolve this alert, where practical, change these values in the direction specified. 
Increase | &nbsp; | Decrease  
---      | ---    | ---  
Wire_Dia | &nbsp; | Force_2  
 L_Free  | &nbsp; | Coils_T  
 FS_2 MAX<sup>*</sup>| &nbsp; | OD_Free  
 
Depending on the Fixes and constraints on lengths and deflections associated with the second operating point, 
it should also be possible to confirm that Force_2 is in Free status, 
and then use the Search feature (menu Action : Search or Search button). 

<sup>*</sup> There are circumstances where running a search can produce this alert.
Specifically, if all the physical dimensions (OD_Free, Wire_Dia, L_Free & Coils_T) of a 
conservative (heavy, low stress) design are in Fixed status, 
in order to attempt to satisfy the default maximum constraint on factor of safety at operating point 2 (FS_2 MAX), 
the search process may select a value of Force_2 that is larger than the force required to achieve 
the solid condition and thus trigger this alert. 
If a heavy, low stress design is truly desired, this alert can be resolved by increasing the FS_2 MAX constraint level
and then running search again.

___

<a id="L_Free_LT_L_Solid"></a>  
___

Alert entry #C103
## L_Free < L_Solid 
In a compression spring, 
having free length (L_Free) specified as less than the solid height (L_Solid) is an impossible condition. 

Where practical, change these values in the direction specified. 
Increase | &nbsp; | Decrease  
---      | ---    | ---  
 L_Free  | &nbsp; | Wire_Dia  
 &nbsp;  | &nbsp; | Coils_T

It may also possible to use Search (menu Action : Search or Search button) to clear this alert. 
If not immediately successful, confirm that Wire_Dia is in Free status and try Search again. 

See also: 
 - [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png)
 - [Compression Spring Constraints](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)   
 - [Errors](/docs/Help/errors.html)   

___

<a id="L_2_LT_L_Solid"></a>  
___

Alert entry #C104
## L_2 < L_Solid 
In a compression spring, 
having the length associated with the second operating load (L_2) as less than the solid height (L_Solid) 
is an impossible condition. 

Where practical, change these values in the direction specified. 
Increase  | &nbsp; | Decrease  
---       | ---    | ---  
 L_Free   | &nbsp; | Coils_T  
 Wire_Dia | &nbsp; | OD_Free  
 &nbsp;   | &nbsp; | Force_2

It may also possible to use Search (menu Action : Search or Search button) to clear this alert. 
If not immediately successful, confirm that Wire_Dia is in Free status and try Search again. 

Compression spring lengths are ordered from the largest (L_Free) to L_1 to L_2 to the smallest (L_Solid). 
The [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png) provides more detail on this point. 

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)   
 - [Errors](/docs/Help/errors.html)   

___

<a id="FS_Solid_LT_1"></a>  
___

Alert entry #C105
##  FS_Solid < 1.0 
The factor of safety when compressed to solid is less than 1.0.

This design may be over-stressed if deflected to solid. 
If deflected to solid, 
it may yield or "take a set" as in not return to its original free length. 

The current release of the ODOP:Spring app does not support the design of compression springs intended for "pre-set". 
Springs intended for pre-set are wound with a free length that is somewhat longer than intended. 
A secondary operation deflects the spring into a solid condition where it will yield, taking a permanent "set", 
just enough to achieve the desired final free length. 
This operation creates favorable stresses within the cross-section of the spring wire, 
improving performance of the spring at the cost of the pre-set operation. 

In order to resolve this alert, 
where practical, change these values in the direction specified. 
Increase  | &nbsp; | Decrease  
---       | ---    | ---  
 OD_Free  | &nbsp; | L_Free  
 Coils_T  | &nbsp; | Wire_Dia  

In order to design a spring that is not over-stressed when deflected to the solid condition: 
 - confirm that the design is not over specified.  For this case, at least one of OD_Free, Wire_Dia, L_Free, and Coils_T must be in Free status and away from binding constraints. 
 - confirm that the lower constraint on factor of safety in the solid condition (FS_Solid MIN) is enabled (it is enabled by default) 
 - set that FS_Solid MIN constraint to a value slightly above 1.0 (perhaps 1.1; the default is 1.0) 
 - run the Search feature (menu **Action : Search** or Search button). 

See also: 
 - [Factor of Safety](/docs/Help/terminology.html#FactorOfSafety)  
 - [Yield](https://en.wikipedia.org/wiki/Yield_(engineering))  
 
___

<a id="C_DefaultConstraint"></a>  
___

Alert entry #C106
## Default constraint not enabled 
  
Disabling default constraints is not recommended.  

This alert is produced when constraints enabled by default are disabled. 
Also, this alert can be produced for designs created and saved with older versions of the software. 
Specifically, constraints on Spring_Index previously were not enabled by default. 
If this alert is associated with Spring_Index on an older design, it may be ignored. 
Better yet, clear the alert by enabling MIN and MAX constraints on Spring_Index. 

The default constraints guide Search to "good" spring designs. 
The Seek and Trade features utilize Search internally and thus those results are also
guided by the default constraints. 

For example: 
 - A lower constraint on deflection at the first operating point (Deflect_1) 
prevents Search from generating negative values for force and deflection at point 1. 
 - Constraints on Spring_Index insure that designs produced by the software are within the range of manufacturability.
 Consult your manufacturer regarding capabilities and costs. 
 - disabling the lower (MIN) constraint on factor of safety at solid (FS_Solid MIN) 
allows Search to return a design that would "set" (not return to the original free length if fully deflected) 
and declare it as "feasible". 
 - disabling the upper (MAX) constraint on percent available deflection at operating load point 2 (%_Avail_Deflect) 
allows Search to return a design that would deflect all the way to solid under the second operating load (Force_2) 
and declare it as "feasible". 

If a design that achieves its second operating load (Force_2) near or at the solid condition is desired, 
change the value of the FS_2 MIN constraint to be 1.0 and the value of the 
%_Avail_Deflect MAX constraint to be 100. 

In summary, while it may be reasonable to adjust the constraint values of a default constraint, 
disabling a default constraint entirely is not recommended. 

___

<a id="PC_Avail_Deflect2_GT_80"></a>  
___

Alert entry #C107
## %_Avail_Deflect @ 2 > 80% 
Coil to coil contact may cause inaccuracy in operating point 2. 

**Even if the application requires that this design operate outside the range of 20% to 80% of
available deflection, the inspection (acceptance) criteria should be specified within this range.** 

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force and deflection. 
However, in the real world there are limitations. 

When compression springs are compressed beyond roughly 80% of available deflection, 
geometric imperfections such as a lack uniformity in coil pitch, minor deviation from cylindrical shape 
or failure of the ends to be precisely perpendicular to the coil axis 
become a factor in the real (as opposed to theoretical) force-deflection relationship. 
Beyond the 80% point, coil to coil contact will produce an increase in spring rate that continues to increase 
with additional deflection until the solid condition is reached. 
Thus, when operating beyond 80% of the available deflection, 
expect forces to be somewhat higher (or deflections to be somewhat lower) 
than the linear behavior predicted by the equations. 

 See also: 
  - [Restrictions](/docs/About/Legal/Restrictions.html)  
  - [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)  

___

<a id="PC_Avail_Deflect1_LT_20"></a>  
___

Alert entry #C108
## %_Avail_Deflect @ 1 < 20% 
End effects may cause inaccuracy in operating point 1.  

**Even if the application requires that this design operate outside the range of 20% to 80% of
available deflection, the inspection (acceptance) criteria should be specified within this range.** 

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force and deflection. 
However, in the real world there are limitations. 

When compression springs are compressed less than roughly 20% of available deflection 
geometric imperfections such as minor deviation from cylindrical shape 
or failure of the ends to be precisely perpendicular to the coil axis 
become a factor in the real (as opposed to theoretical) force-deflection relationship. 
For example, ends that are ground imperfectly perpendicular with the coil axis will decrease the apparent spring rate 
in a way that that diminishes with additional deflection until the ends are fully seated. 
Thus, when operating within the first 20% of the available deflection expect forces to be somewhat lower (or deflections to be somewhat greater)
than the linear behavior predicted by the equations.  

 See also: 
  - [Restrictions](/docs/About/Legal/Restrictions.html)  
  - [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)  

___

<a id="buckling"></a>  
___

Alert entry #C109
## Buckling concern 
A spring of these dimensions and loading has a tendency to buckle. 

Operation in a hole (tube) or over a post (rod) may resist the buckling. 
Friction may reduce the spring force. 
Cyclic applications may need lubrication. 

The spring end conditions influence buckling tendency. 
Freedom to rotate on one or both ends will increase the tendency to buckle.
Fixed ends reduce the tendency to buckle.

Increase OD_Free or reduce L_Free in order to reduce the tendency to buckle. 

In order to design a spring that does not have a tendency to buckle, 
enable the Slenderness MAX constraint, 
set that MAX constraint to a value close to 4.0 
and run the Search feature (menu Action : Search or Search button). 

___

<a id="padding"></a>  
___

##  
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   
  
  &nbsp;   


