# Release Process:

DEVELOPMENT ENVIRONMENT
* Verify Github Milestone issues are completed.
* Ask "Have we done everything on our milestone list?", "Is there anything else we need to do?", and "Are we ready for release?"
* Make sure your development environment is on branch master.
* Assume development database has been created by running create.sql.
* Start server and client under your development environment. 
* If the initial state has changed significantly or the startup files need to be purged, then create load.sql files for each affected design type. Do a "Load Initial State" followed by a File > Save "Startup". Then using mysqldump dump the affected "Startup" entries into a load.sql file. Finally manually edit each one and delete the 'id' field name and 'id' field value (it should be first in each list). Commit these changes.
* Bring up Google Chrome and enable View Debugger and verify no unexpected console.log output. 
* Test various input and menu functions.
* Shutdown server and client under your development environment. In server run "npm test" and verify test cases executed successfully. Then in client run "npm test" and verify test cases executed successfully.
* Update client/src/version.js file to X.Y.Z (for example, 0.4). Commit with message "Update version.js to X.Y.Z" and push to origin. Do a pull to get latest version on all systems. Restart server then client under your development environment.
* Bring up on Windows under Microsoft Edge and verify Help About Software Version is X.Y.Z. Bring up on Windows and Mac OS X under Google Chrome and verify Help About Software Version is X.Y.Z.

PRODUCTION
* If the database is brand new and empty, then see [Procedures for creating a new JAWSDB](NewDB) to create and format the database tables using create.sql file. Do this to development, test and/or production databases.
* If the database already exists, but no the entries exist or must be recreated, then either run the configured ./scripts/load_all.sh script or manually run all affected load.sql files to create "startup" files in the database. Delete any old, invalid or development-only designs if necessary.
* In git/odop push to Heroku (command: git push heroku master). Verify no error messages during build on heroku.
* On http://odop.herokuapp.com website is operational and version X.Y.Z displays.

DEVELOPMENT ENVIRONMENT
* Create X.Y.Z tag (for example, 0.4). Commit "Release X.Y.Z" and push to origin.
* In Eclipse do a pull, Team > Show in History and verify tag is X.Y.Z (for example, 0.4).
* In Github mark Milestone X.Y.Z closed.

* Discuss next release. what work needs to be done, who does it. IN other words, set the direction for the upcoming milestone.
