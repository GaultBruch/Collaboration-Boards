//Bring in requirements
const {requiresAuth} = require('express-openid-connect');
const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, getContacts, createContact, updateContact, deleteContact, getBoardList, addToBoardList, updateBoardList, deleteBoardList } = require('../controllers/userController')


//GENERAL USER ROUTING
//Get all users
router.get('/', requiresAuth(), getUsers);

//Create a new User
router.post('/', createUser);

//Update users
router.put('/:id', requiresAuth(), updateUser);

//Delete user
router.delete('/:id', requiresAuth(), deleteUser);

//CONTACT ROUTING 
//Get all contacts// should probably be rerouted through an /contact/ instead.
router.get('/:id', requiresAuth(), getContacts);

//Create a new Contact
router.post('/:id', requiresAuth(), createContact);

//Update Contacts
router.put('/:id/:id2', requiresAuth(), updateContact);

//Delete Contact
router.delete('/:id/:id2', deleteContact);

//ALLOWED BOARDS ROUTING

router.get('/:userId/boardList', getBoardList);
router.post('/:userId/boardList', addToBoardList);
router.put('/:userId/boardList', updateBoardList); //this does nothing currently
router.delete('/:userId/boardList/:boardId', deleteBoardList);

module.exports = router;