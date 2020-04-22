# Release Process:

This entry describes the steps necessary to make a new ODOP "release".
Specifically, this is the process to publish the current development version to Heroku.

Ideally, any system downtime affecting the production system should be announced in advance via docs/About/messageOfTheDay.md 

For background regarding "Major.Minor.Patch" see: [ODOP version numbering](../design/VersionNumbers)   

&nbsp;

A. **DEVELOPMENT environment**  

1. Verify Github Milestone issues are completed.  Ask:   
   "Have we done everything on our milestone list?"   
   "Is there anything else we need to do?"   
   "Are we ready for release?"   
&nbsp;
1. Make sure your development environment is on branch master.   
&nbsp;   
1. If this is a "Patch" release with no migrate requirement, initialState impact or environment variable changes,
skip forward to [Test For Console Output](release#test4consoleoutput).   
To confirm, 
compare the current master branch against the previous released commit tag branch and check if any of the client/src/designtypes/.../initialState.js files have changed.   
&nbsp;   
1. If the database is brand new and empty, then see [Procedures for creating a new JAWSDB](NewDB) 
to create and format the database tables using the create.sql file.   
   Do this to development, test, staging and/or production databases as appropriate.   
1. Start server and client under your development environment.   
   If they are already started, log off of Okta and re-log into Okta to ensure the session is valid and not at risk of time-out.   
&nbsp;   
1. Do a "Load Initial State" followed by a File : SaveAs "Loaded\_Initial\_Startup" to create a non-migrated version of Startup.   
1. Migrate the current "Startup" file followed by a File : SaveAs "Startup" to create a migrated version of Startup.   
1. Using mysqldump, dump both design files into a load.sql file   
   Compare the two load.sql files to verify that initial state and migration operate exactly the same.   
   If they don't match then repair them until they do.
&nbsp;   
1. File : Delete "Loaded\_Initial\_Startup".   
1. Migrate all other design files and save them back into themselves using File : Save.   
1. Use MySqlDump, dump the affected design file into a load.sql file.   
1. Finally, manually edit each one and delete the 'id' field name and 'id' field value (it should be first in each list).   
1. Commit these changes.   
&nbsp;
1. If there are environment variable changes, update Server's .env and Client's .env with   
   REACT\_APP\_ISSUER   
   REACT\_APP\_CLIENT\_ID   
   REACT\_APP\_DESIGN\_TYPE   
   REACT\_APP\_DESIGN\_NAME   
   REACT\_APP\_SESSION\_REFRESH   
   for development (localhost).  
1. Do a pull or push to get latest version on all systems.   

<a id="test4consoleoutput"></a>   

1. **Test For Console Output** &nbsp; Bring up Google Chrome and enable View Console / Debugger.   
   Test various input and menu functions and verify no unexpected console.log output.  
   Use regular expression search: "^\s*console.log" to find non-commented out console.log lines.   
1. Shutdown server and client under your development environment.  
&nbsp;   
1. In server, run "npm test" and verify test cases executed successfully. 
1. In client, run "npm test" and verify test cases executed successfully.   
&nbsp;   
1. Update client/src/version.js file to Major.Minor.Patch (for example: 2.3.1). 
1. Commit with message "Update version.js to Major.Minor.Patch" and push to origin. 
1. Pull to get latest version on all systems. 
1. Restart server then client under your development environment.
1. Bring up on Windows under Microsoft Chromium Edge and verify Help : About Software Version is as expected (Major.Minor.Patch).   
   Bring up on Windows and Mac OS X under Google Chrome and verify Help : About Software Version is as expected.

&nbsp;   

B. **DO first for STAGING and then do again for PRODUCTION environments**
1. If no changes to dynamic runtime configuration variables skip forward to [Database Stuff](release#databaseStuff).   
&nbsp;   
1. If not logged into Heroku, go to the Heroku Website and login in.   
1. For handling dynamic runtime configuration variables in Heroku only   
   Update Heroku Configuration Variables with JS\_RUNTIME\_TARGET\_BUNDLE to "/app/client/build/static/js/*.js" for staging (heroku-staging), or production (heroku).  
   NO entry for Server's .env or Client's .env is needed for JS\_RUNTIME\_TARGET\_BUNDLE for development (localhost).   
   Do a pull or push to get latest version on all systems.   
&nbsp;   
1. Update Heroku Configuration Variables with   
   REACT\_APP\_ISSUER   
   REACT\_APP\_CLIENT\_ID    
   REACT\_APP\_DESIGN\_TYPE   
   REACT\_APP\_DESIGN\_NAME   
   REACT\_APP\_SESSION\_REFRESH   
   for staging (heroku-staging), or production (heroku).   

<a id="databaseStuff"></a>   

1. **Database Stuff** &nbsp; If this is a "Patch" release or otherwise has no database impact, skip forward to [Publish to Heroku](release#publish2Heroku).   
&nbsp;   
1. If the database is brand new and empty, then see [Procedures for creating a new JAWSDB](NewDB) 
to create and format the database tables using the create.sql file.   
   Do this for staging and/or production databases as appropriate.   
1. Check the size of the production database as compared to capacity limits (5Mb for JAWSDB free plan).   
   If appropriate, dump to off-line storage and re-initialize the log_Usage table.
&nbsp;   
1. Before operating on the production system database, check for active users on the production system; put the production system in maintenance mode.   
   To enable maintenance mode:  heroku maintenance:on -a odop
1. If the production database contains user generated designs, back it up.
   See: [Heroku docs](https://devcenter.heroku.com/articles/jawsdb#database-backups)   
&nbsp;   
1. If the database already exists but no entries exist or must be recreated, then either   
   run the configured ./scripts/load_all.sh script   
   or   
   manually run all affected load.sql files to create startup files for each design type in the database.   
1. Delete any old, invalid or development-only designs if necessary.  
&nbsp;   
1. Update Heroku Configuration Variables with JAWSDB\_URL for staging (heroku-staging), or production (heroku).   
   Update Server's .env with JAWSDB\_URL for development (localhost).   
   Note: See Heroku Dashboard Resources tab for JAWS DB: Production has no color; staging is AMBER, test is TEAL, and local/development is CYAN.   
   Do a pull or push to get latest version on all systems.
1. Update Heroku Buildpack for staging (heroku-staging), or production (heroku).   

<a id="publish2Heroku"></a>   

1. **Publish to Heroku** &nbsp; If not logged into Heroku, login in using the command line "heroku login" which in turn brings up the Heroku website login page in your browser.   
1. Shutdown server and client under your development environment.  
&nbsp;   
1. In your git/odop directory push to Heroku using the command line:   
   git push heroku-staging master   
   or   
   git push heroku master.   
   Verify no error messages during build on heroku.   
   Note: to push a non-master branch, such as 324, assuming 324 is the current branch, issue: 
   git push heroku +HEAD:master.  
&nbsp;   
1. Disable maintenance mode:  heroku maintenance:off -a odop
1. Confirm that the http://heroku-staging.herokuapp.com or http://odop.herokuapp.com website is operational and that version Major.Minor.Patch displays.  

&nbsp;   

C. **DEVELOPMENT ENVIRONMENT**
1. Create Major.Minor.Patch tag (for example, 3.2.1).   
   Commit "Release Major.Minor.Patch" and push to origin.
1. In Eclipse do a pull, Team > Show in History and verify tag is Major.Minor.Patch (for example, 2.3.1).
1. In Github mark Milestone Major.Minor.Patch closed.  

&nbsp;   

D. **FUTURES**
1. Discuss the next release, what work needs to be done and who does it.   
   In other words, set the direction for the upcoming milestone.   

