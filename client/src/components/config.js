import runtimeEnv from '@mars/heroku-js-runtime-env';

const env = runtimeEnv(); // Load the env object.

console.log('In config: env.REACT_APP_ISSUER=', env.REACT_APP_ISSUER, 'env.REACT_APP_CLIENT_ID=', env.REACT_APP_CLIENT_ID);
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
