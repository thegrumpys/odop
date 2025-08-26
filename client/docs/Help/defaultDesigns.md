# Default Designs  
The ODOP software expects to start from an existing design. 

## Design Types
As described on the [Getting Started - less technical](/docs/Help/gettingStarted.html) page, 
ODOP provides multiple [Design Types](/docs/Help/terminology.html#designTypes). 
You must select a Design Type before selecting a design to start from.

## System Provided Designs  
As you can see from the screen capture of the **File : Open** menu below, 
each "Design Type" contains one or more system provided designs marked "**[ReadOnly]**". 

### Example: Compression Spring System Provided Designs   
![Compression spring default designs](/docs/Help/img/FileOpen_defaultDesigns.png "File : Open default designs")  

System provided designs named "Startup" utilize US Customary units (inches, pounds). 
Select an available system provided design with "_Metric" in the name in order to 
utilize metric units (mm, newtons).  

While the system provided designs have multiple constraints established, 
as provided, they are "under specified". 
For more information on this point see: [Design Situations](designSituations.html).   

The constraints established in the system provided designs serve to guide or contain the solution to 
reasonable and expected results. 
For example, with coil springs, limiting quantities like 
number of coils, deflection, spring index and factor of safety to be within a reasonable range 
avoids results that while mathematically possible, are unrealistic. 
For example, negative values for quantities like inside diameter.  

To get started on a new design, open a system provided design and express goals for the new design as constraints. 
Invoke the [Search](/docs/Help/search.html) feature (Search button or **Action : Search** menu) 
to discover if a feasible solution is available. 
More information on how to proceed is available in the tutorials (**Help : Tutorial...** menu) 
and in other on-line Help topics such as 
[Getting Started With the Spring Tutorial and Demo](gettingStartedSpring.html) and 
[Intro Pages Overview](/docs/About/introPagesOverview.html).  

While designs carry design type (compression, extension, torsion, etc.) and units (US, metric) information, 
they do not carry the system view (Advanced, Calculator, Reports) configuration.    

## Default Design  
Currently, in situations such as a browser refresh (reload), 
ODOP will load the system provided "Startup" design for compression springs as a default.  

## Customizing System Provided Designs
When logged into an [ODOP user account](/docs/About/userAccounts.html) 
and saving designs into a private section of the cloud-based 
[ODOP Design Library](/docs/Help/terminology.html#designLib), 
it is possible to save (**File : Save** menu item) a private design "on top of" 
a system provided design of the same name. 
This feature allows startup designs to be customized. 
Your customized version will replace the system default and will **not** be marked "**[ReadOnly]**"  

Once such a private design is deleted, the underlying system design (marked "**[ReadOnly]**") 
will again be available.  

**Note:**  
Customized designs are available only when signed in. 
Designs that you see before sign in are non-customized system provided designs.  

**Basic Example:**  
Open the system design "Startup_Metric", make changes, 
and use **File : Save** to save it with the name "Startup_Metric". 
Once signed in, 
your customized version will now load when "Startup_Metric" is accessed by **File : Open**  

**Advanced Example:**  
While the following example may provide a useful shortcut for experienced users,
it may also provide an opportunity for unexpected behavior and confusion for less experienced users. 

Open the system design "Startup_Metric", make changes, 
and use **File : Save As** to save it with the name "Startup". 
Once signed in, 
your customized metric version will now load when "Startup" is accessed by **File : Open**.

&nbsp;

See Also:   
 - [Units: US customary and metric](/docs/Help/SpringDesign/unitsUSmetric.html)   


[Help](/docs/Help/index.html)
