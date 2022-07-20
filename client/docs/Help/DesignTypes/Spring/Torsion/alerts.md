# Torsion Spring Alerts &nbsp; 

Alerts specific to torsion springs. 

### On this page:   
 - [M_1 >= M_2](alerts.html#M1_GE_M2)  
 - [%_Safe_Deflect @ 2 > 80%](alerts.html#PC_Safe_Deflect2_GT_80)  
 - [%_Safe_Deflect @ 1 < 20%](alerts.html#PC_Safe_Deflect1_LT_20)  

___

<a id="M1_GE_M2"></a>  
___

Alert entry #T301
## M_1 >= M_2 
The moment at operating point 1 (M_1) is greater than or equal to the moment at operating point 2 (M_2). 

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

<a id="PC_Safe_Deflect2_GT_80"></a>  
___

Alert entry #T302
## %_Safe_Deflect @ 2 > 80% 
The second operating point (point 2) has more than 80% of maximum safe deflection. 
While this is not usually a problem, 
be aware that coil to coil contact may cause some inaccuracy in moments and deflections for this point.  

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force and deflection. 
Howevever, in the real world there are limitations. 

When torsion springs are compressed beyond roughly 80% of safe deflection 
geometric imperfections such as a lack uniformity in coil pitch or minor deviation from cylindric shape 
become a factor in the real (as opposed to theoretical) force-deflection relationship. 
Coil to coil contact will produce an increase in spring rate that continues to increase 
with additional deflection until the maximum safe operating condition is reached. 
Thus, when operating beyond 80% of the safe deflection expect forces to be somewhat higher 
(or deflections to be somewhat lower) 
than the linear behavior predicted by the equations. 

 See also: 
  - [Restrictions](/docs/About/Legal/Restrictions.html)  
  - [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)  

___

<a id="PC_Safe_Deflect1_LT_20"></a>  
___

Alert entry #T303
## %_Safe_Deflect @ 1 < 20% 

The first operating point (point 1) has less than 20% of maximum safe deflection. 
This is not usually a problem. 
However, you should be aware that end effects may cause some inaccuracy in moments and deflections for this point.  

Helical coil compression, extension and torsion springs that have the properties of uniform pitch and cylindrical shape 
follow Hooke's Law in that they provide a nominally linear relationship between force and deflection. 
Howevever, in the real world there are limitations. 

When torsion springs are deflected less than roughly 20% of maximum safe deflection, 
various factors such as deviation from perfect coil straightness (cylindric form) and deflection in the ends 
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

 