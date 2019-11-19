import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv(); // Load the env object.

//const ISSUER = process.env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
//const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '{clientId}';

//const ISSUER = 'https://dev-729070.okta.com/oauth2/default';
//const CLIENT_ID = '0oa1s8kbaxJR4O7z7357'; // For heroku production
//const CLIENT_ID = '0oa1s9izxgX3DHecg357'; // For heroku-staging
//const CLIENT_ID = '0oa1itosqdQvfGNMD357'; // For localhost development

const ISSUER = env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const CLIENT_ID = env.REACT_APP_CLIENT_ID || '{clientId}';

export default {
  oidc: {
    issuer: ISSUER,
    clientId: CLIENT_ID,
    redirectUri: window.location.origin + '/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },
};
