const WebUser = require('../models/webuser');
const Post = require('../models/Post');
const express = require('express')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const Articles = require('../models/Articles');
const Solution = require('../models/Solution')
const mongoose = require('mongoose');
require('dotenv').config();
const axios = require('axios');
const Comments = require('../models/Comments');
const like = require('../models/Like_articles');
const notifications = require('../models/Notifications');
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exports.home = (req, res) => {
  res.json({ message: "hello from this side!!" });
};

exports.sign = [//express validator
  check('name')
    .notEmpty()
    .withMessage("First name should not be empty")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Length is too short, minimum 2 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name should only contain letters and spaces"),

  check('password')
    .notEmpty()
    .withMessage("Password should not be empty")
    .isLength({ min: 6 }) 
    .withMessage("Password should be at least 6 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .withMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),

  check('email')
    .notEmpty()
    .withMessage("Email should not be empty")
    .isEmail()  
    .withMessage("Invalid email format")
    .normalizeEmail(),
    
  (req, res, next) => {
    const { name,email,password ,usertype} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
  return res.status(400).json({ errors: errors.array() });
    }

   WebUser.findOne({ email }).then(existingUser => {
  if (existingUser) {
    return res.status(400).json({ error: "Email already exists" });
  }

  return bcrypt.hash(password, 6).then(hashedPassword => {
    const newUser = new WebUser({ name, email, password: hashedPassword ,usertype});
    return newUser.save().then(() => {
      res.status(201).json({ message: "User registered successfully!" });
    });
  });
}).catch(err => {
  console.error("Signup Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

  }
];





exports.login = [
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  check('password')
    .notEmpty().withMessage('Password is required'),

  (req, res,next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    WebUser.findOne({ email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
        }

        return bcrypt.compare(password, user.password).then(match => {
          if (!match) {
            return res.status(401).json({ error: "Invalid credentials" });
          }
          req.session.islogin = true;
          usertype = user.usertype;
          req.session.user = user;
          console.log(req.session.islogin);
          res.json({ message: "Login successful", status: 'ok' , islogin:req.session.islogin, usertype: user.usertype,user: user });
        });
      })
      .catch(err => {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Internal server error" });
      });
  }
];


exports.postq = [

  check('title')
    .notEmpty()
    .withMessage("Title should not be empty")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Title is too short, minimum 2 characters"),
  check('content')
    .notEmpty() 
    .withMessage("Content should not be empty")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Content is too short, minimum 10 characters"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, userId, image } = req.body;

    const newpost = new Post({
      title,
      content,
      user: userId,
      image 
    });

    newpost.save()
      .then(() => {
        res.status(200).json({ message: "Question posted successfully!" });
      })
      .catch(err => {
        res.status(500).json({ error: "Failed to post question. Please try again." });
      });
  }
];


exports.profile = (req,res,next)=>{
  const {userid} = req.body;
  
  if (!userid) {
    return res.status(400).json({ error: "User data is required" });
  }
  WebUser.findOne({ _id: userid}).then((userData)=>{
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }
    if(userData.usertype === 'farmer'){
       Post.find({ user: userid }).then((posts) => {
      console.log("Posts:", posts);
      res.status(200).json({ user: userData, posts: posts });

    }).catch(err => {
      console.error("Post Fetch Error:", err);
      res.status(500).json({ error: "Failed to fetch posts" });
    });
    }
    else{
       Articles.find({ user: userid }).then((posts) => {
      console.log("Posts:", posts);
      res.status(200).json({ user: userData, posts: posts });

    }).catch(err => {
      console.error("Post Fetch Error:", err);
      res.status(500).json({ error: "Failed to fetch posts" });
    });
    }
  
    
  }).catch(err=>{
    console.error("Profile Error:", err);
    res.status(500).json({ error: "Internal server error" });
  })
}

exports.postart = [
   check('title')
  .notEmpty()
  .withMessage("Title should not be empty")
  .trim()
  .isLength({ min: 2 })
  .withMessage("Title is too short, minimum 2 characters"),
check('content')
  .notEmpty() 
  .withMessage("Content should not be empty")
  .trim()
  .isLength({ min: 10 })
  .withMessage("Content is too short, minimum 10 characters"),

  (req,res,next)=>{
    const error =validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json({errors:error.array()});
    }
  const {title,content,userid,image} = req.body;
  const article = new Articles({title,content,user:userid,image});
  article.save().then(()=>{
    res.status(200).json({message:"article posted successfully!"});
  }).catch((err)=>{
    console.log('error occure when save articles: '+ err);
  })
}


];

exports.viewarticle = (req,res,next)=>{
  console.log('reached at viewart');
    Articles.find().populate('user', 'name').then((arts)=>{
      console.log(arts);
      res.status(200).json({arts:arts});
    }).catch((err)=>{
      console.log(err);
      res.status(500).json({error:err});
    })
}

exports.displayq = (req,res,next)=>{
  console.log("yess");
  Post.find({status:'false'}).populate('user', 'name') .then((questions)=>{
    res.status(200).json({questions:questions});
  }).catch((err)=>{
    res.status(500).json({message:"error occured from answerq"});
  })
}

exports.answerq = (req, res, next) => {//answer of question
  console.log("reached answerq");
  const { solution, user, post, curuser ,image} = req.body; 

  const obj = new Solution({ solution, post, user, curuser ,image});
  const notificationObj = new notifications({
    post: post,
    experts: curuser, 
    curuser: user
  });

  obj.save()
    .then(() => {
      notificationObj.save()
        .then(() => {
          console.log("notification saved");  
        })
        .catch((err) => {
          console.error("Error saving notification:", err);
          res.status(500).json({ message: "error" });
        });
      console.log("answer saved");
      res.status(200).json({ message: "done" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "error" });
    });
};



exports.viewans = (req, res, next) => {
  const { questionId } = req.body;
  console.log("reached at viewans:", questionId);

  Solution.find({ post: questionId })
    .populate('curuser', 'name') 
    .then((ans) => {
      const updatedAns = ans.map(a => {
        if (!a.curuser) {
          return { ...a.toObject(), curuser: { name: "Unknown" } };
        }
        return a;
      });

      res.status(200).json({ ans: updatedAns });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "error" });
    });
};


exports.editprofile = (req, res, next) => {
  const { userid, username ,image} = req.body;
   const imagePath = req.file ? req.file.filename : null;
      const updateData = {};
  if (username) updateData.name = username;
  if (image) updateData.image = image;
  WebUser.findByIdAndUpdate(userid, { name: username ,image:image},{ new: true })
    .then((updated) => {
      console.log(username);
      res.status(200).json({ updated });
    })
    .catch((err) => {
      res.status(500).json({ message: "error" });
    });
};




exports.postcomments = (req, res, next) => {
  const articleId = req.params.articleId;
  const { text, userId } = req.body;
  console.log(articleId, userId, text);
  if (!text || !userId) {
    return res.status(400).json({ error: "Comment and user ID are required" });
  }
  
  const newcomment = new Comments({
    article: articleId,
    user: userId,
    comment: text
  });
  
  newcomment.save()
    .then(() => {
      res.status(201).json({ message: "Comment added successfully" });
    })
    .catch(err => {
      console.error("Comment Error:", err);
      res.status(500).json({ error: "Failed to add comment" });
    }); 

}


exports.getcomments = (req, res, next) => {
  const articleId = req.params.articleId;
  if (!articleId) {
    return res.status(400).json({ error: "Article ID is required" });
  }
  Comments.find({ article: articleId })
    .populate('user', 'name') 
    .then(comments => {
      res.status(200).json({ comments: comments });
    })
    .catch(err => {
      console.error("Fetch Comments Error:", err);
      res.status(500).json({ error: "Failed to fetch comments" });
    });
};


exports.likearticle = async (req, res, next) => {
  console.log("reached at like function1234");
  const articleId = req.params.articleId;
  const userId = req.body.userId; 
  console.log("articleId:", articleId);
  console.log("userId:", userId);

  if (!articleId || !userId) {
    return res.status(400).json({ error: "Article ID and user ID are required" });
  }

  const alreadyLiked = await like.findOne({ user: userId, article: articleId });
  if (alreadyLiked) {
    return res.status(400).json({ error: "User already liked this article" });
  }

  const like_obj = new like({ user: userId, article: articleId });
  like_obj.save().then(() => {
    Articles.findByIdAndUpdate(articleId, { $inc: { like: 1 } })
      .then(updatedArticle => {
        console.log("Article liked successfully:", updatedArticle);
        res.status(200).json({ message: "Article liked successfully", article: updatedArticle });
      })
      .catch(err => {
        console.error("Error updating article like count:", err);
        res.status(500).json({ error: "Failed to like article" });
      });
  }).catch((err) => {
    console.error("Error saving like:", err);
    res.status(500).json({ error: "Failed to save like" });
  });
}





const Notifications = require('../models/Notifications');

exports.notify = (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  Notifications.find({ curuser: new mongoose.Types.ObjectId(userId) })
    .populate('post', 'title')
    .populate('experts', 'name')
    .populate('curuser', 'name')
    .then(data => {
      console.log(userId);
      console.log("Notifications fetched successfully:", data);
      res.status(200).json({ notifications: data });
    })
    .catch(err => {
      console.error("Error fetching notifications:", err);
      res.status(500).json({ error: "Failed to fetch notifications" });
    });
};


exports.trending_art = (req, res) => {
  Articles.find().sort({ like: -1 }).limit(5)
    .then(articles => {
      console.log("Trending articles fetched successfully:", articles);
      res.status(200).json({ trendingArticles: articles });
    })
    .catch(err => {
      console.error("Error fetching trending articles:", err);
      res.status(500).json({ error: "Failed to fetch trending articles" });
    });
};

exports.delete_notification = (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }
  Notifications.deleteMany({ curuser: new mongoose.Types.ObjectId(userId) })
    .then(() => {
      console.log("Notifications deleted successfully for user:", userId);
      res.status(200).json({ message: "Notifications deleted successfully" });
    })
    .catch(err => {
      console.error("Error deleting notifications:", err);
      res.status(500).json({ error: "Failed to delete notifications" });
    });
};

exports.detectdisease = async (req, res) => {
  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'Invalid input. "images" must be a non-empty array.' });
    }

    const response = await axios.post(
      'https://plant.id/api/v3/health_assessment?health=only',
      { images },
      {
        headers: {
          'Content-Type': 'application/json',
          'Api-Key': process.env.PLANT_ID_API_KEY
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error('Plant ID API error:', JSON.stringify(err.response?.data || err.message, null, 2));
    res.status(500).json({ error: err.response?.data || 'Disease detection failed.' });
  }
};
