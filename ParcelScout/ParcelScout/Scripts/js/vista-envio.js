﻿$(document).ready(function () {
    cargarDatos();

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
                $('#peso').text(data.envio.Peso);
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
    var id = $('#envio-id').val();

    var peso = $('#peso-mod').val();
    var dimensiones = $('#dimensiones-mod').val();
    var tipocont = $('#tipocont-mod').val();
    var descripcion = $('#descripcion-mod').val();


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
                    $('#estado-mod').val("en-proceso");
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
    var id = $('#envio-id').val();

    var precio = $('#precio-mod').val();
    var estado = $('#estado-mod').val();

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

                $('#modal-edit-envio').modal();
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
    var id = $('#id-c').val();

    var nombre = $('#nombre-c-mod').val();
    var domicilio = $('#domicilio-c-mod').val();
    var telefono1 = $('#telefono1-c-mod').val();
    var telefono2 = $('#telefono2-c-mod').val();
    var telefono3 = $('#telefono3-c-mod').val();
    var correo = $('#correo-c-mod').val();
    var rfc = $('#rfc-c-mod').val();

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
    var id = $('#id-d').val();

    var nombre = $('#nombre-d-mod').val();
    var domicilio = $('#domicilio-d-mod').val();
    var codigoPostal = $('#cp-d-mod').val();
    var ciudad = $('#ciudad-d-mod').val();
    var estado = $('#estado-d-mod').val();
    var telefono = $('#telefono-d-mod').val();
    var correo = $('#correo-d-mod').val();
    var recibe = $('#recibe-d-mod').val();

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