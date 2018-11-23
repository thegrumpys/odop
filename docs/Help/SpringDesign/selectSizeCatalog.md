#### Select Size and Select Catalog

 The **Action : Select Size** menu item searches a table for standard sizes nearest
 to the current value of the designated Independent Variable.

 If the user selects a standard size from the table, that value will be
 established for the selected Independent Variable, which is then put in
 "FIXed" status.  The user should then execute a Search to obtain
 corresponding values for the other Independent Variables.
 
 The default standard size tables supplied with ODOP:Spring provide standard
 sizes for OD\_Free and Wire\_Dia. 
 The material file allows for a separate table of standard wire diameters 
 for each different material type 

&nbsp;

 The **Action : Select Catalog** menu item searches a catalog for 
 designs that are similar to the current design point. 
 Catalog entries that  are more than a factor of two different from any 
 of the current independent variables are rejected. 
 Catalog entries within this range are analyzed and ranked by objective function value. 
 The four catalog entries with the lowest objective function values are presented to
 the designer for selection. 
 If a catalog entry is selected by the user, 
 the corresponding Independent Variable and Calculation Input values are imposed.
 The program returns to the main page so that performance of the design selected
 from the catalog may be evaluated in the context of the original constraints.

 The default stock spring catalogs supplied with ODOP:Spring include:   
*  MS24585 Spring, Helical, Compression:  For Loads Below 20 Pounds &nbsp; (SAE-AS24585)   
*  MS24586 Spring, Helical, Extension: &nbsp; For Loads Below 20 Pounds &nbsp; (SAE-AS24586)   

 The individual catalogs are named:   
*  MS\_C_S &nbsp; -   Military Standard, Compression, Steel
*  MS\_C_SS     -   Military Standard, Compression, Stainless Steel
*  MS\_E_S &nbsp; -   Military Standard, Extension,   Steel
*  MS\_E_SS     -   Military Standard, Extension,   Stainless Steel

&nbsp;

 Note that it may be desirable to save (**File : Save** or **File : Save As**) the current
 design before selecting a new standard size or catalog item.
 
 