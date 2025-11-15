const mongoose = require('mongoose');

const like_article = new mongoose.Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Webuser', required: true },
});

module.exports = mongoose.model('Like_article', like_article);
