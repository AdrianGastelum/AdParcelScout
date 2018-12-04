using ParcelScout.Nucleo.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Mail;

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

        public ActionResult RegistrarNuevoEnvioForm()
        {
            return PartialView("~/Views/Paquete/RegistrarNuevoEnvioForm.cshtml");
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


        public ActionResult ObtenerHistorialEnvio(int idEnvio) {

            try {

                IList<RegistroUbicacion> historial = RegistroUbicacion.ObtenerTodosPorIdEnvio(idEnvio);

                return Json(new { data = historial }, JsonRequestBehavior.AllowGet);
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

        public ActionResult CorreoNuevoPaquete(string correo, string nombrecliente, string nombredestinatario, string norastreo, string precio)
        {
            try
            {
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                client.Timeout = 1000000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new System.Net.NetworkCredential("parcelscout.isw@gmail.com", "scoutparcel");
                MailMessage mmsg = new MailMessage();

                mmsg.To.Add(correo);
                mmsg.Subject = "Su paquete ha sido registrado";
                mmsg.SubjectEncoding = System.Text.Encoding.UTF8;

                mmsg.Body = bodyCliente.Replace("[NOMBRE]", nombrecliente);
                mmsg.Body = bodyCliente.Replace("[DESTINATARIO]", nombredestinatario);
                mmsg.Body = bodyCliente.Replace("[NO_RASTREO]", nombrecliente);
                mmsg.Body = bodyCliente.Replace("[NOMBRE]", nombrecliente);

                mmsg.BodyEncoding = System.Text.Encoding.UTF8;
                mmsg.IsBodyHtml = true;
                mmsg.From = new MailAddress("parcelscout.isw@gmail.com");
                client.Send(mmsg);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return View();
        }

        static string bodyCliente = "<html><head><meta charset='UTF-8'><link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'><link href='https://fonts.googleapis.com/css?family=Merriweather|Merriweather+Sans|Open+Sans|Pacifico' rel='stylesheet'><style type='text/css'>" +
            ".contenido{color: white;" +
                "background-color: #2E8B57;" +
                "border-radius: 20px;" +
                "width: 500px;" +
                "display: block;" +
                "margin-left: auto;" +
                "margin-right: auto;" +
                "border-style: solid;" +
                "border-bottom-width: 10px;" +
                "border-color: #C66435;" +
                "box-shadow: 3px 3px 10px #888888;}" +
            "img" +
        "{" +
            "padding-top: 10px;" +
            "padding-right: 50px;" +
            "display: block;" +
            "margin-left: auto;" +
            "margin-right: auto;" +
            "width: 200px;" +
            "height: auto;" +
        "}" +
        "h2{text-align: center;" +
                "font-family: Pacifico;}" +
    "h3{text-align: center;" +
                "font-family: Roboto;" +
                "padding-bottom: 10px;}" +
"h4, h5{text-align: center;" +
                "font-family: Roboto;}" +
            ".ultimo{padding-bottom: 20px;}" +
        "</style></head><body><div class='contenido'><img src = 'Logo.png' >< h2 >¡Hola, [NOMBRE]!</h2><h3>¡Tu envío para[DESTINATARIO] ya ha sido registrado!</h3><h4>Numero de guía:</h4><h5>[NO_RASTREO]</h5><H4>Costo:</H4><h5 class='ultimo'>[PRECIO]</h5></div></body></html>";

    }
}