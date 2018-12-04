﻿using ParcelScout.Nucleo.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ParcelScout.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Login() {
            return View();
        }

        [HttpPost]
        public ActionResult Login(FormCollection model) {
            ActionResult action = null;

            try {
                string correo = model["correo"].Trim();
                string password = model["password"].Trim();

                Usuario u = Usuario.ObtenerPorLogin(correo, password);

                if (u != null) {

                    HttpCookie ck = new HttpCookie("ckSolicitud");
                    ck.Values.Add("perfilUsuario", ((int)u.Perfil).ToString());
                    ck.Expires = DateTime.Now.AddHours(8);
                    Response.Cookies.Add(ck);

                    Session["usuario-id"] = u.Id;
                    Session["usuario-nombre"] = u.Nombre;
                    Session["usuario-cuenta"] = u.Cuenta;
                    Session["usuario-rol"] = u.Rol;

                    action = RedirectToAction("GestionEnvios", "Paquete");
                } else {
                    ViewBag.Message = "Correo o contraseña incorrectos.";
                    return View();
                }
            } catch (Exception ex) {
                return RedirectToAction("Error", "Home");
                throw ex;
            }

            return action;
        }

        public ActionResult LogOut() {
            Session.Clear();
            Session.Abandon();
            return View("~/Views/Home/Login.cshtml");
        }

    }
}