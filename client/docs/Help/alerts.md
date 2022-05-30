# Alerts &nbsp; 

This topic provides details for each of the alerts.

### On this page:   
 - [L_Free < L_Solid](alerts.html#L_Free)  
 - [L_2 < L_solid](alerts.html#L_2_LT_L_Solid)  
 - [PC_Avail_Deflect > 80%](alerts.html#PC_Avail_Deflect_GT_80)  

___

<a id="L_Free"></a>  
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

See also: 
 - [Compression Spring Constraints](/docs/Help/DesignTypes/c_spring.html#c_springConstraints)   
 - [Errors](errors.html)   

___

<a id="PC_Avail_Deflect_GT_80"></a>  
___

## PC_Avail_Deflect > 80% 
 ... details ... 


