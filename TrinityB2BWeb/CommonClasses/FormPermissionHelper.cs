using TrinityB2BWeb.Models;
using System;
using System.Collections.Generic;
using TrinityB2BWeb.Filters;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace TrinityB2BWeb.CommonClasses
{
    public class FormPermissionHelper
    {
        public static void GetControllerAction(HttpContextBase httpContext, ref string controller, ref string action)
        {
            if (httpContext.Request.IsAjaxRequest())
            {
                string url = "/Login/Login";
                //url = httpContext.Request.UrlReferrer.LocalPath;

                if (System.Configuration.ConfigurationManager.AppSettings["domainPath"] != "")
                    url = httpContext.Request.UrlReferrer.LocalPath.Replace(System.Configuration.ConfigurationManager.AppSettings["domainPath"], "");
                else
                    url = httpContext.Request.UrlReferrer.LocalPath;

                if (!string.IsNullOrEmpty(url))
                {
                    if (url.Contains('/'))
                    {
                        int cnt = url.Count(c => c == '/');
                        string[] decodeurl = url.Split('/');

                        controller = decodeurl[1];

                        if (cnt > 1)
                            action = decodeurl[2];
                        else
                            action = "Index";

                        if (action.Contains("?"))
                        {
                            string[] decodeaction = action.Split('?');
                            action = decodeaction[0];
                        }
                    }
                    else
                    {
                        controller = url;
                        action = "Login";
                    }
                }
            }
            else
            {
                var routeData = ((MvcHandler)httpContext.Handler).RequestContext.RouteData;
                controller = (string)routeData.Values["controller"];
                action = (string)routeData.Values["action"];
            }

        }
        public class JsonStringResult : ContentResult
        {
            public JsonStringResult(string json)
            {
                Content = json;
                ContentType = "application/json";
            }
        }
       
    }
    
}