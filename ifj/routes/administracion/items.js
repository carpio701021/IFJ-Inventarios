var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var cargar_unidades_de_medida = function(subparams3){

			var cargar_grupos = function(subparams) {//funcion llamada en el callback de la consulta

				var cargar_items = function(subparams2) {//funcion llamada en el callback de la consulta
					res.render('administracion/items', {
						nombre_cliente: req.user_session.nombre_cliente,
						nombre_usuario: req.user_session.nombre_usuario,
						items: JSON.stringify(subparams2.rrows[0]),
						grupos: JSON.stringify(subparams.rrows[0]),
						gruposO: subparams.rrows[0],
						unidades_de_medidaO: subparams3.rrows[0]
					});
				};

				//llamada al objeto base de datos
				var dbconnection = require('../../routes/dbconnection.js');
				var str_query = 'CALL sp_get_op_t_items(0,0,\'CODIGO\');';
				dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', cargar_items,error_conexion_db,res);


			};

			//llamada al objeto base de datos
			var dbconnection2 = require('../../routes/dbconnection.js');
			var str_query2 = 'CALL sp_get_op_t_grupos(0,\'CODIGO\');';
			dbconnection2.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query2, '', cargar_grupos,error_conexion_db,res);

		}


		//llamada al objeto base de datos
		var dbconnection3 = require('../../routes/dbconnection.js');
		var str_query3 = 'CALL sp_get_ge_t_unidades_medida(\'0\',\'CODIGO\');';
		dbconnection3.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query3, '', cargar_unidades_de_medida,error_conexion_db,res);


	} else res.redirect('/login?error=debe iniciar sesion primero');
});

/* POST recargar items */
router.post('/recargar_items', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var cargar_items = function(subparams) {//funcion llamada en el callback de la consulta
			res.json(subparams.rrows[0]);
		}

		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');
		var str_query = 'CALL sp_get_op_t_items(0,0,\'CODIGO\');';
		dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', cargar_items,error_conexion_db,res);

	} else res.redirect('/login?error=debe iniciar sesion primero');
});


//funcion que verifica que un texto no contenga caracteres extraños
function validarCampos(inputtxt){ 
	console.log('Validando: '+inputtxt);
	if(inputtxt=='') return true;
	var letters = /^[A-Za-z0-9\sáéíóúÁÉÍÓÚ]+$/;  
	if(inputtxt.match(letters)) return true;  
	else return false;    
}  


/* POST actualizar item */
router.post('/cambiar_item', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var codigo_grupo_elemento_cambiar = req.body.codigo_grupo_elemento_cambiar;
		var codigo_elemento_cambiar  = req.body.codigo_elemento_cambiar;
		var descripcion_elemento_cambiar  = req.body.descripcion_elemento_cambiar ;
		var codigo_barras_elemento_cambiar  = (req.body.codigo_barras_elemento_cambiar || '');
		var cuenta_elemento_cambiar  = (req.body.cuenta_elemento_cambiar || '');
		var precio_costo_elemento_cambiar  = (req.body.precio_costo_elemento_cambiar || 0);
		var combo_elemento_cambiar  = ((req.body.combo_elemento_cambiar == 'S')?'S':'N' );
		var tipo_elemento_cambiar  = ((req.body.tipo_elemento_cambiar == 'P')?'P':'S' );
		var unidad_de_medida_elemento_cambiar  = req.body.unidad_de_medida_elemento_cambiar ;
		var existencia_elemento_cambiar  = (req.body.existencia_elemento_cambiar || 0);
		var precio1_elemento_cambiar  = req.body.precio1_elemento_cambiar;
		var precio2_elemento_cambiar  = (req.body.precio2_elemento_cambiar || 0);
		var precio3_elemento_cambiar  = (req.body.precio3_elemento_cambiar || 0);
		var precio4_elemento_cambiar  = (req.body.precio4_elemento_cambiar || 0);
		var permite_descuento_elemento_cambiar  = ((req.body.permite_descuento_elemento_cambiar == 'S')?'S':'N' );
		var maximo_descuento_elemento_cambiar  = (req.body.maximo_descuento_elemento_cambiar || 0);
		var control_posicion_elemento_cambiar  = ((req.body.control_posicion_elemento_cambiar == 'S')?'S':'N' );
		var estanteria_elemento_cambiar  = (req.body.estanteria_elemento_cambiar || '');
		var tramo_elemento_cambiar  = (req.body.tramo_elemento_cambiar ||'' );
		var nivel_elemento_cambiar  = (req.body.nivel_elemento_cambiar || '');
		var caja_elemento_cambiar  = (req.body.caja_elemento_cambiar || '');
		var referencia_elemento_cambiar  = (req.body.referencia_elemento_cambiar ||'' );
		var estado_elemento_cambiar  = req.body.estado_elemento_cambiar;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		if((codigo_grupo_elemento_cambiar == 0 )&& (codigo_elemento_cambiar == 0 )&&
			(descripcion_elemento_cambiar == '' )&& (unidad_de_medida_elemento_cambiar == '' )&&
			(precio1_elemento_cambiar== 0 )&& (estado_elemento_cambiar== '' )){
			// si algun campo obligatorio no está se cancela la operación
			console.log("No estan llenos todos los campos");
			return res.json([{tran_error: 8,tran_mensaje: 'No están llenos todos los campos obligatorios.'}]);
		}
		

		if(validarCampos(descripcion_elemento_cambiar) && validarCampos(cuenta_elemento_cambiar) 
			&& validarCampos(estanteria_elemento_cambiar) && validarCampos(tramo_elemento_cambiar)
			 && validarCampos(nivel_elemento_cambiar)  && validarCampos(caja_elemento_cambiar)  
			 && validarCampos(referencia_elemento_cambiar)){
			// si todos los campos tienen un formato correcto se prosigue 

			var respuesta_actualizar_items = function(subparams) {//funcion llamada en el callback de la consulta
				res.json(subparams.rrows[0]);
			}
			
			//llamada al objeto base de datos
			var dbconnection = require('../../routes/dbconnection.js');

			var str_query = 'CALL sp_admin_op_t_items('
				+'\'UPDATE\','
				+codigo_grupo_elemento_cambiar + ','
				+codigo_elemento_cambiar+ ',\''
				+descripcion_elemento_cambiar+ '\',\''
				+codigo_barras_elemento_cambiar+ '\',\''
				+cuenta_elemento_cambiar+ '\','
				+precio_costo_elemento_cambiar+ ',\''
				+combo_elemento_cambiar+ '\',\''
				+tipo_elemento_cambiar+ '\',\''
				+unidad_de_medida_elemento_cambiar+ '\','
				+existencia_elemento_cambiar+ ','
				+precio1_elemento_cambiar+ ','
				+precio2_elemento_cambiar+ ','
				+precio3_elemento_cambiar+ ','
				+precio4_elemento_cambiar+ ',\''
				+permite_descuento_elemento_cambiar+ '\','
				+maximo_descuento_elemento_cambiar+ ',\''
				+control_posicion_elemento_cambiar+ '\',\''
				+estanteria_elemento_cambiar+ '\',\''
				+tramo_elemento_cambiar+ '\',\''
				+nivel_elemento_cambiar+ '\',\''
				+caja_elemento_cambiar+ '\',\''
				+referencia_elemento_cambiar+ '\',\''
				+estado_elemento_cambiar+ '\','
				+req.user_session.codigo_usuario+',\''+ip+'\');';
			console.log(str_query);

			//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
			dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_actualizar_items,error_conexion_db,res);

		}else{
			// si algun campo contiene algun caracter especial como comillas o diagonales se cancela la operación
			res.json([{tran_error: 9,tran_mensaje: 'Uno de los campos contiene caracteres inválidos. Operación cancelada.'}]);
		}

		
	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


/* POST agregar item */
router.post('/agregar_item', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var codigo_grupo_elemento_agregar = req.body.codigo_grupo_elemento_agregar;
		var codigo_elemento_agregar  = req.body.codigo_elemento_agregar;
		var descripcion_elemento_agregar  = req.body.descripcion_elemento_agregar ;
		var codigo_barras_elemento_agregar  = (req.body.codigo_barras_elemento_agregar || '');
		var cuenta_elemento_agregar  = (req.body.cuenta_elemento_agregar || '');
		var precio_costo_elemento_agregar  = (req.body.precio_costo_elemento_agregar || 0);
		var combo_elemento_agregar  = ((req.body.combo_elemento_agregar == 'S')?'S':'N' );
		var tipo_elemento_agregar  = ((req.body.tipo_elemento_agregar == 'P')?'P':'S' );
		var unidad_de_medida_elemento_agregar  = req.body.unidad_de_medida_elemento_agregar ;
		var existencia_elemento_agregar  = (req.body.existencia_elemento_agregar || 0);
		var precio1_elemento_agregar  = req.body.precio1_elemento_agregar;
		var precio2_elemento_agregar  = (req.body.precio2_elemento_agregar || 0);
		var precio3_elemento_agregar  = (req.body.precio3_elemento_agregar || 0);
		var precio4_elemento_agregar  = (req.body.precio4_elemento_agregar || 0);
		var permite_descuento_elemento_agregar  = ((req.body.permite_descuento_elemento_agregar == 'S')?'S':'N' );
		var maximo_descuento_elemento_agregar  = (req.body.maximo_descuento_elemento_agregar || 0);
		var control_posicion_elemento_agregar  = ((req.body.control_posicion_elemento_agregar == 'S')?'S':'N' );
		var estanteria_elemento_agregar  = (req.body.estanteria_elemento_agregar || '');
		var tramo_elemento_agregar  = (req.body.tramo_elemento_agregar ||'' );
		var nivel_elemento_agregar  = (req.body.nivel_elemento_agregar || '');
		var caja_elemento_agregar  = (req.body.caja_elemento_agregar || '');
		var referencia_elemento_agregar  = (req.body.referencia_elemento_agregar ||'' );
		var estado_elemento_agregar  = req.body.estado_elemento_agregar;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		
		if((codigo_grupo_elemento_agregar == 0 )&& (codigo_elemento_agregar == 0 )&&
			(descripcion_elemento_agregar == '' )&& (unidad_de_medida_elemento_agregar == '' )&&
			(precio1_elemento_agregar== 0 )&& (estado_elemento_agregar== '' )){
			// si algun campo obligatorio no está se cancela la operación
			console.log("No estan llenos todos los campos");
			return res.json([{tran_error: 8,tran_mensaje: 'No están llenos todos los campos obligatorios.'}]);
		}
		

		if(validarCampos(descripcion_elemento_agregar) && validarCampos(cuenta_elemento_agregar) 
			&& validarCampos(estanteria_elemento_agregar) && validarCampos(tramo_elemento_agregar)
			 && validarCampos(nivel_elemento_agregar)  && validarCampos(caja_elemento_agregar)  
			 && validarCampos(referencia_elemento_agregar)){

			var respuesta_agregar_items = function(subparams) {//funcion llamada en el callback de la consulta
				return res.json(subparams.rrows[0]);
			}

			//llamada al objeto base de datos
			var dbconnection = require('../../routes/dbconnection.js');
			//CALL `sdan001`.`sp_admin_op_t_items`(
			//	<{p_operacion char(10)}>, 
			//	<{p_fk_grupo integer}>, 
			//	<{p_codigo integer}>, 
			//	<{p_descripcion char(60)}>, 
			//	<{p_codigo_barras char(10)}>, 
			//	<{p_cuenta_contable char(10)}>, 
			//	<{p_precio_costo decimal(10,4)}>, 
			//	<{p_Combo char(1)}>, 
			//	<{p_Tipo char(1)}>, 
			//	<{p_Unidad_Medida char(20)}>, 
			//	<{p_Existencia decimal(10,2)}>, 
			//	<{p_Precio_Venta_1 decimal(10,2)}>, <{p_Precio_Venta_2 decimal(10,2)}>, <{p_Precio_Venta_3 decimal(10,2)}>, <{p_Precio_Venta_4 decimal(10,2)}>, 
			//	<{p_Permite_Descuento char(1)}>, 
			//	<{p_Maximo_Descuento decimal(10,2)}>, 
			//	<{p_Control_Posicion char(1)}>, 
			//	<{p_Estanteria char(10)}>, 
			//	<{p_Tramo char(10)}>, 
			//	<{p_Nivel char(10)}>, 
			//	<{p_Caja char(10)}>, 
			//	<{p_Referencia char(20)}>, 
			//	<{p_estado char(1)}>, 
			//	<{p_codigo_usuario integer}>, <{p_ip char(40)}>);


			var str_query = 'CALL sp_admin_op_t_items('
				+'\'INSERT\','
				+codigo_grupo_elemento_agregar + ','
				+codigo_elemento_agregar+ ',\''
				+descripcion_elemento_agregar+ '\',\''
				+codigo_barras_elemento_agregar+ '\',\''
				+cuenta_elemento_agregar+ '\','
				+precio_costo_elemento_agregar+ ',\''
				+combo_elemento_agregar+ '\',\''
				+tipo_elemento_agregar+ '\',\''
				+unidad_de_medida_elemento_agregar+ '\','
				+existencia_elemento_agregar+ ','
				+precio1_elemento_agregar+ ','
				+precio2_elemento_agregar+ ','
				+precio3_elemento_agregar+ ','
				+precio4_elemento_agregar+ ',\''
				+permite_descuento_elemento_agregar+ '\','
				+maximo_descuento_elemento_agregar+ ',\''
				+control_posicion_elemento_agregar+ '\',\''
				+estanteria_elemento_agregar+ '\',\''
				+tramo_elemento_agregar+ '\',\''
				+nivel_elemento_agregar+ '\',\''
				+caja_elemento_agregar+ '\',\''
				+referencia_elemento_agregar+ '\',\''
				+estado_elemento_agregar+ '\','
				+req.user_session.codigo_usuario+',\''+ip+'\');';
			console.log(str_query);

			//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
			dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_agregar_items,error_conexion_db,res);

		}else{
			// si algun campo contiene algun caracter especial como comillas o diagonales se cancela la operación
			res.json([{tran_error: 9,tran_mensaje: 'Uno de los campos contiene caracteres inválidos. Operación cancelada.'}]);
		}

	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


/* POST borrar item */
router.post('/borrar_item', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var respuesta_borrar_items = function(subparams) {//funcion llamada en el callback de la consulta
			console.log(JSON.stringify(subparams.rrows[0]));
			res.json(subparams.rrows[0]);
		}

		//llamada al objeto base de datos
		var dbconnection = require('../../routes/dbconnection.js');
		//CALL `sdan001`.`sp_admin_op_t_items`(
		//	<{p_operacion char(10)}>, 
		//	<{p_fk_grupo integer}>, 
		//	<{p_codigo integer}>, 
		//	<{p_descripcion char(60)}>, 
		//	<{p_codigo_barras char(10)}>, 
		//	<{p_cuenta_contable char(10)}>, 
		//	<{p_precio_costo decimal(10,4)}>, 
		//	<{p_Combo char(1)}>, 
		//	<{p_Tipo char(1)}>, 
		//	<{p_Unidad_Medida char(20)}>, 
		//	<{p_Existencia decimal(10,2)}>, 
		//	<{p_Precio_Venta_1 decimal(10,2)}>, <{p_Precio_Venta_2 decimal(10,2)}>, <{p_Precio_Venta_3 decimal(10,2)}>, <{p_Precio_Venta_4 decimal(10,2)}>, 
		//	<{p_Permite_Descuento char(1)}>, 
		//	<{p_Maximo_Descuento decimal(10,2)}>, 
		//	<{p_Control_Posicion char(1)}>, 
		//	<{p_Estanteria char(10)}>, 
		//	<{p_Tramo char(10)}>, 
		//	<{p_Nivel char(10)}>, 
		//	<{p_Caja char(10)}>, 
		//	<{p_Referencia char(20)}>, 
		//	<{p_estado char(1)}>, 
		//	<{p_codigo_usuario integer}>, <{p_ip char(40)}>);

		var codigoElemento = req.body.codigo_elemento_borrar ;
		var codigoGrupoElemento = req.body.codigo_grupo_elemento_borrar ;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		var str_query = 'CALL sp_admin_op_t_items('+
			'\'DELETE\','
			+codigoGrupoElemento + ','
			+codigoElemento + ','
			+'\'\'' + ','+'\'\'' + ','+'\'\'' + ','
			+'0,'+'\'\'' + ','+'\'\'' + ','+'\'\'' + ','
			+'0' + ','+'0' + ','+'0' + ','+'0' + ','+'0' + ','
			+'\'\'' + ','+'0' + ','
			+'\'\'' + ','+'\'\'' + ','+'\'\'' + ','+'\'\'' + ','+'\'\'' + ','+'\'\'' + ','+'\'\'' + ','
			+req.user_session.codigo_usuario+',\''+ip+'\');';
		console.log(str_query);

		//sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
		dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_borrar_items,error_conexion_db,res);
	}else res.redirect('/login?error=sesion caducada, inicie sesion de nuevo');

});


/* POST buscar items */
router.post('/busqueda', function(req, res, next) {
	if (req.user_session && req.user_session.nombre_cliente) {

		var intxt_buscar_item = req.body.intxt_buscar_item ;
		var rdBuscar_p_codigo = req.body.rdBuscar_p_codigo ;
		console.log('busqueda: ' + intxt_buscar_item);
		console.log('por codigo : '+ rdBuscar_p_codigo);

		var respuesta_busqueda_items = function(subparams) {//funcion llamada en el callback de la consulta
			res.json({
				tran_error: 0,
				tran_mensaje: 'Resultados de la busqueda: "'+intxt_buscar_item+'"' , 
				items: subparams.rrows[0]
			});
		}

		if(validarCampos(intxt_buscar_item)){//primero verificar si no contiene caracteres extraños
			//llamada al objeto base de datos
			var dbconnection = require('../../routes/dbconnection.js');

			if(rdBuscar_p_codigo == 'true'){//si el tipo de busqueda es por codigo
				if(!isNaN(intxt_buscar_item)){
					//CALL `sdan002`.`sp_get_op_t_items`(<{p_codigo int}>, <{p_sort char(20)}>);
					var str_query = 'CALL sp_get_op_t_items(' + intxt_buscar_item + ',\'CODIGO\');';
				}else{
					res.json({tran_error: 9,tran_mensaje: 'Debe ingresar un numero para buscar por código' , items: [] });
					return false;
				}
			}else {//si la busqueda es por nombre/descripcion
				//CALL `sdan002`.`sp_get_op_t_items`(<{p_codigo int}>, <{p_sort char(20)}>);
				var str_query = 'CALL sp_find_data_like(\'op_t_items\',\'' + intxt_buscar_item + '\');';
			}
			// sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query)
			dbconnection.sdan_query(req.user_session.login_server , req.user_session.login_db, str_query, '', respuesta_busqueda_items,error_conexion_db,res);
		}else{
			// si algun campo contiene algun caracter especial como comillas o diagonales se cancela la operación
			res.json({tran_error: 9,tran_mensaje: 'La busqueda contiene caracteres inválidos' , items: [] });
		}
		
	} else res.redirect('/login?error=debe iniciar sesion primero');

});


var error_conexion_db = function(res){
	res.render('error_detalles', {
		detalle_error: 'Sin conexión a la base de datos, favor intente más tarde. <br />Si el problema persiste contacte a su proveedor de servicio.'
	});
}


module.exports = router;