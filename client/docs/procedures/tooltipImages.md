# Procedure to create tooltip and end type images

This entry provides a summary of procedures used to create the ODOP tooltip and end type images.  

Additional documentation of tooltip image work can be found in GitHub issues / branches 897:  
  [Add images to variable name tooltips #897](https://github.com/thegrumpys/odop/issues/897)  
 and 925:  
  [Add more images to variable name tooltips #925](https://github.com/thegrumpys/odop/issues/925)  
The expanded list of end type is covered in:  
  [End Type generalization for FreeCAD #1083](https://github.com/thegrumpys/odop/issues/1083)  

From issue 897:
### Design guidelines
* images to be .png format, 160 pixels wide by minimum height necessary to get the job done
* spring images to correspond with design type (compression, extension, torsion)
* use the initialState spring dimensions (proportions) with reduced coil count as basis for rendered images
* coil count should be an integer (not fractional); perhaps 3 or 4
* to the extent possible, keep spring dimensions, orientation, coil count, etc. consistent between tooltip images
* to the extent practical, avoid or reduce text in the image
* use rendered spring images (FreeCAD rendering of imported IGES files?)
* green witness lines; turquoise dimension lines
* rendered spring images to be gray
* if multiple springs in one image, use light gray to distinguish the "for reference" instances
* Use open arrows to illustrate forces, curved open arrows for moments; size of arrows to reflect relative size of force

### Example images  (large)
![Coils_T](/designtypes/Spring/Compression/tooltips/Coils_T_lg.png "Coils_T")  
![End_Extension](/designtypes/Spring/Extension/tooltips/End_Extension_lg.png "End_Extension")  

### Procedure for tooltip images
* Use an image editor.  Most of the first generation images were manipulated with Windows 11 Paint. 
* As appropriate, capture a base image of a helix.  Convert to gray if necessary. Scale to roughly 500-600 pixels wide. Arbitrary height. 
* Make desired annotations 
* Save as large (_lg suffix) version 
* Scale to 160 pixels wide, corresponding height 
* Save as regular tooltip size (no suffix) 

Place the images in: `/public/designtypes/Spring/<type>/tooltips/`  

### Procedure for end type images
* Use the FreeCAD Spring Workbench to generate a design for each end type 
* In order to emphasize the ends, modify the default metric Startup values to:  
`    Coils_T = 6`  
`    L_Free = 60 mm`  
`    Wire_dia = 5 mm`  
* Set Orthographic view 
* Orient the spring to obtain an oblique view from above 
* Screen capture into .png format following the image size guidelines listed above 
* place the images in the same location as the tooltip images 

### Example images  (large)
![Compression - Open](/designtypes/Spring/Compression/tooltips/C_SpringOpenEnd_lg.png "Compression - Open")  
![Compression - Closed & Ground](/designtypes/Spring/Compression/tooltips/C_SpringClosedGndEnd_lg.png "Compression - Closed & Ground")  

&nbsp; 

See also: 
[ODOP Development Guidelines](/docs/design/Guidelines.html)
