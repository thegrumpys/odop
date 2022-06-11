# Extension Spring Alerts &nbsp; 

Alerts specific to extension springs. 

### On this page:   
 - [Force_1 < Initial_Tension](alerts.html#F1_LT_IT)  
 - [Stress_Initial < Stress_Init_Lo](alerts.html#SInit_LT_SInit_Lo)  
 - [Stress_Initial > Stress_Init_Hi](alerts.html#SInit_GT_SInit_Hi)  

___

<a id="F1_LT_IT"></a>  
___

## Force_1 < Initial_Tension 
In an extension spring, 
having the current value of Force_1 less than the current value of Initial_Tension 
is ambiguous.
Calculations for L_Stroke and Cycle_Life may not be valid. 

Where practical, change these values in the direction specified: 
Increase | &nbsp; | Decrease  
---      | ---    | ---  
 Force_1 | &nbsp; | Initial_Tension  
 OD_Free | &nbsp; | &nbsp;  

Alternatively, confirm that the Force_1 MIN constraint is set to the (FDCL) of Initial_Tension 
and use the Search feature (menu Action : Search or Search button). 

See also: 
 - [Terminology - Function Constraints](/docs/Help/terminology.html#fdcl)  
 - [Constraints unique to extension springs](/docs/Help/DesignTypes/Spring/Extension/description.html#e_springConstraints)  
 - [Initial tension range](/docs/Help/DesignTypes/Spring/Extension/description.html#e_springIT_Range)  
 - [Errors](/docs/Help/errors.html)   

___

<a id="SInit_LT_SInit_Lo"></a>  
___

## Stress_Initial < Stress_Init_Lo 
Details ...  
  &nbsp;   

___

<a id="SInit_GT_SInit_Hi"></a>  
___

## Stress_Initial > Stress_Init_Hi 
Details ... 
  &nbsp;   

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


 