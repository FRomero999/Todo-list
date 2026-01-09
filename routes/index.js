var express = require('express');
var router = express.Router();
var authMiddleware = require('../middlewares/auth');
var Database = require('better-sqlite3');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', {});
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

/* GET logout page. */
router.get('/logout', function(req, res, next) {
  req.session.user = null;
  res.redirect('/');
});

/* GET admin page. */
router.get('/admin', authMiddleware, function(req, res, next) {
  
  /* hacer una consulta a la base de datos */

  let db = new Database("db.sqlite");
  const sql = `select * from tareas`;
  let salida = db.prepare(sql).all();

  console.log(salida);

  res.render('admin', { title: 'Express', user: req.session.user, layout: 'layout-admin' });
});


module.exports = router;
