using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TrinityB2BWeb.Filters
{
    public class DefaultAccessMethodlist
    {
        static Dictionary<string, bool> Allowlist;
        static Dictionary<string, bool> BeforeLoginMenulist;

        static DefaultAccessMethodlist()
        {
            Allowlist = new Dictionary<string, bool>();
            Allowlist.Add("login_index", true);
            Allowlist.Add("login_aboutus", true);
            Allowlist.Add("login_contactus", true);
            Allowlist.Add("login_login", true);
            Allowlist.Add("login_dologin", true);
            Allowlist.Add("login_logout", true);
            Allowlist.Add("login_company", true);
            Allowlist.Add("login_privacypolicy", true);
            Allowlist.Add("login_dowloadapp", true);
            Allowlist.Add("login_factoryoutlet", true);
            Allowlist.Add("login_sitemap", true);
            Allowlist.Add("login_login_out", true);
            Allowlist.Add("home_index", true);
            Allowlist.Add("home_about", true);
            Allowlist.Add("home_contact", true);
            Allowlist.Add("common_testemail", true);
            Allowlist.Add("common_saveimage", true);
            Allowlist.Add("common_bindmastersdetails", true);
            Allowlist.Add("common_opeartionsonmaster", true);
            Allowlist.Add("product_customizedetail", true);
        }

        public static bool CheckIsDefaultAccess(string controller, string action)
        {
            try
            {
                bool IsAllow = false;

                Allowlist.TryGetValue((controller + '_' + action).ToLower(), out IsAllow);
                return IsAllow;
            }
            catch
            {
                return false;
            }
        }

        public static bool CheckIsBeforeLoginAccess(string controller, string action)
        {
            try
            {
                bool IsAllow = false;

                BeforeLoginMenulist.TryGetValue((controller + '_' + action).ToLower(), out IsAllow);
                return IsAllow;
            }
            catch
            {
                return false;
            }
        }
    }
}