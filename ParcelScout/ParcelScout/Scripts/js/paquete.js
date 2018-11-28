﻿$(document).ready(function () {
    cargarTabla();
    console.log("ITS WORKING");
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
    } else {
        console.log("the little shit is undefined");
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