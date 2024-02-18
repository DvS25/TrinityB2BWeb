using System.Web;
using System.Web.Optimization;

namespace TrinityB2BWeb
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Content/plugin/jquery/jquery-2.1.1.min.js",
                         //"~/Content/plugin/jquery/jquery-ui.min.js",
                        "~/Content/plugin/bootstrap/js/bootstrap.min.js",
                        "~/Content/plugin/owl-carousel/owl.carousel.min.js",
                        "~/Content/js/jquery.validate.min.js",
                        "~/Content/js/jquery.custom.min.js",
                        "~/Content/js/custom.js",
                        "~/Content/plugin/JSRender/jsrender.min.js",
                        "~/Content/plugin/JSRender/Xml2Json.js",
                        "~/Content/admin/so_page_builder/js/shortcodes.js",
                        "~/Content/admin/so_page_builder/js/owl.carousel.js",
                        "~/Content/admin/so_page_builder/js/magnific-popup.js",
                        "~/Content/catalog/so_page_builder/js/modernizr.video.js",
                        "~/Content/catalog/so_page_builder/js/video_background.js",
                        "~/Content/catalog/so_page_builder/js/swfobject.js",
                        "~/Content/catalog/so_page_builder/js/section.js",
                        "~/Content/catalog/so_megamenu/so_megamenu.js",
                         "~/Content/plugin/overhang/overhang.min.js",
                        //"~/Content/plugin/NewToster/toastify.js",
                        "~/Content/plugin/RatingStar/jquery.rateyo.min.js",
                        "~/Content/plugin/Toster/toastr.min.js",
                        "~/Scripts/Common/Common.js",
                        "~/Content/plugin/Select2/js/select2.min.js"
                        //"~/Content/plugin/range-slider/range-slider1.js",
                        //"~/Content/plugin/range-slider/range-slider2.js",
                        //"~/Content/plugin/range-slider/range-slider3.js"

                        ));
            

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/plugin/bootstrap/css/bootstrap.min.css",
                      "~/Content/plugin/owl-carousel/owl.transitions.css",
                      "~/Content/plugin/owl-carousel/owl.carousel.css",
                      "~/Content/plugin/font-awesome/css/font-awesome.min.css",
                      "~/Content/css/atstyle.css",
                      "~/Content/css/custom.css",
                      "~/Content/admin/so_page_builder/css/shortcodes.css",
                      "~/Content/admin/so_page_builder/css/carousel.css",
                      "~/Content/admin/so_page_builder/css/magnific-popup.css",
                      "~/Content/admin/so_page_builder/css/owl.carousel.css",
                      "~/Content/catalog/so_page_builder/css/style_render_61.css",
                      "~/Content/catalog/so_page_builder/css/style.css",
                      "~/Content/catalog/so_megamenu/wide-grid.css",
                      "~/Content/catalog/so_megamenu/so_megamenu.css",
                      "~/Content/plugin/overhang/overhang.min.css",
                      "~/Content/plugin/RatingStar/jquery.rateyo.min.css",
                      //"~/Content/plugin/NewToster/toastify.css",
                      "~/Content/plugin/Toster/toastr.min.css",
                      //"~/Content/plugin/range-slider/range-slider.css",
                      "~/Content/css/theme.css",
                      "~/Content/css/animate.css",
                      "~/Content/plugin/Select2/css/select2.min.css"
                        ));


            BundleTable.EnableOptimizations = false;
        }
    }
}
