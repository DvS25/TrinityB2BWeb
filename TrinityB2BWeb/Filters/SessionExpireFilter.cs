using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TrinityB2BWeb.CommonClasses;
using System.Web.Mvc;
using System.Web.Routing;

namespace TrinityB2BWeb.Filters
{
    public class SessionExpireFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            string controller = string.Empty;
            string action = string.Empty;

            // Getting controller, action name from HttpRequest
            FormPermissionHelper.GetControllerAction(filterContext.HttpContext, ref controller, ref action);

            if (SessionFacade.UserSession == null)
            {
                if (HttpContext.Current.Request.Cookies["USERID"] != null && HttpContext.Current.Request.Cookies["TOKEN"] != null)
                {
                    if (HttpContext.Current.Request.Cookies["USERID"].Value != "" && HttpContext.Current.Request.Cookies["TOKEN"].Value != "")
                    {
                        SetUserSession.DoLogin();
                        filterContext.Result = new RedirectResult("~/" + controller + "/" + action + "");
                        return;
                    }
                }
            }

            if (SessionFacade.UserSession == null)
            {
                if (HttpContext.Current.Request.Cookies["USERID"] == null && HttpContext.Current.Request.Cookies["TOKEN"] == null)
                {
                    if (DefaultAccessMethodlist.CheckIsBeforeLoginAccess(controller, action) == false)
                    {
                        if (filterContext.HttpContext.Request.IsAjaxRequest())
                        {
                            filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                        "<RESPONSECODE>-405</RESPONSECODE>" +
                                                                        "<RESPONSEMESSAGE>YOUR SESSION TIMEOUT. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                        "</SERVICERESPONSE>");
                        }
                        else
                        {
                            filterContext.Result = new RedirectResult("~/Login/Login");
                            return;
                        }
                    }
                }
                else
                {
                    SetUserSession.DoLogin();
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }

    public class AuthorizeUserAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            string controller = string.Empty;
            string action = string.Empty;

            // Getting controller, action name from request URL
            FormPermissionHelper.GetControllerAction(httpContext, ref controller, ref action);

            if (SessionFacade.UserSession == null)
            {
                if (HttpContext.Current.Request.Cookies["USERID"] != null && HttpContext.Current.Request.Cookies["TOKEN"] != null)
                {
                    if (HttpContext.Current.Request.Cookies["USERID"].Value != "" && HttpContext.Current.Request.Cookies["TOKEN"].Value != "")
                    {
                        SetUserSession.DoLogin();
                        return true;
                    }
                }
            }

            if (SessionFacade.UserSession == null)
            {
                if (HttpContext.Current.Request.Cookies["USERID"] == null && HttpContext.Current.Request.Cookies["TOKEN"] == null)
                {
                    if (DefaultAccessMethodlist.CheckIsBeforeLoginAccess(controller, action) == true)
                        return true;
                    else
                        return false;
                }
                else
                {
                    SetUserSession.DoLogin();
                    return true;
                }
            }
            else
            {
               return true; // Checking in form permision
            }
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                if (SessionFacade.UserSession == null)
                {
                    filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                "<RESPONSECODE>-405</RESPONSECODE>" +
                                                                "<RESPONSEMESSAGE>YOUR APPLICATION SESSION TIMEOUT. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                "</SERVICERESPONSE>");
                }
                else
                {
                    filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                "<RESPONSECODE>-401</RESPONSECODE>" +
                                                                "<RESPONSEMESSAGE>APPLICATION UNAUTHORIZED ACCESS. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                "</SERVICERESPONSE>");
                }
            }
            else
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Login", action = "Login" }));
            }
        }

    }

    public class VendorSessionExpireFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (SessionFacade.UserSession == null)
            {
                string controller = string.Empty;
                string action = string.Empty;

                // Getting controller, action name from HttpRequest
                FormPermissionHelper.GetControllerAction(filterContext.HttpContext, ref controller, ref action);

                if (DefaultAccessMethodlist.CheckIsBeforeLoginAccess(controller, action) == false)
                {
                    if (filterContext.HttpContext.Request.IsAjaxRequest())
                    {

                        filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                    "<RESPONSECODE>-405</RESPONSECODE>" +
                                                                    "<RESPONSEMESSAGE>YOUR SESSION TIMEOUT. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                    "</SERVICERESPONSE>");
                    }
                    else
                    {
                        filterContext.Result = new RedirectResult("~/Login/Login");
                        return;
                    }
                }
            }

            base.OnActionExecuting(filterContext);
        }
    }

    public class VendorAuthorizeUserAttribute : AuthorizeAttribute
    {
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            string controller = string.Empty;
            string action = string.Empty;

            // Getting controller, action name from request URL
            FormPermissionHelper.GetControllerAction(httpContext, ref controller, ref action);

            if (SessionFacade.UserSession == null)
            {
                if (DefaultAccessMethodlist.CheckIsBeforeLoginAccess(controller, action) == true)
                    return true;
                else
                    return false;
            }
            else
            {
                return true;
            }
        }
        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                if (SessionFacade.UserSession == null)
                {
                    filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                "<RESPONSECODE>-405</RESPONSECODE>" +
                                                                "<RESPONSEMESSAGE>YOUR APPLICATION SESSION TIMEOUT. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                "</SERVICERESPONSE>");
                }
                else
                {
                    filterContext.Result = new FormPermissionHelper.JsonStringResult("<SERVICERESPONSE>" +
                                                                "<RESPONSECODE>-401</RESPONSECODE>" +
                                                                "<RESPONSEMESSAGE>APPLICATION UNAUTHORIZED ACCESS. PLEASE RE-LOGIN.</RESPONSEMESSAGE>" +
                                                                "</SERVICERESPONSE>");
                }
            }
            else
            {
                filterContext.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Login", action = "Login" }));
            }
        }

    }

}