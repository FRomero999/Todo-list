var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {});
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  if(req.body.name==="admin" && req.body.password==="admin"){
    res.redirect("/admin")
  }else{
    res.render('login', {});
  }
});



/* GET admin page. */
router.get('/admin', function(req, res, next) {
  res.render('index', { title: 'Express', layout: 'layout-admin' });
});



module.exports = router;
