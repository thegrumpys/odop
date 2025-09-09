# Post Development

This entry describes steps that should be executed at the completion of development, 
prior to release of a new version of the ODOP app. 
These steps are somewhat independent of the actual release procedure and 
can be optionally executed in advance to make the actual release activity shorter and less prone to distraction or failure.  

1. Review impact of this release's feature changes on the Tutor & Demo scripts and Help topics. 
If appropriate, create a new issue, make changes and merge to master.  

1. If it doesn't already exist, create an issue providing a branch in which to make postDevelopment changes. 
This issue is to capture test results from below and any errors / fixes during release. Set title to "Release Major.Minor.Patch"  

1. Run test automation on BDW and MKM machines. Do client testing for performance on BDW machine. 
    1. In server, run "npm test" and verify test cases executed successfully. Repair errors or update tests to run successfully. 
    1. In client, run "npm test" and verify test cases executed successfully. Repair errors or update tests to run successfully.  
    1. Save results of performance (duration) in:  
`/ODOP/client/src/__test__/test-results/test_results_Major_Minor_Patch.txt`.   
For example: `test_results_5_1_0.txt`
        1. Update performance summary .csv file with results from the tests above.
    
1. Test For Console Output  
Bring up Google Chrome and enable View Console / Debugger.  
Test various input and menu functions and verify no unexpected console.log output.   
   
   Use regular expression search: "`^\s*console\.log`" to find non-commented out console.log lines.
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
     * `scripts/import-okta-csv.js`
     * `scripts/scanner.js` 
     * `server.js` 
