using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrinityB2BWeb.CommonClasses;
using TrinityB2BWeb.Filters;

namespace TrinityB2BWeb.Controllers
{
    [SessionExpireFilterAttribute]
    public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
            try
            {
                //ViewBag.Isview = SessionFacade.UserSession.ISVIEW;
                return View();
            }
            catch (Exception e)
            {
                return RedirectToAction("LogOut", "Login", new { Msg = "" });
            }
        }
        public ActionResult FeedBack()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                return RedirectToAction("LogOut", "Login", new { Msg = "" });
            }
        }
        public ActionResult SiteMap()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                return RedirectToAction("LogOut", "Login", new { Msg = "" });
            }
        }
        public ActionResult Outlet()
        {
            try
            {
                return View();
            }
            catch (Exception e)
            {
                return RedirectToAction("LogOut", "Login", new { Msg = "" });
            }
        }

    }
}