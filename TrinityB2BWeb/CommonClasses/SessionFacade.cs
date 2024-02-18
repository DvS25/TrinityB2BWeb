using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrinityB2BWeb.Models;

namespace TrinityB2BWeb.CommonClasses
{
    public class SessionFacade
    {
        private const string UserDetails = "UserDetails";
        private const string LogoutInMsg = "LogoutInMsg";
        private const string CartDetails = "CartDetails";
        private const string MenuStr = "MenuStr";
        private const string CategoryListstr = "CategoryListstr";


        public static UserDetails UserSession
        {
            get
            {
                return (UserDetails)HttpContext.Current.Session[UserDetails];
            }
            set
            {
                HttpContext.Current.Session[UserDetails] = value;
            }
        }
        public static LogoutInMsg LogoutInSession
        {
            get
            {
                return (LogoutInMsg)HttpContext.Current.Session[LogoutInMsg];
            }
            set
            {
                HttpContext.Current.Session[LogoutInMsg] = value;
            }
        }
        public static CartDetails CartSession
        {
            get
            {
                return (CartDetails)HttpContext.Current.Session[CartDetails];
            }
            set
            {
                HttpContext.Current.Session[CartDetails] = value;
            }
        }
        public static string MenuListstr
        {
            get
            {
                return (string)HttpContext.Current.Session[MenuStr];
            }
            set
            {
                HttpContext.Current.Session[MenuStr] = value;
            }
        }
        public static Dictionary<Tuple<string, string>, List<Product>> CategoryList
        {
            get
            {
                return (Dictionary<Tuple<string, string>, List<Product>>)HttpContext.Current.Session[CategoryListstr];
            }
            set
            {
                HttpContext.Current.Session[CategoryListstr] = value;
            }
        }

    }
}