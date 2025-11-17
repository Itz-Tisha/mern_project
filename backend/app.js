const express = require('express');
require('dotenv').config();
const app = express();
const router = require('./router/main');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const WebUser = require('./models/webuser');
const MongoDBStore = require('connect-mongodb-session')(session);
const { GoogleGenerativeAI } = require("@google/generative-ai");

const dbpath = process.env.DB_PATH;

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
