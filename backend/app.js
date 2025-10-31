const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./router/main');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
//const GoogleStrategy = require('passport-google-oauth20').Strategy;
const WebUser = require('./models/webuser');
const MongoDBStore = require('connect-mongodb-session')(session);
const { GoogleGenerativeAI } = require("@google/generative-ai");

const dbpath = process.env.DB_PATH;

// app.set('view engine', 'ejs');
// app.set('views', './views');

app.use(cors());
app.use('/uploads', express.static('uploads')); 

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const store = new MongoDBStore({
    uri: dbpath,
    collection: 'session'
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
}));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => done(null, user.id));
// passport.deserializeUser((id, done) => {
//     WebUser.findById(id).then(user => done(null, user));
// });

// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:9579/auth/google/callback"
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         let user = await WebUser.findOne({ googleId: profile.id });
//         if (!user) {
//             user = await WebUser.create({
//                 googleId: profile.id,
//                 email: profile.emails[0].value,
//                 name: profile.displayName,
//                 usertype: 'farmer',
//                 password: ''
//             });
//         }
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// }));

// app.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
// );

// app.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     (req, res) => {
//         res.redirect('/');
//     }
// );

app.use(router);



mongoose.connect(dbpath)
    .then(() => {
        console.log('Database connection successful!');
        app.listen(9579, () => {
            console.log('Server is running on port 9579');
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message);
    });
