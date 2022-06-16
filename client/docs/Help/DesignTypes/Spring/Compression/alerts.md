# Compression Spring Alerts &nbsp; 

Alerts specific to compression springs. 

### On this page:   
 - [L_Free < L_Solid](alerts.html#L_Free_LT_L_Solid)  
 - [L_2 < L_solid](alerts.html#L_2_LT_L_Solid)  
 - [Force_2 < Force_1](alerts.html#F1_GE_F2)  
 - [FS_Solid < 1.0](alerts.html#FS_Solid_LT_1)  
 - [%_Avail_Deflect @ 2 > 80%](alerts.html#PC_Avail_Deflect2_GT_80)  
 - [%_Avail_Deflect @ 1 < 20%](alerts.html#PC_Avail_Deflect1_LT_20)  
 - [Buckling concern](alerts.html#buckling)  

___

<a id="L_Free_LT_L_Solid"></a>  
___

## L_Free < L_Solid 
In a compression spring, 
having free length (L_Free) specified as less than the solid height (L_Solid) is an impossible condition. 
In order to assure that
ODOP : Spring's Search feature will not encounter numeric difficulty when starting from such a physically unrealistic situation, 
where practical, change these values in the direction specified. 
Increase | &nbsp; | Decrease  
--- | --- | ---  
 L_Free | &nbsp; | Wire_Dia  
 &nbsp; | &nbsp; | Coils_T

See also: 
 - [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png)
 - [Compression Spring Constraints](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)   
 - [Errors](errors.html)   

___

<a id="L_2_LT_L_Solid"></a>  
___

## L_2 < L_Solid 
In a compression spring, 
having the length associated with the second operating load (L_2) as less than the solid height (L_Solid) 
is an impossible condition. 
In order to assure that
ODOP : Spring's Search feature will not encounter numeric difficulty when starting from such a physically unrealistic situation, 
where practical, change these values in the direction specified. 
Increase | &nbsp; | Decrease  
---     | ---    | ---  
 L_Free | &nbsp; | Coils_T  
 &nbsp; | &nbsp; | Coil_Dia  
 &nbsp; | &nbsp; | Force_2

Compression spring lengths are ordered from the largest (L_Free) to L_1 to L_2 to the smallest (L_Solid). 
The [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png) provides more detail on this point. 

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)   
 - [Errors](errors.html)   

___

<a id="F1_GE_F2"></a>  
___

## Force_1 >= Force_2 
The force at operating point 1 (Force_1) is greater than or equal to the force at operating point 2 (Force_2). 

Compression spring forces are ordered from the smallest (free condition) to Force_1 to Force_2 to the largest (Force_Solid). 
The [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png) provides more detail on this point. 

Resolve this alert by reducing the value of Force_1 below the value of Force_2. 
It should also be possible to 
confirm that Force_1 is in Free status, 
confirm that the constraint L_Stroke MIN is enabled with a non-zero constraint level 
and then use the Search feature. 

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/Spring/Compression/description.html#c_springConstraints)   
 - [Errors](/docs/Help/errors.html)   

___

<a id="FS_Solid_LT_1"></a>  
___

##  FS_Solid < 1.0 
This spring may be over-stressed if deflected to solid.
It may 'set' as in not return to its original free length.

In order to resolve this alert, 
where practical, change these values in the direction specified. 
Increase  | &nbsp; | Decrease  
---       | ---    | ---  
 Coils_T  | &nbsp; | L_Free  
 Coil_Dia | &nbsp; | &nbsp;  

In order to design a spring that is not over-stressed when deflected to the solid condition, 
enable the FS_Solid MAX constraint, 
set that MAX constraint to a value slightly above 1.0 
and run the Search feature. 

___

<a id="PC_Avail_Deflect2_GT_80"></a>  
___

## %_Avail_Deflect @ 2 > 80% 
Coil to coil contact may cause inaccuracy in operating point 2.  

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force and deflection. 
Howevever, in the real world there are limitations. 

When compression springs are compressed beyond roughly 80% of available deflection 
any lack of perfect uniformity in coil pitch will become a factor in the real (as opposed to theoretical) force-deflection relationship. 
Coil to coil contact will produce an increase in spring rate that continues to increase 
with additional deflection until the solid condition is reached.
Thus when operating beyond 80% of the available deflection expect forces to be somewhat higher (or deflections to be somewhat lower)
than the linear behavior predicted by the equations.  

 See also: 
  - [Restrictions](/docs/About/Legal/Restrictions.html)  
  - [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)  

___

<a id="PC_Avail_Deflect1_LT_20"></a>  
___

## %_Avail_Deflect @ 1 < 20% 
End effects may cause inaccuracy in operating point 1.  

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force and deflection. 
Howevever, in the real world there are limitations. 

When compression springs are compressed less than roughly 20% of available deflection 
any lack of perfection in the ends will become a factor in the real (as opposed to theoretical) force-deflection relationship. 
For example, ends that are ground imperfectly perpendicular with the coil axis will decrease the apparent spring rate 
in a way that that diminishes with additional deflection until the ends are fully seated. 
Thus when operating within the first 20% of the available deflection expect forces to be somewhat lower (or deflections to be somewhat greater)
than the linear behavior predicted by the equations.  

 See also: 
  - [Restrictions](/docs/About/Legal/Restrictions.html)  
  - [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)  

___

<a id="buckling"></a>  
___

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
and run the Search feature. 

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


