using System;
using TrinityB2BWeb.CommonClasses;
using System.Linq;
using TrinityB2BWeb.ServiceReference1;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.IO.Compression;
using System.Xml;
using System.IO;
using System.Text;
using System.Security.Cryptography;

namespace TrinityB2BWeb.Controllers
{
    public class CommonController : Controller
    {
        public string BindMastersDetails()
        {
            try
            {
                string XMLValue = string.Empty;
                CommonGridParams parms = new CommonGridParams();
                parms.PageIndex = Convert.ToString(Request.QueryString["page"]);
                parms.PageSize = Convert.ToString(Request.QueryString["rows"]);
                parms.SortColumn = Convert.ToString(Request.QueryString["sidx"]);
                parms.SortOrder = Convert.ToString(Request.QueryString["sord"]);
                parms.ColumnRequested = Request.QueryString["ColumnRequested"];
                parms.ServiceName = Request.QueryString["ServiceName"];
                parms.Countrydropdown = Request.QueryString["Contrydropdown"];

                if (Request.Form["XMLPARAM"] != null)
                    parms.XmlParam = Request.Form["XMLPARAM"];

                if (Request.QueryString["IsRecordAll"] != null && Request.QueryString["IsRecordAll"] != "")
                {
                    parms.IsRecordAll = Convert.ToString(Request.QueryString["IsRecordAll"]);
                }

                if (Request.QueryString["IsActive"] != null && Request.QueryString["IsActive"] != "")
                {
                    parms.IsActive = Convert.ToString(Request.QueryString["IsActive"]);
                }

                if (Request.QueryString["_search"] != null && Request.QueryString["_search"] != "")
                {
                    bool search = Convert.ToBoolean(Request.QueryString["_search"].ToString());
                    if (search == true)
                    {
                        if (Request.QueryString["searchString"] != null)
                        {
                            string searchString = Request.QueryString["searchString"].ToString();
                            searchString = searchString.Replace("<", "&lt;");
                            searchString = searchString.Replace("&", "&amp;");
                            parms.SearchKeyword = searchString;
                        }

                        if (Request.QueryString["searchField"] != null)
                            parms.SearchColumn = Request.QueryString["searchField"].ToString();

                        if (Request.QueryString["searchOper"] != null)
                            parms.SearchOper = Request.QueryString["searchOper"].ToString();

                        if (Request.QueryString["filters"] != null)
                            parms.Filters = Request.QueryString["filters"].ToString();
                    }
                }


                if (Request.QueryString["_gridsearch"] != null && Request.QueryString["_gridsearch"] != "")
                {
                    bool search = Convert.ToBoolean(Request.QueryString["_gridsearch"].ToString());
                    if (search == true)
                    {
                        if (Request.QueryString["searchString"] != null)
                            parms.SearchKeyword = Request.QueryString["searchString"].ToString();

                        if (Request.QueryString["searchField"] != null)
                            parms.SearchColumn = Request.QueryString["searchField"].ToString();

                        if (Request.QueryString["searchOper"] != null)
                            parms.SearchOper = Request.QueryString["searchOper"].ToString();

                        if (Request.QueryString["filters"] != null)
                            parms.Filters = Request.QueryString["filters"].ToString();
                    }
                }

                if (Request.QueryString["myfilters"] != null)
                    parms.MyFilters = Request.QueryString["myfilters"].ToString();

                GenerateXml xmlGenerator = new GenerateXml();
                string ChildNodes = xmlGenerator.GenerateCommonRequestNodes(parms);
                string RequestNodes = xmlGenerator.FinalXml("SERVICEREQUEST", ChildNodes);

                ContactBook_InterfaceClient client = new ContactBook_InterfaceClient();
                XMLValue = client.PERFORM_ACTIONS(RequestNodes);
                client.Close();
                return XMLValue;
            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        [HttpPost]
        [ValidateInput(false)]
        public string OpeartionsOnMaster(string ServiceName)
        {
            try
            {
                string XMLValue = string.Empty;

                System.Collections.Specialized.NameValueCollection forms = new System.Collections.Specialized.NameValueCollection();

                forms.Add(Request.Unvalidated.Form);

                PerformCrudOperations performOper = new PerformCrudOperations();
                XMLValue = performOper.PerformOpeartions(forms, "SERVICEREQUEST", ServiceName);

                return XMLValue;
            }
            catch (Exception ex)
            {
                return GenerateXml.GetExceptionXMLResponse(ex);
            }
        }

        public JsonResult SaveImage(string category, string deletedfiles, string savefiles)
        {
            try
            {
                string VirtualDirectory = System.Configuration.ConfigurationManager.AppSettings["domainPath"];

                if (VirtualDirectory != "")
                {
                    if (!string.IsNullOrEmpty(deletedfiles))
                    { deletedfiles = deletedfiles.Replace(VirtualDirectory, ""); }

                    if (!string.IsNullOrEmpty(savefiles))
                    { savefiles = savefiles.Replace(VirtualDirectory, ""); }
                }

                // delete files from directory
                if (deletedfiles != string.Empty)
                {
                    string[] deletedfilesArr = deletedfiles.Split(',');
                    if (deletedfilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < deletedfilesArr.Length; i++)
                        {
                            if (deletedfilesArr[i] != string.Empty)
                            {
                                if (deletedfilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                    if (System.IO.File.Exists(deleteFilePath))
                                        System.IO.File.Delete(deleteFilePath);
                                }
                                string destFile = "~/UploadFiles/" + "/" + category + "/";
                                string destServerpath = Server.MapPath(destFile + deletedfilesArr[i]);
                                //string deleteFilePath = Server.MapPath("~" + deletedfilesArr[i]);
                                if (System.IO.File.Exists(destServerpath))
                                    System.IO.File.Delete(destServerpath);
                            }
                        }
                    }
                }

                if (savefiles != string.Empty)
                {
                    string destFile = "~/UploadFiles/" + "/" + category + "/";
                    string destServerpath = Server.MapPath(destFile);

                    if (!System.IO.Directory.Exists(destServerpath))
                        System.IO.Directory.CreateDirectory(destServerpath);

                    // Save file to Original folder
                    string[] savefilesArr = savefiles.Split(',');
                    string savefilePath;
                    if (savefilesArr.Length > 0)
                    {
                        int i = 0;
                        for (; i < savefilesArr.Length; i++)
                        {
                            if (savefilesArr[i] != string.Empty)
                            {
                                if (savefilesArr[i].Contains("/UploadFiles/Temp/"))
                                {
                                    savefilePath = Server.MapPath("~" + savefilesArr[i]);
                                    if (System.IO.File.Exists(savefilePath))
                                    {
                                        if (System.IO.File.Exists(destServerpath + System.IO.Path.GetFileName(savefilesArr[i])) == false)
                                            System.IO.File.Copy(savefilePath, destServerpath + System.IO.Path.GetFileName(savefilesArr[i]));

                                        System.IO.File.Delete(savefilePath);
                                    }
                                }
                            }
                        }
                    }
                    return Json("success", JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json("", JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json("error: " + ex.Message, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost, ValidateInput(false)]
        public static string Encrypt(string clearText)
        {
            string EncryptionKey = "Trinity";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }
        [HttpPost, ValidateInput(false)]
        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "Trinity";
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }
    }
}