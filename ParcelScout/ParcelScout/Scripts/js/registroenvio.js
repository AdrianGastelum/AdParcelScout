var posActual = 1;//Hace referencia a caul es la posicion actual del formulario
var posAnterior;

var elemento; 
var campos;

var clienteExistente = null;
var destinatarioExistente = null;


$(document).ready(function () {
    $('#agregar-paquete_cliente').hide();
    $('#agregar-paquete_destinatario').hide();

    $('#btnPrevious').hide();
    $('#btnSubmit').hide();
}

);
$('#btnNext').on("click", function () {
    var existeCliente = false;

    if (posActual === 2 && clienteExistente !== null) existeCliente = true;

    if (validarView() || existeCliente) {
        posAnterior = posActual;
        posActual++;

        $('#btnPrevious').show();
        $('#' + obtenerView(posAnterior)).hide();
        $('#' + obtenerView(posActual)).show();

        if (posActual === 3) {
            $('#btnNext').hide();
            $('#btnSubmit').show();
        }
    } else {
        swal("Oops", "¡No se llenaron todos los campos!", "error");
    }

});


$('#btnPrevious').on("click", function () {
    posAnterior = posActual;
    posActual--;

    $('#btnNext').show();
    $('#btnSubmit').hide();

    $('#' + obtenerView(posAnterior)).hide();
    $('#' + obtenerView(posActual)).show();

    if (posActual === 1) {
        $('#btnPrevious').hide();

    }
})

$('#btnSubmit').on("click", function () {
    var existeDestinatario = false;

    if (posActual === 3 && destinatarioExistente !== null) existeDestinatario = true;

    if (validarView() || existeDestinatario) {

        var idEmpleado = $('#usuario-id').val();

        var paquetePeso = $.trim($('input[name=paquete-peso]').val());
        var paqueteDimensiones = $.trim($('input[name=paquete-dimensiones]').val());
        var paqueteTipo = $.trim($('input[name=paquete-tipo]').val());
        var paqueteDescripcion = $.trim($('input[name=paquete-descripcion]').val());
        var paquetePrecio = $.trim($('input[name=paquete-precio]').val());

        if (clienteExistente === null) {
            var clienteNombre = $.trim($('input[name=cliente-nombre]').val());
            var clienteDomicilio = $.trim($('input[name=cliente-domicilio]').val());
            var clienteTelefono1 = $.trim($('input[name=cliente-telefono1]').val());
            var clienteTelefono2 = $.trim($('input[name=cliente-telefono2]').val());
            var clienteTelefono3 = $.trim($('input[name=cliente-telefono3]').val());
            var clienteCorreo = $.trim($('input[name=cliente-correo]').val());
            var clienteRfc = $.trim($('input[name=cliente-rfc]').val());
        } else {
            console.log('Cliente existe');
        }

        if (destinatarioExistente === null) {
            var destinatarioNombre = $.trim($('input[name=destinatario-nombre]').val());
            var destinatarioTelefono = $.trim($('input[name=destinatario-telefono]').val());
            var destinatarioCorreo = $.trim($('input[name=destinatario-correo]').val());
            var destinatarioCalle = $.trim($('input[name=destinatario-calle]').val());
            var destinatarioNumero = $.trim($('input[name=destinatario-numero]').val());
            var destinatarioAvenida = $.trim($('input[name=destinatario-avenida]').val());
            var destinatarioColonia = $.trim($('input[name=destinatario-colonia]').val());
            var destinatarioCodigo = $.trim($('input[name=destinatario-codigo]').val());
            var destinatarioCiudad = $.trim($('input[name=destinatario-ciudad]').val());
            var destinatarioEstado = $.trim($('input[name=destinatario-estado]').val());
            var destinatarioReferencia = $.trim($('input[name=destinatario-referencia]').val());

            var destinatarioPersona = $.trim($('input[name=destinatario-persona]').val());

        } else {
            console.log('Destinatario existe');
        }

            
        $.ajax({
            url: baseUrl + "Paquete/GuardarNuevoEnvio",
            data: {
                idEmpleado: idEmpleado,

                paquetePeso: paquetePeso, paqueteDimensiones: paqueteDimensiones, paqueteTipo: paqueteTipo,
                paqueteDescripcion: paqueteDescripcion, paquetePrecio: paquetePrecio,

                clienteNombre: clienteNombre, clienteDomicilio: clienteDomicilio,
                clienteTelefono1: clienteTelefono1, clienteTelefono2: clienteTelefono2, clienteTelefono3: clienteTelefono3,
                clienteCorreo: clienteCorreo, clienteRfc: clienteRfc,

                destinatarioNombre: destinatarioNombre, destinatarioTelefono: destinatarioTelefono, destinatarioCorreo: destinatarioCorreo,
                destinatarioCalle: destinatarioCalle, destinatarioNumero: destinatarioNumero, destinatarioAvenida: destinatarioAvenida,
                destinatarioColonia: destinatarioColonia, destinatarioCodigo: destinatarioCodigo, destinatarioCiudad: destinatarioCiudad,
                destinatarioEstado: destinatarioEstado, destinatarioReferencia: destinatarioReferencia, destinatarioPersona: destinatarioPersona
            },
            traditional: true,
            cache: false,
            success: function (data) {
                if (data === "true"){
                    swal("Excelente", "¡Se han almacenado los datos exitosamente!", "success");
                    $('#modal-registrar-envio').modal("hide");
                    cargarTabla();
                } else {
                    swal({
                        text: "Ocurrió un problema con la transacción.",
                        icon: "error"
                    });
                }
            }, 
            error: function (xhr, exception) {
                swal({
                    text: "Ocurrió un problema con la transacción.",
                    icon: "error"
                });
            }
        });

    } else {
        swal("Oops", "¡No se llenaron todos los campos!", "error");
    }
});

$('#btnUsarCliente').on("click", function () {
    //clienteExistente = "Existe";
   // $('#lbExisteCliente').html("Se ha agregado usuario...");

    $('#modal-clientes').modal();

    /*
    //$('#crearCliente').hide();
    */
});

function validarView() {
    var valido = true;
    var errores = [];

    selectElemento(posActual);


    campos.forEach(function (campo, index, campos) {
        var aux = $.trim($('input[name="' + elemento + "-" + campo + '"]').val());
        console.log(aux);
        

        if (aux === "") {
            if (campo === "telefono2" || campo === "telefono3" ||campo === "rfc" || campo === "persona") {
                console.log("Es un campo opcional, omitir");
            } else {
                valido = false;
                errores.push('El campo ' + campo + ' no fue llenado');
            }

        } 
        
    });

    campos.forEach(function (campo, index, campos) {
        var aux = $.trim($('input[name="' + elemento + "-" + campo + '"]').val());
        console.log(aux);


        if (isNaN(aux)) {
            if (campo === "peso" || campo === "precio" || campo === "telefono1" || campo === "telefono" || campo === "numero"|| campo === "codigo") {
                valido = false;
                errores.push('El campo ' + campo + ' debe ser un valor numerico');
            }

        }
        
    });

    

    return valido;
}


function obtenerView(pos) {
    var page;
    switch (pos) {
        case 1:
            page = 'agregar-paquete_paquete';
            break;
        case 2:
            page = 'agregar-paquete_cliente';
            break;
        case 3:
            page = 'agregar-paquete_destinatario';
            break;

    }
    return page;
}

function selectElemento(op) {
    switch (op) {
        case 1:
            elemento = 'paquete';
            campos = ['peso', 'dimensiones', 'tipo', 'descripcion', 'precio'];
            break;

        case 2:
            elemento = 'cliente';
            campos = ['nombre', 'domicilio', 'telefono1','telefono2','telefono3', 'correo', 'rfc'];
            break;

        case 3:
            elemento = 'destinatario';
            campos = ['nombre', 'telefono', 'correo', 'calle', 'numero', 'avenida', 'colonia', 'codigo', 'ciudad', 'estado','referencia', 'persona'];
            break;
    }

}
