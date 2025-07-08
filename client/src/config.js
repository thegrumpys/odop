import runtimeEnv from '@mars/heroku-js-runtime-env';
require('dotenv').config();

var node_env;
var issuer;
var clientId;
var env_types;
var env_type;
var env_name;
var env_units;
var env_view;
var session_refresh;
//console.log('config process.env.NODE_ENV=',process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") { // Are we running on localhost as "development" or "test"?
//  console.log('config process.env.REACT_APP_NODE_ENV=', process.env.REACT_APP_NODE_ENV);
//  console.log('config process.env.REACT_APP_ISSUER=', process.env.REACT_APP_ISSUER);
//  console.log('config process.env.REACT_APP_CLIENT_ID=', process.env.REACT_APP_CLIENT_ID);
//  console.log('config process.env.REACT_APP_DESIGN_TYPES=', process.env.REACT_APP_DESIGN_TYPES);
//  console.log('config process.env.REACT_APP_DESIGN_TYPE=', process.env.REACT_APP_DESIGN_TYPE);
//  console.log('config process.env.REACT_APP_DESIGN_NAME=', process.env.REACT_APP_DESIGN_NAME);
//  console.log('config process.env.REACT_APP_DESIGN_UNITS=', process.env.REACT_APP_DESIGN_UNITS);
//  console.log('config process.env.REACT_APP_DESIGN_VIEW=', process.env.REACT_APP_DESIGN_VIEW);
//  console.log('config process.env.REACT_APP_SESSION_REFRESH=', process.env.REACT_APP_SESSION_REFRESH);
  node_env = process.env.REACT_APP_NODE_ENV || process.env.NODE_ENV;
  env_types = process.env.REACT_APP_DESIGN_TYPES || '["Piston-Cylinder","Solid","Spring/Compression","Spring/Extension","Spring/Torsion"]';
  env_types = JSON.parse(env_types);
  env_type = process.env.REACT_APP_DESIGN_TYPE || 'Spring/Compression';
  env_name = process.env.REACT_APP_DESIGN_NAME || 'Startup';
  env_units = process.env.REACT_APP_DESIGN_UNITS || 'US';
  env_view = process.env.REACT_APP_DESIGN_VIEW || 'Advanced';
  session_refresh = process.env.REACT_APP_SESSION_REFRESH || 3600;
} else { // We are running on Heroku as "production"
  const env = runtimeEnv(); // Load the env object.
//  console.log('config env.REACT_APP_NODE_ENV=', env.REACT_APP_NODE_ENV);
//  console.log('config env.REACT_APP_ISSUER=', env.REACT_APP_ISSUER);
//  console.log('config env.REACT_APP_CLIENT_ID=', env.REACT_APP_CLIENT_ID);
//  console.log('config env.REACT_APP_DESIGN_TYPES=', env.REACT_APP_DESIGN_TYPES);
//  console.log('config env.REACT_APP_DESIGN_TYPE=', env.REACT_APP_DESIGN_TYPE);
//  console.log('config env.REACT_APP_DESIGN_NAME=', env.REACT_APP_DESIGN_NAME);
//  console.log('config env.REACT_APP_DESIGN_UNITS=', env.REACT_APP_DESIGN_UNITS);
//  console.log('config env.REACT_APP_DESIGN_VIEW=', env.REACT_APP_DESIGN_VIEW);
//  console.log('config env.REACT_APP_SESSION_REFRESH=', env.REACT_APP_SESSION_REFRESH);
  node_env = env.REACT_APP_NODE_ENV || env.NODE_ENV;
  env_types =  env.REACT_APP_DESIGN_XXXX || '["Piston-Cylinder","Solid","Spring/Compression","Spring/Extension","Spring/Torsion"]';
  env_types = JSON.parse(env_types);
  env_type = env.REACT_APP_DESIGN_TYPE || 'Spring/Compression';
  env_name = env.REACT_APP_DESIGN_NAME || 'Startup';
  env_units = env.REACT_APP_DESIGN_UNITS || 'US';
  env_view = env.REACT_APP_DESIGN_VIEW || 'Advanced';
  session_refresh = env.REACT_APP_SESSION_REFRESH || 3600;
}

const searchParams = new URLSearchParams(window.location.search);
var prompt = searchParams.get('prompt');
var type = searchParams.get('type');
var name = searchParams.get('name');
var view = searchParams.get('view');
var execute = searchParams.get('execute');
//console.log('config prompt=',prompt);
//console.log('config type=',type);
//console.log('config name=',name);
//console.log('config view=',view);
//console.log('config execute=',execute);
var url_prompt = prompt !== null ? true : false;
var url_type = type !== null ? type : env_type;
var url_name = name !== null ? name : env_name;
var url_view = view !== null ? view : env_view;
var url_execute = execute !== null ? execute : undefined;
//console.log('config node_env=',node_env);
//console.log('config issuer=',issuer);
//console.log('config clientId=',clientId);
//console.log('config env_types=',env_types);
//console.log('config env_type=',env_type);
//console.log('config env_name=',env_name);
//console.log('config env_units=',env_units);
//console.log('config env_view=',env_view);
//console.log('config session_refresh=',session_refresh);
//console.log('config url_prompt=',url_prompt);
//console.log('config url_type=',url_type);
//console.log('config url_name=',url_name);
//console.log('config url_view=',url_view);
//console.log('config url_execute=',url_execute);

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
  env: {
      types: env_types,
      type: env_type,
      name: env_name,
      units: env_units,
      view: env_view,
  },
  session: {
      refresh: session_refresh,
  },
  url: {
      prompt: url_prompt,
      view: url_view,
      type: url_type,
      name: url_name,
      execute: url_execute,
  }
};
