## Features

#### Open Design Optimzation : Platform &nbsp; (ODO:P)   

ODO:P is a web application currently under development.
It provides a number of features and capabilities to facilitate the analysis 
and design of a broad range of problems where a mathematical model is available. 

* Open Source

* Browser Based

* Responsive to different screen sizes

* Capable of directly producing the desired solution   
 Can eliminate the iterative analysis process that is common with more conventional
 approaches to design.  While certainly capable of analyzing the
 performance of an existing design, SpringSys is at its best when used to
 develop solutions to difficult and highly constrained original design
 problems.
 
* Analysis  is just the beginning ...
 
* Inversion of design equations

 SpringSys is very versatile in its approach to design because it has
 the capability to invert the dependent-independent relationships of the
 design equations.  This means that the designer can enter his design
 problem in exactly the terms that it is specified.  If force and deflection
 at two points are specified, the program can solve the problem without
 explicitly using spring rate.  If spring rate and maximum load are
 specified, SpringSys will work to a solution without explicitly knowing
 deflections and lengths.  SpringSys has the capability to handle any
 combination of specifications on the problem.


* Selection of design parameters within constraints

 SpringSys selects values for design parameters such as wire
 diameter, coil diameter, free length and number of coils to achieve the
 desired force-deflection characteristics.  At the same time, the program
 ensures that the design does not exceed the user's specifications for
 values of stress, factor of safety, form factor (buckling), solid height,
 inside or outside diameters, etc.  Unless instructed otherwise, SpringSys
 selects the initial tension of extension springs within the range of best
 manufacturability.


* Optimization

 SpringSys contains a powerful numerical search capability that probes for
 the design that is specified until a satisfactory solution is found.  The
 program can seek the constrained extreme of any variable, independent or
 dependent.  For example, SpringSys can be asked to find the spring of least
 material weight (or lowest rate, least solid height, greatest factor of
 safety, etc.) at the same time that it is maintaining all the previously
 described objectives for force-deflection characteristics, stress,
 diameters, etc.  Thus, SpringSys has a "goal seeking" capability that is
 not found in other design methods or programs.


* Exploration of available solutions

 SpringSys has features that allow the designer to quickly probe the range
 of solutions available within constraints.  For example, SpringSys might
 deliver a solution with a relatively high stress level (a solution that
 minimizes weight is expected to have stresses that are close to the maximum
 allowable stress or minimum factor of safety constraints).  With a single
 command, the designer can ask to see a design that reduces stress (at some
 penalty in increased weight, of course), but still meets the goals
 expressed by the various other constraints on the problem.


* Guidance in restructuring goals when satisfactory solutions can't be found

 If SpringSys determines that the designer's goals (as expressed by his
 constraints on the problem) cannot be met, it is necessary for the
 designer to restructure the design in some way.  One approach is to
 select stronger (and probably more expensive) materials.  A more likely
 approach is to seek a compromise where one or more of the original
 objectives is sacrificed (for example, cycle life) in order to maintain
 the others (for example, outside diameter and solid height).  SpringSys
 has a feature that may be used to identify those constraints that are
 most leveraged and guide the designer to restructure his goals in a way
 that is most consistent with his original objectives.


* Material selection tables

 In addition to tables of commonly available wire sizes, SpringSys contains
 tables of material properties for many commonly used materials.
 These tables may be altered or supplemented by the user.  For most spring
 materials, allowable stress varies significantly as a function of wire
 diameter.  For this reason, SpringSys recalculates allowable stress and
 factor of safety for each combination of material type and wire size
 evaluated.  These features eliminate the need for the designer to
 refer to tables and charts of material properties.  Metric units are
 supported, including metric material property tables and metric standard
 wire size tables.


* Selection from a catalog of stock springs

 Once a designer has established a custom spring design that satisfies his
 objectives, SpringSys can select the closest or otherwise most
 appropriate spring from a catalog of stock springs.  The current release
 of SpringSys is supplied with several sample compression and extension
 spring catalogs, including U.S. Military Standards:

   MS 24585  Spring, Helical, compression: For loads below 20 pounds
   MS 24586  Spring, Helical, extension:   For loads below 20 pounds

 In addition to finding the closest design in the catalog, the SpringSys
 user can access any spring in the catalog based on its "catalog number".
 Features that permit the user to enter a catalog of stock springs are
 supplied with the program.


* Save and recovery of designs

 SpringSys can save designs into a disk file for later recovery.  This
 feature has many uses.  A designer can save a specific design for
 detailed comparison with alternatives generated later.  A design
 investigation can be interrupted to get more information or service other
 requests, then resumed later without the need to repeat prior effort or
 the risk of introducing errors.  Detailed reference information,
 including names and phone numbers, may be saved with each design.

* On-line help

 SpringSys maintains its complete user's manual (more than 80 pages)
 available to the user at all times.  A request for "HELP" will be
 answered with a list of all the commands available and all the
 specialized topics for which help is available.  The user may then pursue
 more detailed answers to his questions.  The help information is
 presented in a paged format such that the user can read information at
 his own pace or return to the design process as soon as the desired
 information is obtained.

 