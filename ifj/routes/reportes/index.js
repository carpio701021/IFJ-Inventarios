var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente){
		res.render('reportes/index', { 
			nombre_cliente: req.user_session.nombre_cliente,
			nombre_usuario: req.user_session.nombre_usuario
		});	
	}else{
		res.redirect('/login?error=debe iniciar sesion primero');	
	}
});


module.exports = router;
