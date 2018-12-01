using ParcelScout.Nucleo.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ParcelScout.Controllers
{
    public class PaqueteController : Controller
    {
        // GET: Paquete
        public ActionResult Index()
        {

            return View();
        }

        public ActionResult GestionEnvios() {
            return View();
        }

        public ActionResult VistaEnvio(int id) {
            ViewBag.IdEnvio = id;
            return View();
        }

        public ActionResult EditInfoPedido()
        {
            return PartialView("~/Views/Paquete/EditInfoPedido.cshtml");
        }

        public ActionResult EditInfoPaquete() {
            return PartialView("~/Views/Paquete/EditInfoPaquete.cshtml");
        }

        public ActionResult EditInfoCliente()
        {
            return PartialView("~/Views/Paquete/EditInfoCliente.cshtml");
        }

        public ActionResult EditInfoDestinatario()
        {
            return PartialView("~/Views/Paquete/EditInfoDestinatario.cshtml");
        }

        public ActionResult ActualizarInfoPedido(int id, double peso, string dimensiones, string tipocont, string descripcion) {
            ActionResult action = null;

            if (Envio.EditarInfoPaquete(id, peso, dimensiones, tipocont, descripcion)) {
                action = Content("true");
            } else {
                action = Content("false");
            }

            return action;
        }

        public ActionResult ActualizarInfoEnvio(int id, double precio, string estado)
        {
            ActionResult action = null;

            if (Envio.EditarInfoEnvio(id, precio, estado))
            {
                action = Content("true");
            }
            else
            {
                action = Content("false");
            }

            return action;
        }

        public ActionResult ActualizarInfoCliente(int id, string nombre, string domicilio, string telefono1, string telefono2,
                                                    string telefono3, string correo, string rfc)
        {
            ActionResult action = null;

            if (Cliente.GuardarCambios(id, nombre, domicilio, telefono1, telefono2,
                                                    telefono3, correo, rfc))
            {
                action = Content("true");
            }
            else
            {
                action = Content("false");
            }

            return action;
        }

        public ActionResult ActualizarInfoDestinatario(int id, string nombre, string domicilio, string codigoPostal, string telefono,
                                                    string ciudad, string estado, string correo, string recibe)
        {
            ActionResult action = null;

            if (Destinatario.GuardarCambios(id, nombre, domicilio, codigoPostal, ciudad, estado, telefono, correo, recibe))
            {
                action = Content("true");
            }
            else
            {
                action = Content("false");
            }

            return action;
        }

        public ActionResult ObtenerTodos()
        {
            try
            {
                IList<Envio> envios = Envio.ObtenerTodos();
                //foreach (Envio envio in envios) {
                //    envio.fechaString = envio.FechaCreacion.ToString("MM/dd/yyyy HH:mm:ss");
                //}

                return Json(new { data = envios }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        public ActionResult ObtenerPorId(int id) {

            try {

                Envio envio = Envio.ObtenerPorId(id);

                return Json(new { envio }, JsonRequestBehavior.AllowGet);
            } catch (Exception ex) {
                return RedirectToAction("Error", "Home");
            }

        }



        //public ActionResult PruebaGuardado() {
        //    ActionResult action = null;

        //    Usuario u = Usuario.ObtenerPorId(1);
        //    Cliente c = new Cliente();
        //    c.Nombre = "Iris";
        //    c.Domicilio = "Golfo de California, Calle: centro cívico.";
        //    c.Telefono = "6229846544";
        //    c.RFC = "GANI1234dfad";
        //    c.Correo = "iris@gmail.com";

        //    Destinatario d = new Destinatario();
        //    d.Nombre = "Dulce";
        //    d.Domicilio = "Somewhere at San vicente";
        //    d.CodigoPostal = "85477";
        //    d.Ciudad = "Guaymas";
        //    d.Estado = "Sonora";
        //    d.Correo = "dulce@gmail.com";
        //    d.Recibe = "Leonardo";
        //    d.Telefono = "45654325";



        //    if (Envio.Guardar(u, 123, "fragil", "un paquete con cinta roja o algo", 359.50, "", c, d)) {
        //        action = Content("TRUE");
        //    } else {
        //        action = Content("Failed");
        //    }


        //    return action;
        //}


    }
}