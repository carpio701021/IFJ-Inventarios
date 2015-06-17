var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente){
		//if(req.user_session.login_server && req.user_session.loging_db){

			 var cargar_grupos = function (subparams){
		    	res.render('grupos', { 
					nombre_cliente: req.user_session.nombre_cliente,
					nombre_usuario: req.user_session.nombre_usuario,
					grupos : JSON.stringify(subparams.rrows[0])
					//grupos : subparams.rrows[0]
				});	
		    }
			//llamada al objeto base de datos
		    var dbconnection = require('../routes/dbconnection.js');

		    //CALL `sdan002`.`sp_get_op_t_grupos`(<{p_codigo int}>, <{p_sort char(20)}>);
		    var str_query = 'CALL sp_get_op_t_grupos('+0+',\'CODIGO\');';

		    // sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
		    console.log('Base: '+req.user_session.login_server +'\nDB: '+'sdan00'+req.user_session.login_db );
		    dbconnection.sdan_query(req.user_session.login_server,'root','1234','sdan00'+req.user_session.login_db, str_query, '',cargar_grupos);
		   
		//}else res.redirect('/login?error=usuario invalido');	
	}else res.redirect('/login?error=debe iniciar sesion primero');	
});

module.exports = router;
