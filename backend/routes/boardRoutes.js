//Import relevant libaries
const express = require('express');
const {requiresAuth} = require('express-openid-connect');
const { jwtCheck } = require('../middleware/checkJwtAuth');
const router = express.Router();
const { getBoards, createBoard, updateBoard, deleteBoard, getTasks, createTask, updateTask, deleteTask, getBoardShared, addBoardShared, updateBoardShared, deleteBoardShared } = require('../controllers/boardController')



//Get all boards // Should be updated to only get the currently logged in user's boards

//I think I could go one step further, get it to only update given an id parameter
router.get('/', jwtCheck, getBoards);

//Create a new board
router.post('/', jwtCheck, createBoard);

//Update Board by ID
router.put('/:id', jwtCheck, updateBoard);

//delete board by ID
router.delete('/:id', jwtCheck, deleteBoard);

//Routes to the tasks themselves for a given board
router.get('/:id', jwtCheck, getTasks) //getTasks// is this effectively just getting a board? The tasks should all be inside the board itself

router.post("/:id", jwtCheck, createTask) //create a new task

router.put("/:id/:id2", jwtCheck, updateTask) //update task //#does this even do anything?

router.delete('/:id/:id2', jwtCheck, deleteTask) //delete Task

//Test Routes for sharedList addition and removal\
//Not protected yet as the sharedList is not in use.
router.get('/:boardId/sharedList', getBoardShared); // Get the shared list for a given board (Board id is :id)
router.post('/:boardId/sharedList/:userId', addBoardShared); // Add a new person to the shared list for a given board by passing in the contactID for the given user
router.put('/:boardId/sharedList/:userId', requiresAuth(), updateBoardShared); //  Update 
router.delete('/:boardId/sharedList/:userId', deleteBoardShared); // delete an item from the shared list by passing in the user ID within the req.body


module.exports = router;