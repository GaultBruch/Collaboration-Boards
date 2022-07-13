//Bring in requirements
const express = require('express');
const router = express.Router();
const { getUsers, createUser, loginUser, updateUser, deleteUser, getContacts, createContact, updateContact, deleteContact, getBoardList, addToBoardList, updateBoardList, deleteBoardList } = require('../controllers/userController')
const { jwtCheck } = require('../middleware/checkJwtAuth');

//GENERAL USER ROUTING
//Get all users //Should be used instead to grab the currently logged in users user object.
//Incoming data will be the email of the user.
router.get('/:email', jwtCheck, getUsers);

//Create a new User
router.post('/', createUser);

router.post('/login', loginUser)

//Update users
router.put('/:id', jwtCheck, updateUser);

//Delete user
router.delete('/:id', jwtCheck, deleteUser);

//CONTACT ROUTING 
//Get all contacts// should probably be rerouted through a /contact/ instead.
router.get('/contacts/:id', jwtCheck, getContacts);

//Create a new Contact
router.post('/contacts/:id',jwtCheck, createContact);

//Update Contacts
router.put('/contacts/:id/:id2', jwtCheck, updateContact);

//Delete Contact
router.delete('/contacts/:id/:id2', jwtCheck, deleteContact);

//ALLOWED BOARDS ROUTING

router.get('/:userId/boardList', jwtCheck, getBoardList);
router.post('/:userId/boardList', jwtCheck, addToBoardList);
router.put('/:userId/boardList', jwtCheck, updateBoardList); //this does nothing currently
router.delete('/:userId/boardList/:boardId', jwtCheck, deleteBoardList);

module.exports = router;