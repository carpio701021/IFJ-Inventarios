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
	requestABC.open("POST","/administracion/items/recargar_items",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send();
};

var cargarLista = function(lista_elementos,titulo_tabla){
	var htmlDelListadoDeElementos='<Table>';
	htmlDelListadoDeElementos+='<tr> <td>'+titulo_tabla+'</td> </tr>';
	if(lista_elementos.length > 0)		
		for(elemento in lista_elementos){
			var nombre_grupo = '';
			for (grupo in grupos)
				if(grupos[grupo].Codigo == lista_elementos[elemento].FK_Grupo)
					nombre_grupo = grupos[grupo].Descripcion;
			
			htmlDelListadoDeElementos
				+='<tr>'
				+'<td>'

				+ '<p><b>Grupo: </b>' + lista_elementos[elemento].FK_Grupo + ', ' + nombre_grupo + '</p>'
				+ '<p><b>Código de Item: </b>' + (lista_elementos[elemento].Codigo  ||'-Sin definir-') + '</p>'
				+ '<p><b>Descripción: </b>' + (lista_elementos[elemento].Descripcion  ||'-Sin definir-') + '</p>'
				+ '<p><b>Código de Barras: </b>' + (lista_elementos[elemento].Codigo_Barras  ||'-Sin definir-') + '</p>'
				+ '<p><b>Cuenta Contable: </b>' + (lista_elementos[elemento].Cuenta_Contable  ||'-Sin definir-') + '</p>'
				+ '<p><b>Precio de Costo: </b>' + (lista_elementos[elemento].Precio_Costo  ||'-Sin definir-') + '</p>'
				+ '<p><b>Combo: </b>' + ((lista_elementos[elemento].Combo == 'S')?'Sí':'No') + '</p>'
				+ '<p><b>Tipo: </b>' + ((lista_elementos[elemento].Tipo == 'P')?'Producto':'Servicio')  + '</p>'
				+ '<p><b>Unidad de medida: </b>' + (lista_elementos[elemento].Unidad_Medida  ||'-Sin definir-') + '</p>'
				+ '<p><b>Existencia: </b>' + (lista_elementos[elemento].Existencia  ) + '</p>'
				+ '<p><b>Numero de decimales: </b>' + (lista_elementos[elemento].Numero_Decimales ) + '</p>'
				+ '<p><b>Precio de Venta 1: </b>' + (lista_elementos[elemento].Precio_Venta_1 ) + '</p>'
				+ '<p><b>Precio de Venta 2: </b>' + (lista_elementos[elemento].Precio_Venta_2  ||'-Sin definir-') + '</p>'
				+ '<p><b>Precio de Venta 3: </b>' + (lista_elementos[elemento].Precio_Venta_3  ||'-Sin definir-') + '</p>'
				+ '<p><b>Precio de Venta 4: </b>' + (lista_elementos[elemento].Precio_Venta_4  ||'-Sin definir-') + '</p>'
				+ '<p><b>Permite descuento: </b>' + ((lista_elementos[elemento].Permite_Descuento == 'S')?'Sí':'No' ) + '</p>'
				+ '<p><b>Máximo descuento: </b>' + (lista_elementos[elemento].Maximo_Descuento  ||'-Sin definir-') + '</p>'
				+ '<p><b>Control por posición: </b>' + ((lista_elementos[elemento].Control_Posicion == 'S')?'Sí':'No' ) + '</p>';
				if(lista_elementos[elemento].Control_Posicion == 'S')
					htmlDelListadoDeElementos				
					+= '<p><b>Estantería: </b>' + (lista_elementos[elemento].Estanteria  ||'-Sin definir-') + '</p>'
					+ '<p><b>Tramo: </b>' + (lista_elementos[elemento].Tramo  ||'-Sin definir-') + '</p>'
					+ '<p><b>Nivel: </b>' + (lista_elementos[elemento].Nivel  ||'-Sin definir-') + '</p>'
					+ '<p><b>Caja: </b>' + (lista_elementos[elemento].Caja  ||'-Sin definir-') + '</p>';
				htmlDelListadoDeElementos				
				+= '<p><b>Referencia: </b>' + (lista_elementos[elemento].Referencia  ||'-Sin definir-') + '</p>'
				+ '<p><b>Estado: </b>' + ((lista_elementos[elemento].Estado  == 'A')?'Activo':'Inactivo' )  + '</p>'
				+ '<p><b>Última actualización: </b>' + (lista_elementos[elemento].Fecha_Update  ||'-Sin definir-') + '</p>'


				+'<br> </br>'
				+'<input type="submit" value="Modificar" style="width:45%" '
				+'onClick=\'onClickBtnMostrarCambiarElemento('+JSON.stringify(lista_elementos[elemento])+');\'/>'
				+'&nbsp;'
				+'<input type="submit" value="Borrar" style="width:45%"'
				+'onClick=\'onClickBtnBorrarElemento('+JSON.stringify(lista_elementos[elemento])+');\'/>'
				+'</td>'
				+'</tr>';
		}
	else
		htmlDelListadoDeElementos
				+='<tr>'+'<td>'
				+'<h2> -Sin resultados-</h2>'
				+'</td>'
				+'</tr>';
	
	htmlDelListadoDeElementos+='</table>';
	document.getElementById("divlistadoelementos").innerHTML = htmlDelListadoDeElementos;
};

//window.onload = function(){  };

var onClickBtnMostrarTodosG = function(){
	//ocultar y mostrar
	cargarLista(elementos,'Todos los Items');
	seclistelementos.style.display="block";
	nuevoElemento.style.display="none";
	opciones.style.display="none";
	cambiarElemento.style.display="none";
};

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
	formulario_nuevo_item.reset();
	msj_error_nuevo_item.style.display = 'none';
	//ocultar y mostrar
	seclistelementos.style.display="none";
	nuevoElemento.style.display="block";
	opciones.style.display="none";
	cambiarElemento.style.display="none";
}

var onClickBtnMostrarCambiarElemento = function(elemento){
	//cambiar valores actuales
	formulario_nuevo_item.reset();
	codigo_grupo_elemento_cambiar.value = elemento.FK_Grupo ;
	codigo_elemento_cambiar.value = elemento.Codigo ;
	descripcion_elemento_cambiar.value =  elemento.Descripcion ;
	codigo_barras_elemento_cambiar.value =  elemento.Codigo_Barras ;
	cuenta_elemento_cambiar.value =  elemento.Cuenta_Contable ;
	precio_costo_elemento_cambiar.value =  elemento.Precio_Costo ;
	combo_elemento_cambiar.value =  elemento.Combo ;
	tipo_elemento_cambiar.value =  elemento.Tipo ;
	unidad_de_medida_elemento_cambiar.value = elemento.Unidad_Medida ; 
	existencia_elemento_cambiar.value =  elemento.Existencia ;
	precio1_elemento_cambiar.value =  elemento.Precio_Venta_1 ;
	precio2_elemento_cambiar.value = elemento.Precio_Venta_2 ;
	precio3_elemento_cambiar.value =  elemento.Precio_Venta_3 ;
	precio4_elemento_cambiar.value = elemento.Precio_Venta_4 ;
	permite_descuento_elemento_cambiar.value =  elemento.Permite_Descuento ;
	maximo_descuento_elemento_cambiar.value =  elemento.Maximo_Descuento ;
	control_posicion_elemento_cambiar.value = elemento.Control_Posicion ;
	estanteria_elemento_cambiar.value = elemento.Estanteria ;
	tramo_elemento_cambiar.value =  elemento.Tramo ;
	nivel_elemento_cambiar.value =elemento.Nivel ;
	caja_elemento_cambiar.value = elemento.Caja ;
	referencia_elemento_cambiar.value = elemento.Referencia ;
	estado_elemento_cambiar.value =  elemento.Estado ;

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
		mensajes.focus();			
	} else {
		titulo_mensajes_operaciones.innerHTML = '¡Error!';
		mensajes_operaciones.innerHTML = 'Algo salió mal, favor intente mas tarde.';
		//ocultar y mostrar
		seclistelementos.style.display="none";
		nuevoElemento.style.display="none";
		opciones.style.display="none";
		cambiarElemento.style.display="none";
		mensajes.style.display = "block";	
		mensajes.focus();					
	}
}

var onClickBtnBorrarElemento = function(elemento){
	if(confirm("Esta a punto de borrar el elemento:" + "\n" 
		+ 'Grupo: ' + (elemento.FK_Grupo  ||'-Sin definir-') + '\n'
		+ 'Código: ' + (elemento.Codigo  ||'-Sin definir-') + '\n'
		+ 'Descripción: ' + (elemento.Descripcion  ||'-Sin definir-') + '\n'
		+ 'Existencia: ' + (elemento.Existencia  ) + '\n'
		+ 'Última actualización: ' + (elemento.Fecha_Update  ||'-Sin definir-') + '\n'
		+ "\n¿Desea continuar?" )
	){
		var data = '';
		data+='codigo_elemento_borrar=' + elemento.Codigo + '&';
		data+='codigo_grupo_elemento_borrar=' + elemento.FK_Grupo;

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
						mensajes.focus();			
					} else if(respuesta[0].tran_error == 2){
						alert("Error: \nEl código especificado no existe");							
					}else mensajeErrorGeneral();					
				}else mensajeErrorGeneral(); 
		}
		requestABC.open("POST","/administracion/items/borrar_item",true);
		requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		requestABC.send(data);
	}else{
		return false;
	}
}

var onClickBtnAgregarElemento = function(){
	if(!formulario_nuevo_item.checkValidity()) {
		msj_error_nuevo_item_txt.innerHTML = 'Verifique todos los campos';
		msj_error_nuevo_item.style.display = 'block';
		return;
	}

	var data = '';
	data+='codigo_grupo_elemento_agregar=' + codigo_grupo_elemento_agregar.value + '&';
	data+='codigo_elemento_agregar=' + codigo_elemento_agregar.value + '&';
	data+='descripcion_elemento_agregar=' + descripcion_elemento_agregar.value + '&';
	data+='codigo_barras_elemento_agregar=' + codigo_barras_elemento_agregar.value + '&';
	data+='cuenta_elemento_agregar=' + cuenta_elemento_agregar.value + '&';
	data+='precio_costo_elemento_agregar=' + precio_costo_elemento_agregar.value + '&';
	data+='combo_elemento_agregar=' + combo_elemento_agregar.value + '&';
	data+='tipo_elemento_agregar=' + tipo_elemento_agregar.value + '&';
	data+='unidad_de_medida_elemento_agregar=' + unidad_de_medida_elemento_agregar.value + '&';
	data+='existencia_elemento_agregar=' + existencia_elemento_agregar.value + '&';
	data+='precio1_elemento_agregar=' + precio1_elemento_agregar.value + '&';
	data+='precio2_elemento_agregar=' + precio2_elemento_agregar.value + '&';
	data+='precio3_elemento_agregar=' + precio3_elemento_agregar.value + '&';
	data+='precio4_elemento_agregar=' + precio4_elemento_agregar.value + '&';
	data+='permite_descuento_elemento_agregar=' + permite_descuento_elemento_agregar.value + '&';
	data+='maximo_descuento_elemento_agregar=' + maximo_descuento_elemento_agregar.value + '&';
	data+='control_posicion_elemento_agregar=' + control_posicion_elemento_agregar.value + '&';
	data+='estanteria_elemento_agregar=' + estanteria_elemento_agregar.value + '&';
	data+='tramo_elemento_agregar=' + tramo_elemento_agregar.value + '&';
	data+='nivel_elemento_agregar=' + nivel_elemento_agregar.value + '&';
	data+='caja_elemento_agregar=' + caja_elemento_agregar.value + '&';
	data+='referencia_elemento_agregar=' + referencia_elemento_agregar.value + '&';
	data+='estado_elemento_agregar=' + estado_elemento_agregar.value ;

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
					mensajes.focus();			
				} else if(respuesta[0].tran_error == 1){
					alert("Error: \nEl código especificado ya existe");							
				} else if(respuesta[0].tran_error == 8){
					msj_error_nuevo_item.style.display = 'block';
					msj_error_nuevo_item_txt.innerHTML = tran_mensaje;
				} else if(respuesta[0].tran_error == 9){
					titulo_mensajes_operaciones.innerHTML = '¡Error!';
					alert(respuesta[0].tran_mensaje);							
				} else mensajeErrorGeneral();					
			}else mensajeErrorGeneral(); 
	}
	requestABC.open("POST","/administracion/items/agregar_item",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send(data);
}

var onClickBtnCambiarElemento = function(){
	
	if(!formulario_cambiar_item.checkValidity()) {
		if (!(typeof formulario_cambiar_item.checkValidity == "function")) {
			alert('Uno o varios campos no es válido.\nFavor revisar formulario.');
		}
		return;
	}

	var data = '';
	data+='codigo_grupo_elemento_cambiar=' + codigo_grupo_elemento_cambiar.value + '&';
	data+='codigo_elemento_cambiar=' + codigo_elemento_cambiar.value + '&';
	data+='descripcion_elemento_cambiar=' + descripcion_elemento_cambiar.value + '&';
	data+='codigo_barras_elemento_cambiar=' + codigo_barras_elemento_cambiar.value + '&';
	data+='cuenta_elemento_cambiar=' + cuenta_elemento_cambiar.value + '&';
	data+='precio_costo_elemento_cambiar=' + precio_costo_elemento_cambiar.value + '&';
	data+='combo_elemento_cambiar=' + combo_elemento_cambiar.value + '&';
	data+='tipo_elemento_cambiar=' + tipo_elemento_cambiar.value + '&';
	data+='unidad_de_medida_elemento_cambiar=' + unidad_de_medida_elemento_cambiar.value + '&';
	data+='existencia_elemento_cambiar=' + existencia_elemento_cambiar.value + '&';
	data+='precio1_elemento_cambiar=' + precio1_elemento_cambiar.value + '&';
	data+='precio2_elemento_cambiar=' + precio2_elemento_cambiar.value + '&';
	data+='precio3_elemento_cambiar=' + precio3_elemento_cambiar.value + '&';
	data+='precio4_elemento_cambiar=' + precio4_elemento_cambiar.value + '&';
	data+='permite_descuento_elemento_cambiar=' + permite_descuento_elemento_cambiar.value + '&';
	data+='maximo_descuento_elemento_cambiar=' + maximo_descuento_elemento_cambiar.value + '&';
	data+='control_posicion_elemento_cambiar=' + control_posicion_elemento_cambiar.value + '&';
	data+='estanteria_elemento_cambiar=' + estanteria_elemento_cambiar.value + '&';
	data+='tramo_elemento_cambiar=' + tramo_elemento_cambiar.value + '&';
	data+='nivel_elemento_cambiar=' + nivel_elemento_cambiar.value + '&';
	data+='caja_elemento_cambiar=' + caja_elemento_cambiar.value + '&';
	data+='referencia_elemento_cambiar=' + referencia_elemento_cambiar.value + '&';
	data+='estado_elemento_cambiar=' + estado_elemento_cambiar.value ;

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
					mensajes.focus();			
				} else if(respuesta[0].tran_error == 2){
					titulo_mensajes_operaciones.innerHTML = '¡Error!';
					alert("Error: \nEl código especificado no existe");							
				} else if(respuesta[0].tran_error == 9){
					titulo_mensajes_operaciones.innerHTML = '¡Error!';
					alert(respuesta[0].tran_mensaje);							
				}else mensajeErrorGeneral();					
			}else mensajeErrorGeneral(); 
	}
	requestABC.open("POST","/administracion/items/cambiar_item",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send(data);
}

var onClickBtnBuscarElementos = function(){
	if(!formulario_buscar_item.checkValidity()) {
		if (!(typeof formulario_buscar_item.checkValidity == "function")) {
			alert('Uno o varios campos no es válido.\nFavor revisar formulario.');
		}
		return;
	}
	if (intxt_buscar_item.value == '' || intxt_buscar_item_grupo.value == '' ) return false;
	var data = '';
	data+='intxt_buscar_item=' + intxt_buscar_item.value + '&';
	data+='intxt_buscar_item_grupo=' + intxt_buscar_item_grupo.value + '&';
	data+='rdBuscar_p_codigo=' + rdBuscar_p_codigo.checked ;

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
					elementos_res_busqueda = respuesta.items;
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
	requestABC.open("POST","/administracion/items/busqueda",true);
	requestABC.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	requestABC.send(data);
}