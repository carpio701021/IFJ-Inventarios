var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var cargar_grupos = function(subparams) {//funcion llamada en el callback de la consulta
			res.render('administracion/grupos', {
				nombre_cliente: req.user_session.nombre_cliente,
				nombre_usuario: req.user_session.nombre_usuario,
				grupos: JSON.stringify(subparams.rrows[0])
			});
		};


		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');

		//CALL `sdan002`.`sp_get_op_t_grupos`(<{p_codigo int}>, <{p_sort char(20)}>);
		var str_query = 'CALL sp_get_op_t_grupos(' + 0 + ',\'CODIGO\');';

		// sdan_query (host , database_to_use , myquery , callback_to_query_parameters , callback_to_query , if_error , res){
		dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', cargar_grupos,error_conexion_db,res);

	} else res.redirect('/login?error=debe iniciar sesion primero');
});

/* POST recargar grupos */
router.post('/recargar_grupos', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var cargar_grupos = function(subparams) {//funcion llamada en el callback de la consulta
			res.json(subparams.rrows[0]);
		}

		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');

		//CALL `sdan002`.`sp_get_op_t_grupos`(<{p_codigo int}>, <{p_sort char(20)}>);
		var str_query = 'CALL sp_get_op_t_grupos(' + 0 + ',\'CODIGO\');';

		// sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
		dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', cargar_grupos,error_conexion_db,res);

	} else res.redirect('/login?error=debe iniciar sesion primero');
});


//funcion que verifica que un texto no contenga caracteres extraños
function validarCampos(inputtxt){ 
	var letters = /^[A-Za-z0-9\s]+$/;  
	if(inputtxt.match(letters)) return true;  
	else return false;    
}  


/* POST actualizar grupo */
router.post('/cambiar_grupo', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var codigoGrupo = req.body.codigo_grupo_cambiar ;
		var descripcion = req.body.descripcion_grupo_cambiar ;
		var cuenta_contable = req.body.cuenta_grupo_cambiar ;
		var estado = req.body.estado_grupo_cambiar ;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		if(validarCampos(codigoGrupo) && validarCampos(descripcion) 
			&& validarCampos(cuenta_contable) && validarCampos(estado)){
			// si todos los campos tienen un formato correcto se prosigue 

			var respuesta_actualizar_grupos = function(subparams) {//funcion llamada en el callback de la consulta
				res.json(subparams.rrows[0]);
			}
			//llamada al objeto base de datos
			var dbconnection = require('../../routes/dbconnection.js');
			//CALL `sdan001`.`sp_admin_op_t_grupos`(
				//<{p_operacion char(10)}>, 
				//<{p_codigo integer}>, 
				//<{p_descripcion char(60)}>, 
				//<{p_cuenta_contable char(10)}>, 
				//<{p_estado char(1)}>, 
				//<{p_codigo_usuario integer}>, 
				//<{p_ip char(40)}>		);
			var str_query = 'CALL sp_admin_op_t_grupos(\'UPDATE\','+codigoGrupo
				+',\''+descripcion+'\',\''+cuenta_contable+'\',\''
				+estado+'\','+req.user_session.codigo_usuario+',\''+ip+'\');';
			console.log(str_query);

			//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
			dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_actualizar_grupos,error_conexion_db,res);
		}else{
			// si algun campo contiene algun caracter especial como comillas o diagonales se cancela la operación
			res.json([{tran_error: 9,tran_mensaje: 'Uno de los campos contiene caracteres inválidos. Operación cancelada.'}]);
		}

		
	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


/* POST agregar grupo */
router.post('/agregar_grupo', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {


		var codigoGrupo = req.body.codigo_grupo_agregar ;
		var descripcion = req.body.descripcion_grupo_agregar ;
		var cuenta_contable = req.body.cuenta_grupo_agregar ;
		var estado = req.body.estado_grupo_agregar ;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		if(validarCampos(codigoGrupo) && validarCampos(descripcion) 
			&& validarCampos(cuenta_contable) && validarCampos(estado)){

			var respuesta_agregar_grupos = function(subparams) {//funcion llamada en el callback de la consulta
				res.json(subparams.rrows[0]);
			}

			//llamada al objeto base de datos
			var dbconnection = require('../../routes/dbconnection.js');
			//CALL `sdan001`.`sp_admin_op_t_grupos`(
				//<{p_operacion char(10)}>, 
				//<{p_codigo integer}>, 
				//<{p_descripcion char(60)}>, 
				//<{p_cuenta_contable char(10)}>, 
				//<{p_estado char(1)}>, 
				//<{p_codigo_usuario integer}>, 
				//<{p_ip char(40)}>		);


			var str_query = 'CALL sp_admin_op_t_grupos(\'INSERT\','+codigoGrupo
				+',\''+descripcion+'\',\''+cuenta_contable+'\',\''
				+estado+'\','+req.user_session.codigo_usuario+',\''+ip+'\');';
			console.log(str_query);

			//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
			dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_agregar_grupos,error_conexion_db,res);

		}else{
			// si algun campo contiene algun caracter especial como comillas o diagonales se cancela la operación
			res.json([{tran_error: 9,tran_mensaje: 'Uno de los campos contiene caracteres inválidos. Operación cancelada.'}]);
		}

	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


/* POST borrar grupo */
router.post('/borrar_grupo', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var respuesta_borrar_grupos = function(subparams) {//funcion llamada en el callback de la consulta
			res.json(subparams.rrows[0]);
		}

		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');
		//CALL `sdan001`.`sp_admin_op_t_grupos`(
			//<{p_operacion char(10)}>, 
			//<{p_codigo integer}>, 
			//<{p_descripcion char(60)}>, 
			//<{p_cuenta_contable char(10)}>, 
			//<{p_estado char(1)}>, 
			//<{p_codigo_usuario integer}>, 
			//<{p_ip char(40)}>		);

		var codigoGrupo = req.body.codigo_grupo_borrar ;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		var str_query = 'CALL sp_admin_op_t_grupos(\'DELETE\','+codigoGrupo
			+',\'\',\'\',\'\','+req.user_session.codigo_usuario+',\''+ip+'\');';
		console.log(str_query);

		//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
		dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_borrar_grupos,error_conexion_db,res);
	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


/* POST buscar grupos */
router.post('/busqueda', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var intxt_buscar_grupo = req.body.intxt_buscar_grupo ;
		var rdBuscar_p_codigo = req.body.rdBuscar_p_codigo ;
		console.log('busqueda: ' + intxt_buscar_grupo);
		console.log('por codigo : '+ rdBuscar_p_codigo);

		var respuesta_busqueda_grupos = function(subparams) {//funcion llamada en el callback de la consulta
			res.json({
				tran_error: 0,
				tran_mensaje: 'Resultados de la busqueda: "'+intxt_buscar_grupo+'"' , 
				grupos: subparams.rrows[0]
			});
		}

		if(validarCampos(intxt_buscar_grupo)){//primero verificar si no contiene caracteres extraños
			//llamada al objeto base de datos
			var dbconnection = require('../../routes/dbconnection.js');

			if(rdBuscar_p_codigo == 'true'){//si el tipo de busqueda es por codigo
				if(!isNaN(intxt_buscar_grupo)){
					//CALL `sdan002`.`sp_get_op_t_grupos`(<{p_codigo int}>, <{p_sort char(20)}>);
					var str_query = 'CALL sp_get_op_t_grupos(' + intxt_buscar_grupo + ',\'CODIGO\');';
				}else{
					res.json({tran_error: 9,tran_mensaje: 'Debe ingresar un numero para buscar por código' , grupos: [] });
					return false;
				}
			}else {//si la busqueda es por nombre/descripcion
				//CALL `sdan002`.`sp_get_op_t_grupos`(<{p_codigo int}>, <{p_sort char(20)}>);
				var str_query = 'CALL sp_find_data_like(\'op_t_grupos\',\'' + intxt_buscar_grupo + '\');';
			}
			// sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
			dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_busqueda_grupos,error_conexion_db,res);
		}else{
			// si algun campo contiene algun caracter especial como comillas o diagonales se cancela la operación
			res.json({tran_error: 9,tran_mensaje: 'La busqueda contiene caracteres inválidos' , grupos: [] });
		}
		
	} else res.redirect('/login?error=debe iniciar sesion primero');

});


var error_conexion_db = function(res){
	res.render('error_detalles', {
		detalle_error: 'Sin conexión a la base de datos, favor intente más tarde. <br />Si el problema persiste contacte a su proveedor de servicio.'
	});
}


module.exports = router;