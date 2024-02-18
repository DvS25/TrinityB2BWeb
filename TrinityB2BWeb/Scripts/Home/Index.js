var MainPageview = {
    womanscollection: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=APP_WOMAN_COLLECTION_GET&sord=desc&sidx=WOMAN_COLLECTION_ID&searchOper=eq&searchField=ISACTIVE&searchString=1&_search=true&IsRecordAll=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#slideshow0").append($("#datawomensslider").render(JsonObject.serviceresponse.detailslist.details));
                        $('#slideshow0').owlCarousel({
                            items: 6,
                            autoPlay: 4500,
                            singleItem: true,
                            navigation: true,
                            navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
                            pagination: false,
                            transitionStyle: "fade"
                        });

                    }

                    if (JsonObject.serviceresponse.ourspeciality) {
                        $("#div_OurServices").append($("#render_OurServices").render(JsonObject.serviceresponse.ourspeciality.details));
                    }

                    if (JsonObject.serviceresponse.ourparties) {
                        $("#clientlogoslider").append($("#render_clientlogo").render(JsonObject.serviceresponse.ourparties.details));

                        $('#clientlogoslider').owlCarousel({
                            items: 5,
                            autoPlay: false,
                            singleItem: false,
                            navigation: true,
                            navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
                            pagination: false,
                            transitionStyle: "fade"
                        });
                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    categorycollection: function () {
        var myfilter,
        myfilter = { rules: [] };
        myfilter.rules.push({ field: "DEVICETYPE", op: "eq", data: "B2BWeb" });
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=CATEGORY_GET&searchOper=eq&searchField=ISDISPLAYINHOMEPAGE&searchString=1&_search=true&IsRecordAll=true&myfilters=" + JSON.stringify(myfilter),
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#latest_products_carousel").append($("#datacategoryslider").render(JsonObject.serviceresponse.detailslist.details));

                    }
                }
                else {
                    InvalidResponseCode(data);
                }
            },
            error: OnError
        });
    },
    HomeBottomcollection: function () {
        $.ajax({
            url: getDomain() + "/Common/BindMastersDetails?ServiceName=HOMEBOTTOMSLIDER_GET&ColumnRequested=PICTUREPATH&IsRecordAll=true",
            async: false,
            cache: false,
            type: 'POST',
            success: function (data) {
                if ($(data).find('RESPONSECODE').text() == "0") {
                    var JsonObject = xml2json.parser(data);
                    if (JsonObject.serviceresponse.detailslist != undefined) {
                        $("#slideshow1").append($("#dataslideshow1").render(JsonObject.serviceresponse.detailslist.details));
                        $('#slideshow1').owlCarousel({
                            items: 6,
                            autoPlay: 4500,
                            singleItem: true,
                            navigation: true,
                            navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
                            pagination: false,
                            transitionStyle: "fade"
                        });
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
function ClickOnSubcategory(subcategory) {
    window.location.assign(getDomain() + "/Product/ProductList?category=" + subcategory + "&type=subcategory");
}
function Womancollection(id) {
    var collectionkeyword, collectionsubcategory, designrange;
    collectionkeyword = $("#txt_collectionkeyword" + id).val();
    collectionsubcategory = $("#txt_subcategoryname" + id).val();
    designrange = $("#txt_designorange" + id).val();
    window.location.assign(getDomain() + "/Product/ProductList?category=" + collectionsubcategory + "&type=collection&searchkeyword=" + collectionkeyword + "&designno=" + designrange);
}
$(document).ready(function () {

    MainPageview.womanscollection();
    MainPageview.categorycollection();
    MainPageview.HomeBottomcollection();
    //$('#clientlogoslider').owlCarousel({
    //    items: 5,
    //    autoPlay: false,
    //    singleItem: false,
    //    navigation: true,
    //    navigationText: ['<i class="fa fa-chevron-left fa-5x"></i>', '<i class="fa fa-chevron-right fa-5x"></i>'],
    //    pagination: false,
    //    transitionStyle: "fade"
    //});
});
