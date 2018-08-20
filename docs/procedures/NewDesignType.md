#### Procedure to implement a new design type 

This entry is a placeholder for documentation on how to implement a new ODOP design type (previously "design problem").

Files required:
* client/src/designtypes/Spring/initialState.js
* client/src/designtypes/Spring/eqnset.js
* client/src/designtypes/Spring/migrate.js
* client/public/designtypes/favicon.icon
* designtypes/load.sql   
   
* startup entry in database
   
Build a new GitHub repository ?
* plug-ins ?

Modify template files:
* Using an existing initialState.js file as an example, modify it to reflect the variables of the new design type.
* Using an existing eqnset.js file as an example, replace equations with the design equations of the new design type.
* Add an icon with the name favicon.icon to client/public/designtypes
* Create a startup entry in the database   
 ---- Make new design type the default   
 ---- Disable access to database server   
 ---- Launch client - observe error message   
 ---- Respond to error message.  initialState will load.   
 ---- Re-enable database access   
 ---- Optionally, make modifications.  SaveAs startup.   

* Create a load.sql file   
 ---- Using an existing load.sql file as an example, overwrite the initialState section with the new initial state json.   
 ---- {need more detail here} ...   

Test.
  