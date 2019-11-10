//const CLIENT_ID = process.env.REACT_APP_CLIENT_ID || '{clientId}';
//const ISSUER = process.env.REACT_APP_ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const CLIENT_ID = '0oa1itosqdQvfGNMD357';
const ISSUER = 'https://dev-729070.okta.com/oauth2/default';

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: window.location.origin + '/implicit/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
  },
};
