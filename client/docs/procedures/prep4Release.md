# Prepare for release

This entry describes steps that should be executed prior to release of a new version of the ODOP app. 
These steps are somewhat independent of the actual release procedure and 
can be optionally executed in advance to make the actual release activity shorter and less prone to distraction or failure.  

1. Create an issue providing a branch in which to make these changes. This issue is to capture test results from below and any errors / fixes during release. Set title to "Release Major.Minor.Patch" 

1. Run test automation
    1. In server, run "npm test" and verify test cases executed successfully. Repair errors or update tests to run successfully. 
    1. In client, run "npm test" and verify test cases executed successfully. Repair errors or update tests to run successfully.  
    1. Save results of performance (duration) in:  
`/ODOP/client/src/__test__/test-results/test_results_Major_Minor_Patch.txt`.   
For example: `test_results_5_1_0.txt`
        1. Update performance summary .csv file with results from the tests above.
    
1. Test For Console Output  
Bring up Google Chrome and enable View Console / Debugger.  
Test various input and menu functions and verify no unexpected console.log output.   
   
   Use regular expression search: "`^\s*console\.`" to find non-commented out console.log lines.
   Most console.log output is acceptable in: 
     * `client/public/dynoLoading.js` 
     * `client/src/__test__/*.*` 
     * `client/src/menus/View/ViewExecuteToTest.jsx` 
     * `client/src/store/middleware/dispatcher.js` 
     * `client/src/store/middleware/pxUpdateObjectiveValue.js` 
     * `client/src/store/middleware/seek.js` 
     * `client/src/store/middleware/updateObjectiveValue.js` 
     * `client/src/store/reducers.js` 
     * `client/src/logUsage.js` 
     * `client/src/registerServiceWorker.js` 
     * `scripts/build_index.js` 
     * `scanner.js` 
     * `server.js` 

<!---
Commented out pending review - Did I get it right?
1. Run the production build in a test environment to confirm that things are synchronized 
with the Heroku build environment and assure that the build process goes smoothly during the actual release. 
One possibility is to build into the staging system with the Heroku environment variables set to "production".  
 -->
