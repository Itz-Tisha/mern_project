const express = require('express');
const router = express.Router();
const upload = require('../uploadMiddleware');
const { 
  home, sign, login, postq, profile, postart, viewarticle, displayq, answerq, 
  viewans, editprofile,  postcomments, getcomments, likearticle, 
  notify, trending_art, delete_notification, detectsisease 
} = require('../controller/home');

router.get('/home', home);
router.post('/sign', sign);
router.post('/login', login);
router.post('/postq', postq);
router.post('/userprofile', profile);
router.post('/postart', postart);
router.get('/viewarticle', viewarticle);
router.get('/displayq', displayq);
router.post('/answerq', answerq);
router.post('/viewans', viewans);
router.post('/editprofile', editprofile);
//router.post('/getquestions', getquestions);
router.post('/comments/:articleId', postcomments);
router.get('/comments/:articleId', getcomments);
router.post('/like/:articleId', likearticle);
router.get('/notifications/:userId', notify);
router.get('/trending_art', trending_art);
router.post('/detect-disease', detectsisease);
router.delete('/notifications/:userId', delete_notification);

module.exports = router;
// const express = require('express');
// const router = express.Router();
// const upload = require('../uploadMiddleware');
// const {
//   home, sign, login, postq, profile, postart, viewarticle,
//   displayq, answerq, viewans, editprofile, getquestions,
//   postcomments, getcomments, likearticle, notify, trending_art,
//   delete_notification, detectsisease
// } = require('../controller/home');

// router.get('/home', home);
// router.post('/sign', sign);
// router.post('/login', login);
// router.post('/postq', postq);
// router.post('/userprofile', profile);
// router.post('/postart', postart);
// router.get('/viewarticle', viewarticle);
// router.get('/displayq', displayq);
// router.post('/answerq', answerq);
// router.post('/viewans', viewans);
// router.post('/editprofile', editprofile);
// router.post('/getquestions', getquestions);
// router.post('/comments/:articleId', postcomments);
// router.get('/comments/:articleId', getcomments);
// router.post('/like/:articleId', likearticle);
// router.get('/notifications/:userId', notify);
// router.get('/trending_art', trending_art);
// router.post('/detect-disease', detectsisease);
// router.delete('/notifications/:userId', delete_notification);

// module.exports = router;
