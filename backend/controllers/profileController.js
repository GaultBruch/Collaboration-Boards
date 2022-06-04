const asyncHandler = require('express-async-handler');
const { User } = require('../models/userModel');

const getProfile = asyncHandler( async (req, res) => {
  res.status(200).json('Profile Page')
});

const landingPage = asyncHandler( async (req, res) => {
  res.status(200).json('Landing Page')
});

const dashBoardPage = asyncHandler( async (req, res) => {
  res.status(200).json('Dashboard')
});

module.exports = {getProfile, landingPage, dashBoardPage}