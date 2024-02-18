using System;
using System.Web;
using System.Collections.Specialized;
using System.Xml;
using System.Text;
using System.Web.Script.Serialization;

namespace TrinityB2BWeb.CommonClasses
{
    public class GenerateXml
    {
        public string GenerateXmlString(NameValueCollection forms, string MainRequestNode, string ServiceName)
        {
            string XMLRequestString = string.Empty;

            StringBuilder XmlChildNodes = new StringBuilder("");

            foreach (string key in forms)
            {
                XmlChildNodes.Append(GenerateNode(key, forms[key]));
            }

            if (ServiceName != "")
            {
                XmlChildNodes.Append(GenerateNode("SERVICENAME", ServiceName));
            }

            XMLRequestString = FinalXml(MainRequestNode, XmlChildNodes.ToString());
            return XMLRequestString;
        }

        // By  give EMPID and SECUREKEY from session.
        public string GetEmpSecurekeyXml()
        {
            if (SessionFacade.UserSession != null)
            {
                return "<LOGINID>" + SessionFacade.UserSession.USERID + "</LOGINID>" +
                        "<USERTYPE>" + SessionFacade.UserSession.USERTYPE + "</USERTYPE>" +
                        "<SECUREKEY>" + SessionFacade.UserSession.TOKEN + "</SECUREKEY>" +
                        "<USERCOUNTRYID>" + SessionFacade.UserSession.COUNTRYID + "</USERCOUNTRYID>" +
                        "<CALLFROM>B2BWeb</CALLFROM>";
            }
            else
            {
                return "";
            }
        }

        private string GenerateNode(string key, string value)
        {
            if (key == "XMLPARAM")
                return HttpUtility.UrlDecode(value);
            else
                return "<" + key + "><![CDATA[" + value + "]]></" + key + ">";
        }

        public string FinalXml(string MainNode, string childNodes)
        {
            return "<" + MainNode + ">" + GetEmpSecurekeyXml() + childNodes + "</" + MainNode + ">";
        }

        public string GenerateCommonRequestNodes(CommonGridParams commonparams)
        {
            StringBuilder RequstXml = new StringBuilder("");

            if (commonparams.ServiceName != null)
            {
                RequstXml.Append("<SERVICENAME>" + commonparams.ServiceName + "</SERVICENAME>");
            }
            if (commonparams.Mid != null)
            {
                RequstXml.Append("<MID>" + commonparams.Mid + "</MID>");
            }
            if (commonparams.PageIndex != null)
            {
                RequstXml.Append("<PAGEINDEX>" + commonparams.PageIndex + "</PAGEINDEX>");
            }

            if (commonparams.PageSize != null)
            {
                RequstXml.Append("<PAGECOUNT>" + commonparams.PageSize + "</PAGECOUNT>");
            }

            if (commonparams.SortColumn != null)
            {
                RequstXml.Append("<SORTCOLUMN>" + commonparams.SortColumn + "</SORTCOLUMN>");
            }

            if (commonparams.SortOrder != null)
            {
                RequstXml.Append("<SORTORDER>" + commonparams.SortOrder + "</SORTORDER>");
            }

            if (commonparams.SearchOper != null)
            {
                RequstXml.Append("<SEARCHOPERATION>" + commonparams.SearchOper + "</SEARCHOPERATION>");
            }

            if (commonparams.SearchColumn != null)
            {
                RequstXml.Append("<SEARCHCOLUMN>" + commonparams.SearchColumn + "</SEARCHCOLUMN>");
            }

            if (commonparams.SearchKeyword != null)
            {
                RequstXml.Append("<SEARCHKEYWORD>" + commonparams.SearchKeyword + "</SEARCHKEYWORD>");
            }
            if (commonparams.IsRecordAll != null)
            {
                RequstXml.Append("<ISRECORDALL>true</ISRECORDALL>");
            }
            if (commonparams.IsActive != null)
            {
                RequstXml.Append("<ISACTIVE>" + commonparams.IsActive + "</ISACTIVE>");
            }
            if (commonparams.ColumnRequested != null)
            {
                RequstXml.Append("<COLUMNREQUESTED>" + commonparams.ColumnRequested + "</COLUMNREQUESTED>");
            }
            if(commonparams.Countrydropdown != null)
            {
                RequstXml.Append("<CONTRYSTATECITY>" + commonparams.Countrydropdown + "</CONTRYSTATECITY>");
            }
            if (commonparams.Filters != null)
            {
                if (commonparams.Filters != "")
                {
                    RequstXml.Append(GetFilterXMLString(commonparams.Filters));
                }
            }

            if (commonparams.MyFilters != null)
            {
                if (commonparams.MyFilters != "")
                {
                    RequstXml.Append(GetFilterXMLString(commonparams.MyFilters));
                }
            }

            return RequstXml.ToString();
        }

        public string AddAdditionalNodesToXmlString(string currentXml, string AdditionalNodes)
        {
            string NodeAddedXml = string.Empty;
            XmlDocument xdoc = new XmlDocument();
            xdoc.LoadXml(currentXml);
            XmlDocumentFragment xfrag = xdoc.CreateDocumentFragment();
            xfrag.InnerXml = AdditionalNodes;
            xdoc.DocumentElement.AppendChild(xfrag);
            NodeAddedXml = xdoc.InnerXml.ToString();
            return NodeAddedXml;
        }

        //T GetObject<T>(Dictionary<string, object> dict)
        //{
        //    Type type = typeof(T);
        //    var obj = Activator.CreateInstance(type);

        //    foreach (var kv in dict)
        //    {
        //        type.GetProperty(kv.Key).SetValue(obj, kv.Value);
        //    }
        //    return (T)obj;
        //}

        public string GetFilterXMLString(string filters)
        {
            //Eg.	{"groupOp":"AND","rules":[{"field":"a.id","op":"eq","data":"3"},{"field":"b.name","op":"eq","data":"qwqw"}]}

            StringBuilder filterxml = new StringBuilder("");
            string nodename = string.Empty;

            JavaScriptSerializer json_serializer = new JavaScriptSerializer();
            JqGridFilter filterlist = json_serializer.Deserialize<JqGridFilter>(filters);

            filterxml.Append("<GROUPON>" + filterlist.groupOp.ToString() + "</GROUPON>");

            foreach (JqGridRule rules in filterlist.rules)
            {
                nodename = "WHERE_" + rules.op.ToString().ToUpper() + "_" + rules.field;
                filterxml.Append("<" + nodename + ">" + rules.data + "</" + nodename + ">");
            }

            return filterxml.ToString();
        }

        public static string GetExceptionXMLResponse(Exception ex)
        {

            return "<SERVICERESPONSE>" +
                    "<RESPONSECODE>-500</RESPONSECODE>" +
                    "<RESPONSEMESSAGE>" +
                        "[Message]: " + ex.Message +
                        "[Source]: " + ex.Source +
                        "[StackTrace]: " + ex.StackTrace +
                    "</RESPONSEMESSAGE>" +
                    "</SERVICERESPONSE>";
        }

    }
}