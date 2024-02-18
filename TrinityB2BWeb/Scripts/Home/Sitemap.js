function BindSitemap(){
    $(".loadingtrinity").show();
    $.ajax({
        url: getDomain() + "/Common/BindMastersDetails?ServiceName=SITEMAP_GET",
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            $("#bindsitemap").html("");
            if ($(data).find('RESPONSECODE').text() == "0") {
                var JsonObject = xml2json.parser(data);
                if (JsonObject.serviceresponse.menulist != undefined) {
                    for (x in JsonObject.serviceresponse.menulist.menudetail) {
                        $('#bindsitemap').append('<div class="col-sm-3" id="bindinsidesitemap' + [x] + '"><p id="mainmenuname' + [x] + '" class="sitemainmenu">' + JsonObject.serviceresponse.menulist.menudetail[x].mainmenuname + '</p></div>');
                        if ($("#mainmenuname" + [x]).html() != "COLLECTIONS")
                        {
                            $("#bindinsidesitemap" + [x]).append($("#Databindsitemap").render(JsonObject.serviceresponse.menulist.menudetail[x]));
                        }
                        else {
                            $("#bindinsidesitemap" + [x]).append($("#Databindcollections").render(JsonObject.serviceresponse.menulist.menudetail[x]));
                            $("#bindinsidesitemap" + [x]).append('<div class="defaultmenusite"><ul><li><a href="' + getDomain() + '/Home/Index">Home</a></li><li><a href="' + getDomain() + '/Product/WishList">WishList</a></li><li><a href="' + getDomain() + '/Product/CartList">Cart Details</a></li><li><a href="' + getDomain() + '/Profile/MyProfile">My Profile</a></li><li><a href="' + getDomain() + '/Home/FeedBack">FeedBack</a></li><li><a href="' + getDomain() + '/Home/Outlet">Outlet</a></li></ul><div>')
                        }
                        
                    }
                }
               
                $(".loadingtrinity").hide();
            }
            else {
                $(".loadingtrinity").hide();
                InvalidResponseCode(data);
            }
        },
        error: OnError,
    });
}
function Collectionclick(id) {
    var collectionkeyword, collectionsubcategory, designrange;
    collectionkeyword = $("#inputcoltkeyword" + id).val();
    collectionsubcategory = $("#inputcoltsub" + id).val();
    designrange = $("#inputcoltdesign" + id).val();
    window.location.assign(getDomain() + "/Product/ProductList?category=" + collectionsubcategory + "&type=collection&searchkeyword=" + collectionkeyword + "&designno=" + designrange);
}
$(document).ready(function () {
    BindSitemap();
});