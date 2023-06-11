# URL syntax

Starting with ODOP release 3.8 it is possible to add query parameters to the URL 
that launches ODOP in order to control startup behavior.
This page provides detail on those parameters.

The parameter passing capability was originally developed in GitHub issue / branch [388](https://github.com/thegrumpys/odop/issues/388). 
The "prompt" parameter was developed in issue / branch [477](https://github.com/thegrumpys/odop/issues/477).  
Additional information is available on those pages.

A query parameterized URL to invoke ODOP is assembled from the following components:

**Base**  
A "base" component specifies the host system.
The development environment (localhost) requires multiple components (Node.js, Eclipse, source code) 
to be installed and properly configured on the local computer.

Target System | Base URL
---|---
Development environment | http://localhost:3000/
Staging system | https://odop-staging.springdesignsoftware.org/
Production system | https://odop.springdesignsoftware.org/


**Question mark symbol**  
"?" is used to indicate that query parameters follow.  


**Ampersand symbol**  
"&" is used to concatenate another parameter. 
An ampersand following the question mark is optional.


**Type**  
The "type" component specifies the desired design type.
If a query parameter is not present, the environment variable REACT_APP_DESIGN_TYPE will supply the default value. 
For more detail on this mechanism, see: config.js, .env, release.md and the Heroku environment variables. 
As of this writing, REACT_APP_DESIGN_TYPE is set for compression spring design type.
Punctuation such as spaces and slashes may need to be escaped by their hex equivalent.

Design Type | parameter
---|---
Compression spring | type=Spring%2FCompression
Extension spring | type=Spring%2FExtension
Torsion spring | type=Spring%2FTorsion
Rectangular solid | type=Solid
Piston Cylinder | type=Piston-Cylinder


**Name**  
The "name" component specifies the desired design name.
If a query parameter is not present, the environment variable REACT_APP_DESIGN_NAME will supply the default value.
For more detail on this mechanism, see: config.js, .env, release.md and the Heroku environment variables. 
As of this writing, REACT_APP_DESIGN_NAME is set for "Startup".
Units (US: inches, pounds; metric: mm, newtons) are determined by the design.
Specifically, the name "Startup_Metric" will utilize metric units.

Design Name | parameter
---|---
Startup | name=Startup
Startup_Metric | name=Startup_Metric


**View**  
The "view" component specifies the desired view.
Both user input views and reports are available.
 
View | parameter
---|---
Advanced | view=Advanced
Basic | {not yet implemented}
Calculator | view=Calculator
Report 1 | view=Report1
Report 2 | view=Report2
Report 3 | view=Report3


**Execute Script**  
Any execute script that is available for the selected design type may be invoked as ODOP starts. 
Scripts that are in the execute.js !== "production" conditional are not visible in the production Action : Execute menu
but are still available for execution via query parameter.

View | execute script name
---|---
Advanced view welcome; all spring design types | execute=welcomeAdv
Calculator view welcome; all spring design types | execute=welcomeCalc


**Prompt**  
The "Prompt" parameter will cause ODOP to start with the File : Open modal dialog visible.
See the example below.


Examples:

URL|type|name|execute|View
---|---|---|---|---
https://odop-staging.springdesignsoftware.org/?view=Advanced&execute=welcomeAdv | REACT_APP_DESIGN_TYPE = Compression | REACT_APP_DESIGN_NAME = StartUp | welcomeAdv | Advanced
https://odop-staging.springdesignsoftware.org/?view=Calculator&execute=welcomeCalc | REACT_APP_DESIGN_TYPE = Compression | REACT_APP_DESIGN_NAME = StartUp | welcomeCalc | Calculator
https://odop-staging.springdesignsoftware.org/?view=Calculator&execute=demo | REACT_APP_DESIGN_TYPE = Compression | REACT_APP_DESIGN_NAME = StartUp | demo | Calculator
https://odop-staging.springdesignsoftware.org/?name=Startup&view=Calculator&execute=demo | REACT_APP_DESIGN_TYPE = Compression | Startup | demo | Calculator
https://odop-staging.springdesignsoftware.org/?type=Spring%2FCompression&view=Calculator&execute=demo | Spring/Compression | REACT_APP_DESIGN_NAME = StartUp | demo | Calculator
https://odop-staging.springdesignsoftware.org/?type=Spring%2FCompression&name=Startup&view=Calculator&execute=demo |  Spring/Compression | Startup | demo | Calculator
https://odop-staging.springdesignsoftware.org/?type=Spring%2FExtension&view=Calculator&execute=demo6 | Spring/Extension | REACT_APP_DESIGN_NAME = StartUp | demo6 | Calculator
https://odop-staging.springdesignsoftware.org/?type=Spring%2FExtension&name=Startup&view=Calculator&execute=demo6 | Spring/Extension | Startup | demo6 | Calculator
https://odop-staging.springdesignsoftware.org/?type=Spring%2FTorsion&view=Calculator&execute=demo14 | Spring/Torsion | REACT_APP_DESIGN_NAME = StartUp | demo14 | Calculator
https://odop-staging.springdesignsoftware.org/?type=Spring%2FTorsion&name=Startup&view=Calculator&execute=demo14 | Spring/Torsion | Startup | demo14 | Calculator
https://odop-staging.springdesignsoftware.org/?prompt | REACT_APP_DESIGN_TYPE = Compression | REACT_APP_DESIGN_NAME = StartUp | {File : Open} | Advanced

