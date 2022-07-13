const jwks = require('jwks-rsa');
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler');
const { User } = require('../models/userModel')


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const jwtCheck = asyncHandler(async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //GetToken from header
      token = req.headers.authorization.split(' ')[1]

      //Verify token 
      const decoded = jwt.verify(token, process.env.SEC)

      req.user = await User.findById(decoded.id).select('-password');

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not Authorized')
    }
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})


/* old jwks code
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-9nfdi31c.us.auth0.com/.well-known/jwks.json'
}),
audience: 'https://board_test/api/v2',
algorithms: ['RS256']
}); */

module.exports = { jwtCheck };