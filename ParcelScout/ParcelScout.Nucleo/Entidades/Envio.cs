using NHibernate;
using NHibernate.Criterion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ParcelScout.Nucleo.Entidades
{
    public class Envio : Persistent
    {

        public override int Id { get; set; }
        public string Folio { get; set; }
        public DateTime FechaCreacion { get; set; }
        public Usuario Empleado { get; set; }
        public double Peso { get; set; }
        public string Dimensiones { get; set; }
        public string TipoContenido { get; set; }
        public string Descripcion { get; set; }
        public double Precio { get; set; }
        public string NoRastreo { get; set; }
        public Cliente Cliente { get; set; }
        public Destinatario Destinatario { get; set; }
        public Estado Estado { get; set; }

        public string fechaString { get; set; }
        public string estadoString { get; set; }

        public IList<RegistroUbicacion> Historial { get; set; }

        public static IList<Envio> ObtenerTodos()
        {
            IList<Envio> envios = new List<Envio>();
            try
            {
                using (ISession session = Persistent.SessionFactory.OpenSession())
                {
                    ICriteria crit = session.CreateCriteria(new Envio().GetType());


                    //crit.SetResultTransformer(Transformers.AliasToBean<Envio>());

                    envios = crit.List<Envio>();
                    foreach (Envio envio in envios)
                    {
                        envio.fechaString = envio.FechaCreacion.ToString("MM/dd/yyyy HH:mm:ss");

                        switch (envio.Estado)
                        {
                            case Estado.EN_PROCESO:
                                envio.estadoString = "En Proceso";
                                break;
                            case Estado.ENVIADO:
                                envio.estadoString = "En Proceso";
                                break;
                            case Estado.RECIBIDO:
                                envio.estadoString = "En Proceso";
                                break;
                            case Estado.CANCELADO:
                                envio.estadoString = "En Proceso";
                                break;
                            default:
                                break;
                        }
                    }

                    session.Close();
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            return envios;
        }

        public static Envio ObtenerPorId(int id)
        {
            Envio e = new Envio();
            try
            {
                using (ISession session = Persistent.SessionFactory.OpenSession())
                {
                    ICriteria crit = session.CreateCriteria(e.GetType());
                    crit.Add(Expression.Eq("Id", id));
                    e = (crit.UniqueResult<Envio>());

                    e.fechaString = e.FechaCreacion.ToString("MM/dd/yyyy HH:mm:ss");

                    switch (e.Estado)
                    {
                        case Estado.EN_PROCESO:
                            e.estadoString = "En Proceso";
                            break;
                        case Estado.ENVIADO:
                            e.estadoString = "Enviado";
                            break;
                        case Estado.RECIBIDO:
                            e.estadoString = "Recibido";
                            break;
                        case Estado.CANCELADO:
                            e.estadoString = "Cancelado";
                            break;
                        default:
                            break;
                    }
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return e;
        }

        public static bool Guardar(Usuario empleado, double peso, string tipoContenido, string descripcion,
                                    double precio, string noRastreo, Cliente cliente, Destinatario destinatario)
        {
            bool realizado = false;

            try
            {

                Envio e = new Envio();

                e.FechaCreacion = DateTime.Now;
                e.Empleado = empleado;
                e.Peso = peso;
                e.TipoContenido = tipoContenido;
                e.Descripcion = descripcion;
                e.Precio = precio;
                e.NoRastreo = noRastreo;
                e.Cliente = cliente;
                e.Destinatario = destinatario;
                e.Estado = Estado.EN_PROCESO;

                e.Save();

                e.Folio = GenerarFolio(e.Id, e.FechaCreacion);
                e.NoRastreo = e.Folio;

                e.Update();

                realizado = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return realizado;
        }

        public static bool EditarInfoPaquete(int id, double peso, string dimensiones, string tipocont, string descripcion) {
            bool realizado = false;

            try {
                Envio e = ObtenerPorId(id);

                e.Peso = peso;
                e.Dimensiones = dimensiones;
                e.TipoContenido = tipocont;
                e.Descripcion = descripcion;

                e.Update();

                realizado = true;
            } catch (Exception ex) {
                throw ex;
            }

            return realizado;
        }

        public static bool EditarInfoEnvio(int id, double precio, string estado)
        {
            bool realizado = false;

            try
            {
                Envio e = ObtenerPorId(id);

                e.Precio = precio;

                switch (estado)
                {
                    case "en_proceso":
                        e.Estado = Estado.EN_PROCESO;
                        break;
                    case "enviado":
                        e.Estado = Estado.ENVIADO;
                        break;
                    case "recibido":
                        e.Estado = Estado.RECIBIDO;
                        break;
                    case "cancelado":
                        e.Estado = Estado.CANCELADO;
                        break;
                    default:
                        break;
                }

                e.Update();

                realizado = true;
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return realizado;
        }

        public static string GenerarFolio(int id, DateTime date)
        {
            string folio = "";

            //CUATRO DIGITOS DEL AÑO
            folio += date.Year;

            //NUMERO DE 6 DIGITOS CON 0s A LA IZQUIERDA
            int numeroFolio = id % 1000000;
            int digitosNoFolio = numeroFolio.ToString().Length;

            for (int i = 0; i < 6 - digitosNoFolio; i++)
            {
                folio += "0";
            }

            folio += numeroFolio;

            //LETRA CUANDO SE PASE EL LIMITE
            char[] letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".ToCharArray();
            if ((id / 1000000) > 0)
            {
                folio = letras[(id / 1000000) - 1] + folio;
            }

            return folio;
        }

        public static bool Delete(int id)
        {
            bool realizado = false;

            try
            {
                Envio e = ObtenerPorId(id);
                e.Delete();

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