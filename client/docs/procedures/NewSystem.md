# Install a new ODOP system

This procedure describes how to create a completely independent copy of the ODOP application code and design library database. 
Such a new version may be customized for any purpose.

If necessary, install a new [development environment](developmentEnvironment.html).  

Installing a new ODOP system starts with:
* GitHub
* Heroku 

    1. Create Admin User
    1. Create Dyno
    1. Overview: Install Add-ons of JAWS Database: Separate DBs for Production, Staging, Development and Test
    1. Overview: Set Dyno formation to "web: node server.js"
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
    This is refers to three unique Heroku buildpacks. 
        1. The first is https://github.com/heroku/heroku-buildpack-nodejs.git which
        installs Node, builds the server and client for production
        1. The second is https://github.com/thegrumpys/create-react-app-inner-buildpack.git which
        injects the Configuration Variables (see above) into the
        React application at the beginning of runtime, 
        1. The third is https://buildpack-registry.s3.amazonaws.com/buildpacks/heroku-community/nginx.tgz which installs an Nginx webserver.
        This webserver is installed by the build, but is never started for ODOP. 
        It is present for compatibility with the previous version of create-react-app-buildpack and for people who do not have their own webserver.
        ODOP has server.js which is used instead of Nginx. 

* [MySQL database](NewDB.html) 

