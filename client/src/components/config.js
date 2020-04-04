import runtimeEnv from '@mars/heroku-js-runtime-env';
require('dotenv').config();

var issuer;
var clientId;
var design_type;
var design_name;
var session_refresh;

if (process.env.NODE_ENV !== "production") { // Are we running on localhost?
//  console.log('In config: process.env.REACT_APP_ISSUER=', process.env.REACT_APP_ISSUER, 'process.env.REACT_APP_CLIENT_ID=', process.env.REACT_APP_CLIENT_ID);
  issuer = process.env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
  clientId = process.env.REACT_APP_CLIENT_ID || '{clientId}';
  design_type = process.env.REACT_APP_DESIGN_TYPE || 'Spring/Compression';
  design_name = process.env.REACT_APP_DESIGN_NAME || 'Startup';
  session_refresh = process.env.REACT_APP_SESSION_REFRESH || 60;
} else { // We are running on Heroku
  const env = runtimeEnv(); // Load the env object.
//  console.log('In config: env.REACT_APP_ISSUER=', env.REACT_APP_ISSUER, 'env.REACT_APP_CLIENT_ID=', env.REACT_APP_CLIENT_ID);
  issuer = env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
  clientId = env.REACT_APP_CLIENT_ID || '{clientId}';
  design_type = env.REACT_APP_DESIGN_TYPE || 'Spring/Compression';
  design_name = env.REACT_APP_DESIGN_NAME || 'Startup';
  session_refresh = env.REACT_APP_SESSION_REFRESH || 60;
}

export default {
  oidc: {
    issuer: issuer,
    clientId: clientId,
    redirectUri: window.location.origin + '/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },
  design: {
    type: design_type,
    name: design_name
  },
  session: {
      refresh: session_refresh
  }
};
