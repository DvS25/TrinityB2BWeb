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

namespace TrinityB2BWeb.CommonClasses
{
    public class SetUserSession
    {
        public static void DoLogin()
        {
            try
            {
                string XMLValue = string.Empty;
                string XMLMenuValue = string.Empty;
                string XMLCollectionValue = string.Empty;
                string DecryptPass = string.Empty;

              
                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = "<SERVICEREQUEST><SERVICENAME>APP_LOGIN_AUTHENTICATION</SERVICENAME>" +
                            "<USERNAME>" + HttpContext.Current.Request.Cookies["USERID"].Value + "</USERNAME>" +
                            //"<USERTYPE>" + model.SelectedAnswer + "</USERTYPE>" +
                            "<PASSWORD>" + HttpContext.Current.Request.Cookies["TOKEN"].Value + "</PASSWORD>" +
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

                }
              
            }

            catch (Exception ex)
            {
                
            }
        }
    }
}