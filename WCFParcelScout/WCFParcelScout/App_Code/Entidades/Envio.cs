using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Envio
/// </summary>
public class Envio
{
    public int Id { get; set; }
    public string Folio { get; set; }
    public string FechaCreacion { get; set; }
    public Usuario Empleado { get; set; }
    public double Peso { get; set; }
    public string Dimensiones { get; set; }
    public string TipoContenido { get; set; }
    public string Descripcion { get; set; }
    public double Precio { get; set; }
    public string NoRastreo { get; set; }
    //public Cliente Cliente { get; set; }
    //public Destinatario Destinatario { get; set; }
    //public Estado Estado { get; set; }

    
    public string estadoString { get; set; }

    public IList<RegistroUbicacion> Historial { get; set; }
    public Envio()
    {
       
    }
}