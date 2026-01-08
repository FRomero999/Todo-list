var express = require('express');
var router = express.Router();
var authMiddleware = require('../middlewares/auth');

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
    req.session.user = { name: req.body.name };
    res.redirect("/admin")
  }else{
    res.render('index', { title: 'Express' });
  }
});

/* GET admin page. */
router.get('/admin', authMiddleware, function(req, res, next) {
  res.render('admin', { title: 'Express', user: req.session.user, layout: 'layout-admin' });
});


module.exports = router;
