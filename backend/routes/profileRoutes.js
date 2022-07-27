const {requiresAuth} = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const { getProfile, landingPage, dashBoardPage} = require('../controllers/profileController')

//Specialty Routes
//Profile

module.exports = router;