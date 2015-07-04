var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var cargar_elementos = function(subparams) {//funcion llamada en el callback de la consulta
			res.render('administracion/unidades', {
				nombre_cliente: req.user_session.nombre_cliente,
				nombre_usuario: req.user_session.nombre_usuario,
				elementos: JSON.stringify(subparams.rrows[0])
			});
		};

		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');
		var str_query = 'CALL sp_get_ge_t_unidades_medida(' + 0 + ',\'CODIGO\');';
		dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', cargar_elementos,error_conexion_db,res);

	} else res.redirect('/login?error=debe iniciar sesion primero');
});


/* POST recargar elementos */
router.post('/recargar_elementos', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var cargar_elementos = function(subparams) {//funcion llamada en el callback de la consulta
			res.json(subparams.rrows[0]);
		}
		
		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');
		var str_query = 'CALL sp_get_ge_t_unidades_medida(' + 0 + ',\'CODIGO\');';
		dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', cargar_elementos,error_conexion_db,res);

	} else res.redirect('/login?error=debe iniciar sesion primero');
});



/* POST agregar unidad */
router.post('/agregar_elemento', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var codigoUnidad = req.body.codigo_elemento_agregar ;
		codigoUnidad = codigoUnidad.toUpperCase();
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		if(validarCampos(codigoUnidad)){

			var respuesta_agregar_unidad = function(subparams) {//funcion llamada en el callback de la consulta
				res.json(subparams.rrows[0]);
			}

			//llamada al objeto base de datos
			var dbconnection = require('../../routes/dbconnection.js');
			//CALL `sdan001`.`sp_admin_ge_t_unidades_medida`(
				//<{p_operacion char(10)}>, 
				//<{p_codigo char(20)}>, 
				//<{p_codigo_usuario integer}>, 
				//<{p_ip char(40)}>);


			var str_query = 'CALL sp_admin_ge_t_unidades_medida(\'INSERT\',\''+codigoUnidad + '\','
				+req.user_session.codigo_usuario+',\''+ip+'\');';
			console.log(str_query);

			//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
			dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_agregar_unidad,error_conexion_db,res);

		}else{
			// si algun campo contiene algun caracter especial como comillas o diagonales se cancela la operación
			res.json([{tran_error: 9,tran_mensaje: 'Uno de los campos contiene caracteres inválidos. Operación cancelada.'}]);
		}

	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


/* POST borrar unidad */
router.post('/borrar_elemento', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var respuesta_borrar_unidad = function(subparams) {//funcion llamada en el callback de la consulta
			res.json(subparams.rrows[0]);
		}

		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');

		var codigoUnidad = req.body.codigo_elemento_borrar ;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		var str_query = 'CALL sp_admin_ge_t_unidades_medida(\'DELETE\',\''+codigoUnidad + '\','
			+req.user_session.codigo_usuario+',\''+ip+'\');';
		console.log(str_query);

		//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
		dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_borrar_unidad,error_conexion_db,res);
	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});



/* POST cambiar unidad */
router.post('/cambiar_elemento', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var codigoUnidad = req.body.codigo_elemento_cambiar ;
		codigoUnidad = codigoUnidad.toUpperCase();
		var codigoUnidadn = req.body.codigo_elemento_cambiado ;
		codigoUnidadn = codigoUnidadn.toUpperCase();
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		if(validarCampos(codigoUnidad) && validarCampos(codigoUnidadn)){
			// si todos los campos tienen un formato correcto se prosigue 

			var respuesta_actualizar_unidad = function(subparams) {//funcion llamada en el callback de la consulta
				res.json(subparams.rrows[0]);
			}
			//llamada al objeto base de datos
			var dbconnection = require('../../routes/dbconnection.js');

			var str_query = 'CALL sp_admin_ge_t_unidades_medida(\'UPDATE\',\''+codigoUnidad + '\','
				+req.user_session.codigo_usuario+',\''+ip+'\');';
			console.log(str_query);

			//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
			dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_actualizar_unidad,error_conexion_db,res);
		}else{
			// si algun campo contiene algun caracter especial como comillas o diagonales se cancela la operación
			res.json([{tran_error: 9,tran_mensaje: 'Uno de los campos contiene caracteres inválidos. Operación cancelada.'}]);
		}

		
	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});



/* POST buscar unidad */
router.post('/busqueda', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var intxt_buscar_elemento = req.body.intxt_buscar_elemento;
		console.log('busqueda en unidades: ' + intxt_buscar_elemento);

		var respuesta_busqueda_elementos = function(subparams) {//funcion llamada en el callback de la consulta
			console.log('Res: '+subparams.rrows[0]);
			res.json({
				tran_error: 0,
				tran_mensaje: 'Resultados de la busqueda: "'+intxt_buscar_elemento+'"' , 
				elementos: subparams.rrows[0]
			});
		}

		if(validarCampos(intxt_buscar_elemento)){//primero verificar si no contiene caracteres extraños
			//llamada al objeto base de datos
			var dbconnection = require('../../routes/dbconnection.js');

			//CALL `sdan002`.`sp_get_op_t_grupos`(<{p_codigo int}>, <{p_sort char(20)}>);
			var str_query = 'CALL sp_find_data_like(\'ge_t_unidades_medida\',\'' + intxt_buscar_elemento + '\');';

			// sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
			dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_busqueda_elementos,error_conexion_db,res);
		}else{
			// si algun campo contiene algun caracter especial como comillas o diagonales se cancela la operación
			res.json({tran_error: 9,tran_mensaje: 'La busqueda contiene caracteres inválidos' , grupos: [] });
		}
		
	} else res.redirect('/login?error=debe iniciar sesion primero');

});





//funcion que verifica que un texto no contenga caracteres extraños
function validarCampos(inputtxt){ 
	var letters = /^[A-Za-z0-9\s]+$/;  
	if(inputtxt.match(letters)) return true;  
	else return false;    
}  


/*Error si no hay acceso a la base de datos*/
var error_conexion_db = function(res){
	res.render('error_detalles', {
		detalle_error: 'Sin conexión a la base de datos, favor intente más tarde. <br />Si el problema persiste contacte a su proveedor de servicio.'
	});
}

module.exports = router;
