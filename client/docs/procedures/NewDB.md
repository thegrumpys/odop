# Procedures for creating a new JAWSDB

[Background on JAWSDB](https://devcenter.heroku.com/articles/jawsdb)

Note:  JAWSDB is administered from the Heroku account.   
Once logged in to Heroku select "odop"   
Select 'Configure Add-ons'   
In the add-on entry field enter 'j' (first letter of jaws), then selected JAWSDB MySQL   
On the pop-up, press the "Provision" button   

 . . .   
 
Edit your local .env file and add a new entry for JAWSDB\_**xxxx**\_URL   
Note:  
See Heroku Dashboard Resources tab for JAWS DB:  
Old Production is prntcdsszgqddxh8; New Production is   vsm51n2ipc6nvcy6; staging is d9bw76r236auqu3s, test is cmyr2m3s55btzgvr, and local/development is s6v0edrsu4v1u49m.   
   
Previously: Old Production has no color; staging is AMBER, test is TEAL, and local/development is CYAN.   

Easier to read summary:  

Role               | Plan     | JawsName | DB name
---                | ---      | ---      | ---
Local              | &nbsp;   | &nbsp;   | odop
Unused             | Kitefin  | RIGID    | pgyb3toxyk59fz2w
Development        | Kitefin  | GRACEFUL | s6v0edrsu4v1u49m
Test               | Kitefin  | OPAQUE   | cmyr2m3s55btzgvr
Staging            | Kitefin  | ROUND    | d9bw76r236auqu3s
Old Production     | ?        |was CONVEX| prntcdsszgqddxh8
New Production     | Leopard  | CUBED    | vsm51n2ipc6nvcy6
? what is this ?   | ?        | ?        | l6yfarb1wjm4a9ri

Kitefin plan is limited at    5 MB (0.005 GB)  
Leopard plan is limited at 1000 MB (1.0 GB) 

Caution: The DB username and password are contained in the connection string.   
Note ".env" appears in .gitignore, editing .env will only modify the local version of the file. 

 . . .   

Run odop/data/create.sql to create the two tables: design and usage_log. 
{Authentication tables?}  
Those tables will then exist but be empty.

 . . .   

As appropriate (see reference to load_all.sh in [Release procedure](release.html)), 
run the (five?) load.sql files to populate designs for the (five?) design types.

