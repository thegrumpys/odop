# Release Process:

A. DEVELOPMENT ENVIRONMENT
1. Verify Github Milestone issues are completed.
1. Ask "Have we done everything on our milestone list?", "Is there anything else we need to do?", and "Are we ready for release?"
1. Make sure your development environment is on branch master.
1. Assume development database has been created by running create.sql.
1. Start server and client under your development environment. If they are already started, log off of Okta and re-log into Okta.
1. If the initial state has changed significantly or the startup files need to be purged. 
To do this compare the current master branch against the previous released commit tag branch and check if any of the client/src/designtypes/.../initialState.js files have changed.
Do a "Load Initial State" followed by a File > SaveAs "Loaded\_Initial\_Startup" to create a non-migrated version of Startup.
Migrate the current "Startup" file followed by a File > Save "Startup" to create a migrated version of Startup. 
Then using mysqldump dump both design files into a load.sql file, and 
compare the two load.sql files to verify that initial state and migration operate exactly the same. If they don't match then repair them until they do.
Finally do a File > Delete "Loaded\_Initial\_Startup".
Migrate all other design files and save them back into themselves using File > Save. 
Then using mysqldump dump the affected design file into a load.sql file. 
Finally, manually edit each one and delete the 'id' field name and 'id' field value (it should be first in each list). 
Commit these changes.
1. Bring up Google Chrome and enable View Console / Debugger. 
1. Test various input and menu functions and verify no unexpected console.log output. Use regular expression search: "^\s*console.log" to find non-commented out console.log lines.
1. Shutdown server and client under your development environment. 
In server, run "npm test" and verify test cases executed successfully. 
Then in client, run "npm test" and verify test cases executed successfully.
1. Update client/src/version.js file to X.Y.Z (for example, 0.4). 
Commit with message "Update version.js to X.Y.Z" and push to origin. 
Do a pull to get latest version on all systems. 
Restart server then client under your development environment.
1. Bring up on Windows under Microsoft Edge and verify Help About Software Version is X.Y.Z. 
Bring up on Windows and Mac OS X under Google Chrome and verify Help About Software Version is X.Y.Z.

B. DO first for STAGING and then do again for PRODUCTION ENVIRONMENTS
1. If not logged into Heroku, go to the Heroku Website and login in.
1. For handling dynamic runtime configuration variables in Heroku only
update Heroku Configuration Variables with JS\_RUNTIME\_TARGET\_BUNDLE to "/app/client/build/static/js/*.js" for staging (heroku-staging), or production (heroku). 
NO entry for Server's .env or Client's .env is needed for JS\_RUNTIME\_TARGET\_BUNDLE for development (localhost).
Do a pull or push to get latest version on all systems.
1. Update Heroku Configuration Variables with Okta REACT\_APP\_ISSUER and REACT\_APP\_CLIENT\_ID for staging (heroku-staging), or production (heroku). 
Update Server's .env and Client's .env with Okta REACT\_APP\_ISSUER and REACT\_APP\_CLIENT\_ID for development (localhost).
Do a pull or push to get latest version on all systems.
1. If the database is brand new and empty, then see [Procedures for creating a new JAWSDB](NewDB) 
to create and format the database tables using the create.sql file. 
Do this to development, test, staging and/or production databases as appropriate.
1. If the database already exists, but no entries exist or must be recreated, then either run the configured ./scripts/load_all.sh script or 
manually run all affected load.sql files to create startup files for each design type in the database. 
Delete any old, invalid or development-only designs if necessary.
1. Update Heroku Configuration Variables with JAWSDB\_URL for staging (heroku-staging), or production (heroku). 
Update Server's .env with JAWSDB\_URL for development (localhost).
Note: See Heroku Dashboard Resources tab for Production JAWS DB has no color; staging is AMBER, test is TEAL, and local/development is CYAN. 
Do a pull or push to get latest version on all systems.
1. Update Heroku Buildpack for staging (heroku-staging), or production (heroku).
1. If not logged into Heroku, login in using the command line "heroku login" which in turns brings up the Heroku Website login page in your browser.
1. In your git/odop directory push to Heroku using the command line: git push heroku-staging master or git push heroku master. 
Verify no error messages during build on heroku. Note: to push a non-master branch, such as 324, assuming 324 is the current branch, issue: git push heroku +HEAD:master.
1. Confirm that the http://odop-staging.herokuapp.com or http://odop.herokuapp.com website is operational and that version X.Y.Z displays.

C. DEVELOPMENT ENVIRONMENT
1. Create X.Y.Z tag (for example, 0.4). 
Commit "Release X.Y.Z" and push to origin.
1. In Eclipse do a pull, Team > Show in History and verify tag is X.Y.Z (for example, 0.4).
1. In Github mark Milestone X.Y.Z closed.

D. FUTURES
1. Discuss the next release, what work needs to be done and who does it. 
In other words, set the direction for the upcoming milestone. 

