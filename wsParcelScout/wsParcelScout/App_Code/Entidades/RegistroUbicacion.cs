using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for RegistroUbicacion
/// </summary>
class RegistroUbicacion : Persistent
{
    public override int Id { get; set; }
    public DateTime Fecha { get; set; }
    public string Domicilio { get; set; }
    public string Ciudad { get; set; }
    public string Estado { get; set; }
    public string CodigoPostal { get; set; }
    public double Lat { get; set; }
    public double Lon { get; set; }



}