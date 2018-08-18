# Release Process:

* Verify Github Milestone issues are completed.
* Ask "Have we done everything on our milestone list?", "Is there anything else we need to do?", and "Are we ready for release?"
* Bring up Google Chrome and enable View Debugger and verify no unexpected console.log output. Test various input and menu functions. 
* Shutdown server and client. In server run "npm test" and verify test cases executed successfully. Then in client run "npm test" and verify test cases executed successfully. 
* Update version.js file to X.Y.Z (for example, 0.4). Commit with message "Update version.js to X.Y.Z" and push to origin. Do a pull to get latest version on all systems. Restart server then client.
* Bring up on Windows under Mcrosoft Edge and verify Help About Software Version is X.Y.Z. Bring up on Windows and Mac OS X under Google Chrome and verify Help About Software Version is X.Y.Z. 
* In git/odop push to Heroku (command: git push heroku master). Verify no error messages during build on heroku. On http://odop.herokuapp.com website is operational and version X.Y.Z displays.
* Create X.Y.Z tag (for example, 0.4). Commit "Release X.Y.Z" and push to origin.
* In Eclipse do a pull, Team > Show in History and verify tag is X.Y.Z (for example, 0.4).
* In Github mark Milestone X.Y.Z closed.

* Discuss next release. what work needs to be done, who does it. IN other words, set the direction for the upcoming milestone.
