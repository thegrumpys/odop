# Prepare for Development

This entry describes steps that should be executed at the beginning of a new release cycle. 
Most of these steps have been extracted from an earlier version of the [Release Procedure](release.html).  

For background regarding "Major.Minor.Patch" see: [ODOP version numbering](/docs/design/Guidelines.html#verNum)

1. Discuss the next release, what work needs to be done and who does it. 
   In other words, set the direction for the upcoming milestone.

1. Create an issue providing a branch in which to make the following changes.

1. Check for and deal with security vulnerabilities.
See GitHub Dependabot alerts. 
Issue the command:   
`npm audit fix`   
when positioned in the server directory and again when positioned in the client directory.

1. Use the Heroku console settings tab to check the currently configured version of the Heroku stack. 
   Upgrade the Heroku stack for the staging or production system as appropriate. 
   The change will not be final until after the next deployment.  
