using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for RegistroUbicacion
/// </summary>
public class RegistroUbicacion
{
    public int Id { get; set; }
    public string Fecha { get; set; }
    public string Ciudad { get; set; }
    public string Estado { get; set; }
    public double Lat { get; set; }
    public double Lon { get; set; }
    

    public RegistroUbicacion()
    {
        
    }
}