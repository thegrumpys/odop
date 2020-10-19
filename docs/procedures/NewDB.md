#### Procedures for creating a new JAWSDB

[Background on JAWSDB](https://devcenter.heroku.com/articles/jawsdb)

Note:  JAWSDB is administered from the Heroku account.   
Once logged in to Heroku select "odop"   
Select 'Configure Add-ons'   
In the add-on entry field enter 'j' (first letter of jaws), then selected JAWSDB MySQL   
On the pop-up, press the "Provision" button   

 . . .   
 
Edit your local .env file and add a new entry for JAWSDB\_**Color**\_URL   
   Note: See Heroku Dashboard Resources tab for JAWS DB: Production is prntcdsszgqddxh8; staging is d9bw76r236auqu3s, test is cmyr2m3s55btzgvr, and local/development is s6v0edrsu4v1u49m.   
Caution: The DB username and password are contained in the connection string.   
Note ".env" appears in .gitignore, editing .env will only modify the local version of the file. 

 . . .   

Run odop/data/create.sql to create the two tables: design and usage_log.   
Those tables will then exist but be empty.

 . . .   

As appropriate (see reference to load_all.sh in [Release procedure](release)), 
run the (five?) load.sql files to populate designs for the (five?) design types.

