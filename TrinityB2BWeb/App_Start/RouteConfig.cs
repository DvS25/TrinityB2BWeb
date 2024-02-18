using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace TrinityB2BWeb
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //routes.MapRoute(
            //    "Default1",
            //    "Home",
            //     new { controller = "Login", action = "Index", id = UrlParameter.Optional }
            //);
          
            routes.MapRoute(
                "Aboutus",
                "About-us",
                new { controller = "Login", action = "Aboutus", id = UrlParameter.Optional }
             );
            routes.MapRoute(
                "Contactus",
                "Contact-us",
                 new { controller = "Login", action = "Contactus", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                "Company",
                "Company",
                new { controller = "Login", action = "Company", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                "PrivacyPolicy",
                "Privacy-Policy",
                new { controller = "Login", action = "PrivacyPolicy", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               "DowloadApp",
               "Dowload-App",
               new { controller = "Login", action = "DowloadApp", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               "FactoryOutlet",
               "Factory-Outlet",
               new { controller = "Login", action = "FactoryOutlet", id = UrlParameter.Optional }
            );
            routes.MapRoute(
              "Sitemap",
              "SiteMap",
              new { controller = "Login", action = "Sitemap", id = UrlParameter.Optional }
           );
            routes.MapRoute(
             "QuotationView",
             "QuotationView",
             new { controller = "Login", action = "QuotationView", id = UrlParameter.Optional }
            );
            routes.MapRoute(
              "TermsCondition",
              "Terms-Condition",
              new { controller = "Login", action = "TermsCondition", id = UrlParameter.Optional }
           );
            routes.MapRoute(
               "Login",
               "Login",
               new { controller = "Login", action = "Login", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               "LogOut",
               "LogOut",
               new { controller = "Login", action = "LogOut", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}
