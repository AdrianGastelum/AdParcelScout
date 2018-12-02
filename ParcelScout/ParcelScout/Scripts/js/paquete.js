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
    var modalC = $('#modal-registrar-envio-cont');
    $('#modal-registrar-envio').modal();
    modalC.load(baseUrl + 'Paquete/RegistrarNuevoEnvioForm/', function () { });
}
