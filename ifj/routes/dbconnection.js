var express = require('express');
var router = express.Router();


var default_dbhost='localhost';
var default_dbuser='sdan_web';
var default_dbpassword='web_pass';
var default_db = 'sdandb';
//sdan_web
//web_pass

exports.sdandb_query = function(  myquery , callback_to_query_parameters , callback_to_query){
	sdan_query(default_dbhost , 
		default_dbuser,
		default_dbpassword,
		default_db,
		myquery,
		callback_to_query_parameters,
		callback_to_query);
}

function sdan_query (host , user , password , database_to_use , myquery , callback_to_query_parameters , callback_to_query){

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
			console.log("Database "+database_to_use+" is connected ...");  
			//Si la conexion es exitosa manda a ejecutar el query
			connection.query(myquery, function(err, rows, fields) {
				console.log('Ejecutando myquery =>' + myquery );
				if (err){
					//codigo de error
					console.log('Error al ejecutar la consulta');
					connection.end();
				}else{
					connection.end(function(err){
						if (err){
							//codigo de error
							console.log('Error al cerrar conexion');
							connection.end();
						}else{
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
		}
	});


	


}

exports.sdan_query = sdan_query;
