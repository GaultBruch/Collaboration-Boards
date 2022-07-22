const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  _id: true,
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


});

const NotificationSchema = mongoose.model('notification', notificationSchema);

module.exports = { Notification: NotificationSchema, } // Task: TaskSchema}