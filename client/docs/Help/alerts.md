# Alerts &nbsp; 

This topic provides details for each of the alerts.

### On this page:   
 - [L_Free < L_Solid](alerts.html#L_Free_LT_L_Solid)  
 - [L_2 < L_solid](alerts.html#L_2_LT_L_Solid)  
 - [PC_Avail_Deflect @ 2 > 80%](alerts.html#PC_Avail_Deflect2_GT_80)  
 - [PC_Avail_Deflect @ 1 < 20%](alerts.html#PC_Avail_Deflect1_LT_20)  
 - [FS_CycleLife MIN not set](alerts.html#FS_CycleLife_MIN_not_set)  
 - [Padding - delete before release](alerts.html#padding)  

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
 - [Compression Spring Constraints](/docs/Help/DesignTypes/c_spring.html#c_springConstraints)   
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
--- | --- | ---  
 L_Free | &nbsp; | Coils_T  
 Wire_Dia | &nbsp; | Coil_Dia  
 &nbsp; | &nbsp; | Force_2

Compression spring lengths are ordered from the largest (L_Free) to L_1 to L_2 to the smallest (L_Solid). 
The [Compression Spring Force - Deflection Diagram](/docs/Help/img/ForceVsDeflection.png) provides more detail on this point. 

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/c_spring.html#c_springConstraints)   
 - [Errors](errors.html)   

___

<a id="PC_Avail_Deflect2_GT_80"></a>  
___

## PC_Avail_Deflect @ 2 > 80% 
Coil to coil contact may cause inaccuracy in point 2.  
 &nbsp;   
 ... details ...    
 &nbsp;   

___

<a id="PC_Avail_Deflect1_LT_20"></a>  
___

## PC_Avail_Deflect @ 1 < 20% 
End effects may cause inaccuracy in point 1.  
 &nbsp;   
 ... details ...    
 &nbsp;   

___

<a id="FS_CycleLife_MIN_not_set"></a>  
___

## FS_CycleLife MIN is not set. 
A more restrictive Life_Category has been selected but 
the corresponding constraint on FS_CycleLife is not enabled. 
Suggest enabling the FS_CycleLife MIN constraint. 

See also: 
 - [Cycle Life section of Spring Design Overview](/docs/Help/SpringDesign/spring_oview.html#cycleLife)  
 - Tutorial session tutor4  

___

<a id="padding"></a>  
___

## Padding - delete before release 
 ... details ...    
  &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
  &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
  &nbsp;   
 ... details ...    
 &nbsp;   
 ... details ...    
 &nbsp;   


