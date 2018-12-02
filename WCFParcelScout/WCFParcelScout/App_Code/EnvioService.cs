using System;
using System.Collections.Generic;

using System.Linq;
using System.Web;
using System.Web.Services;
using MySql.Data.MySqlClient;
using Newtonsoft.Json;

using System.Data;

/// <summary>
/// Summary description for EnvioService
/// </summary>
[WebService(Namespace = "http://ParcelScout.org/Services/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class EnvioService : System.Web.Services.WebService
{

    public EnvioService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string ObtenerTodos()
    {
        List<Envio> envios = new List<Envio>();
        string stringConnection = "Database=parcelscout; Data Source=parcelscoutdb.mysql.database.azure.com; User Id=parcelscoutad@parcelscoutdb; Password=INTegrador18";
        string json = null;

        try
        {
            using (MySqlConnection con = new MySqlConnection(stringConnection))
            {
                using (MySqlCommand command = new MySqlCommand())
                {
                    con.Open();

                    String query = "SELECT * FROM envio";
                    command.CommandText = query;
                    command.CommandType = CommandType.Text;
                    command.Connection = con;

                    MySqlDataReader reader = command.ExecuteReader();

                    while (reader.Read())
                    {
                        Envio e = new Envio();

                        e.Id = Int32.Parse(reader["id"].ToString());
                        e.Folio = reader["folio"].ToString();
                        e.FechaCreacion = reader["fecha_creacion"].ToString();
                        e.Peso = Double.Parse(reader["peso"].ToString());
                        e.Dimensiones = reader["dimensiones"].ToString();
                        e.TipoContenido = reader["tipo_contenido"].ToString();
                        e.Descripcion = reader["descripcion"].ToString();
                        e.Precio = Double.Parse(reader["precio"].ToString());
                        e.NoRastreo = reader["no_rastreo"].ToString();
                        e.estadoString = reader["estado"].ToString();

                        e.Historial = RegistroUbicacionService.ObtenerRegistroEnvio(e.Id);

                        envios.Add(e);
                    }

                    json = JsonConvert.SerializeObject(envios);



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
