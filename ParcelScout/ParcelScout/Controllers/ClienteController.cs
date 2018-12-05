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
    }
}