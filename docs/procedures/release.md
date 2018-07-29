# Release Process:

* Verify Github Milestone issues are completed.
* Ask "Have we done everything on our milestone list?", "Is there anything else we need to do?", and "Are we ready for release?"
* Update version.js file to X.Y.Z (for example, 0.4). Commit with message "Update version.js to X.Y.Z" and push to origin.
* Bring up under Google Chrome and Microsoft Edge and verify Help About Software Version is X.Y.Z.
* Bring up Google Chrome and enable View Debugger and verify no unexpected console.log output.
* In client and server run "npm test" and verify test cases executed successfully.
* Push to Heroku (command: git push heroku master) and verify that http://pcyl-web.herokuapp.com website operational and version X.Y.Z displays.
* Create X.Y.Z tag (for example, 0.4). Commit "Release X.Y.Z" and push to origin.
* In Github mark Milestone X.Y.Z closed.
