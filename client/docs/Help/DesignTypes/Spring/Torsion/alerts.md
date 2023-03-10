# Torsion Spring Alerts &nbsp; 

Alerts specific to torsion springs. 

### On this page:   
 - [M_1 > M_2](alerts.html#M1_GT_M2)  
 - [Default constraint not enabled](alerts.html#T_DefaultConstraint)  
 - [%_Safe_Deflect @ 2 > 80%](alerts.html#PC_Safe_Deflect2_GT_80)  
 - [%_Safe_Deflect @ 1 < 20%](alerts.html#PC_Safe_Deflect1_LT_20)  

___

<a id="M1_GT_M2"></a>  
___

Alert entry #T301
## M_1 > M_2 
The moment at operating point 1 (M_1) is greater than the moment at operating point 2 (M_2). 

Torsion spring moments are ordered from the smallest (free condition) to M_1 to M_2 to the largest (Max Safe). 
The [Torsion Spring Moment - Deflection Diagram](/docs/Help/DesignTypes/Spring/Torsion/description.html#t_springFD_Diag) 
provides more detail on this point. 

Resolve this alert by reducing the value of M_1 below the value of M_2. 

It should also be possible to confirm that M_1 is in Free status, 
confirm that the constraint Stroke MIN is enabled with a greater-than-zero constraint level 
and then use the Search feature (menu Action : Search or Search button). 

See also: 
<!---
Need to add content that allows this link to be uncommented and replace the stopgap below 
 - [Torsion Spring Constraints](/docs/Help/DesignTypes/Spring/Torsion/description.html#t_springConstraints)   
-->
 - [Torsion Spring](/docs/Help/DesignTypes/Spring/Torsion/description.html)   
 - [Errors](/docs/Help/errors.html)   

___

<a id="T_DefaultConstraint"></a>  
___

Alert entry #T302
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
 - Constraints on Spring_Index insure that designs produced by the software are within the range of manufacturability. 
Consult your manufacturer regarding capabilities and costs. 
 - Constraining the value of deflection at operating point 1 (Deflect_1) to be positive (greater than zero) 
prevents Search from returning designs with negative values for moment and deflection at operating point 1. 
 - Depending on the configuration of other constraints, 
disabling the upper (MAX) constraint on percent safe deflection at operating load point 2 (%_Safe_Deflect) 
might allow Search to return a design where the the second operating load (M_2) exceeds the allowable bending stress 
for a static load (Stress_Lim_Bnd_Stat) and declare it to be "feasible". 

In summary, while it may be reasonable to adjust the constraint values of a default constraint, 
disabling a default constraint entirely is not recommended. 

___

<a id="PC_Safe_Deflect2_GT_80"></a>  
___

Alert entry #T303
## %_Safe_Deflect @ 2 > 80% 
The second operating point (point 2) has more than 80% of maximum safe deflection. 
There may be some inaccuracy in moments and deflections for this point. 

**Even if the application requires that this design operate outside the range of 20% to 80% of
available deflection, the inspection (acceptance) criteria should be specified within this range.** 

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force (moment) and deflection. 
However, in the real world there are limitations. 

When torsion springs are deflected beyond roughly 80% of safe deflection 
geometric imperfections such as 
a lack uniformity in coil pitch, 
minor deviation from cylindrical shape 
and deflection in the ends 
become factors in the real (as opposed to theoretical) moment-deflection relationship. 
Coil to coil contact will produce an increase in spring rate that continues to increase 
with additional deflection until the maximum safe operating condition is reached. 
Thus, when operating beyond 80% of the safe deflection, expect moments to be somewhat higher 
(or deflections to be somewhat lower) 
than the linear behavior predicted by the equations. 

Specifying a small value for Coil_Spacing (available on Advanced View) can serve to reduce the
influence of coil to coil contact.

 See also: 
  - [Restrictions](/docs/About/Legal/Restrictions.html)  
  - [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)  

___

<a id="PC_Safe_Deflect1_LT_20"></a>  
___

Alert entry #T304
## %_Safe_Deflect @ 1 < 20% 

The first operating point (point 1) has less than 20% of maximum safe deflection. 
There may be some some inaccuracy in moment and deflection for this point.  

**Even if the application requires that this design operate outside the range of 20% to 80% of
available deflection, the inspection (acceptance) criteria should be specified within this range.** 

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force and deflection. 
However, in the real world there are limitations. 

When torsion springs are deflected less than roughly 20% of maximum safe deflection, 
various factors such as deviation from perfect coil straightness (cylindrical form) and deflection in the ends 
will become a factor in the real (as opposed to theoretical) force-deflection relationship. 
Thus when operating within the first 20% of the available deflection expect moments to be somewhat lower 
(or deflections to be somewhat greater) than the linear behavior predicted by the equations.  

 See also: 
  - [Restrictions](/docs/About/Legal/Restrictions.html)  
  - [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)  

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

 