const jwks = require('jwks-rsa');
const {expressjwt: jwt} = require('express-jwt');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-9nfdi31c.us.auth0.com/.well-known/jwks.json'
}),
audience: 'https://board_test/api/v2',
algorithms: ['RS256']
});

module.exports = { jwtCheck };