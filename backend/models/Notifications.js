const mongoose = require('mongoose');

const notifications = new mongoose.Schema(
  {
    
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    experts: { type: mongoose.Schema.Types.ObjectId, ref: 'Webuser', required: true }, 
    curuser: { type: mongoose.Schema.Types.ObjectId, ref: 'Webuser', required: true },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Notifications', notifications);
