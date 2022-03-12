#### Spring Materials and Material Properties

   
**MATERIALS**   
Spring wire and bar materials available in the default material table supplied with ODOP:Spring
include:

      Common Name    ASTM     FED_SPEC    Notes
    
    HARD_DRAWN_WIRE  A227                Class II
    MUSIC_WIRE       A228     QQW-470
    OIL_TEMPERED_MB  A229     QQW-428    Class II
    CHROME_VANADIUM  A232     QQW-412
    CHROME_SILICON   A401     QQW-412
    SAE9250          A401     QQW-412
    302_STAINLESS   Type302   QQW-423
    17-7_STAINLESS   A313    (cond_CH)
    SPRING_BRASS     B134     QQW-321
    PHOSPHOR_BRONZE  B159     QQW-401
    MONEL             400    (AMS7233)
    INCONEL_X-750   SprTmp   (AMS5698)
    BERYLLIUM-COPPER  B197    QQW-530
    5160H            A125-52
    5160H-CG         A125-52          centerless ground

The corresponding "long names" not currently displayed in the ODOP:Spring user interface are:

    17Cr 7Ni Stainless wire: condition CH -          ASTM A-313 
    Type 302 Stainless Steel spring wire -           ASTM A-313 
    Type 316 Stainless Steel spring wire -           ASTM A-313
    5160H Chromium steel:       not ground:hot wound:ASTM A-125
    5160H Chromium steel:centerless ground:hot wound:ASTM A-125
    Beryllium Copper -                               ASTM B-197 
    Oil Temp Chrome Silicon spring wire -            ASTM A-401
    Oil Temp Chrome Vanadium valve spring wire -     ASTM A-232
    Hard Drawn MB spring wire   - Class II           ASTM A-227 
    Inconel X-750  Spring Temper                     AMS  5698 
    Monel  Alloy 400                                 AMS  7233 
    Music Wire  (all coatings) -                     ASTM A-228 
    Oil Tempered MB spring wire - Class II           ASTM A-229 
    Phosphor Bronze spring wire -                    ASTM B-159 
    Oil Temp Chrome Silicon valve spring wire -      ASTM A-401
    70/30 Brass spring wire -                        ASTM B-134 
    Ti-13V-11Cr-3Al  Beta C Titanium -               AMS  4917

   
By default, ODOP:Spring gets material property data from the materials table. 
Alternate material tables may be provided to contain material
property values that match locally available materials or individual
experience and preferences. 
Thus, the currently active materials table may
not match the default table described above. 
For additional information, refer to:
* [Restrictions](../../About/Legal/Restrictions.html)
* [NewDesignType](../../procedures/NewDesignType.html)

The way that ODOP:Spring handles material property data is dependent on the
user specified settings of the Calculation Inputs:  Material\_Type and
Prop\_Calc\_Method. 
Note that by default, when using a material selected from the materials table,
allowable stresses are calculated as a function of wire diameter.
In general, the user may ignore these details and use
the defaults built into the program. 
Establish material property values simply by selecting a Material\_Type. 
In the case that more control of material property data entering 
the calculations is desired, the details provided below and in 
[Prop_Calc_Method](./advancedSpringOperations.html) may be useful. 

Examples of these procedures are presented in tutorial section TUTOR5.
   
The Material\_Type is used to indicate which entry in
the material table should be used to determine material
properties and allowable stress limits.  Specifically, the term "material
properties" includes the values for Density, Torsion\_Modulus, and Tensile.
The term "allowable stress limits" includes values for Stress\_Lim\_Stat and
Stress\_Lim\_Endur which are normally calculated based on the material
properties plus the current value of Wire\_Dia combined with %\_Tensile\_Stat
and %\_Tensile\_Endur.
   
To use a material that is not in the material table, or to use
material property values that are different than those contained in the
table, it is necessary to select an alternate setting for Prop\_Calc\_Method. 

ODOP:Spring will treat material properties in one of three different ways
depending on the value of the constant Prop\_Calc\_Method.

If Prop\_Calc\_Method has a value of **1 - Use values from material table**
(the normal default), then the
material properties are selected and allowable stresses calculated as
previously described.  Specifically, if Prop\_Calc\_Method has a value of 1,
ODOP:Spring will calculate the allowable stresses as a function of Wire\_Dia.
A log-linear interpolation scheme will use the values of Wire\_Dia, plus the
table supplied values of tensile at 0.010, tensile at 0.400,
%\_Tensile\_Stat, and %\_Tensile\_Endur to calculate new values for Tensile,
Stress\_Lim\_Stat and Stress\_Lim\_Endur at each step in the Search process.
This insures that the allowable stresses used in the factor of safety
calculations exactly match the trial values of Wire\_Dia selected by Search.
   
If Prop\_Calc\_Method has a value of **2 - Use Tensile & %_Tensile_...**, 
the user supplied values of Tensile, %\_Tensile\_Stat and
%\_Tensile\_Endur are used to calculate the allowable stresses
Stress\_Lim\_Stat and Stress\_Lim\_Endur.

If Prop\_Calc\_Method is set to a value of **3 - Use Stress_Lim_...**, 
then ODOP:Spring will not
modify the values of Stress\_Lim\_Stat and Stress\_Lim\_Endur in any way.
These values will remain as established in the initial start point ("Startup") 
or as set by the user in the Advanced View Calculation Input section. 
The values of Material\_Type, Tensile, %\_Tensile\_Stat and %\_Tensile\_Endur 
will be ignored.

In most cases, the user does not need to be concerned with these details.
They are necessary only to use material properties or allowable stresses
that are different from those determined by the materials table.
   
The following example illustrates how to establish a value of
Torsion\_Modulus that is different from the value in the material table.
Stress\_Lim\_Stat and Stress\_Lim\_Endur will continue to be based on the
current values of Tensile plus
%\_Tensile\_Stat and %\_Tensile\_Endur whether established by the user or 
carried over from the values established in the materials table or startup. 
The order in which these changes are entered is significant.

    CHANGE  Prop_Calc_Method  2 - Use Tensile & %_Tensile_...
    CHANGE  Torsion_Modulus  xxxxxxxx
   
The same process applies to changing values for %\_Tensile\_Stat and %\_Tensile\_Endur.

The following example illustrates how to establish a value of
%\_Tensile\_Stat that is different from the value in the material table.
Stress\_Lim\_Stat and Stress\_Lim\_Endur will continue to be based on the new
value of %\_Tensile\_Stat and existing value of %\_Tensile\_Endur.  The order
in which these changes are entered is significant.

    CHANGE  Prop_Calc_Method  2 - Use Tensile & %_Tensile_...
    CHANGE  %_Tensile_STAT  xxxxxxxx

   
 The following example illustrates how to establish values of
 Torsion\_Modulus, Stress\_Lim\_Stat and Stress\_Lim\_Endur. 
 There will be no  dependence on the Wire\_Dia or any values from the materials table. 
 The  order in which these changes are entered is significant.

    CHANGE  Prop_Calc_Method  3 - Use Stress_Lim_...
    CHANGE  Torsion_Modulus   xxxxxxxx
    CHANGE  Stress_Lim_Stat   yyyyyy
    CHANGE  Stress_Lim_Endur  zzzzzz

   
The **File : Save** menu item will capture the complete status of the design including
the material property information.  After using the **File : Open...** menu item to read a
previously saved design, the complete status of the design will be restored.

Additional information on controlling the way material property data is
used in the calculations is presented in the section 
[Design to Stress](./advancedSpringOperations.html).


[Spring Design Topics](./)   
[Help](../)   
