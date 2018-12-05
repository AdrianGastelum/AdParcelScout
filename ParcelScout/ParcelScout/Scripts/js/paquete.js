$(document).ready(function () {
    cargarTabla();
});

function cargarTabla() {
    var table = $('#table-envios').DataTable();
    table.destroy();
    $('#table-envios').DataTable({
        "autoWidth": true,
        "processing": true,
        "ajax": baseUrl + "Paquete/ObtenerTodos",
        "columns": [
            { "data": "Id", visible: false, searchable: false },
            { "data": "Folio" },
            { "data": "fechaString" },
            { "data": "Cliente.Nombre" },
            { "data": "Cliente.Correo" },
            { "data": "estadoString" }
        ],
        select: true
    });
}

function obtenerId() {

    var table = $('#table-envios').DataTable();
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

function obtenerNoRastreo() {

    var table = $('#table-envios').DataTable();
    var folio = 0;
    if (table.$('.selected')[0] !== undefined) {
        console.log("so it was defined");

        var selectedIndex = table.$('.selected')[0]._DT_RowIndex; //should be .index();   ??
        console.log("Selected index: " + selectedIndex);
        var row = table.row(selectedIndex).data();
        folio = row.Folio;
    }
    return id;
}

function ver() {
    var id = obtenerId();

    if (id !== 0) {
        var url = baseUrl + "Paquete/VistaEnvio/" + id;
        window.location.href = url;
    } else {
        swal("Error", "Seleccione un registro", "warning");
    }
}

function nuevo() {
    if ($('#usuario-id').val() !== "") {
        var modalC = $('#modal-registrar-envio-cont');
        $('#modal-registrar-envio').modal();
        modalC.load(baseUrl + 'Paquete/RegistrarNuevoEnvioForm/', function () { });
    } else {
        swal({
            text: "No tiene permitido esta acción.",
            icon: "warning"
        });
    }
}

function eliminarEnvio(){
    var id = obtenerId();

    if (id !== 0) {
        swal("¿Esta seguro que desea eliminar este envío?", {
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
                            url: baseUrl + "Paquete/EliminarEnvio/",    
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
