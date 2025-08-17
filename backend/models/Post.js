const mongo = require('mongoose');
const post = new mongo.Schema({
   title:{ type: String, required: true, trim: true, maxLength: 100 },
   content:{ type: String, required: true, trim: true },
   image:{ type: String }, // store base64 string
   status:{type:Boolean, default:false},
   user: { type: mongo.Schema.Types.ObjectId, ref: 'Webuser', required: true }
});
module.exports = mongo.model('Post', post);
