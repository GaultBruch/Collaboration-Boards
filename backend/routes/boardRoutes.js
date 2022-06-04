//Import relevant libaries
const express = require('express');
const {requiresAuth} = require('express-openid-connect');
const router = express.Router();
const { getBoards, createBoard, updateBoard, deleteBoard, getTasks, createTask, updateTask, deleteTask, getBoardShared, addBoardShared, updateBoardShared, deleteBoardShared } = require('../controllers/boardController')



//Get all boards
router.get('/', requiresAuth(), getBoards);

//Create a new board
router.post('/', requiresAuth(), createBoard);

//Update Boards
router.put('/:id', requiresAuth(), updateBoard);

//delete board by ID
router.delete('/:id', requiresAuth(), deleteBoard);

//Routes to the tasks themselves for a given board
router.get('/:id', requiresAuth(), getTasks) //getTasks// is this effectively just getting a board? The tasks should all be inside the board itself

router.post("/:id", requiresAuth(), createTask) //create a new task

router.put("/:id/:id2", requiresAuth(), updateTask) //update task

router.delete('/:id/:id2', requiresAuth(), deleteTask) //delete Task

//Test Routes for sharedList addition and removal
router.get('/:boardId/sharedList', getBoardShared); // Get the shared list for a given board (Board id is :id)
router.post('/:boardId/sharedList/:userId', addBoardShared); // Add a new person to the shared list for a given board by passing in the contactID for the given user
router.put('/:boardId/sharedList/:userId', requiresAuth(), updateBoardShared); //  Update 
router.delete('/:boardId/sharedList/:userId', deleteBoardShared); // delete an item from the shared list by passing in the user ID within the req.body


module.exports = router;