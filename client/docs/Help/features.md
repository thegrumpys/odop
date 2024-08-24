# Features

## Open Design Optimization Platform &nbsp; (ODOP)   

ODOP is a web software application (web app) that 
provides features and capabilities to facilitate the analysis 
and design of a broad range of problems that have a mathematical model available. 

## ODOP is:

### Open Source Software  

The ODOP software is being developed as open source software. 
 The source code is freely available under the (permissive) MIT License.
 There are no fees associated with use or redistribution of the software.
 You are free to modify or customize the software to suit your needs.
 It is expected that various organizations may host the software on their 
 web servers and allow free use of the software by the general public.


### Browser Based and Highly Scalable  

The ODOP software is expected to run on most modern web browsers.
A very broad range of hardware and operating systems will be able to utilize the software.
This includes Microsoft Windows and Apple MacOS, Linux systems plus many iOS and Android based mobile devices.
As browser-based software, there is no "app" to be downloaded and installed. 
Responsibility for managing updates lies with the person or organization managing the server.
End users will never need to be concerned with installing ODOP software updates
on their system.  

Calculations required by the software are performed within the browser on the user's computer.
Each time another user starts work, another processor, memory and network connection is added as well.
Thus, each user does their design activities in a highly responsive environment and those activities
do not degrade the responsiveness of other users.

While multiple users may share the server that initially provides the web app as well as the server that 
stores the design library (specifically, the File : Open and File : Save operations use that server), 
these operations happen infrequently and at times that the user is relatively less sensitive to 
slight delays in program operation.


### Responsive to different screen sizes   

Developed as a "responsive" web app, the software will change its
screen layout and input behavior in response to the capabilities of the user's device.
Note that while operation on a cell phone may be possible, 
the scrolling necessary to accommodate screen size limitations may impact productivity.  


### Capable of directly producing the desired solution.

The ODOP software can eliminate the iterative analysis process that is common with more conventional
approaches to design.  While certainly capable of analyzing the
performance of an existing design, ODOP is at its best when used to
develop solutions to difficult and highly constrained original design problems.
 
 
### Analysis is just the beginning ...   

 The user's ability to enter independent variables and compute dependent variables 
 is the most basic of the software's capabilities.
 With other tools where analysis is the only capability, the designer is forced to iterate,
 basically guessing values of inputs in order to produce the desired values of outputs.
 
 
### Capable of inversion of design equations

 ODOP is very versatile in its approach to design because it has
 the capability to invert the dependent-independent relationships of the
 design equations.  This means that the designer can enter his design
 problem in exactly the terms that it is specified. 
 For example, when designing a spring, if force and deflection
 at two points are specified, the program can solve the problem without
 explicitly using spring rate.  If spring rate and maximum load are
 specified, ODOP will work to a solution without explicitly knowing
 deflections and lengths.  ODOP has the capability to handle any
 consistent combination of specifications on the problem.


### Selection of design parameters within constraints

 The ODOP Search feature selects appropriate values for independent variables.
 In the spring design example, these might include selecting quantities such as wire
 diameter, coil diameter, free length and number of coils to achieve the
 desired force-deflection characteristics.  At the same time, the program
 can ensure that the design does not exceed the user's specifications for
 values of stress, factor of safety, form factor (buckling), solid height,
 inside or outside diameters, etc.  


### Optimization

 ODOP contains a powerful numerical search capability that probes for
 the design that is specified until a satisfactory solution is found.  The
 program can seek the constrained extreme of any variable, independent or
 dependent.  For example, ODOP can be asked to find the spring of least
 material weight (or lowest rate, least solid height, greatest factor of
 safety, etc.) at the same time that it is maintaining all the previously
 described objectives for force-deflection characteristics, stress,
 diameters, etc.  Thus, ODOP has a "goal seeking" capability that is
 not commonly found in other design methods or programs.


### Exploration of available solutions

 ODOP has features that allow the designer to quickly probe the range
 of solutions available within constraints. 
 Returning to the previous spring design example, ODOP might
 deliver a solution with a relatively high stress level (a solution that
 minimizes weight is expected to have stresses that are close to the maximum
 allowable stress or minimum factor of safety constraints). 
 The designer can ask to see a design that reduces stress (at some
 penalty in increased weight, of course), but still meets the goals
 expressed by the various other constraints on the problem.


### Guidance in restructuring goals when satisfactory solutions can't be found

 If ODOP determines that the designer's goals (as expressed by his
 constraints on the problem) cannot be met, it is necessary for the
 designer to restructure the design in some way.  One approach is to
 select stronger (and probably more expensive) materials.  A more likely
 approach is to seek a compromise where one or more of the original
 objectives is sacrificed (for the spring design example, perhaps cycle life) 
 in order to maintain  the others (for example, outside diameter and solid height). 
 ODOP  has a feature that may be used to identify those constraints that are
 most leveraged and guide the designer to restructure his goals in a way
 that is most consistent with his original objectives.


### Material selection tables

 ODOP may contain tables of material properties for many commonly used materials.
 In the spring design example, with most spring materials, 
 allowable stress varies significantly as a function of wire
 diameter.  For this reason, ODOP:Spring recalculates allowable stress and
 factor of safety for each combination of material type and wire size
 evaluated.  These features eliminate the need for the designer to
 refer to tables and charts of material properties.  


### Selection from standard size tables or catalogs of stock designs

 Once a designer has established a custom design that satisfies the objectives, 
 ODOP has a feature that can select from a table of standard sizes.
 In the spring design example, 
 each material can have a unique table of standard wire diameters. 
 Standard wire diameters for both US customary (inch) and metric (mm) units are provided.
 Similarly, a feature is provided to select the closest or otherwise 
 most appropriate design from a catalog of stock designs. 
 The default stock spring catalogs supplied with ODOP:Spring include
 U.S. Military Standard 24585 (SAE-AS24585) for compression springs and
 MS24586 (SAE-AS24586) for extension springs.
 
 
### Save and recovery of designs

 ODOP can save designs into a database (design library) for later recovery. 
 This feature has many uses.  A designer can save a specific design for
 detailed comparison with alternatives generated later.  A design
 investigation can be interrupted to get more information or service other
 requests, then resumed later without the need to repeat prior effort or
 the risk of introducing errors.  Detailed reference information,
 including names and phone numbers, may be saved with each design.


### On-line help

 ODOP maintains its complete user's manual on-line and
 available to the user at all times.  A request for "HELP" will be
 answered with a list of all the features available and all the
 specialized topics for which help is available.  The user may then pursue
 more detailed answers to his questions.  The user can read information at
 his own pace and return to the design process as soon as the desired
 information is obtained.


### Tutorial

 The spring design example comes with carefully structured lessons to help 
 a new user get started quickly. 
 The tutorial will "re-play" any of several pre-arranged
 sessions that are designed to illustrate program capabilities and features.
 Other sessions illustrate problem solving techniques as well as provide
 sample solutions to several generally available reference book problems.
 Detailed comments are imbedded to explain the solution process.


[Help](/docs/Help/index.html)
