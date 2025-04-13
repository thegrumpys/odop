# Prepare for Development

This entry describes steps that should be executed at the beginning of a new release cycle. 
Most of these steps have been extracted from an earlier version of the [Release Procedure](release.html).  

For background regarding "Major.Minor.Patch" see: [ODOP version numbering](/docs/design/Guidelines.html#verNum)

1. Discuss the next release, what work needs to be done and who does it. 
   In other words, set the direction for the upcoming milestone.

1. Create an issue named "Release {Major.Minor.Patch}" providing a branch in which to make procedural 
   and infrastructure updates associated with the release. 
   For example:

    1. Check for and deal with security vulnerabilities.  
    Go to GitHub Dependabot alerts in the GitHub **Pull Requests** menu and process any dependabot entries to Bump/Update dependency versions.  
    Work from oldest to newest.  
    Add comment: `@dependabot rebase`
    
    1. Issue the command:  `npm audit fix`   
    when positioned in the server directory and again when positioned in the client directory.  
    Note that `npm audit fix --force` has a history of creating more problems than it solves.  
    
    1. Use the Heroku console settings tab to check the currently configured version of the Heroku stack. 
    Upgrade the Heroku stack for the staging or production system as appropriate. 
    The change will not occur until after the next deployment.  

    1. Run: `npx update-browserslist-db@latest` 

    To-Do notes and other reminders related to the build process and making this release can be captured as comments to the issue.
    