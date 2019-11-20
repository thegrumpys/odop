if (process.env.NODE_ENV == "development") {
  console.log('In config: process.env.REACT_APP_ISSUER=', env.REACT_APP_ISSUER, 'process.env.REACT_APP_CLIENT_ID=', env.REACT_APP_CLIENT_ID);
  issuer = process.env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
  clientId = process.env.REACT_APP_CLIENT_ID || '{clientId}';
} else {
  import runtimeEnv from '@mars/heroku-js-runtime-env';
  const env = runtimeEnv(); // Load the env object.
  console.log('In config: env.REACT_APP_ISSUER=', env.REACT_APP_ISSUER, 'env.REACT_APP_CLIENT_ID=', env.REACT_APP_CLIENT_ID);
  issuer = env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
  clientId = env.REACT_APP_CLIENT_ID || '{clientId}';
}

export default {
  oidc: {
    issuer: issuer,
    clientId: clientId,
    redirectUri: window.location.origin + '/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },
};
