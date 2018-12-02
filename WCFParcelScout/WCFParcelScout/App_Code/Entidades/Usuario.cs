using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Usuario
/// </summary>
/// 

    [Serializable]
public class Usuario
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Correo { get; set; }
    public string Cuenta { get; set; }
    public string Password { get; set; }
    public string Rol { get; set; }

    public Usuario()
    {
    
    }
}