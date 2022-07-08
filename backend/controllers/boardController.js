const asyncHandler = require('express-async-handler');
const {Board} = require('../models/boardModel');
const {User} = require('../models/userModel');
//const {Task} = require("../models/boardModel")


// @desc Get Boards
// @route GET /api/boards
// @access Private

//Grabs a single board based on the req.body.boardId passed in, and returns the board
const getBoards = asyncHandler(async (req, res) => {
  const board = await Board.findbyId(req.params.boardId);
  
  //const boards = await Board.find({})
  res.status(200).json({board})
})

const createBoard = asyncHandler(async (req, res) => {
  if(!req.body.name) {
    res.status(400)
    throw new Error('Please add a board name')
  }

  const board = await Board.create({
    name: req.body.name,
    description: req.body.description,
    owner: req.body.owner
    //sharedList: [req.user.id]
  })

  board.sharedList.push(req.body.owner)

  res.status(200).json(board);
})

const updateBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if(!board) {
    res.status(400)
    throw new Error('Board with given ID does not exist');
  }

  var modifications = {};

  modifications.name = req.body.name ? req.body.name: undefined;
  modifications.description = req.body.description ? req.body.description: undefined;
  modifications.taskList = undefined;
  modifications.sharedList = undefined;

  const updatedBoard = await Board.findByIdAndUpdate(req.params.id, {$set: modifications}, {new: true,})

  res.status(200).json(updatedBoard);
})

const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if(!board) {
    res.status(400);
    throw new Error('Board not found');
  }
  /*
  if(board.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  } */

  await board.remove();

  res.status(200).json({ msg: `Delete board ${req.params.id}`});
})


// GET board #name should be updated, as it is getboard not gettasks
const getTasks = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if(!board) {
    res.status(400);
    throw new Error('Board not found')
  }

  res.status(200).json(board)
});

// Task based documentation
// Create a task for a board
const createTask = asyncHandler(async (req, res)=> {
  const board = await Board.findById(req.params.id);

  if(!board) {
    res.status(400);
    throw new Error('Board not found')
  }

  if(!req.body.title) {
    res.status(400)
    throw new Error('Please add a task name')
  }

  const task = {
    title: req.body.title,
    documentation: req.body.documentation,
    deadline: req.body.deadline,
    status: req.body.status,
  }

  board.taskList.push(task);
  board.save();
  res.status(200).json(task._id);
});

const updateTask = asyncHandler(async (req, res) => {
  //Attempt to find the board
  const board = await Board.findById(req.params.id);

  if(!board) {
    res.status(400);
    throw new Error('Board not found')
  }

  //Access the Boards Tasklist for updating
  var updatedTask = board.taskList.id(req.params.id2);

  updatedTask.set({
    title: req.body.title ? req.body.title : updatedTask.title,
    documentation: req.body.documentation ? req.body.documentation : updatedTask.documentation,
    deadline: req.body.deadline ? req.body.deadline : updatedTask.deadline,
    status: req.body.status ? req.body.status : updatedTask.status,
  });

  await board.save()

  //await updatedTask.update(upd);

  res.status(200).json(updatedTask)
});

const deleteTask = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if(!board) {
    res.status(400);
    throw new Error('Board not found')
  }

  board.taskList.pull(req.params.id2)
  await board.save()

  res.status(200).json(req.params.id2);
});

//BOARD SHARED LIST "COMMANDS"
const getBoardShared = asyncHandler(async (req, res) => {
  console.log(req.params.boardId);
  const board = await Board.findById(req.params.boardId);
  console.log(board);

  if(!board) {
    res.status(400);
    throw new Error("Board not found");
  }

  res.status(200).json(board.sharedList);
});

const addBoardShared = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.boardId)

  if(!board) {
    res.status(400);
    throw new Error("Board not found");
  }

  const user = await User.findOne({contactID: req.params.userId});

  if(!user) {
    res.status(400);
    throw new Error('No user with that contactID found');
  }

  try {
    await board.sharedList.push(user.id);
    res.status(200).json(`User Added, ID: ${user.id}`)
    board.save();
  } catch (error) {
    res.status(400);
    console.log(error)
    throw new Error("Failed to add user to shared list, did you use the wrong ID?")
  }

});

const updateBoardShared = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.boardId)
  
  if(!board) {
    res.status(400);
    throw new Error("Board not found");
  }

  //There's really no reason for this to exist right now as such, the shared list is fairly static.
  
});

const deleteBoardShared = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.boardId)
  
  if(!board) {
    res.status(400);
    throw new Error("Board not found");
  }

  const user = await User.findOne({contactID: req.params.userId});

  if(!user) {
    res.status(400);
    throw new Error('No user with that contactID found');
  }

  console.log

  try {
    await board.sharedList.pull(user.id);
    res.status(200).json(`User Removed, ID: ${user.id}`)
    board.save();
  } catch (error) {
    res.status(400);
    console.log(error)
    throw new Error("Failed to remove user from list, perhaps they aren't currently in the list?")
  }
  
});


module.exports = {
  getBoards, createBoard, updateBoard, deleteBoard, getTasks, createTask, updateTask, deleteTask, getBoardShared, addBoardShared, updateBoardShared, deleteBoardShared
}