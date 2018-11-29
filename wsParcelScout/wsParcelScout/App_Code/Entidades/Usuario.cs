using NHibernate;
using NHibernate.Criterion;
using NHibernate.Transform;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
/// <summary>
/// Summary description for Usuario
/// </summary>
public class Usuario : Persistent
{
    public override int Id { get; set; }
    public string Nombre { get; set; }
    public string Correo { get; set; }
    public string Cuenta { get; set; }
    public string Password { get; set; }
    public string Rol { get; set; }

    public Usuario pepe()
    {
        Usuario p = new Usuario();
        p.Id = 2;
        p.Nombre = "pepe";
        p.Correo = "Muejejej@hotmail.com";
        return p;
    }


    public static IList<Usuario> ObtenerTodos()
    {
        IList<Usuario> usuarios;
        try
        {
            using (ISession session = Persistent.SessionFactory.OpenSession())
            {
                ICriteria crit = session.CreateCriteria(new Usuario().GetType());

                //Projections
                crit.SetProjection(Projections.ProjectionList()
                    .Add(Projections.Property("Id"), "Id")
                    .Add(Projections.Property("Nombre"), "Nombre")
                    .Add(Projections.Property("Correo"), "Correo")
                    .Add(Projections.Property("Cuenta"), "Cuenta")
                    .Add(Projections.Property("Rol"), "Rol")
                    );
                crit.SetResultTransformer(Transformers.AliasToBean<Usuario>());

                usuarios = crit.List<Usuario>();
                session.Close();
            }

        }
        catch (Exception ex)
        {
            throw ex;
        }
        return usuarios;
    }

    public static Usuario ObtenerPorId(int id)
    {
        Usuario u = new Usuario();
        try
        {
            using (ISession session = Persistent.SessionFactory.OpenSession())
            {
                ICriteria crit = session.CreateCriteria(u.GetType());
                crit.Add(Expression.Eq("Id", id));
                u = (crit.UniqueResult<Usuario>());

            }
        }
        catch (Exception ex)
        {

            throw ex;
        }
        return u;
    }

    public static bool Guardar(string nombre, string cuenta, string correo, string password, string rol)
    {
        bool realizado = false;
        try
        {

            Usuario u = new Usuario();
            u.Nombre = nombre;
            u.Correo = correo;
            u.Cuenta = cuenta;
            u.Password = password;
            u.Rol = rol;
            u.Save();
            realizado = true;
        }
        catch (Exception ex)
        {
            throw ex;
        }
        return realizado;
    }

    public static bool GuardarCambios(int id, string nombre, string cuenta,
                                        string correo, string password, string rol)
    {
        bool realizado = false;

        try
        {

            Usuario u = ObtenerPorId(id);
            u.Nombre = nombre;
            u.Cuenta = cuenta;
            u.Password = password;
            u.Correo = correo;
            u.Rol = rol;
            u.Update();

            realizado = true;
        }
        catch (Exception ex)
        {
            throw ex;
        }

        return realizado;
    }

    public static bool Delete(int id)
    {
        bool realizado = false;

        try
        {
            Usuario u = ObtenerPorId(id);
            u.Delete();

            realizado = true;
        }
        catch (Exception ex)
        {
            throw ex;
        }

        return realizado;
    }

    public static Usuario ObtenerPorLogin(string correo, string password)
    {
        Usuario user = new Usuario();

        try
        {
            using (ISession session = Persistent.SessionFactory.OpenSession())
            {
                ICriteria crit = session.CreateCriteria(user.GetType());
                crit.Add(Expression.Eq("Correo", correo));
                crit.Add(Expression.Eq("Password", password));

                user = (crit.UniqueResult<Usuario>());
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        return user;
    }



}