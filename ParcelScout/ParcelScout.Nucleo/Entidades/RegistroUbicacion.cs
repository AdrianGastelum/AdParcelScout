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
        public string Ciudad { get; set; }
        public string Estado { get; set; }
        public double Lat { get; set; }
        public double Lon { get; set; }

        public string fechaString { get; set; }

        public static IList<RegistroUbicacion> ObtenerTodos()
        {
            IList<RegistroUbicacion> ubicaciones;
            try
            {
                using (ISession session = Persistent.SessionFactory.OpenSession())
                {
                    ICriteria crit = session.CreateCriteria(new RegistroUbicacion().GetType());

                    ubicaciones = crit.List<RegistroUbicacion>();

                    foreach (RegistroUbicacion ub in ubicaciones) {

                        ub.fechaString = ub.Fecha.ToString("MM/dd/yyyy HH:mm:ss");

                    }

                    session.Close();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ubicaciones;
        }

        public static RegistroUbicacion ObtenerPorId(int id)
        {
            RegistroUbicacion ru = new RegistroUbicacion();
            try
            {
                using (ISession session = Persistent.SessionFactory.OpenSession())
                {
                    ICriteria crit = session.CreateCriteria(ru.GetType());
                    crit.Add(Expression.Eq("Id", id));
                    ru = (crit.UniqueResult<RegistroUbicacion>());

                    ru.fechaString = ru.Fecha.ToString("MM/dd/yyyy HH:mm:ss");

                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return ru;
        }

        public static IList<RegistroUbicacion> ObtenerTodosPorIdEnvio(int idEnvio) {
            IList<RegistroUbicacion> ubicaciones;

            Envio e = Envio.ObtenerPorId(idEnvio);
            
            ubicaciones = e.Historial;

            foreach (RegistroUbicacion ub in ubicaciones)
            {

                ub.fechaString = ub.Fecha.ToString("MM/dd/yyyy HH:mm:ss");

            }

            return ubicaciones;
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

        public static bool GuardarCambios(int id, string ciudad, string estado, double lat, double lon)
        {
            bool realizado = false;

            try
            {

                RegistroUbicacion ru = ObtenerPorId(id);
                ru.Fecha = DateTime.Now;
                ru.Ciudad = ciudad;
                ru.Estado = estado;
                ru.Lat = lat;
                ru.Lon = lon;

                ru.Update();

                realizado = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return realizado;
        }

        public static bool Delete(int id) {
            bool realizado = false;

            try {

                RegistroUbicacion ru = ObtenerPorId(id);

                ru.Delete();

                realizado = true;
            } catch (Exception ex) {

            }

            return realizado;
        }



    }
}
