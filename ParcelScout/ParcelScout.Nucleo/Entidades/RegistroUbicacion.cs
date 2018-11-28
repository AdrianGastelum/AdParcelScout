using NHibernate;
using NHibernate.Criterion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParcelScout.Nucleo.Entidades
{
    public class RegistroUbicacion : Persistent
    {
        public override int Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Ciudad { get; set;}
        public string Estado { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }

        public static IList<RegistroUbicacion> ObtenerTodos()
        {
            IList<RegistroUbicacion> ubicaciones;
            try
            {
                using (ISession session = Persistent.SessionFactory.OpenSession())
                {
                    ICriteria crit = session.CreateCriteria(new RegistroUbicacion().GetType());

                    ubicaciones = crit.List<RegistroUbicacion>();
                    session.Close();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ubicaciones;
        }

        public static Cliente ObtenerPorId(int id)
        {
            Cliente c = new Cliente();
            try
            {
                using (ISession session = Persistent.SessionFactory.OpenSession())
                {
                    ICriteria crit = session.CreateCriteria(c.GetType());
                    crit.Add(Expression.Eq("Id", id));
                    c = (crit.UniqueResult<Cliente>());

                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return c;
        }

        public static bool Guardar(string domicilio, string ciudad,
                                   string estado, string codigoPostal, double lat, double lon)
        {
            bool realizado = false;
            try
            {

                RegistroUbicacion u = new RegistroUbicacion();
                u.Fecha = DateTime.Now;
                
                u.Ciudad = ciudad;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

                u.Save();
                realizado = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return realizado;
        }

        public static bool GuardarCambios(int id, string domicilio, string ciudad,
                                   string estado, string codigoPostal, double lat, double lon)
        {
            bool realizado = false;

            try
            {

               
          

                realizado = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return realizado;
        }



    }
}
