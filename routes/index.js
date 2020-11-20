//link to the express package
let express = require('express');
//instantiates a new express route to handle http requests
let router = express.Router();

// ref for Auth
const passport = require('passport');
const User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Task Manager',
        user: req.user
    });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
    res.render('about', {
        title: 'About Us',
        message: 'Content from the controller goes here',
        user: req.user
    });
});

// GET register
router.get('/register', (req, res, next) => {
    res.render('register', {title: 'Register'});
});

//POST Register
router.post('/register', (req, res, next) => {
    //Use the user model with passport to try a new user
    //passport-local-mongoose will salt and hash password
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            //Log the User in and redirect to /tasks
            req.login(user, (err) => {
                res.redirect('/tasks');
            });
        }
    });
});

// GET login
router.get('/login', (req, res, next) => {
    //Check for invalid login message and pass to the view to display
    let messages = req.session.messages || []
    //Clear the session message
    req.session.messages = []
    //Pass local message variable to the view for display
    res.render('login', {
        title: 'Login',
        messages: messages
    });
});

//POST login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}))

//GET logout
router.get('/logout', (req, res, next) => {
    //Call passport built in logout method
    req.logout();
    res.redirect('/login');
})

// GET /google
//Check if User is already logged into Google. If not then invoke Google Sign-in
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}),
    (req, res) => {});
//Get /google/callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login'
}),
    (req, res) => {
        res.redirect('/tasks');
    });

//exposes this file as public
module.exports = router;
