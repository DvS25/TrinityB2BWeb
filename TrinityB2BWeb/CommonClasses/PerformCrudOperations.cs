using TrinityB2BWeb.ServiceReference1;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Collections.Specialized;

namespace TrinityB2BWeb.CommonClasses
{
    public class PerformCrudOperations
    {
        public string PerformOpeartions(NameValueCollection forms, string MainXmlNodeName, string ServiceName)
        {
            string ResponseXml = string.Empty;
            GenerateXml xmlstring = new GenerateXml();
            string RequestXml = xmlstring.GenerateXmlString(forms, MainXmlNodeName, ServiceName);

            ContactBook_InterfaceClient proxy = new ContactBook_InterfaceClient();
            ResponseXml = proxy.PERFORM_ACTIONS(RequestXml);
            return ResponseXml;
        }
    }
}