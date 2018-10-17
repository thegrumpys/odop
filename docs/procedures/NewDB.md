#### Procedures for creating a new JAWSDB

[Background on JAWSDB](https://devcenter.heroku.com/articles/jawsdb)

Note:  JAWSDB is administered from the Heroku account.   
Once logged in to Heroku select "odop"   
Select 'Configure Add-ons'   
In the add-on entry field enter 'j' (first letter of jaws), then selected JAWSDB MySQL   
On the pop-up, press the "Provision" button   

 . . .   
 
Edit your local (not GitHub) .env file and add a new entry for JAWSDB\_**Color**\_URL   
Caution: The DB username and password are contained in the connection string.   

 . . .   

Run odop/data/create.sql to create the two tables: design and usage_log
Those tables will then exist but be empty.

 . . .   

Run the (three?) load.sql files
That will create the (three?) design types.
