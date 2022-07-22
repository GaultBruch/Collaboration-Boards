const asyncHandler = require('express-async-handler');
const { User } = require('../models/userModel');
const { Board } = require('../models/boardModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SEC, {
    expiresIn: '30d',
  })
}


// @desc Get User from email parameter
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  //const authCheck = req.oidc.isAuthenticated(); //Not sure how I need to use this //Currently getusers has no protection against a 
  //random person creating an account and pushing in a different email than the one they are logged in with.
  const specificUser = await User.find({email: req.params.email}); 
  
  //const users = await User.find({})// change to users if necessary code
  res.status(200).json(specificUser)
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

  const userExists = await User.findOne({email: req.params.email})

  if(userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = await User.create({
    name: req.body.name,
    password: hashedPassword,
    email: req.body.email,
  })

  if(user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body

  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid Credentials')
  }
});

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

  user.set({
    name: req.body.name ? req.body.name : user.name,
    email: req.body.email ? req.body.email : user.email,
  });

  await user.save()

  res.status(200).json(user);
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

  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }

  try {
    await user.boardList.pull(req.params.boardId);
    res.status(200).json(`Board Removed, ID: ${req.params.boardId}`)
    user.save();
  } catch (error) {
    res.status(400);
    console.log(error)
    throw new Error("Failed to remove user from list, perhaps they aren't currently in the list?")
  }
});


//Notification "COMMANDS"
const getNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if(!user) {
    res.status(400);
    throw new Error("user not found");
  }

  res.status(200).json(user.notifications);
});

const addToNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)

  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }

  try {
    await user.notifications.push(req.body.notification);
    res.status(200).json(`Notification Added`)
    user.save();
  } catch (error) {
    res.status(400);
    console.log(error)
    throw new Error("Failed to add notification to list")
  }

});

const updateNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)
  
  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }

   var updatedNotif = user.notifications.id(req.params.notificationId);

   updatedNotif.set({
     name: req.body.name ? req.body.name : updatedNotif.name,
     boardId: req.body.boardId ? req.body.boardId : updatedNotif.boardId,
     deadline: req.body.deadline ? req.body.deadline : updatedNotif.deadline,
     pastDue: req.body.pastDue ? req.body.pastDue : updatedNotif.pastDue,
   });
 
   await user.save()
 
   //await updatedTask.update(upd);
 
   res.status(200).json(updatedNotif)
  
});

const deleteNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)

  if(!user) {
    res.status(400);
    throw new Error("User not found");
  }
  /*
  let newNotif = user.notifications.findById(req.params.notificationId)

  console.log(req.params.notificationId)
  const newNotificationArr = user.notifications.filter(element => element._id !== req.params.notificationId);
  let filteredArr = [];
  for (i = 0; i< user.notifications.length; i++) {
    console.log(user.notifications[0])
  }

  let modification = {};
  modification.notifications = user.notifications.filter(element => element._id !== req.params.notificationId);
  */

  try {
    await User.findByIdAndUpdate({_id: req.params.userId},{
      $pull: {
        notifications: {_id: req.params.notificationId},} 
    });
    res.status(200).json(user.notifications)
  } catch (error) {
    res.status(400);
    console.log(error)
    throw new Error("Failed to remove notification from list")
  }
});


module.exports = {
  getUsers, createUser, loginUser, updateUser, deleteUser, getContacts, createContact, updateContact, deleteContact, getBoardList, addToBoardList, updateBoardList, deleteBoardList, getNotifications, addToNotifications, updateNotifications, deleteNotifications
}