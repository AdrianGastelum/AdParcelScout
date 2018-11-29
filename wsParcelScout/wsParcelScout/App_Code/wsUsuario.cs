using System;
using System.Collections.Generic;
using System.Web.Services;

/// <summary>
/// Summary description for wsUsuario
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class wsUsuario : System.Web.Services.WebService
{

    public wsUsuario()
    {

        
    }

    [WebMethod]
    public List<Usuario> ObtenerTodos(String text)
    {
        Usuario u = new Usuario();
        List<Usuario> usrs = u.ObtenerTodos();
    }
}
