var express = require('express');
var router = express.Router();
var authMiddleware = require('../middlewares/auth');
var Database = require('../data/database');
var UsuarioDAO = require("../data/usuario-dao");
const TareaDAO = require('../data/tarea-dao');

// Inicio la base de datos y el DAO
var db = Database.getInstance("db.sqlite");
var dao = new UsuarioDAO(db);
var datoTareas = new TareaDAO(db);


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
 
  const user = dao.findUserByEmail(req.body.name);

  if(req.body.password===user.password){
    req.session.user = { email: user.email, id: user.id };
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
  let salida = datoTareas.findTareasByUserId(req.session.user.id)
  console.log(salida);

  res.render('admin', { title: 'Express', user: req.session.user, layout: 'layout-admin', tareas: salida });
});


router.get('/temp', function(req, res, next) {
  res.send("ok");
});


module.exports = router;
