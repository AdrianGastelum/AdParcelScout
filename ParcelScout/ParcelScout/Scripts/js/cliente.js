$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    var table = $('#table-clientes').DataTable();
    table.destroy();
    $('#table-clientes').DataTable({
        "autoWidth": true,
        "processing": true,
        "ajax": baseUrl + "Cliente/ObtenerTodos",
        "columns": [
            { "data": "Id", visible: false, searchable: false },
            { "data": "Nombre" },
            { "data": "Domicilio" },
            { "data": "Telefono1" },
            { "data": "Correo" },
            { "data": "RFC" }
        ],
        select: true
    });
}

function obtenerId() {

    var table = $('#table-clientes').DataTable();
    var id = 0;
    if (table.$('.selected')[0] !== undefined) {
        console.log("so it was defined");

        var selectedIndex = table.$('.selected')[0]._DT_RowIndex; //should be .index();   ??
        console.log("Selected index: " + selectedIndex);
        var row = table.row(selectedIndex).data();
        id = row.Id;
    }
    return id;
}

//Editar Info. Cliente
function editarCliente() {
    var modalC = $('#modal-edit-cliente-cont');
    var id = obtenerId();

    if (id !== 0) {

        $('#modal-edit-cliente').modal();
        modalC.load(baseUrl + 'Paquete/EditInfoCliente/ ', function () {
            cargarDatosCliente(id);
        });

    } else {
        swal({
            text: "Selecciona un cliente.",
            icon: "info"
        });
  
    }
}

function cargarDatosCliente(id) {
    $.ajax({
        url: baseUrl + "Cliente/ObtenerPorId/" + id,
        traditional: true,
        type: 'GET',
        cache: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);

            $('#id-c').val(data.Id);
            $('#nombre-c-mod').val(data.Nombre);
            $('#domicilio-c-mod').val(data.Domicilio);
            $('#telefono1-c-mod').val(data.Telefono1);
            $('#telefono2-c-mod').val(data.Telefono2);
            $('#telefono3-c-mod').val(data.Telefono3);
            $('#correo-c-mod').val(data.Correo);
            $('#rfc-c-mod').val(data.RFC);


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

    var todoLleno = true;

    if (id === "0") todoLleno = false;
    if (nombre === "") todoLleno = false;
    if (domicilio === "") todoLleno = false;
    if (telefono1 === "") todoLleno = false;
    // if (telefono2) todoLleno = false;
    // if (telefono3) todoLleno = false;
    if (correo === "") todoLleno = false;

    if (todoLleno) {

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
                        cargarTabla();
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

    } else {
        swal({
            text: "Es necesario llenar todos los campos",
            icon: "warning"
        });
    }
}


function eliminarCliente() {
    var id = obtenerId();

    if (id !== 0) {
        swal("¿Esta seguro que eliminar al cliente? Los envios asociados a este también se eliminarán.", {
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
                            url: baseUrl + "Cliente/EliminarCliente/",
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

