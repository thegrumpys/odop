#### Making changes to initialState.js

These steps apply to the situation where the database has already been initialized
for the design type in question.
Refer to other procedures articles for information on configuring new design types
or installing new ODOP systems or initializing new databases.

1. Make the desired changes to initialState.js
2. Make a corresponding entry in migrate.js
3. Click the "Use initialState" button (available in development environment only) when launching the program;   
**File : Save As** on top of the "startup" entry in the database
4. Dump SQL to create startup from scratch if starting with an empty DB   
 \- MySQL workbench should be able to export the table   
 &nbsp; &nbsp; (need more detail on settings here)   
 \- Save to master\data\designtypes\Spring\load.sql   
 
Note:   
Use of separate "development" and "production" databases should
prevent any unintended consequences from incrementing the design model
number in migrate.js. 
The concern is that without separate "development" and "production" databases,
after over-writing the startup database entry with development code, 
the release (Heroku) version of the system would see a future version 
of startup and respond by using initialState.

