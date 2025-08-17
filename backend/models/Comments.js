const mongoose = require('mongoose');

const comments = new mongoose.Schema({
  comment: { type: String, required: true, trim: true },
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Webuser', required: true },
});

module.exports = mongoose.model('Comments', comments);
