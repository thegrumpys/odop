#### Advanced Spring Operations

**DESIGN TO STRESS**   
 If you want to avoid dealing with the ODOP:Spring "factor of safety" approach
 and design a spring in a more traditional "design to specific stress"
 approach, this is possible.

 A method of getting ODOP:Spring to find a design with a specific working
 stress is presented here.  Another approach that allows the user to have
 complete control over the allowable stresses that are used in the factor of
 safety calculations is presented in the MATERIALS section.

 First, it will be necessary to free the various FS_ constraints so that
 they are no longer active.
 This is accomplished by removing the checkmark in front of the specified
 MIN and MAX constraints.

    For compression springs:        For extension springs:
    FREE    FS_2                    FREE    FS_2
    FREE    FS_CycleLife            FREE    FS_CycleLife
    FREE    FS_Solid                FREE    FS_Hook

 Next it will be necessary to tell ODOP:Spring to find a solution with the
 desired stress   (substitute your desired stress level for xxxxx below).

    FIX Stress_2  xxxxxx

 Finally, enter the rest of your problem's FIX and constraint information,
 then go to the [Search](../search) menu item (**Action : Search** menu) to have 
 ODOP:Spring find a design with the  requested stress level at the second 
 working position.

 Note that as with the "factor of safety approach" it may be desirable to
 use the [Seek](../seek) menu item (**Action : Seek** menu) to find a 
 spring of minimum weight.

 Also, while it is likely not a significant concern, 
 remember that fixing any Dependent Variable (like Stress\_2) will
 increase the difficulty of the search problem and thus potentially increase 
 the time required to execute the search.


**PROP_CALC_METHOD**   
 The value of Prop\_Calc\_Method controls how material properties and
 allowable stresses are determined and used.

 Prop\_Calc\_Method = 1 - Use values from material table 
 indicates values come from materials table; 
 allowable stresses will be calculated as a function of Wire_Dia.

 Prop\_Calc\_Method = 2 - Use Tensile & %\_Tensile_... 
 indicates Tensile and allowable %\_Tensile
 (%\_Tensile\_Endur and %\_Tensile\_Stat) 
 are supplied by the user; 
 allowable stresses (Stress\_Lim\_Endur and Stress\_Lim\_Stat) are calculated. 
 There is no dependence on wire diameter.

 Prop\_Calc\_Method = 3 - Use Stress\_Lim_... 
 indicates that allowable stresses 
 (Stress\_Lim\_Endur and Stress\_Lim\_Stat) 
 are supplied directly by the user.
 There is no dependence on wire diameter.

 Refer to additional discussion in the [MATERIALS](materials) section.
 
**HOT WOUND**   
 The easiest way to design a hot wound spring is to load a start point
 that is already set up for hot wound. 
 Sample hot wound startup files  supplied with ODOP:Spring are:

    HOT_WND -    compression spring, inch-pound-second units
    HOT_CGS -    compression spring, metric units
    SMI_HW  -    compression spring, SMI material properties

 Each of these files are pre-configured for a material type (Eg.  5160H)
 that carries an appropriate value of HOT\_FACTOR_KH, an end type of
 TAPERED_C&G, and starting values that are closer to the solution point of a
 typical hot large wound spring than the values in the default startup design.

 Alternately, select a material from the table that indicates it is "hot wound", 
 select an appropriate end type (Eg.  TAPERED\_C&G) 
 and then adjust Wire\_Dia, OD\_Free and Force\_2 to start
 with a realistic approximation of the desired result.

 The value of HOT\_FACTOR\_KH is used to reduce the effective modulus of
 elasticity and torsional modulus in the design equations.

 For normal cold coiled materials the value of HOT\_FACTOR\_KH is 1.00.
 Thus, it has no effect on the modulus.  For materials designated as
 "hot wound" in the materials table, the value of HOT\_FACTOR\_KH is
 automatically established as appropriate (generally 0.96 for centerless
 ground materials, and 0.91 for not centerless ground materials).

       PROCESS           MATERIAL         HOT_FACTOR_KH
    
     COLD_COILED                               1.00
     HOT_WOUND       CENTERLESS GROUND         0.96
     HOT_WOUND       NOT   CL   GROUND         0.91

 It is possible to set a different value for HOT\_FACTOR\_KH by 
 using PROP\_CALC\_METHOD = 2 or 3. 
 This will permit any desired
 value of HOT\_FACTOR\_KH to be entered into the main page
 Calculation Input entry field.

 Make permanent changes in these values by altering the appropriate
 materials file. 
 For additional information, refer to:
* [MATERIALS](materials)   
* [Restrictions](../../About/Legal/Restrictions)   
* [NewDesignType](../../procedures/NewDesignType)   
 

[Spring Design Topics](./)   
[Help](../)   

<!---
Comment must be the last thing in the file.
Eclipse MD Preview suppresses display of everything after the comment header.

This entry is a work in progress.   

Material that is more detailed than appropriate
for the Spring Overview section should go here.
Some material from other sections including Spring Overview (Cycle Life) and 
perhaps including metric will be moved here.
Information regarding the standard size tables and 
stock spring catalog tables can go here.
-->

