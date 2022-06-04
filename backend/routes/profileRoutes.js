const {requiresAuth} = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const { getProfile, landingPage, dashBoardPage} = require('../controllers/profileController')

//Specialty Routes
//Profile
router.get('/profile', requiresAuth(), getProfile);
router.get('/', landingPage);
router.get('/dashboard', requiresAuth(), dashBoardPage)

module.exports = router;