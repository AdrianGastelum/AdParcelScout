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

    if (posActual == 2 && clienteExistente != null) existeCliente = true;

    if (validarView() || existeCliente) {
        posAnterior = posActual;
        posActual++;

        $('#btnPrevious').show();
        $('#' + obtenerView(posAnterior)).hide();
        $('#' + obtenerView(posActual)).show();

        if (posActual == 3) {
            $('#btnNext').hide();
            $('#btnSubmit').show();
        }
    } else {
        alert('No se han llenado todos los campos');
    }

});


$('#btnPrevious').on("click", function () {
    posAnterior = posActual;
    posActual--;

    $('#btnNext').show();
    $('#btnSubmit').hide();

    $('#' + obtenerView(posAnterior)).hide();
    $('#' + obtenerView(posActual)).show();

    if (posActual == 1) {
        $('#btnPrevious').hide();

    }
})

$('#btnSubmit').on("click", function () {
    var existeDestinatario = false;

    if (posActual == 3 && destinatarioExistente != null) existeDestinatario = true;

    if (validarView() || existeDestinatario) {

        var paquetePeso = $('input[name=paquete-peso]').val();
        var paqueteDimensiones = $('input[name=paquete-dimensiones]').val();
        var paqueteTipo = $('input[name=paquete-tipo]').val();
        var paqueteDescripcion = $('input[name=paquete-descripcion]').val();
        var paquetePrecio = $('input[name=paquete-precio]').val();

        if (clienteExistente == null) {
            var clienteNombre = $('input[name=cliente-nombre]').val();
            var clienteDomicilio = $('input[name=cliente-domicilio]').val();
            var clienteTelefono = $('input[name=cliente-telefono]').val();
            var clienteRfc = $('input[name=cliente-rfc]').val();
        } else {
            console.log('Cliente existe');
        }

        if (destinatarioExistente == null) {
            var destinatarioNombre = $('input[name=destinatario-nombre]').val();
            var destinatarioTelefono = $('input[name=destinatario-telefono]').val();
            var destinatarioCorreo = $('input[name=destinatario-correo]').val();
            var destinatarioCalle = $('input[name=destinatario-calle]').val();
            var destinatarioNumero = $('input[name=destinatario-numero]').val();
            var destinatarioAvenida = $('input[name=destinatario-avenida]').val();
            var destinatarioColonia = $('input[name=destinatario-colonia]').val();
            var destinatarioCodigo = $('input[name=destinatario-codigo]').val();
            var destinatarioCiudadestado = $('input[name=destinatario-ciudadestado]').val();
            var destinatarioReferencia = $('input[name=destinatario-referencia]').val();

            var destinatarioPersona = $('input[name=destinatario-persona]').val();

        } else {
            console.log('Destinatario existe');
        }




        alert('Se han agregado los campos con exito');


    } else {
        alert('No se han llenado todos los campos');
    }
});

$('#btnUsarCliente').on("click", function () {
    clienteExistente = "Existe";
    $('#lbExisteCliente').html("Se ha agregado usuario...");

    $('#crearCliente').hide();

});

$('#btnUsarDestinatario').on("click", function () {
    destinatarioExistente = "Existe";
    $('#lbExisteDestinatario').html("Se ha agregado destinatario...");

    $('#crearDestinatario').hide();
});



/**
 *El metodo valida la view actual para comprobar que es posible el pasar a la siguiente view 
 */
function validarView() {
    var valido = true;
    var errores = [];

    selectElemento(posActual);


    campos.forEach(function (campo, index, campos) {
        var aux = $("input[name=" + elemento + "-" + campo + "]").val();
        console.log(aux);
        console.log("Valor a evaluar : " + "input[name=" + elemento + "-" + campo + "]  Cuyo valor es de :" + aux);

        if (aux === "") {
            if (campo === "rfc" || campo === "persona") {
                console.log("Es un campo opcional, omitir");
            } else {
                valido = false;
                $(aux).css("background-color", "red");
                errores.push('El campo ' + campo + ' no fue llenado');
            }

        } else $(aux).css("background-color", "white");

    });

    return valido;
}



/**
 * Obtiene el string de la view segun su posicion
 * @param {any} pos
 */
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

/**
 * Optiene los campos del elemento
 * @param {Int16} op
 */
function selectElemento(op) {
    switch (op) {
        case 1:
            elemento = 'paquete';
            campos = ['peso', 'dimensiones', 'tipo', 'descripcion', 'precio'];
            break;

        case 2:
            elemento = 'cliente';
            campos = ['nombre', 'domicilio', 'telefono', 'correo', 'rfc'];
            break;

        case 3:
            elemento = 'destinatario';
            campos = ['nombre', 'telefono', 'correo', 'calle', 'avenida', 'colonia', 'codigo', 'ciudadestado', 'referencia', 'persona'];
            break;
    }

}
