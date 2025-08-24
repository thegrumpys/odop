# Default Designs

The ODOP software expects to start from an existing design.   

Looking at the screen capture of the **File : Open** menu below, 
you can see that each "Design Type" contains one or more system provided designs marked "**[ReadOnly]**". 
For each Design Type, the system provided design with the name "Startup" is the default starting design. 
While these default designs named "Startup" utilize US Customary units (inches, pounds), 
you can select an available system provided design with "_Metric" in the name in order to 
utilize metric units (mm, newtons).   

## Compression spring default designs   
![Compression spring default designs](/docs/Help/img/FileOpen_defaultDesigns.png "File : Open default designs")  

When logged into an [ODOP user account](/docs/About/userAccounts.html) 
and saving designs into a private section of the cloud-based ODOP design library, 
it is possible to save (**File : Save** menu item) a private design "on top of" 
a system provided design of the same name. 
This feature allows startup designs to be customized. 
Your customized version will replace the system default and will not be marked "**[ReadOnly]**"  

Once such a private design is deleted, the underlying system design (marked "**[ReadOnly]**") 
will again be available.  

While designs carry design type (compression, extension, torsion, etc.) and units (US, metric) information, 
they do not carry the system view (Advanced, Calculator, Reports) configuration.    

While the system provided designs have multiple constraints established, 
as provided, they are "under specified". 
For more information on this point see: [Design Situations](designSituations.html).   

The constraints established in the default designs serve to guide or contain the solution to 
reasonable and expected results. 
For example with coil springs, 
limiting quanties like inside diameter, number of coils and deflection to be greater than 
a small positive value reduces the chance of the solution process discovering that 
while not realistically possible, it is mathematically possible for these quantities to be negative numbers.  

To get started on a new design, open a system provided design and express goals for the new design as constraints. 
Invoke the Search feature (Search button or **Action : Search** menu) to discover if a feasible solution is available. 
More information on how to proceed is available in the tutorials (**Help : Tutorial...** menu) 
and in other on-line Help topics such as 
[Getting Started With the Spring Tutorial and Demo](gettingStartedSpring.html) and 
[Intro Pages Overview](/docs/About/introPagesOverview.html).  

&nbsp;

See Also:   
 - [Units: US customary and metric](/docs/Help/SpringDesign/unitsUSmetric.html)   


[Help](/docs/Help/index.html)
