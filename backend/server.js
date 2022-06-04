const express = require('express');
const path = require('path');
const colors = require('colors');
const {errorHandler} = require('./middleware/errorMiddleware');
const dotenv = require('dotenv').config();
const connectDB = require ('./config/db');
const port = process.env.PORT || 5000;
// auth0 middleware

connectDB();


const app = express();

// Authentication Code

const { auth } = require('express-openid-connect')

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SEC,
  baseURL: process.env.BASEURL,
  clientID: process.env.CLIENTID,
  issuerBaseURL: process.env.ISSUER
}; 

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(auth(config));


//Check how jwt deals with a basic login page, or if I can route this differently.
//app.get('/', (req, res) => {
//  res.send(req.oidc.isAuthenticated() ? 'logged in' : 'logged out')
//})

app.use('/api/users', require('./routes/userRoutes')); //protected
app.use('/api/boards', require('./routes/boardRoutes')); //unprotected
app.use('/', require('./routes/profileRoutes')); //unprotected


app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});