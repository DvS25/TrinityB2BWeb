using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TrinityB2BWeb.Models;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Text;
using TrinityB2BWeb.CommonClasses;
using TrinityB2BWeb.ServiceReference1;
using System.Xml;
using System.Net.Mail;
using System.Configuration;
using System.Net;
using System.IO;

namespace TrinityB2BWeb.Controllers
{
    public class LoginController : Controller
    {
        public ActionResult Index(String msg)
        {
            ViewBag.MessageHome = msg;
            return View();
        }
        public ActionResult Aboutus()
        {
            return View();
        }
        public ActionResult Contactus()
        {
            return View();
        }
        public ActionResult Company()
        {
            return View();
        }
        public ActionResult PrivacyPolicy()
        {
            return View();
        }
        public ActionResult DowloadApp()
        {
            return View();
        }
        public ActionResult FactoryOutlet()
        {
            return View();
        }
        public ActionResult TermsCondition()
        {
            return View();
        }
        public ActionResult Sitemap()
        {
            return View();
        }
        public ActionResult QuotationView(string UNIQUEID)
        {
            ViewBag.UNIQUEID = UNIQUEID;
            return View();
        }
        public ActionResult Login(String msg)
        {
            LoginViewModel loginmodel = new LoginViewModel();
            if (Request.Cookies["WebUserName"] != null && Request.Cookies["WebPassword"] != null && Request.Cookies["WebRemember"] != null)
            {
                loginmodel.Email = Request.Cookies["WebUserName"].Value;
                loginmodel.Password = Request.Cookies["WebPassword"].Value;
                loginmodel.RememberMe = Convert.ToBoolean(Request.Cookies["WebRemember"].Value);
            }
            ViewBag.Message = msg;
            return View(loginmodel);
        }
        public ActionResult LogOut()
        {
            SessionFacade.UserSession = null;
            LogoutInMsg LogoutInMsg = new LogoutInMsg();
            LogoutInMsg.Is_Login = 1;
            SessionFacade.LogoutInSession = LogoutInMsg;
            Response.Cookies["USERID"].Value = "";
            Response.Cookies["TOKEN"].Value = "";
            return RedirectToAction("Index", "Login", new { Msg = "You logged out successfully." });

        }
        public ActionResult DoLogin(LoginViewModel model)
        {
            try
            {
                string XMLValue = string.Empty;
                string XMLMenuValue = string.Empty;
                string XMLCollectionValue = string.Empty;
                string DecryptPass = string.Empty;

                //if (Request.Cookies["WebRemember"] != null)
                //    Response.Cookies["WebRemember"].Expires = DateTime.Now.AddDays(-1);
                Response.Cookies["USERID"].Value = model.Email;
                Response.Cookies["TOKEN"].Value = model.Password;

                if (Request.Cookies["USERID"] != null)
                    Response.Cookies["USERID"].Expires = DateTime.Now.AddDays(1);
                if (Request.Cookies["TOKEN"] != null)
                    Response.Cookies["TOKEN"].Expires = DateTime.Now.AddDays(1);



                if (model.RememberMe == true)
                {
                    Response.Cookies["WebUserName"].Value = model.Email;
                    Response.Cookies["WebUserName"].Expires = DateTime.Now.AddDays(1);
                    Response.Cookies["WebPassword"].Value = model.Password;
                    Response.Cookies["WebPassword"].Expires = DateTime.Now.AddDays(1);
                    Response.Cookies["WebRemember"].Value = "True";
                    Response.Cookies["WebRemember"].Expires = DateTime.Now.AddDays(1);
                }
                else
                {
                    Response.Cookies["WebUserName"].Value = "";
                    Response.Cookies["WebPassword"].Value = "";
                    Response.Cookies["WebRemember"].Value = "False";
                }
                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>APP_LOGIN_AUTHENTICATION</SERVICENAME>" +
                            "<USERNAME>" + model.Email + "</USERNAME>" +
                            //"<USERTYPE>" + model.SelectedAnswer + "</USERTYPE>" +
                            "<PASSWORD>" + model.Password + "</PASSWORD>" +
                            "<CALLFROM>B2BWeb</CALLFROM>" +
                            "</SERVICEREQUEST>";

                ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
                XMLValue = proxy.PERFORM_ACTIONS(XMLValue);

                // CODE TO READ RESPONCE 
                XmlDocument doc = new XmlDocument();
                doc.LoadXml(XMLValue);

                if (doc.SelectSingleNode("SERVICERESPONSE//RESPONSECODE").InnerText == "0") // USER AUTHENTICATION OK
                {

                    UserDetails objUser = new UserDetails();

                    objUser.USERID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//USERID").InnerText);
                    objUser.USERNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//USERNAME").InnerText;
                    objUser.PASSWORD = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//PASSWORD").InnerText;
                    objUser.USERTYPE = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//USERTYPE").InnerText;
                    objUser.COMPANY = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//COMPANY").InnerText;
                    objUser.CONTACTPERSONNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//CONTACTPERSONNAME").InnerText;
                    objUser.TOKEN = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//TOKEN").InnerText;
                    objUser.EMAIL = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//EMAIL").InnerText;
                    objUser.CONTACTNO = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//CONTACTNO").InnerText;
                    objUser.MOBILE = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//MOBILE").InnerText;
                    objUser.DEFAULTDIAMONDCOLOR = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//DEFAULTDIAMONDCOLOR").InnerText;
                    objUser.DEFAULTDIAMONDPURITY = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//DEFAULTDIAMONDPURITY").InnerText;
                    objUser.POLICY = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//POLICY").InnerText;
                    objUser.LANGUAGE = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//LANGUAGE").InnerText;
                    objUser.CURRENCYCODE = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//CURRENCYCODE").InnerText;
                    objUser.FLAGIMG = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//FLAGIMG").InnerText;
                    objUser.COUNTRYID = Convert.ToInt32(doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//COUNTRYID").InnerText);
                    objUser.COUNTRYNAME = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//COUNTRYNAME").InnerText;
                    if (objUser.USERTYPE == "Party")
                    {
                        objUser.PARTYCODE = doc.SelectSingleNode("SERVICERESPONSE//DETAILSLIST//DETAILS//PARTYCODE").InnerText;
                    }

                    SessionFacade.UserSession = objUser;
                    Dictionary<Tuple<string, string>, List<Product>> menu = new Dictionary<Tuple<string, string>, List<Product>>();
                    List<Product> productList = new List<Product>();
                    StringBuilder ModuleStr = new StringBuilder("");
                    XmlNodeList xmlNodeList;
                    int cnt = 1;
                    XmlNodeList module_nodes = doc.SelectNodes("SERVICERESPONSE//MENULIST//MENUDETAIL");
                    if (module_nodes.Count > 0)
                    {
                        ModuleStr.Append("<ul class='megamenu' data-transition='slide' data-animationtime='500'>");
                        foreach (XmlNode node in module_nodes)
                        {
                            cnt = 1;

                            ModuleStr.Append("<li class='with-sub-menu hover'>" +
                                "<p class='close-menu'></p>" +
                                 "<a href = \"javascript: void(0)\" class='clearfix'><strong>" + node["MAINMENUNAME"].InnerText + "</strong><b class='caret'></b></a>");

                            //xmlNodeList = module_nodes.SelectNodes("DETAIL");

                            ModuleStr.Append("<div class='sub-menu' style='width: 100%'>" +
                                              "<div class='content'>" +
                                              "<div class='row'>" +
                                              "<div class='col-sm-12'>" +
                                              "<div class='categories'>" +
                                              "<div class='row'>");

                            xmlNodeList = node.SelectNodes("DETAILS");

                            foreach (XmlNode catogarynode in xmlNodeList)
                            {
                                //productList = new List<Product>();

                                if (cnt == 1)
                                {
                                    if (node["MAINMENUNAME"].InnerText != "COLLECTIONS")
                                        ModuleStr.Append("<div class='col-lg-3 col-md-6 col-sm-3 static-menu'><div class='menu'>");
                                    else
                                        ModuleStr.Append("<div class='col-sm-6 static-menu'><div class='menu'>");
                                }

                                if (node["MAINMENUNAME"].InnerText != "COLLECTIONS")
                                {
                                    ModuleStr.Append("<ul>" +
                                           "<li>" +
                                           "<img src=\"" + catogarynode["CATEGORYIMAGE"].InnerText + "\" style='width: 15px; height: 15px; float:left' />" +
                                           "<a href = \"javascript:void(0)\" class=\"main-menu capitalize\" onclick=\"ClickOnCategory('" + catogarynode["CATEGORYNAME"].InnerText + "')\">" + catogarynode["CATEGORYNAME"].InnerText.ToLower() + "</a>"

                                );
                                }
                                else
                                {
                                    ModuleStr.Append("<ul>" +
                                          "<li>" +
                                          "<input type='hidden' value='" + catogarynode["SUBCATEGORYNAME"].InnerText.TrimEnd(',') + "' id='inputcollectionsub" + catogarynode["WOMAN_COLLECTION_ID"].InnerText + "'/>" +
                                          "<input type='hidden' value='" + catogarynode["COLLECTIONKEYWORD"].InnerText + "' id='inputcollectionkeyword" + catogarynode["WOMAN_COLLECTION_ID"].InnerText + "'/>" +
                                          "<input type='hidden' value='" + catogarynode["DESIGNCODE"].InnerText + "' id='inputcollectiondesign" + catogarynode["WOMAN_COLLECTION_ID"].InnerText + "'/>" +
                                          //"<a href = 'javascript: void(0)' class='main-menu capitalize'>" + catogarynode["CATEGORYNAME"].InnerText.ToLower() + "</a>");
                                          "<div class='link'>" +
                                          "<a href=\"javascript:void(0)\" onclick=\"ClickOnCollection('" + catogarynode["WOMAN_COLLECTION_ID"].InnerText + "')\"> " +
                                          "<img src=\"" + catogarynode["CATEGORYIMAGE"].InnerText + "\" alt=\"" + catogarynode["CATEGORYNAME"].InnerText.ToLower() + "\" style=\"width:100%;\">" +
                                          "</a>" +
                                          "</div>");

                                }
                                if (node["MAINMENUNAME"].InnerText != "COLLECTIONS")
                                {
                                    XmlNodeList xmlnodelist1 = catogarynode["SUBCATEGORYLIST"].SelectNodes("SUBCATEGORY");
                                    ModuleStr.Append("<ul>");
                                    foreach (XmlNode subnode in xmlnodelist1)
                                    {
                                        //objproduct = new product();
                                        ModuleStr.Append(
                                            "<li>" +
                                            "<a href=\"javascript:void(0)\" onclick=\"SubCategoryClick('" + subnode["SUBCATEGORYNAME"].InnerText + "')\" class=\"capitalize subcategory\">" + subnode["SUBCATEGORYNAME"].InnerText.ToLower() + "</a>" +
                                             "</li>"
                                            );

                                    }
                                    ModuleStr.Append("</ul>");
                                }
                                ModuleStr.Append("</li></ul>");

                                if (cnt == 3)
                                {
                                    ModuleStr.Append("</div></div>");
                                    cnt = 1;
                                }
                                else
                                {
                                    cnt++;
                                }
                                // close div for last category
                                if (cnt == xmlNodeList.Count - 1)
                                {
                                    ModuleStr.Append("</div></div>");
                                    cnt = 1;
                                }
                            }


                            ModuleStr.Append("</div></div></div></div></div></div>");
                        }
                        ModuleStr.Append("</li></ul>");
                    }
                    SessionFacade.MenuListstr = ModuleStr.ToString();

                    return RedirectToAction("Index", "Home");
                }
                else // AUTHENTICATION FAILED
                {
                    return RedirectToAction("Login", "Login", new { Msg = doc.SelectSingleNode("SERVICERESPONSE//RESPONSEMESSAGE").InnerText });
                }
            }

            catch (Exception ex)
            {
                return RedirectToAction("Login", "Login", new { Msg = ex.Message });
            }
        }
        public string Login_Out()
        {
            LogoutInMsg LogoutInMsg = new LogoutInMsg();
            LogoutInMsg.Is_Login = 0;
            SessionFacade.LogoutInSession = LogoutInMsg;
            return "success";
        }
        public ActionResult SharedProductDetail(string id,string stocktype)
        {
            ViewBag.Designno = CommonController.Decrypt(id);
            ViewBag.Stocktype = stocktype;
            return View();
        }

        [HttpPost, ValidateInput(false)]
        public string SendMail(string Emailids, string subject, string body)
        {
            string eroorMessage = string.Empty;
            bool ssl;
            try
            {
                System.Net.Mail.MailMessage mail = new System.Net.Mail.MailMessage();
                SmtpClient client = new SmtpClient();
                ssl = Convert.ToBoolean(ConfigurationManager.AppSettings["contactSSl"]);
                client.Host = ConfigurationManager.AppSettings["contactHost"];
                client.Port = Convert.ToInt32(ConfigurationManager.AppSettings["contactPort"]);
                mail.From = new MailAddress(ConfigurationManager.AppSettings["contactMail"], "TrinityJewells.");

                mail.Subject = subject;

                mail.Body = body;
                //mail.Body = HttpUtility.HtmlDecode(body);

                mail.IsBodyHtml = true;
                mail.Priority = MailPriority.High;

                mail.To.Add(Emailids);

                client.UseDefaultCredentials = false;
                client.EnableSsl = ssl;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;


                client.Credentials = new System.Net.NetworkCredential(ConfigurationManager.AppSettings["contactMail"], ConfigurationManager.AppSettings["contactPassword"]);
                client.Send(mail);

                return "success";
            }

            catch (Exception ex)
            {

                eroorMessage = ex.Message.ToString() + ex.StackTrace.ToString() + ex.InnerException;
                return eroorMessage;
            }

        }

        [HttpPost, ValidateInput(false)]
        public string SendSMS(string mobileNos, string body)
        {
            string status = "";
            string url = "";
            if (mobileNos != "" && mobileNos != null)
            {
                url = "http://www.smsidea.co.in/SmsStatuswithId.aspx?mobile=9879147206&pass=9879147206&senderid=TRINIT&to=" + mobileNos + "&msg=" + body;

                try
                {
                    HttpWebRequest request = WebRequest.Create(url) as HttpWebRequest;
                    HttpWebResponse response = request.GetResponse() as HttpWebResponse;
                    //Stream stream = response.GetResponseStream();
                    // status = stream.ToString();

                    if(response.StatusCode.ToString() == "OK")
                    {
                        status = "success";
                    }
                    else
                    {
                        status = response.StatusCode.ToString();
                    }
                }
                catch (Exception e)
                {
                    status = e.Message.ToString();
                }
                return status;
            }
            return status;

        }
    }
}