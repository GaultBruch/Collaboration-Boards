//Bring in requirements
const {requiresAuth} = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, getContacts, createContact, updateContact, deleteContact, getBoardList, addToBoardList, updateBoardList, deleteBoardList } = require('../controllers/userController')


//GENERAL USER ROUTING
//Get all users //Should be used instead to grab the currently logged in users user object.
//Incoming data will be the email of the user.
router.get('/:email', getUsers);

//Create a new User // basically defunct, auth0 deals with this instead
router.post('/', createUser);

//Update users
router.put('/:id', updateUser);

//Delete user
router.delete('/:id', deleteUser);

//CONTACT ROUTING 
//Get all contacts// should probably be rerouted through a /contact/ instead.
router.get('/contacts/:id', getContacts);

//Create a new Contact
router.post('/contacts/:id', createContact);

//Update Contacts
router.put('/contacts/:id/:id2', updateContact);

//Delete Contact
router.delete('/contacts/:id/:id2', deleteContact);

//ALLOWED BOARDS ROUTING

router.get('/:userId/boardList', getBoardList);
router.post('/:userId/boardList', addToBoardList);
router.put('/:userId/boardList', updateBoardList); //this does nothing currently
router.delete('/:userId/boardList/:boardId', deleteBoardList);

module.exports = router;