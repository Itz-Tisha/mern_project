// const router = require('./host');
// const express = require('express');
// const upload = require('../uploadMiddleware');
// const {home,sign,login,postq,profile,postart,viewarticle,displayq,answerq,viewans,editprofile,
//     getquestions,postcomments,getcomments,likearticle,notify,trending_art,delete_notification} = require('../controller/home');
// const app = express();
// router.get('/home',home);
// router.post('/sign',sign);
// router.post('/login',login);
// router.post('/postq',postq);
// router.post('/userprofile',profile);
// router.post('/postart',postart);
// router.get('/viewarticle',viewarticle)
// router.get('/displayq',displayq)
// router.post('/answerq',answerq)
// router.post('/viewans',viewans)
// router.post('/editprofile',editprofile)

// router.post('/getquestions',getquestions)
// router.post('/comments/:articleId',postcomments);
// router.get('/comments/:articleId',getcomments);
// router.post('/like/:articleId',likearticle);
// router.get('/notifications/:userId', notify);
// router.get('/trending_art', trending_art);
// router.delete('/notifications/:userId',delete_notification)


// const passport = require('passport');

// router.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// router.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
        
//         req.session.islogin = true;
//         req.session.user = req.user;
        
      
//         res.redirect('http://localhost:3000/');
//     }
// );

// module.exports = router;

// const router = require('./host');
// const express = require('express');
// const upload = require('../uploadMiddleware');

const express = require('express');
const router = express.Router();
const hostRoutes = require('./host');

// ✅ Attach all host-defined routes
router.use('/', hostRoutes); 
const {
  home, sign, login, postq, profile, postart, viewarticle,
  displayq, answerq, viewans, editprofile,
  getquestions, postcomments, getcomments, likearticle,
  notify, trending_art, delete_notification
} = require('../controller/home');

// ✅ Removed `const app = express();` (not needed here)

// Routes
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

router.post('/getquestions', getquestions);
router.post('/comments/:articleId', postcomments);
router.get('/comments/:articleId', getcomments);
router.post('/like/:articleId', likearticle);
router.get('/notifications/:userId', notify);
router.get('/trending_art', trending_art);
router.delete('/notifications/:userId', delete_notification);

const passport = require('passport');

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.islogin = true;
    req.session.user = req.user;
    res.redirect('http://localhost:3000/');
  }
);

module.exports = router;
