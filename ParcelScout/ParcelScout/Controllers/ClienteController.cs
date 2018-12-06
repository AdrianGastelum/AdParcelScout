using ParcelScout.Attributes;
using ParcelScout.Nucleo.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ParcelScout.Controllers
{

    [ValidateSession(Rol = new Perfil[] { Perfil.ADMINISTRADOR, Perfil.SOLO_LECTURA })]
    public class ClienteController : Controller
    {
        // GET: Cliente
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GestionClientes() {
            return View();
        }

        public ActionResult EditInfoCliente() {
            return PartialView("~/Views/Cliente/EditInfoCliente.cshtml");
        }

        public ActionResult ObtenerPorId(int id) {
            Cliente c = new Cliente();
            try
            {
                c = Cliente.ObtenerPorId(id);
            }
            catch (Exception)
            {

                return RedirectToAction("Error", "Home");
            }
            return Json(c, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ObtenerTodos()
        {
            try
            {
                IList<Cliente> clientes = Cliente.ObtenerTodos();
                //foreach (Envio envio in envios) {
                //    envio.fechaString = envio.FechaCreacion.ToString("MM/dd/yyyy HH:mm:ss");
                //}

                return Json(new { data = clientes }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home");
            }
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

        [ValidateSession(Rol = new Perfil[] { Perfil.ADMINISTRADOR })]
        public ActionResult EliminarCliente(int id)
        {
            try
            {
                IList<Envio> envios = Envio.ObtenerPorCliente(id);
                foreach (Envio e in envios)
                {
                    e.Delete();
                }

                Cliente c = Cliente.ObtenerPorId(id);
                c.Delete();

                return Content("true");
            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Home");

            }
        }

    }
}