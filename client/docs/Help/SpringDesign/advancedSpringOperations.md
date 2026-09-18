# Advanced Spring Operations 

This section presents information covering some of the more advanced topics 
for designing coil springs in ODOP:Spring.  

___

### On This Page:   
 - [Design to Stress](/docs\Help/SpringDesign/advancedSpringOperations.html#DesignToStress)  
 - [Material Property Calculation Method](/docs\Help/SpringDesign/advancedSpringOperations.html#Prop_Calc_Method)  
 - [Hot Wound](/docs\Help/SpringDesign/advancedSpringOperations.html#HotWound)  
 - [Standard Wire Sizes](/docs\Help/SpringDesign/advancedSpringOperations.html#StdWireSize)  

&nbsp;
___

<a id="DesignToStress"></a>  
___

## Design to Stress   
 If you want to avoid dealing with the ODOP:Spring "factor of safety" approach 
 and design a spring in a more traditional "design to specific stress" 
 approach, this is possible. 

 A method of getting ODOP:Spring to find a design with a specific working 
 stress is presented here. 
 Another approach that allows the user to have complete control over the 
 allowable stresses that are used in the factor of safety calculations 
 is presented in the [MATERIALS](materials.html) section. 

 First, it will be necessary to free the various `FS_` constraints so that 
 they are no longer active. 
 This is accomplished by removing the checkmark in front of the specified 
 MIN and MAX constraints. 

    For compression springs:        For extension springs:
    FREE    FS_2                    FREE    FS_2
    FREE    FS_CycleLife            FREE    FS_CycleLife
    FREE    FS_Solid                FREE    FS_Hook

 Next it will be necessary to tell ODOP:Spring to find a solution with the 
 desired stress (substitute your desired stress level for xxxxx below). 

    FIX Stress_2  xxxxxx

 Finally, enter the rest of your problem's FIX and constraint information, 
 then go to the [Search](/docs/Help/search.html) menu item (**Action : Search** menu) 
 to have ODOP:Spring find a design with the requested stress level at the second 
 working position. 

 Note that as with the "factor of safety approach" it may be desirable to 
 use the [Seek](/docs/Help/seek.html) menu item (**Action : Seek** menu) to find a 
 spring of minimum weight. 

 Also, while it is likely not a significant concern, 
 remember that fixing any Dependent Variable (like `Stress_2`) will 
 increase the difficulty of the search problem and thus potentially increase 
 the time required to execute the search. 

&nbsp;
   
___

<a id="Prop_Calc_Method"></a>  
___

## Prop_Calc_Method   
 The value of `Prop_Calc_Method` controls how material properties and 
 allowable stresses are determined and used. 

 `Prop_Calc_Method` = 1 - Use values from material table  
 indicates values come from materials table; 
 allowable stresses will be calculated as a function of Wire_Dia.  

 `Prop_Calc_Method` = 2 - Use Tensile & %\_Tensile_...  
 indicates `Tensile` and allowable `%_Tensile_...` values 
 (`%_Tensile_Endur`  and  `%_Tensile\_Stat`) 
 are supplied by the user; 
 allowable stresses (`Stress_Lim_Endur`  and  `Stress_Lim_Stat`) are calculated. 
 There is no dependence on wire diameter.  

 `Prop_Calc_Method` = 3 - Use Stress\_Lim_...  
 indicates that allowable stresses  (`Stress_Lim_Endur`  and  `Stress_Lim_Stat`) 
 are supplied directly by the user. 
 There is no dependence on wire diameter. 

 Refer to additional discussion in the [MATERIALS](materials.html) section. 

&nbsp;
   
___

<a id="HotWound"></a>  
___

 
## Hot Wound   
 The easiest way to design a hot wound spring is to open a start point 
 that is already set up for hot wound. 
 Sample compression spring hot wound startup designs supplied with ODOP:Spring 
 (marked "[ReadOnly]") are: 

    HotWound       - U.S. customary units (inches, pounds) 
    HotWoundMetric - metric units (mm, Newtons)

 Each of these files are pre-configured for a material type (Eg. 5160H) 
 that carries an appropriate value of `Hot_Factor_Kh`, an end type of 
 TaperedClosed&Ground, and starting values that are closer to the solution point of a 
 typical large hot wound spring than the values in the default startup design. 

 Alternately, select a material from the table that indicates it is "hot wound", 
 select an appropriate end type (For example: TaperedClosed&Ground) 
 and then adjust `Wire_Dia`, `OD_Free` and `Force_2` to start 
 with a realistic approximation of the desired result. 

 The value of `Hot_Factor_Kh` is used to reduce the effective modulus of 
 elasticity and torsional modulus in the design equations. 

 For cold coiled materials, the value of `Hot_Factor_Kh` is 1.00. 
 Thus, it has no effect on the modulus. 
 For materials designated as "hot wound" in the materials table,  
 For example:  
 - 5160H Chromium steel-centerless ground, &nbsp; &nbsp; &nbsp; hot wound-ASTM A-125  
 - 5160H Chromium steel-not centerless ground,hot wound-ASTM A-125 

 the value of `Hot_Factor_Kh` is automatically established as appropriate.  

 &nbsp; | Process     | Material          | Hot_Factor_Kh  
 ---    | ---         | ---               | ---            
 &nbsp; | Cold Coiled | &nbsp;            | 1.00           
 &nbsp; | Hot Wound   | Centerless Ground | 0.96           
 &nbsp; | Hot Wound   | Not CL Ground     | 0.91           
  

 It is possible to set a different value for `Hot_Factor_Kh` by 
 using `Prop_Calc_Method` = 2 or 3. 
 This will permit any desired  value of `Hot_Factor_Kh` to be entered into 
 the Advanced View  Calculation Input entry field.  

 Make permanent changes in these values by altering the appropriate 
 materials file.  

 For additional information, refer to: 
* [MATERIALS](materials.html)   
* [Restrictions](/docs/About/Legal/Restrictions.html)   
* [NewDesignType](/docs/procedures/NewDesignType.html)   

___

<a id="StdWireSize"></a>  
___

## Standard Wire Sizes

Multiple standard wire size tables are built-in to the ODOP:Spring software.
 - A single table provides standard metric sizes for all materials. 
 - When working in US Customary units, different materials have unique standard wire size tables.  

<!--- check this 
### Accessing Standard Wire Sizes  
### - When Auto Standard Size is enabled: 
{Note: Provide advice to maintain Wire_Dia in Free status 
will be provided once the code implementation is complete.}

### - When Auto Standard Size is disabled: 
  --> 
### Setting a standard wire size
 - **Advanced View**: Access the standard-size table through the Action : Select Size... menu. 
 - **Calculator View**: Click on the `Wire_Dia` field to display a modal dialog box that provides a 
 drop-down selection of standard wire sizes available for the selected material.  

### Historical Background of Wire Gauges  
In the United States, the evolution of standard or preferred wire sizes began in the early 19th century 
with wire industry pioneers like Washburn and Moen initially manufacturing wire for telegraphy 
and later for barbed wire and coil springs. 
The active set of wire sizes and tolerances eventually became known as the Washburn and Moen gauge. 
In parallel, around the same time, a similar system — later known as the Roebling wire gauge 
(or sometimes the American Steel Wire Gauge) — emerged from wire rope and suspension bridge applications. 
Both systems assign higher gauge numbers to finer wires, 
but diverge on the specific mapping from gauge number to physical diameter. 
Historically, the gauge numbers were tied to the number of drawing operations in the manufacturing process. 
However, because different manufacturers optimized their drawing processes for distinct applications, 
a given gauge number (say, “10”) in the Washburn & Moen system might not exactly equal the “10” in the Roebling gauge.  

### Economic and Practical Incentives for Standard (preferred) Wire Sizes  
1. **Availability and Lead Time**: 
Standard wire sizes are readily available off-the-shelf from suppliers. 
Custom diameters often require special manufacturing runs, leading to longer lead times and potential project delays.  
2. **Cost Efficiency**: 
Standard wire is mass-produced, so it benefits from economies of scale, making it significantly cheaper per unit. 
Custom diameters involve tooling changes or special orders, increasing material and production costs.  
3. **Manufacturing Simplicity**: 
Spring manufacturing equipment is calibrated for standard wire sizes. 
Using custom diameters can require retooling or recalibration, increasing complexity, labor, and risk of errors.  
4. **Design Resources and Predictability**: 
Standard wire sizes have well documented material properties and are supported by existing design tables, software, and handbooks. 
Custom sizes may require additional testing or validation.  
5. **Repair, Replacement, and Maintenance**: 
If a spring in service needs to be replaced, a design using a standard wire diameter makes it easier to source and reproduce. 
Custom sizes can lead to downtime and difficulty sourcing parts later in the product’s lifecycle.  
6. **Waste Reduction**: 
Standard wire is more likely to be used across multiple products or projects, 
reducing the chance of scrap or leftover unusable material.  
 
**Conclusion:**  
While custom wire diameters might seem attractive for ultra-precise designs, 
the downsides in terms of cost, availability, and complexity usually outweigh the benefits. 
Standard wire diameters offer a reliable, cost-effective, and practical solution that aligns well 
with manufacturing and supply chain realities.  

See also: 
 - [Preferred wire gauges - history](https://www.sizes.com/materials/wire.htm)  
 - [UK Spring Industry Metrication Report - December, 1971](https://ist.org.uk/wp-content/uploads/_pda/2024/07/Research-Report-196-Metrication-In-The-Spring-Industry.pdf)  

&nbsp; 

[Spring Design Topics](/docs/Help/SpringDesign/index.html)   
[Help](/docs/Help/index.html)   

<!---
Depending on Eclipse version or Markdown interpreter, a multi-line comment must be the last thing in the file.
Older Eclipse MD Preview suppresses display of everything after the comment header.

This entry is a work in progress.   

Material that is more detailed than appropriate for the Spring Overview section should go here.
Some material from other sections including Spring Overview (Cycle Life) and 
perhaps including metric will be moved here.
Information regarding the standard size tables and 
stock spring catalog tables can go here.
-->

