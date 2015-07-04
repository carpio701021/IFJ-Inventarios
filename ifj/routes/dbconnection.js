var express = require('express');
var router = express.Router();


default_dbhost='localhost';
default_dbuser='sdan_web';
default_dbpassword='web_pass';
default_db = 'sdandb';

function sdan_query_specific (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query , if_error , res){

	//conexion a la base de datos que utilizaremos
	var mysql = require('mysql');
	var connection = mysql.createConnection({
		host     : host,
		user     : user,
		password : password,
		database : database_to_use
	});

	//Se conecta a la base de datos
	connection.connect(function(err){
		if(!err) {
			console.log("Database " + database_to_use + " is connected ...");  
			//Si la conexion es exitosa manda a ejecutar el query
			connection.query(myquery, function(err, rows, fields) {
				console.log('Ejecutando myquery =>' + myquery );
				if (err){
					//codigo de error
					console.log('Error al ejecutar la consulta');
					 if_error(res);
					connection.end();
				}else{
					connection.end(function(err){
						if (err){
							//codigo de error
							console.log('Error al cerrar conexion');
							if_error(res);
							connection.end();
						}else{
							console.log('Consulta exitosa');
							//Si todo sale bien ejecutamos el callback_to_query
							var params = {subparams : callback_to_query_parameters,rrows:rows,rfields:fields};
							callback_to_query(params);

							/* Metodos funcionales
							for (row in rows){}
								console.log('One row: '+ JSON.stringify(rows[row].Nit) + '\n\n');
								console.log('One row: '+ JSON.stringify(rows[row].Nit) + '\n\n');

							console.log('Rows: ', rows);
							console.log('Fields: ', fields);
							*/
						}

					});
				}
			});

		} else {
			console.log("Error connecting database ...");  
			if_error(res);
		}
	});

}


exports.sdandb_query = function(  myquery , callback_to_query_parameters , callback_to_query , if_error , res){
	sdan_query_specific (default_dbhost , 
		default_dbuser , 
		default_dbpassword , 
		default_db , 
		myquery , 
		callback_to_query_parameters , 
		callback_to_query , 
		if_error , 
		res );
}
//dbstrname


function sdan_query (host , database_to_use , myquery , callback_to_query_parameters , callback_to_query , if_error , res){

	//definir nombre completo de la base de datos
	var dbstrname = 'sdan';
	if(database_to_use <=9) dbstrname +='00'+ database_to_use;
	else if(database_to_use <=99) dbstrname +='0'+ database_to_use;

	return sdan_query_specific (host , default_dbuser , default_dbpassword , dbstrname , myquery , callback_to_query_parameters , callback_to_query , if_error,res);
}

exports.sdan_query = sdan_query;
