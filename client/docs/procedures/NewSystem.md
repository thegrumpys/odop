# Install a new ODOP system

This entry is a placeholder for instructions on the steps required to deploy a new ODOP system.   

This procedure will allow a completely independent copy of the ODOP application code and design library database.
Such a new version may be customized for any purpose.

If necessary, install a new [development environment](developmentEnvironment.html).  

Installing a new ODOP system starts with:
* GitHub
* Heroku ?

    1. Create Admin User
    1. Create Dyno
    1. Overview: Install Add-ons of JAWS Database: Separate DBs for Production, Staging, Development and Test
    1. Overview: Set Dyno formation to "web node server.js"
    1. Deploy: Deployment method = Heroku Git
    1. Settings: Config Vars: for example, the following Keys and their Values
        1. JAWSDB_URL
        1. JS_RUNTIME_TARGET_BUNDLE
        1. NODE_ENV
        1. REACT_APP_CLIENT_ID
        1. REACT_APP_DESIGN_NAME
        1. REACT_APP_DESIGN_TYPE
        1. REACT_APP_DESIGN_TYPES
        1. REACT_APP_DESIGN_UNITS
        1. REACT_APP_DESIGN_VIEW
        1. REACT_APP_ISSUER
        1. REACT_APP_NODE_ENV
        1. REACT_APP_SESSION_REFRESH
    1. Settings: Buildpacks: https://github.com/thegrumpys/create-react-app-buildpack.git.
    This is refers to two unique Heroku buildpacks. The first is the one mentioned above which
    installs Node, builds the server and client for production, injects the Configuration Variables (see above) in the
    React application (via a second buildpack: https://github.com/thegrumpys/create-react-app-inner-buildpack.git), 
    and installs & starts a Nginx webserver.

* MySQL database ?

