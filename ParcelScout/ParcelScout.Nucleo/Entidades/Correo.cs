using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace ParcelScout.Nucleo.Entidades
{
    public class Correo
    {

        public static string bodyCliente = "<html><head><meta charset='UTF-8'><link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet'><link href='https://fonts.googleapis.com/css?family=Merriweather|Merriweather+Sans|Open+Sans|Pacifico' rel='stylesheet'><style type='text/css'>" +
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
       "</style></head><body><div class='contenido'><img src='https://i.imgur.com/cxnryoQ.png' title='source: imgur.com'><h2>¡Hola, [NOMBRE]!</h2><h3>¡Tu envío para[DESTINATARIO] ya ha sido registrado!</h3><h4>Numero de guía:</h4><h5>[NO_RASTREO]</h5><H4>Costo:</H4><h5 class='ultimo'>[PRECIO]</h5></div></body></html>";

        public static void CorreoNuevoPaquete(string correo, string nombrecliente, string nombredestinatario, string norastreo, string precio)
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
                
                bodyCliente = bodyCliente.Replace("[NOMBRE]", nombrecliente);
                bodyCliente = bodyCliente.Replace("[DESTINATARIO]", nombredestinatario);
                bodyCliente = bodyCliente.Replace("[NO_RASTREO]", norastreo);
                bodyCliente = bodyCliente.Replace("[PRECIO]", precio);

                mmsg.Body = bodyCliente;
                

                mmsg.BodyEncoding = System.Text.Encoding.UTF8;
                mmsg.IsBodyHtml = true;
                mmsg.From = new MailAddress("parcelscout.isw@gmail.com");
                client.Send(mmsg);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }
        
    }
}
