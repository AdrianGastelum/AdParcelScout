using System;
using System.Collections.Generic;

using System.Linq;
using System.Web;
using System.Web.Services;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

using System.Data;

/// <summary>
/// Summary description for UsuarioService
/// </summary>
[WebService(Namespace = "http://ParcelScout.org/Services/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class UsuarioService : System.Web.Services.WebService
{

    public UsuarioService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string HelloWorld()
    {
        return "Hello World";
    }

    [WebMethod]
    public string ObtenerTodos()
    {
        List<Usuario> usuarios = new List<Usuario>();
        string stringConnection = "Database=parcelscout; Data Source=parcelscoutdb.mysql.database.azure.com; User Id=parcelscoutad@parcelscoutdb; Password=INTegrador18";
        string json = null;

        try
        {
            using(MySqlConnection con = new MySqlConnection(stringConnection))
            {
                using(MySqlCommand command = new MySqlCommand())
                {
                    con.Open();

                    String query = "SELECT * FROM usuario";
                    command.CommandText = query;
                    command.CommandType = CommandType.Text; 
                    command.Connection = con;

                    MySqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Usuario u = new Usuario();

                        u.Id = Int32.Parse(reader["id"].ToString());
                        u.Nombre = reader["nombre"].ToString();
                        u.Correo = reader["correo"].ToString();
                        u.Cuenta = reader["cuenta"].ToString();
                        u.Password = reader["password"].ToString();
                        u.Rol = reader["rol"].ToString();

                        usuarios.Add(u);
                    }

                    json = JsonConvert.SerializeObject(usuarios);


                    
                }
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }



        return json;
        }



}
