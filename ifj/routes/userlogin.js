var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente){
		req.user_session.reset();
		res.redirect('/login');
	}else{
		res.render('userlogin', { 
			title: 'Iniciar Sesión'
		});
	}
});


//metodo que verifica el usuario y la contraseña
router.post('/', function(req, res) {


    //llamada al objeto base de datos
    var dbconnection = require('../routes/dbconnection.js');
    

	var validar_login = function (params){
		//validamos si el login es exitoso
		if((JSON.stringify(params.rrows[0][0].login_error)==199)){
			//si es exitoso se guarda la cookie con los datos del usuario
			req.user_session.codigo_cliente = req.body.c_cliente;
			req.user_session.codigo_usuario = req.body.c_user;
			req.user_session.nombre_cliente = (JSON.stringify(params.rrows[0][0].login_nombre_cliente)).toString().replace("\"", "").replace("\"", "");
			req.user_session.nombre_usuario = (JSON.stringify(params.rrows[0][0].login_usuario_nombre)).toString().replace("\"", "").replace("\"", "");
			req.user_session.login_server = (JSON.stringify(params.rrows[0][0].login_Server)).toString().replace("\"", "").replace("\"", "");
			req.user_session.login_db = JSON.stringify(params.rrows[0][0].login_DB);
			console.log('Server: '+JSON.stringify(params.rrows[0][0]));  

			req.user_session.active = false;

			//redireccion a la pagina de inicio del usuario (segun su tipo de usuario)
			res.redirect('/');
			//res.render('index',{ title : 'Sesion iniciada',resultado : JSON.stringify(params.rrows)});
		}else{
			//Si no inicia sesion muestra el error
			res.render('userlogin', { 
				title: 'Iniciar Sesión',
				error: (JSON.stringify(params.rrows[0][0].login_mensaje)).toString().replace("\"", "").replace("\"", "")
			});
			//res.render('index',{ title : 'Sesion No iniciada',resultado : JSON.stringify(params.rrows)});
		}
    };



	var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

	console.log('Logueo con ip: '+ip);

	if(!(req.body.c_cliente && req.body.c_user && req.body.password)){
		return res.render('userlogin', { 
			title: 'Iniciar Sesión',
			error: 'Debe llenar todas las casillas'
		});
	}
	//Metodo que realiza la consulta a la base de datos y devuelve:
    //(login_error, login_mensaje, login_nombre_cliente, login_usuario_nombre, login_server, login_DB)
    var str_query = 'CALL sp_tran_web_login('+req.body.c_cliente+','+req.body.c_user+',\''+req.body.password+'\', '+'\''+ip+'\''+');';
    //(  myquery , callback_to_query_parameters , callback_to_query , if_error , res){
    dbconnection.sdandb_query(
    	str_query, 
    	'',
    	validar_login,
    	function(res){
    		res.render('error_detalles', 
    			{
    				detalle_error: 'Sin conexión a la base de datos, favor intente más tarde. <br />Si el problema persiste contacte a su proveedor de servicio.'	
    		});
		}, 
		res);


    
		


});

module.exports = router;
