const mongoose = require('mongoose');
const userSchema =  require('./userModel').schema // currently this is unused, but should be used for defining a userlist later.
const Schema = mongoose.Schema;

//Boards will also contain Tasks inside of them, so I'll define a schema beneath them
// that should be pulled into the board schema.

const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  documentation: String,
  deadline: Date,
  status: {type: String, required: true},
});

const boardSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a board name']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, //userSchema,
    required: [true,,"this board doesn't have a user! Please add one"], //Needs to be true when users are set 
    ref: 'User'
  },
  sharedList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}], //userSchema
  taskList: [taskSchema]
});

const BoardSchema = mongoose.model('board', boardSchema);
//const TaskSchema = mongoose.model('task', taskSchema);

module.exports = { Board: BoardSchema, } // Task: TaskSchema}