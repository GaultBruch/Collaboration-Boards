const mongoose = require('mongoose')

const contact = mongoose.Schema({
  contactID: {
    type: String,
    required: false, // Would it be required? It's the only thing in the object so you couldn't really define it otherwise
    unique: false // should eventually be true I suppose, but the contactIDS themselves are true
  }
})

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [false, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  contactList: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    // Friendlist is unimplemented for now, return to this in the future.
  boardList: [{type: mongoose.Schema.Types.ObjectId, ref:'board'}], //board ref not in this doc??
  notifications: [{
    deadline: {
      type: Date,
      required: [true, 'Please add a deadline to this notification']
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Board',
      required: [true, 'this notification does not link to any board!']
    },
    name: {
      type: String,
      required: [true, 'Please add a name/board for this notification']
    },
    pastDue: {
      type: Boolean,
    }
  }]
},
{
  timestamps: true
});

const UserSchema = mongoose.model('user', userSchema);

module.exports = { User: UserSchema, }