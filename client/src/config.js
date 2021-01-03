import runtimeEnv from '@mars/heroku-js-runtime-env';
require('dotenv').config();

var node_env;
var issuer;
var clientId;
var design_types;
var design_type;
var design_name;
var design_units;
var design_view;
var session_refresh;

console.log('In config.js process.env.NODE_ENV=',process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") { // Are we running on localhost as "development" or "test"?
//  console.log('In config: process.env.REACT_APP_ISSUER=', process.env.REACT_APP_ISSUER, 'process.env.REACT_APP_CLIENT_ID=', process.env.REACT_APP_CLIENT_ID);
  node_env = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV;
  issuer = process.env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
  clientId = process.env.REACT_APP_CLIENT_ID || '{clientId}';
  design_types = process.env.REACT_APP_DESIGN_TYPES || '["Piston-Cylinder","Solid","Spring/Compression","Spring/Extension","Spring/Torsion"]';
  design_types = JSON.parse(design_types);
  design_type = process.env.REACT_APP_DESIGN_TYPE || 'Spring/Compression';
  design_name = process.env.REACT_APP_DESIGN_NAME || 'Startup';
  design_units = process.env.REACT_APP_DESIGN_UNITS || 'US';
  design_view = process.env.REACT_APP_DESIGN_VIEW || 'View0';
  session_refresh = process.env.REACT_APP_SESSION_REFRESH || 3600;
} else { // We are running on Heroku as "production" or "staging"
  const env = runtimeEnv(); // Load the env object.
//  console.log('In config: env.REACT_APP_ISSUER=', env.REACT_APP_ISSUER, 'env.REACT_APP_CLIENT_ID=', env.REACT_APP_CLIENT_ID);
  node_env = env.REACT_APP_NODE_ENV || process.env.NODE_ENV;
  issuer = env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
  clientId = env.REACT_APP_CLIENT_ID || '{clientId}';
  design_types =  env.REACT_APP_DESIGN_XXXX || '["Piston-Cylinder","Solid","Spring/Compression","Spring/Extension","Spring/Torsion"]';
  design_types = JSON.parse(design_types);
  design_type = env.REACT_APP_DESIGN_TYPE || 'Spring/Compression';
  design_name = env.REACT_APP_DESIGN_NAME || 'Startup';
  design_units = env.REACT_APP_DESIGN_UNITS || 'US';
  design_view = env.REACT_APP_DESIGN_VIEW || 'View0';
  session_refresh = env.REACT_APP_SESSION_REFRESH || 3600;
}

console.log('In config.js node_env=',node_env);
//console.log('In config.js issuer=',issuer);
//console.log('In config.js clientId=',clientId);
//console.log('In config.js design_types=',design_types);
//console.log('In config.js design_type=',design_type);
//console.log('In config.js design_name=',design_name);
//console.log('In config.js design_units=',design_units);
//console.log('In config.js design_view=',design_view);
//console.log('In config.js session_refresh=',session_refresh);

export default {
  node: {
    env: node_env,
  },
  oidc: {
    issuer: issuer,
    clientId: clientId,
    redirectUri: window.location.origin + '/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },
  design: {
    types: design_types,
    type: design_type,
    name: design_name,
    units: design_units,
    view: design_view,
  },
  session: {
      refresh: session_refresh,
  }
};
