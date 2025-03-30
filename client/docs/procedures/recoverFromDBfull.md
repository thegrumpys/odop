# Procedures for recovering from a full database

[Background on JAWSDB](https://devcenter.heroku.com/articles/jawsdb)

### Background  
The free JAWSDB databases (Development. Test, Staging) are limited at 5MB.
The paid JAWSDB database (Production) is limited at 50MB.

The symptoms of a full database likely differ depending on the environment (Development versus Production). 

In Development, messages like `ER_USER_LIMIT_REACHED` or `MAX_QUESTIONS` should appear in the server command window.
In each environment, the app may display a red pop-up with words similar to: `INTERNAL SERVER ERROR`.
Similar words should appear in the browser console log for each environment (Development, Staging, Production).  

### Recovery Procedure
 1. Determine which database is full.  
The SQL command **Show Table Status** will display database table sizes.
The **odopDButil** script/batch_file will display database size with the syntax:  
`odopDButil {database} sizelist`

 1. Use a SQL utility to remove (delete) records from one or more tables.
 For example: usage_log.
 
 1. Run a dump_restore script/batch_file.  For example:  
 `odopDButil {database} dump_restore`
 
 1. Reload the app and confirm that operation has been restored.
