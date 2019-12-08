# Release Process:

DEVELOPMENT ENVIRONMENT
* Verify Github Milestone issues are completed.
* Ask "Have we done everything on our milestone list?", "Is there anything else we need to do?", and "Are we ready for release?"
* Make sure your development environment is on branch master.
* Assume development database has been created by running create.sql.
* Start server and client under your development environment. 
* If the initial state has changed significantly or the startup files need to be purged, then create load.sql files for each affected design type. 
Do a "Load Initial State" followed by a File > Save "Startup". 
Then using mysqldump dump the affected "Startup" entries into a load.sql file. 
Finally, manually edit each one and delete the 'id' field name and 'id' field value (it should be first in each list). 
Commit these changes.
* Bring up Google Chrome and enable View Console / Debugger. 
* Test various input and menu functions and verify no unexpected console.log output.
* Shutdown server and client under your development environment. 
In server, run "npm test" and verify test cases executed successfully. 
Then in client, run "npm test" and verify test cases executed successfully.
* Update client/src/version.js file to X.Y.Z (for example, 0.4). 
Commit with message "Update version.js to X.Y.Z" and push to origin. 
Do a pull to get latest version on all systems. 
Restart server then client under your development environment.
* Bring up on Windows under Microsoft Edge and verify Help About Software Version is X.Y.Z. 
Bring up on Windows and Mac OS X under Google Chrome and verify Help About Software Version is X.Y.Z.

DO first for STAGING and then do again for PRODUCTION ENVIRONMENTS
* For handling dynamic runtime configuration variables in Heroku only
update Heroku Configuration Variables with JS\_RUNTIME\_TARGET\_BUNDLE to "/app/client/build/static/js/*.js" for production (heroku), or staging (heroku-staging). 
NO entry for .env and client/.env is needed for JS\_RUNTIME\_TARGET\_BUNDLE for development (localhost).
Do a pull or push to get latest version on all systems.
* Update Heroku Configuration Variables with Okta REACT\_APP\_ISSUER and REACT\_APP\_CLIENT\_ID for production (heroku), or staging (heroku-staging). 
Update .env and client/.env with Okta REACT\_APP\_ISSUER and REACT\_APP\_CLIENT\_ID for development (localhost).
Do a pull or push to get latest version on all systems.
* If the database is brand new and empty, then see [Procedures for creating a new JAWSDB](NewDB) 
to create and format the database tables using the create.sql file. 
Do this to development, test, staging and/or production databases as appropriate.
* If the database already exists, but no entries exist or must be recreated, then either run the configured ./scripts/load_all.sh script or 
manually run all affected load.sql files to create startup files for each design type in the database. 
Delete any old, invalid or development-only designs if necessary.
* Update Heroku Configuration Variables with JAWSDB\_URL for production (heroku), or staging (heroku-staging). 
Update .env with JAWSDB\_URL for development (localhost).
Do a pull or push to get latest version on all systems.
* In git/odop push to Heroku (command: git push heroku master or git push heroku-staging master). 
Verify no error messages during build on heroku.
* Confirm that the http://odop.herokuapp.com website is operational and that version X.Y.Z displays.

DEVELOPMENT ENVIRONMENT
* Create X.Y.Z tag (for example, 0.4). 
Commit "Release X.Y.Z" and push to origin.
* In Eclipse do a pull, Team > Show in History and verify tag is X.Y.Z (for example, 0.4).
* In Github mark Milestone X.Y.Z closed.

* Discuss the next release, what work needs to be done and who does it. 
In other words, set the direction for the upcoming milestone. 

