const express = require('express');
const path = require('path');
const colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const connectDB = require ('./config/db');
const port = process.env.PORT || 5000;
// auth0 middleware

connectDB();
const cors = require('cors');
const { expressjwt: jwt} = require('express-jwt');
const jwks = require('jwks-rsa');
const axios = require('axios');
const app = express();
//const { auth } = require('express-openid-connect');
// Authentication Code
/*
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); */

//
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'../','frontend','build','index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//TestAuth from Quickstart API

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



/*app.use(auth(config)); */

/*Check JWT from backend nodejs quickstart at auth */
/*
const {auth} = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: process.env.ISSUER
}); */

app.get('/echo', function(req, res) {
  res.json({
    message: JSON.stringify(req.get("Authorization"))
  });
})

app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
}); 

// This route needs authentication
app.get('/api/private', jwtCheck, function(req, res) {
  console.log('Got in');
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
}); 

app.use('/api/users', require('./routes/userRoutes')); //protected
app.use('/api/boards', require('./routes/boardRoutes')); //unprotected
app.use('/', require('./routes/profileRoutes')); //unprotected


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});