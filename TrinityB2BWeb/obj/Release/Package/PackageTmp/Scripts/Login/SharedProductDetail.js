var SharedProductDetail = {
    variables: {
    },

    Bindproductdetaildata: function () {

        var myfilter, url;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "STOCKTYPE", op: "eq", data: $("#hideStocktype").val() });
        myfilter.rules.push({ field: "DESIGNNO", op: "eq", data: $("#hidedesignno").val() });
        url = "/Common/BindMastersDetails?ServiceName=APP_CATEGORY_SHARED_DESIGN_DETAIL_GET&ColumnRequested=ALL&sord=asc&sidx=DESIGNNO&myfilters=" + JSON.stringify(myfilter);
        $.ajax({
            url: getDomain() + url,
            async: false,
            cache: false,
            type: 'POST',
            beforeSend: function () {
                $(".loadingtrinity").show();
            },
            success: function (data) {
                SharedProductDetail.clearvalue();
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#subcategoryname").html(JsonObject.serviceresponse.detailslist.details.category);
                        $("#productimagecontent").append($("#Dataproductdetail").render(JsonObject.serviceresponse.detailslist.details));
                        $("#topdatabind").append($("#Datatoplength").render(JsonObject.serviceresponse.detailslist.details));

                        $(".rateyo").each(function () {
                            var id = $(this).attr('id');
                            var Rowid = id.split("rating");
                            var total = $("#star" + Rowid[1]).val();
                            $("#" + id).rateYo({
                                readOnly: true,
                                rating: total,
                                numStars: 5,
                                precision: 2,
                                minValue: 1,
                                maxValue: 5,
                                starWidth: "20px",
                                spacing: "3px",
                                normalFill: "#A0A0A0",
                                ratedFill: "#F39C12 ",
                                halfStar: true
                            });
                        });

                    }
                    if (JsonObject.serviceresponse.detailslist.details.golddetail != undefined) {
                        $("#golddetails").append($("#Datagolddetails").render(JsonObject.serviceresponse.detailslist.details.golddetail.golden));
                        $("#netweight").html((JsonObject.serviceresponse.detailslist.details.golddetail.golden.goldweight) + " gm");
                        $("#headergoldpurity").html((JsonObject.serviceresponse.detailslist.details.golddetail.golden.goldpurity) + " " + (JsonObject.serviceresponse.detailslist.details.golddetail.golden.metaltype))
                    }
                    if (JsonObject.serviceresponse.detailslist.details.diamonddetail != undefined) {
                        $("#diamonddetails").append($("#Datadiamonddetails").render(JsonObject.serviceresponse.detailslist.details.diamonddetail.diamond));
                    }
                    if (JsonObject.serviceresponse.detailslist.details.colorstonedetail != undefined) {
                        $("#colorstonelable").show();
                        $("#colostonedetails").append($("#Datacolostonedetails").render(JsonObject.serviceresponse.detailslist.details.colorstonedetail.colorstone));
                        $("#colostonewight").html((JsonObject.serviceresponse.detailslist.details.colorstonedetail.colorstone.stoneweight) + " cts")
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            complete: function () {
                $(".loadingtrinity").hide();
            },
            error: OnError
        });
    },

    clearvalue: function () {
        $("#productimagecontent").html("");
        $("#topdatabind").html("");
        $("#makincharges").html("");
        $("#pricebreakup").html("");
        $("#golddetails").html("");
        $("#netweight").html("");
        $("#headergoldpurity").html("");
        $("#diamonddetails").html("");
        $("#colostonedetails").html("");
        $("#colostonewight").html("");
        $("#related_product").html("");
        $("#divrelatedproduct").hide();
    },

    multipledesign: function () {
        var myfilter;
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "DESINGCODE", op: "eq", data: $("#hidedesignno").val() });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_DESIGN_FILES_GET&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#additional-images").html($("#Datadesignimage").render(JsonObject.serviceresponse.detailslist.details));
                        if (JsonObject.serviceresponse.detailslist.details.length > 1) {
                            $("#additional-images").owlCarousel({
                                navigation: true,
                                pagination: false,
                                navigationText: [
                                    "<i class='fa fa-angle-left'></i>",
                                    "<i class='fa fa-angle-right'></i>"
                                ],
                                items: 4,
                                itemsDesktop: [1199, 3],
                                itemsDesktopSmall: [979, 3],
                                itemsTablet: [992, 3],
                                itemsMobile: [767, 4],
                                itemsMobileSmall: [480, 3],
                            });
                        }
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });

    },

}
var z_index = 0;

function thumbnailclick() {
    $('.thumbnails').magnificPopup('open', 0);
    return false;
}

function imageadditionalouter(thiscal) {
    var smallImage = $(thiscal).attr('data-image');
    var largeImage = $(thiscal).attr('data-zoom-image');
    var ez = $('#atzoom').data('elevateZoom');
    $('.zoom-box .thumbnail').attr('data-image', largeImage);
    $(".zoom-box #atzoom").attr("src", smallImage);
    $(".zoom-box #atzoom").attr("data-zoom-image", smallImage);
    $("#atzoom").attr("data-zoom-image", largeImage);
    $("#setcaroselimage").attr("href", largeImage);
    ez.swaptheimage(smallImage, largeImage);
    z_index = $(thiscal).index('.image_additional_outer a') + 0;
    $('.thumbnails').magnificPopup('close', 1);
    return false;
}

$(document).ready(function () {
    SharedProductDetail.Bindproductdetaildata();
    SharedProductDetail.multipledesign();

    $("#atzoom").elevateZoom({
        gallery: "additional-images",
        galleryActiveClass: "active",
        zoomWindowWidth: 620,
        zoomWindowHeight: 515,

    });
    $('.thumbnails').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-with-zoom',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
    });

});