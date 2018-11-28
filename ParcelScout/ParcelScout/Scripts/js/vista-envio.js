$(document).ready(function () {
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

                console.log(data.envio.Folio);

                //Info. del Envio
                $('#folio').text(data.envio.Folio);
                $('#fecha').text(data.envio.fechaString);
                $('#usuario').text(data.envio.Empleado.Nombre);
                $('#precio').text(data.envio.Precio);
                $('#estado').text(data.envio.estadoString);

                //Info. del Cliente
                $('#nombre-cliente').text(data.envio.Cliente.Nombre);
                $('#domicilio-cliente').text(data.envio.Cliente.Domicilio);
                $('#tel-cliente').text(data.envio.Cliente.Telefono);
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
                $('#recibe').text(data.envio.   Destinatario.Recibe);


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

    console.log("method executiasdfasdfjalsdjflkajsdklfjaklsdjflkajskldfjlkasjdng");
    

    if (id !== "0"){

        console.log("working over here");

        $('#modal-edit-paquete').modal();
        modalC.load(baseUrl + 'Paquete/EditInfoPaquete/ ', function () {
            console.log("modal working here");
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

                location.reload();
            } else {
                swal({
                    text: "Ocurrió un problema y no se pudieron realizar los cambios",
                    icon: "success"
                });
            }
        },
        error: function (xhr, exception){
            swal({
                text: "Ocurrió un problema y no se pudieron realizar los cambios",
                icon: "success"
            });
        }
    });

}

//Editar Info de Envio
function editarEnvio() {
    var modalC = $('#modal-edit-envio-cont');
    var id = $('#envio-id').val();

    if (id !== "0") {

        console.log("working over here");

        $('#modal-envio-paquete').modal();
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

            $('#folio').text(data.envio.Folio);
            $('#fecha').text(data.envio.fechaString);
            $('#usuario').text(data.envio.Empleado.Nombre);
            $('#precio').text(data.envio.Precio);
            $('#estado').text(data.envio.estadoString);

        },
        error: function (xhr, exception) {

        }
    });
}