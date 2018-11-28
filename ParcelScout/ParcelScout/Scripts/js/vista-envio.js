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

function editarPaquete() {
    var modalC = $('modal-edit-paquete-cont');
    var id = $('#envio-id').val();

    if (id !== 0){

        $('modal-edit-paquete').modal();
        modalC.load(baseUrl + 'Paquete/EditInfoPaquete/ ', function(){
            cargarDatosPaquete(id);
        });

    } else {

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
            $('#descripcion-mod').val(data.envio.Dimensiones);
        },
        error: function (xhr, exception) {

        }
    });
}