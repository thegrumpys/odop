# Select Size and Select Catalog

This entry covers ODOP:Spring selection from tables of standard sizes and 
selection of similar entries in spring catalogs. 

### On this page:   
 - [Selecting a Standard Size](selectSizeCatalog.html#stdSize)  
 - [Selecting a Standard Wire Size in Calculator View](selectSizeCatalog.html#calcView)  
 - [Selecting Entries From the Built-in Spring Catalogs](selectSizeCatalog.html#catalogs)  
 
___

<a id="stdSize"></a>  
___

## Selecting a Standard Size in Advanced View or Calculator View

 The **Action : Select Size** menu item searches a table for standard sizes nearest
 to the current value of the designated Independent Variable.

 If the user selects a standard size from the table, that value will be
 established for the selected Independent Variable, which is then put in
 "FIXed" status.  The user should then execute a Search to obtain
 corresponding values for the other Independent Variables.
 
 The default standard size tables supplied with ODOP:Spring provide standard
 sizes for **OD\_Free** and **Wire\_Dia**. 
 The material file allows for a separate table of standard wire diameters 
 for each different material type. 

___

<a id="calcView"></a>  
___

## Selecting a Standard Wire Size in Calculator View 

When specifying a value for Wire_Dia, ODOP:Spring's Calculator View provides 
an opportunity to specify an arbitrary value or to 
specify an industry standard value associated with the currently selected Material_Type. 

Input or edit of arbitrary values for Wire_Dia 
![Input or edit of arbitrary values for Wire_Dia](/docs/Help/img/ValInpWire_Dia_non-stdNoted.png "Wire_Dia arbitrary value input dialog box")   

Input or edit of industry standard values for Wire_Dia 
![Input or edit of standard values for Wire_Dia](/docs/Help/img/ValInpWire_Dia_stdNoted.png "Wire_Dia standard value input dialog box")   

___

<a id="catalogs"></a>  
___

## Selecting Entries From the Built-in Spring Catalogs

 The **Action : Select Catalog** menu item searches a catalog for 
 designs that are similar to the current design point. 
 Catalog entries that are more than a factor of two different from any 
 of the current independent variables are not considered. 
 Catalog entries within the considered range are analyzed and ranked by objective function value. 
 The four catalog entries with the lowest objective function values are presented to
 the designer for selection. 
 If a catalog entry is selected by the user, 
 the corresponding Independent Variable and Calculation Input values are imposed.
 The program returns to the main page so that performance of the design selected
 from the catalog may be evaluated in the context of the original constraints.

By ranking the catalog entries based on Objective Value, 
ODOP:Spring chooses from the catalog based on how well the stock spring designs 
meet the user's objectives (as expressed by Fixes and constraints) 
as opposed to simply choosing designs that are physically similar to the target design. 

 The default stock spring catalogs supplied with ODOP:Spring include:   
*  MS24585 Spring, Helical, Compression:  For Loads Below 20 Pounds &nbsp; (SAE-AS24585)   
*  MS24586 Spring, Helical, Extension: &nbsp; For Loads Below 20 Pounds &nbsp; (SAE-AS24586)   

The individual catalogs are:   
 
 Name | &nbsp; | Description
--- | --- | ---
generic\_compression\_catalog  | &nbsp; | compression spring catalog 
MS24585\_(SAE-AS24585)\_c\_stl | &nbsp; | Military Standard, Compression, Steel 
MS24585\_(SAE-AS24585)\_c\_ss  | &nbsp; | Military Standard, Compression, Stainless Steel 
&nbsp;                         | &nbsp; | &nbsp; 
generic\_extension\_catalog    | &nbsp; | extension spring catalog 
MS24586\_(SAE-AS24586)\_e\_stl | &nbsp; | Military Standard, Extension, Steel 
MS24586\_(SAE-AS24586)\_e\_ss  | &nbsp; | Military Standard, Extension, Stainless Steel 
 
&nbsp;

 Note that it may be desirable to save (**File : Save**, **File : Save As** or **File : Export**) 
 the current  design before selecting a new standard size or catalog item. 
 
 See also: 
 
 * [Spring Design Topics](/docs/Help/SpringDesign)   
 * [Menu Action : Select Size...](/docs/Help/menus.html#ActionSelectSize)   
 * [Menu Action : Select Catalog...](/docs/Help/menus.html#ActionSelectCatalog)   
 * [Extension spring catalog lookup](/docs/Help/htt.html#e_springCatLookup)   
 * [Help](/docs/Help)   

 