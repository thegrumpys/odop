# Procedure to Process DependaBot Pull Requests

### Overview

DependaBot is a native GitHub tool that automates dependency management and security updates for GitHub based software projects. 
Given the number of third-party dependencies utilized by ODOP, 
DependaBot provides a continuing stream of software updates in the form of Pull Requests.  

### Steps to integrate a DependaBot Pull Request

**Note:** Reduce risk of merge conflicts by processing Pull Requests in chronological order (oldest first). 

1. Go to [GitHub ODOP](https://github.com/thegrumpys/odop)
2. Select **Pull Requests** (third item on main menu)
3. Sort oldest first
4. Select and open a DependaBot Pull Request
5. Click Merge Pull Request - changes applied to master branch
6. Click Confirm Merge - master branch is updated no need to push.

### Steps to confirm no problem stopping launch of the ODOP app

**Note:** Put the pass-phrase in the cut-copy-paste buffer. 

1. Create command windows positioned in server and client directories
2. Launch Eclipse - Switch to master branch and pull
3. git pull (in appropriate command window)
4. npm install (in appropriate command window)
5. npm start (in client command window)
6. Observe no error messages in command window; successful launch of app


