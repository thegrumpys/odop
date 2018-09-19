#### Procedure to implement a new design type 

This entry is a placeholder for documentation on how to implement a new ODOP design type (previously "design problem").
Much work remains before this entry can be considered complete.

Files required for all design types:
* client/src/designtypes/_designName_/initialState.js
* client/src/designtypes/_designName_/eqnset.js
* client/src/designtypes/offsets.js  (optional)
* client/src/designtypes/_designName_/migrate.js
* client/public/designtypes/_designName_/favicon.icon
* designtypes/load.sql
* docs/Help/DesignTypes/_designName_.md 
   
* startup entry in database  (typically created from initialState.js)
   
Additional files may be utilized by coil spring design types:
* mat\_ips.json, mat\_ips\_offsets.js, mat\_cgs.json, mat\_cgs\_offsets.js, etc.
* x\_endtypes.json
* lifetarget.json
* prop_calc.json
* (standard wire sizes table)
* (stock springs catalog)

   
Build a new GitHub repository ?
* plug-ins ?

Modify template files:
* Using an existing initialState.js file as an example, modify it to reflect the variables of the new design type.
* Using an existing eqnset.js file as an example, replace equations with the design equations of the new design type.
* Add an icon with the name favicon.icon to client/public/designtypes
* Create a startup entry in the database   
 ---- When in developer mode, and database access is enables
 ---- Start from initialState   
 ---- Optionally, make modifications.  
 ---- SaveAs startup.   

* Create a load.sql file   
 ---- Using an existing load.sql file as an example, overwrite the initialState section with the new initial state json.   
 ---- {need more detail here} ...   

Test.
  
Notes as of early September, 2018 ...

The replacement for CONTNT is named init.js.  It is called on every change to a "Calculation Input" (every keystroke).

Regarding properties of Elements (entries, members, variables) in initialState.js:
"input": true,   
"equationset": true,   
"hidden": false   

Elements with the property ("input": true) are inputs to the design equations and go into the p vector. 
Fixed elements are compressed out and not operated on by Search.
Elements with the property ("Input": false) are output from (modified by) either init.js or eqnset.js and go into the x vector.
The d vector has been eliminated.  Those elements are now distributed between the p and x vectors.
The current implementation for the compression spring design type has essentially all of the 
former members of the d vector appearing as elements in x.
This is partially for simplicity.
Note that changes to the p vector are not saved into the state of the design. 
Thus, unexpected results (stale data) can occur if elements are moved into p and they later change.
This stale data issue is not a concern for elements of x.

Elements with the property ("equationset": true), are fixable and constrainable ("unrestricted" in the terminology above).
Elements with the property ("equationset": false), are members of the previous d vector ("restricted" in the previous terminology).

Elements with the property ("hidden": true) are not visible in the user interface.

**The rules** for defining elements (entries, members, variables) in initialState.js:   

Any variable on the left of an equals sign in either init.js or eqnset.js **must** be ("input": false) ... in the x vector.

Any variable appearing **only** on the right of an equal sign in both init.js and eqnset.js may be ("input": true) ... in the p vector.
Note that x variables may also appear on the right of an equals sign.
This has no relevance to their assignment as ("input": false).
When in doubt, it is generally safe (safer) to assign an element as ("input": false).   

  
  