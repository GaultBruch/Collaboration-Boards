const asyncHandler = require('express-async-handler');
const { User } = require('../models/userModel');
const { Board } = require('../models/boardModel');



// @desc Get Users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const authCheck = req.oidc.isAuthenticated(); //Not sure how I need to use this
  const users = await User.find({}); 
  
  //const users = await User.find({})// change to users if necessary code
  res.status(200).json({users})
})

const createUser = asyncHandler(async (req, res) => {
  if(!req.body.name) {
    res.status(400)
    throw new Error('Please add a username')
  }
  
  if(!req.body.password) {
    res.status(400)
    throw new Error('Please add a password')
  }
  
  if(!req.body.email) {
    res.status(400)
    throw new Error('Please add an email')
  }

  const user = await User.create({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    contactID: req.body.contactID
  })

  res.status(200).json({user});
})

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    res.status(400)
    throw new Error('User with given ID does not exist');
  }

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true,})

  res.status(200).json(updatedUser);
})

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    res.status(400);
    throw new Error('User not found');
  }
  /*
  if(user.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  } */

  await user.remove();

  res.status(200).json({ msg: `Delete user ${req.params.id}`});
})

//Contacts Based

// GET ALL contacts from a user
const getContacts = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    res.status(400);
    throw new Error('User not found')
  }

  res.status(200).json(user.contactList)
});

// Create a contact for a user
const createContact = asyncHandler(async (req, res)=> {
  const user = await User.findById(req.params.id);

  console.log('Hello')

  if(!user) {
    res.status(400);
    throw new Error('User not found')
  }

  if(!req.body.contactID) {
    res.status(400)
    throw new Error('Please add a contact ID')
  }
  console.log('Hello')

  const newContact = {
    contactID: req.body.contactID
  }

  user.contactList.push(newContact);
  await user.save();
  console.log('Hello')
  res.status(200).json(newContact._id);
  console.log('Hello')
});

const updateContact = asyncHandler(async (req, res) => {
  //Attempt to find the user
  
  const user = await User.findById(req.params.id);

  if(!user) {
    res.status(400);
    throw new Error('user not found')
  }

  //Access the users contactlist for updating
  var updatedContact = user.contactList.id(req.params.id2);

  updatedContact.set({
    contactID: req.body.contactID ? req.body.contactID : updatedContact.contactID,
  });

  await user.save()

  //await updatedTask.update(upd);

  res.status(200).json(updatedContact)
});

const deleteContact = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if(!user) {
    res.status(400);
    throw new Error('User not found')
  }

  user.contactList.pull(req.params.id2)
  await user.save()

  res.status(200).json(req.params.id2);
});

//BOARD LIST "COMMANDS"
const getBoardList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if(!user) {
    res.status(400);
    throw new Error("user not found");
  }

  res.status(200).json(user.boardList);
});

const addToBoardList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)

  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }

  console.log(req.body.boardId)

  const board = await Board.findById(req.body.boardId);

  if(!board) {
    res.status(400);
    throw new Error('No board with that ID found');
  }

  try {
    await user.boardList.push(board.id);
    res.status(200).json(`Board Added, ID: ${board.id}`)
    user.save();
  } catch (error) {
    res.status(400);
    console.log(error)
    throw new Error("Failed to add board to shared list, did you use the wrong ID?")
  }

});

const updateBoardList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)
  
  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }

  //There's really no reason for this to exist right now as such, the shared list is fairly static.
  
});

const deleteBoardList = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)

  console.log('hello')
  
  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const board = await Board.findById(req.params.boardId);

  if(!board) {
    res.status(400);
    throw new Error('No board with that ID found');
  }

  console.log(board)
  console.log(board.id)

  try {
    await user.boardList.pull(board.id);
    res.status(200).json(`Board Removed, ID: ${board.id}`)
    user.save();
  } catch (error) {
    res.status(400);
    console.log(error)
    throw new Error("Failed to remove user from list, perhaps they aren't currently in the list?")
  }
});


module.exports = {
  getUsers, createUser, updateUser, deleteUser, getContacts, createContact, updateContact, deleteContact, getBoardList, addToBoardList, updateBoardList, deleteBoardList
}