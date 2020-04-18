#### initialState, Startup and load.sql

This entry is intended to serve as documentation for the relationships and procedures of initialState.js files, 
startup entries in the database and load.sql files . 
Naming conventions for designs and 
procedures for handling spring design units (US customary inch-pound-second units versus metric units) are described here.

An initialState.js file is required for every design type. 
It contains initialization for Independendent variables, Dependent variables, Calculation Inputs, constraint levels, units and much more.
initialState.js files are created by hand (possibly modifying a previous example).

When operating in the development environment, a "Use initialState" button appears on the promptForDesign modal.
Pushing this button will load the "built-in" initialState.js as opposed to loading a database entry.
The resulting "state" of the design may be modified and then saved (**File : Save As** menu item) as a database entry.   

By convention, every design type will have a database entry named "Startup" that is derived from the corresponding initialState.js file. 
Multi-user support provides "system provided" design entries (null userID) that are read-only. 
These files cannot be selected for deletion. 

load.sql files are created via SQL dump from (potentially multiple) database entries.
These load.sql files can be used to populate a new database or to transfer designs between (development, test, staging and production) databases.

&nbsp;

#### Making changes to initialState.js

These steps apply to the situation where the database has already been initialized
for the design type in question.
Refer to other procedures articles for information on configuring new design types
or installing new ODOP systems or initializing new databases.

1. Make the desired changes to initialState.js
2. Make corresponding entries in migrate.js
3. Click the "Use initialState" button (available in development environment only) when launching the program (promptForDesign modal);   
**File : Save As** on top of the "Startup" entry in the database
4. Dump SQL to a load.sql file in order to provide for creating Startup from scratch in the case of starting with an empty DB   
 \- MySQL Workbench should be able to export the table   
 [From release.md:](release)   
 Using mysqldump dump the affected "Startup" entries into a load.sql file. Finally manually edit each one and delete the 'id' field name and 'id' field value (it should be first in each list). Commit these changes.   
 \- Save to ODOP\designtypes\Spring\ {springtype} \load.sql   
 
Notes:   
Use of separate "development" and "production" databases should
prevent any unintended consequences from incrementing the design model
number in migrate.js. 
Previously, without separate "development" and "production" databases,
after over-writing the Startup database entry with development code, 
the release (Heroku) version of the system would see a future version 
of Startup and respond by using initialState.   

When operating in the development environment,
the **View : Offsets** and **View : SymbolTableOffsets** menu items are enabled.
Start with initialState and then use **View : xxx** as a copy / paste source for the contents of the respective offsets.js and symbol\_table_offsets.js.   

Internally, the code uses the flags in initialState to differientate:
+ Independent Variables (element.type === "equationset" && element.input)   
+ Dependent Variables (element.type === "equationset" && !element.input)   
+ Calculation Inputs (element.type === "calcinput")   
  
&nbsp;

#### Naming conventions for designs

Adopt a convention based on "upper camel case" as defined in [camelCase](https://en.wikipedia.org/wiki/Camel_case) but modified to use an underscore as a major or logical separation where appropriate. 
Thus, expressing "ODOP spring design" in a design name would become: ODOP\_SpringDesign. 
"Carlson p184 metric" would become Carlson_p184Metric. 
The implication is that there should be no spaces within design file names that meet this convention.

&nbsp;

#### Spring design units &nbsp; (US customary inch-pound-second units versus metric units)

In the source code, each of the Spring design types (Compression, Extension & Torsion) has:
 - initialState\_metric_units.js
 - initialState.js
  
 In the database, each of the Spring design types (Compression, Extension & Torsion) has:
 - Startup_Metric
 - Startup
 
 The Spring\Compression design type has additional database entries:
 - Demo
 - HotWound
 - HotWoundMetric
  
 Since multiple designs can be put into a single load.sql file, there is only one load.sql file for each design type.
 
 See issue 338 for details on how Exec macros can be used to create Demo and HotWound from InitialState or Startup.
 HotWoundMetric can be created from Startup_Metric.
  
 