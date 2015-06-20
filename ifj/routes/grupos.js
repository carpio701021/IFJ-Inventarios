var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var cargar_grupos = function(subparams) {//funcion llamada en el callback de la consulta
			res.render('grupos', {
				nombre_cliente: req.user_session.nombre_cliente,
				nombre_usuario: req.user_session.nombre_usuario,
				grupos: JSON.stringify(subparams.rrows[0])
			});
		}

		//llamada al objeto base de datos
		var dbconnection = require('../routes/dbconnection.js');

		//CALL `sdan002`.`sp_get_op_t_grupos`(<{p_codigo int}>, <{p_sort char(20)}>);
		var str_query = 'CALL sp_get_op_t_grupos(' + 0 + ',\'CODIGO\');';

		// sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
		var dbstrname = 'sdan';

		//definir nombre completo de la base de datos
		if(req.user_session.login_db <=9) dbstrname +='00'+req.user_session.login_db;
		else if(req.user_session.login_db <=99) dbstrname +='0'+req.user_session.login_db;

		dbconnection.sdan_query(req.user_session.login_server, 'root', '1234', dbstrname, str_query, '', cargar_grupos);

	} else res.redirect('/login?error=debe iniciar sesion primero');
});


/* POST actualizar grupo */
router.post('/cambiar_grupo', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var respuesta_actualizar_grupos = function(subparams) {//funcion llamada en el callback de la consulta
			res.json(subparams.rrows[0]);
		}

		//llamada al objeto base de datos
		var dbconnection = require('../routes/dbconnection.js');
		//CALL `sdan001`.`sp_admin_op_t_grupos`(
			//<{p_operacion char(10)}>, 
			//<{p_codigo integer}>, 
			//<{p_descripcion char(60)}>, 
			//<{p_cuenta_contable char(10)}>, 
			//<{p_estado char(1)}>, 
			//<{p_codigo_usuario integer}>, 
			//<{p_ip char(40)}>		);

		var codigoGrupo = req.body.codigo_grupo_cambiar ;
		var descripcion = req.body.descripcion_grupo_cambiar ;
		var cuenta_contable = req.body.cuenta_grupo_cambiar ;
		var estado = req.body.estado_grupo_cambiar ;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		var str_query = 'CALL sp_admin_op_t_grupos(\'UPDATE\','+codigoGrupo
			+',\''+descripcion+'\',\''+cuenta_contable+'\',\''
			+estado+'\','+req.user_session.codigo_usuario+',\''+ip+'\');';
		console.log(str_query);

		//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
		var dbstrname = 'sdan';
		//definir nombre completo de la base de datos
		if(req.user_session.login_db <=9) dbstrname +='00'+req.user_session.login_db;
		else if(req.user_session.login_db <=99) dbstrname +='0'+req.user_session.login_db;

		dbconnection.sdan_query(req.user_session.login_server, 'root', '1234', dbstrname, str_query, '', respuesta_actualizar_grupos);
	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


/* POST agregar grupo */
router.post('/agregar_grupo', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var respuesta_actualizar_grupos = function(subparams) {//funcion llamada en el callback de la consulta
			res.json(subparams.rrows[0]);
		}

		//llamada al objeto base de datos
		var dbconnection = require('../routes/dbconnection.js');
		//CALL `sdan001`.`sp_admin_op_t_grupos`(
			//<{p_operacion char(10)}>, 
			//<{p_codigo integer}>, 
			//<{p_descripcion char(60)}>, 
			//<{p_cuenta_contable char(10)}>, 
			//<{p_estado char(1)}>, 
			//<{p_codigo_usuario integer}>, 
			//<{p_ip char(40)}>		);

		var codigoGrupo = req.body.codigo_grupo_agregar ;
		var descripcion = req.body.descripcion_grupo_agregar ;
		var cuenta_contable = req.body.cuenta_grupo_agregar ;
		var estado = req.body.estado_grupo_agregar ;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		var str_query = 'CALL sp_admin_op_t_grupos(\'INSERT\','+codigoGrupo
			+',\''+descripcion+'\',\''+cuenta_contable+'\',\''
			+estado+'\','+req.user_session.codigo_usuario+',\''+ip+'\');';
		console.log(str_query);

		//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
		var dbstrname = 'sdan';
		//definir nombre completo de la base de datos
		if(req.user_session.login_db <=9) dbstrname +='00'+req.user_session.login_db;
		else if(req.user_session.login_db <=99) dbstrname +='0'+req.user_session.login_db;

		dbconnection.sdan_query(req.user_session.login_server, 'root', '1234', dbstrname, str_query, '', respuesta_actualizar_grupos);
	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


/* POST borrar grupo */
router.post('/borrar_grupo', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var respuesta_actualizar_grupos = function(subparams) {//funcion llamada en el callback de la consulta
			res.json(subparams.rrows[0]);
		}

		//llamada al objeto base de datos
		var dbconnection = require('../routes/dbconnection.js');
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
		var dbstrname = 'sdan';
		//definir nombre completo de la base de datos
		if(req.user_session.login_db <=9) dbstrname +='00'+req.user_session.login_db;
		else if(req.user_session.login_db <=99) dbstrname +='0'+req.user_session.login_db;

		dbconnection.sdan_query(req.user_session.login_server, 'root', '1234', dbstrname, str_query, '', respuesta_actualizar_grupos);
	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


module.exports = router;