﻿$(document).ready(function () {
    cargarDatos();
    cargarTabla();
});

function cargarDatos() {
    var id = $('#envio-id').val();

    if (id !== "" && id !== 0){
        $.ajax({
            url: baseUrl + "Paquete/ObtenerPorId/" + id,
            traditional: true,
            type: 'GET',
            cache: false,
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success: function (data) {

                console.log(data);

                //Info. del Envio
                $('#folio').text(data.envio.Folio);
                $('#fecha').text(data.envio.fechaString);
                $('#usuario').text(data.envio.Empleado.Nombre);
                $('#precio').text("$" + data.envio.Precio);
                $('#no-rastreo').text(data.envio.NoRastreo);
                $('#estado').text(data.envio.estadoString);

                //Info. del Cliente
                $('#nombre-cliente').text(data.envio.Cliente.Nombre);
                $('#domicilio-cliente').text(data.envio.Cliente.Domicilio);
                $('#tel-cliente').text(data.envio.Cliente.Telefono1 + ", "
                    + data.envio.Cliente.Telefono2 + ", "
                    + data.envio.Cliente.Telefono2);
                $('#correo-cliente').text(data.envio.Cliente.Correo);
                $('#rfc-cliente').text(data.envio.Cliente.RFC);

                //Info del Paquete
                $('#peso').text(data.envio.Peso + "kg");
                $('#dimensiones').text(data.envio.Dimensiones);
                $('#tipo-cont').text(data.envio.TipoContenido);
                $('#descripcion').text(data.envio.Descripcion);

                //Info. del Paquete
                $('#nombre-dest').text(data.envio.Destinatario.Nombre);
                $('#domicilio-dest').text(data.envio.Destinatario.Domicilio);
                $('#cp-dest').text(data.envio.Destinatario.CodigoPostal);
                $('#ciudad-dest').text(data.envio.Destinatario.Ciudad);
                $('#estado-dest').text(data.envio.Destinatario.Estado);
                $('#telefono-dest').text(data.envio.Destinatario.Telefono);
                $('#correo-dest').text(data.envio.Destinatario.Correo);
                $('#recibe').text(data.envio.Destinatario.Recibe);


            },
            error: function (xhr, exception){

            }
        });
    }
   
}

//Editar paquete.
function editarPaquete() {
    var modalC = $('#modal-edit-paquete-cont');
    var id = $('#envio-id').val();

    if (id !== "0"){

        console.log("working over here");

        $('#modal-edit-paquete').modal();
        modalC.load(baseUrl + 'Paquete/EditInfoPaquete/ ', function () {
            //console.log("modal working here");
            cargarDatosPaquete(id);
        });

    } 
}

function cargarDatosPaquete(id) {
    $.ajax({
        url: baseUrl + "Paquete/ObtenerPorId/" + id,
        traditional: true,
        type: 'GET',
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            
            $('#peso-mod').val(data.envio.Peso);
            $('#dimensiones-mod').val(data.envio.Dimensiones);
            $('#tipocont-mod').val(data.envio.TipoContenido);
            $('#descripcion-mod').val(data.envio.Descripcion);
        },
        error: function (xhr, exception) {

        }
    });
}

function actualizarPaquete() {
    var id = $.trim($('#envio-id').val());

    var peso = $.trim($('#peso-mod').val());
    var dimensiones = $.trim($('#dimensiones-mod').val());
    var tipocont = $.trim($('#tipocont-mod').val());
    var descripcion = $.trim($('#descripcion-mod').val());


    $.ajax({
        url: baseUrl + 'Paquete/ActualizarInfoPedido/',
        data: {
            id: id, peso: peso, dimensiones: dimensiones, tipocont: tipocont, descripcion: descripcion
        }, 
        traditional: true,
        cache: false,
        success: function (data) {
            if (data === "true") {
                swal({
                    title: "Cambios Guardados",
                    icon: "success"
                });

               $('#modal-edit-paquete').modal("hide");
               cargarDatos();
            } else {
                swal({
                    text: "Ocurrió un problema y no se pudieron realizar los cambios",
                    icon: "error"
                });
            }
        },
        error: function (xhr, exception){
            swal({
                text: "Ocurrió un problema y no se pudieron realizar los cambios",
                icon: "error"
            });
        }
    });

}

//Editar Info de Envio
function editarEnvio() {
    var modalC = $('#modal-edit-envio-cont');
    var id = $('#envio-id').val();

    if (id !== "0") {

        $('#modal-edit-envio').modal();
        modalC.load(baseUrl + 'Paquete/EditInfoPedido/ ', function () {
            console.log("modal working here");
            cargarDatosEnvio(id);
        });

    }
}

function cargarDatosEnvio(id) {
    $.ajax({
        url: baseUrl + "Paquete/ObtenerPorId/" + id,
        traditional: true,
        type: 'GET',
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            $('#precio-mod').val(data.envio.Precio);

            switch (data.envio.Estado){
                case 1:
                    $('#estado-mod').val("en_proceso");
                    break;
                case 2:
                    $('#estado-mod').val("enviado");
                    break;
                case 3:
                    $('#estado-mod').val("recibido");
                    break;
                case 4:
                    $('#estado-mod').val("cancelado");
                    break;
                default:
                    break;
            }
        },
        error: function (xhr, exception) {

        }
    });
}

function actualizarEnvio() {
    var id = $.trim($('#envio-id').val());

    var precio = $.trim($('#precio-mod').val());
    var estado = $.trim($('#estado-mod').val());

    $.ajax({
        url: baseUrl + 'Paquete/ActualizarInfoEnvio/',
        data: {
            id: id, precio: precio, estado: estado
        },
        traditional: true,
        cache: false,
        success: function (data) {
            if (data === "true") {
                swal({
                    title: "Cambios Guardados",
                    icon: "success"
                });

                $('#modal-edit-envio').modal("hide");
                cargarDatos();
            } else {
                swal({
                    text: "Ocurrió un problema y no se pudieron realizar los cambios",
                    icon: "error"
                });
            }
        },
        error: function (xhr, exception) {
            swal({
                text: "Ocurrió un problema y no se pudieron realizar los cambios",
                icon: "error"
            });
        }
    });

}

//Editar Info. Cliente
function editarCliente() {
    var modalC = $('#modal-edit-cliente-cont');
    var id = $('#envio-id').val();

    if (id !== "0") {

        $('#modal-edit-cliente').modal();
        modalC.load(baseUrl + 'Paquete/EditInfoCliente/ ', function () {
            cargarDatosCliente(id);
        });

    }
}

function cargarDatosCliente(id) {
    $.ajax({
        url: baseUrl + "Paquete/ObtenerPorId/" + id,
        traditional: true,
        type: 'GET',
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            $('#id-c').val(data.envio.Cliente.Id);
            $('#nombre-c-mod').val(data.envio.Cliente.Nombre);
            $('#domicilio-c-mod').val(data.envio.Cliente.Domicilio);
            $('#telefono1-c-mod').val(data.envio.Cliente.Telefono1);
            $('#telefono2-c-mod').val(data.envio.Cliente.Telefono2);
            $('#telefono3-c-mod').val(data.envio.Cliente.Telefono3);
            $('#correo-c-mod').val(data.envio.Cliente.Correo);
            $('#rfc-c-mod').val(data.envio.Cliente.RFC);


        },
        error: function (xhr, exception) {

        }
    });
}

function actualizarCliente() {
    var id = $.trim($('#id-c').val());

    var nombre = $.trim($('#nombre-c-mod').val());
    var domicilio = $.trim($('#domicilio-c-mod').val());
    var telefono1 = $.trim($('#telefono1-c-mod').val());
    var telefono2 = $.trim($('#telefono2-c-mod').val());
    var telefono3 = $.trim($('#telefono3-c-mod').val());
    var correo = $.trim($('#correo-c-mod').val());
    var rfc = $.trim($('#rfc-c-mod').val());

    $.ajax({
        url: baseUrl + 'Paquete/ActualizarInfoCliente/',
        data: {
            id: id, nombre: nombre, domicilio: domicilio, telefono1: telefono1,
            telefono2: telefono2, telefono3: telefono3, correo: correo, rfc: rfc
        },
        traditional: true,
        cache: false,
        success: function (data) {
            if (data === "true") {
                swal({
                    title: "Cambios Guardados",
                    icon: "success"
                });

                $('#modal-edit-cliente').modal("hide");
                cargarDatos();
            } else {
                swal({
                    text: "Ocurrió un problema y no se pudieron realizar los cambios",
                    icon: "error"
                });
            }
        },
        error: function (xhr, exception) {
            swal({
                text: "Ocurrió un problema y no se pudieron realizar los cambios",
                icon: "error"
            });
        }
    });

}

//Info. del Destinatario
function editarDestinatario() {
    var modalC = $('#modal-edit-destinatario-cont');
    var id = $('#envio-id').val();

    if (id !== "0") {

        $('#modal-edit-destinatario').modal();
        modalC.load(baseUrl + 'Paquete/EditInfoDestinatario/ ', function () {
            cargarDatosDestinatario(id);
        });

    }
}

function cargarDatosDestinatario(id) {
    $.ajax({
        url: baseUrl + "Paquete/ObtenerPorId/" + id,
        traditional: true,
        type: 'GET',
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            $('#id-d').val(data.envio.Destinatario.Id);
            $('#nombre-d-mod').val(data.envio.Destinatario.Nombre);
            $('#domicilio-d-mod').val(data.envio.Destinatario.Domicilio);
            $('#cp-d-mod').val(data.envio.Destinatario.CodigoPostal);
            $('#ciudad-d-mod').val(data.envio.Destinatario.Ciudad);
            $('#estado-d-mod').val(data.envio.Destinatario.Estado);
            $('#telefono-d-mod').val(data.envio.Destinatario.Telefono);
            $('#correo-d-mod').val(data.envio.Destinatario.Correo);
            $('#recibe-d-mod').val(data.envio.Destinatario.Recibe);

             
        },
        error: function (xhr, exception) {

        }
    });
}

function actualizarDestinatario() {
    var id = $.trim($('#id-d').val());

    var nombre = $.trim($('#nombre-d-mod').val());
    var domicilio = $.trim($('#domicilio-d-mod').val());
    var codigoPostal = $.trim($('#cp-d-mod').val());
    var ciudad = $.trim($('#ciudad-d-mod').val());
    var estado = $.trim($('#estado-d-mod').val());
    var telefono = $.trim($('#telefono-d-mod').val());
    var correo = $.trim($('#correo-d-mod').val());
    var recibe = $.trim($('#recibe-d-mod').val());

    $.ajax({
        url: baseUrl + 'Paquete/ActualizarInfoDestinatario/',
        data: {
            id: id, nombre: nombre, domicilio: domicilio, codigoPostal: codigoPostal, telefono: telefono,
            ciudad: ciudad, estado: estado, correo: correo, recibe: recibe
        },
        traditional: true,
        cache: false,
        success: function (data) {
            if (data === "true") {
                swal({
                    title: "Cambios Guardados",
                    icon: "success"
                });

                $('#modal-edit-destinatario').modal("hide");
                cargarDatos();
            } else {
                swal({
                    text: "Ocurrió un problema y no se pudieron realizar los cambios",
                    icon: "error"
                });
            }
        },
        error: function (xhr, exception) {
            swal({
                text: "Ocurrió un problema y no se pudieron realizar los cambios",
                icon: "error"
            });
        }
    });

}



//REGISTRO DATABLE
function cargarTabla() {
    var id = $('#envio-id').val();

    var table = $('#table-historial').DataTable();
    table.destroy();
    $('#table-historial').DataTable({
        "autoWidth": true,
        "processing": true,
        "ajax": {
            "url": baseUrl + "Paquete/ObtenerHistorialEnvio/",
            "traditional": true,
            "data": {"idEnvio": id}
        },
        "columns": [
            { "data": "Id", visible: false, searchable: false },
            { "data": "fechaString" },
            { "data": "Ciudad" },
            { "data": "Estado" },
            { "data": "Lat" },
            { "data": "Lon" }
        ],
        select: true
    });
}

function obtenerId() {

    var table = $('#table-historial').DataTable();
    var id = 0;
    
    if (table.$('.selected')[0] !== undefined) {
        console.log("so it was defined");

        var selectedIndex = table.$('.selected')[0]._DT_RowIndex; //should be .index();   ??
        //console.log("Selected index: " + selectedIndex);
        var row = table.row(selectedIndex).data();
        id = row.Id;
    }
    return id;
}

function obtenerLatLng() {
    var table = $('#table-historial').DataTable();
    var id = 0;
    var lat = 0;
    var lon = 0;

    if (table.$('.selected')[0] !== undefined) {
        console.log("so it was defined");

        var selectedIndex = table.$('.selected')[0]._DT_RowIndex; //should be .index();   ??
        //console.log("Selected index: " + selectedIndex);
        var row = table.row(selectedIndex).data();
        id = row.Id;
        lat = row.Lat;
        lon = row.Lon;
    }
    return { id: id, lat: lat, lon: lon };
}

//MAPA NUEVA UBICACION
function nuevaUbicacion() {
    modalC = $('#modal-nueva-ubicacion-cont');

    $('#modal-nueva-ubicacion').modal();
    modalC.load(baseUrl + 'Paquete/MapaNuevaUbicacion', function () {
        cargarUltimaUbicacion();
    });
}

function cargarUltimaUbicacion() {
    var idEnvio = $.trim($('#envio-id').val());

    $.ajax({
        url: baseUrl + "Paquete/ObtenerHistorialEnvio/",
        data: { idEnvio: idEnvio },
        traditional: true,
        cache: false,
        success: function (data) {
           
            if (data.data.length > 0){


                var lat = data.data[data.data.length - 1].Lat;
                var lng = data.data[data.data.length - 1].Lon;

                cargarMapaDragUltimo(lat, lng);
                
            } else {
                cargarMapaDrag();
            }
        },
        error: function (xhr, exception) {
            cargarMapaDrag();
        }
    });

}

function cargarMapaDragUltimo(lat, lng) {
    mapC = $('#mapa-drag');

    var coords = new google.maps.LatLng(lat, lng, true);

    var map = new google.maps.Map(document.getElementById('mapa-drag'), {
        center: { lat: lat, lng: lng },
        zoom: 12
    });

    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "SELECCIONA",
        draggable: true
    });

    /*
    $('#btn-sel-ub').click(function () {
        var latlng = marker.getPosition();

        $('#lat-drag').val(latlng.lat());
        $('#lon-drag').val(latlng.lng());
    });
    */

    $("#btn-sel-ub").on("click", function () {
        var latlng = marker.getPosition();

        $('#lat-drag').val(latlng.lat());
        $('#lon-drag').val(latlng.lng());
    });

    google.maps.event.trigger(map, "resize");

}

function cargarMapaDrag() {
    mapC = $('#mapa-drag');

    var coords = new google.maps.LatLng(27.9178651, -110.90893779999999, true);

    var map = new google.maps.Map(document.getElementById('mapa-drag'), {
        center: { lat: 27.9178651, lng: -110.90893779999999},
        zoom: 12
    });

    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "SELECCIONA",
        draggable: true
    });
/*
    $('#btn-sel-ub').click(function(){
        var latlng = marker.getPosition();

        $('#lat-drag').val(latlng.lat());
        $('#lon-drag').val(latlng.lng());
    });
    */

    $("#btn-sel-ub").on("click", function () {
        var latlng = marker.getPosition();

        $('#lat-drag').val(latlng.lat());
        $('#lon-drag').val(latlng.lng());
    });

    google.maps.event.trigger(map, "resize");

}

function guardarUbicacion() {
    var id = $.trim($('#envio-id').val());

    var lat = $.trim($('#lat-drag').val());
    var lon = $.trim($('#lon-drag').val());
    var ciudad = $.trim($('#ciudad-drag').val());
    var estado = $.trim($('#estado-drag').val());

    var todoLleno = true;
    var numericos = true;

    if (id === "") todoLleno = false;
    if (lat === "") todoLleno = false;
    if (lon === "") todoLleno = false;
    if (ciudad === "") todoLleno = false;
    if (estado === "") todoLleno = false;

    if (isNaN(lat)) numericos = false;
    if (isNaN(lon)) numericos = false;

    if (todoLleno){
        if (numericos) {
            
            $.ajax({
                url: baseUrl + "Paquete/GuardarUbicacion",
                data: { id: id, lat: lat, lon: lon, ciudad: ciudad, estado: estado},
                traditional: true,
                cache: false,
                success: function (data) {
                    if (data === "true") {

                        swal({
                            text: "Ubicación Actualizada",
                            icon: "success"
                        });

                        $('#modal-nueva-ubicacion').modal("hide");
                        cargarTabla();
                    } else {
                        swal({
                            text: "Ocurrió un problema y no se pudo guardar ubicación.",
                            icon: "warning"
                        });
                    }
                },
                error: function (xhr, exception) {
                    swal({
                        text: "Ocurrió un problema y no se pudo guardar ubicación.",
                        icon: "warning"
                    });
                }
            });

           
        } else {
            swal({
                title: "Error",
                text: "Latitud y Longitud deben ser númericos, apoyate en el mapa para seleccionar su valor.",
                icon: "error"
            });
        }
    } else {
        swal({
            text: "Por favor llena todos los campos",
            icon: "warning"
        });
    }
}


//MAPA RECORRIDO
function verRecorrido() {
    var modalC = $('#modal-recorrido-cont');

    $('#modal-recorrido').modal();
    modalC.load(baseUrl + "Paquete/MapaRecorrido", function () {
        cargarHistorialRecorrido();
    });

}

function cargarHistorialRecorrido() {
    var idEnvio = $.trim($('#envio-id').val());

    $.ajax({
        url: baseUrl + "Paquete/ObtenerHistorialEnvio/",
        data: { idEnvio: idEnvio },
        traditional: true,
        cache: false,
        success: function (data) {

            if (data.data.length > 0) {
                
                var ubicaciones = data.data;


                cargarMapaRecorrido(ubicaciones);
            } else {

                swal({
                    text: "El historial esta vacio",
                    icon: "info"
                });
                $('#modal-recorrido').modal("hide");

            }
        },
        error: function (xhr, exception) {
            cargarMapaDrag();
        }
    });

}

function cargarMapaRecorrido(ubicaciones) {

    var center = {
        lat: ubicaciones[ubicaciones.length - 1].Lat, lng: ubicaciones[ubicaciones.length - 1].Lon
   };
    var markers = []; //google.map.marker
    var recorrido = []; // {lat: lng:}

    var map = new google.maps.Map(document.getElementById('mapa-recorrido'), {
        center: { lat: center.lat, lng: center.lng },
        zoom: 7
    });

    for (var i = 0; i < ubicaciones.length; i++) {
        var coords = { lat: ubicaciones[i].Lat, lng: ubicaciones[i].Lon }
        recorrido.push(coords);
    }

    for (var ii = 0; ii < recorrido.length; ii++){
        var latlng = new google.maps.LatLng(recorrido[ii].lat, recorrido[ii].lng, true);

        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: "Lat: " + latlng.lat() + ", Lng: " + latlng.lng()
        });

        markers.push(marker);
    }

    var lineaRecorrido = new google.maps.Polyline({
        path: recorrido,
        geodesic: true,
        strokeColor: '#33a364',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: map
    });


    google.maps.event.trigger(map, "resize");

}

//MAPA MODIFICAR
function modificarRegistro() {
    var id = obtenerId();

    if (id !== 0){

        var modalC = $('#modal-mod-ubicacion-cont');

        $('#modal-mod-ubicacion').modal();
        modalC.load(baseUrl + "Paquete/MapaModificar", function () {
            cargarMapaMod(obtenerLatLng());
        });
        

    } else {
        swal({
            text: "Seleccione un elemento de la tabla.",
            icon: "info"
        });
    }
}

function cargarMapaMod(ubicacion) {
    mapC = $('#mapa-mod');

    var id = ubicacion.id;
    var lat = ubicacion.lat;
    var lon = ubicacion.lon;

    $('#ubicacion-id').val(id);

    var coords = new google.maps.LatLng(lat, lon, true);

    var map = new google.maps.Map(document.getElementById('mapa-mod'), {
        center: { lat: lat, lng: lon },
        zoom: 12
    });

    var marker = new google.maps.Marker({
        position: coords,
        map: map,
        title: "SELECCIONA",
        draggable: true
    });

    /*
    $('#btn-sel-ub').click(function () {
        var latlng = marker.getPosition();

        $('#lat-mod').val(latlng.lat());
        $('#lon-mod').val(latlng.lng());
    });
    */

    $("#btn-sel-ub-mod").on("click", function () {
        var latlng = marker.getPosition();

        $('#lat-mod').val(latlng.lat());
        $('#lon-mod').val(latlng.lng());
    });

    google.maps.event.trigger(map, "resize");
}



function guardarCambiosUbicacion() {

    var id = $('#ubicacion-id').val();

    var lat = $.trim($('#lat-mod').val());
    var lon = $.trim($('#lon-mod').val());
    var ciudad = $.trim($('#ciudad-mod').val());
    var estado = $.trim($('#estado-mod').val());

    var todoLleno = true;
    var numericos = true;

    if (id === "") todoLleno = false;
    if (lat === "") todoLleno = false;
    if (lon === "") todoLleno = false;
    if (ciudad === "") todoLleno = false;
    if (estado === "") todoLleno = false;

    if (isNaN(lat)) numericos = false;
    if (isNaN(lon)) numericos = false;

    if (todoLleno) {
        if (numericos) {

            $.ajax({
                url: baseUrl + "Paquete/ActualizarUbicacion",
                data: { id: id, ciudad: ciudad, estado: estado, lat: lat, lon: lon },
                traditional: true,
                cache: false,
                success: function (data) {
                    if (data === "true") {

                        swal({
                            text: "Datos actualizados.",
                            icon: "success"
                        });

                        $('#modal-mod-ubicacion').modal("hide");
                        cargarTabla();
                    } else {
                        swal({
                            text: "Ocurrió un problema y no se pudo guardar ubicación.",
                            icon: "warning"
                        });
                    }
                },
                error: function (xhr, exception) {
                    swal({
                        text: "Ocurrió un problema y no se pudo guardar ubicación.",
                        icon: "warning"
                    });
                }
            });


        } else {
            swal({
                title: "Error",
                text: "Latitud y Longitud deben ser númericos, apoyate en el mapa para seleccionar su valor.",
                icon: "error"
            });
        }
    } else {
        swal({
            text: "Por favor llena todos los campos",
            icon: "warning"
        });
    }

}

function eliminarUbicacion() {
    var id = obtenerId();

    if (id !== 0) {
        swal("¿Esta seguro que desea eliminar el registro?", {
            buttons: {
                si: {
                    text: "¡Seguro!",
                    value: "true"
                },
                no: {
                    text: "No.",
                    value: "false"
                }
            },
            dangerMode: true
        })
            .then((value) => {
                switch (value) {

                    case "true":
                        $.ajax({
                            url: baseUrl + "Paquete/EliminarUbicacion",
                            data: { id: id },
                            cache: false,
                            traditional: true,
                            success: function (data) {
                                if (data === "true") {
                                    swal("Exito", "Registro Borrado", "success");
                                    cargarTabla();
                                } else {
                                    swal("Error", "Ocurrió un problema", "warning");
                                }
                            }
                        });
                        break;

                    case "false":

                        swal({
                            text: "Operación cancelada",
                            icon: "error"
                        });
                        break;

                    default:
                        swal({
                            text: "Operación cancelada",
                            icon: "error"
                        });
                }
            });

    } else {
        swal({
            text: "Seleccione un registro",
            icon: "warning"
        });
    }
}