using ParcelScout.Nucleo.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ParcelScout.Attributes
{
    public class ValidateSession  : AuthorizeAttribute

    { 

       public Perfil[] Rol { get; set; }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            bool authorize = false;
            if (HttpContext.Current.Request.Cookies["ckSolicitud"] != null)
            {
                string roles = HttpContext.Current.Request.Cookies["ckSolicitud"].Values["perfilUsuario"].ToString();
                if (Rol != null)
                {
                    foreach (Perfil p in Rol)
                    {
                        if ((int)p == Int32.Parse(roles))
                        {
                            authorize = true;
                            break;
                        }
                    }
                }
            }
            return authorize;
        }



    }
}