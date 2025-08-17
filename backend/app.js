const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./router/main');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const WebUser = require('./models/webuser');
const MongoDBStore = require('connect-mongodb-session')(session);
const { GoogleGenerativeAI } = require("@google/generative-ai");

const dbpath = process.env.DB_PATH;

app.set('view engine', 'ejs');
app.set('views', './views');

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

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
    WebUser.findById(id).then(user => done(null, user));
});

const CALLBACK_URL = process.env.NODE_ENV === "production"
  ? "https://mern-project-2-o2fe.onrender.com/auth/google/callback"
  : "http://localhost:9579/auth/google/callback";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await WebUser.findOne({ googleId: profile.id });
        if (!user) {
            user = await WebUser.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                name: profile.displayName,
                usertype: 'farmer',
                password: ''
            });
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
}));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);



app.use(router);
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/agrofp/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/agrofp/dist/index.html'));
});




const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); 

app.post("/ask-gemini", async (req, res) => {
    try {
        const { question } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(question);
        const text = result.response.text();

        res.json({ answer: text });
    } catch (err) {
        if (err.status === 429) {
            return res.status(429).json({ error: "Rate limit reached. Please wait a minute and try again." });
        }
        console.error("Gemini Error:", err);
        res.status(500).json({ error: err.message });
    }
});
const PORT = process.env.PORT || 9579;
mongoose.connect(dbpath)
    .then(() => {
        console.log('Database connection successful!');
         app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message);
    });
