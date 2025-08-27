# Default Designs  
ODOP begins each session from an **existing design** rather than starting with a blank slate.  

## Design Types
As explained in [Getting Started - less technical](/docs/Help/gettingStarted.html), 
ODOP supports multiple [Design Types](/docs/Help/terminology.html#designTypes) 
(for example, compression, extension and torsion springs). 
You must must first choose a Design Type before selecting a specific design to start from.

## System-Provided Designs  
Each Design Type includes one or more **system-provided designs**, 
identified in the **File : Open** menu marked "**[ReadOnly]**".  

### Example: Compression Spring System-Provided Designs   
![Compression spring default designs](/docs/Help/img/FileOpen_defaultDesigns.png "File : Open default designs")  

 - Designs named "**Startup**" use **US Customary units** (inches, pounds).  
 - Designs with **Metric** in the name use **metric units** (millimeters, newtons).  

System-provided designs include several predefined constraints, but they are intentionally 
[under-specified](designSituations.html).

The constraints established in the system-provided designs serve to guide the solution to realistic results. 
For example, in coil spring designs, limits on quantities like 
number of coils, deflection, spring index and factor of safety 
prevent mathematically possible but physically unrealistic outcomes (for example, a negative inside diameter).  

## Getting Started with a New Design
1. Open a system-provided design. 
1. Add or adjust constraints to reflect your design goals. 
1. Use the [Search](/docs/Help/search.html) feature (Search button or **Action : Search** menu) 
to check if a feasible solution is available. 

For step-by-step guidance, see:  
 - The tutorials (**Help : Tutorial...** menu)  
 - On-line Help topics such as 
[Getting Started With the Spring Tutorial and Demo](gettingStartedSpring.html) and 
[Intro Pages Overview](/docs/About/introPagesOverview.html).  

**Note:**  
Design files store their Design Type and units (US or metric), 
but not the system view (Advanced, Calculator, Reports) configuration.  

## Default Design  
If ODOP needs to load a design automatically (for example, after a browser refresh), 
it defaults to the Startup compression spring design in US Customary units.

## Customizing System-Provided Designs  
If you are signed in to an [ODOP user account](/docs/About/userAccounts.html) 
you can save designs into the cloud-based [ODOP Design Library](/docs/Help/terminology.html#designLib). 

You can overwrite a system-provided design by saving a private design with the same name:
 - Your customized version will replace the system-provided version.  
 - It will **not** be marked "[ReadOnly]".  
 - If you delete your private version, the original system-provided design will reappear.

**Note:**  
Customized designs are available only when signed in. 
Before signing in, you will see the original system-provided designs. 

### Basic Example  
1. Open Startup_Metric.  
1. Make your changes.  
1. Use **File : Save** to save it as Startup_Metric.  

When signed in, your customized version will load whenever you open Startup_Metric.

### Advanced Example &nbsp; (Use with Caution)  
1. Open Startup_Metric.  
1. Make changes.  
1. Use **File : Save As** to save it as Startup.  

When signed in, 
your customized metric version will now load when "Startup" is accessed by **File : Open**.  

While this example may provide a useful shortcut for experienced users,
as the name no longer matches the units, 
it may also provide an opportunity for unexpected behavior and confusion for less experienced users.  

&nbsp;

See Also:   
 - [Units: US customary and metric](/docs/Help/SpringDesign/unitsUSmetric.html)   


[Help](/docs/Help/index.html)
