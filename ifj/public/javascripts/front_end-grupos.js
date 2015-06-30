var recargarListaGrupos = function(){
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
				lgrupos = JSON.parse(requestABC.responseText);
			}else mensajeErrorGeneral(); 
	}
	requestABC.open("POST","/administracion/grupos/recargar_grupos",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send();
}

var cargarLista = function(lista_grupos,titulo_tabla){
	var htmlDelListadoDeGrupos='<Table>';
	htmlDelListadoDeGrupos+='<tr> <td>'+titulo_tabla+'</td> </tr>';
	if(lista_grupos.length > 0)
		for(grupo in lista_grupos){
			htmlDelListadoDeGrupos
				+='<tr>'
				+'<td>'
				+'<p><b>Codigo: </b>'+lista_grupos[grupo].Codigo +'</p>'
				+'<p><b>Descripción: </b>'+(lista_grupos[grupo].Descripcion||'-Sin descripcion-') + '</p>'
				+'<p><b>Cuenta contable: </b>'+(lista_grupos[grupo].Cuenta_Contable||'-No establecido-')+ '</p>'
				+'<p><b>Estado: </b>'+(lista_grupos[grupo].Estado||'-No establecido-')+ '</p>'
				+'<br></br>'
				+'<input type="submit" value="Modificar" style="width:45%" '
				+'onClick="onClickBtnMostrarCambiarGrupo('
					+lista_grupos[grupo].Codigo+',\''+lista_grupos[grupo].Descripcion+'\',\''+lista_grupos[grupo].Cuenta_Contable+'\',\''+lista_grupos[grupo].Estado+'\')"/>'
				+'&nbsp;'
				+'<input type="submit" value="Borrar" style="width:45%"'
				+'onClick="onClickBtnBorrarGrupo('
					+lista_grupos[grupo].Codigo+',\''+lista_grupos[grupo].Descripcion+'\',\''+lista_grupos[grupo].Cuenta_Contable+'\',\''+lista_grupos[grupo].Estado+'\')"/>'
				+'</td>'
				+'</tr>';
		}
	else
		htmlDelListadoDeGrupos
				+='<tr>'+'<td>'
				+'<h2> -Sin resultados-</h2>'
				+'</td>'
				+'</tr>';
	
	htmlDelListadoDeGrupos+='</table>';
	document.getElementById("divlistadogrupos").innerHTML = htmlDelListadoDeGrupos;
};

//window.onload = function(){  };

var onClickBtnMostrarTodosG = function(){
	//ocultar y mostrar
	cargarLista(lgrupos,'Todos los Grupos');
	seclistgrupos.style.display="block";
	nuevoGrupo.style.display="none";
	opciones.style.display="none";
	cambiarGrupo.style.display="none";
}

var onClickBtnMostrarMenu = function(){
	//ocultar y mostrar
	seclistgrupos.style.display="none";
	nuevoGrupo.style.display="none";
	opciones.style.display="block";
	cambiarGrupo.style.display="none";
	mensajes.style.display="none";
}

var onClickBtnMostrarNuevoGrupo = function(){
	//limpiar valores actuales
	codigo_grupo_agregar.value="";
	descripcion_grupo_agregar.value="";
	cuenta_grupo_agregar.value="";
	estado_grupo_agregar.value="";
	//ocultar y mostrar
	seclistgrupos.style.display="none";
	nuevoGrupo.style.display="block";
	opciones.style.display="none";
	cambiarGrupo.style.display="none";
}

var onClickBtnMostrarCambiarGrupo = function(codigo,descripcion,cuenta,estado){
	//cambiar valores actuales
	codigo_grupo_cambiar.value=codigo;
	descripcion_grupo_cambiar.value=descripcion;
	cuenta_grupo_cambiar.value=cuenta;
	estado_grupo_cambiar.value=estado;
	//ocultar y mostrar
	seclistgrupos.style.display="none";
	nuevoGrupo.style.display="none";
	opciones.style.display="none";
	cambiarGrupo.style.display="block";
}

var onClickBtnCancelar = function(){
	if (confirm("¿Seguro desea cancelar operación?")) {
		//ocultar y mostrar
		seclistgrupos.style.display="none";
		nuevoGrupo.style.display="none";
		opciones.style.display="block";
		cambiarGrupo.style.display="none";
	} 
}

var mensajeErrorGeneral = function(error){	
	if(error){
		titulo_mensajes_operaciones.innerHTML = '¡Error!';
		mensajes_operaciones.innerHTML = error;
		//ocultar y mostrar
		seclistgrupos.style.display="none";
		nuevoGrupo.style.display="none";
		opciones.style.display="none";
		cambiarGrupo.style.display="none";
		mensajes.style.display = "block";			
	} else {
		titulo_mensajes_operaciones.innerHTML = '¡Error!';
		mensajes_operaciones.innerHTML = 'Algo salió mal, favor intente mas tarde.';
		//ocultar y mostrar
		seclistgrupos.style.display="none";
		nuevoGrupo.style.display="none";
		opciones.style.display="none";
		cambiarGrupo.style.display="none";
		mensajes.style.display = "block";			
	}
}

var onClickBtnBorrarGrupo = function(codigo,descripcion,cuenta,estado){
	if(confirm("Esta a punto de borrar el grupo:" + "\n" 
		+ "Codigo: " + codigo + "\n" 
		+ "Descripcion: " + descripcion + "\n" 
		+ "Cuenta: " + (cuenta || '-Sin asignar-') + "\n" 
		+ "Estado: " + (estado || '-Sin asignar-') + "\n\n¿Desea continuar?" )
	){
		var data = '';
		data+='codigo_grupo_borrar=' + codigo;

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
						recargarListaGrupos();
						titulo_mensajes_operaciones.innerHTML = '¡Hecho!';
						mensajes_operaciones.innerHTML = respuesta[0].tran_mensaje;
						seclistgrupos.style.display = "none";
						mensajes.style.display = "block";
					} else if(respuesta[0].tran_error == 2){
						alert("Error: \nEl código especificado no existe");							
					}else mensajeErrorGeneral();					
				}else mensajeErrorGeneral(); 
		}
		requestABC.open("POST","/administracion/grupos/borrar_grupo",true);
		requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		requestABC.send(data);
	}else{
		return false;
	}
}

var onClickBtnAgregarGrupo = function(){
	if (cuenta_grupo_agregar.value == '' ) {
		return false;			
	}else if (cuenta_grupo_agregar.value.length > 10 ) {
		alert("Error: \nLa cuenta contable solo puede tener hasta 10 caracteres");	
		return false;			
	}else if (codigo_grupo_agregar.value == '' ) {
		return false;			
	}else if (descripcion_grupo_agregar.value.length > 60 ) {
		alert("Error: \nLa descripcion solo puede tener hasta 60 caracteres");	
		return false;			
	}else if (descripcion_grupo_agregar.value == '' ) {
		return false;			
	}else if (estado_grupo_agregar.value == '' ) {
		return false;			
	}

	var data = '';
	data+='codigo_grupo_agregar=' + codigo_grupo_agregar.value + '&';
	data+='descripcion_grupo_agregar=' + descripcion_grupo_agregar.value + '&';
	data+='cuenta_grupo_agregar=' + cuenta_grupo_agregar.value + '&';
	data+='estado_grupo_agregar=' + estado_grupo_agregar.value ;

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
					recargarListaGrupos();
					titulo_mensajes_operaciones.innerHTML = '¡Hecho!';
					mensajes_operaciones.innerHTML = respuesta[0].tran_mensaje;
					nuevoGrupo.style.display = "none";
					mensajes.style.display = "block";
				} else if(respuesta[0].tran_error == 1){
					alert("Error: \nEl código especificado ya existe");							
				} else if(respuesta[0].tran_error == 9){
					titulo_mensajes_operaciones.innerHTML = '¡Error!';
					alert(respuesta[0].tran_mensaje);							
				} else mensajeErrorGeneral();					
			}else mensajeErrorGeneral(); 
	}
	requestABC.open("POST","/administracion/grupos/agregar_grupo",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send(data);
}

var onClickBtnCambiarGrupo = function(){
	if (cuenta_grupo_cambiar.value == '' ) {
		return false;			
	}else if (cuenta_grupo_cambiar.value.length > 10 ) {
		alert("Error: \nLa cuenta contable solo puede tener hasta 10 caracteres");	
		return false;			
	}else if (codigo_grupo_cambiar.value == '' ) {
		return false;			
	}else if (descripcion_grupo_cambiar.value.length > 60 ) {
		alert("Error: \nLa descripcion solo puede tener hasta 60 caracteres");	
		return false;			
	}else if (descripcion_grupo_cambiar.value == '' ) {
		return false;			
	}else if (estado_grupo_cambiar.value == '' ) {
		return false;			
	}

	var data = '';
	data+='codigo_grupo_cambiar=' + codigo_grupo_cambiar.value + '&';
	data+='descripcion_grupo_cambiar=' + descripcion_grupo_cambiar.value + '&';
	data+='cuenta_grupo_cambiar=' + cuenta_grupo_cambiar.value + '&';
	data+='estado_grupo_cambiar=' + estado_grupo_cambiar.value ;

	var requestCambiarG ;
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
					recargarListaGrupos();
					titulo_mensajes_operaciones.innerHTML = '¡Hecho!';
					mensajes_operaciones.innerHTML = respuesta[0].tran_mensaje;
					cambiarGrupo.style.display = "none";
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
	requestABC.open("POST","/administracion/grupos/cambiar_grupo",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send(data);
}

var onClickBtnBuscarGrupos = function(){
	if (intxt_buscar_grupo.value == '' ) return false;
	var data = '';
	data+='intxt_buscar_grupo=' + intxt_buscar_grupo.value + '&';
	data+='rdBuscar_p_codigo=' + rdBuscar_p_codigo.checked ;

	var requestCambiarG ;
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
					grupos_res_busqueda = respuesta.grupos;
					cargarLista(grupos_res_busqueda,titulo);
					//ocultar y mostrar
					seclistgrupos.style.display="block";
					nuevoGrupo.style.display="none";
					opciones.style.display="none";
					cambiarGrupo.style.display="none";
				} else if(respuesta.tran_error == 9){
					alert(respuesta.tran_mensaje);							
				}else mensajeErrorGeneral();					
			}else mensajeErrorGeneral(); 
	}
	requestABC.open("POST","/administracion/grupos/busqueda",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send(data);
}