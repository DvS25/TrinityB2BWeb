using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrinityB2BWeb.Filters;
using TrinityB2BWeb.CommonClasses;
using TrinityB2BWeb.Models;

namespace TrinityB2BWeb.Controllers
{
    [SessionExpireFilterAttribute]
    [AuthorizeUserAttribute]
    public class ProfileController : Controller
    {
        // GET: Profile
        public ActionResult MyProfile()
        {
            try
            {
                SessionFacade.CartSession = null;
                return View();
            }
            catch (Exception e)
            {
                return RedirectToAction("LogOut", "Login", new { Msg = "" });
            }
        }
        
    }
}