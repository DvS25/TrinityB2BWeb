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
    public class ProductController : Controller
    {
       
        public ActionResult ProductList(string category,string type,string searchkeyword,string designno)
        {
            try
            {
                ViewBag.Subcategoryname = category;
                ViewBag.CategoryType = type;
                ViewBag.Collectionkeyword = searchkeyword;
                ViewBag.Collectiondesignno = designno;
                SessionFacade.CartSession = null;
                return View();
            }
            catch (Exception e)
            {
                return RedirectToAction("LogOut", "Login", new { Msg = "" });
            }
        }
        public ActionResult ProductDetail(string id,string stocktype)
        {
            try
            {
                ViewBag.Designno = id;
                ViewBag.EncryptedDesignno = CommonController.Encrypt(id);
                ViewBag.Stocktype = stocktype;
                if(SessionFacade.CartSession != null)
                {
                    ViewBag.ISCUSTOMIZE = SessionFacade.CartSession.ISCUSTOMIZE;
                    ViewBag.GPURITY = SessionFacade.CartSession.GPURITY;
                    ViewBag.GCOLOR = SessionFacade.CartSession.GCOLOR;
                    ViewBag.DPURITY = SessionFacade.CartSession.DPURITY;
                    ViewBag.DCOLOR = SessionFacade.CartSession.DCOLOR;
                    ViewBag.DSIZE = SessionFacade.CartSession.DSIZE;
                    ViewBag.CUSTUMIZENOTES = SessionFacade.CartSession.CUSTUMIZENOTES;
                    ViewBag.CARTID = SessionFacade.CartSession.CARTID; 
                    ViewBag.CARTTOPRODUCT = SessionFacade.CartSession.CARTTOPRODUCT;
                }

                SessionFacade.CartSession = null;
                return View();
            }
            catch (Exception e)
            {
                return RedirectToAction("LogOut", "Login", new { Msg = "" });
            }
        }
        public ActionResult CartList()
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
        public ActionResult WishList()
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

        [HttpPost, ValidateInput(false)]
        public string  Customizedetail(string Gcolor, string Gpurity, string Dcolor, string Dpurity, string Dsize, string Customizenotes,string Iscustomize,string Cartid)
        {
            CartDetails Customizedetails = new CartDetails();

            Customizedetails.GPURITY = Gcolor;
            Customizedetails.GCOLOR = Gpurity;
            Customizedetails.DPURITY = Dcolor;
            Customizedetails.DCOLOR = Dpurity;
            Customizedetails.DSIZE = Dsize;
            Customizedetails.CUSTUMIZENOTES = Customizenotes;
            Customizedetails.ISCUSTOMIZE = Iscustomize;
            Customizedetails.CARTID = Cartid;
            Customizedetails.CARTTOPRODUCT = "1";

            SessionFacade.CartSession = Customizedetails;
            return "success";
        }
    }
}