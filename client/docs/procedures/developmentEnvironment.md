# Create ODOP Development Environment

The following steps set up a MS Windows programming development environment with the necessary tools to communicate, share screens, edit and control source code, compile, run and debug the ODOP software. 

ODOP source code is maintained on GitHub. 
Web access to source code, milestones, issues and documentation is available at the ODOP [GitHub repository](https://github.com/thegrumpys/odop).  

____

### Preconditions

These steps assume a start with a fresh Windows install or at least a Windows instance that has not had these utilities previously installed.  

It will be necessary to have or obtain a GitHub account, Heroku account, Okta account with admin privileges and database  provider.   

Anticipate that the user/git/odop directory will require 400 MB or more. 
Once everything is installed, a Windows 11 Virtual machine will consume in excess of 33 GB.

_____

### Communications & screen sharing

#### Developer communications & history log
Slack can be used without an install: https://app.slack.com/  
The existing Slack "workspace" is thegrumpys:  https://thegrumpys.slack.com/   
There is no problem being logged in to Slack on multiple computers concurrently.

#### Screen Sharing
Install Zoom from https://zoom.us

_____

### Encryption keys

#### Create new public / private encryption key   
See: github.com/settings/keys  

**or**   

#### Copy existing key
copy .ssh directory from old computer to new computer  
This includes `id_rsa` and `id_rsa.pub` files.  
No need to copy `known_hosts` or other files.  

_____

### GIT

Go to: https://git-scm.com/download/win  
Download (example: Git-2.42.0.2-64-bit.exe)  
Execute  
Accept all defaults  
Install  
Finish  
Test by opening new command window and entering "git"  

_____

### Eclipse  

#### Install Eclipse

https://www.eclipse.org/downloads/packages/  
Download installer  
Execute installer  
Choose: Eclipse IDE for Enterprise Java and Web Developers  
Install  
Launch Eclipse  

#### Configure Eclipse
(Ed: move this to prepare for NODE development?)  
(Ed: Better highlight server client; get info from current developers)  

Window - Show View - Other - Git - Git Repositories and Git Staging  
Open  
Clone a Get Repository  
Select GitHub  
Enter ODOP in search field; press search  
Select the grumpys/odop  
Next  
Confirm/accept default location (C:\Users\username\git\odop)  
Finish  

Go to Git Repositories tab in Eclipse  
Right-click ODOP; Select Properties  
at bottom, Modify remote origin url property  
**from:** https://github.com/thegrumpys/odop.git  
**to:** git@github.com:thegrumpys/odop.git 

File; New; Project ...; General - Project  
Enter project name ODOP  
Uncheck "Use default location"  
Select Browse  
Instead use location: C:\Users\username\git\odop  

#### Test Eclipse configuration
In Eclipse, test with pushing a trial change:  
Enter passphrase when requested, 
add to the Eclipse secure store, setting up a master password (and challenge questions)  
Verify change successfully pushed.  

#### Configuration change to make Eclipse searches faster  
(See below; must do after npm install)

_____

### NVM  

NVM is used to manage multiple installations of node.js on a Windows computer.  

Starting at:  https://github.com/coreybutler/nvm-windows/releases  

Download nvm-setup.zip  
UnZip contents  
Execute nvm-setup.exe  
Accept defaults  
Click Install button  
Click Finish  

Open command window  
    nvm -v  
Observe version  
    nvm ls  

    nvm install 14  
    nvm install 16  
    nvm install 18  

    nvm use 14  
    node -v  

_____

### Preparing for Development  

These steps are required one time only.  

Note:  We are assuming that an `npm init` step is handled by NVM or is now optional.

In command window:  
    cd git\odop  
    npm install  

    cd git\odop\client  
    npm install  

#### For server:
In Eclipse, in root directory for the server, create .env file  
In Eclipse Project Explorer panel, 
select vertical 3 dot icon, select Filters and Customization...  
uncheck the .* resource entry, click OK to show .env.dist file  
Copy .env.dist contents into .env file and update lines containing @@@ with ID, password, etc. info.  
**or**  
copy the entire .env file from a previous instance.  

#### For client:  
In Eclipse, in client directory, create .env file  
Copy .env.dist contents into .env file and update lines containing @@@ with ID, password, etc. info.  
**or**  
copy the entire .env file from a previous instance.  

_____

### Configuration change to make Eclipse searches faster  

In Eclipse, for node_modules in **both** client and server,
in Eclipse Project Explorer, right-click Properties  
Enable (check in box) attribute "derived".  
Apply and Close  

_____

### Development startup in server command window  

    cd git\odop  
    npm run harp-compile  (first time and after every doc change)  
    npm run server  
Acknowledge Windows Firewall pop-up  (one-time only)  

_____

### Development startup in client command window  

    cd git\odop\client  
    npm start  

_____

### Heroku  

In command window  
**Download Heroku CLI tools**  
npm install -g heroku  
**test:**  
heroku --version  

#### Configure Git to allow heroku and heroku-staging
Bring up command window;   
    cd git\odop 
Run the following two commands (no output is given; just assume it works!)  
Note: These two things are used as part of the [Release Procedure](release.html).  

    git remote add heroku https://git.heroku.com/odop.git  
    git remote add heroku-staging https://git.heroku.com/odop-staging.git  

_____

### MySQL  

To download the administrative GUI utility named "MySQL Workbench":  
https://dev.mysql.com/downloads/workbench/  
The MSI based MySQL Workbench install process prompts for manual installation of the Visual C++ 2019 Redistributable Package.

**From:**  https://dev.mysql.com/doc/workbench/en/wb-installing-windows.html#wb-installing-windows-requirements  
The general MySQL Installer download is available at https://dev.mysql.com/downloads/windows/installer/.  
_The MySQL Installer application can install, upgrade, and manage most MySQL products, including MySQL Workbench. 
Managing all of your MySQL products, including Workbench, with MySQL Installer is the recommended approach. 
It handles all requirements and prerequisites, configurations, and upgrades._

Documentation is installed on the default path:  C:\Program Files (x86)\MySQL\MySQL Documentation 8.0

Configure the home page MySQL Connections from the information contained in the .env file.


#### Setup Path Environment Variable  
It may be helpful to add the MySQL directory to the Windows path. 
Use these steps for Windows 11:  

Under System, click on "About".  
Click on "Advanced system settings".  
Click "Environment Variables...".  
The environment variables panel shows up on the screen. ...  
In System variables, click the New button to add new paths or edit to modify an existing path.  
add:  C:\Program Files\MySQL\MySQL Workbench 8.0  
Click OK and OK  

_____

### Okta  

SpringDesignSoftware.org-dev-729070  

Org URL: https://dev-729070.okta.com  

It is necessary to have an Okta account with administrator privileges.  
The only necessary software configuration happens with npm install.  

_____

### Release Procedure

Test a release to the staging system to confirm that Git & Heroku are configured correctly.  
See: [Release Procedure](release.html)

____

### Ed:  Future enhancements to this article  

Expand this or another article to cover how do you do development.  
Upon change of ... do this ...  
Whenever X happens ... do this ... FAQ

Examples:  
npm run harp-compile  (first time and after every doc change)
Change package.json ... must run npm install  

Use of GitHub Milestones, Issues & Branches
How to check in a file.  

Note: When updating server.js or client no compile requirements because server / client reloads.  The nature of React.

Note:
indent 4 spaces lines that are verbatim to be executed.  

3 column table
 - State at start (command prompt, page name)
 - command syntax
 - expected response  
 
 