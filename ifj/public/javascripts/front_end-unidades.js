var recargarListaElementos = function(){
	var requestABC ;
	if(window.XMLHttpRequest){//Soporte para IE7+,Firefox,chrome,opera,safari
		requestABC = new XMLHttpRequest();
	}else{ //IE6-
		requestABC = new ActiveXObject("Microsoft.XMLHTTP");
	}
	requestABC.onreadystatechange = function(){
		if(requestABC.readyState==4)
			if(requestABC.status==200) {
				//acciones cuado se haya cargado la pagina
				elementos = JSON.parse(requestABC.responseText);
			}else mensajeErrorGeneral(); 
	}
	requestABC.open("POST","/administracion/unidades/recargar_elementos",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send();
}

var cargarLista = function(lista_elementos,titulo_tabla){
	var htmlDelListadoDeElementos='<Table>';
	htmlDelListadoDeElementos+='<tr> <td>'+titulo_tabla+'</td> </tr>';
	if(lista_elementos && lista_elementos.length > 0)
		for(elemento in lista_elementos){
			htmlDelListadoDeElementos
				+='<tr>'
				+'<td>'
				+'<p><b>Unidad de medida: </b>'+lista_elementos[elemento].Codigo +'</p>'
				+'<p><b>Última actualización: </b>'+(lista_elementos[elemento].Fecha_Update||'-No establecido-')+ '</p>'
				+'<br></br>'
				+'<input type="submit" value="Modificar" style="width:45%" '
				+'onClick="onClickBtnMostrarCambiarElemento('
					+'\''+lista_elementos[elemento].Codigo+'\''+')"/>'
				+'&nbsp;'
				+'<input type="submit" value="Borrar" style="width:45%"'
				+'onClick="onClickBtnBorrarElemento('
					+'\''+lista_elementos[elemento].Codigo+'\''+')"/>'
				+'</td>'
				+'</tr>';
		}
	else
		htmlDelListadoDeElementos
				+='<tr>'+'<td>'
				+'<h2> -Sin resultados- </h2>'
				+'</td>'
				+'</tr>';
	
	htmlDelListadoDeElementos+='</table>';
	document.getElementById("divlistadoelementos").innerHTML = htmlDelListadoDeElementos;
};

//window.onload = function(){  };

var onClickBtnMostrarTodos = function(){
	//ocultar y mostrar
	cargarLista(elementos,'Todas las unidades de medida');
	seclistelementos.style.display="block";
	nuevoElemento.style.display="none";
	opciones.style.display="none";
	cambiarElemento.style.display="none";
}

var onClickBtnMostrarMenu = function(){
	//ocultar y mostrar
	seclistelementos.style.display="none";
	nuevoElemento.style.display="none";
	opciones.style.display="block";
	cambiarElemento.style.display="none";
	mensajes.style.display="none";
}

var onClickBtnMostrarNuevoElemento = function(){
	//limpiar valores actuales
	codigo_elemento_agregar.value="";
	//ocultar y mostrar
	seclistelementos.style.display="none";
	nuevoElemento.style.display="block";
	opciones.style.display="none";
	cambiarElemento.style.display="none";
}

var onClickBtnMostrarCambiarElemento = function(codigo){
	//cambiar valores actuales
	codigo_elemento_cambiar.value=codigo;
	//ocultar y mostrar
	seclistelementos.style.display="none";
	nuevoElemento.style.display="none";
	opciones.style.display="none";
	cambiarElemento.style.display="block";
}

var onClickBtnCancelar = function(){
	if (confirm("¿Seguro desea cancelar operación?")) {
		//ocultar y mostrar
		seclistelementos.style.display="none";
		nuevoElemento.style.display="none";
		opciones.style.display="block";
		cambiarElemento.style.display="none";
	} 
}

var mensajeErrorGeneral = function(error){	
	if(error){
		titulo_mensajes_operaciones.innerHTML = '¡Error!';
		mensajes_operaciones.innerHTML = error;
		//ocultar y mostrar
		seclistelementos.style.display="none";
		nuevoElemento.style.display="none";
		opciones.style.display="none";
		cambiarElemento.style.display="none";
		mensajes.style.display = "block";			
	} else {
		titulo_mensajes_operaciones.innerHTML = '¡Error!';
		mensajes_operaciones.innerHTML = 'Algo salió mal, favor intente mas tarde.';
		//ocultar y mostrar
		seclistelementos.style.display="none";
		nuevoElemento.style.display="none";
		opciones.style.display="none";
		cambiarElemento.style.display="none";
		mensajes.style.display = "block";			
	}
}

var onClickBtnBorrarElemento = function(codigo){
	if(confirm("Esta a punto de borrar el elemento:" + "\n" 
		+ "Codigo: " + codigo + "\n" 
		+ "\n\n¿Desea continuar?" )
	){
		var data = '';
		data+='codigo_elemento_borrar=' + codigo;

		var requestABC ;
		if(window.XMLHttpRequest){//Soporte para IE7+,Firefox,chrome,opera,safari
			requestABC = new XMLHttpRequest();
		}else{ //IE6-
			requestABC = new ActiveXObject("Microsoft.XMLHTTP");
		}

		requestABC.onreadystatechange = function(){
			if(requestABC.readyState==4)
				if(requestABC.status==200) {
					//acciones cuado se haya cargado la pagina
					var respuesta = JSON.parse(requestABC.responseText);
					if(respuesta[0].tran_error == 0 ) {
						recargarListaElementos();
						titulo_mensajes_operaciones.innerHTML = '¡Hecho!';
						mensajes_operaciones.innerHTML = respuesta[0].tran_mensaje;
						seclistelementos.style.display = "none";
						mensajes.style.display = "block";
					} else if(respuesta[0].tran_error == 2){
						alert("Error: \nEl código especificado no existe");							
					}else mensajeErrorGeneral();					
				}else mensajeErrorGeneral(); 
		}
		requestABC.open("POST","/administracion/unidades/borrar_elemento",true);
		requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		requestABC.send(data);
	}else{
		return false;
	}
}

var onClickBtnAgregarElemento = function(){
	if (codigo_elemento_agregar.value == '' ) {
		return false;			
	}else if (codigo_elemento_agregar.value.length > 20 ) {
		alert("Error: \nEl nombre solo puede tener hasta 20 caracteres");	
		return false;			
	}

	var data = '';
	data+='codigo_elemento_agregar=' + codigo_elemento_agregar.value ;

	var requestABC ;
	if(window.XMLHttpRequest){//Soporte para IE7+,Firefox,chrome,opera,safari
		requestABC = new XMLHttpRequest();
	}else{ //IE6-
		requestABC = new ActiveXObject("Microsoft.XMLHTTP");
	}

	requestABC.onreadystatechange = function(){
		if(requestABC.readyState==4)
			if(requestABC.status==200) {
				//acciones cuado se aya cargado la pagina
				var respuesta = JSON.parse(requestABC.responseText);
				if(respuesta[0].tran_error == 0 ) {
					recargarListaElementos();
					titulo_mensajes_operaciones.innerHTML = '¡Hecho!';
					mensajes_operaciones.innerHTML = respuesta[0].tran_mensaje;
					nuevoElemento.style.display = "none";
					mensajes.style.display = "block";
				} else if(respuesta[0].tran_error == 1){
					alert("Error: \nEl código especificado ya existe");							
				} else if(respuesta[0].tran_error == 9){
					titulo_mensajes_operaciones.innerHTML = '¡Error!';
					alert(respuesta[0].tran_mensaje);							
				} else mensajeErrorGeneral();					
			}else mensajeErrorGeneral(); 
	}
	requestABC.open("POST","/administracion/unidades/agregar_elemento",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send(data);
}

var onClickBtnCambiarElemento = function(){
if (codigo_elemento_cambiado.value == '' ) {
		return false;			
	}else if (codigo_elemento_cambiado.value.length > 20 ) {
		alert("Error: \nEl nombre solo puede tener hasta 20 caracteres");	
		return false;			
	}

	var data = '';
	data+='codigo_elemento_cambiar=' + codigo_elemento_cambiar.value + '&' ;
	data+='codigo_elemento_cambiado=' + codigo_elemento_cambiado.value ;

	var requestABC ;
	if(window.XMLHttpRequest){//Soporte para IE7+,Firefox,chrome,opera,safari
		requestABC = new XMLHttpRequest();
	}else{ //IE6-
		requestABC = new ActiveXObject("Microsoft.XMLHTTP");
	}

	requestABC.onreadystatechange = function(){
		if(requestABC.readyState==4)
			if(requestABC.status==200) {
				//acciones cuado se aya cargado la pagina
				var respuesta = JSON.parse(requestABC.responseText);
				if(respuesta[0].tran_error == 0 ) {
					recargarListaElementos();
					titulo_mensajes_operaciones.innerHTML = '¡Hecho!';
					mensajes_operaciones.innerHTML = respuesta[0].tran_mensaje;
					cambiarElemento.style.display = "none";
					mensajes.style.display = "block";
				} else if(respuesta[0].tran_error == 2){
					titulo_mensajes_operaciones.innerHTML = '¡Error!';
					alert("Error: \nEl código especificado no existe");							
				} else if(respuesta[0].tran_error == 9){
					titulo_mensajes_operaciones.innerHTML = '¡Error!';
					alert(respuesta[0].tran_mensaje);							
				}else mensajeErrorGeneral();					
			}else mensajeErrorGeneral(); 
	}
	requestABC.open("POST","/administracion/unidades/cambiar_elemento",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send(data);
}

var onClickBtnBuscarElementos = function(){
	if (intxt_buscar_elemento.value == '' ) return false;
	var data = '';
	data+='intxt_buscar_elemento=' + intxt_buscar_elemento.value ;

	var requestABC ;
	if(window.XMLHttpRequest){//Soporte para IE7+,Firefox,chrome,opera,safari
		requestABC = new XMLHttpRequest();
	}else{ //IE6-
		requestABC = new ActiveXObject("Microsoft.XMLHTTP");
	}

	requestABC.onreadystatechange = function(){
		if(requestABC.readyState==4)
			if(requestABC.status==200) {
				//acciones cuado se aya cargado la pagina
				var respuesta = JSON.parse(requestABC.responseText);
				if(respuesta.tran_error == 0 ) {
					titulo = respuesta.tran_mensaje;
					elementos_res_busqueda = respuesta.elementos;
					cargarLista(elementos_res_busqueda,titulo);
					//ocultar y mostrar
					seclistelementos.style.display="block";
					nuevoElemento.style.display="none";
					opciones.style.display="none";
					cambiarElemento.style.display="none";
				} else if(respuesta.tran_error == 9){
					alert(respuesta.tran_mensaje);							
				}else mensajeErrorGeneral();					
			}else mensajeErrorGeneral(); 
	}
	requestABC.open("POST","/administracion/unidades/busqueda",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send(data);
}