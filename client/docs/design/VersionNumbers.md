## Version Number Guidelines

This article provides a guide for constructing release version numbers for the ODOP project and its GitHub repository.

First, a bit of prior art on the subject: [Semantic Versioning 2.0.0](https://semver.org/)

As this article is written, ODOP does not directly provide a public API as envisioned in the Semantic Versioning description.
However, it does have a "model" that is represented by the initialState.js files for each design type.
So, many of the same concepts and terminology apply with just a few tweaks described here.

Adopt a version number scheme: MAJOR.MINOR.PATCH   
Example: 3.2.1

1.  **Increment MAJOR version when**   
 &nbsp; - there are significant changes visible to the user   
 &nbsp; - there are significant changes to the internal structure and dependencies   
 &nbsp; - a new design type is added   
 
1.  **Increment MINOR version when**   
 &nbsp; - significant function is added   
 &nbsp; - the model (initialState) changes and migration is required   
 
1.  **Increment PATCH version when**   
 &nbsp; - minor changes are made to repair newly discovered defects   
 &nbsp; - minor / insignificant function is added, typically related to the defect repair mission   
 &nbsp; - removal or cleanup of function and/or data, typically related to the immediate previous release   
  
In summary, most planned releases should increment the MINOR version number.
There should be some effort to accumulate significant internal and user-visible change into relatively few MAJOR releases. 
In general, PATCH changes should not be planned.
Rather, PATCH changes should be reserved for last minute discoveries that do not have wide ranging consequences across the code.


