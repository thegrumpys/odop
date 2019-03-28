#### initialState, startup and load.sql

This entry is intended to serve as documentation for the relationships and procedures of initialState.js files, 
startup entries in the database and load.sql files .
Procedures for handling spring design units (US customary inch-pound-second units versus metric units) are described here.

An initialState.js file is required for every design type. 
It contains initialization for Independendent variables, Dependent variables, Calculation inputs, constraint levels, units and much more.
initialState.js files are created by hand (possibly modifying a previous example).

When operating in the development environment, a "Use initialState" button appears on the promptForDesign modal.
Pushing this button will load the "built-in" initialState.js as opposed to loading a database entry.
The resulting "state" of the design may be modified and then saved (**File : Save As** menu item) as a database entry.   

By convention, every design type will have a database entry named "startup" that is derived from the corresponding initialState.js file. 
The "startup" entry is unique in that it is protected from deletion by the **File : Delete** menu entry.

load.sql files are created via SQL dump from (potentially multiple) database entries.
These load.sql files can be used to populate a new database or to transfer designs from the development database to the production database.

&nbsp;

#### Making changes to initialState.js

These steps apply to the situation where the database has already been initialized
for the design type in question.
Refer to other procedures articles for information on configuring new design types
or installing new ODOP systems or initializing new databases.

1. Make the desired changes to initialState.js
2. Make corresponding entries in migrate.js
3. Click the "Use initialState" button (available in development environment only) when launching the program;   
**File : Save As** on top of the "startup" entry in the database
4. Dump SQL to a load.sql file in order to provide for creating startup from scratch in the case of starting with an empty DB   
 \- MySQL Workbench should be able to export the table   
 [From release.md:](release)   
 Using mysqldump dump the affected "startup" entries into a load.sql file. Finally manually edit each one and delete the 'id' field name and 'id' field value (it should be first in each list). Commit these changes.   
 \- Save to ODOP\designtypes\Spring\ {springtype} \load.sql   
 
Notes:   
Use of separate "development" and "production" databases should
prevent any unintended consequences from incrementing the design model
number in migrate.js. 
Previously, without separate "development" and "production" databases,
after over-writing the startup database entry with development code, 
the release (Heroku) version of the system would see a future version 
of startup and respond by using initialState.   

When operating in the development environment,
the **View : Offsets** menu item is enabled.
Start with initialState and then use **View : Offsets** as a copy / paste source for the contents of offsets.js.   

&nbsp;

#### Spring design units &nbsp; (US customary inch-pound-second units versus metric units)

In the source code, each of the Spring design types (Compression, Extension & Torsion) has:
 - initialState\_metric_units.js
 - initialState\_US-ips_units.js
 - initialState.js
 
 The contents of one of the unit-specific files can be copied over initialState.js in order to work with those units.
 Thus, while there are three files, only two are unique.
 
 In the database, each of the Spring design types (Compression, Extension & Torsion) has:
 - startup_metric
 - startup_US-ips
 - startup
 
 As with initialState, the contents of one of the unit-specific entries can be copied over startup in order to work with those units.
 Thus, while there are three database entries, only two are unique.
 
 The Spring\Compression design type has additional database entries:
 - Demo
 - Hot_Wnd
 - Hot\_Wnd_metric
  
 Since multiple designs can be put into a single load.sql file, there is only one load.sql file for each design type.
 
 
 