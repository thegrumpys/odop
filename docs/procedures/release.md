# Release Process:

* Ask "Have we done everything on our milestone list?", "Is there anything else we need to do?", and "Are we ready for release?"
* Run "npm run coverage" and verify test cases executed successfully.
* Push to Heroku (command: git push heroku master) and verify that http://pcyl-web.herokuapp.com website operational.
* Create X.Y.Z tag (for example, 0.4). Commit and push.
* In Github mark Milestone closed.
