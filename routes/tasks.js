//link to the express package
let express = require('express');
//instantiates a new express route to handle http requests
let router = express.Router();

//Reference the Task model
const Task = require('../models/task');

//Use Passport to check our auth
const passport = require('passport');

//Auth check function to be called for each route
function isLoggedIn(req, res, next){
    //If user has logged in, call next which will just continue execution
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/login');
}

/* GET Task Index View. */
router.get('/', isLoggedIn, (req, res, next) => {

    //use the task model to fetch a list of tasks and pass these to thee view for display
    //If an error occurs, the error parameter will be filled
    //If not the tasks parameter will be filled with the query result
    Task.find((err, tasks) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('tasks/index', {
                tasks: tasks,
                user: req.user
            });

        }
    })
});
//GET tasks add view
router.get('/add', isLoggedIn, (req, res, next) => {
    res.render('tasks/add', {
        user: req.user
    })
});

//POST tasks/add form submission
router.post('/add', isLoggedIn, (req, res, next) => {
    //Use MONGOOSE to try to save a new task object
    Task.create({
        name: req.body.name,
        priority: req.body.priority
    }, (err, task) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/tasks');
        }
    })
});
//GET tasks/delete/ - colon in the path represents a URL parameter
router.get('/delete/:_id', isLoggedIn, (req, res, next) => {
    //store the selected id in a local variable
    let _id = req.params._id;
    //Use Mongoose to delete the selected document from the DB
    Task.remove({_id: _id}, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/tasks');
        }
    });
});

//GET tasks/edit/... populate edit form with existing task values
router.get('/edit/:_id', isLoggedIn, (req, res, next) => {
    //store the selected id in a local variable
    let _id = req.params._id;
    //Use the selected id to look up the matching document
    Task.findById(_id, (err, tasks) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('tasks/edit', {
                tasks: tasks,
                user: req.user
            });
        }
    })
});
//POST /tasks/edit/:_id -> update selected task document
router.post('/edit/:_id', isLoggedIn, (req, res, next) => {
    let _id = req.params._id;
    //parse checkbox to a bool
    let complete = false;
    if (req.body.complete == "on"){
        complete = true;
    }
    //instantiate a task Object with the new values from the submission
    let task = new Task({
        _id: _id,
        name: req.body.name,
        priority: req.body.priority,
        complete: complete
    });
    Task.update({_id: _id}, task, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect('/tasks');
        }
    });
});
//exposes this file as public
module.exports = router;