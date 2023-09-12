# Development Environment

The following steps set up a MS Windows programming development environment with the necessary tools to communicate, share screens, edit and control source code, compile, run and debug the ODOP software.

Source control:  
Web access to the [GitHub repository](https://github.com/thegrumpys/odop).  

_____

Starting with fresh Windows install

Install Zoom from https://zoom.us


Slack can be used without an install: https://app.slack.com/  
There is no problem being logged in to Slack on multiple computers concurrently.

_____

### NVM

https://github.com/coreybutler/nvm-windows/releases

Download nvm-setup.zip  
UnZip contents  
Execute nvm-setup.exe  
Accept defaults  
Click Install button  
Click Finish  

Open command window  
enter nvm-v  
Observe version  
nvm ls  

nvm install 14  
nvm install 16  
nvm install 18  

nvm use 14  
node -v  

_____

### GIT

Go to: https://git-scm.com/download/win  
Download (Git-2.42.0.2-64-bit.exe)  
Execute  
Accept all defaults  
Install  
Finish  
Test by opening new command window and entering "git"  

_____

### Eclipse  

https://www.eclipse.org/downloads/packages/  
Download installer  
Execute installer  
Choose: Eclipse IDE for Enterprise Java and Web Developers  
Install  
Launch Eclipse  

Window - Show View - Other - Git - Git Repositories and Git Staging  
Open  
Clone a Get Repository  
Select GitHub  
Enter ODOP in search field; press search  
Select the grumpys/odop  
Deselect All; Select master; Next  
Confirm/accept default location (C:\Users\Mike\git\odop)  
Finish  

Create new public / private encryption key or 
copy .ssh directory from old computer to new computer  
This includes id_rsa and id_rsa.pub files.  
No need to copy known_hosts or other files.  

Go to Git Repositories tab in Eclipse  
Right-click ODOP; Select Properties  
at bottom, Modify remote origin url property  
  from: https://github.com/thegrumpys/odop.git  
  to: git@github.com:thegrumpys/odop.git 

File; New; Project ...; General - Project  
Enter project name ODOP  
Uncheck "Use default location"  
Select Browse  
Instead use location: C:\Users\Mike\git\odop  

In Eclipse, test with pushing a trial change:  
Enter passphrase when requested, 
add to the Eclipse secure store, setting up a master password (and challenge questions)  
Verify change successfully pushed.  

_____

### Preparing for Development  

cd git\odop  
npm install  

cd git\odop\client  
npm install  

#### For server:
In Eclipse, in root directory for the server, create .env file  
In Eclipse Project Explorer panel, 
select vertical 3 dot icon, select Filters and Customization...  
uncheck the .* resource entry, click OK to show .env.dist file  
Copy .env.dist contents into .env file and replace @@@ lines with password info  
or  
copy from previous instance.  

#### For client:  
In Eclipse, in client directory,  
Copy .env.dist contents into .env file and 
replace @@@ lines with password info.  
or  
copy entire .env file from a previous instance.  

_____

### Development startup in server command window  

cd git\odop  
npm run harp-compile  
npm run server  
Acknowledge Windows Firewall pop-up  (one-time only)  

_____

### Development startup in client command window  

cd git\odop\client  
npm start



_____

### Heroku  





_____

### MySQL  










