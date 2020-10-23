//link to the express package
let express = require('express');
//instantiates a new express route to handle http requests
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Task Manager' });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
    res.render('about', { message: 'Content from the controller goes here' });
});

//exposes this file as public
module.exports = router;
