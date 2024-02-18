var Masterproductlistview = {
    Bindwishlist: function () {

        $(".loadingtrinity").show();
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=WISHLIST_GET",
            async: true,
            cache: false,
            type: 'POST',
            success: function (data) {
                $("#wishlistdata").html("");
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.totalrecords > 0) {
                        $("#wishlistdata").show();
                        $("#emptywishlist").hide();
                        if (JsonObject.serviceresponse.detailslist != undefined) {
                            $("#wishlistdata").append($("#Databindwishlist").render(JsonObject.serviceresponse.detailslist.details));
                            $(".indianprice").each(function () {
                                var id = $(this).attr('id');
                                var Rowid = id.split("indianprice");
                                var totalp = $("#ipr" + Rowid[1]).val();
                                var convertint = parseFloat(totalp).toLocaleString(getDisplayLanguage(), {
                                    style: 'currency', currency: getCurrencyCode(),
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                });
                                $("#" + id).html(convertint);
                            });
                        }
                    }
                    else {
                        $("#wishlistdata").hide();
                        $("#emptywishlist").show();
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
    },
}
function daletetowishlist(id) {
    var data = {
        "DATAFROM": "WishList",
        "ISPHYSICALSTOCK": $("#stock" + id).val(),
        "DESIGNCODE": $("#designno" + id).html(),
    }
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SHOPPINGCART_CRUD",
        data: data,
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                $("#" + id).remove();
                OperationMessage("", "Product is Delete from wishlist successfully", "success");
                CartWishlistCount();
                Masterproductlistview.Bindwishlist();
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError,
    });
}
function showproductdetail(id, wsid) {
    var stock;
    if ($("#stock" + wsid).val() == "0")
    {
        stock = "Virtual";
    }
    else {
        stock = "Physical";
    }
    window.location.href = getDomain() + "/Product/ProductDetail?id=" + id + "&stocktype=" + stock;
}
function addtocartfromwishlist(id) {
    var data = {
        "oper":"add",
        "DATAFROM": "Cart",
        "ISPHYSICALSTOCK": $("#stock" + id).val(),
        "DESIGNCODE": $("#designno" + id).html(),
        "ISCUSTOMIZE": "0",
        "ISTOADDFROMWISHLIST": "1",
        "QUANTITY":"1"
    }
    $.ajax({
        url: getDomain() + "/Common/OpeartionsOnMaster?ServiceName=SHOPPINGCART_CRUD",
        data: data,
        async: true,
        cache: false,
        type: 'POST',
        success: function (data) {
            if ($(data).find('RESPONSECODE').text() == "0") {
                $("#" + id).remove();
                OperationMessage("", "Product is add to cart successfully", "success");
                CartWishlistCount();
            }
            else {
                InvalidResponseCode(data);
            }
        },
        error: OnError,
    });
}
$(document).ready(function () {
    Masterproductlistview.Bindwishlist();
});