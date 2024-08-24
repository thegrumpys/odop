# ODOP Development Guidelines &nbsp; 

This topic presents various guidelines for ODOP software development. 

### On this page:   
 * [Version number guidelines](Guidelines.html#verNum) 
 * [Image location guidelines](Guidelines.html#imgLoc) 
 * [Tooltip image guidelines](Guidelines.html#tTImg) 

___

<a id="verNum"></a>  
___

## Version number guidelines

This is a guide for constructing release version numbers for the ODOP project and its GitHub repository.

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
 &nbsp; - no model changes and therefore no migration is required
 &nbsp; - removal or cleanup of function and/or data, typically related to the immediate previous release   
  
In summary, most planned releases should increment the MINOR version number.
There should be some effort to accumulate significant internal and user-visible change into relatively few MAJOR releases. 
In general, PATCH changes should not be planned.
Rather, PATCH changes should be reserved for last minute discoveries that do not have wide ranging consequences across the code.

___

<a id="imgLoc"></a>  
___

## Image location guidelines

When contemplating a location (directory path) for image files,
consider that there are two worlds (Heroku & GitHub Pages) with differing requirements.

Any images referenced in demo and tutorial sessions should be located in "public":   
odop/client/public/designtypes/xxx/imagename    

Any images in Help (GitHub Pages) should be located in a "docs": subdirectory:   
odop/client/docs/Help/images/imagename   

See issues #243 & #244.

___

<a id="tTImg"></a>  
___

##  Tooltip image guidelines

- images to be 160 pixels wide by minimum height necessary to get the job done
- spring images to correspond with design type (compression, extension, torsion)
- use the initialState spring dimensions (proportions) with reduced coil count as basis for rendered images
- coil count should be an integer (not fractional); perhaps 3 or 4
- to the extent possible, keep spring dimensions, orientation, coil count, etc. consistent between tooltip images
- to the extent practical, avoid or reduce text in the image
- use rendered spring images (FreeCAD rendering of imported IGES files?)
- green witness lines; turquoise dimension lines
- rendered spring images to be grey
- if multiple springs in one image, use light grey to distinguish the "for reference" instances
- Use open arrows to illustrate forces, curved open arrows for moments; size of arrows to reflect relative size of force
- (other?)  

___

&nbsp; 
 
[docs](/docs/) 


&nbsp; 

&nbsp; 

&nbsp; 

&nbsp; 

&nbsp; 

