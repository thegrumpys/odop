#### Advanced Spring Operations

This entry is a work in progress.   

Material that is more detailed than appropriate
for the Spring Overview section should go here.
Some material from other sections including Spring Overview (Cycle Life) and 
perhaps including Hot Wound will be moved here.
Information regarding the standard size tables and 
stock spring catalog tables can go here.

**DESIGN TO STRESS**   
 If you want to avoid dealing with the ODOP:Spring "factor of safety" approach
 and design a spring in a more traditional "design to specific stress"
 approach, this is possible.

 A method of getting ODOP:Spring to find a design with a specific working
 stress is presented here.  A second approach that allows the user to have
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
 then go to the [SEARCH](../search) menu item to have ODOP:Spring find a design 
 with the  requested stress level at the second working position.

 Note that as with the "factor of safety approach" it may be desirable to
 use the [SEEK](../seek) menu item to find a spring of minimum weight.

 Also, while it is likely not a significant concern, 
 remember that fixing any dependent variable (like Stress\_2) will
 increase the difficulty of the search problem and thus potentially increase 
 the time required to execute the search.


**PROP_CALC_METHOD**   
 The value of Prop\_Calc\_Method controls how material properties and
 allowable stresses are determined.

 Prop\_Calc\_Method = 1 indicates values come from materials table; 
 allowable stresses will be calculated as a function of Wire_Dia.

 Prop\_Calc\_Method = 2 indicates Tensile and allowable %\_Tensile
 (%\_Tensile\_Endur and %\_Tensile\_Stat) 
 are supplied by the user; 
  allowable stresses (Stress\_Lim\_Endur and Stress\_Lim\_Stat) are calculated. 
 There is no dependence on wire diameter.

 Prop\_Calc\_Method = 3 indicates that allowable stresses 
 (Stress\_Lim\_Endur and Stress\_Lim\_Stat) 
 are supplied directly by the user.
 There is no dependence on wire diameter.


 Refer to additional discussion in the [MATERIALS](./materials) section.
 

[Help](../)
